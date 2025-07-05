"use client";

import React, { useEffect, useState } from "react";
import { CoordinatorMessage } from "@/types/dataTypes";
import useMessage from "@/hooks/useMessage";
import { fetchData } from "@/utils/fetchData";
import Loader from "../Loader/Loader";

// Fallback data in case API is not available or no messages found
const fallbackContent = {
  title: "Welcome to Coordinator's Corner",
  content: `It is with great pleasure and a profound sense of responsibility that I stand before you as a coordinator of this esteemed teens' church.

Here at MOJ, we recognize the unique qualities and aspirations of each individual, and our mission is to provide a platform for spiritual growth, intellectual development, and meaningful connections.

As a coordinator, my primary goal is to ensure that every member of the MOJ family feels welcomed, valued, and supported in their journey of faith. We understand the challenges that teenagers face in today's rapidly changing world, and we are dedicated to creating an environment that addresses these challenges with wisdom, compassion, and relevance.

I encourage each of you to actively participate in the various programs, discussions, and activities that MOJ offers. Your engagement is not only welcomed but crucial to the vibrancy and success of our community. Feel free to reach out to me or our dedicated team with any questions, suggestions, or concerns you may have.

Welcome to Minds of Josiah, where faith is cultivated, minds are enriched, and community thrives.`,
  coordinator: {
    name: "MOJ Coordination Team",
    occupation: "Ministry Coordinators",
    image_url: "/images/pastor.svg",
  },
};

export const CoordinatorCorner: React.FC = () => {
  const { getLatestMessage } = useMessage();
  const [latestMessage, setLatestMessage] = useState<CoordinatorMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    fetchLatestMessage();
  }, []);

  const fetchLatestMessage = async () => {
    try {
      setLoading(true);
      const messageResponse = await fetchData(getLatestMessage);
      
      if (messageResponse && messageResponse.status === 200) {
        setLatestMessage(messageResponse.data.data as CoordinatorMessage);
        setUseFallback(false);
      } else {
        // Use fallback data if no coordinator messages are available
        setUseFallback(true);
      }
    } catch (error) {
      console.log("Error fetching coordinator message, using fallback:", error);
      setUseFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <Loader text="Loading Coordinator's Corner..." textColor="mt-[4em]" />;
  }

  // Use dynamic content if available, otherwise fallback
  const title = useFallback ? fallbackContent.title : latestMessage?.title || fallbackContent.title;
  const content = useFallback ? fallbackContent.content : latestMessage?.content || fallbackContent.content;
  const coordinatorName = useFallback ? fallbackContent.coordinator.name : latestMessage?.coordinatorId?.name || fallbackContent.coordinator.name;
  const coordinatorOccupation = useFallback ? fallbackContent.coordinator.occupation : latestMessage?.coordinatorId?.occupation || fallbackContent.coordinator.occupation;
  const coordinatorImage = useFallback ? fallbackContent.coordinator.image_url : latestMessage?.coordinatorId?.image_url || fallbackContent.coordinator.image_url;
  const datePublished = latestMessage?.datePublished;

  return (
    <section className=" flex xl:w-[1300px] lg:w-[1300px] sm:flex-col md:flex-col xl:h-[700px] lg:h-[700px] mx-auto mt-[4em]">
      <div>
        <h5 className="text-button font-medium xl:text-[20px] lg:text-[20px] sm:text-base md:text-base">
          COORDINATOR&apos;S CORNER
        </h5>
        <h1 className="xl:text-[54px] lg:text-[54px] sm:text-[24px] md:text-[24px] font-bold text-white xl:w-[565px] lg:w-[565px] ">
          {title}
        </h1>
        {!useFallback && datePublished && (
          <p className="text-[#FFD600] text-[12px] font-medium mb-4">
            Published on {formatDate(datePublished)}
          </p>
        )}
        <div className="text-white text-[14px] font-normal mb-2 xl:w-[780px] lg:w-[780px]">
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        <span className="text-white font-medium xl:text-[20px] lg:text-[20px] sm:text-base md:text-base ">
          {useFallback ? "Sincerely" : "By"}
        </span>
        <br />
        <span className="xl:text-[20px] lg:text-[20px] text-button font-medium sm:text-base md:text-base">
          {coordinatorName}
        </span>
        <br />
        <span className="xl:text-[15px] lg:text-[15px] text-button font-medium sm:text-base md:text-base">
          {coordinatorOccupation}
        </span>
      </div>
      <div 
        className="pastorImg xl:h-[633.42px] lg:h-[633.42px] sm:h-[406px] md:h-[406px] w-full"
        style={{
          backgroundImage: `url(${coordinatorImage})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </section>
  );
}; 