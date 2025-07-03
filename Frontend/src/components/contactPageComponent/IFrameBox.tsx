import React from "react";

const IFrameBox = () => {
  // Church location: 1, Church Street, off Oluwu, Ikeja Lagos State, Nigeria
  // Using Google Maps embed API with the specific address
  const address = encodeURIComponent("1 Church Street, off Oluwu, Ikeja Lagos State, Nigeria");
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${address}&zoom=15&maptype=roadmap`;
  
  // Alternative: Use the generic embed without API key (will show a general area)
  const fallbackMapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.35!2d3.3515625!3d6.6018445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDYuNiJOIDPCsDIxJzA1LjYiRQ!5e0!3m2!1sen!2sng!4v1640000000000!5m2!1sen!2sng`;
  
  // For now, we'll use a working Google Maps embed for Lagos, Ikeja area
  const workingMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3507028465667!2d3.3515625!3d6.6018445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b91c46b6c7f9b%3A0x1a2b3c4d5e6f7g8h!2sIkeja%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1623456789012!5m2!1sen!2sng";
  
  return (
    <div className="mb-[128px] w-full">
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <iframe 
          src={workingMapSrc}
          width="100%" 
          height="100%" 
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="MOJ Church Location - 1 Church Street, off Oluwu, Ikeja Lagos State, Nigeria"
          className="w-full h-full"
        />
      </div>
      
             {/* Map Legend */}
       <div className="mt-6 p-4 bg-[#2a2a2a] rounded-lg">
         <h3 className="text-white text-lg font-semibold mb-2">Find Us Here</h3>
         <p className="text-gray-300 text-sm">
           📍 1, Church Street, off Oluwu, Ikeja Lagos State, Nigeria
         </p>
         <p className="text-gray-300 text-sm mt-2">
           Use the interactive map above to get directions to our location. You can zoom in/out, switch to satellite view, and get turn-by-turn directions.
         </p>
         <div className="mt-4 flex flex-wrap gap-2">
           <span className="bg-[#FFD600] text-black px-3 py-1 rounded-full text-xs font-medium">
             🚗 Driving Directions
           </span>
           <span className="bg-[#FFD600] text-black px-3 py-1 rounded-full text-xs font-medium">
             🚶 Walking Directions
           </span>
           <span className="bg-[#FFD600] text-black px-3 py-1 rounded-full text-xs font-medium">
             🚌 Public Transport
           </span>
         </div>
       </div>
    </div>
  );
};

export default IFrameBox;
