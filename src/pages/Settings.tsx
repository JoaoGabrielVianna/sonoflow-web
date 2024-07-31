import { AppWindow, LogOut } from "lucide-react"
import { SettingsItem } from "../types/settings"
import { useAuthContext } from "../contexts/AuthContext"

export default function Settings() {
  const auth = useAuthContext()

  const settingsItems: SettingsItem[] = [
    {
      id: 0, label: 'Sobre o App', subItems: [
        { id: 0, label: 'Versão do App', icon: <AppWindow />, subLabel: 'v.1.0' },
      ]
    },
    {
      id: 1, label: 'Ações', subItems: [
        { id: 0, label: 'Sair', icon: <LogOut />, onClick: auth.logOut }
      ]
    }
  ]

  return (
    <div className="flex-1 h-screen bg-pale-blue">
      <header className="p-4 flex items-center justify-center">
        <h1 className="text-xl">Configurações</h1>
      </header>
      <main className="px-4 space-y-10 pb-32">
        {settingsItems.map((item) => (
          <div key={item.id} className="">
            <h1 className="font-bold text-xl">{item.label}</h1>
            <div className="flex flex-col p-4 gap-5 bg-gray-200 rounded-xl">
              {item.subItems.map(subItem => (
                <button
                  key={subItem.id}
                  onClick={subItem.onClick}
                  className="flex gap-4">
                  {subItem.icon}
                  {subItem.label}
                  <span className="flex-1 text-end opacity-30">{subItem.subLabel}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
