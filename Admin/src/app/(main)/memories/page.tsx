"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

interface Memory {
  _id: string;
  imageUrl: string;
  height: number;
  width: number;
  imgType: string;
  activityId?: string;
  __v?: number;
}

export default function MemoriesPage() {
  const router = useRouter();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memoryToDelete, setMemoryToDelete] = useState<Memory | null>(null);
  const [deleting, setDeleting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await fetch(`${API_URL}/memory`);
      const data = await response.json();
      
      if (data.status === "Success" && data.data) {
        setMemories(data.data || []);
      } else {
        toast.error("Failed to fetch memories");
      }
    } catch (error) {
      console.error("Error fetching memories:", error);
      toast.error("Error fetching memories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (memory: Memory) => {
    setMemoryToDelete(memory);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!memoryToDelete) return;

    setDeleting(true);
    try {
      const response = await fetch(`${API_URL}/memory/${memoryToDelete._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMemories(memories.filter(m => m._id !== memoryToDelete._id));
        toast.success("Memory deleted successfully");
        setShowDeleteModal(false);
        setMemoryToDelete(null);
      } else {
        toast.error("Failed to delete memory");
      }
    } catch (error) {
      console.error("Error deleting memory:", error);
      toast.error("Error deleting memory");
    } finally {
      setDeleting(false);
    }
  };

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.imageUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.activityId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
            <p className="text-gray-600">Manage church photos and memories</p>
          </div>
          <button
            onClick={() => router.push("/memories/new")}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Upload Photo
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="max-w-md">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Photos
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by image URL or activity ID..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{memories.length}</div>
              <div className="text-sm text-gray-600">Total Photos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {memories.filter(m => m.activityId).length}
              </div>
              <div className="text-sm text-gray-600">Event Photos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {memories.filter(m => !m.activityId).length}
              </div>
              <div className="text-sm text-gray-600">General Photos</div>
            </div>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Photos ({filteredMemories.length})
            </h2>
          </div>
          
          {filteredMemories.length === 0 ? (
            <div className="p-6 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500">No photos found</p>
              <button
                onClick={() => router.push("/memories/new")}
                className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
              >
                Upload your first photo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {filteredMemories.map((memory) => (
                <div
                  key={memory._id}
                  className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={memory.imageUrl}
                      alt={`Memory ${memory._id}`}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        // Prevent infinite loop by only setting fallback once
                        if (!e.currentTarget.dataset.fallback) {
                          e.currentTarget.dataset.fallback = 'true';
                          // Use a simple gray background as fallback instead of non-existent image
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.display = 'none';
                          // Show a fallback div instead
                          const parent = e.currentTarget.parentElement;
                          if (parent && !parent.querySelector('.image-fallback')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'image-fallback w-full h-48 bg-gray-200 flex items-center justify-center';
                            fallback.innerHTML = `
                              <div class="text-center text-gray-500">
                                <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <p class="text-sm">Image not available</p>
                              </div>
                            `;
                            parent.appendChild(fallback);
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 truncate">
                      Image {memory._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {memory.width} × {memory.height} • {memory.imgType.toUpperCase()}
                    </p>
                    {memory.activityId && (
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Activity: {memory.activityId.slice(-6)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => router.push(`/memories/${memory._id}/edit`)}
                        className="flex-1 inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(memory)}
                        className="flex-1 inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Photo</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this photo? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
