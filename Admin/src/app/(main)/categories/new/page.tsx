"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { useCategories, CategoryFormData } from "@/hooks/useCategories";

export default function NewCategoryPage() {
  const router = useRouter();
  const { createCategory, loading } = useCategories();
  
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    sortOrder: 1,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    } else if (formData.name.length < 1 || formData.name.length > 50) {
      newErrors.name = "Category name must be between 1 and 50 characters";
    } else if (!/^[a-zA-Z\s\-]+$/.test(formData.name)) {
      newErrors.name = "Category name can only contain letters, spaces, and hyphens";
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = "Description cannot exceed 200 characters";
    }

    if (formData.sortOrder && formData.sortOrder < 0) {
      newErrors.sortOrder = "Sort order must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const category = await createCategory(formData);
      if (category) {
        toast.success("Category created successfully");
        router.push("/categories");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'sortOrder' ? (value ? parseInt(value) : 1) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Category</h1>
          <p className="text-gray-600">Add a new category for audio messages</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter category name"
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              <p className="mt-1 text-sm text-gray-500">
                Only letters, spaces, and hyphens are allowed (1-50 characters)
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter category description (optional)"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              <p className="mt-1 text-sm text-gray-500">
                {formData.description?.length || 0}/200 characters
              </p>
            </div>

            {/* Sort Order */}
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                id="sortOrder"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleChange}
                min="0"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.sortOrder ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter sort order"
              />
              {errors.sortOrder && <p className="mt-1 text-sm text-red-600">{errors.sortOrder}</p>}
              <p className="mt-1 text-sm text-gray-500">
                Lower numbers appear first in the category list
              </p>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Category Guidelines</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Choose clear, descriptive names for your categories</li>
                <li>• Use proper capitalization (e.g., "Youth Ministry" not "youth ministry")</li>
                <li>• Keep descriptions concise but informative</li>
                <li>• Consider how categories will be used in audio message filtering</li>
                <li>• Use sort order to prioritize important categories</li>
              </ul>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/categories")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
} 