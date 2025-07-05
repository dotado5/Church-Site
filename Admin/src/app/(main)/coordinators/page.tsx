"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

interface Coordinator {
  _id: string;
  name: string;
  occupation: string;
  phone_number: string;
  image_url: string;
  about: string;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function CoordinatorsPage() {
  const router = useRouter();
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coordinatorToDelete, setCoordinatorToDelete] = useState<Coordinator | null>(null);
  const [deleting, setDeleting] = useState(false);

  const API_URL = "http://localhost:8000";
  
  console.log('Admin Coordinators Page - API_URL:', API_URL);
  console.log('Environment NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
    try {
      console.log('Fetching coordinators from:', `${API_URL}/coordinator`);
      const response = await fetch(`${API_URL}/coordinator`);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.status === "Success" && data.data) {
        console.log('Setting coordinators:', data.data);
        setCoordinators(data.data || []);
      } else {
        console.error('Failed to fetch coordinators - invalid response structure:', data);
        toast.error("Failed to fetch coordinators");
      }
    } catch (error) {
      console.error("Error fetching coordinators:", error);
      toast.error("Error fetching coordinators");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (coordinator: Coordinator) => {
    setCoordinatorToDelete(coordinator);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!coordinatorToDelete) return;

    setDeleting(true);
    try {
      const response = await fetch(`${API_URL}/coordinator/${coordinatorToDelete._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCoordinators(coordinators.filter(c => c._id !== coordinatorToDelete._id));
        toast.success("Coordinator deleted successfully");
        setShowDeleteModal(false);
        setCoordinatorToDelete(null);
      } else {
        toast.error("Failed to delete coordinator");
      }
    } catch (error) {
      console.error("Error deleting coordinator:", error);
      toast.error("Error deleting coordinator");
    } finally {
      setDeleting(false);
    }
  };

  const toggleStatus = async (coordinator: Coordinator) => {
    try {
      const response = await fetch(`${API_URL}/coordinator/${coordinator._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...coordinator,
          isFeatured: !coordinator.isFeatured,
        }),
      });

      if (response.ok) {
        setCoordinators(coordinators.map(c => 
          c._id === coordinator._id 
            ? { ...c, isFeatured: !c.isFeatured }
            : c
        ));
        toast.success(`Coordinator ${coordinator.isFeatured ? 'unfeatured' : 'featured'} successfully`);
      } else {
        toast.error("Failed to update coordinator status");
      }
    } catch (error) {
      console.error("Error updating coordinator:", error);
      toast.error("Error updating coordinator status");
    }
  };

  const filteredCoordinators = coordinators.filter(coordinator => {
    const matchesSearch = coordinator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coordinator.occupation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "featured" && coordinator.isFeatured) ||
                         (statusFilter === "regular" && !coordinator.isFeatured);
    
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
            <h1 className="text-2xl font-bold text-gray-900">Coordinators</h1>
            <p className="text-gray-600">Manage your church coordinators and leadership team</p>
          </div>
          <button
            onClick={() => router.push("/coordinators/new")}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Coordinator
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Coordinators
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or role..."
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
                <option value="featured">Featured Only</option>
                <option value="regular">Regular Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Coordinators Grid */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Coordinators ({filteredCoordinators.length})
            </h2>
          </div>
          
          {filteredCoordinators.length === 0 ? (
            <div className="p-6 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <p className="text-gray-500">No coordinators found</p>
              <button
                onClick={() => router.push("/coordinators/new")}
                className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
              >
                Add your first coordinator
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredCoordinators.map((coordinator) => (
                <div
                  key={coordinator._id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    {coordinator.image_url ? (
                      <img
                        src={coordinator.image_url}
                        alt={coordinator.name}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-medium text-lg">
                          {coordinator.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{coordinator.name}</h3>
                      <p className="text-sm text-indigo-600">{coordinator.occupation}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {coordinator.phone_number}
                    </div>
                    {coordinator.phone_number && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {coordinator.phone_number}
                      </div>
                    )}
                  </div>

                  {coordinator.about && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {coordinator.about}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleStatus(coordinator)}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          coordinator.isFeatured 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                          coordinator.isFeatured ? 'bg-green-600' : 'bg-gray-400'
                        }`}></div>
                        {coordinator.isFeatured ? 'Featured' : 'Regular'}
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => router.push(`/coordinators/${coordinator._id}/edit`)}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(coordinator)}
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Coordinator</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{coordinatorToDelete?.name}"? This action cannot be undone.
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
