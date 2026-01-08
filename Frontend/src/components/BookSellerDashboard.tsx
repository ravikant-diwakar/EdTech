import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Trash2, Plus, Book, Image as ImageIcon, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookSellerDashboard = () => {
    const { authUser } = useAuth();
    const navigate = useNavigate();

    // Data list
    const [myBooks, setMyBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        price: '',
        category: '',
        image: '',
        description: '',
        author: '',
        stock: '0',
        pdfUrl: '',
        type: 'book'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initial check and fetch
    useEffect(() => {
        if (!authUser) {
            navigate('/login');
            return;
        }
        if (authUser.role !== 'book_seller' && authUser.role !== 'admin') {
            toast.error("Access denied. Book Sellers only.");
            navigate('/');
            return;
        }

        fetchItems();
    }, [authUser, navigate]);

    // Fetch items
    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await api.get('/book');
            const books = res.data.filter((item: any) =>
                item.type === 'book' && (item.createdBy === authUser._id || item.createdBy?._id === authUser._id)
            );
            setMyBooks(books);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    // Handle form change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Add
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock)
        };

        try {
            await api.post('/book/add', payload);
            toast.success(`Book listed successfully!`);
            // Reset form
            setFormData({
                name: '',
                title: '',
                price: '',
                category: '',
                image: '',
                description: '',
                author: '',
                stock: '0',
                pdfUrl: '',
                type: 'book'
            });
            fetchItems(); // Refresh list
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to list book");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Delete
    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;

        try {
            await api.delete(`/book/delete/${id}`);
            toast.success("Book deleted successfully");
            fetchItems();
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to delete item");
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 text-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-gray-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Seller Dashboard</h1>
                        <p className="text-gray-400">Manage your book inventory and listings.</p>
                    </div>
                    <div className="mt-4 md:mt-0 bg-purple-900/20 px-4 py-2 rounded-lg border border-purple-500/30">
                        <span className="text-purple-400 font-medium">📚 Total Sales: $0.00</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: ADD FORM */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#0f0f10] border border-gray-800 rounded-2xl p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-purple-500" />
                                List New Book
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Book Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. The Pragmatic Programmer"
                                        className="w-full bg-black/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Title / Subtitle</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. 20th Anniversary Edition"
                                        className="w-full bg-black/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Author</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        required
                                        placeholder="Author Name"
                                        className="w-full bg-black/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            placeholder="Tech"
                                            className="w-full bg-black/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Price ($)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            placeholder="29.99"
                                            className="w-full bg-black/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Stock (Physical)</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className="w-full bg-black/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Cover Image URL</label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full bg-black/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">eBook PDF URL (Optional)</label>
                                    <input
                                        type="url"
                                        name="pdfUrl"
                                        value={formData.pdfUrl}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full bg-black/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full bg-black/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 rounded-xl font-bold text-white transition-all transform active:scale-95 bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-900/20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Listing...' : 'List Book'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: LIST */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#0f0f10] border border-gray-800 rounded-2xl p-6 min-h-[500px]">
                            <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <Book className="text-purple-500" />
                                    My Listed Books
                                </span>
                                <span className="text-sm font-normal text-gray-500 bg-gray-900 px-3 py-1 rounded-full">{myBooks.length} books</span>
                            </h2>

                            {loading ? (
                                <div className="flex justify-center items-center h-48">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
                                </div>
                            ) : myBooks.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    You haven't listed any books yet.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {myBooks.map((item: any) => (
                                        <div key={item._id} className="group bg-black/40 border border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:border-gray-600 transition-colors">
                                            <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-purple-900/30">
                                                <img
                                                    src={item.image || "https://via.placeholder.com/150"}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <h3 className="font-semibold text-white truncate">{item.name}</h3>
                                                <p className="text-sm text-gray-400">{item.author}</p>
                                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                    <span className="bg-purple-900/30 text-purple-400 px-2 py-0.5 rounded border border-purple-900/50">Stock: {item.stock || 0}</span>
                                                    <span>{item.category}</span>
                                                    <span>${item.price}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Delete Listing"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookSellerDashboard;
