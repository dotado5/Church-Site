"use client";

import React from "react";
import { ActivityWithMemories } from "@/types/dataTypes";

interface EventFilterProps {
  events: ActivityWithMemories[];
  selectedEventId: string | null;
  onEventSelect: (eventId: string | null) => void;
  loading?: boolean;
}

const EventFilter: React.FC<EventFilterProps> = ({
  events,
  selectedEventId,
  onEventSelect,
  loading = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-700 rounded-lg px-4 py-3 w-32 h-16"
            />
          ))}
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="mb-8">
        <p className="text-gray-400 text-center">
          No events with photos available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-white text-xl font-semibold mb-4">
        📅 Filter by Event
      </h3>
      
      <div className="flex flex-wrap gap-3 mb-4">
        {/* All Events Button */}
        <button
          onClick={() => onEventSelect(null)}
          className={`px-4 py-3 rounded-lg transition-all duration-300 ${
            selectedEventId === null
              ? 'bg-[#FFD600] text-black font-semibold shadow-lg'
              : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] border border-gray-600'
          }`}
        >
          <div className="text-center">
            <div className="font-medium">All Events</div>
            <div className="text-xs opacity-75">
              {events.reduce((total, event) => total + event.memoryCount, 0)} photos
            </div>
          </div>
        </button>

        {/* Individual Event Buttons */}
        {events.map((event) => (
          <button
            key={event._id}
            onClick={() => onEventSelect(event._id)}
            className={`px-4 py-3 rounded-lg transition-all duration-300 ${
              selectedEventId === event._id
                ? 'bg-[#FFD600] text-black font-semibold shadow-lg'
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] border border-gray-600'
            }`}
          >
            <div className="text-center max-w-[200px]">
              <div className="font-medium truncate" title={event.name}>
                {event.name}
              </div>
              <div className="text-xs opacity-75">
                {formatDate(event.date)} • {event.memoryCount} photos
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Event Info */}
      {selectedEventId && (
        <div className="bg-[#2a2a2a] rounded-lg p-4 border border-gray-600">
          {(() => {
            const selectedEvent = events.find(e => e._id === selectedEventId);
            if (!selectedEvent) return null;
            
            return (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[#FFD600] text-lg font-semibold">
                    {selectedEvent.name}
                  </h4>
                  <span className="text-gray-400 text-sm">
                    {formatDate(selectedEvent.date)}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  {selectedEvent.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>📸 {selectedEvent.memoryCount} photos</span>
                  <button
                    onClick={() => onEventSelect(null)}
                    className="text-[#FFD600] hover:underline"
                  >
                    View all events
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default EventFilter; 