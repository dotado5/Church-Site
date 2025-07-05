"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

interface AudioMessageForm {
  title: string;
  description: string;
  speaker: string;
  category: string;
  duration: string;
  date: string;
  audioFile: File | null;
  thumbnailFile: File | null;
}

export default function NewAudioMessagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>(["Sermons"]);
  const [formData, setFormData] = useState<AudioMessageForm>({
    title: "",
    description: "",
    speaker: "",
    category: "Sermons",
    duration: "",
    date: new Date().toISOString().split('T')[0], // Default to today's date
    audioFile: null,
    thumbnailFile: null,
  });

  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/audio-messages/categories`);
      const data = await response.json();
      
      if (data.status === "Success" && data.data) {
        setCategories(data.data);
        // Update form to use first available category
        if (data.data.length > 0) {
          setFormData(prev => ({ ...prev, category: data.data[0] }));
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Keep default fallback categories
      setCategories(["Sermons", "Youth", "Worship", "Teaching", "Prayer"]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("audio/")) {
        setFormData(prev => ({ ...prev, audioFile: file }));
        setAudioPreview(URL.createObjectURL(file));
      } else {
        toast.error("Please select a valid audio file");
      }
    }
  };

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setFormData(prev => ({ ...prev, thumbnailFile: file }));
        setThumbnailPreview(URL.createObjectURL(file));
      } else {
        toast.error("Please select a valid image file");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.speaker || !formData.audioFile) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("speaker", formData.speaker);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("date", formData.date);
      if (formData.duration) {
        formDataToSend.append("duration", formData.duration);
      }
      formDataToSend.append("audio", formData.audioFile);
      if (formData.thumbnailFile) {
        formDataToSend.append("thumbnail", formData.thumbnailFile);
      }

      const response = await fetch(`${API_URL}/audio-messages`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok && data.status === "Success") {
        toast.success("Audio message created successfully!");
        router.push("/audio-messages");
      } else {
        toast.error(data.message || "Failed to create audio message");
      }
    } catch (error) {
      console.error("Error creating audio message:", error);
      toast.error("Failed to create audio message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Audio Message</h1>
            <p className="text-gray-600">Create a new audio message or sermon</p>
          </div>
          <button
            onClick={() => router.push("/audio-messages")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Audio Messages
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Message Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter message title"
                />
              </div>

              {/* Speaker */}
              <div>
                <label htmlFor="speaker" className="block text-sm font-medium text-gray-700 mb-2">
                  Speaker *
                </label>
                <input
                  type="text"
                  id="speaker"
                  name="speaker"
                  value={formData.speaker}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Speaker name"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 45:30"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter message description"
                />
              </div>
            </div>
          </div>

          {/* Audio File Upload */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Audio File *</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Audio File
                </label>
                <input
                  type="file"
                  id="audioFile"
                  accept="audio/*"
                  onChange={handleAudioFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: MP3, WAV, M4A, etc. Max size: 100MB
                </p>
              </div>

              {audioPreview && (
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Audio Preview:</p>
                  <audio controls className="w-full">
                    <source src={audioPreview} />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Thumbnail (Optional)</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="thumbnailFile" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Thumbnail Image
                </label>
                <input
                  type="file"
                  id="thumbnailFile"
                  accept="image/*"
                  onChange={handleThumbnailFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Recommended size: 400x300px. Max size: 5MB
                </p>
              </div>

              {thumbnailPreview && (
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Thumbnail Preview:</p>
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-32 h-24 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push("/audio-messages")}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Audio Message"}
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
} 