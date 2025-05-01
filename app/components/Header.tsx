import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto p-4 flex justify-between">
                <div className="flex items-center">
                    <img src="" className="h-8" alt="Logo" />
                </div>
                <div className="flex space-x-4">
                    <button type="button" onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
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
                                <div className="bg-white p-4 rounded-lg shadow-lg">
                                    <button type="button" onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">Close</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
        </header>
    )
}