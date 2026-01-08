import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify';

const Banner = () => {
    const navigate = useNavigate();
    const { authUser } = useAuth();

    const handleMyLearningClick = () => {
        if (authUser) {
            navigate('/mylearning');
        } else {
            toast.error("Please login to access My Learning");
            // Optional: navigate('/login'); 
            // document.getElementById("my_modal_3")?.showModal(); // If using daisyUI modal
        }
    };

    return (
        <div className="relative overflow-hidden bg-black py-16 sm:py-32">
            {/* Dotted Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            {/* Background gradients */}
            <div className="absolute -top-24 -left-20 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                            Limitless Learning <span className="text-blue-400 font-semibold ml-1">Starts Here</span>
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                        Hello, welcome here to learn something <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">new everyday!!!</span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Discover a vast library of books and expert-led video courses designed to help you master new skills and advance your career.
                    </p>

                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
                        <button
                            onClick={() => navigate('/courses')}
                            className="w-full sm:w-auto rounded-full bg-white px-8 py-3 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            Explore Courses <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleMyLearningClick}
                            className="w-full sm:w-auto rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                        >
                            My Learning <span aria-hidden="true" className="ml-1">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
