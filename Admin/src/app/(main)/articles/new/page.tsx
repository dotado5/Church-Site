"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

interface ArticleForm {
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
}

interface Author {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export default function NewArticlePage() {
  const router = useRouter();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Default images array
  const defaultImages = [
    "/images/article1.svg",
    "/images/article2.svg", 
    "/images/article3.svg",
    "/images/article4.svg",
    "/images/article5.svg",
    "/images/article6.svg",
    "/images/article7.svg",
    "/images/article8.svg"
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ArticleForm>();

  const watchContent = watch("content", "");

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch(`${API_URL}/author`);
      const data = await response.json();
      
      if (data.status === "Success" && data.data) {
        setAuthors(data.data || []);
      } else {
        console.error("Failed to fetch authors:", data);
        toast.error("Failed to fetch authors");
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
      toast.error("Error fetching authors");
    } finally {
      setLoadingAuthors(false);
    }
  };

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

  const generateExcerpt = (content: string) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.substring(0, 200) + (plainText.length > 200 ? '...' : '');
  };

  const getRandomDefaultImage = () => {
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  };

  const onSubmit = async (data: ArticleForm) => {
    setLoading(true);
    
    try {
      let imageUrl = "";

      // Upload image if selected
      if (selectedImage) {
        try {
          const formData = new FormData();
          formData.append('image', selectedImage);

          console.log('Attempting to upload image to:', `${API_URL}/article/upload-image`);
          const imageResponse = await fetch(`${API_URL}/article/upload-image`, {
            method: "POST",
            body: formData,
          });

          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            console.log('Image upload successful:', imageData);
            imageUrl = imageData.data.imageUrl;
            toast.success('Image uploaded successfully!');
          } else {
            const errorData = await imageResponse.json();
            console.error("Image upload failed:", errorData);
            toast.warning(`Image upload failed: ${errorData.message || 'Unknown error'}. Using default image instead.`);
            imageUrl = getRandomDefaultImage();
          }
        } catch (error) {
          console.error("Image upload error:", error);
          toast.warning("Image upload failed. Using default image instead.");
          imageUrl = getRandomDefaultImage();
        }
      } else {
        // No image selected, use default
        imageUrl = getRandomDefaultImage();
      }

      const articleData = {
        title: data.title,
        authorId: data.authorId,
        text: data.content,
        readTime: new Date(),
        displayImage: imageUrl,
      };

      console.log('Creating article with data:', articleData);
      const response = await fetch(`${API_URL}/article`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        toast.success("Article created successfully!");
        router.push("/articles");
      } else {
        const errorData = await response.json();
        console.error("Article creation failed:", errorData);
        toast.error(errorData.message || "Failed to create article");
      }
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("Error creating article");
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Article</h1>
            <p className="text-gray-600">Write and publish a new article for your church</p>
          </div>
          <button
            onClick={() => router.push("/articles")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Articles
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                id="title"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter article title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Author */}
            <div>
              <label htmlFor="authorId" className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              {loadingAuthors ? (
                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  Loading authors...
                </div>
              ) : (
                <select
                  id="authorId"
                  {...register("authorId", {
                    required: "Author is required"
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select an author</option>
                  {authors.map(author => (
                    <option key={author._id} value={author._id}>
                      {author.firstName} {author.lastName}
                    </option>
                  ))}
                </select>
              )}
              {errors.authorId && (
                <p className="mt-1 text-sm text-red-600">{errors.authorId.message}</p>
              )}
            </div>

            {/* Featured Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image (Optional)
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
                Optional: Upload a featured image for your article. If no image is uploaded, a default image will be used.
              </p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Article Content *
              </label>
              <textarea
                id="content"
                rows={12}
                {...register("content", {
                  required: "Content is required",
                  minLength: {
                    value: 50,
                    message: "Content must be at least 50 characters long"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your article content here..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Character count: {watchContent.length}
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Article Excerpt
              </label>
              <textarea
                id="excerpt"
                rows={3}
                {...register("excerpt", {
                  maxLength: {
                    value: 300,
                    message: "Excerpt must be less than 300 characters"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Optional: Write a brief summary of your article (will be auto-generated if left empty)"
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Optional: If empty, an excerpt will be auto-generated from the content
              </p>
            </div>

            {/* Image Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Image Guidelines</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Upload high-quality images (minimum 800x600 pixels recommended)</li>
                <li>• Supported formats: JPG, PNG, GIF, WebP (max 5MB)</li>
                <li>• Images should be appropriate for all audiences</li>
                <li>• If no image is uploaded, a default article image will be used</li>
                <li>• Images will be automatically optimized for web display</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push("/articles")}
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
                    Creating Article...
                  </div>
                ) : (
                  "Create Article"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
} 