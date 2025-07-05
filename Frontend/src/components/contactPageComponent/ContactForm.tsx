"use client";

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_qvszp4c';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_qrw9p4h';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'DdmW-WL0H8Cxu3qdI';

      // Template parameters for EmailJS
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        to_name: 'MOJ Church Team',
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
        // Add timestamp for reference
        timestamp: new Date().toLocaleString('en-NG', {
          timeZone: 'Africa/Lagos',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log('Sending email with params:', templateParams);

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('Email sent successfully:', response);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error: any) {
      console.error('Email sending failed:', error);
      
      // Handle different types of errors
      if (error.status === 400) {
        console.error('Bad request - check your template variables');
      } else if (error.status === 429) {
        console.error('Rate limit exceeded - too many requests');
      } else if (error.status === 403) {
        console.error('Access denied - check your service configuration');
      } else {
        console.error('Email service error:', error.text || error.message);
      }
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label
              htmlFor="firstName"
              className="block text-white text-lg font-medium"
            >
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full bg-transparent border-2 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-all duration-300 ${
                errors.firstName ? 'border-red-500' : 'border-gray-500 hover:border-gray-400'
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span className="text-red-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.firstName}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <label
              htmlFor="lastName"
              className="block text-white text-lg font-medium"
            >
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full bg-transparent border-2 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-all duration-300 ${
                errors.lastName ? 'border-red-500' : 'border-gray-500 hover:border-gray-400'
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <span className="text-red-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-3">
          <label
            htmlFor="email"
            className="block text-white text-lg font-medium"
          >
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full bg-transparent border-2 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-all duration-300 ${
              errors.email ? 'border-red-500' : 'border-gray-500 hover:border-gray-400'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <span className="text-red-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </span>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-3">
          <label
            htmlFor="subject"
            className="block text-white text-lg font-medium"
          >
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full bg-transparent border-2 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-all duration-300 ${
              errors.subject ? 'border-red-500' : 'border-gray-500 hover:border-gray-400'
            }`}
            placeholder="What would you like to discuss?"
          />
          {errors.subject && (
            <span className="text-red-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.subject}
            </span>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-3">
          <label
            htmlFor="message"
            className="block text-white text-lg font-medium"
          >
            Message *
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className={`w-full bg-transparent border-2 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-all duration-300 resize-vertical min-h-[150px] ${
              errors.message ? 'border-red-500' : 'border-gray-500 hover:border-gray-400'
            }`}
            placeholder="Tell us more about your inquiry..."
          />
          {errors.message && (
            <span className="text-red-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.message}
            </span>
          )}
          <div className="text-gray-400 text-sm text-right">
            {formData.message.length}/1000
          </div>
        </div>

        {/* Submit Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-600/20 border border-green-500 text-green-400 p-6 rounded-xl">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-lg">Message sent successfully!</p>
                <p className="text-sm mt-1">Thank you for contacting us. We've received your message and will get back to you within 24 hours.</p>
              </div>
            </div>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="bg-red-600/20 border border-red-500 text-red-400 p-6 rounded-xl">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-lg">Failed to send message</p>
                <p className="text-sm mt-1">
                  There was an issue sending your message. Please try again or contact us directly at{" "}
                  <a href="mailto:fatokivictor2@gmail.com" className="underline hover:text-white transition-colors">
                    fatokivictor2@gmail.com
                  </a>
                  {" "}or call{" "}
                  <a href="tel:+2347067935319" className="underline hover:text-white transition-colors">
                    +234 706 793 5319
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-12 py-4 bg-[#FFD600] text-black rounded-full font-bold text-lg transition-all duration-300 min-w-[250px] ${
              isSubmitting 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                Sending Message...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Message
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
