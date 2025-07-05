"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemories } from "@/hooks/useMemories";
import useActivities from "@/hooks/useActivities";
import { Memory, ActivityWithMemories } from "@/types/dataTypes";
import WithNavbar from "@/Layout/WithNavbar";
import { PageHeader } from "@/components/PageHeader";
import EventFilter from "@/components/gallery/EventFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import EventGalleryGrid from "@/components/gallery/EventGalleryGrid";
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
  const [viewMode, setViewMode] = useState<'events' | 'all'>('events'); // New state for view mode

  const router = useRouter();
  const searchParams = useSearchParams();
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
          
          // Check for event parameter in URL
          const eventParam = searchParams.get('event');
          if (eventParam) {
            // Auto-select the event from URL parameter
            console.log('🔗 URL parameter detected, filtering by event:', eventParam);
            setSelectedEventId(eventParam);
            setViewMode('all');
            // Load memories for this specific event
            await loadMemories(eventParam, 1);
          } else {
            // Default to event-grouped view
            setViewMode('events');
          }
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
  }, [searchParams]); // Add searchParams to dependency array

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
      
      // Default to all memories view if no events with memories
      setViewMode('all');
    } catch (error) {
      console.error("Error loading fallback data:", error);
      setError("Failed to load gallery. Please try again later.");
    }
  };

  // Load memories based on selected event
  const loadMemories = async (eventId: string | null, page: number = 1) => {
    setIsLoadingMemories(true);
    setError(null);

    console.log('🔍 Loading memories:', { eventId, page });

    try {
      let response;
      
      if (eventId) {
        // Load memories for specific event
        console.log('📡 Calling getMemoriesByActivity:', eventId);
        response = await getMemoriesByActivity(eventId, page, 20);
        console.log('📥 Response from getMemoriesByActivity:', response);
        
        if (response?.data?.data) {
          const memories = response.data.data.memories || [];
          console.log('💾 Setting memories:', memories.length, 'memories found');
          setMemories(memories);
          setCurrentPage(response.data.data.pagination?.currentPage || 1);
          setTotalPages(response.data.data.pagination?.totalPages || 1);
          setHasNextPage(response.data.data.pagination?.hasNextPage || false);
        } else {
          console.warn('⚠️ No data in response:', response);
        }
      } else {
        // Load all memories
        console.log('📡 Calling getAllMemories');
        response = await getAllMemories(page, 50);
        console.log('📥 Response from getAllMemories:', response);
        
        if (response?.data?.data) {
          console.log('💾 Setting all memories:', response.data.data.length, 'memories found');
          setMemories(response.data.data);
          setCurrentPage(response.data.pagination?.currentPage || 1);
          setTotalPages(response.data.pagination?.totalPages || 1);
          setHasNextPage(response.data.pagination?.hasNextPage || false);
        }
      }
    } catch (error) {
      console.error("❌ Error loading memories:", error);
      setError("Failed to load photos. Please try again later.");
    } finally {
      setIsLoadingMemories(false);
    }
  };

  // Handle event selection
  const handleEventSelect = (eventId: string | null) => {
    console.log('🎯 Event selected:', eventId);
    setSelectedEventId(eventId);
    setCurrentPage(1);
    
    // Update URL to reflect current selection
    if (eventId) {
      router.push(`/gallery?event=${eventId}`, { scroll: false });
    } else {
      router.push('/gallery', { scroll: false });
    }
    
    if (eventId) {
      // Specific event selected - load its memories
      console.log('🔄 Switching to "all" view mode for event:', eventId);
      setViewMode('all');
      loadMemories(eventId, 1);
    } else {
      // No specific event - go back to event-grouped view
      console.log('🔄 Switching to "events" view mode');
      setViewMode('events');
    }
  };

  // Handle view mode toggle
  const handleViewModeToggle = () => {
    if (viewMode === 'events') {
      setViewMode('all');
      setSelectedEventId(null);
      router.push('/gallery', { scroll: false });
      loadMemories(null, 1);
    } else {
      setViewMode('events');
      setSelectedEventId(null);
      router.push('/gallery', { scroll: false });
    }
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
        {/* View Mode Toggle */}
        <div className="mb-6 flex justify-center">
          <div className="bg-[#2a2a2a] rounded-lg p-1 flex">
            <button
              onClick={() => handleEventSelect(null)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === 'events' && !selectedEventId
                  ? 'bg-[#FFD600] text-black font-semibold'
                  : 'text-white hover:bg-[#3a3a3a]'
              }`}
            >
              📅 Events View
            </button>
            <button
              onClick={handleViewModeToggle}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === 'all' && !selectedEventId
                  ? 'bg-[#FFD600] text-black font-semibold'
                  : 'text-white hover:bg-[#3a3a3a]'
              }`}
            >
              🖼️ All Photos
            </button>
          </div>
        </div>

        {/* Event Filter - only show when not in events view or when event is selected */}
        {(viewMode === 'all' || selectedEventId) && (
          <EventFilter
            events={events}
            selectedEventId={selectedEventId}
            onEventSelect={handleEventSelect}
            loading={isLoading}
          />
        )}

        {/* Gallery Stats */}
        {selectedEventId && (
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
        )}

        {/* Gallery Content */}
        {isLoadingMemories ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader text="Loading photos..." textColor="text-white" />
          </div>
        ) : (
          <>
            {/* Event-grouped view */}
            {viewMode === 'events' && !selectedEventId && (
              <EventGalleryGrid 
                events={events}
                loading={isLoadingMemories}
                error={error}
                onEventSelect={handleEventSelect}
              />
            )}
            
            {/* Regular grid view */}
            {(viewMode === 'all' || selectedEventId) && (
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
          </>
        )}
      </div>
    </div>
  );
};

export default WithNavbar(Gallery);
