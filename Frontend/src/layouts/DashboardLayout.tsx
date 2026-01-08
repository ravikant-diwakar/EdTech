import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    ShoppingBag,
    Users,
    LogOut,
    Video,
    Search
} from 'lucide-react';

const DashboardLayout = () => {
    const { authUser, logout, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return <div>Loading...</div>;

    if (!authUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const getNavItems = () => {
        // Base items for everyone
        const commonItems = [
            { label: 'My Learning', icon: LayoutDashboard, path: '/mylearning' },
            { label: 'Browse Content', icon: Search, path: '/courses' },
        ];

        switch (authUser.role) {
            case 'admin':
                return [
                    ...commonItems,
                    { label: 'Admin Overview', icon: Users, path: '/admin' },
                    { label: 'User Management', icon: Users, path: '/admin/users' },
                    { label: 'Approvals', icon: BookOpen, path: '/admin/approvals' },
                ];
            case 'teacher':
                return [
                    ...commonItems,
                    { label: 'Instructor Dashboard', icon: Video, path: '/teacher-dashboard' },
                    { label: 'My Courses (Manage)', icon: Video, path: '/teacher/courses' },
                    { label: 'Student Analytics', icon: Users, path: '/teacher/students' },
                ];
            case 'book_seller':
                return [
                    ...commonItems,
                    { label: 'Seller Dashboard', icon: ShoppingBag, path: '/seller-dashboard' },
                    { label: 'Inventory (Manage)', icon: BookOpen, path: '/seller/inventory' },
                    { label: 'Orders (Sales)', icon: ShoppingBag, path: '/seller/orders' },
                ];
            case 'student':
            default:
                return commonItems;
        }
    };

    const navItems = getNavItems();

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-zinc-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-zinc-800 shadow-lg hidden md:flex flex-col">
                <div className="p-6 border-b dark:border-zinc-700">
                    <h2 className="text-2xl font-bold text-pink-500">Dashboard</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{authUser.role}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-pink-500 text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t dark:border-zinc-700">
                    <button
                        onClick={logout}
                        className="flex items-center space-x-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
