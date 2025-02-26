import { Link, type MetaFunction } from 'react-router'
import { useTranslation } from 'react-i18next'

export const meta: MetaFunction = () => {
  return [{ title: 'Template' }]
}

export default function Index() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto p-4 flex justify-between">
          <div className="flex items-center">
            <img src="" className="h-8" alt="Logo" />
          </div>
          <div className="flex space-x-4">
            <a
              href="https://discord.gg/invite/5VhK6H5"
              className="text-gray-600 hover:text-gray-900"
            >
              Discord
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">{t('hello')}</h1>
          <p className="text-xl text-gray-600">{t('welcome')}</p>
          <Link to="/sub">Go to Sub App</Link>
        </div>
      </main>
    </div>
  )
}
