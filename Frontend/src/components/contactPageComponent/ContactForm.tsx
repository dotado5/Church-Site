"use client";

import Image from "next/image";
import React, { useState } from "react";
import location_icon from "../../../public/images/location_icon.png";
import call_icon from "../../../public/images/call_icon.png";
import mail_icon from "../../../public/images/mail_icon.png";
import { Button } from "../Button";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
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
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, just log the form data
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full gap-[119px] sm:gap-8 md:gap-8 items-center sm:items-start md:items-start mt-[128px] sm:mt-[4em] md:mt-[4em] mb-[130px] sm:mb-[4em] md:mb-[4em] sm:flex-col-reverse md:flex-col-reverse">
      <div className="w-[280px] flex flex-col gap-[16px]">
        <p className="flex items-center text-white text-[18px] gap-[8px] sm:text-base md:text-base">
          <Image src={location_icon} alt="Location" width={100} />
          1 Church Street, Olowu Ikeja, Lagos, Nigeria.
        </p>
        <p className="flex items-center text-white text-[18px] gap-[8px] sm:text-base md:text-base">
          <Image src={call_icon} alt="Phone" width={100} />
          +234 706 793 5319
        </p>
        <p className="flex items-center text-white text-[18px] gap-[8px] sm:text-base md:text-base">
          <Image src={mail_icon} alt="Email" width={100} />
          fatokivictor2@gmail.com
        </p>
      </div>

      <form className="w-full flex flex-col gap-[32px]" onSubmit={handleSubmit}>
        <div className="w-full flex gap-[20px] sm:flex-col md:flex-col">
          <div className="flex flex-col items-start w-full gap-4">
            <label
              htmlFor="name"
              className="text-white text-[20px] font-medium sm:text-base md:text-base"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`bg-transparent border-b-2 w-full p-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-colors ${
                errors.name ? 'border-red-500' : 'border-white'
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col items-start w-full gap-4">
            <label
              htmlFor="email"
              className="text-white text-[20px] font-medium sm:text-base md:text-base"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`bg-transparent border-b-2 w-full p-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-colors ${
                errors.email ? 'border-red-500' : 'border-white'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-start w-full gap-4">
          <label
            htmlFor="subject"
            className="text-white text-[20px] font-medium sm:text-base md:text-base"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`bg-transparent border-b-2 w-full p-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-colors ${
              errors.subject ? 'border-red-500' : 'border-white'
            }`}
            placeholder="Enter subject"
          />
          {errors.subject && (
            <span className="text-red-500 text-sm">{errors.subject}</span>
          )}
        </div>
        
        <div className="flex flex-col items-start w-full gap-4">
          <label
            htmlFor="message"
            className="text-white text-[20px] font-medium sm:text-base md:text-base"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className={`bg-transparent border-2 w-full p-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD600] transition-colors resize-vertical ${
              errors.message ? 'border-red-500' : 'border-white'
            }`}
            placeholder="Enter your message (minimum 10 characters)"
          />
          {errors.message && (
            <span className="text-red-500 text-sm">{errors.message}</span>
          )}
        </div>

        {/* Submit Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-600 text-white p-4 rounded-lg">
            <p className="font-medium">Message sent successfully!</p>
            <p className="text-sm">Thank you for contacting us. We'll get back to you soon.</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="bg-red-600 text-white p-4 rounded-lg">
            <p className="font-medium">Failed to send message.</p>
            <p className="text-sm">Please try again or contact us directly.</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex bg-button p-4 rounded-full items-center gap-2 text-[20px] sm:text-base md:text-base font-medium w-[210px] sm:w-[150px] md:w-[150px] text-center justify-center transition-all duration-300 ${
            isSubmitting 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-[#e6c200] hover:scale-105'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
