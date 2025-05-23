import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link, NavLink } from 'react-router'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="bg-white shadow-xs dark:bg-gray-900">
      <nav className="mx-auto px-8 flex justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="resources/icons/safari-pinned-tab.svg"
              className="h-8"
              alt="Logo"
            />
          </Link>
        </div>

        <button
          className="burger md:hidden z-20 relative"
          aria-label="Toggle Menu"
        >
          -
        </button>

        <div className="flex space-x-4">
          <ul className="flex flex-col md:flex-row h-full">
            <li>
              <NavLink
                to="/"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 md:py-4 md:px-2 inline-block"
              >
                Home
              </NavLink>
              <NavLink
                to="/sub"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 md:py-4 md:px-2 inline-block"
              >
                Sub App
              </NavLink>
              <NavLink
                to="/signin"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 md:py-4 md:px-2 inline-block"
              >
                Sign In
              </NavLink>
            </li>
          </ul>
          <button
            type="button"
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          >
            Menu
          </button>
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
              >
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg md:py-4 md:px-2">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  )
}
