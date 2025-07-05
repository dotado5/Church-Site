"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

interface CoordinatorForm {
  name: string;
  occupation: string;
  phone_number: string;
  email: string;
  about: string;
  isFeatured: boolean;
}

export default function NewCoordinatorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Default profile images
  const defaultImages = [
    "/images/paul_smith.png",
    "/images/busayor.png",
    "/images/pastor.svg",
    "/images/Frame.png"
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<CoordinatorForm>();

  const watchAbout = watch("about", "");

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please select a JPEG, PNG, GIF, or WebP image.');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('File too large. Please select an image under 5MB.');
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
  };

  const getRandomDefaultImage = () => {
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  };

  const onSubmit = async (data: CoordinatorForm) => {
    setLoading(true);
    
    try {
      let imageUrl = "";

      // Upload image if selected, otherwise use default
      if (selectedImage) {
        try {
          const formData = new FormData();
          formData.append('image', selectedImage);

          const imageResponse = await fetch(`${API_URL}/coordinator/upload-image`, {
            method: "POST",
            body: formData,
          });

          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            imageUrl = imageData.data.imageUrl;
          } else {
            console.warn("Image upload endpoint not available, using default image");
            imageUrl = getRandomDefaultImage();
          }
        } catch (error) {
          console.warn("Image upload failed, using default image");
          imageUrl = getRandomDefaultImage();
        }
      } else {
        // Use a random default image
        imageUrl = getRandomDefaultImage();
      }

      const coordinatorData = {
        name: data.name,
        occupation: data.occupation,
        phone_number: data.phone_number,
        email: data.email,
        image_url: imageUrl,
        about: data.about,
        isFeatured: data.isFeatured
      };

      const response = await fetch(`${API_URL}/coordinator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coordinatorData),
      });

      if (response.ok) {
        toast.success("Coordinator created successfully!");
        router.push("/coordinators");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create coordinator");
      }
    } catch (error) {
      console.error("Error creating coordinator:", error);
      toast.error("Error creating coordinator");
    } finally {
      setLoading(false);
    }
  };

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Coordinator</h1>
            <p className="text-gray-600">Create a new coordinator profile for your church</p>
          </div>
          <button
            onClick={() => router.push("/coordinators")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Coordinators
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter coordinator's full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Occupation */}
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
                Occupation *
              </label>
              <input
                type="text"
                id="occupation"
                {...register("occupation", {
                  required: "Occupation is required",
                  minLength: {
                    value: 2,
                    message: "Occupation must be at least 2 characters long"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter coordinator's occupation"
              />
              {errors.occupation && (
                <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>
              )}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="coordinator@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone_number")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="+1 (555) 123-4567"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Optional: Contact phone number
                </p>
              </div>
            </div>

            {/* Profile Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image (Optional)
              </label>
              
              {/* Image Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-48 max-w-full rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedImage?.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="text-sm text-gray-600">
                      <label htmlFor="image" className="cursor-pointer">
                        <span className="font-medium text-indigo-600 hover:text-indigo-500">
                          Click to upload
                        </span>
                        <span> or drag and drop</span>
                      </label>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageSelect}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF, WebP up to 5MB
                    </p>
                  </div>
                )}
              </div>
              
              <p className="mt-2 text-sm text-gray-500">
                Optional: Upload a profile photo for the coordinator. If no image is uploaded, a default image will be used.
              </p>
            </div>

            {/* About */}
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">
                About *
              </label>
              <textarea
                id="about"
                rows={4}
                {...register("about", {
                  required: "About section is required",
                  minLength: {
                    value: 20,
                    message: "About section must be at least 20 characters long"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tell us about the coordinator, their role, and their contribution to the church..."
              />
              {errors.about && (
                <p className="mt-1 text-sm text-red-600">{errors.about.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Character count: {watchAbout.length}
              </p>
            </div>

            {/* Featured Status */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  {...register("isFeatured")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                  Featured Coordinator
                </label>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Featured coordinators are highlighted on the church website
              </p>
            </div>

            {/* Coordinator Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Coordinator Guidelines</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Provide accurate contact information</li>
                <li>• Use professional profile photos</li>
                <li>• Write a clear and engaging about section</li>
                <li>• If no image is uploaded, a default profile image will be used</li>
                <li>• Featured coordinators appear prominently on the website</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push("/coordinators")}
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
                    Creating Coordinator...
                  </div>
                ) : (
                  "Create Coordinator"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
} 