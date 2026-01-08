import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post("/user/login", { email, password });

      if (response.data) {
        toast.success("Login Successful!", {
          position: 'top-right',
          autoClose: 1500,
          theme: 'colored',
        });
        login(response.data.user);
        setTimeout(() => {
          const role = response.data.user.role;
          if (role === 'admin') {
            navigate('/admin');
          } else if (role === 'teacher') {
            navigate('/teacher-dashboard');
          } else if (role === 'book_seller') {
            navigate('/seller-dashboard');
          } else {
            navigate("/"); // Student or other
          }
        }, 1500);
      }
    } catch (err: any) {
      if (err.response) {
        console.log(err);
        setError("Error: " + err.response.data.message);
        toast.error("Error: " + err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-12"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/66905/wall-white-black-abstract-66905.jpeg')`,
      }}
    >
      <div className="w-full max-w-lg md:bg-none md:shadow-lg md:px-10 md:py-10 md:border md:border-gray-200 md:rounded-none">
        <ToastContainer />
        <div className="text-center">
          <h2 className="text-5xl font-bold">
            <span className="text-white-700">Log</span>
            <span className="text-white-700">in</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-400">
            Log in to access premium features
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Or{' '}
            <Link to="/signup" className="font-medium text-white hover:text-gray-500">
              create a new account
            </Link>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-6 mb-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Unable to Log in</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-6 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-700 sm:text-sm text-black"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                Remember me
              </label>
            </div>

            {/* <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-gray-600 hover:text-white">
                Forgot your password?
              </Link>
            </div> */}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading
                ? 'bg-white cursor-not-allowed'
                : 'bg-neutral-950 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 border-white'
                }`}
            >
              {loading ? 'Signing in...' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
