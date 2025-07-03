"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { useMemories } from "@/hooks/useMemories";
import { Memory } from "@/types/dataTypes";
import { fetchData } from "@/utils/fetchData";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// Fallback gallery data using existing public images
const fallbackMemories: Memory[] = [
  {
    _id: "fallback-1",
    imageUrl: "/images/groupPic.svg",
    height: 600,
    width: 800,
    imgType: "svg",
    activityId: "group-photo-1"
  },
  {
    _id: "fallback-2", 
    imageUrl: "/images/Group1.svg",
    height: 400,
    width: 400,
    imgType: "svg",
    activityId: "event-1"
  },
  {
    _id: "fallback-3",
    imageUrl: "/images/Group2.svg", 
    height: 300,
    width: 500,
    imgType: "svg",
    activityId: "event-2"
  },
  {
    _id: "fallback-4",
    imageUrl: "/images/Group3.svg",
    height: 500,
    width: 300,
    imgType: "svg", 
    activityId: "event-3"
  },
  {
    _id: "fallback-5",
    imageUrl: "/images/Group4.svg",
    height: 400,
    width: 600,
    imgType: "svg",
    activityId: "event-4"
  },
  {
    _id: "fallback-6",
    imageUrl: "/images/Group5.svg",
    height: 350,
    width: 350,
    imgType: "svg",
    activityId: "event-5"
  },
  {
    _id: "fallback-7",
    imageUrl: "/images/Group6.svg",
    height: 450,
    width: 300,
    imgType: "svg",
    activityId: "event-6"
  },
  {
    _id: "fallback-8",
    imageUrl: "/images/pastor.svg",
    height: 600,
    width: 400,
    imgType: "svg",
    activityId: "pastor-event"
  },
  {
    _id: "fallback-9",
    imageUrl: "/images/busayor.png",
    height: 400,
    width: 400,
    imgType: "png",
    activityId: "coordinator-spotlight"
  },
  {
    _id: "fallback-10",
    imageUrl: "/images/paul_smith.png",
    height: 300,
    width: 400,
    imgType: "png",
    activityId: "coordinator-spotlight-2"
  }
];

const Gallery = () => {
  const pathName = usePathname();
  const { getAllMemories } = useMemories();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, [pathName]);

  useEffect(() => {
    loadGalleryData();
  }, []);

  const loadGalleryData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const memoriesResponse = await fetchData(() => getAllMemories());
      
      if (memoriesResponse?.status === 200 && memoriesResponse.data?.length > 0) {
        setMemories(memoriesResponse.data as Memory[]);
        setUsingFallback(false);
      } else {
        // Use fallback data if API returns no memories
        console.log("No memories from API, using fallback gallery");
        setMemories(fallbackMemories);
        setUsingFallback(true);
      }
    } catch (error) {
      console.error("Error fetching memories:", error);
      // Use fallback data on error
      console.log("API error, using fallback gallery");
      setMemories(fallbackMemories);
      setUsingFallback(true);
      setError(null); // Don't show error since we have fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* Header Section */}
      <div className="w-full max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-[65px] font-bold text-white text-center sm:text-[36px] md:text-[42px] mb-4">
            MOJ in Frames: A Visual Journey
          </h1>
          <p className="text-white text-[18px] text-center sm:text-base md:text-base max-w-2xl">
            Explore Memorable Moments, Events, and Celebrations Captured in Our Gallery.
          </p>
          
          {/* Gallery Status */}
          {usingFallback && (
            <div className="mt-6 bg-blue-600 bg-opacity-20 border border-blue-400 rounded-lg px-4 py-3">
              <p className="text-blue-200 text-sm">
                📸 Displaying sample gallery. Real memories from our backend will appear here once uploaded!
              </p>
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        <GalleryGrid 
          memories={memories} 
          loading={loading} 
          error={error}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WithNavbar(Gallery);
