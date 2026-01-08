import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import AIInterview from './components/AIInterview';
import LinkedInBooster from './components/LinkedInBooster';
import SmartPrep from './components/SmartPrep';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import BookSellerDashboard from './components/BookSellerDashboard';
import DashboardLayout from './layouts/DashboardLayout';

import About from './components/About';
import Blog from './components/Blog';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Courses from './components/Courses';
import MyLearning from './components/MyLearning';
import PaymentCheckout from './components/PaymentCheckout';

import Profile from './components/Profile';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Hide loading screen after 2.5 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <AuthProvider>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/mylearning" element={<MyLearning />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/analyzer" element={<ResumeAnalyzer />} />
            <Route path="/interview" element={<AIInterview />} />
            <Route path="/linkedin-boost" element={<LinkedInBooster />} />
            <Route path="/smart-prep" element={<SmartPrep />} />

            {/* Role Specific Dashboards */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/seller-dashboard" element={<BookSellerDashboard />} />
            <Route path="/checkout/:itemId" element={<PaymentCheckout />} />
          </Route>
        </Routes>
        <Footer />
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;