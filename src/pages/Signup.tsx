import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    password: '',
    repeatPassword: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Main Container */}
      {/* Form Card */}
      <div className="bg-[#d2e0f5] w-lg rounded-2xl shadow-xl p-6 sm:p-8  relative">
        {/* Logo and Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-25 h-25 rounded-xl mb-4 shadow-lg">
            <img src="../../public/ZentaskLogo.png" alt="" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
            Sign up to Zentask
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm">
            Your ticketing system for efficient support
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-md font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm text-gray-800 placeholder-gray-400"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm text-gray-800 placeholder-gray-400"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Telephone Field */}
          <div>
            <label htmlFor="telephone" className="block text-md font-medium text-gray-700 mb-1">
              Telephone
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm text-gray-800 placeholder-gray-400"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-md font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm text-gray-800 placeholder-gray-400"
              placeholder="Create a strong password"
              required
            />
          </div>

          {/* Repeat Password Field */}
          <div>
            <label htmlFor="repeatPassword" className="block text-md font-medium text-gray-700 mb-1">
              Repeat Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm text-gray-800 placeholder-gray-400"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-[#2F43FF] text-[#F5F5F5] cursor-pointer hover:bg-[#5674FF] font-semibold py-3 rounded-full shadow-lg mt-6 transition-colors duration-200"
          >
            Register
          </button>

          {/* Sign In Link */}
          <div className="text-center pt-2">
            <p className="text-gray-600 text-xs">
              Already have an account?{' '}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;