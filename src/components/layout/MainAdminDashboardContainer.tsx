import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { Sidebar } from '../SideBar';
import Dashboard from '../Dashboard';
import { Route, Routes } from 'react-router-dom';
import Role from '../../pages/Role';

function MainAdminDashboardContainer() {
    // Check if screen is large (1024px+) on initial load
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 1024;
        }
        return false;
    });

    // Handle screen resize
    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.innerWidth >= 1024;
            setIsSidebarOpen(isLargeScreen);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        // Only allow toggle on small/medium screens
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    const closeSidebar = () => {
        // Only allow close on small/medium screens
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="h-screen bg-gray-100 overflow-hidden">
            {/* Hamburger Menu Button - only visible on medium and small screens */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-[60] text-white hover:text-gray-200 focus:outline-none p-2 rounded-md bg-black bg-opacity-30 backdrop-blur-sm"
                aria-label="Toggle sidebar"
            >
                <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    {isSidebarOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {/* Header */}
            <div className="fixed top-0 left-0 right-0 h-16 z-50 bg-gradient-to-r from-purple-600 to-indigo-700 shadow-sm">
                <Header />
            </div>

            {/* Mobile overlay - only shows on medium and small screens when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-16 bottom-0 w-64 z-40 bg-white shadow-sm transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <Sidebar />
            </div>

            {/* Main content area */}
            <div className={`fixed top-16 right-0 bottom-0 overflow-y-auto bg-gray-50 transition-all duration-300 ease-in-out lg:left-64 ${isSidebarOpen ? 'left-64' : 'left-0'
                }`}>
                <div className="p-5 min-h-full">
                    <Routes>
                        <Route path="/*" element={<Dashboard />} />
                        <Route path="/user-management" element={<Role />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default MainAdminDashboardContainer;