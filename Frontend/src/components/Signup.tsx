import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Mail, ArrowRight } from 'lucide-react';
import api from "../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/user/signup", {
        fullname: formData.name,
        email: formData.email,
        password: formData.password,
        role: role
      });

      if (response.data) {
        toast.success("Signup Successful! Please Login.", {
          position: 'top-right',
          autoClose: 1500,
          theme: 'colored',
        });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }

    } catch (err: any) {
      if (err.response) {
        setError("Error: " + err.response.data.message);
        toast.error("Error: " + err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-12"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/66905/wall-white-black-abstract-66905.jpeg')`
      }}
    >
      <div className="w-full max-w-lg px-2 py-6 bg-black/80 backdrop-blur-sm rounded-2xl md:px-10 md:py-10 md:shadow-lg md:border md:border-gray-800">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">Create an Account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Already a member?{' '}
            <Link to="/login" className="font-medium text-white hover:text-gray-300">
              Log in
            </Link>
          </p>
        </div>

        {error && (
          <div className="mt-6 mb-4 rounded-md bg-red-500/10 border border-red-500/20 p-4">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <div className="mt-6 mb-6">
          <label className="block text-sm font-medium text-white mb-3">I want to join as a:</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-2 px-1 rounded-lg text-xs sm:text-sm font-medium border transition-all ${role === 'student' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'}`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`py-2 px-1 rounded-lg text-xs sm:text-sm font-medium border transition-all ${role === 'teacher' ? 'bg-blue-600 text-white border-blue-600' : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'}`}
            >
              Teacher
            </button>
            <button
              type="button"
              onClick={() => setRole('book_seller')}
              className={`py-2 px-1 rounded-lg text-xs sm:text-sm font-medium border transition-all ${role === 'book_seller' ? 'bg-purple-600 text-white border-purple-600' : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'}`}
            >
              Book Seller
            </button>
          </div>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSignup}>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Full Name
            </label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                placeholder="Your full name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email Address
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                placeholder="example@gmail.com"
                required
              />
            </div>
          </div>



          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
              I agree to the{' '}
              <a href="#" className="text-white hover:text-gray-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-white hover:text-gray-700">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading
                ? 'bg-white cursor-not-allowed'
                : 'bg-neutral-950 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 border-white'
                }`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
