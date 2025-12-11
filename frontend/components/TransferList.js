
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  FileText,
  Calendar,
  Download,
  Copy,
  Eye,
  Trash2,
  MoreVertical,
  Link as LinkIcon,
  Mail,
  Clock,
  Shield,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Filter,
  Search,
  ChevronDown,
  AlertCircle,
  BarChart3,
  FolderOpen,
  Users,
  Loader2,
} from "lucide-react";

export default function TransferList() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [expandedTransfer, setExpandedTransfer] = useState(null);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await fetch(
        "http://localhost:5000/api/transfers/my-transfers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      setTransfers(data);
    } catch (error) {
      console.error("Failed to fetch transfers:", error);
      setError("Unable to load transfers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = useCallback(async (text, id) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/download/${text}`
      );
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy link. Please try again.");
    }
  }, []);
  const handleDeleteTransfer = async (transferId) => {
    if (
      !confirm(
        "Are you sure you want to delete this transfer? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setDeleting(transferId);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await fetch(
        `http://localhost:5000/api/transfers/${transferId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Delete successful - UI se remove karen
        setTransfers((prev) => prev.filter((t) => t.id !== transferId));
        alert("Transfer deleted successfully!");
      } else {
        throw new Error(result.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert(`Failed to delete transfer: ${error.message}`);
    } finally {
      setDeleting(null);
    }
  };
  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  const filteredTransfers = useMemo(() => {
    return transfers.filter((transfer) => {
      const matchesSearch =
        transfer.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transfer.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transfer.recipientEmail
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const isExpired = new Date(transfer.expiration) <= new Date();

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !isExpired) ||
        (filter === "expired" && isExpired) ||
        (filter === "email" && transfer.sendMethod === "email") ||
        (filter === "link" && transfer.sendMethod === "link");

      return matchesSearch && matchesFilter;
    });
  }, [transfers, searchTerm, filter]);

  const stats = useMemo(() => {
    const active = filteredTransfers.filter(
      (t) => new Date(t.expiration) > new Date()
    ).length;
    const totalFiles = filteredTransfers.reduce(
      (sum, t) => sum + t.Files.length,
      0
    );
    const totalDownloads = filteredTransfers.reduce(
      (sum, t) => sum + t.downloadCount,
      0
    );
    const totalSize = filteredTransfers.reduce(
      (sum, t) => sum + t.Files.reduce((fs, f) => fs + f.size, 0),
      0
    );

    return { active, totalFiles, totalDownloads, totalSize };
  }, [filteredTransfers]);

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex gap-4">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-3xl flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchTransfers}
            className="px-6 py-3 bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white rounded-xl font-medium hover:from-[#234C6A] hover:to-[#1B3C53] transition-all inline-flex items-center gap-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 mb-10">
        <div className="bg-gradient-to-br from-[#456882] to-[#234C6A] p-4 rounded-2xl shadow-xl">
          <FolderOpen className="w-12 h-12 text-white" />
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D2C1B6] to-[#FFFFFF] bg-clip-text text-transparent mb-2">
            Your Transfers
          </h1>
          <p className="text-gray-300 text-lg">
            Manage and track all your file transfers in one place
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search transfers by title, message, or recipient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all"
            aria-label="Search transfers"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all cursor-pointer"
              aria-label="Filter transfers"
            >
              <option value="all">All Transfers</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="email">Email</option>
              <option value="link">Link</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilter("all");
            }}
            className="px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
            aria-label="Clear filters"
          >
            <Filter className="w-5 h-5" />
            <span className="hidden lg:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {!loading && transfers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl border border-gray-200 hover:border-[#456882] transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Transfers</div>
                <div className="text-2xl font-bold text-gray-900">
                  {filteredTransfers.length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl border border-gray-200 hover:border-green-500 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Active</div>
                <div className="text-2xl font-bold text-green-600">
                  {stats.active}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl border border-gray-200 hover:border-purple-500 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Download className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Downloads</div>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.totalDownloads}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl border border-gray-200 hover:border-amber-500 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Size</div>
                <div className="text-2xl font-bold text-amber-600">
                  {formatFileSize(stats.totalSize)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {loading ? (
        <LoadingSkeleton />
      ) : filteredTransfers.length === 0 ? (
        <div className="text-center py-16 lg:py-24">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl flex items-center justify-center">
            {searchTerm || filter !== "all" ? (
              <Search className="w-16 h-16 text-gray-400" />
            ) : (
              <FileText className="w-16 h-16 text-gray-400" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || filter !== "all"
              ? "No transfers found"
              : "No transfers yet"}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {searchTerm || filter !== "all"
              ? `No transfers match "${searchTerm}" ${
                  filter !== "all" ? `with filter "${filter}"` : ""
                }. Try different keywords or clear filters.`
              : "Start by creating your first file transfer to share files securely."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilter("all");
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white rounded-xl font-medium hover:from-[#234C6A] hover:to-[#1B3C53] transition-all"
            >
              {searchTerm || filter !== "all"
                ? "Clear All Filters"
                : "Create Transfer"}
            </button>
            {searchTerm ||
              (filter !== "all" && (
                <button
                  onClick={fetchTransfers}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                >
                  Refresh
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTransfers.map((transfer) => {
            const isExpired = new Date(transfer.expiration) <= new Date();
            const totalSize = transfer.Files.reduce(
              (sum, file) => sum + file.size,
              0
            );
            const isExpanded = expandedTransfer === transfer.id;

            return (
              <div
                key={transfer.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-5 lg:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            isExpired
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {isExpired ? (
                            <XCircle className="w-6 h-6" />
                          ) : (
                            <CheckCircle2 className="w-6 h-6" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {transfer.title || "Untitled Transfer"}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                  isExpired
                                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                                }`}
                              >
                                {isExpired ? "Expired" : "Active"}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                  transfer.sendMethod === "email"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                    : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                }`}
                              >
                                {transfer.sendMethod === "email" ? (
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    Email
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1">
                                    <LinkIcon className="w-3 h-3" />
                                    Link
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {transfer.message || "No message provided"}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              Expires{" "}
                              {new Date(
                                transfer.expiration
                              ).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <FileText className="w-4 h-4" />
                              {transfer.Files.length} file
                              {transfer.Files.length !== 1 ? "s" : ""}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Download className="w-4 h-4" />
                              {transfer.downloadCount} download
                              {transfer.downloadCount !== 1 ? "s" : ""}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {formatFileSize(totalSize)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start lg:self-center">
                      <button
                        onClick={() =>
                          copyToClipboard(transfer.shareLink, transfer.id)
                        }
                        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                          copiedId === transfer.id
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        aria-label="Copy share link"
                      >
                        {copiedId === transfer.id ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span className="hidden sm:inline">Copy Link</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() =>
                          setExpandedTransfer(isExpanded ? null : transfer.id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label={
                          isExpanded ? "Collapse details" : "Expand details"
                        }
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isExpanded ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-200 animate-in slide-in-from-top duration-300">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Files ({transfer.Files.length})
                          </h4>
                          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                            {transfer.Files.map((file, index) => (
                              <div
                                key={file.id}
                                className="flex items-center justify-between py-2.5 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="p-1.5 bg-white rounded-md border border-gray-200">
                                    <FileText className="w-3.5 h-3.5 text-gray-500" />
                                  </div>
                                  <span className="text-sm text-gray-700 truncate">
                                    {index + 1}. {file.originalName}
                                  </span>
                                </div>
                                <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded">
                                  {formatFileSize(file.size)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Transfer Details
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between py-2">
                              <span className="text-sm text-gray-600">
                                Created
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {new Date(
                                  transfer.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <span className="text-sm text-gray-600">
                                Expires
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {new Date(
                                  transfer.expiration
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <span className="text-sm text-gray-600">
                                Security
                              </span>
                              <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                                <Shield className="w-4 h-4" />
                                End-to-End Encrypted
                              </span>
                            </div>
                            {transfer.recipientEmail && (
                              <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600">
                                  Recipient
                                </span>
                                <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                                  {transfer.recipientEmail}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center justify-between py-2">
                              <span className="text-sm text-gray-600">
                                Share ID
                              </span>
                              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {transfer.shareLink}
                              </span>
                            </div>
                          </div>

                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-3">
                              <button
                                onClick={() =>
                                  window.open(
                                    `${window.location.origin}/download/${transfer.shareLink}`,
                                    "_blank"
                                  )
                                }
                                className="flex-1 py-2.5 bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white rounded-lg font-medium hover:from-[#234C6A] hover:to-[#1B3C53] transition-all flex items-center justify-center gap-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Open Transfer Page
                              </button>
                              {/* <button
                                onClick={() => {
                                  // Add delete functionality
                                  if (confirm("Are you sure you want to delete this transfer?")) {
                                    console.log("Delete transfer:", transfer.id);
                                  }
                                }}
                                className="px-4 py-2.5 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Delete</span>
                              </button> */}
                              {/* Delete button wala section - Line ~590 ke aas paas */}
                              <button
                                onClick={() =>
                                  handleDeleteTransfer(transfer.id)
                                }
                                disabled={deleting === transfer.id}
                                className={`px-4 py-2.5 border border-red-300 text-red-600 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                                  deleting === transfer.id
                                    ? "opacity-50 cursor-not-allowed bg-red-50"
                                    : "hover:bg-red-50"
                                }`}
                              >
                                {deleting === transfer.id ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="hidden sm:inline">
                                      Deleting...
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Trash2 className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                      Delete
                                    </span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Info */}
      {!loading && filteredTransfers.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Showing {filteredTransfers.length} of {transfers.length} transfers
            </p>
            <button
              onClick={fetchTransfers}
              className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Loader2 className="w-4 h-4" />
              Refresh List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
