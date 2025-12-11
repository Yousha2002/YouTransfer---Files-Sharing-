// // // "use client"

// // // import { useState } from 'react'
// // // import { useRouter } from 'next/navigation'

// // // export default function RegisterForm() {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     password: '',
// // //     confirmPassword: ''
// // //   })
// // //   const [loading, setLoading] = useState(false)
// // //   const router = useRouter()

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault()

// // //     if (formData.password !== formData.confirmPassword) {
// // //       alert("Passwords don't match")
// // //       return
// // //     }

// // //     setLoading(true)

// // //     try {
// // //       const response = await fetch('http://localhost:5000/api/auth/register', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           name: formData.name,
// // //           email: formData.email,
// // //           password: formData.password
// // //         }),
// // //       })

// // //       const data = await response.json()

// // //       if (response.ok) {
// // //         alert('Registration successful! Please login.')
// // //         router.push('/login')
// // //       } else {
// // //         alert(data.message || 'Registration failed')
// // //       }
// // //     } catch (error) {
// // //       alert('Registration failed. Please try again.')
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const handleChange = (e) => {
// // //     setFormData({
// // //       ...formData,
// // //       [e.target.name]: e.target.value
// // //     })
// // //   }

// // //   return (
// // //     <form onSubmit={handleSubmit} className="space-y-4">
// // //       <div>
// // //         <label className="block text-sm font-medium text-gray-700 mb-1">
// // //           Full Name
// // //         </label>
// // //         <input
// // //           type="text"
// // //           name="name"
// // //           value={formData.name}
// // //           onChange={handleChange}
// // //           required
// // //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// // //           placeholder="Enter your full name"
// // //         />
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium text-gray-700 mb-1">
// // //           Email
// // //         </label>
// // //         <input
// // //           type="email"
// // //           name="email"
// // //           value={formData.email}
// // //           onChange={handleChange}
// // //           required
// // //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// // //           placeholder="Enter your email"
// // //         />
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium text-gray-700 mb-1">
// // //           Password
// // //         </label>
// // //         <input
// // //           type="password"
// // //           name="password"
// // //           value={formData.password}
// // //           onChange={handleChange}
// // //           required
// // //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// // //           placeholder="Enter your password"
// // //         />
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium text-gray-700 mb-1">
// // //           Confirm Password
// // //         </label>
// // //         <input
// // //           type="password"
// // //           name="confirmPassword"
// // //           value={formData.confirmPassword}
// // //           onChange={handleChange}
// // //           required
// // //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// // //           placeholder="Confirm your password"
// // //         />
// // //       </div>

// // //       <button
// // //         type="submit"
// // //         disabled={loading}
// // //         className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
// // //       >
// // //         {loading ? 'Creating Account...' : 'Create Account'}
// // //       </button>
// // //     </form>
// // //   )
// // // }

// // 'use client'

// // import { useState, useEffect } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { useDispatch, useSelector } from 'react-redux'
// // import { registerUser, clearError, clearMessage } from '../store/slices/authSlice'

// // export default function RegisterForm() {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: ''
// //   })

// //   const dispatch = useDispatch()
// //   const router = useRouter()
// //   const { loading, error, message } = useSelector(state => state.auth)

// //   useEffect(() => {
// //     if (message) {
// //       alert(message)
// //       dispatch(clearMessage())
// //       router.push('/login')
// //     }
// //   }, [message, router, dispatch])

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()

// //     if (formData.password !== formData.confirmPassword) {
// //       alert("Passwords don't match")
// //       return
// //     }

// //     dispatch(clearError())
// //     dispatch(registerUser({
// //       name: formData.name,
// //       email: formData.email,
// //       password: formData.password
// //     }))
// //   }

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     })
// //     if (error) dispatch(clearError())
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-4">
// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           Full Name
// //         </label>
// //         <input
// //           type="text"
// //           name="name"
// //           value={formData.name}
// //           onChange={handleChange}
// //           required
// //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //           placeholder="Enter your full name"
// //         />
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           Email
// //         </label>
// //         <input
// //           type="email"
// //           name="email"
// //           value={formData.email}
// //           onChange={handleChange}
// //           required
// //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //           placeholder="Enter your email"
// //         />
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           Password
// //         </label>
// //         <input
// //           type="password"
// //           name="password"
// //           value={formData.password}
// //           onChange={handleChange}
// //           required
// //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //           placeholder="Enter your password"
// //         />
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           Confirm Password
// //         </label>
// //         <input
// //           type="password"
// //           name="confirmPassword"
// //           value={formData.confirmPassword}
// //           onChange={handleChange}
// //           required
// //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //           placeholder="Confirm your password"
// //         />
// //       </div>

// //       {error && (
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
// //           {error}
// //         </div>
// //       )}

// //       <button
// //         type="submit"
// //         disabled={loading}
// //         className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
// //       >
// //         {loading ? 'Creating Account...' : 'Create Account'}
// //       </button>
// //     </form>
// //   )
// // }

// // components/RegisterForm.jsx
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   registerUser,
//   clearError,
//   clearMessage,
// } from "../store/slices/authSlice";
// import {
//   User,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   UserPlus,
//   CheckCircle,
//   Shield,
//   UploadCloud,
//   Smartphone,
//   Globe,
//   ArrowRight,
//   XCircle,
//   AlertCircle,
// } from "lucide-react";

// export default function RegisterForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);
//   const [passwordErrors, setPasswordErrors] = useState([]);

//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { loading, error, message } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (message) {
//       // Show success modal instead of alert
//       const timer = setTimeout(() => {
//         dispatch(clearMessage());
//         router.push("/login");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, router, dispatch]);

//   useEffect(() => {
//     checkPasswordStrength(formData.password);
//   }, [formData.password]);

//   const checkPasswordStrength = (password) => {
//     let strength = 0;
//     const errors = [];

//     if (password.length >= 8) strength += 1;
//     else errors.push("At least 8 characters");

//     if (/[A-Z]/.test(password)) strength += 1;
//     else errors.push("One uppercase letter");

//     if (/[a-z]/.test(password)) strength += 1;
//     else errors.push("One lowercase letter");

//     if (/[0-9]/.test(password)) strength += 1;
//     else errors.push("One number");

//     if (/[^A-Za-z0-9]/.test(password)) strength += 1;
//     else errors.push("One special character");

//     setPasswordStrength(strength);
//     setPasswordErrors(errors);
//   };

//   const getStrengthColor = (strength) => {
//     if (strength <= 2) return "bg-red-500";
//     if (strength <= 3) return "bg-yellow-500";
//     return "bg-green-500";
//   };

//   const getStrengthText = (strength) => {
//     if (strength <= 2) return "Weak";
//     if (strength <= 3) return "Fair";
//     return "Strong";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       dispatch(clearError());
//       // Show custom error instead of alert
//       return;
//     }

//     dispatch(clearError());
//     dispatch(
//       registerUser({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       })
//     );
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     if (error) dispatch(clearError());
//   };

//   const handleQuickLogin = () => {
//     router.push("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#9ECAD6] via-[#FFEAEA] to-[#748DAE] font-['Inter'] p-4 lg:p-8">
//       {/* Success Modal */}
//       {message && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md animate-fadeIn">
//             <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
//               <CheckCircle className="w-8 h-8 text-green-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
//               Account Created!
//             </h3>
//             <p className="text-gray-600 text-center mb-6">{message}</p>
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#748DAE] mx-auto"></div>
//               <p className="text-sm text-gray-500 mt-2">
//                 Redirecting to login...
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8 lg:mb-12">
//           <div className="flex items-center">
//             <div className="bg-white/90 p-3 rounded-2xl shadow-lg">
//               <UploadCloud className="w-8 h-8 text-[#748DAE]" />
//             </div>
//             <span className="ml-3 text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#748DAE] to-[#9ECAD6] bg-clip-text text-transparent">
//               SecureShare
//             </span>
//           </div>
//           <button
//             onClick={handleQuickLogin}
//             className="flex items-center text-[#748DAE] hover:text-[#9ECAD6] font-medium transition-colors"
//           >
//             Sign In
//             <ArrowRight className="w-4 h-4 ml-1" />
//           </button>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
//           {/* Left Side - Features */}
//           <div className="lg:w-1/2">
//             <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 lg:p-10 h-full">
//               <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
//                 Join the Future of{" "}
//                 <span className="bg-gradient-to-r from-[#748DAE] to-[#9ECAD6] bg-clip-text text-transparent">
//                   File Sharing
//                 </span>
//               </h1>

//               <p className="text-gray-600 text-lg mb-8">
//                 Create your account and start sharing files securely with
//                 end-to-end encryption, unlimited storage, and seamless
//                 collaboration.
//               </p>

//               <div className="space-y-6 mb-8">
//                 <div className="flex items-start bg-gradient-to-r from-[#FFEAEA] to-white p-5 rounded-2xl">
//                   <div className="bg-[#F5CBCB] p-3 rounded-xl mr-4">
//                     <Shield className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-800 mb-2">
//                       Military-Grade Security
//                     </h3>
//                     <p className="text-gray-600">
//                       256-bit encryption ensures your files are always protected
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start bg-gradient-to-r from-[#9ECAD6]/20 to-white p-5 rounded-2xl">
//                   <div className="bg-[#748DAE] p-3 rounded-xl mr-4">
//                     <Globe className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-800 mb-2">
//                       Global Access
//                     </h3>
//                     <p className="text-gray-600">
//                       Access your files from any device, anywhere in the world
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start bg-gradient-to-r from-[#F5CBCB]/20 to-white p-5 rounded-2xl">
//                   <div className="bg-gradient-to-r from-[#9ECAD6] to-[#748DAE] p-3 rounded-xl mr-4">
//                     <Smartphone className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-800 mb-2">
//                       Mobile Optimized
//                     </h3>
//                     <p className="text-gray-600">
//                       Beautiful experience on all screen sizes and devices
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-4 mb-8">
//                 <div className="bg-gradient-to-br from-[#9ECAD6] to-[#748DAE] text-white p-4 rounded-2xl text-center">
//                   <div className="text-2xl font-bold">10M+</div>
//                   <div className="text-sm opacity-90">Users</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-[#F5CBCB] to-[#FFEAEA] text-gray-800 p-4 rounded-2xl text-center">
//                   <div className="text-2xl font-bold">500M+</div>
//                   <div className="text-sm opacity-90">Files Shared</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-[#748DAE] to-[#9ECAD6] text-white p-4 rounded-2xl text-center">
//                   <div className="text-2xl font-bold">99.9%</div>
//                   <div className="text-sm opacity-90">Uptime</div>
//                 </div>
//               </div>

//               <div className="text-sm text-gray-500">
//                 <p>✓ No credit card required</p>
//                 <p>✓ Free 15GB storage to start</p>
//                 <p>✓ Cancel anytime</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Registration Form */}
//           <div className="lg:w-1/2">
//             <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 lg:p-10 border border-white/20">
//               <div className="text-center mb-8">
//                 <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#9ECAD6] to-[#748DAE] rounded-3xl mb-4 shadow-lg">
//                   <UserPlus className="w-10 h-10 text-white" />
//                 </div>
//                 <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
//                   Create Account
//                 </h2>
//                 <p className="text-gray-600">Join SecureShare in 30 seconds</p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                     <User className="w-4 h-4 mr-2 text-[#748DAE]" />
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent transition-all font-medium"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                     <Mail className="w-4 h-4 mr-2 text-[#748DAE]" />
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent transition-all font-medium"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                     <Lock className="w-4 h-4 mr-2 text-[#748DAE]" />
//                     Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                       className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent transition-all font-medium"
//                       placeholder="Create a strong password"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//                       ) : (
//                         <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//                       )}
//                     </button>
//                   </div>

//                   {/* Password Strength */}
//                   {formData.password && (
//                     <div className="mt-3">
//                       <div className="flex justify-between items-center mb-1">
//                         <span className="text-sm font-medium text-gray-700">
//                           Password Strength:{" "}
//                           <span
//                             className={
//                               passwordStrength >= 4
//                                 ? "text-green-600"
//                                 : passwordStrength >= 3
//                                 ? "text-yellow-600"
//                                 : "text-red-600"
//                             }
//                           >
//                             {getStrengthText(passwordStrength)}
//                           </span>
//                         </span>
//                         <span className="text-sm font-bold text-gray-800">
//                           {passwordStrength}/5
//                         </span>
//                       </div>
//                       <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className={`h-full ${getStrengthColor(
//                             passwordStrength
//                           )} transition-all duration-500`}
//                           style={{ width: `${(passwordStrength / 5) * 100}%` }}
//                         ></div>
//                       </div>

//                       {passwordErrors.length > 0 && (
//                         <div className="mt-2 space-y-1">
//                           {passwordErrors.map((err, index) => (
//                             <div
//                               key={index}
//                               className="flex items-center text-sm text-red-600"
//                             >
//                               <XCircle className="w-4 h-4 mr-2" />
//                               {err}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                     <Lock className="w-4 h-4 mr-2 text-[#748DAE]" />
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       required
//                       className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent transition-all font-medium ${
//                         formData.confirmPassword &&
//                         formData.password !== formData.confirmPassword
//                           ? "border-red-300"
//                           : "border-gray-200"
//                       }`}
//                       placeholder="Confirm your password"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//                       ) : (
//                         <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//                       )}
//                     </button>
//                   </div>

//                   {formData.confirmPassword &&
//                     formData.password !== formData.confirmPassword && (
//                       <div className="mt-2 flex items-center text-red-600 text-sm">
//                         <AlertCircle className="w-4 h-4 mr-2" />
//                         Passwords do not match
//                       </div>
//                     )}
//                 </div>

//                 {error && (
//                   <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
//                     <div className="flex">
//                       <div className="flex-shrink-0">
//                         <AlertCircle className="h-5 w-5 text-red-400" />
//                       </div>
//                       <div className="ml-3">
//                         <p className="text-sm text-red-700">{error}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex items-start">
//                   <input
//                     id="terms"
//                     name="terms"
//                     type="checkbox"
//                     required
//                     className="h-5 w-5 text-[#748DAE] focus:ring-[#9ECAD6] border-gray-300 rounded mt-1"
//                   />
//                   <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
//                     I agree to the{" "}
//                     <a
//                       href="/terms"
//                       className="text-[#748DAE] hover:text-[#9ECAD6] font-medium"
//                     >
//                       Terms of Service
//                     </a>{" "}
//                     and{" "}
//                     <a
//                       href="/privacy"
//                       className="text-[#748DAE] hover:text-[#9ECAD6] font-medium"
//                     >
//                       Privacy Policy
//                     </a>
//                   </label>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading || passwordStrength < 3}
//                   className="w-full bg-gradient-to-r from-[#748DAE] to-[#9ECAD6] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl text-lg"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
//                       Creating Account...
//                     </>
//                   ) : (
//                     <>
//                       <UserPlus className="w-5 h-5 mr-2" />
//                       Create Account
//                     </>
//                   )}
//                 </button>
//               </form>

//               <div className="mt-8 pt-8 border-t border-gray-200">
//                 <p className="text-center text-gray-600 text-sm mb-4">
//                   Already have an account?
//                 </p>
//                 <button
//                   onClick={handleQuickLogin}
//                   className="w-full border-2 border-[#748DAE] text-[#748DAE] py-3 rounded-xl font-bold hover:bg-[#748DAE] hover:text-white transition-all duration-300 flex items-center justify-center"
//                 >
//                   <ArrowRight className="w-5 h-5 mr-2" />
//                   Sign In to Your Account
//                 </button>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-6 text-center">
//               <p className="text-xs text-gray-500">
//                 Protected by 256-bit SSL encryption • GDPR compliant • ISO 27001
//                 certified
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Global Styles for Animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }


'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearError, clearMessage } from '../store/slices/authSlice'
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, error, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (message) {
      alert(message)
      dispatch(clearMessage())
      router.push('/login')
    }
  }, [message, router, dispatch])

  // Password strength checker
  useEffect(() => {
    const strength = calculatePasswordStrength(formData.password)
    setPasswordStrength(strength)
  }, [formData.password])

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  const getPasswordStrengthColor = (strength) => {
    if (strength === 0) return 'bg-gray-200'
    if (strength === 1) return 'bg-red-500'
    if (strength === 2) return 'bg-yellow-500'
    if (strength === 3) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }

    if (passwordStrength < 3) {
      alert("Please use a stronger password (minimum 8 characters with uppercase, number, and special character)")
      return
    }

    dispatch(clearError())
    dispatch(registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password
    }))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) dispatch(clearError())
  }

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'One number', met: /[0-9]/.test(formData.password) },
    { text: 'One special character', met: /[^A-Za-z0-9]/.test(formData.password) }
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
            <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all"
              placeholder="Create a strong password"
            />
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          {/* Password Strength Meter */}
          {formData.password && (
            <div className="mt-3">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full ${
                      level <= passwordStrength 
                        ? getPasswordStrengthColor(passwordStrength) 
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-500">
                Password strength: {['Weak', 'Fair', 'Good', 'Strong'][passwordStrength - 1] || 'None'}
              </div>
            </div>
          )}
          
          {/* Password Requirements */}
          <div className="mt-3 space-y-1">
            {passwordRequirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                {req.met ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-300" />
                )}
                <span className={`text-xs ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all"
              placeholder="Confirm your password"
            />
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-sm">!</span>
              </div>
            </div>
            <div className="text-sm text-red-700">
              {error}
            </div>
          </div>
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3.5 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            Create Account
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="py-2.5 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button
          type="button"
          className="py-2.5 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </button>
      </div>
    </form>
  )
}