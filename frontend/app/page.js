// 'use client'

// import Link from 'next/link'
// import Header from '../components/Header'
// import { Upload, Shield, Users, Zap, ArrowRight, Cloud, CheckCircle, Lock } from 'lucide-react'
// import { useState } from 'react'

// export default function Home() {
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#1B3C53] to-[#234C6A]">
//       {/* Navigation */}
//       {/* <nav className="border-b border-[#456882]/30 bg-[#1B3C53]/95 backdrop-blur-sm sticky top-0 z-50">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 bg-gradient-to-r from-[#456882] to-[#D2C1B6] rounded-lg flex items-center justify-center">
//                 <Cloud className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-2xl font-bold text-white">FileFlow</span>
//             </div>

//             <div className="hidden md:flex items-center space-x-8">
//               <Link href="/features" className="text-[#D2C1B6] hover:text-white transition-colors">Features</Link>
//               <Link href="/pricing" className="text-[#D2C1B6] hover:text-white transition-colors">Pricing</Link>
//               <Link href="/about" className="text-[#D2C1B6] hover:text-white transition-colors">About</Link>
//               <Link href="/contact" className="text-[#D2C1B6] hover:text-white transition-colors">Contact</Link>
//             </div>

//             <div className="flex items-center space-x-4">
//               <Link 
//                 href="/login" 
//                 className="text-[#D2C1B6] hover:text-white transition-colors px-4 py-2"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 href="/signup" 
//                 className="bg-gradient-to-r from-[#456882] to-[#D2C1B6] text-[#1B3C53] font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-all"
//               >
//                 Get Started
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav> */}

//       {/* Hero Section */}
      // <main className="container mx-auto px-6 py-16 md:py-24">
      //   <div className="max-w-6xl mx-auto">
      //     <div className="grid md:grid-cols-2 gap-12 items-center">
      //       <div className="space-y-8">
      //         <div>
      //           <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
      //             Share Files 
      //             <span className="block text-[#D2C1B6]">Without Limits</span>
      //           </h1>
      //           <p className="text-xl text-[#D2C1B6]/80 mt-6 leading-relaxed">
      //             Secure, fast, and simple file sharing for teams and individuals. 
      //             Transfer large files, collaborate in real-time, and keep your data protected.
      //           </p>
      //         </div>

      //         <div className="flex flex-col sm:flex-row gap-4">
      //           <Link 
      //             href="/upload"
      //             className="group bg-gradient-to-r from-[#456882] to-[#D2C1B6] text-[#1B3C53] font-bold px-8 py-4 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
      //             onMouseEnter={() => setIsHovered(true)}
      //             onMouseLeave={() => setIsHovered(false)}
      //           >
      //             <Upload className="w-6 h-6" />
      //             <span>Start Uploading Now</span>
      //             <ArrowRight className={`w-5 h-5 transition-transform ${isHovered ? 'translate-x-2' : ''}`} />
      //           </Link>
                
      //           <Link 
      //             href="/demo"
      //             className="border-2 border-[#456882] text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-[#456882]/20 transition-all"
      //           >
      //             Watch Demo
      //           </Link>
      //         </div>

      //         <div className="flex items-center space-x-6 pt-8">
      //           <div className="flex items-center space-x-2">
      //             <CheckCircle className="w-5 h-5 text-[#D2C1B6]" />
      //             <span className="text-white">No Size Limits</span>
      //           </div>
      //           <div className="flex items-center space-x-2">
      //             <Lock className="w-5 h-5 text-[#D2C1B6]" />
      //             <span className="text-white">End-to-End Encrypted</span>
      //           </div>
      //         </div>
      //       </div>

      //       <div className="relative">
      //         <div className="relative bg-gradient-to-br from-[#456882]/20 to-[#D2C1B6]/10 rounded-2xl p-8 border border-[#456882]/30 backdrop-blur-sm">
      //           <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#456882] to-[#D2C1B6] text-[#1B3C53] font-bold px-6 py-2 rounded-lg">
      //             🔥 Fast & Secure
      //           </div>
                
      //           <div className="space-y-6">
      //             <div className="bg-[#234C6A]/50 p-6 rounded-xl border border-[#456882]/30">
      //               <div className="flex items-center justify-between mb-4">
      //                 <div className="flex items-center space-x-3">
      //                   <div className="w-12 h-12 bg-gradient-to-r from-[#456882] to-[#D2C1B6] rounded-lg flex items-center justify-center">
      //                     <Upload className="w-6 h-6 text-white" />
      //                   </div>
      //                   <div>
      //                     <h3 className="text-white font-semibold">design_final.zip</h3>
      //                     <p className="text-[#D2C1B6]/70 text-sm">2.4 GB • Uploading...</p>
      //                   </div>
      //                 </div>
      //                 <div className="text-right">
      //                   <div className="text-[#D2C1B6] font-bold">75%</div>
      //                   <div className="text-white text-sm">Complete</div>
      //                 </div>
      //               </div>
      //               <div className="w-full bg-[#1B3C53] rounded-full h-2">
      //                 <div className="bg-gradient-to-r from-[#456882] to-[#D2C1B6] h-2 rounded-full w-3/4"></div>
      //               </div>
      //             </div>

      //             <div className="grid grid-cols-2 gap-4">
      //               <div className="bg-[#234C6A]/30 p-4 rounded-xl border border-[#456882]/20">
      //                 <div className="flex items-center space-x-3">
      //                   <div className="w-10 h-10 bg-[#456882] rounded-lg flex items-center justify-center">
      //                     <Users className="w-5 h-5 text-white" />
      //                   </div>
      //                   <div>
      //                     <div className="text-white font-bold">5 Users</div>
      //                     <div className="text-[#D2C1B6]/70 text-sm">Active</div>
      //                   </div>
      //                 </div>
      //               </div>
                    
      //               <div className="bg-[#234C6A]/30 p-4 rounded-xl border border-[#456882]/20">
      //                 <div className="flex items-center space-x-3">
      //                   <div className="w-10 h-10 bg-[#456882] rounded-lg flex items-center justify-center">
      //                     <Zap className="w-5 h-5 text-white" />
      //                   </div>
      //                   <div>
      //                     <div className="text-white font-bold">1.2 TB</div>
      //                     <div className="text-[#D2C1B6]/70 text-sm">Transferred</div>
      //                   </div>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </main>

//       {/* Features Section */}
//       <section className="py-20 bg-[#234C6A]">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Powerful Features</h2>
//             <p className="text-xl text-[#D2C1B6]/80 max-w-3xl mx-auto">
//               Everything you need for secure and efficient file sharing
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             {[
//               {
//                 icon: Shield,
//                 title: "Military-Grade Security",
//                 description: "End-to-end encryption ensures your files are protected from unauthorized access.",
//                 color: "from-[#456882] to-[#1B3C53]"
//               },
//               {
//                 icon: Zap,
//                 title: "Lightning Fast",
//                 description: "Transfer files at incredible speeds with our optimized global network.",
//                 color: "from-[#D2C1B6] to-[#456882]"
//               },
//               {
//                 icon: Users,
//                 title: "Team Collaboration",
//                 description: "Share with teams, set permissions, and collaborate in real-time.",
//                 color: "from-[#456882] to-[#234C6A]"
//               }
//             ].map((feature, index) => (
//               <div 
//                 key={index}
//                 className="bg-gradient-to-br from-[#1B3C53]/50 to-[#234C6A]/50 p-8 rounded-2xl border border-[#456882]/30 hover:border-[#D2C1B6]/30 transition-all duration-300 hover:transform hover:-translate-y-2"
//               >
//                 <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
//                   <feature.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
//                 <p className="text-[#D2C1B6]/80 leading-relaxed">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-[#1B3C53] to-[#234C6A]">
//         <div className="container mx-auto px-6 text-center">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Ready to Transform Your File Sharing?
//             </h2>
//             <p className="text-xl text-[#D2C1B6]/80 mb-10">
//               Join thousands of teams who trust us with their most important files
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link 
//                 href="/signup"
//                 className="bg-gradient-to-r from-[#456882] to-[#D2C1B6] text-[#1B3C53] font-bold px-10 py-4 rounded-xl text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
//               >
//                 Get Started Free
//               </Link>
              
//               <Link 
//                 href="/contact"
//                 className="border-2 border-[#D2C1B6] text-white font-semibold px-10 py-4 rounded-xl text-lg hover:bg-[#D2C1B6]/10 transition-all"
//               >
//                 Contact Sales
//               </Link>
//             </div>
            
//             <p className="text-[#D2C1B6]/60 mt-8">
//               No credit card required • 14-day free trial • Cancel anytime
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       {/* <footer className="bg-[#1B3C53] border-t border-[#456882]/30 py-12">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center space-x-3 mb-6 md:mb-0">
//               <div className="w-10 h-10 bg-gradient-to-r from-[#456882] to-[#D2C1B6] rounded-lg flex items-center justify-center">
//                 <Cloud className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-2xl font-bold text-white">FileFlow</span>
//             </div>
            
//             <div className="text-center md:text-right">
//               <p className="text-[#D2C1B6]/70">
//                 © 2024 FileFlow. All rights reserved.
//               </p>
//               <div className="flex space-x-6 mt-4 justify-center md:justify-end">
//                 <Link href="/privacy" className="text-[#D2C1B6] hover:text-white transition-colors">Privacy</Link>
//                 <Link href="/terms" className="text-[#D2C1B6] hover:text-white transition-colors">Terms</Link>
//                 <Link href="/cookies" className="text-[#D2C1B6] hover:text-white transition-colors">Cookies</Link>
//                 <Link href="/status" className="text-[#D2C1B6] hover:text-white transition-colors">Status</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer> */}
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Upload, Shield, Zap, Users, File, CheckCircle, ArrowRight } from 'lucide-react'
import {   Lock } from 'lucide-react'
export default function Home() {
  const [uploadCount, setUploadCount] = useState(0)
  
  useEffect(() => {
    // Simulating live upload counter
    const interval = setInterval(() => {
      setUploadCount(prev => prev + Math.floor(Math.random() * 5) + 1)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B3C53] to-[#234C6A] text-white">
      
      {/* Hero Section */}
      <section className="pt-16 px-6 md:px-12 lg:px-24 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-[#456882]/30 px-4 py-2 rounded-full mb-6">
                <Zap className="h-4 w-4 text-[#D2C1B6]" />
                <span className="text-sm font-medium">Trusted by over 50,000 users</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Share Files <span className="text-[#D2C1B6]">Securely</span> & Instantly
              </h1>
              
              <p className="text-xl text-gray-200 mb-10 max-w-2xl">
                The simplest way to share files with anyone. Secure, fast, and completely free for files up to 5GB. No registration required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/login" 
                  className="bg-[#D2C1B6] text-[#1B3C53] hover:bg-[#D2C1B6]/90 font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <Upload className="h-5 w-5" />
                  Upload Files Now
                </Link>
                <Link 
                  href="/login" 
                  className="bg-transparent border-2 border-[#456882] hover:bg-[#456882]/30 font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <ArrowRight className="h-5 w-5" />
                  Explore Features
                </Link>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">{uploadCount.toLocaleString()}+</div>
                  <div className="text-gray-300 text-sm">Files Uploaded Today</div>
                </div>
                <div className="h-12 w-px bg-[#456882]"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">5GB</div>
                  <div className="text-gray-300 text-sm">Max File Size</div>
                </div>
                <div className="h-12 w-px bg-[#456882]"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-gray-300 text-sm">Secure & Private</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-[#456882] to-[#234C6A] rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="absolute -top-6 -right-6 bg-[#D2C1B6] text-[#1B3C53] p-6 rounded-2xl shadow-xl">
                    <File className="h-12 w-12" />
                  </div>
                  <div className="text-center p-8">
                    <div className="inline-block p-4 bg-[#1B3C53] rounded-2xl mb-6">
                      <Upload className="h-16 w-16 text-[#D2C1B6]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Drag & Drop</h3>
                    <p className="text-gray-300">Upload files in seconds</p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#D2C1B6]/20 rounded-full blur-xl"></div>
                <div className="absolute -top-6 -left-12 w-24 h-24 bg-[#456882]/40 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main className=" mx-auto px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Share Files 
                  <span className="block text-[#D2C1B6]">Without Limits</span>
                </h1>
                <p className="text-xl text-[#D2C1B6]/80 mt-6 leading-relaxed">
                  Secure, fast, and simple file sharing for teams and individuals. 
                  Transfer large files, collaborate in real-time, and keep your data protected.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/login"
                  className="group bg-gradient-to-r from-[#456882] to-[#D2C1B6] text-[#1B3C53] font-bold px-8 py-4 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Upload className="w-6 h-6" />
                  <span>Start Uploading Now</span>
                  <ArrowRight className={`w-5 h-5 transition-transform `} />
                </Link>
                
                <Link 
                  href="/login"
                  className="border-2 border-[#456882] text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-[#456882]/20 transition-all"
                >
                  Watch Demo
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#D2C1B6]" />
                  <span className="text-white">No Size Limits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-[#D2C1B6]" />
                  <span className="text-white">End-to-End Encrypted</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-[#456882]/20 to-[#D2C1B6]/10 rounded-2xl p-8 border border-[#456882]/30 backdrop-blur-sm">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#456882] to-[#D2C1B6] text-[#1B3C53] font-bold px-6 py-2 rounded-lg">
                  🔥 Fast & Secure
                </div>
                
                <div className="space-y-6">
                  <div className="bg-[#234C6A]/50 p-6 rounded-xl border border-[#456882]/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#456882] to-[#D2C1B6] rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">design_final.zip</h3>
                          <p className="text-[#D2C1B6]/70 text-sm">2.4 GB • Uploading...</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#D2C1B6] font-bold">75%</div>
                        <div className="text-white text-sm">Complete</div>
                      </div>
                    </div>
                    <div className="w-full bg-[#1B3C53] rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#456882] to-[#D2C1B6] h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#234C6A]/30 p-4 rounded-xl border border-[#456882]/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#456882] rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-bold">5 Users</div>
                          <div className="text-[#D2C1B6]/70 text-sm">Active</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#234C6A]/30 p-4 rounded-xl border border-[#456882]/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#456882] rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-bold">1.2 TB</div>
                          <div className="text-[#D2C1B6]/70 text-sm">Transferred</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 md:px-12 lg:px-24 py-20 bg-[#234C6A]/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We provide the best file sharing experience with top-notch security and ease of use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#1B3C53] to-[#234C6A] p-8 rounded-2xl shadow-xl">
              <div className="inline-flex items-center justify-center p-4 bg-[#D2C1B6] text-[#1B3C53] rounded-xl mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Military-Grade Security</h3>
              <p className="text-gray-300 mb-4">
                All files are encrypted with AES-256 encryption. Your data is secure during transfer and storage.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D2C1B6]" />
                  <span>End-to-end encryption</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D2C1B6]" />
                  <span>Auto-delete after download</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D2C1B6]" />
                  <span>Password protection option</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-[#1B3C53] to-[#234C6A] p-8 rounded-2xl shadow-xl">
              <div className="inline-flex items-center justify-center p-4 bg-[#D2C1B6] text-[#1B3C53] rounded-xl mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-gray-300 mb-4">
                Upload and download files at maximum speed. Our global CDN ensures fast delivery anywhere.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D2C1B6]" />
                  <span>Unlimited bandwidth</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D2C1B6]" />
                  <span>Global servers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D2C1B6]" />
                  <span>No speed limits</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-[#1B3C53] to-[#234C6A] p-8 rounded-2xl shadow-xl">
              <div className="inline-flex items-center justify-center p-4 bg-[#D2C1B6] text-[#1B3C53] rounded-xl mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Easy Sharing</h3>
              <p className="text-gray-300 mb-4">
                Share files with anyone via link, email, or QR code. No account needed for recipients.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D2C1B6]" />
                  <span>One-click sharing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D2C1B6]" />
                  <span>Custom expiration dates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D2C1B6]" />
                  <span>Download tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Share files in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#456882] to-[#D2C1B6] text-[#1B3C53] rounded-full text-3xl font-bold mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Upload</h3>
              <p className="text-gray-300">
                Drag & drop your files or click to browse. Supports any file type up to 5GB.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#456882] to-[#D2C1B6] text-[#1B3C53] rounded-full text-3xl font-bold mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Configure</h3>
              <p className="text-gray-300">
                Set password, expiration date, and download limits. Or use default settings.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#456882] to-[#D2C1B6] text-[#1B3C53] rounded-full text-3xl font-bold mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Share</h3>
              <p className="text-gray-300">
                Copy the unique link or QR code and share with anyone. Track downloads in real-time.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 bg-[#D2C1B6] text-[#1B3C53] hover:bg-[#D2C1B6]/90 font-bold py-4 px-10 rounded-lg text-lg transition-all hover:scale-105 shadow-lg"
            >
              <Upload className="h-6 w-6" />
              Start Sharing Files Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 bg-gradient-to-r from-[#1B3C53] to-[#234C6A]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Share Files Securely?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of users who trust our platform for fast, secure file sharing. No registration required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login" 
              className="bg-[#D2C1B6] text-[#1B3C53] hover:bg-[#D2C1B6]/90 font-bold py-4 px-10 rounded-lg text-lg transition-all"
            >
              Upload Your First File
            </Link>
            <Link 
              href="/login" 
              className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-4 px-10 rounded-lg text-lg transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}