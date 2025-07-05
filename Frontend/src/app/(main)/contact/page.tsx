"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import ContactForm from "@/components/contactPageComponent/ContactForm";
import IFrameBox from "@/components/contactPageComponent/IFrameBox";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Contact = () => {
  const pathName = usePathname();

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, [pathName]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#43315A] to-[#2a1f3d] py-20 md:py-32">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Get in <span className="text-[#FFD600]">Touch</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Information Cards Section */}
      <div className="py-16 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Multiple Ways to <span className="text-[#FFD600]">Connect</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Choose the method that works best for you to get in touch with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location Card */}
            <div className="bg-gradient-to-br from-[#43315A] to-[#2a1f3d] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700">
              <div className="flex items-center justify-center w-16 h-16 bg-[#FFD600] rounded-full mb-6 mx-auto">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">Visit Us</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                1 Church Street, Olowu Ikeja, Lagos, Nigeria
              </p>
              <div className="mt-6 text-center">
                <button 
                  onClick={() => {
                    const mapSection = document.getElementById('map-section');
                    mapSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[#FFD600] hover:text-white transition-colors duration-300 font-medium cursor-pointer"
                >
                  Get Directions →
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-gradient-to-br from-[#43315A] to-[#2a1f3d] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700">
              <div className="flex items-center justify-center w-16 h-16 bg-[#FFD600] rounded-full mb-6 mx-auto">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">Call Us</h3>
              <p className="text-gray-300 text-center leading-relaxed mb-2">
                Ready to talk? Give us a call!
              </p>
              <div className="text-center">
                <a 
                  href="tel:+2347067935319" 
                  className="text-[#FFD600] hover:text-white transition-colors duration-300 font-medium text-lg"
                >
                  +234 706 793 5319
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-gradient-to-br from-[#43315A] to-[#2a1f3d] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700">
              <div className="flex items-center justify-center w-16 h-16 bg-[#FFD600] rounded-full mb-6 mx-auto">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">Email Us</h3>
              <p className="text-gray-300 text-center leading-relaxed mb-2">
                Send us an email anytime!
              </p>
              <div className="text-center">
                <a 
                  href="mailto:fatokivictor2@gmail.com" 
                  className="text-[#FFD600] hover:text-white transition-colors duration-300 font-medium break-all"
                >
                  fatokivictor2@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-16 bg-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Send us a <span className="text-[#FFD600]">Message</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#43315A] to-[#2a1f3d] rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-700">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div id="map-section" className="py-16 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Our <span className="text-[#FFD600]">Location</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Use the interactive map below to get directions to our church.
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
            <IFrameBox />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WithNavbar(Contact);
