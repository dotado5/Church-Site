"use client";

import React, { useState, useEffect } from "react";
import { useMemories } from "@/hooks/useMemories";
import useActivities from "@/hooks/useActivities";
import { Memory, ActivityWithMemories } from "@/types/dataTypes";
import WithNavbar from "@/Layout/WithNavbar";
import { PageHeader } from "@/components/PageHeader";
import EventFilter from "@/components/gallery/EventFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Loader from "@/components/Loader/Loader";

const Gallery: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [events, setEvents] = useState<ActivityWithMemories[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMemories, setIsLoadingMemories] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { getGalleryByEvents, getMemoriesByActivity, getAllMemories } = useMemories();
  const { getAllActivities } = useActivities();

  // Load events with memories
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await getGalleryByEvents();
        if (response?.data?.data) {
          setEvents(response.data.data);
          // Load all memories by default
          await loadMemories(null, 1);
        } else {
          console.warn("No events data received, using fallback");
          await loadFallbackData();
        }
      } catch (error) {
        console.error("Error loading events:", error);
        // Fallback to loading all memories
        await loadFallbackData();
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Load fallback data if event-based API fails
  const loadFallbackData = async () => {
    try {
      // Try to get all memories and activities separately
      const [memoriesResponse, activitiesResponse] = await Promise.all([
        getAllMemories(1, 50),
        getAllActivities().catch(() => null)
      ]);

      if (memoriesResponse?.data?.data) {
        setMemories(memoriesResponse.data.data);
        setCurrentPage(memoriesResponse.data.pagination?.currentPage || 1);
        setTotalPages(memoriesResponse.data.pagination?.totalPages || 1);
        setHasNextPage(memoriesResponse.data.pagination?.hasNextPage || false);
      }

      // Create mock events if activities available
      if (activitiesResponse?.data?.data) {
        const mockEvents: ActivityWithMemories[] = activitiesResponse.data.data.map((activity: any) => ({
          ...activity,
          memoryCount: Math.floor(Math.random() * 10) + 1,
          previewMemories: []
        }));
        setEvents(mockEvents);
      }
    } catch (error) {
      console.error("Error loading fallback data:", error);
      setError("Failed to load gallery. Please try again later.");
    }
  };

  // Load memories based on selected event
  const loadMemories = async (eventId: string | null, page: number = 1) => {
    setIsLoadingMemories(true);
    setError(null);

    try {
      let response;
      
      if (eventId) {
        // Load memories for specific event
        response = await getMemoriesByActivity(eventId, page, 20);
        if (response?.data?.data) {
          setMemories(response.data.data.memories || []);
          setCurrentPage(response.data.data.pagination?.currentPage || 1);
          setTotalPages(response.data.data.pagination?.totalPages || 1);
          setHasNextPage(response.data.data.pagination?.hasNextPage || false);
        }
      } else {
        // Load all memories
        response = await getAllMemories(page, 50);
        if (response?.data?.data) {
          setMemories(response.data.data);
          setCurrentPage(response.data.pagination?.currentPage || 1);
          setTotalPages(response.data.pagination?.totalPages || 1);
          setHasNextPage(response.data.pagination?.hasNextPage || false);
        }
      }
    } catch (error) {
      console.error("Error loading memories:", error);
      setError("Failed to load photos. Please try again later.");
    } finally {
      setIsLoadingMemories(false);
    }
  };

  // Handle event selection
  const handleEventSelect = (eventId: string | null) => {
    setSelectedEventId(eventId);
    setCurrentPage(1);
    loadMemories(eventId, 1);
  };

  // Handle pagination
  const handleLoadMore = () => {
    if (hasNextPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadMemories(selectedEventId, nextPage);
    }
  };

  // Get current event info
  const currentEvent = selectedEventId ? events.find(e => e._id === selectedEventId) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        <PageHeader 
          title="Gallery" 
          description="Explore Memorable Moments, Events, and Celebrations Captured in Our Gallery"
          yellowText={false}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader text="Loading gallery..." textColor="text-white" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        <PageHeader 
          title="Gallery" 
          description="Explore Memorable Moments, Events, and Celebrations Captured in Our Gallery"
          yellowText={false}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#FFD600] text-black px-6 py-3 rounded-lg hover:bg-[#e6c200] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <PageHeader 
        title="Gallery" 
        description="Explore Memorable Moments, Events, and Celebrations Captured in Our Gallery"
        yellowText={false}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Event Filter */}
        <EventFilter
          events={events}
          selectedEventId={selectedEventId}
          onEventSelect={handleEventSelect}
          loading={isLoading}
        />

        {/* Gallery Stats */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-gray-400">
            {currentEvent ? (
              <span>
                Showing photos from <span className="text-[#FFD600]">{currentEvent.name}</span> 
                ({memories.length} photos)
              </span>
            ) : (
              <span>
                Showing all photos ({memories.length} photos)
              </span>
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        {isLoadingMemories ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader text="Loading photos..." textColor="text-white" />
          </div>
        ) : (
          <>
            <GalleryGrid 
              memories={memories} 
              loading={isLoadingMemories}
              error={error}
            />
            
            {/* Load More Button */}
            {hasNextPage && memories.length > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="bg-[#FFD600] text-black px-6 py-3 rounded-lg hover:bg-[#e6c200] transition-colors"
                >
                  Load More Photos
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WithNavbar(Gallery);
