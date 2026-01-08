import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Search, Filter, Tag, Rss } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
    featured: boolean;
    image?: string;
}

const Blog: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    const categories = ['All', 'Interview Prep', 'Career Growth', 'AI Technology', 'Industry Insights', 'Success Stories'];

    const blogPosts: BlogPost[] = [
        {
            id: '1',
            title: 'AI-Powered Interview Preparation: The Future is Here',
            excerpt: 'Discover how artificial intelligence is transforming interview preparation and helping candidates land their dream jobs with personalized coaching.',
            content: `
        <p>The landscape of interview preparation has undergone a dramatic transformation with the advent of artificial intelligence. In 2025, AI-powered tools are not just supplementing traditional preparation methods—they're revolutionizing them entirely.</p>
        
        <h3>The Traditional Challenges</h3>
        <p>For decades, job seekers have struggled with generic interview advice that doesn't account for their unique background, experience, or the specific role they're targeting. This one-size-fits-all approach often left candidates feeling unprepared and anxious.</p>
        
        <h3>Enter AI-Powered Personalization</h3>
        <p>Modern AI systems can analyze your resume, understand your experience, and provide tailored preparation strategies. This includes:</p>
        <ul>
          <li>Personalized question predictions based on your background</li>
          <li>Skill gap analysis and targeted improvement recommendations</li>
          <li>Real-time feedback on practice responses</li>
          <li>Industry-specific preparation materials</li>
        </ul>
        
        <h3>The Future of Interview Prep</h3>
        <p>As AI continues to evolve, we can expect even more sophisticated features like emotion recognition during practice sessions, advanced behavioral analysis, and predictive success modeling.</p>
      `,
            author: 'SkillN Team',
            date: '2025-01-15',
            readTime: '5 min read',
            category: 'AI Technology',
            tags: ['AI', 'Interview Prep', 'Technology', 'Career'],
            featured: true,
            image: '/api/placeholder/400/250'
        },
        {
            id: '2',
            title: 'Resume Analysis: What Top Companies Really Look For',
            excerpt: 'Learn the insider secrets of what hiring managers at top tech companies actually look for when reviewing resumes.',
            content: `
        <p>Understanding what top companies look for in resumes can be the difference between getting an interview and being overlooked. Here's what really matters:</p>
        
        <h3>1. Quantifiable Achievements</h3>
        <p>Numbers speak louder than words. Instead of saying "improved performance," say "improved system performance by 40%, reducing load times from 3s to 1.8s."</p>
        
        <h3>2. Relevant Technical Skills</h3>
        <p>Match your technical skills to the job requirements, but don't just list them—show how you've used them in real projects.</p>
        
        <h3>3. Problem-Solving Examples</h3>
        <p>Companies want to see how you approach and solve complex problems. Include specific examples of challenges you've overcome.</p>
        
        <h3>4. Impact and Scale</h3>
        <p>Demonstrate the scope and impact of your work. Did you work on systems serving millions of users? Mention it.</p>
      `,
            author: 'Career Expert',
            date: '2025-01-12',
            readTime: '7 min read',
            category: 'Career Growth',
            tags: ['Resume', 'Career Advice', 'Job Search'],
            featured: false
        },
        {
            id: '3',
            title: 'LinkedIn Optimization: Stand Out to Recruiters',
            excerpt: 'Master the art of LinkedIn optimization with proven strategies that get you noticed by top recruiters and hiring managers.',
            content: `
        <p>Your LinkedIn profile is often the first impression you make on potential employers. Here's how to make it count:</p>
        
        <h3>Craft a Compelling Headline</h3>
        <p>Your headline should go beyond your job title. Include keywords relevant to your target role and highlight your unique value proposition.</p>
        
        <h3>Write a Story-Driven Summary</h3>
        <p>Your summary should tell your professional story, not just list your skills. Focus on achievements and impact.</p>
        
        <h3>Optimize for Keywords</h3>
        <p>Research industry-specific keywords and naturally incorporate them throughout your profile.</p>
        
        <h3>Showcase Your Work</h3>
        <p>Use the featured section to highlight your best projects, articles, or achievements.</p>
        
        <h3>Stay Active and Engaged</h3>
        <p>Regular posting and engagement with others' content increases your visibility in the LinkedIn algorithm.</p>
      `,
            author: 'LinkedIn Specialist',
            date: '2025-01-10',
            readTime: '6 min read',
            category: 'Career Growth',
            tags: ['LinkedIn', 'Personal Branding', 'Networking'],
            featured: true
        },
        {
            id: '4',
            title: 'Technical Interview Trends: What to Expect in 2025',
            excerpt: 'Technical interviews are evolving rapidly. Stay ahead of the curve with insights into the latest trends and expectations.',
            content: `
        <p>Technical interviews have become more sophisticated and comprehensive than ever before. Here's what candidates can expect in 2025:</p>
        
        <h3>System Design Takes Center Stage</h3>
        <p>Even for mid-level positions, system design questions are becoming standard. Companies want to see how you think about scalability and architecture.</p>
        
        <h3>Real-World Problem Solving</h3>
        <p>Gone are the days of abstract algorithmic puzzles. Modern technical interviews focus on practical problems you'd actually solve on the job.</p>
        
        <h3>Collaborative Coding</h3>
        <p>Many companies now conduct pair programming sessions to assess how well you work with others and communicate your thought process.</p>
        
        <h3>Domain-Specific Knowledge</h3>
        <p>Expect deeper dives into the specific technologies and frameworks relevant to the role you're applying for.</p>
      `,
            author: 'Tech Interview Expert',
            date: '2025-01-08',
            readTime: '8 min read',
            category: 'Interview Prep',
            tags: ['Technical Interviews', 'Programming', 'System Design'],
            featured: false
        },
        {
            id: '5',
            title: 'Building Your Personal Brand in Tech',
            excerpt: 'Learn how to build a strong personal brand that opens doors and creates opportunities in the competitive tech industry.',
            content: `
        <p>In today's competitive tech landscape, having strong technical skills isn't enough. Building a personal brand can set you apart and create new opportunities.</p>
        
        <h3>Define Your Unique Value</h3>
        <p>What makes you different from other developers? Identify your unique combination of skills, experiences, and perspectives.</p>
        
        <h3>Share Your Knowledge</h3>
        <p>Write blog posts, create tutorials, or speak at conferences. Sharing knowledge establishes you as a thought leader.</p>
        
        <h3>Build in Public</h3>
        <p>Share your learning journey, projects, and insights on social media. Transparency builds trust and connection.</p>
        
        <h3>Network Authentically</h3>
        <p>Focus on building genuine relationships rather than just collecting contacts. Offer value before asking for anything.</p>
      `,
            author: 'Brand Strategy Team',
            date: '2025-01-05',
            readTime: '6 min read',
            category: 'Career Growth',
            tags: ['Personal Branding', 'Networking', 'Career Development'],
            featured: false
        },
        {
            id: '6',
            title: 'Success Story: From Bootcamp to FAANG in 18 Months',
            excerpt: 'Follow Alex\'s inspiring journey from coding bootcamp graduate to landing a software engineer role at a top tech company.',
            content: `
        <p>Alex's story proves that with the right strategy and dedication, it's possible to break into top tech companies even without a traditional computer science background.</p>
        
        <h3>The Starting Point</h3>
        <p>After completing a 6-month coding bootcamp, Alex felt overwhelmed by the job market and unsure how to compete with CS graduates.</p>
        
        <h3>The Strategy</h3>
        <p>Using SkillN's AI-powered analysis, Alex identified key areas to focus on and developed a structured preparation plan that included:</p>
        <ul>
          <li>Daily coding practice with focus on data structures and algorithms</li>
          <li>Building impressive portfolio projects</li>
          <li>Mock interview sessions to build confidence</li>
          <li>Strategic networking and personal branding</li>
        </ul>
        
        <h3>The Results</h3>
        <p>After 18 months of focused effort, Alex received offers from three FAANG companies and chose the role that best aligned with career goals.</p>
        
        <h3>Key Takeaways</h3>
        <ul>
          <li>Consistent practice and learning compound over time</li>
          <li>Quality projects matter more than quantity</li>
          <li>Interview skills can be learned and improved</li>
          <li>Persistence and resilience are crucial</li>
        </ul>
      `,
            author: 'Success Stories Team',
            date: '2025-01-03',
            readTime: '5 min read',
            category: 'Success Stories',
            tags: ['Success Story', 'FAANG', 'Career Change', 'Bootcamp'],
            featured: true
        }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const featuredPosts = blogPosts.filter(post => post.featured);

    if (selectedPost) {
        return (
            <main className="flex-grow bg-black text-white min-h-screen">
                <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-12">
                    <button
                        onClick={() => setSelectedPost(null)}
                        className="flex items-center text-white hover:text-gray-500 mb-8 transition-colors group"
                    >
                        <ArrowRight size={20} className="mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </button>

                    <article className="bg-[#0a0a0a] rounded-xl border border-gray-800 overflow-hidden">
                        <div className="p-6 lg:p-12">
                            <header className="mb-8">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                                    <span className="px-3 py-1 inline-flex items-center justify-center whitespace-nowrap bg-blue-500/10 text-white rounded-full text-xs sm:text-sm border border-blue-500/20">
                                        {selectedPost.category}
                                    </span>
                                    <div className="flex flex-nowrap items-center gap-2 overflow-x-auto">
                                        {selectedPost.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded text-xs sm:text-xs whitespace-nowrap">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>


                                <h1 className="text-2xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                                    {selectedPost.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                                            <User size={16} className="text-black" />
                                        </div>
                                        <span>{selectedPost.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        <span>{new Date(selectedPost.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} />
                                        <span>{selectedPost.readTime}</span>
                                    </div>
                                </div>
                            </header>

                            <div
                                className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 prose-strong:text-white"
                                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                            />
                        </div>
                    </article>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-grow bg-black text-white min-h-screen">
            {/* Header */}
            {/* <div className="border-b border-gray-800"> */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-white">Blog</h1>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Rss size={24} />
                    </button>
                </div>
                {/* </div> */}
            </div>

            {/* Search and Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="relative flex-1 max-w-md">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${selectedCategory === category
                                        ? 'bg-neutral-950 text-white'
                                        : 'bg-[#0a0a0a] text-gray-400 hover:text-white hover:bg-gray-800/50 border border-gray-800'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Posts Grid */}
                {selectedCategory === 'All' && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-8">Featured Articles</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {featuredPosts.slice(0, 2).map(post => (
                                <article
                                    key={post.id}
                                    className="group bg-[#0a0a0a] rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300 cursor-pointer"
                                    onClick={() => setSelectedPost(post)}
                                >
                                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-3 py-1 bg-blue-600/10 text-neutral-400 rounded-full text-sm font-medium">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neutral-400 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-gray-500 text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                                    <User size={12} className="text-black" />
                                                </div>
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span>{new Date(post.date).toLocaleDateString()}</span>
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Posts Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-8">
                        {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map(post => (
                            <article
                                key={post.id}
                                className="group bg-[#0a0a0a] rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                                onClick={() => setSelectedPost(post)}
                            >
                                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                    {post.featured && (
                                        <div className="absolute top-4 right-4">
                                            <span className="px-2 py-1 bg-white text-black rounded-full text-xs font-bold">
                                                Featured
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-neutral-400 transition-colors line-clamp-2 leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded text-xs">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between text-gray-500 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                                <User size={10} className="text-black" />
                                            </div>
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-20 bg-gradient-to-r from-blue-900/10 to-black rounded-2xl border border-blue-500/20 p-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                    <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                        Career tips and trends, delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                        />
                        <button className="px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-400 transition-colors font-medium">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Blog;