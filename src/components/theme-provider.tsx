"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// The theme script only needs to run from the server HTML (before paint). On the
// client React 19 warns about rendering an executable <script>, so mark it inert there.
const scriptProps =
  typeof window === "undefined" ? undefined : ({ type: "application/json" } as const);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}
