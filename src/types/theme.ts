export interface ThemeType {
  header: string
  background: string
  text: string
  media: object
  toggleDarkMode: (isDark: boolean) => void
}