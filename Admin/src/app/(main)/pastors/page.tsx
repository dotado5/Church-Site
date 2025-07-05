"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

interface Pastor {
  _id: string;
  name: string;
  title: string;
  welcomeMessage: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PastorsPage() {
  const router = useRouter();
  const [pastors, setPastors] = useState<Pastor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pastorToDelete, setPastorToDelete] = useState<Pastor | null>(null);
  const [deleting, setDeleting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchPastors();
  }, []);

  const fetchPastors = async () => {
    try {
      const response = await fetch(`${API_URL}/pastor`);
      const data = await response.json();
      
      if (data.status === "Success" && data.data) {
        setPastors(data.data || []);
      } else {
        toast.error("Failed to fetch pastors");
      }
    } catch (error) {
      console.error("Error fetching pastors:", error);
      toast.error("Error fetching pastors");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pastor: Pastor) => {
    setPastorToDelete(pastor);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!pastorToDelete) return;

    setDeleting(true);
    try {
      const response = await fetch(`${API_URL}/pastor/${pastorToDelete._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPastors(pastors.filter(p => p._id !== pastorToDelete._id));
        toast.success("Pastor deleted successfully");
        setShowDeleteModal(false);
        setPastorToDelete(null);
      } else {
        toast.error("Failed to delete pastor");
      }
    } catch (error) {
      console.error("Error deleting pastor:", error);
      toast.error("Error deleting pastor");
    } finally {
      setDeleting(false);
    }
  };

  const toggleStatus = async (pastor: Pastor) => {
    try {
      const response = await fetch(`${API_URL}/pastor/${pastor._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...pastor,
          isActive: !pastor.isActive,
        }),
      });

      if (response.ok) {
        setPastors(pastors.map(p => 
          p._id === pastor._id 
            ? { ...p, isActive: !p.isActive }
            : p
        ));
        toast.success(`Pastor ${pastor.isActive ? 'deactivated' : 'activated'} successfully`);
      } else {
        toast.error("Failed to update pastor status");
      }
    } catch (error) {
      console.error("Error updating pastor:", error);
      toast.error("Error updating pastor status");
    }
  };

  const filteredPastors = pastors.filter(pastor => {
    const matchesSearch = pastor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pastor.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && pastor.isActive) ||
                         (statusFilter === "inactive" && !pastor.isActive);
    
    return matchesSearch && matchesStatus;
  });

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
            <h1 className="text-2xl font-bold text-gray-900">Pastors</h1>
            <p className="text-gray-600">Manage church pastors and leadership</p>
          </div>
          <button
            onClick={() => router.push("/pastors/new")}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Pastor
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Pastors
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pastors Grid */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Pastors ({filteredPastors.length})
            </h2>
          </div>
          
          {filteredPastors.length === 0 ? (
            <div className="p-6 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-gray-500">No pastors found</p>
              <button
                onClick={() => router.push("/pastors/new")}
                className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
              >
                Add your first pastor
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {filteredPastors.map((pastor) => (
                <div
                  key={pastor._id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    {pastor.image ? (
                      <img
                        src={pastor.image}
                        alt={pastor.name}
                        className="w-20 h-20 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-medium text-xl">
                          {pastor.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{pastor.name}</h3>
                      <p className="text-indigo-600 font-medium">{pastor.title}</p>
                    </div>
                  </div>

                  {pastor.welcomeMessage && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Welcome Message</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {pastor.welcomeMessage}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleStatus(pastor)}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          pastor.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                          pastor.isActive ? 'bg-green-600' : 'bg-gray-400'
                        }`}></div>
                        {pastor.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => router.push(`/pastors/${pastor._id}/edit`)}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(pastor)}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Pastor</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{pastorToDelete?.name}"? This action cannot be undone.
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