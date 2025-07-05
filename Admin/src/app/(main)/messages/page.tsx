"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

interface Coordinator {
  _id: string;
  name: string;
  occupation: string;
  image_url: string;
}

interface Message {
  _id: string;
  title: string;
  content: string;
  coordinatorId: Coordinator;
  datePublished: string;
  isPublished: boolean;
  excerpt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function MessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [deleting, setDeleting] = useState(false);

  const API_URL = "http://localhost:8000";

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/message`);
      const data = await response.json();
      
      if (data.status === "Success" && data.data) {
        setMessages(data.data || []);
      } else {
        console.error('Failed to fetch messages - invalid response structure:', data);
        toast.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (message: Message) => {
    setMessageToDelete(message);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!messageToDelete) return;

    setDeleting(true);
    try {
      const response = await fetch(`${API_URL}/message/${messageToDelete._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessages(messages.filter(m => m._id !== messageToDelete._id));
        toast.success("Message deleted successfully");
        setShowDeleteModal(false);
        setMessageToDelete(null);
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Error deleting message");
    } finally {
      setDeleting(false);
    }
  };

  const toggleStatus = async (message: Message) => {
    try {
      const response = await fetch(`${API_URL}/message/${message._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...message,
          coordinatorId: message.coordinatorId._id,
          isPublished: !message.isPublished,
        }),
      });

      if (response.ok) {
        setMessages(messages.map(m => 
          m._id === message._id 
            ? { ...m, isPublished: !m.isPublished }
            : m
        ));
        toast.success(`Message ${message.isPublished ? 'unpublished' : 'published'} successfully`);
      } else {
        toast.error("Failed to update message status");
      }
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Error updating message status");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.coordinatorId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "published" && message.isPublished) ||
                         (statusFilter === "draft" && !message.isPublished);
    
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
            <h1 className="text-2xl font-bold text-gray-900">Coordinator Messages</h1>
            <p className="text-gray-600">Manage messages from coordinators for the Coordinator's Corner</p>
          </div>
          <button
            onClick={() => router.push("/messages/new")}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Message
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Messages
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, content, or coordinator..."
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
                <option value="published">Published Only</option>
                <option value="draft">Draft Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Messages ({filteredMessages.length})
            </h2>
          </div>
          
          {filteredMessages.length === 0 ? (
            <div className="p-6 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-gray-500">No messages found</p>
              <button
                onClick={() => router.push("/messages/new")}
                className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
              >
                Create your first message
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <div key={message._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {message.title}
                        </h3>
                        <button
                          onClick={() => toggleStatus(message)}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            message.isPublished 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                            message.isPublished ? 'bg-green-600' : 'bg-yellow-500'
                          }`}></div>
                          {message.isPublished ? 'Published' : 'Draft'}
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-2">
                          {message.coordinatorId.image_url ? (
                            <img
                              src={message.coordinatorId.image_url}
                              alt={message.coordinatorId.name}
                              className="w-6 h-6 rounded-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-indigo-600 font-medium text-xs">
                                {message.coordinatorId.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <span className="font-medium">{message.coordinatorId.name}</span>
                        </div>
                        <span>•</span>
                        <span>{formatDate(message.datePublished)}</span>
                      </div>

                      {message.excerpt && (
                        <p className="text-sm text-gray-600 italic mb-2">
                          "{truncateText(message.excerpt, 100)}"
                        </p>
                      )}
                      
                      <p className="text-sm text-gray-700">
                        {truncateText(message.content, 150)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => router.push(`/messages/${message._id}/edit`)}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(message)}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Message</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{messageToDelete?.title}"? This action cannot be undone.
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