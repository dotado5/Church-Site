"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import location_icon from '../../../public/images/location_icon.png';
import call_icon from '../../../public/images/call_icon.png';
import mail_icon from '../../../public/images/mail_icon.png';
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
    <div className="flex w-full gap-8 lg:gap-[119px] items-start justify-center mt-16 sm:mt-24 lg:mt-[128px] mb-16 sm:mb-24 lg:mb-[130px] flex-col-reverse lg:flex-row px-4 sm:px-6">
      {/* Contact Information */}
      <div className="w-full lg:w-[280px] flex flex-col gap-4 lg:gap-[16px] order-2 lg:order-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-[16px]">
          <div className="flex flex-col sm:flex-row lg:flex-row items-start sm:items-center lg:items-center text-white text-sm sm:text-base lg:text-[18px] gap-2 lg:gap-[8px]">
            <div className="flex-shrink-0">
              <Image src={location_icon} alt="Location" width={24} height={24} className="sm:w-6 sm:h-6" />
            </div>
            <span className="leading-snug">1 Church Street, Olowu Ikeja, Lagos, Nigeria.</span>
          </div>
          
          <div className="flex flex-col sm:flex-row lg:flex-row items-start sm:items-center lg:items-center text-white text-sm sm:text-base lg:text-[18px] gap-2 lg:gap-[8px]">
            <div className="flex-shrink-0">
              <Image src={call_icon} alt="Phone" width={24} height={24} className="sm:w-6 sm:h-6" />
            </div>
            <a href="tel:+2347067935319" className="hover:text-[#FFD600] transition-colors">
              +234 706 793 5319
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row lg:flex-row items-start sm:items-center lg:items-center text-white text-sm sm:text-base lg:text-[18px] gap-2 lg:gap-[8px]">
            <div className="flex-shrink-0">
              <Image src={mail_icon} alt="Email" width={24} height={24} className="sm:w-6 sm:h-6" />
            </div>
            <a href="mailto:fatokivictor2@gmail.com" className="hover:text-[#FFD600] transition-colors break-all">
              fatokivictor2@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-md lg:max-w-none lg:flex-1 order-1 lg:order-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div className="flex flex-col items-start w-full gap-2">
              <label
                htmlFor="firstName"
                className="text-white text-base sm:text-lg lg:text-[20px] font-medium"
              >
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`bg-transparent border-b-2 w-full p-2 lg:p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-colors text-sm sm:text-base ${
                  errors.firstName ? 'border-red-500' : 'border-white'
                }`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs sm:text-sm">{errors.firstName}</span>
              )}
            </div>

            <div className="flex flex-col items-start w-full gap-2">
              <label
                htmlFor="lastName"
                className="text-white text-base sm:text-lg lg:text-[20px] font-medium"
              >
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`bg-transparent border-b-2 w-full p-2 lg:p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-colors text-sm sm:text-base ${
                  errors.lastName ? 'border-red-500' : 'border-white'
                }`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs sm:text-sm">{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col items-start w-full gap-2">
            <label
              htmlFor="email"
              className="text-white text-base sm:text-lg lg:text-[20px] font-medium"
            >
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`bg-transparent border-b-2 w-full p-2 lg:p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-colors text-sm sm:text-base ${
                errors.email ? 'border-red-500' : 'border-white'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <span className="text-red-500 text-xs sm:text-sm">{errors.email}</span>
            )}
          </div>

          {/* Subject Field */}
          <div className="flex flex-col items-start w-full gap-2">
            <label
              htmlFor="subject"
              className="text-white text-base sm:text-lg lg:text-[20px] font-medium"
            >
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`bg-transparent border-b-2 w-full p-2 lg:p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-colors text-sm sm:text-base ${
                errors.subject ? 'border-red-500' : 'border-white'
              }`}
              placeholder="Enter subject"
            />
            {errors.subject && (
              <span className="text-red-500 text-xs sm:text-sm">{errors.subject}</span>
            )}
          </div>

          {/* Message Field */}
          <div className="flex flex-col items-start w-full gap-2">
            <label
              htmlFor="message"
              className="text-white text-base sm:text-lg lg:text-[20px] font-medium"
            >
              Message *
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className={`bg-transparent border-2 w-full p-3 lg:p-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-colors resize-vertical text-sm sm:text-base min-h-[100px] ${
                errors.message ? 'border-red-500' : 'border-white'
              }`}
              placeholder="Enter your message (minimum 10 characters)"
            />
            {errors.message && (
              <span className="text-red-500 text-xs sm:text-sm">{errors.message}</span>
            )}
          </div>

          {/* Submit Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-600 text-white p-4 rounded-lg">
              <p className="font-medium text-sm sm:text-base">✅ Message sent successfully!</p>
              <p className="text-xs sm:text-sm mt-1">Thank you for contacting us. We've received your message and will get back to you within 24 hours.</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="bg-red-600 text-white p-4 rounded-lg">
              <p className="font-medium text-sm sm:text-base">❌ Failed to send message</p>
              <p className="text-xs sm:text-sm mt-1">
                There was an issue sending your message. Please try again or contact us directly at{" "}
                <a href="mailto:fatokivictor2@gmail.com" className="underline hover:text-yellow-300">
                  fatokivictor2@gmail.com
                </a>
                {" "}or call{" "}
                <a href="tel:+2347067935319" className="underline hover:text-yellow-300">
                  +234 706 793 5319
                </a>
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex bg-button p-3 lg:p-4 rounded-full items-center gap-2 text-sm sm:text-base lg:text-[20px] font-medium w-full sm:w-auto sm:min-w-[200px] lg:w-[210px] text-center justify-center transition-all duration-300 ${
              isSubmitting 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#e6c200] hover:scale-105 active:scale-95'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
