"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

interface MessageForm {
  title: string;
  content: string;
  coordinatorId: string;
  datePublished: string;
  isPublished: boolean;
}

interface Coordinator {
  _id: string;
  name: string;
  occupation: string;
  email: string;
  phone_number: string;
  image_url: string;
  about: string;
  isFeatured: boolean;
}

export default function NewMessagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [loadingCoordinators, setLoadingCoordinators] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<MessageForm>({
    defaultValues: {
      isPublished: false,
      datePublished: new Date().toISOString().split('T')[0]
    }
  });

  const watchContent = watch("content", "");

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
    try {
      const response = await fetch(`${API_URL}/coordinator`);
      const data = await response.json();
      
      if (data.status === "Success" && data.data) {
        setCoordinators(data.data);
      } else {
        toast.error("Failed to load coordinators");
      }
    } catch (error) {
      console.error("Error fetching coordinators:", error);
      toast.error("Error loading coordinators");
    } finally {
      setLoadingCoordinators(false);
    }
  };

  const onSubmit = async (data: MessageForm) => {
    setLoading(true);
    
    try {
      const messageData = {
        title: data.title,
        content: data.content,
        coordinatorId: data.coordinatorId,
        datePublished: data.isPublished ? data.datePublished : null,
        isPublished: data.isPublished
      };

      const response = await fetch(`${API_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        toast.success("Message created successfully!");
        router.push("/messages");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create message");
      }
    } catch (error) {
      console.error("Error creating message:", error);
      toast.error("Error creating message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Write New Message</h1>
            <p className="text-gray-600">Create a new message from a coordinator</p>
          </div>
          <button
            onClick={() => router.push("/messages")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Messages
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Message Title *
              </label>
              <input
                type="text"
                id="title"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters long"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter message title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Coordinator Selection */}
            <div>
              <label htmlFor="coordinatorId" className="block text-sm font-medium text-gray-700 mb-2">
                Coordinator *
              </label>
              {loadingCoordinators ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                  <span className="text-sm text-gray-500">Loading coordinators...</span>
                </div>
              ) : (
                <select
                  id="coordinatorId"
                  {...register("coordinatorId", {
                    required: "Please select a coordinator"
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a coordinator</option>
                  {coordinators.map((coordinator) => (
                    <option key={coordinator._id} value={coordinator._id}>
                      {coordinator.name} - {coordinator.occupation}
                    </option>
                  ))}
                </select>
              )}
              {errors.coordinatorId && (
                <p className="mt-1 text-sm text-red-600">{errors.coordinatorId.message}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Message Content *
              </label>
              <textarea
                id="content"
                rows={10}
                {...register("content", {
                  required: "Content is required",
                  minLength: {
                    value: 50,
                    message: "Content must be at least 50 characters long"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write the message content here..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Character count: {watchContent.length}
              </p>
            </div>

            {/* Publishing Options */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    {...register("isPublished")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                    Publish immediately
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  If unchecked, the message will be saved as a draft
                </p>
              </div>

              <div>
                <label htmlFor="datePublished" className="block text-sm font-medium text-gray-700 mb-2">
                  Publication Date
                </label>
                <input
                  type="date"
                  id="datePublished"
                  {...register("datePublished", {
                    required: "Publication date is required"
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.datePublished && (
                  <p className="mt-1 text-sm text-red-600">{errors.datePublished.message}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  This date will be used when the message is published
                </p>
              </div>
            </div>

            {/* Message Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Message Guidelines</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Write clear and inspiring messages for the congregation</li>
                <li>• Ensure the content is appropriate for all age groups</li>
                <li>• Include relevant Bible verses or spiritual insights</li>
                <li>• Keep messages between 200-1000 words for optimal reading</li>
                <li>• Draft messages can be edited before publishing</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push("/messages")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Message...
                  </div>
                ) : (
                  "Create Message"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
} 