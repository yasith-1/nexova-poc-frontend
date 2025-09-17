import { User2 } from 'lucide-react'
import React, { useState } from 'react'
import { ImProfile } from 'react-icons/im'
import { IoIosNotificationsOutline } from "react-icons/io"
import { Link } from 'react-router-dom'

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const handleMobileMenuToggle = () => {
    setShowMobileMenu(prev => !prev)
  }

  return (
    <nav className="bg-white  dark:bg-indigo-500">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/admin" className="flex items-center space-x-3">
          {/* <img src="/public/ZentaskLogo.png" alt="Zentask Logo" className="h-10 w-auto" /> */}
          <span className='text-blue-50 font-bold text-2xl'>Admin Panel</span>
        </a>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ">
          {/* Notification Icon */}
          <button
            type="button"
            aria-label="Notifications"
            className="text-gray-700 hover:text-black dark:text-white"
          >
            <IoIosNotificationsOutline size={30} />
          </button>

          {/* Desktop Name Display */}
          <ul className="hidden md:flex flex justify-center text-sm text-white gap-2">
            <User2 size={20}/>
            <li><span> Admin</span></li>
          </ul>

          
          {/* Logout Button */}
          <button className="hidden md:inline-block bg-indigo-50 text-sm text-black font-medium rounded-full px-5 py-2 hover:bg-indigo-100">
            Log Out
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={handleMobileMenuToggle}
            type="button"
            className="md:hidden inline-flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-indigo-500 text-black dark:text-white">
          <div>
            <span className="block text-sm">Name</span>
            <span className="block text-sm">HR Manager</span>
          </div>
          <button className="block w-full bg-indigo-100 text-sm text-black rounded-full py-2 hover:bg-indigo-200">
            Log Out
          </button>
        </div>
      )}
    </nav>
  )
}

export default Header
