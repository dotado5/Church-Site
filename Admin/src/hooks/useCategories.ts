import { useState, useEffect } from 'react';

export interface Category {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  sortOrder?: number;
}

export interface CategoryStats {
  _id: string;
  name: string;
  description?: string;
  messageCount: number;
  sortOrder: number;
}

export interface CategoryResponse {
  status: string;
  message: string;
  data: Category[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Fetch all categories with pagination
  const fetchCategories = async (
    page: number = 1,
    limit: number = 10,
    includeInactive: boolean = false,
    search?: string
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        includeInactive: includeInactive.toString(),
      });
      
      if (search) {
        params.append('search', search);
      }
      
      const response = await fetch(`${API_URL}/categories?${params}`);
      const data = await response.json() as CategoryResponse;
      
      if (data.status === 'Success') {
        setCategories(data.data);
        return data;
      } else {
        setError(data.message || 'Failed to fetch categories');
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch active categories (for dropdowns)
  const fetchActiveCategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/categories/active`);
      const data = await response.json() as { status: string; message: string; data: string[] };
      
      if (data.status === 'Success') {
        return data.data;
      } else {
        setError(data.message || 'Failed to fetch active categories');
        return [];
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch category statistics
  const fetchCategoryStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/categories/stats`);
      const data = await response.json() as { status: string; message: string; data: CategoryStats[] };
      
      if (data.status === 'Success') {
        return data.data;
      } else {
        setError(data.message || 'Failed to fetch category statistics');
        return [];
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get single category by ID
  const getCategoryById = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/categories/${id}`);
      const data = await response.json() as { status: string; message: string; data: Category };
      
      if (data.status === 'Success') {
        return data.data;
      } else {
        setError(data.message || 'Failed to fetch category');
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create new category
  const createCategory = async (categoryData: CategoryFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      
      const data = await response.json() as { status: string; message: string; data: Category };
      
      if (data.status === 'Success') {
        return data.data;
      } else {
        setError(data.message || 'Failed to create category');
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const updateCategory = async (id: string, categoryData: Partial<CategoryFormData & { isActive: boolean }>) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      
      const data = await response.json() as { status: string; message: string; data: Category };
      
      if (data.status === 'Success') {
        return data.data;
      } else {
        setError(data.message || 'Failed to update category');
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json() as { status: string; message: string };
      
      if (data.status === 'Success') {
        return true;
      } else {
        setError(data.message || 'Failed to delete category');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Reorder categories
  const reorderCategories = async (categoryOrders: { id: string; sortOrder: number }[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/categories/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryOrders }),
      });
      
      const data = await response.json() as { status: string; message: string };
      
      if (data.status === 'Success') {
        return true;
      } else {
        setError(data.message || 'Failed to reorder categories');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    fetchActiveCategories,
    fetchCategoryStats,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
    setError,
  };
}; 