import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, User, FileText } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('idle');
    }, 3000);
  };

  return (
    <main className="flex-grow bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare size={48} className="text-white mr-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Contact Us</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
              <p className="text-gray-300 mb-8">
                Whether you have questions about our AI-powered interview preparation platform, need technical support, or want to provide feedback, we'd love to hear from you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-neutral-950 p-3 rounded-lg">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Email Support</h3>
                  <p className="text-gray-400 mb-2">Get help with your account or technical issues</p>
                  <a href="mailto:support@skilln.com" className="text-white hover:text-blue-300 transition-colors">
                    support@skilln.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-neutral-950 p-3 rounded-lg">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Phone Support</h3>
                  <p className="text-gray-400 mb-2">Speak directly with our support team</p>
                  <a href="tel:+15551234567" className="text-white hover:text-green-300 transition-colors">
                    +91 0987654321
                  </a>
                </div>
              </div>

              {/* <div className="flex items-start space-x-4">
                <div className="bg-neutral-950 p-3 rounded-lg">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Office Location</h3>
                  <p className="text-gray-400 mb-2">Visit us at our headquarters</p>
                  <p className="text-white">
                    Bhubaneswar, Odisha, India
                  </p>
                </div>
              </div> */}

              <div className="flex items-start space-x-4">
                <div className="bg-neutral-950 p-3 rounded-lg">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Business Hours</h3>
                  <p className="text-gray-400 mb-2">When you can reach us</p>
                  <div className="text-white space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Contact Options */}
            <div className="bg-neutral-950 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Globe size={20} className="mr-2 text-white" />
                Other Ways to Connect
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">General Inquiries</span>
                  <a href="mailto:info@skilln.com" className="text-white hover:text-blue-300 transition-colors">
                    diwakarr956@gmail.com
                  </a>
                </div>
                {/* <div className="flex items-center justify-between">
                  <span className="text-gray-300">Business Partnerships</span>
                  <a href="mailto:partnerships@skilln.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    partnerships@skilln.com
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Media & Press</span>
                  <a href="mailto:press@skilln.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    press@skilln.com
                  </a>
                </div> */}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-neutral-950 rounded-lg p-8 border border-gray-800">
            <h2 className="text-2xl font-semibold text-white mb-6">Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className="bg-green-900/30 border border-green-500/30 text-green-200 px-4 py-3 rounded-lg mb-6">
                Thank you for your message! We'll get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <div className="relative">
                  <FileText size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-950 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-vertical"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-neutral-950 text-white rounded-lg hover:from-neutral-950 hover:to-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibol border border-gray-800"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                We typically respond within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-medium text-white mb-3">How does the AI resume analysis work?</h3>
              <p className="text-gray-400 text-sm">
                Our AI analyzes your resume content, identifies key skills and experiences, and provides personalized interview preparation recommendations based on your background.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-medium text-white mb-3">Is my resume data secure?</h3>
              <p className="text-gray-400 text-sm">
                Yes, we use enterprise-grade security measures to protect your data. Your resume information is encrypted and never shared with third parties without your consent.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-medium text-white mb-3">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-400 text-sm">
                Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-medium text-white mb-3">Do you offer refunds?</h3>
              <p className="text-gray-400 text-sm">
                We offer a 30-day money-back guarantee for new subscribers. Contact our support team if you're not satisfied with our service.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default Contact;