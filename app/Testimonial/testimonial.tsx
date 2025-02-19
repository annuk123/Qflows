// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// interface Testimonial {
//   id: string;
//   userName: string;
//   avatarUrl: string;
//   rating: number;
//   review: string;
// }

// const TestimonialsSection: React.FC = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [userRating, setUserRating] = useState(0);
//   const [userReview, setUserReview] = useState("");

//   useEffect(() => {

//     axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

//     // Fetch testimonials from the server
//     async function fetchTestimonials() {
//       try {
//         const { data } = await axios.get<Testimonial[]>("/api/testimonials");
//         setTestimonials(data);
//       } catch (error) {
//         console.error("Error fetching testimonials:", error);
//       }
//     }
//     fetchTestimonials();
//   }, []);

//   const handleSubmitReview = async () => {
//     if (!userRating || !userReview) return alert("Please provide a rating and review.");
//     try {
//       const newTestimonial = {
//         userName: "Anonymous User", // Replace with real user data if available
//         avatarUrl: "https://via.placeholder.com/150",
//         rating: userRating,
//         review: userReview,
//       };

//       const { data } = await axios.post("/api/testimonials/add", newTestimonial);
//       setTestimonials((prev) => [...prev, data]);
//       setUserRating(0);
//       setUserReview("");
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   return (
//     <section className="bg-gradient-to-br from-blue-500 to-purple-600 py-16 px-6">
//       <div className="max-w-6xl mx-auto text-center text-white">
//         <h2 className="text-4xl font-bold mb-8">What Our Users Say</h2>

//         {/* Testimonials Carousel */}
//         <div className="relative overflow-hidden">
//           <motion.div
//             className="flex space-x-6 overflow-x-scroll snap-x snap-mandatory"
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             transition={{ duration: 1 }}
//           >
//             {testimonials.map((testimonial) => (
//               <div
//                 key={testimonial.id}
//                 className="snap-center flex-shrink-0 bg-white text-gray-800 rounded-lg shadow-lg p-6 max-w-xs"
//               >
//                 <div className="flex items-center space-x-4 mb-4">
//                   <img
//                     src={testimonial.avatarUrl}
//                     alt={`${testimonial.userName}'s avatar`}
//                     className="w-12 h-12 rounded-full"
//                   />
//                   <h3 className="font-bold">{testimonial.userName}</h3>
//                 </div>
//                 <p className="text-sm text-gray-600">{testimonial.review}</p>
//                 <div className="flex items-center mt-2">
//                   {Array.from({ length: 5 }).map((_, index) => (
//                     <svg
//                       key={index}
//                       className={`w-5 h-5 ${
//                         index < testimonial.rating ? "text-yellow-400" : "text-gray-300"
//                       }`}
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.126c.969 0 1.371 1.24.588 1.81l-3.342 2.46a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.342 2.46c-.785.57-1.84-.197-1.54-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.708 8.374c-.783-.57-.381-1.81.588-1.81h4.126a1 1 0 00.95-.69l1.286-3.947z" />
//                     </svg>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </div>

//         {/* Submit a Review */}
//         <div className="mt-12">
//           <h3 className="text-xl font-semibold mb-4">Loved using our tool? Rate us!</h3>
//           <div className="flex justify-center items-center space-x-2 mb-4">
//             {Array.from({ length: 5 }).map((_, index) => (
//               <svg
//                 key={index}
//                 onClick={() => setUserRating(index + 1)}
//                 className={`w-8 h-8 cursor-pointer ${
//                   index < userRating ? "text-yellow-400" : "text-gray-300"
//                 }`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.126c.969 0 1.371 1.24.588 1.81l-3.342 2.46a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.342 2.46c-.785.57-1.84-.197-1.54-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.708 8.374c-.783-.57-.381-1.81.588-1.81h4.126a1 1 0 00.95-.69l1.286-3.947z" />
//               </svg>
//             ))}
//           </div>
//           <textarea
//             value={userReview}
//             onChange={(e) => setUserReview(e.target.value)}
//             className="w-full max-w-lg rounded-lg p-4 bg-gray-200 text-gray-800"
//             placeholder="Write your review here..."
//           />
//           <button
//             onClick={handleSubmitReview}
//             className="mt-4 bg-yellow-400 text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition"
//           >
//             Submit Review
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;
