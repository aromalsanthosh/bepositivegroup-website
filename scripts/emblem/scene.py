"""Build and render the 3D BPG emblem loop with Blender (bpy).

Usage: python3 scene.py <out_dir> [start] [end] [res] [samples]
Needs the Blender Python module (pip install bpy==4.2.0, Python 3.11). Reads emblem.svg
from trace.py; the 1080px web loop was rendered with: scene.py frames 0 150 1080 48
Renders transparent RGBA PNG frames <out_dir>/f_0000.png ... for frames [start, end).
"""
import math
import os
import sys

import bpy
import addon_utils  # available once bpy is imported
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "frames")
START = int(sys.argv[2]) if len(sys.argv) > 2 else 0
END = int(sys.argv[3]) if len(sys.argv) > 3 else 1
RES = int(sys.argv[4]) if len(sys.argv) > 4 else 1080
SAMPLES = int(sys.argv[5]) if len(sys.argv) > 5 else 64

FRAMES = 150  # 5 s seamless loop at 30 fps
BRAND_BLUE = (0.0012, 0.058, 0.341)  # #04449E in linear RGB

bpy.ops.wm.read_factory_settings(use_empty=True)
addon_utils.enable("io_curve_svg")
scene = bpy.context.scene

# ---------------------------------------------------------------- geometry
bpy.ops.import_curve.svg(filepath=os.path.join(HERE, "emblem.svg"))
curves = [o for o in scene.objects if o.type == "CURVE"]
bpy.ops.object.select_all(action="DESELECT")
for o in curves:
    o.select_set(True)
bpy.context.view_layer.objects.active = curves[0]
if len(curves) > 1:
    bpy.ops.object.join()
emblem = bpy.context.view_layer.objects.active
emblem.name = "BPG Emblem"

# Normalise: centre on origin, 2 units wide
bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
emblem.location = (0, 0, 0)
w = emblem.dimensions.x
s = 2.0 / w
emblem.scale = (emblem.scale.x * s, emblem.scale.y * s, emblem.scale.z * s)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

cu = emblem.data
# applying scale also scales point radii, which multiply the bevel; reset them
for sp in cu.splines:
    for pt in sp.bezier_points:
        pt.radius = 1.0
    for pt in sp.points:
        pt.radius = 1.0
cu.dimensions = "2D"
cu.fill_mode = "BOTH"
cu.resolution_u = 24
cu.extrude = 0.045
cu.bevel_mode = "ROUND"
cu.bevel_depth = 0.006
cu.bevel_resolution = 3
cu.offset = -0.006  # keep the traced outline; bevel grows inward

bpy.ops.object.convert(target="MESH")
emblem = bpy.context.view_layer.objects.active
emblem.rotation_euler = (math.radians(90), 0, 0)  # stand it up, facing -Y
bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
bpy.ops.object.shade_smooth_by_angle(angle=math.radians(35))
print("EMBLEM DIMS", tuple(round(v, 3) for v in emblem.dimensions), flush=True)

# ---------------------------------------------------------------- materials
def principled(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    return m, m.node_tree.nodes["Principled BSDF"]

face, p = principled("Blue lacquer")
p.inputs["Base Color"].default_value = (*BRAND_BLUE, 1)
p.inputs["Specular IOR Level"].default_value = 0.4
p.inputs["Metallic"].default_value = 0.0
p.inputs["Roughness"].default_value = 0.28
p.inputs["Coat Weight"].default_value = 1.0
p.inputs["Coat Roughness"].default_value = 0.04

edge, p = principled("Polished silver")
p.inputs["Base Color"].default_value = (0.93, 0.94, 0.96, 1)
p.inputs["Metallic"].default_value = 1.0
p.inputs["Roughness"].default_value = 0.12

me = emblem.data
me.materials.clear()  # drop the fill material the SVG importer adds
me.materials.append(face)
me.materials.append(edge)
for poly in me.polygons:
    # caps face the camera (±Y); everything else is bevel/side wall
    poly.material_index = 0 if abs(poly.normal.y) > 0.985 else 1

# ---------------------------------------------------------------- world + lights
world = bpy.data.worlds.new("Studio")
scene.world = world
world.use_nodes = True
wn = world.node_tree.nodes
wl = world.node_tree.links
bg = wn["Background"]
tc = wn.new("ShaderNodeTexCoord")
sep = wn.new("ShaderNodeSeparateXYZ")
ramp = wn.new("ShaderNodeValToRGB")
wl.new(tc.outputs["Generated"], sep.inputs[0])
wl.new(sep.outputs["Z"], ramp.inputs["Fac"])
cr = ramp.color_ramp
cr.elements[0].position = 0.42
cr.elements[0].color = (0.02, 0.025, 0.035, 1)
cr.elements[1].position = 0.95
cr.elements[1].color = (0.55, 0.6, 0.7, 1)
wl.new(ramp.outputs["Color"], bg.inputs["Color"])
bg.inputs["Strength"].default_value = 0.8


def area(name, loc, size, energy, color=(1, 1, 1), shape="RECTANGLE", size_y=None):
    d = bpy.data.lights.new(name, "AREA")
    d.shape = shape
    d.size = size
    if size_y:
        d.size_y = size_y
    d.energy = energy
    d.color = color
    o = bpy.data.objects.new(name, d)
    scene.collection.objects.link(o)
    o.location = loc
    direction = Vector((0, 0, 0)) - Vector(loc)
    o.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    return o


area("Key", (-2.6, -3.2, 2.4), 2.2, 200, size_y=1.4)
area("Fill", (3.0, -2.6, 0.3), 2.5, 90, color=(0.85, 0.9, 1.0))
area("Rim L", (-2.8, 1.8, 1.0), 0.5, 380, size_y=3.0)
area("Rim R", (2.8, 1.8, -0.4), 0.5, 300, size_y=3.0, color=(0.8, 0.88, 1.0))
strip = area("Top strip", (0.0, -2.2, 3.0), 4.0, 260, size_y=0.25)

# ---------------------------------------------------------------- camera
cam_data = bpy.data.cameras.new("Camera")
cam_data.lens = 85
cam = bpy.data.objects.new("Camera", cam_data)
scene.collection.objects.link(cam)
cam.location = (0, -6.3, 0)
cam.rotation_euler = (math.radians(90), 0, 0)
scene.camera = cam

# ---------------------------------------------------------------- render settings
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = SAMPLES
scene.cycles.use_adaptive_sampling = True
scene.cycles.adaptive_threshold = 0.02
scene.cycles.use_denoising = True
scene.cycles.denoiser = "OPENIMAGEDENOISE"
scene.cycles.max_bounces = 6
scene.cycles.transmission_bounces = 0
scene.cycles.volume_bounces = 0
scene.cycles.caustics_reflective = False
scene.cycles.caustics_refractive = False
scene.render.film_transparent = True
scene.render.resolution_x = RES
scene.render.resolution_y = RES
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.render.image_settings.color_depth = "8"
# Standard keeps the brand blue true (AgX desaturates bright blues toward white)
scene.view_settings.view_transform = "Standard"
scene.view_settings.look = "None"
scene.render.threads_mode = "AUTO"

# ---------------------------------------------------------------- animation (seamless loop)
os.makedirs(OUT, exist_ok=True)
for f in range(START, END):
    t = f / FRAMES
    a = 2 * math.pi * t
    emblem.rotation_euler = (
        math.radians(5.0 * math.sin(a + math.pi / 2)),  # gentle nod
        0,
        math.radians(24.0 * math.sin(a)),  # slow sway left/right
    )
    emblem.location = (0, 0, 0.045 * math.sin(2 * a))  # float
    # a light strip that slides across, so the lacquer gets a moving sheen
    strip.location.x = 2.6 * math.sin(a + 0.6)
    scene.render.filepath = os.path.join(OUT, f"f_{f:04d}.png")
    bpy.ops.render.render(write_still=True)
    print("rendered", f, flush=True)
