import { Link, type MetaFunction } from 'react-router'
import { useTranslation } from 'react-i18next'
import Footer from '~/components/Footer'
import Header from '~/components/Header'

export const meta: MetaFunction = () => {
  return [{ title: 'Template' }]
}

export default function Index() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">{t('hello')}</h1>
          <p className="text-xl text-gray-600 mb-2">{t('welcome')}</p>
          <Link to="/sub">{t('subapp')}</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
