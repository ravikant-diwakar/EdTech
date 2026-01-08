import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';
import { BookOpen, PlayCircle } from 'lucide-react';

const MyLearning = () => {
    const { authUser } = useAuth();
    const [loading, setLoading] = useState(true);

    // State for tabs
    const [activeTab, setActiveTab] = useState<'courses' | 'books'>('courses');

    // Separate lists
    const [myCoursesList, setMyCoursesList] = useState([]);
    const [myBooksList, setMyBooksList] = useState([]);

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                // 1. Fetch latest user profile to ensure sync
                const profileRes = await api.get("/user/profile");
                const freshUser = profileRes.data;
                console.log("MyLearning: Fresh user profile fetched", freshUser);

                // 2. Fetch both catalogs
                const [bookRes, courseRes] = await Promise.all([
                    api.get("/book"),
                    api.get("/course")
                ]);

                const allBooks = bookRes.data;
                const allCourses = courseRes.data;

                // 3. Filter Courses (using freshUser.enrolledCourses)
                // Note: getProfile populates enrolledCourses, so they are OBJECTS.
                const filteredCourses = allCourses.filter((course: any) =>
                    freshUser?.enrolledCourses?.some((c: any) => {
                        // robust check just in case
                        const userCourseId = typeof c === 'string' ? c : c._id;
                        return userCourseId === course._id;
                    })
                );
                setMyCoursesList(filteredCourses);

                // 4. Filter Books (using freshUser.purchasedBooks)
                const filteredBooks = allBooks.filter((book: any) => {
                    if (!freshUser?.purchasedBooks) return false;
                    return freshUser.purchasedBooks.some((p: any) =>
                        (typeof p === 'string' ? p : p._id) === book._id
                    );
                });
                setMyBooksList(filteredBooks);

                setLoading(false);

            } catch (error) {
                console.error("Failed to fetch library", error);
                setLoading(false);
            }
        };

        if (authUser) {
            fetchLibrary();
        } else {
            setLoading(false);
        }

    }, [authUser]);


    // Helper to get image based on content
    const getCourseImage = (course: any) => {
        // ... (Keep existing map)
        const imageMap: { [key: string]: string } = {
            'react': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            'node': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
            'default': 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1031&q=80'
        };
        const text = (course.name + " " + course.category).toLowerCase();
        for (const key in imageMap) { if (text.includes(key)) return imageMap[key]; }
        return "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80"; // Generic Book/Course
    };

    if (!authUser) return <div className="text-white pt-24 text-center">Please log in to view your library.</div>;

    const displayedItems = activeTab === 'courses' ? myCoursesList : myBooksList;

    return (
        <div className="min-h-screen bg-black pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-gray-800 pb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">My Library</h1>
                        <p className="text-gray-400">Manage your learning journey and purchased content.</p>
                    </div>

                    {/* Tabs */}
                    <div className="bg-gray-900 p-1 rounded-xl flex items-center self-start md:self-auto">
                        <button
                            onClick={() => setActiveTab('courses')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'courses'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <PlayCircle className="w-4 h-4" />
                            Courses
                            <span className="bg-white/10 px-2 rounded-full text-[10px] ml-1">{myCoursesList.length}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'books'
                                ? 'bg-purple-600 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <BookOpen className="w-4 h-4" />
                            Books
                            <span className="bg-white/10 px-2 rounded-full text-[10px] ml-1">{myBooksList.length}</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center h-64 items-center text-white">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : displayedItems.length === 0 ? (
                    <div className="text-center py-24 bg-[#0e0e0e] rounded-3xl border border-gray-800 border-dashed">
                        {activeTab === 'courses' ? (
                            <PlayCircle className="w-16 h-16 mx-auto mb-4 text-gray-700" />
                        ) : (
                            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-700" />
                        )}
                        <p className="text-xl font-medium text-white mb-2">
                            No {activeTab === 'courses' ? 'Enrolled Courses' : 'Purchased Books'}
                        </p>
                        <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
                            {activeTab === 'courses'
                                ? "You haven't enrolled in any video courses yet. Start learning today!"
                                : "Your digital library is empty. Browse our collection of top-rated books."}
                        </p>
                        <a href="/courses" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-transform active:scale-95 shadow-lg shadow-white/5">
                            Browse Catalog
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedItems.map((item: any) => (
                            <div key={item._id} className="group relative bg-[#18181b] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full">
                                <div className="h-44 sm:h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img
                                        src={item.image || getCourseImage(item)}
                                        alt={item.name}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = getCourseImage(item);
                                        }}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Action Overlay */}
                                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className={`backdrop-blur-md px-6 py-2 rounded-full flex items-center gap-2 shadow-xl font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-white/20 text-white ${activeTab === 'courses' ? 'bg-blue-600/80 hover:bg-blue-600' : 'bg-purple-600/80 hover:bg-purple-600'
                                            }`}>
                                            {activeTab === 'courses' ? <PlayCircle className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                                            <span>{activeTab === 'courses' ? 'Resume' : 'Read Now'}</span>
                                        </button>
                                    </div>

                                    {/* Type Badge */}
                                    <div className="absolute top-3 left-3 z-20">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-white shadow-sm ${activeTab === 'courses' ? 'bg-blue-600' : 'bg-purple-600'
                                            }`}>
                                            {activeTab === 'courses' ? 'COURSE' : 'BOOK'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <h3 className="font-bold text-lg text-white mb-1 line-clamp-1 group-hover:text-blue-400 transition-colors">{item.name}</h3>
                                        {activeTab === 'courses' && item.instructor ? (
                                            <p className="text-xs text-gray-400 flex items-center gap-1.5">
                                                <span className="w-4 h-4 rounded-full bg-gray-700 block overflow-hidden">
                                                    <img src={item.instructor.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + item.instructor.fullname} className="w-full h-full object-cover" />
                                                </span>
                                                {item.instructor.fullname}
                                            </p>
                                        ) : (
                                            <p className="text-xs text-gray-400">{item.author || "Unknown Author"}</p>
                                        )}
                                    </div>

                                    {activeTab === 'courses' ? (
                                        <div className="mt-auto">
                                            <div className="flex justify-between text-xs text-gray-400 mb-2">
                                                <span>Progress</span>
                                                <span className="text-blue-400 font-bold">35%</span>
                                            </div>
                                            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                                <div className="bg-blue-600 h-full rounded-full" style={{ width: '35%' }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-auto">
                                            <button className="w-full py-2 rounded-lg border border-gray-700 text-gray-300 text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                                Download PDF
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLearning;
