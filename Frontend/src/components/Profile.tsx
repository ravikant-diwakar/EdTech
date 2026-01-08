import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { User, Mail, BookOpen, Calendar, Edit, Camera } from 'lucide-react';

const Profile = () => {
    const { authUser } = useAuth();

    if (!authUser) {
        return (
            <div className="min-h-screen bg-black pt-24 text-center text-white">
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    // Mock date since we don't store createdAt in local storage user object yet (unless we updated controller to send it, which we didn't explicitly)
    // We can just say "Member" or leave it out if not available.
    const memberSince = "2024";

    return (
        <div className="min-h-screen bg-black pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 border-b border-gray-800 pb-4 text-center md:text-left">
                    My Profile
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Column: Avatar & Basic Info */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center shadow-lg">
                            <div className="relative inline-block mb-4">
                                <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto border-4 border-black shadow-2xl">
                                    <span className="text-3xl md:text-4xl font-bold text-white uppercase">
                                        {authUser.fullname ? authUser.fullname.charAt(0) : "U"}
                                    </span>
                                </div>
                                <button className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border border-gray-700 hover:bg-gray-700 transition-colors shadow-sm">
                                    <Camera size={16} className="text-gray-300" />
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-white mb-1 truncate px-2">{authUser.fullname}</h2>
                            <p className="text-sm text-gray-400 mb-4">{authUser.role === 'admin' ? 'Administrator' : 'Student'}</p>

                            <div className="flex justify-center gap-2">
                                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20 font-medium">
                                    Active Member
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Stats */}
                    <div className="md:col-span-2 space-y-6">

                        {/* User Details Card */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                                <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                    <Edit size={16} /> Edit
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-black/50 p-4 rounded-xl border border-gray-800">
                                    <div className="bg-gray-800 p-2 rounded-lg">
                                        <User size={20} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-medium">Full Name</p>
                                        <p className="text-white font-medium">{authUser.fullname}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-black/50 p-4 rounded-xl border border-gray-800">
                                    <div className="bg-gray-800 p-2 rounded-lg">
                                        <Mail size={20} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-medium">Email Address</p>
                                        <p className="text-white font-medium">{authUser.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-black/50 p-4 rounded-xl border border-gray-800">
                                    <div className="bg-gray-800 p-2 rounded-lg">
                                        <Calendar size={20} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-medium">Joined</p>
                                        <p className="text-white font-medium">Member since {memberSince}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <BookOpen className="text-blue-500" size={24} />
                                    <span className="text-2xl font-bold text-white">{authUser.enrolledCourses ? authUser.enrolledCourses.length : 0}</span>
                                </div>
                                <p className="text-sm text-gray-400">Enrolled Courses</p>
                            </div>
                            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Calendar className="text-purple-500" size={24} />
                                    <span className="text-2xl font-bold text-white">0</span>
                                </div>
                                <p className="text-sm text-gray-400">Certificates</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
