import { ThemeContext } from './themeContextValue'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Theme } from './themeContextValue'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem('shopmini-theme') === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('shopmini-theme', theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
