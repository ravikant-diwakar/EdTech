import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Users, BookOpen, BarChart2, DollarSign, ShieldAlert, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [analytics, setAnalytics] = useState<any>(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [analyticsRes, usersRes] = await Promise.all([
                    api.get("/admin/analytics"),
                    api.get("/admin/users")
                ]);
                setAnalytics(analyticsRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load admin data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleBlockUser = async (userId: string, currentStatus: boolean) => {
        try {
            await api.put(`/admin/users/${userId}`, { isBlocked: !currentStatus });
            setUsers(users.map((u: any) => u._id === userId ? { ...u, isBlocked: !currentStatus } : u));
            toast.success(`User ${!currentStatus ? 'blocked' : 'unblocked'}`);
        } catch (error) {
            toast.error("Action failed");
        }
    };

    if (loading) return <div className="text-white text-center pt-24">Loading Admin Panel...</div>;

    return (
        <div className="min-h-screen bg-black pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-[#18181b] p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                        <div className="bg-blue-600/20 p-3 rounded-lg text-blue-500">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Users</p>
                            <p className="text-2xl font-bold text-white">{analytics?.users || 0}</p>
                        </div>
                    </div>
                    <div className="bg-[#18181b] p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                        <div className="bg-purple-600/20 p-3 rounded-lg text-purple-500">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Content Items</p>
                            <p className="text-2xl font-bold text-white">{(analytics?.books || 0) + (analytics?.courses || 0)}</p>
                        </div>
                    </div>
                    <div className="bg-[#18181b] p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                        <div className="bg-green-600/20 p-3 rounded-lg text-green-500">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Revenue</p>
                            <p className="text-2xl font-bold text-white">${analytics?.revenue || 0}</p>
                        </div>
                    </div>
                    <div className="bg-[#18181b] p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                        <div className="bg-orange-600/20 p-3 rounded-lg text-orange-500">
                            <BarChart2 size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Orders</p>
                            <p className="text-2xl font-bold text-white">{analytics?.orders || 0}</p>
                        </div>
                    </div>
                </div>

                {/* User Management Table */}
                <div className="bg-[#18181b] rounded-2xl border border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-800">
                        <h2 className="text-xl font-bold text-white">User Management</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-gray-400">
                            <thead className="bg-gray-900 text-xs uppercase font-bold text-gray-500">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {users.map((user: any) => (
                                    <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                                                    <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullname}`} alt="" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{user.fullname}</p>
                                                    <p className="text-xs">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-red-500/10 text-red-500' :
                                                    user.role === 'teacher' ? 'bg-blue-500/10 text-blue-500' :
                                                        'bg-gray-700 text-gray-300'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.isBlocked ? (
                                                <span className="text-red-500 flex items-center gap-1 text-xs font-bold"><ShieldAlert size={14} /> Blocked</span>
                                            ) : (
                                                <span className="text-green-500 flex items-center gap-1 text-xs font-bold"><CheckCircle size={14} /> Active</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleBlockUser(user._id, user.isBlocked)}
                                                className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${user.isBlocked
                                                        ? 'border-green-500 text-green-500 hover:bg-green-500/10'
                                                        : 'border-red-500 text-red-500 hover:bg-red-500/10'
                                                    }`}
                                            >
                                                {user.isBlocked ? 'Unblock' : 'Block'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
