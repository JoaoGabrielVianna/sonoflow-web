export interface SettingsItem {
  id: number
  label: string
  subItems: SettingsSubItem[]
  // ...
}

interface SettingsSubItem {
  id: number
  label: string,
  subLabel?: string,
  icon: React.ReactNode,
  onClick?: () => void,
  href?: string,
  // ...
}