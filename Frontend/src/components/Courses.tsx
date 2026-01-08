import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Search, Star, ArrowRight, Filter, X } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authUser } = useAuth();
    const navigate = useNavigate();

    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        category: "All",
        minPrice: "",
        maxPrice: "",
        rating: ""
    });
    const [showFilters, setShowFilters] = useState(false); // Mobile toggle

    const categories = ["All", "Tech", "Business", "Design", "Marketing", "Science", "Romance", "Fiction", "Fantasy"];

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (searchQuery) params.append("search", searchQuery);
                if (filters.category !== "All") params.append("category", filters.category);
                if (filters.minPrice) params.append("minPrice", filters.minPrice);
                if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
                if (filters.rating) params.append("rating", filters.rating);

                const queryString = params.toString();

                const [bookRes, courseRes] = await Promise.all([
                    api.get(`/book?${queryString}`),
                    api.get(`/course?${queryString}`)
                ]);

                // Normalize and combine
                const combined = [...courseRes.data, ...bookRes.data];
                setCourses(combined);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch content");
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchContent();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleBuy = async (item: any) => {
        if (!authUser) {
            toast.error("Please login to purchase");
            return;
        }

        // If price > 0, redirect to checkout
        if (item.price > 0) {
            navigate(`/checkout/${item._id}`, { state: { item } });
            return;
        }

        // Free items: direct enroll
        try {
            const res = await api.post("/purchase/buy", {
                userId: authUser._id,
                bookId: item._id // Correctly extracting ID
            });
            if (res.data) {
                toast.success("Purchased successfully!");
                if (res.data.user) {
                    const updatedUser = { ...authUser, ...res.data.user };
                    localStorage.setItem("Users", JSON.stringify(updatedUser));
                    window.location.reload();
                }
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Purchase failed");
        }
    };

    const getCourseImage = (course: any) => {
        const imageMap: { [key: string]: string } = {
            'react': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            'node': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
            'python': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1332&q=80',
            'default': 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1031&q=80'
        };
        const text = (course.name + " " + course.category + " " + course.title).toLowerCase();
        for (const key in imageMap) {
            if (text.includes(key)) return imageMap[key];
        }
        return imageMap['default'];
    };

    return (
        <div className="min-h-screen bg-black pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                        Explore Learning Content
                    </h1>
                </div>

                {/* Mobile Filter Toggle */}
                <div className="md:hidden flex justify-between items-center mb-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg"
                    >
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className={`w-full md:w-64 bg-[#18181b] p-6 rounded-2xl border border-gray-800 h-fit ${showFilters ? 'block' : 'hidden md:block'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Filters</h2>
                            <button onClick={() => setFilters({ category: "All", minPrice: "", maxPrice: "", rating: "" })} className="text-xs text-blue-400 hover:text-blue-300">
                                Reset
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mb-6">
                            <label className="text-gray-400 text-xs uppercase font-bold mb-2 block">Search</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Keywords..."
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 pl-9 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="mb-6">
                            <label className="text-gray-400 text-xs uppercase font-bold mb-2 block">Category</label>
                            <div className="flex flex-col gap-2">
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer hover:text-white">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={cat}
                                            checked={filters.category === cat}
                                            onChange={handleFilterChange}
                                            className="accent-blue-500"
                                        />
                                        {cat}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <label className="text-gray-400 text-xs uppercase font-bold mb-2 block">Price Range ($)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    name="minPrice"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                    placeholder="Min"
                                    className="w-1/2 bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-sm text-white"
                                />
                                <input
                                    type="number"
                                    name="maxPrice"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                    placeholder="Max"
                                    className="w-1/2 bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-sm text-white"
                                />
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="text-gray-400 text-xs uppercase font-bold mb-2 block">Rating</label>
                            <select
                                name="rating"
                                value={filters.rating}
                                onChange={handleFilterChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-sm text-white"
                            >
                                <option value="">Any Rating</option>
                                <option value="4">4+ Stars</option>
                                <option value="3">3+ Stars</option>
                            </select>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : courses.length === 0 ? (
                            <div className="text-center py-20 bg-[#18181b] rounded-2xl border border-gray-800 border-dashed">
                                <p className="text-gray-400">No content matches your filters.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {courses.map((item: any) => (
                                    <div key={item._id} className="group relative bg-[#18181b] border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 flex flex-col h-full">
                                        <div className="relative h-48 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
                                            <img
                                                src={item.image || getCourseImage(item)}
                                                alt={item.name}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = getCourseImage(item);
                                                }}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                            {/* Badges and Price (Overlaid) */}
                                            <div className="absolute top-3 left-3 z-20 flex gap-2">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide text-white shadow-sm ${(item.type === 'course' || item.instructor) ? 'bg-blue-600' : 'bg-purple-600'}`}>
                                                    {(item.type === 'course' || item.instructor) ? 'COURSE' : 'BOOK'}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-3 right-3 z-20 text-white font-bold text-lg drop-shadow-md">
                                                ${item.price === 0 ? "Free" : item.price}
                                            </div>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col">
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">{item.name || item.title}</h3>
                                            <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                                                <span>{item.category}</span>
                                                <span>•</span>
                                                <div className="flex items-center text-yellow-500">
                                                    <Star className="w-3 h-3 fill-current mr-1" />
                                                    {item.rating || 4.5}
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-gray-800">
                                                {authUser?.enrolledCourses?.includes(item._id) || (authUser?.purchasedBooks && authUser.purchasedBooks.some((p: any) => (typeof p === 'string' ? p : p._id) === item._id)) ? (
                                                    <button disabled className="w-full bg-green-500/10 text-green-500 py-2 rounded-lg font-bold text-xs uppercase cursor-default">
                                                        Owned
                                                    </button>
                                                ) : (
                                                    <button onClick={() => handleBuy(item)} className="w-full bg-white text-black hover:bg-gray-200 py-2 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors">
                                                        {item.price === 0 ? "Enroll" : "Buy Now"} <ArrowRight className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;
