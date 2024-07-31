import clsx from "clsx"
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { NavbarIcon } from "../types/navbar"
import { HomeIcon, MetricIcon, SettingsIcon } from "../assets/icons/Icon"

export const Navbar: React.FC = () => {
  const location = useLocation()

  const NavBarIcons: NavbarIcon[] = [
    { id: 0, label: 'Métricas', Icon: MetricIcon, href: '/metrics' },
    { id: 1, label: 'Home', Icon: HomeIcon, href: '/home' },
    { id: 2, label: 'Configuração', Icon: SettingsIcon, href: '/settings' }
  ]


  return (
    <nav className="fixed bottom-0 bg-white w-full">
      <ul className="flex justify-evenly p-4">
        {NavBarIcons.map((icon) => (
          <li key={icon.id}>
            <Link to={icon.href} className="flex flex-col items-center justify-center">
              <icon.Icon />
              <span className={clsx("text-slate",
                { "text-sunshine": location.pathname === icon.href },)}>{icon.label}</span>
            </Link>
          </li>
        )
        )}
      </ul>
    </nav>
  )
}