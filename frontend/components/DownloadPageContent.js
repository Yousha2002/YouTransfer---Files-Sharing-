"use client";

import { useState } from "react";
import {
  Download,
  X,
  FileText,
  Image as ImageIcon,
  File,
  Cloud,
  Shield,
  Upload,
  Globe,
  Star,
  Infinity,
  ChevronRight,
  Clock,
  ExternalLink,
  MessageSquare,
  Calendar,
  ArrowRight,
  Share2,
  Folder,
  EyeOff,
  ShieldCheck,
  Timer,
  Lightbulb,
  Lock,
  FolderOpen,
  Database,
} from "lucide-react";
import Image from "next/image";

export default function DownloadPageContent({ transfer }) {
  const [downloading, setDownloading] = useState(null);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  const handleDownload = async (file) => {
    setDownloading(file.id);
    setError(null);

    try {
      console.log("📥 Starting download for file:", file.id);

      const response = await fetch(
        `http://localhost:5000/api/transfers/download/${file.id}`
      );

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server error:", errorText);
        throw new Error(
          `Download failed: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.originalName;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("✅ Download completed");
    } catch (error) {
      console.error("💥 Download error:", error);
      setError(`Download failed: ${error.message}`);
    } finally {
      setDownloading(null);
    }
  };

  const downloadAll = async () => {
    for (const file of transfer.Files) {
      await handleDownload(file);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (mimetype, originalName) => {
    if (mimetype?.includes("image")) return "🖼️";
    if (mimetype?.includes("pdf")) return "📄";
    if (mimetype?.includes("zip") || mimetype?.includes("compressed"))
      return "📦";
    if (mimetype?.includes("text") || originalName?.match(/\.(txt|doc|docx)$/))
      return "📝";
    return "📁";
  };

  const getFileType = (mimetype, originalName) => {
    if (mimetype?.includes("image")) return "Image";
    if (mimetype?.includes("pdf")) return "PDF";
    if (mimetype?.includes("video")) return "Video";
    if (mimetype?.includes("audio")) return "Audio";
    if (mimetype?.includes("zip") || mimetype?.includes("compressed"))
      return "Archive";
    if (mimetype?.includes("text") || originalName?.match(/\.(txt|doc|docx)$/))
      return "Document";
    return "File";
  };

  // Filter files by type for preview
  const imageFiles = transfer.Files.filter((file) =>
    file.mimetype?.includes("image")
  );
  const documentFiles = transfer.Files.filter(
    (file) =>
      file.mimetype?.includes("pdf") ||
      file.mimetype?.includes("text") ||
      file.originalName?.match(/\.(txt|doc|docx|ppt|pptx|xls|xlsx)$/)
  );
  const otherFiles = transfer.Files.filter(
    (file) =>
      !file.mimetype?.includes("image") &&
      !file.mimetype?.includes("pdf") &&
      !file.mimetype?.includes("text") &&
      !file.originalName?.match(/\.(txt|doc|docx|ppt|pptx|xls|xlsx)$/)
  );

  const openPreview = (index = 0) => {
    setCurrentPreviewIndex(index);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setCurrentPreviewIndex(0);
  };

  const nextPreview = () => {
    setCurrentPreviewIndex((prev) =>
      prev < transfer.Files.length - 1 ? prev + 1 : 0
    );
  };

  const prevPreview = () => {
    setCurrentPreviewIndex((prev) =>
      prev > 0 ? prev - 1 : transfer.Files.length - 1
    );
  };

  const PreviewModal = () => {
    if (!showPreview) return null;

    const currentFile = transfer.Files[currentPreviewIndex];
    const isImage = currentFile.mimetype?.includes("image");
    const isDocument =
      currentFile.mimetype?.includes("pdf") ||
      currentFile.mimetype?.includes("text") ||
      currentFile.mimetype?.includes("word") ||
      currentFile.mimetype?.includes("document");

    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6  bg-gradient-to-r from-[#234C6A] to-[#456882]">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl text-white">
                  <Folder/>
                </div>
              </div>
              <div className="text-white">
                <h3 className="font-bold text-xl truncate max-w-md">
                  {currentFile.originalName}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-2 py-1 bg-white/20 rounded-md text-sm">
                    {getFileType(currentFile.mimetype)}
                  </span>
                  <span className="text-white/80 text-sm">
                    {formatFileSize(currentFile.size)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={closePreview}
              className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 flex items-center justify-center min-h-[500px] bg-gradient-to-br from-gray-50 to-blue-50">
            {isImage ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="max-w-4xl max-h-[60vh] overflow-auto rounded-xl shadow-lg">
                  <img
                    src={`http://localhost:5000/api/transfers/download/${currentFile.id}`}
                    alt={currentFile.originalName}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      const errorDiv =
                        e.target.parentElement.querySelector(".error-fallback");
                      if (errorDiv) errorDiv.style.display = "flex";
                    }}
                  />
                </div>
                <div className="error-fallback hidden flex-col items-center justify-center text-gray-500 p-8">
                  <ImageIcon className="w-20 h-20 mb-4 text-[#456882]" />
                  <p className="text-lg font-medium mb-2">
                    Image preview not available
                  </p>
                  <p className="text-gray-600 mb-6">
                    This image format cannot be displayed in browser
                  </p>
                  <button
                    onClick={() => handleDownload(currentFile)}
                    className="bg-gradient-to-r from-[#456882] to-[#234C6A] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download to View
                  </button>
                </div>
              </div>
            ) : isDocument ? (
              <div className="flex flex-col items-center justify-center text-center p-8">
                <div className="p-6 bg-gradient-to-br from-[#D2C1B6]/20 to-[#456882]/20 rounded-2xl mb-6">
                  <FileText className="w-24 h-24 text-[#456882]" />
                </div>
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  {getFileType(currentFile.mimetype)}
                </p>
                <p className="text-gray-600 mb-6 max-w-md">
                  Preview not available for this file type. Download to view the
                  contents.
                </p>
                <button
                  onClick={() => handleDownload(currentFile)}
                  className="bg-gradient-to-r from-[#456882] to-[#234C6A] text-white px-8 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download File
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="p-6 bg-gradient-to-br from-[#D2C1B6]/20 to-[#1B3C53]/20 rounded-2xl mb-6">
                  <File className="w-24 h-24 text-[#1B3C53]" />
                </div>
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  File Type Not Previewable
                </p>
                <p className="text-gray-600 mb-6 max-w-md">
                  This file type cannot be previewed in browser. Download to
                  access the file.
                </p>
                <button
                  onClick={() => handleDownload(currentFile)}
                  className="bg-gradient-to-r from-[#456882] to-[#234C6A] text-white px-8 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download File
                </button>
              </div>
            )}
          </div>

          {/* Navigation and Info */}
          <div className=" bg-white p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={prevPreview}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D2C1B6] to-[#C4B1A5] text-gray-800 rounded-xl hover:opacity-90 transition-opacity font-medium"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Previous
              </button>

              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="flex items-center gap-2 text-[#456882]">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      Expires:{" "}
                      {new Date(transfer.expiration).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#D2C1B6]"></div>
                  <div className="text-sm text-gray-600">
                    File {currentPreviewIndex + 1} of {transfer.Files.length}
                  </div>
                </div>
                {transfer.message && (
                  <p className="text-gray-700 italic max-w-lg">
                    "{transfer.message}"
                  </p>
                )}
              </div>

              <button
                onClick={nextPreview}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#456882] to-[#234C6A] text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen  bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882] flex flex-col">
      <div className="flex flex-col lg:flex-row items-center lg:items-center gap-4  p-6 text-center lg:text-left">
        <div className="bg-gradient-to-br from-[#456882] to-[#234C6A] p-4 rounded-2xl shadow-xl ">
          <FolderOpen className="w-12 h-12 text-white" />
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D2C1B6] to-[#FFFFFF] bg-clip-text text-transparent mb-2">
            Your Files Are Ready!
          </h1>
          <p className="text-gray-300 text-lg">
            Access your secure files below. All downloads are encrypted and
            protected.
          </p>
        </div>
      </div>

      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full">
          {/* Left Column - Form */}

          <div className="flex justify-center lg:justify-start lg:items-start items-center mx-0 lg:mx-16 lg:ml-16">
            <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-lg lg:max-w-xl xl:max-w-2xl border border-[#D2C1B6]/30">
              {/* Header with Brand Colors */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#D2C1B6]/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B3C53] to-[#234C6A] flex items-center justify-center shadow-lg">
                  <File className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#1B3C53] to-[#234C6A] bg-clip-text text-transparent">
                    Files Received
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-sm text-[#456882] font-medium">
                      Expires:{" "}
                      {new Date(transfer.expiration).toLocaleDateString()}
                    </span>
                    <span className="text-[#D2C1B6]">•</span>
                    <span className="text-sm text-gray-600">
                      Ready to download
                    </span>
                  </div>
                </div>
              </div>

              {/* File Preview Gallery */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#1B3C53]">
                    File Preview
                  </h2>
                  {imageFiles.length > 0 && (
                    <button
                      onClick={() => openPreview()}
                      className="text-sm font-medium text-[#234C6A] hover:text-[#1B3C53] transition-colors flex items-center gap-1"
                    >
                      <span>View all</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {imageFiles.length > 0 ? (
                  <div
                    className={`grid gap-3 ${
                      imageFiles.length === 1 ? "grid-cols-1" : "grid-cols-2"
                    } ${imageFiles.length === 3 ? "grid-cols-2" : ""}`}
                  >
                    {imageFiles.slice(0, 4).map((image, index) => (
                      <div
                        key={image.id}
                        className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 border-transparent hover:border-[#456882] transition-all duration-300 ${
                          imageFiles.length === 1 ? "h-64" : "h-40"
                        } ${
                          imageFiles.length === 3 && index === 0
                            ? "col-span-2"
                            : ""
                        }`}
                        onClick={() =>
                          openPreview(transfer.Files.indexOf(image))
                        }
                      >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3C53]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                        <img
                          src={`http://localhost:5000/api/transfers/download/${image.id}`}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Additional Files Overlay */}
                        {index === 3 && imageFiles.length > 4 && (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1B3C53]/90 to-[#234C6A]/90 flex flex-col items-center justify-center">
                            <span className="text-white text-3xl font-bold">
                              +{imageFiles.length - 4}
                            </span>
                            <span className="text-[#D2C1B6] text-sm mt-1">
                              more files
                            </span>
                          </div>
                        )}

                        {/* Hover Indicator */}
                        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm text-[#1B3C53] text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-between">
                          <span className="font-medium">Click to preview</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-48 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-[#D2C1B6] bg-gradient-to-br from-white to-[#D2C1B6]/10">
                    <File className="w-16 h-16 text-[#D2C1B6] mb-4" />
                    <p className="text-[#456882] font-medium">
                      No preview available
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Download files to view
                    </p>
                  </div>
                )}
              </div>

              {/* Transfer Details Card with Custom Colors */}
              <div className="rounded-2xl p-6 mb-6 border border-[#D2C1B6]/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1B3C53] to-[#234C6A] flex items-center justify-center shadow-xl border border-white/20">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    {/* Title + Message */}
                    <div>
                      <h3 className="text-xl font-semibold text-[#1B3C53] tracking-wide mb-2">
                        {transfer.title || "File Transfer"}
                      </h3>

                      {transfer.message && (
                        <div className="relative pl-4">
                          <span className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#456882] to-[#D2C1B6] rounded-full"></span>
                          <p className="text-gray-700 italic bg-white/60 px-3 py-2 rounded-md border border-[#D2C1B6]/20 shadow-sm">
                            "{transfer.message}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Stats Section */}
                    <div className="flex flex-wrap gap-3">
                      {/* Files Count */}
                      <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-[#D2C1B6]/30 shadow-sm hover:shadow-md transition">
                        <Folder className="w-5 h-5 text-[#234C6A]" />
                        <span className="text-sm font-medium text-[#1B3C53]">
                          <span className="font-bold">
                            {transfer.Files.length}
                          </span>{" "}
                          files
                        </span>
                      </div>

                      {/* Total File Size */}
                      <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-[#D2C1B6]/30 shadow-sm hover:shadow-md transition">
                        <Database className="w-5 h-5 text-[#234C6A]" />
                        <span className="text-sm font-medium text-[#456882]">
                          {formatFileSize(
                            transfer.Files.reduce(
                              (acc, file) => acc + file.size,
                              0
                            )
                          )}
                        </span>
                      </div>

                      {/* Expiration Date */}
                      <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-[#D2C1B6]/30 shadow-sm hover:shadow-md transition">
                        <Calendar className="w-5 h-5 text-[#234C6A]" />
                        <span className="text-sm font-medium text-[#234C6A]">
                          {new Date(transfer.expiration).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Files List Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-[#1B3C53]">
                      Files ({transfer.Files.length})
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-[#D2C1B6]"></div>
                  </div>
                  <span className="text-sm text-[#456882] font-medium">
                    Click filename to preview
                  </span>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {transfer.Files.map((file, index) => (
                    <div
                      key={file.id}
                      className="group flex items-center justify-between p-4 bg-white rounded-xl border border-[#D2C1B6]/30 hover:border-[#456882] hover:shadow-lg transition-all duration-300"
                    >
                      <div
                        className="flex items-center space-x-4 flex-1 cursor-pointer"
                        onClick={() => openPreview(index)}
                      >
                        {/* File Icon with Gradient */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1B3C53]/10 to-[#234C6A]/10 border border-[#D2C1B6]/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                            <span className="text-[#1B3C53]">
                              {getFileIcon(file.mimetype, file.originalName)}
                            </span>
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#456882] to-[#1B3C53] text-white text-xs rounded-full flex items-center justify-center font-bold shadow-sm">
                            {index + 1}
                          </div>
                        </div>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-[#1B3C53] truncate group-hover:text-[#234C6A] transition-colors">
                              {file.originalName}
                            </p>
                            <ChevronRight className="w-4 h-4 text-[#456882] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs font-medium text-[#456882] bg-[#456882]/10 px-2 py-1 rounded-full">
                              {getFileType(file.mimetype, file.originalName)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {formatFileSize(file.size)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(file);
                        }}
                        disabled={downloading === file.id}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#1B3C53]/10 to-[#234C6A]/10 text-[#1B3C53] hover:from-[#1B3C53]/20 hover:to-[#234C6A]/20 transition-all duration-300 disabled:opacity-50 group/download"
                        title="Download file"
                      >
                        {downloading === file.id ? (
                          <div className="w-4 h-4 border-2 border-[#1B3C53] border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Download className="w-4 h-4 group-hover/download:scale-110 transition-transform" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons with Custom Colors */}
              <div className="space-y-4">
                {/* Primary Button */}
                <button
                  onClick={downloadAll}
                  disabled={downloading}
                  className="w-full bg-gradient-to-r from-[#1B3C53] via-[#234C6A] to-[#456882] text-white py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3 shadow-lg"
                >
                  {downloading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-lg">Downloading All Files...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      <span className="text-lg">
                        Download All Files ({transfer.Files.length})
                      </span>
                    </>
                  )}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => openPreview()}
                  className="w-full bg-gradient-to-r from-[#1B3C53] via-[#234C6A] to-[#456882] text-white py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3 shadow-lg"
                >
                  <>
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-lg">Preview All</span>
                  </>

                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Error Message with Custom Colors */}
              {error && (
                <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-red-700">
                        Download Error
                      </p>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Note */}
              <div className="mt-6 pt-4 border-t border-[#D2C1B6]/30 text-center">
                <p className="text-xs text-gray-500">
                  Files will be deleted on{" "}
                  <span className="font-medium text-[#456882]">
                    {new Date(transfer.expiration).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - New Design */}
          <div className="w-full  space-y-12">
            {/* TRANSFER INFORMATION */}
            <div className="rounded-3xl p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-6 mb-10">
           
                {/* Brand Logo Section */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 ">
                  <div className="bg-gradient-to-br from-[#456882] to-[#234C6A] p-4 rounded-2xl shadow-xl">
                    <Cloud className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-center lg:text-left">
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D2C1B6] to-[#FFFFFF] bg-clip-text text-transparent mb-2">
                      Transfer Details
                    </h1>
                    <p className="text-gray-300 text-lg">
                      Deep information about your files
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    icon: File,
                    label: "Total Files",
                    value: transfer.Files.length,
                  },
                  {
                    icon: Folder,
                    label: "Total Size",
                    value: formatFileSize(
                      transfer.Files.reduce((acc, f) => acc + f.size, 0)
                    ),
                  },
                  {
                    icon: Clock,
                    label: "Expires In",
                    value:
                      Math.ceil(
                        (new Date(transfer.expiration) - new Date()) /
                          (1000 * 60 * 60 * 24)
                      ) + " days",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#456882]/20 rounded-xl border border-white/10">
                        <item.icon className="w-5 h-5 text-[#D2C1B6]" />
                      </div>
                      <span className="text-gray-200 text-sm">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECURITY FEATURES */}
            <div className="rounded-3xl p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.25)]">
              <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
                <Shield className="w-8 h-8 text-[#D2C1B6]" />
                Security Features
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Lock,
                    title: "End-To-End Encryption",
                    desc: "Military-grade AES-256 encryption",
                  },
                  {
                    icon: EyeOff,
                    title: "Zero-Knowledge",
                    desc: "We never access your files",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Virus Scan",
                    desc: "Automatic malware detection",
                  },
                  {
                    icon: Timer,
                    title: "Auto-Expiry",
                    desc: "Files delete automatically",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D2C1B6]/40 transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-[#456882] to-[#234C6A] shadow-lg">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-white">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DOWNLOAD INSTRUCTIONS */}
            <div className="rounded-3xl p-10 bg-gradient-to-br from-[#1B3C53] to-[#234C6A] border border-[#456882]/40 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
              <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
                <Download className="w-8 h-8 text-[#D2C1B6]" />
                How to Download
              </h3>

              {[
                {
                  step: "1",
                  title: "Click Download Button",
                  desc: "Choose individual files or download all",
                },
                {
                  step: "2",
                  title: "Preview Files",
                  desc: "View images/documents before saving",
                },
                {
                  step: "3",
                  title: "Save Securely",
                  desc: "Files remain encrypted end-to-end",
                },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-6 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D2C1B6] to-[#C4A993] flex items-center justify-center font-bold text-[#1B3C53] shadow-md">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">
                      {s.title}
                    </h4>
                    <p className="text-gray-300 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}

              {/* PRO TIP */}
              <div className="mt-10 p-5 rounded-2xl bg-white/10 border border-white/10 shadow-inner flex items-start gap-4 backdrop-blur-xl">
                <Lightbulb className="w-6 h-6 text-[#D2C1B6]" />
                <div>
                  <p className="font-semibold text-white text-sm mb-1">
                    Pro Tip
                  </p>
                  <p className="text-gray-300 text-sm">
                    Use “Download All” to save time when you have many files
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Preview Modal */}
      <PreviewModal />
    </div>
  );
}
