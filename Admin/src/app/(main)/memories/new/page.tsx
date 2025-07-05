"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

interface MemoryForm {
  activityId: string;
  description: string;
}

interface Activity {
  _id: string;
  name: string;
  date: string;
}

interface ImagePreview {
  file: File;
  url: string;
  id: string;
}

export default function NewMemoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<MemoryForm>();

  const watchDescription = watch("description", "");

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch(`${API_URL}/activity`);
      const data = await response.json();
      
      if (data.status === "Success" && data.data) {
        setActivities(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoadingActivities(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;

    // Validate file types
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast.error(`Invalid file types: ${invalidFiles.map(f => f.name).join(', ')}`);
      return;
    }

    // Validate file sizes (max 10MB each)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      toast.error(`Files too large (max 10MB): ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    // Create preview objects
    const newPreviews: ImagePreview[] = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));

    setSelectedImages(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (id: string) => {
    setSelectedImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const uploadSingleImage = async (imagePreview: ImagePreview, activityId: string) => {
    const formData = new FormData();
    formData.append('image', imagePreview.file);
    if (activityId) {
      formData.append('activityId', activityId);
    }

    try {
      const response = await fetch(`${API_URL}/memory/with-image`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadProgress(prev => ({ ...prev, [imagePreview.id]: 100 }));
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload image");
      }
    } catch (error) {
      console.error(`Error uploading ${imagePreview.file.name}:`, error);
      throw error;
    }
  };

  const onSubmit = async (data: MemoryForm) => {
    if (selectedImages.length === 0) {
      toast.error("Please select at least one image to upload");
      return;
    }

    setLoading(true);
    
    try {
      const uploadPromises = selectedImages.map(async (imagePreview) => {
        setUploadProgress(prev => ({ ...prev, [imagePreview.id]: 0 }));
        return uploadSingleImage(imagePreview, data.activityId);
      });

      const results = await Promise.allSettled(uploadPromises);
      
      const successful = results.filter(result => result.status === 'fulfilled').length;
      const failed = results.filter(result => result.status === 'rejected').length;

      if (successful > 0) {
        toast.success(`Successfully uploaded ${successful} photo(s)!`);
      }
      
      if (failed > 0) {
        toast.error(`Failed to upload ${failed} photo(s)`);
      }

      if (successful === selectedImages.length) {
        router.push("/memories");
      }
    } catch (error) {
      console.error("Error uploading photos:", error);
      toast.error("Error uploading photos");
    } finally {
      setLoading(false);
      setUploadProgress({});
    }
  };

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      selectedImages.forEach(img => URL.revokeObjectURL(img.url));
    };
  }, []);

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Upload New Photos</h1>
            <p className="text-gray-600">Add multiple photos to your church gallery</p>
          </div>
          <button
            onClick={() => router.push("/memories")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gallery
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                Select Images *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <div className="space-y-2">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-sm text-gray-600">
                    <label htmlFor="images" className="cursor-pointer">
                      <span className="font-medium text-indigo-600 hover:text-indigo-500">
                        Click to upload
                      </span>
                      <span> or drag and drop</span>
                    </label>
                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageSelect}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF, WebP up to 10MB each
                  </p>
                </div>
              </div>
            </div>

            {/* Image Previews */}
            {selectedImages.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Selected Images ({selectedImages.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {selectedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Upload Progress */}
                      {uploadProgress[image.id] !== undefined && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                          <div className="text-white text-sm">
                            {uploadProgress[image.id] === 100 ? '✓' : `${uploadProgress[image.id]}%`}
                          </div>
                        </div>
                      )}
                      
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                      
                      {/* File Info */}
                      <div className="mt-1 text-xs text-gray-500 truncate">
                        {image.file.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Associated Activity */}
            <div>
              <label htmlFor="activityId" className="block text-sm font-medium text-gray-700 mb-2">
                Associated Event (Optional)
              </label>
              {loadingActivities ? (
                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  Loading activities...
                </div>
              ) : (
                <select
                  id="activityId"
                  {...register("activityId")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">No associated event</option>
                  {activities.map(activity => (
                    <option key={activity._id} value={activity._id}>
                      {activity.name} - {new Date(activity.date).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Link these photos to a specific church activity or event
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                rows={4}
                {...register("description", {
                  maxLength: {
                    value: 500,
                    message: "Description must be less than 500 characters"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Add a description or context for these photos..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Character count: {watchDescription.length}/500
              </p>
            </div>

            {/* Upload Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Photo Guidelines</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use high-quality images (minimum 800x600 pixels recommended)</li>
                <li>• Supported formats: JPG, PNG, GIF, WebP (max 10MB each)</li>
                <li>• Ensure photos are appropriate for all audiences</li>
                <li>• Get permission before uploading photos with identifiable people</li>
                <li>• You can select multiple images at once</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push("/memories")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || selectedImages.length === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading {selectedImages.length} photo(s)...
                  </div>
                ) : (
                  `Upload ${selectedImages.length} Photo(s)`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
} 