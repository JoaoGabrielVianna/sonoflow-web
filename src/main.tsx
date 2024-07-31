import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Settings from './pages/Settings.tsx'
import './styles/index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import Diary from './pages/Diary.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element:
          <AuthProvider>
            <Login />
          </AuthProvider>
      },
      {
        path: '/home',
        element:
          <AuthProvider>
            <Home />
          </AuthProvider>
      },
      {
        path: '/metrics',
        element:
          <AuthProvider>
            <h1>Em breve...</h1>
          </AuthProvider>
      },
      {
        path: '/settings',
        element:
          <AuthProvider>
            <Settings />
          </AuthProvider>
      },
      {
        path: '/diary',
        element:
          <AuthProvider>
            <Diary />
          </AuthProvider>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
