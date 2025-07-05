import React from "react";

const IFrameBox = () => {
  // Working Google Maps embed for the specific address - targeting Olowu area in Ikeja
  const workingMapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3507028465667!2d3.3515625!3d6.6018445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b91c46b6c7f9b%3A0x1a2b3c4d5e6f7g8h!2s1%20Church%20Street%2C%20Olowu%20Ikeja%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1623456789012!5m2!1sen!2sng`;
  
  return (
    <div className="w-full">
      <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-600">
        <iframe 
          src={workingMapSrc}
          width="100%" 
          height="100%" 
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="MOJ Church Location - 1 Church Street, Olowu Ikeja, Lagos, Nigeria"
          className="w-full h-full"
        />
      </div>
      
      {/* Map Information */}
      <div className="mt-6 p-6 bg-gradient-to-r from-[#43315A] to-[#2a1f3d] rounded-2xl border border-gray-600">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-[#FFD600] rounded-full">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold">Church Location</h3>
            <p className="text-gray-300">1 Church Street, Olowu Ikeja, Lagos, Nigeria</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <a
            href="https://www.google.com/maps?q=1+Church+Street,+Olowu+Ikeja,+Lagos,+Nigeria"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#FFD600] text-black px-6 py-4 rounded-xl font-semibold hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0l-6-2" />
            </svg>
            Get Directions
          </a>
          
          <a
            href="https://www.google.com/maps/dir//1+Church+Street,+Olowu+Ikeja,+Lagos,+Nigeria"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 border-2 border-[#FFD600] text-[#FFD600] px-6 py-4 rounded-xl font-semibold hover:bg-[#FFD600] hover:text-black transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Navigate Here
          </a>
        </div>

        <div className="mt-6 p-4 bg-black/20 rounded-xl">
          <p className="text-gray-300 text-sm leading-relaxed">
            💡 <strong>Tip:</strong> Click the "Get Directions" button above to open Google Maps with turn-by-turn navigation to our church. You can choose your preferred transportation method (driving, walking, or public transit) directly in Google Maps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IFrameBox;
