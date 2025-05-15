import { type MetaFunction } from 'react-router'

export const meta: MetaFunction = () => {
  return [{ title: 'Template' }]
}

export default function Index() {
  return (
    <div className="bg-white shadow-xs dark:bg-gray-900 min-h-screen flex flex-col">

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">
            Hello World!
          </h1>
          <p className="text-xl text-gray-600 mb-2 dark:text-gray-300">
            Welcome to your React Router app.
          </p>
        </div>
      </main>
    </div>
  )
}
