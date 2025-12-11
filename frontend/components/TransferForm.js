// "use client";

// import { useState } from "react";
// import {
//   Plus,
//   FolderPlus,
//   Calendar,
//   MoreHorizontal,
//   CheckCircle2,
//   Zap,
//   RemoveFormattingIcon,
//   Delete,
//   Copy,
//   X
// } from "lucide-react";
// import QRCode from "qrcode";
// import { useEffect } from "react";

// export default function TransferForm({ user }) {
//   const [files, setFiles] = useState([]);
//   const [qrImage, setQrImage] = useState("");
//   const [formData, setFormData] = useState({
//     title: "",
//     message: "",
//     expiration: "3",
//     sendMethod: "link",
//     recipientEmail: "",
//   });
//   const [uploading, setUploading] = useState(false);
//   const [createdTransfer, setCreatedTransfer] = useState(null);
//   const [showTransferDetails, setShowTransferDetails] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles((prev) => [...prev, ...selectedFiles]);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     setFiles((prev) => [...prev, ...droppedFiles]);
//   };

//   const removeFile = (index) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (files.length === 0) {
//       alert("Please select at least one file");
//       return;
//     }

//     setUploading(true);
//     setCreatedTransfer(null);

//     try {
//       const formDataToSend = new FormData();
//       files.forEach((file) => {
//         formDataToSend.append("files", file);
//       });
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("message", formData.message);
//       formDataToSend.append("expiration", formData.expiration);
//       formDataToSend.append("sendMethod", formData.sendMethod);
//       if (formData.sendMethod === "email") {
//         formDataToSend.append("recipientEmail", formData.recipientEmail);
//       }

//       const token = document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("token="))
//         ?.split("=")[1];

//       const response = await fetch(
//         "http://localhost:5000/api/transfers/create",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formDataToSend,
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         setCreatedTransfer(result);
//         alert("Transfer created successfully!");

//         // Reset form only if not showing link
//         if (formData.sendMethod === "email") {
//           setFiles([]);
//           setFormData({
//             title: "",
//             message: "",
//             expiration: "3",
//             sendMethod: "link",
//             recipientEmail: "",
//           });
//         }
//       } else {
//         alert(result.message || "Failed to create transfer");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert("Link copied to clipboard!");
//   };

//   useEffect(() => {
//     if (createdTransfer?.downloadUrl) {
//       QRCode.toDataURL(createdTransfer.downloadUrl, {
//         width: 400,
//         margin: 2,
//         color: {
//           dark: "#000000",
//           light: "#ffffff",
//         },
//       }).then((url) => {
//         setQrImage(url);
//       });
//     }
//   }, [createdTransfer]);

//   // Transfer Details Modal Component
//   const TransferDetailsModal = () => {
//     if (!showTransferDetails || !createdTransfer) return null;

//     return (
//       <>
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           {/* Modal Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <h2 className="text-2xl font-bold text-gray-900">Transfer Details</h2>
//             <button
//               onClick={() => setShowTransferDetails(false)}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Modal Content */}
//           <div className="p-6 space-y-6">
//             {/* File Information */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">File Information</h3>
//               <div className="bg-gray-50 rounded-xl p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-sm font-medium text-gray-600">File Name</span>
//                   <span className="text-sm text-gray-900">{files[0]?.name || "Our Horse.jpg"}</span>
//                 </div>
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-sm font-medium text-gray-600">File Size</span>
//                   <span className="text-sm text-gray-900">
//                     {files[0] ? `${(files[0].size / 1024 / 1024).toFixed(2)} MB` : "13 MB"}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600">File Type</span>
//                   <span className="text-sm text-gray-900">{files[0]?.type || "image/jpeg"}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Transfer Information */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Information</h3>
//               <div className="bg-gray-50 rounded-xl p-4 space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600">Transfer Title</span>
//                   <span className="text-sm text-gray-900">{formData.title || "Untitled"}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600">Expiration Date</span>
//                   <span className="text-sm text-gray-900">
//                     {(() => {
//                       const expirationDays = parseInt(formData.expiration);
//                       const expiryDate = new Date();
//                       expiryDate.setDate(expiryDate.getDate() + expirationDays);
//                       return expiryDate.toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric'
//                       });
//                     })()}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600">Transfer Method</span>
//                   <span className="text-sm text-gray-900 capitalize">{formData.sendMethod}</span>
//                 </div>
//                 {formData.sendMethod === 'email' && (
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium text-gray-600">Recipient Email</span>
//                     <span className="text-sm text-gray-900">{formData.recipientEmail}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Download Statistics */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Statistics</h3>
//               <div className="bg-gray-50 rounded-xl p-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600">Total Downloads</span>
//                   <span className="text-sm text-gray-900">0</span>
//                 </div>
//               </div>
//             </div>

//             {/* Shareable Link */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Shareable Link</h3>
//               <div className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   value={createdTransfer.downloadUrl}
//                   readOnly
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
//                 />
//                 <button
//                   onClick={() => copyToClipboard(createdTransfer.downloadUrl)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//                 >
//                   Copy
//                 </button>
//               </div>
//             </div>

//             {/* QR Code */}
//             {qrImage && (
//               <div className="text-center">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code</h3>
//                 <div className="flex justify-center">
//                   <img
//                     src={qrImage}
//                     alt="QR Code"
//                     className="w-48 h-48 border border-gray-200 rounded-lg"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Modal Footer */}
//           <div className="flex justify-end p-6 border-t border-gray-200 gap-3">
//             <button
//               onClick={() => setShowTransferDetails(false)}
//               className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//             >
//               Close
//             </button>
//             <button
//               onClick={() => copyToClipboard(createdTransfer.downloadUrl)}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//             >
//               Copy Link
//             </button>
//           </div>
//         </div>
//       </div>

//       </>
//     );
//   };

//   return (
//     <div className="w-full">
//       {/* Transfer Details Modal */}
//       <TransferDetailsModal />

//  {createdTransfer ? (
//   // Success Message with Link
//   <div className="w-full bg-white rounded-lg border border-green-200 p-6 mb-6">
//     <div className="text-center mb-6">
//       <div className="text-6xl mb-4">✅</div>
//       <h2 className="text-2xl font-bold text-green-800 mb-2">
//         Transfer Created Successfully!
//       </h2>
//       <p className="text-green-600">
//         {createdTransfer.transfer.sendMethod === "email"
//           ? `Files sent to ${createdTransfer.transfer.recipientEmail}`
//           : "Your share link is ready"}
//       </p>
//     </div>

//     {/* Show different content based on ACTUAL send method from API */}
//     {createdTransfer.transfer.sendMethod === "link" ? (
//       // LINK METHOD - Show QR Code and Copy Link
//       <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
//         <main className="flex-1 w-full px-6 sm:px-8 lg:px-12 py-12 lg:py-20">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mx-auto">
//             <div className="flex justify-center lg:justify-start">
//               <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
//                 <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
//                   {qrImage ? (
//                     <img
//                       src={qrImage}
//                       alt="QR Code"
//                       className="w-5/6 h-5/6 object-contain"
//                     />
//                   ) : (
//                     <div className="text-gray-400">
//                       Generating QR...
//                     </div>
//                   )}
//                 </div>

//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
//                   You're done!
//                 </h2>

//                 <p className="text-sm text-gray-600 text-center mb-6">
//                   Scan the QR code to download or{" "}
//                   <button
//                     onClick={() => setShowTransferDetails(true)}
//                     className="text-blue-600 hover:text-blue-700 font-medium underline cursor-pointer"
//                   >
//                     see the transfer's details
//                   </button>
//                 </p>

//                 <div className="flex items-center mb-6 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
//                   <input
//                     type="text"
//                     value={createdTransfer.downloadUrl}
//                     readOnly
//                     className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
//                   />
//                   <button
//                     className="ml-2 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
//                     onClick={() =>
//                       copyToClipboard(createdTransfer.downloadUrl)
//                     }
//                   >
//                     <Copy className="w-4 h-4" />
//                     <span className="text-xs sm:text-sm">Copy</span>
//                   </button>
//                 </div>

//                 <button
//                   onClick={() =>
//                     copyToClipboard(createdTransfer.downloadUrl)
//                   }
//                   className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors text-center"
//                 >
//                   Copy link
//                 </button>
//                 <button
//                   onClick={() => {
//                     setCreatedTransfer(null);
//                     setFiles([]);
//                     setFormData({
//                       title: "",
//                       message: "",
//                       expiration: "3",
//                       sendMethod: "link",
//                       recipientEmail: "",
//                     });
//                   }}
//                   className="w-full bg-blue-600 text-white py-3 mt-2 rounded-2xl font-semibold hover:bg-blue-700 transition-colors text-center"
//                 >
//                   Create New Transfer
//                 </button>
//               </div>
//             </div>

//             <div className="flex flex-col justify-center text-center lg:text-left">
//               <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
//                 Wait! Don't send it.
//               </h2>

//               <p className="text-lg sm:text-xl text-gray-800 mb-10">
//                 Keep your transfers available for up to a year.
//               </p>

//               <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg inline-block mx-auto lg:mx-0">
//                 Go Ultimate Now
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     ) : (
//       // EMAIL METHOD - No QR Code, No Copy Link
//       <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
//         <main className="flex-1 w-full px-6 sm:px-8 lg:px-12 py-12 lg:py-20">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mx-auto">
//             <div className="flex justify-center lg:justify-start">
//               <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
//                 <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
//                   <div className="text-6xl">📧</div>
//                 </div>

//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
//                   Email Sent!
//                 </h2>

//                 <p className="text-sm text-gray-600 text-center mb-6">
//                   Your files have been sent to{" "}
//                   <span className="font-medium text-blue-600">
//                     {createdTransfer.transfer.recipientEmail}
//                   </span>
//                 </p>

//                 <p className="text-sm text-gray-500 text-center mb-6">
//                   The recipient will receive an email with download instructions.
//                   {createdTransfer.emailSent && (
//                     <span className="text-green-600 font-medium block mt-2">
//                       ✓ Email delivered successfully!
//                     </span>
//                   )}
//                 </p>

//                 <button
//                   onClick={() => setShowTransferDetails(true)}
//                   className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors text-center mb-3"
//                 >
//                   View Transfer Details
//                 </button>

//                 <button
//                   onClick={() => {
//                     setCreatedTransfer(null);
//                     setFiles([]);
//                     setFormData({
//                       title: "",
//                       message: "",
//                       expiration: "3",
//                       sendMethod: "link", // Reset to link by default
//                       recipientEmail: "",
//                     });
//                     setQrImage(""); // Clear QR code
//                   }}
//                   className="w-full bg-gray-600 text-white py-3 rounded-2xl font-semibold hover:bg-gray-700 transition-colors text-center"
//                 >
//                   Create New Transfer
//                 </button>
//               </div>
//             </div>

//             <div className="flex flex-col justify-center text-center lg:text-left">
//               <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
//                 Email Sent Successfully!
//               </h2>

//               <p className="text-lg sm:text-xl text-gray-800 mb-10">
//                 Your files are on their way to the recipient's inbox.
//               </p>

//               <button
//                 onClick={() => {
//                   setCreatedTransfer(null);
//                   setFiles([]);
//                   setFormData({
//                     title: "",
//                     message: "",
//                     expiration: "3",
//                     sendMethod: "email",
//                     recipientEmail: "",
//                   });
//                   setQrImage("");
//                 }}
//                 className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg inline-block mx-auto lg:mx-0"
//               >
//                 Send More Files
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     )}
//   </div>
// ) : (
//         // Your existing form code remains the same...
//               <form onSubmit={handleSubmit} className="w-full">
//           <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
//             <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
//               {/* Left Column - Form */}
//               <div className="w-full">
//                 <div className="bg-white rounded-3xl shadow-xl p-8 w-full">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-6">
//                     Request files
//                   </h3>

//                   {/* File Upload Section */}
//                   <div className="w-full mb-6">
//                     <div
//                       onDragOver={handleDragOver}
//                       onDrop={handleDrop}
//                       className="file-upload-zone border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors w-full"
//                     >
//                       <input
//                         type="file"
//                         multiple
//                         onChange={handleFileChange}
//                         className="hidden"
//                         id="file-upload"
//                       />
//                       <label
//                         htmlFor="file-upload"
//                         className="cursor-pointer w-full block"
//                       >
//                         <div className="text-gray-600">
//                           <div className="text-4xl mb-4">📁</div>
//                           <p className="text-lg font-semibold">
//                             Add files or folders
//                           </p>
//                           <p className="text-sm mt-2">
//                             Drag and drop files here or click to browse
//                           </p>
//                         </div>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Selected Files */}

//                   {files.length > 0 && (
//                     <div className="w-full mb-6">
//                       <div className="bg-[#EEF3FF] w-full rounded-xl px-4 py-3">
//                         {/* Top Row */}
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-2">
//                             {/* Check Icon */}
//                             <svg
//                               className="w-5 h-5 text-blue-600"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="3"
//                               viewBox="0 0 24 24"
//                             >
//                               <path d="M5 13l4 4L19 7" />
//                             </svg>

//                             {/* File Count */}
//                             <span className="text-blue-600 font-medium text-lg">
//                               {files.length} item{files.length > 1 ? "s" : ""}
//                             </span>
//                           </div>

//                           {/* Right Side Empty Placeholder (optional) */}
//                           <div className="flex items-center gap-2 cursor-pointer"></div>
//                         </div>

//                         {/* Files List */}
//                         <div className="mt-3 space-y-3">
//                           {files.map((file, index) => (
//                             <div
//                               key={index}
//                               className="flex justify-between items-center text-blue-600 border-b pb-2"
//                             >
//                               {/* File name */}
//                               <span className="text-gray-700 text-sm">
//                                 {file.name}
//                               </span>

//                               <div className="flex items-center gap-3">
//                                 {/* File size */}
//                                 <span className="text-xs text-gray-500">
//                                   {(file.size / 1024 / 1024).toFixed(2)} MB
//                                 </span>

//                                 {/* Remove button */}
//                                 <button
//                                   type="button"
//                                   onClick={() => removeFile(index)}
//                                   className="text-red-500 hover:text-red-700 text-sm"
//                                 >
//                                   <Delete />
//                                 </button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Form Fields */}
//                   <div className="space-y-4 mb-6 w-full">
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-2">
//                         Your email
//                       </label>
//                       <div className="relative w-full">
//                         <input
//                           type="email"
//                           value={user.email}
//                           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           readOnly
//                         />
//                         <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
//                       </div>
//                     </div>

//                     <div>
//                       <input
//                         type="text"
//                         name="title"
//                         placeholder="Title"
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>

//                     <div>
//                       <textarea
//                         name="message"
//                         placeholder="Message"
//                         rows={3}
//                         value={formData.message}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                       />
//                     </div>
//                   </div>

//                   {/* Expiration */}
//                   <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl w-full">
//                     <div className="flex items-center space-x-2 text-blue-600 w-full">
//                       <Calendar className="w-5 h-5" />
//                       <div className="w-full">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Expiration *
//                         </label>
//                         <select
//                           name="expiration"
//                           value={formData.expiration}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         >
//                           <option value="1">1 day</option>
//                           <option value="3">3 days</option>
//                           <option value="7">7 days</option>
//                           <option value="30">30 days</option>
//                           <option value="60">60 days</option>
//                           <option value="365">1 year</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Send Method */}
//                   <div className="w-full mb-6">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                       Send Method *
//                     </label>
//                     <div className="space-y-2 w-full">
//                       <label className="flex items-center">
//                         <input
//                           type="radio"
//                           name="sendMethod"
//                           value="link"
//                           checked={formData.sendMethod === "link"}
//                           onChange={handleInputChange}
//                           className="mr-2 text-purple-600"
//                         />
//                         <span>Get Shareable Link</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input
//                           type="radio"
//                           name="sendMethod"
//                           value="email"
//                           checked={formData.sendMethod === "email"}
//                           onChange={handleInputChange}
//                           className="mr-2 text-purple-600"
//                         />
//                         <span>Send via Email</span>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Recipient Email (Conditional) */}
//                   {formData.sendMethod === "email" && (
//                     <div className="w-full mb-6">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Recipient Email *
//                       </label>
//                       <input
//                         type="email"
//                         name="recipientEmail"
//                         value={formData.recipientEmail}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         placeholder="Enter recipient email address"
//                       />
//                     </div>
//                   )}

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={uploading || files.length === 0}
//                     className="w-full bg-purple-600 text-white py-4 rounded-2xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {uploading ? (
//                       <span className="flex items-center justify-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Creating Transfer...
//                       </span>
//                     ) : (
//                       `Create Transfer (${files.length} files)`
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Right Column - Hero Content */}
//               <div className="w-full text-center lg:text-left">
//                 <div className="inline-block mb-8 lg:mb-12">
//                   <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
//                     <span className="text-gray-900">WeTransfer</span>
//                     <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                       Ultimate
//                     </span>
//                   </h1>
//                 </div>

//                 <div className="relative mb-8 lg:mb-12 flex justify-center lg:justify-start w-full">
//                   <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 rounded-full flex items-center justify-center">
//                     <div className="w-32 h-32 sm:w-44 sm:h-44 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center">
//                       <svg
//                         className="w-20 h-20 sm:w-28 sm:h-28 text-purple-300"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                       >
//                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//                   The Ultimate way to
//                   <br />
//                   <span className="text-gray-900">
//                     Keep Transfers Always Available
//                   </span>
//                 </h2>

//                 <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
//                   Tired of transfers expiring over the weekend?{" "}
//                   <span className="font-semibold text-gray-900">Extend</span>{" "}
//                   the expiry dates then.
//                 </p>

//                 <button className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
//                   Upgrade Now
//                 </button>
//               </div>
//             </div>
//           </main>
//         </form>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  Plus,
  FolderPlus,
  Calendar,
  MoreHorizontal,
  RemoveFormattingIcon,
  Delete,
  X,
  Cloud,
  Star,
  Globe,
  Infinity,
  FolderOpen,
  Send,
} from "lucide-react";
import {
  Upload,
  FileText,
  Folder,
  CheckCircle2,
  Shield,
  Lock,
  Link as LinkIcon,
  Mail,
  Clock,
  AlertCircle,
  Zap,
  Download,
  Copy,
  Eye,
} from "lucide-react";
import QRCode from "qrcode";
import { useEffect } from "react";
import { Users } from "lucide-react";
export default function TransferForm({ user }) {
  const [files, setFiles] = useState([]);
  const [qrImage, setQrImage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    expiration: "3",
    sendMethod: "link",
    recipientEmail: "",
  });
  const [uploading, setUploading] = useState(false);
  const [createdTransfer, setCreatedTransfer] = useState(null);
  const [showTransferDetails, setShowTransferDetails] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    setUploading(true);
    setCreatedTransfer(null);

    try {
      const formDataToSend = new FormData();
      files.forEach((file) => {
        formDataToSend.append("files", file);
      });
      formDataToSend.append("title", formData.title);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("expiration", formData.expiration);
      formDataToSend.append("sendMethod", formData.sendMethod);
      if (formData.sendMethod === "email") {
        formDataToSend.append("recipientEmail", formData.recipientEmail);
      }

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await fetch(
        "http://localhost:5000/api/transfers/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setCreatedTransfer(result);
        alert("Transfer created successfully!");

        // Reset form only if not showing link
        if (formData.sendMethod === "email") {
          setFiles([]);
          setFormData({
            title: "",
            message: "",
            expiration: "3",
            sendMethod: "link",
            recipientEmail: "",
          });
        }
      } else {
        alert(result.message || "Failed to create transfer");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  };

  useEffect(() => {
    if (createdTransfer?.downloadUrl) {
      QRCode.toDataURL(createdTransfer.downloadUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      }).then((url) => {
        setQrImage(url);
      });
    }
  }, [createdTransfer]);

  // Transfer Details Modal Component
  const TransferDetailsModal = () => {
    if (!showTransferDetails || !createdTransfer) return null;

    return (
      <>
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white  shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Transfer Details
              </h2>
              <button
                onClick={() => setShowTransferDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* File Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  File Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      File Name
                    </span>
                    <span className="text-sm text-gray-900">
                      {files[0]?.name || "Our Horse.jpg"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      File Size
                    </span>
                    <span className="text-sm text-gray-900">
                      {files[0]
                        ? `${(files[0].size / 1024 / 1024).toFixed(2)} MB`
                        : "13 MB"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      File Type
                    </span>
                    <span className="text-sm text-gray-900">
                      {files[0]?.type || "image/jpeg"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transfer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Transfer Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Transfer Title
                    </span>
                    <span className="text-sm text-gray-900">
                      {formData.title || "Untitled"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Expiration Date
                    </span>
                    <span className="text-sm text-gray-900">
                      {(() => {
                        const expirationDays = parseInt(formData.expiration);
                        const expiryDate = new Date();
                        expiryDate.setDate(
                          expiryDate.getDate() + expirationDays
                        );
                        return expiryDate.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        });
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Transfer Method
                    </span>
                    <span className="text-sm text-gray-900 capitalize">
                      {formData.sendMethod}
                    </span>
                  </div>
                  {formData.sendMethod === "email" && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Recipient Email
                      </span>
                      <span className="text-sm text-gray-900">
                        {formData.recipientEmail}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Download Statistics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Download Statistics
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Total Downloads
                    </span>
                    <span className="text-sm text-gray-900">0</span>
                  </div>
                </div>
              </div>

              {/* Shareable Link */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Shareable Link
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={createdTransfer.downloadUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                  />
                  <button
                    onClick={() => copyToClipboard(createdTransfer.downloadUrl)}
                    className="px-4 py-2 bg-[#234C6A] text-white rounded-lg  transition-colors text-sm font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* QR Code */}
              {qrImage && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    QR Code
                  </h3>
                  <div className="flex justify-center">
                    <img
                      src={qrImage}
                      alt="QR Code"
                      className="w-48 h-48 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200 gap-3">
              <button
                onClick={() => setShowTransferDetails(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => copyToClipboard(createdTransfer.downloadUrl)}
                className="px-6 py-2 bg-[#234C6A] text-white rounded-lg transition-colors font-medium"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-full">
      {/* Transfer Details Modal */}
      <TransferDetailsModal />

      {createdTransfer ? (
        // Success Message with Link
        <div className="w-full  rounded-lg  p-6 mb-6">
          {/* <div className="text-center mb-6">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Transfer Created Successfully!
            </h2>
            <p className="text-green-600">
              {createdTransfer.transfer.sendMethod === "email"
                ? `Files sent to ${createdTransfer.transfer.recipientEmail}`
                : "Your share link is ready"}
            </p>
          </div> */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 ">
            <div className="bg-gradient-to-br from-[#456882] to-[#234C6A] p-4 rounded-2xl shadow-xl">
              <FolderOpen className="w-12 h-12 text-white" />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D2C1B6] to-[#FFFFFF] bg-clip-text text-transparent mb-2">
                Transfer Created Successfully!
              </h1>
              <p className="text-gray-300 text-lg">
                {createdTransfer.transfer.sendMethod === "email"
                  ? `Files sent to ${createdTransfer.transfer.recipientEmail}`
                  : "Your share link is ready"}
              </p>
            </div>
          </div>

          {/* Show different content based on ACTUAL send method from API */}
          {createdTransfer.transfer.sendMethod === "link" ? (
            // LINK METHOD - Show QR Code and Copy Link
            <div className="w-full min-h-screen flex flex-col">
              <main className="flex-1 w-full px-6 sm:px-8 lg:px-12 py-6 lg:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mx-auto">
                  {/* QR Code Section - Always shows when qrImage exists */}
                  <div className="flex justify-center lg:justify-start lg:ml-12">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
                      <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                        {qrImage ? (
                          <img
                            src={qrImage}
                            alt="QR Code"
                            className="w-5/6 h-5/6 object-contain"
                          />
                        ) : (
                          <div className="text-gray-400">Generating QR...</div>
                        )}
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
                        You're done!
                      </h2>

                      <p className="text-sm text-gray-600 text-center mb-6">
                        Scan the QR code to download or{" "}
                        <button
                          onClick={() => setShowTransferDetails(true)}
                          className="text-[#234C6A] hover:text-[#234C6A] font-medium underline cursor-pointer"
                        >
                          see the transfer's details
                        </button>
                      </p>

                      <div className="flex items-center mb-6 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                        <input
                          type="text"
                          value={createdTransfer.downloadUrl}
                          readOnly
                          className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                        />
                        <button
                          className="ml-2 text-[#234C6A] hover:text-[#1B3C53] font-medium flex items-center gap-1"
                          onClick={() =>
                            copyToClipboard(createdTransfer.downloadUrl)
                          }
                        >
                          <Copy className="w-4 h-4" />
                          <span className="text-xs sm:text-sm">Copy</span>
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          copyToClipboard(createdTransfer.downloadUrl)
                        }
                        className="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3.5 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Copy link
                      </button>
                      <button
                        onClick={() => {
                          setCreatedTransfer(null);
                          setFiles([]);
                          setFormData({
                            title: "",
                            message: "",
                            expiration: "3",
                            sendMethod: "link",
                            recipientEmail: "",
                          });
                        }}
                        className="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3.5 mt-2 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Create New Transfer
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Content Section - Changes based on QR Image */}
                  <div className="w-full text-white p-6 lg:p-12 mb-8 lg:mb-0">
                    {qrImage ? (
                      // Content when QR Image exists (File Transfer)
                      <>
                        <div className="flex items-center gap-3 mb-8">
                          <Cloud className="w-10 h-10" />
                          <h1 className="text-4xl font-bold">YouTransfer</h1>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                          Secure Transfer Complete <br />
                          <span className="text-[#D2C1B6]">
                            Files Ready for Download
                          </span>
                        </h2>

                        <p className="text-lg lg:text-xl text-gray-200 mb-10 max-w-xl">
                          Your files have been securely uploaded. Share the QR
                          code or link with your recipient to grant them access
                          to download the files.
                        </p>

                        {/* Security Features for File Transfer */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Secure File Transfer Features
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              <span className="text-gray-200">
                                Encrypted end-to-end file transfer
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              <span className="text-gray-200">
                                Download link expires based on your settings
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              <span className="text-gray-200">
                                One-time download capability
                              </span>
                            </li>
                          </ul>
                        </div>

                        {/* Transfer Stats */}
                        <div className="border-l-4 border-[#D2C1B6] pl-4 py-2">
                          <p className="text-gray-200 mb-2">
                            <span className="font-semibold">
                              Transfer Details:
                            </span>{" "}
                            Files are securely stored and ready for sharing.
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#D2C1B6] to-[#456882] rounded-full flex items-center justify-center">
                              <Cloud className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">
                                Secure Cloud Storage
                              </div>
                              <div className="text-gray-300 text-sm">
                                Files encrypted in transit and at rest
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Content when no QR Image (Password Reset - Default)
                      <>
                        <div className="flex items-center gap-3 mb-8">
                          <Cloud className="w-10 h-10" />
                          <h1 className="text-3xl font-bold">WEPRESENT</h1>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                          Reset Your Password <br />
                          <span className="text-[#D2C1B6]">
                            Regain Secure Access
                          </span>
                        </h2>

                        <p className="text-lg lg:text-xl text-gray-200 mb-10 max-w-xl">
                          Forgot your password? No worries. Enter your email
                          address and we'll send you a secure link to reset your
                          password and regain access to your secure workspace.
                        </p>

                        {/* Security Features for Password Reset */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Secure Password Reset Process
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              <span className="text-gray-200">
                                One-time secure reset link sent to your email
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              <span className="text-gray-200">
                                Link expires in 15 minutes for security
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              <span className="text-gray-200">
                                All active sessions will be terminated after
                                reset
                              </span>
                            </li>
                          </ul>
                        </div>

                        {/* User Support Info */}
                        <div className="border-l-4 border-[#D2C1B6] pl-4 py-2">
                          <p className="text-gray-200 mb-2">
                            <span className="font-semibold">Need help?</span>{" "}
                            Our support team is available 24/7 to assist you
                            with account recovery.
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#D2C1B6] to-[#456882] rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">
                                24/7 Support Available
                              </div>
                              <div className="text-gray-300 text-sm">
                                Average response time: 5 minutes
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </main>
            </div>
          ) : (
            // EMAIL METHOD - No QR Code, No Copy Link
            <div className="w-full min-h-screen flex flex-col">
              <main className="flex-1 w-full px-6 sm:px-8 lg:px-12 py-6 lg:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mx-auto">
                  <div className="flex justify-center lg:justify-start lg:ml-12">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
                      <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                        <div className="text-6xl">📧</div>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
                        Email Sent!
                      </h2>

                      <p className="text-sm text-gray-600 text-center mb-6">
                        Your files have been sent to{" "}
                        <span className="font-medium text-blue-600">
                          {createdTransfer.transfer.recipientEmail}
                        </span>
                      </p>

                      <p className="text-sm text-gray-500 text-center mb-6">
                        The recipient will receive an email with download
                        instructions.
                        {createdTransfer.emailSent && (
                          <span className="text-green-600 font-medium block mt-2">
                            ✓ Email delivered successfully!
                          </span>
                        )}
                      </p>

                      <button
                        onClick={() => setShowTransferDetails(true)}
                        className="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3.5 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        View Transfer Details
                      </button>

                      <button
                        onClick={() => {
                          setCreatedTransfer(null);
                          setFiles([]);
                          setFormData({
                            title: "",
                            message: "",
                            expiration: "3",
                            sendMethod: "link", // Reset to link by default
                            recipientEmail: "",
                          });
                          setQrImage(""); // Clear QR code
                        }}
                        className="w-full bg-gradient-to-r mt-2  from-[#1B3C53] to-[#234C6A] text-white py-3.5 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Create New Transfer
                      </button>
                    </div>
                  </div>

                  <div className="w-full text-white p-6 lg:p-12 mb-8 lg:mb-0">
                    <>
                      <div className="flex items-center gap-3 mb-8">
                        <Mail className="w-10 h-10" />
                        <h1 className="text-4xl font-bold">YouTransfer</h1>
                      </div>

                      <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        Files Sent via Email! <br />
                        <span className="text-[#D2C1B6]">
                          Secure Delivery Confirmed
                        </span>
                      </h2>

                      <p className="text-lg lg:text-xl text-gray-200 mb-10 max-w-xl">
                        Your files have been securely emailed to the recipient.
                        They'll receive a download link that provides safe,
                        encrypted access to the transferred files.
                      </p>

                      {/* Email Delivery Features */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Email Delivery Features
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-gray-200">
                              Encrypted download link sent directly to recipient
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-gray-200">
                              Delivery confirmation with read receipts
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-gray-200">
                              Automatic expiration based on your settings
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Next Steps */}
                      <div className="border-l-4 border-[#D2C1B6] pl-4 py-2">
                        <p className="text-gray-200 mb-2">
                          <span className="font-semibold">What's Next:</span>{" "}
                          The recipient can download the files using the secure
                          link in their email.
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#D2C1B6] to-[#456882] rounded-full flex items-center justify-center">
                            <Clock className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold">
                              Link Active Duration
                            </div>
                            <div className="text-gray-300 text-sm">
                              Expires according to your selected timeframe
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </main>
            </div>
          )}
        </div>
      ) : (
        // Your existing form code remains the same...
        <form onSubmit={handleSubmit} className="w-full">
          <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
              {/* Left Column - Form */}

              <div className="w-full max-w-4xl mx-auto px-4 py-8">
                {/* Security Badge */}
                <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-green-100 rounded-xl border border-green-100">
                  <Shield className="w-5 h-5 text-green-700" />
                  <span className="text-green-800 font-medium text-sm md:text-base">
                    Secure file transfer with end-to-end encryption
                  </span>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                  {/* Header Section */}
                  <div className="bg-white  p-6 md:p-8">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#456882] p-3 rounded-xl backdrop-blur-sm">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">
                          Send Files Securely
                        </h1>
                        <p className="text-black text-sm md:text-base">
                          Upload files and share them with anyone
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8">
                    {/* File Upload Section */}
                    <div className="mb-8">
                      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#234C6A]" />
                        Select Files
                      </h2>

                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="relative group"
                      >
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="block cursor-pointer"
                        >
                          <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 md:p-12 text-center transition-all duration-300 hover:border-[#456882] hover:bg-[#456882]/5 group-hover:scale-[1.01]">
                            <div className="w-20 h-20 mx-auto mb-6 bg-[#456882] rounded-full flex items-center justify-center">
                              <Upload className="w-10 h-10 text-white" />
                            </div>
                            <p className="text-xl font-semibold text-gray-700 mb-2">
                              Drag & drop files or folders here
                            </p>
                            <p className="text-gray-500 mb-4">
                              Maximum file size: 2GB • Supports all file types
                            </p>
                            {/* <button
                             
                              type="button"
                              className="inline-flex items-center gap-2 bg-[#234C6A] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1B3C53] transition-colors"
                            >
                              <Folder className="w-4 h-4" />
                              Browse Files
                            </button> */}
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Selected Files */}
                    {files.length > 0 && (
                      <div className="mb-8">
                        <div className="bg-gradient-to-r from-[#456882]/5 to-[#D2C1B6]/5 rounded-2xl border border-[#456882]/20 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-[#234C6A] p-2 rounded-lg">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800">
                                  {files.length} file
                                  {files.length > 1 ? "s" : ""} selected
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Total size:{" "}
                                  {(
                                    files.reduce(
                                      (acc, file) => acc + file.size,
                                      0
                                    ) /
                                    (1024 * 1024)
                                  ).toFixed(2)}{" "}
                                  MB
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setFiles([])}
                              className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                            >
                              <X className="w-4 h-4" />
                              Clear all
                            </button>
                          </div>

                          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-[#D2C1B6] transition-colors"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="bg-[#456882]/10 p-2 rounded-lg">
                                    <FileText className="w-4 h-4 text-[#234C6A]" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-medium text-gray-700 truncate">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {(file.size / (1024 * 1024)).toFixed(2)}{" "}
                                      MB
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Transfer Details Form */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        {/* Title */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#234C6A]" />
                            Transfer Title
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="title"
                              placeholder="e.g., Project Documents"
                              value={formData.title}
                              onChange={handleInputChange}
                              className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all"
                            />
                            <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message (Optional)
                          </label>
                          <textarea
                            name="message"
                            placeholder="Add a message for the recipient..."
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent resize-none transition-all"
                          />
                        </div>
                        {/* {formData.sendMethod === "email" && (
                          <div className="animate-fadeIn">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Recipient's Email
                            </label>
                            <input
                              type="email"
                              name="recipientEmail"
                              value={formData.recipientEmail}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all"
                              placeholder="recipient@example.com"
                            />
                          </div>
                        )} */}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Your Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#234C6A]" />
                            Your Email
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              value={user.email}
                              className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent"
                              readOnly
                            />
                            <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                          </div>
                        </div>

                        {/* Expiration */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#234C6A]" />
                            Expiration Time
                          </label>
                          <div className="relative">
                            <select
                              name="expiration"
                              value={formData.expiration}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all"
                            >
                              <option value="1">1 day</option>
                              <option value="3">3 days</option>
                              <option value="7">7 days</option>
                              <option value="30">30 days</option>
                              <option value="60">60 days</option>
                              <option value="365">1 year</option>
                            </select>
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Send Method */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Delivery Method
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <label
                              className={`
                relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all
                ${
                  formData.sendMethod === "link"
                    ? "border-[#234C6A] bg-[#234C6A]/5"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
                            >
                              <input
                                type="radio"
                                name="sendMethod"
                                value="link"
                                checked={formData.sendMethod === "link"}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <LinkIcon
                                className={`w-6 h-6 mb-2 ${
                                  formData.sendMethod === "link"
                                    ? "text-[#234C6A]"
                                    : "text-gray-400"
                                }`}
                              />
                              <span className="font-medium">
                                Shareable Link
                              </span>
                            </label>

                            <label
                              className={`
                relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all
                ${
                  formData.sendMethod === "email"
                    ? "border-[#234C6A] bg-[#234C6A]/5"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
                            >
                              <input
                                type="radio"
                                name="sendMethod"
                                value="email"
                                checked={formData.sendMethod === "email"}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <Mail
                                className={`w-6 h-6 mb-2 ${
                                  formData.sendMethod === "email"
                                    ? "text-[#234C6A]"
                                    : "text-gray-400"
                                }`}
                              />
                              <span className="font-medium">
                                Send via Email
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Recipient Email (Conditional) */}
                        {formData.sendMethod === "email" && (
                          <div className="animate-fadeIn">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Recipient's Email
                            </label>
                            <input
                              type="email"
                              name="recipientEmail"
                              value={formData.recipientEmail}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all"
                              placeholder="recipient@example.com"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-100">
                      <button
                        type="submit"
                        disabled={uploading || files.length === 0}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-[#234C6A] hover:to-[#456882] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                      >
                        {uploading ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Creating Secure Transfer...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Lock className="w-5 h-5" />
                            Create Secure Transfer
                            <span className="ml-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                              {files.length} file{files.length !== 1 ? "s" : ""}
                            </span>
                          </span>
                        )}
                      </button>

                      <p className="text-center text-gray-500 text-sm mt-4">
                        By clicking above, you agree to our{" "}
                        <a
                          href="#"
                          className="text-[#234C6A] hover:underline font-medium"
                        >
                          Terms
                        </a>{" "}
                        and confirm your files comply with our{" "}
                        <a
                          href="#"
                          className="text-[#234C6A] hover:underline font-medium"
                        >
                          Content Policy
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Hero Content */}
              <div className="w-full lg:pl-8 flex flex-col gap-12">
                {/* Brand Logo + Tagline */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 ">
                  <div className="bg-gradient-to-br from-[#234C6A] to-[#456882] p-6 rounded-3xl shadow-xl flex items-center justify-center">
                    <Cloud className="w-16 h-16 text-white" />
                  </div>
                  <div className="text-center lg:text-left">
                    <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#D2C1B6] to-white bg-clip-text text-transparent mb-2">
                      YouTransfer
                    </h1>
                    <p className="text-[#D2C1B6] text-lg lg:text-xl mt-1">
                      Secure File Transfer Platform
                    </p>
                  </div>
                </div>

                {/* Main Heading */}
                <div className=" text-center lg:text-left">
                  <h2 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                    <span className="text-white">Transfer Files</span>
                    <span className="block bg-gradient-to-r from-[#D2C1B6] to-[#456882] bg-clip-text text-transparent">
                      With Confidence
                    </span>
                  </h2>
                  <p className="text-[#D2C1B6] text-lg lg:text-xl max-w-xl">
                    Send large files securely with military-grade encryption and
                    complete privacy control.
                  </p>
                </div>

                {/* Feature Cards with soft glass effect */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: Shield,
                      title: "Military-Grade Security",
                      desc: "End-to-end encryption with zero-knowledge architecture",
                    },
                    {
                      icon: Upload,
                      title: "Lightning Fast",
                      desc: "Upload speeds up to 1Gbps with parallel transfers",
                    },
                    {
                      icon: Globe,
                      title: "Global Delivery",
                      desc: "Share with anyone worldwide via link or email",
                    },
                    {
                      icon: Infinity,
                      title: "No Limits",
                      desc: "Unlimited downloads, multiple recipients, all file types",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="backdrop-blur-md bg-[#1B3C53]/20 border border-[#234C6A] rounded-3xl p-7 hover:scale-105 transition-transform duration-300 shadow-lg flex items-start gap-5"
                    >
                      <div className="bg-gradient-to-r from-[#456882] to-[#234C6A] p-5 rounded-xl shadow-md flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-xl mb-2">
                          {item.title}
                        </h3>
                        <p className="text-[#D2C1B6] text-base">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats Section */}
                <div className="relative bg-[#234C6A]/10 border border-[#456882] rounded-3xl p-10 shadow-inner grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { value: "2GB", label: "Per File Size" },
                    { value: "365", label: "Days Retention" },
                    { value: "99.9%", label: "Uptime SLA" },
                    { value: "∞", label: "Downloads" },
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#D2C1B6] to-white bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-[#D2C1B6] text-sm lg:text-base">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Badge / Testimonial */}
                <div className="mt-10 p-6 bg-[#1B3C53]/20 border border-[#234C6A] rounded-3xl shadow-lg flex items-center gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-[#D2C1B6] text-sm lg:text-base">
                    "Used by over 50,000+ professionals worldwide"
                  </p>
                </div>
              </div>
            </div>
          </main>
        </form>
      )}
    </div>
  );
}
