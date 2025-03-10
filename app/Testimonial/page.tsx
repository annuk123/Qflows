
// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { Pencil, Trash } from "lucide-react";

// interface Testimonial {
//   id: string;
//   userName: string;
//   avatarUrl: string;
//   userId: string;
//   place: string;
//   rating: number;
//   review: string;
// }

// const TestimonialsSection: React.FC = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
//   const [editedReview, setEditedReview] = useState({
//     userName: "",
//     place: "",
//     review: "",
//     rating: 0,
//   });
//   const [editingReview, setEditingReview] = useState<Testimonial | null>(null);
//   const [storedUserId, setStoredUserId] = useState<string | null>(null);

//   useEffect(() => {
//     //axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
//     const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
//     axios.get(`${BASE_URL}/api/testimonials`)
//   .then(response => console.log(response.data))
//   .catch(error => console.error("Error fetching testimonials:", error));

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

//   useEffect(() => {
//     let userId = localStorage.getItem("userId");
//     if (!userId) {
//       userId = crypto.randomUUID(); // Generate a unique identifier
//       localStorage.setItem("userId", userId);
//     }
//     setStoredUserId(userId); // Store userId in state after retrieving it
//   }, []);


//   const handleDeleteReview = async (id: string) => {
//     try {
//       await axios.delete(`/api/testimonials/${id}`);
//       setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== id));
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   const handleEditReview = (testimonial: Testimonial) => {
//     setEditingReview(testimonial);
//     setEditingReviewId(testimonial.id);
//     setEditedReview({
//       userName: testimonial.userName,
//       place: testimonial.place,
//       review: testimonial.review,
//       rating: testimonial.rating,
//     });
//   };



//   const handleUpdateReview = async () => {
//     if (!editingReview) return;

//     try {
//       const updatedReview = {
//         userName: editedReview.userName,
//         place: editedReview.place,
//         rating: editedReview.rating,
//         review: editedReview.review,
//         avatarUrl: editingReview.avatarUrl, // Keep existing avatar
//       };

//       await axios.patch(`/api/testimonials/${editingReview.id}`, updatedReview);

//       setTestimonials((prevTestimonials) =>
//         prevTestimonials.map((t) =>
//           t.id === editingReviewId ? { ...t, ...updatedReview } : t
//         )
//       );

//       setEditingReview(null);
//       setEditingReviewId(null);
//       setEditedReview({ userName: "", place: "", review: "", rating: 0 });
//     } catch (error) {
//       console.error("Error updating review:", error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingReviewId(null);
//     setEditedReview({ userName: "", place: "", review: "", rating: 0 });
//   };

//   return (
//     <section className="bg-gradient-to-br from-gray-900 to-gray-950 py-16 px-6">
//       <div className="max-w-6xl mx-auto text-center text-white">
//         <h2 className="text-4xl font-bold mb-8">What Our Users Say</h2>

//         <div className="relative overflow-hidden">
//           {testimonials.length > 0 ? (
//             <motion.div
//               className="flex space-x-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide p-4"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               transition={{ duration: 1 }}
//             >
//               {testimonials.map((testimonial) => (
//                 <div
//                   key={testimonial.id}
//                   className="relative snap-center flex-shrink-0 bg-gray-800 text-white rounded-xl shadow-lg p-6 max-w-xs transition-transform hover:scale-105 hover:shadow-xl"
//                 >
//                     {/* {storedUserId === testimonial.userId && ( */}
//                     {storedUserId && storedUserId === testimonial.userId && (
//                   <div className="absolute top-3 right-3 flex space-x-2">
//                     <Pencil
//                       className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700"
//                       onClick={() => handleEditReview(testimonial)}
//                     />
//                     <Trash
//                       className="w-5 h-5 text-gray-600 cursor-pointer hover:text-red-700 mb-5"
//                       onClick={() => handleDeleteReview(testimonial.id)}
//                     />
//                   </div>
//                    )} 

//                   <div className="flex items-center space-x-4 mb-4">
//                     <img
//                       src={testimonial.avatarUrl}
//                       alt={`${testimonial.userName}'s avatar`}
//                       className="w-12 h-12 rounded-full border-2 border-gray-300 mt-6"
//                     />
//                     <div>
//                     {editingReviewId === testimonial.id ? (
//                     <input
//                       type="text"
//                       value={editedReview.userName}
//                       onChange={(e) =>
//                         setEditedReview({ ...editedReview, userName: e.target.value })
//                       }
//                       className="border p-1 bg-gray-800  rounded w-full"
//                     />
//                   ) : (
//                       <h3 className="font-semibold text-lg text-cyan-500 mt-7">
//                         {testimonial.userName}
//                       </h3>
//                     )}

//            {editingReviewId === testimonial.id ? (
//                     <input
//                       type="text"
//                       value={editedReview.place}
//                       onChange={(e) =>
//                         setEditedReview({ ...editedReview, place: e.target.value })
//                       }
//                       className="border p-1 bg-gray-800  rounded w-full mt-2"
//                     />
//                   ) : (
//                       <p className="text-sm text-gray-300">{testimonial.place}</p>
//                     )}
//                     </div>
//                   </div>

//                   {/* Review Text */}
//                   {editingReviewId === testimonial.id ? (
//                 <textarea
//                   value={editedReview.review}
//                   onChange={(e) =>
//                     setEditedReview({ ...editedReview, review: e.target.value })
//                   }
//                   className="border p-1 bg-gray-800 rounded w-full"
//                 />
//               ) : (
//                   <p className="text-sm text-gray-300 italic">{testimonial.review}</p>
//                 )}

//                   {/* Rating */}

//                   <div className="flex items-center">
//                     {Array.from({ length: 5 }).map((_, index) => (
//                       <svg
//                         key={index}
//                         className={`w-5 h-5 ${
//                           index < testimonial.rating ? "text-yellow-400" : "text-gray-300"
//                         }`}
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.126c.969 0 1.371 1.24.588 1.81l-3.342 2.46a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.342 2.46c-.785.57-1.84-.197-1.54-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.708 8.374c-.783-.57-.381-1.81.588-1.81h4.126a1 1 0 00.95-.69l1.286-3.947z" />
//                       </svg>
//                     ))}
//                   </div>

//                   {editingReviewId === testimonial.id && (
//                     <div className="flex space-x-4 mt-4">
//                       <button
//                         onClick={handleUpdateReview}
//                         className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-600 transition"
//                       >
//                         Update
//                       </button>
//                       <button
//                         onClick={handleCancelEdit}
//                         className="bg-gray-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-gray-600 transition"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </motion.div>
//           ) : (
//             <p className="text-white text-lg">No testimonials yet. Be the first to share your experience!</p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;




"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";

interface Testimonial {
  id: string;
  userName: string;
  avatarUrl: string;
  userId: string; // Ensuring userId is a string
  place: string;
  rating: number;
  review: string;
}

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editedReview, setEditedReview] = useState({
    userName: "",
    place: "",
    review: "",
    rating: 0,
  });
  const [editingReview, setEditingReview] = useState<Testimonial | null>(null);
  const [storedUserId, setStoredUserId] = useState<string | null>(null);

  useEffect(() => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    async function fetchTestimonials() {
      try {
        const { data } = await axios.get<Testimonial[]>(`${BASE_URL}/api/testimonials`);
        console.log("Fetched Testimonials:", data); // Debugging
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    }

    fetchTestimonials();
  }, []);

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    console.log("Retrieved User ID:", userId); // Debugging
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("userId", userId);
    }
    setStoredUserId(userId); // Ensuring this runs inside useEffect
  }, []);

  useEffect(() => {
    if (storedUserId) {
      console.log("Updated Stored User ID:", storedUserId);
    }
  }, [storedUserId]);


  const handleDeleteReview = async (id: string) => {
    try {
      await axios.delete(`/api/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEditReview = (testimonial: Testimonial) => {
    setEditingReview(testimonial);
    setEditingReviewId(testimonial.id);
    setEditedReview({
      userName: testimonial.userName,
      place: testimonial.place,
      review: testimonial.review,
      rating: testimonial.rating,
    });
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;

    try {
      const updatedReview = {
        userName: editedReview.userName,
        place: editedReview.place,
        rating: editedReview.rating,
        review: editedReview.review,
        avatarUrl: editingReview.avatarUrl,
      };

      await axios.patch(`/api/testimonials/${editingReview.id}`, updatedReview);

      setTestimonials((prevTestimonials) =>
        prevTestimonials.map((t) =>
          t.id === editingReviewId ? { ...t, ...updatedReview } : t
        )
      );

      setEditingReview(null);
      setEditingReviewId(null);
      setEditedReview({ userName: "", place: "", review: "", rating: 0 });
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditedReview({ userName: "", place: "", review: "", rating: 0 });
  };

  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-950 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-8">What Our Users Say</h2>

        <div className="relative overflow-hidden">
          {testimonials.length > 0 ? (
            <motion.div
              className="flex space-x-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide p-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
            >
                {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="relative snap-center flex-shrink-0 bg-gray-800 text-white rounded-xl shadow-lg p-6 max-w-xs transition-transform hover:scale-105 hover:shadow-xl"
                >
                  {/* Ensure storedUserId is compared as a string */}
                  {storedUserId && storedUserId.trim() === String(testimonial.userId).trim()
                    && (
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <Pencil
                        className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => handleEditReview(testimonial)}
                      />
                      <Trash
                        className="w-5 h-5 text-gray-600 cursor-pointer hover:text-red-700 mb-5"
                        onClick={() => handleDeleteReview(testimonial.id)}
                      />
                    </div>// Debugging UI
                      )}

                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.avatarUrl}
                      alt={`${testimonial.userName}'s avatar`}
                      className="w-12 h-12 rounded-full border-2 border-gray-300 mt-6"
                    />
                    <div>
                      {editingReviewId === testimonial.id ? (
                        <input
                          type="text"
                          value={editedReview.userName}
                          onChange={(e) =>
                            setEditedReview({ ...editedReview, userName: e.target.value })
                          }
                          className="border p-1 bg-gray-800 rounded w-full"
                        />
                      ) : (
                        <h3 className="font-semibold text-lg text-cyan-500 mt-7">
                          {testimonial.userName}
                        </h3>
                      )}

                      {editingReviewId === testimonial.id ? (
                        <input
                          type="text"
                          value={editedReview.place}
                          onChange={(e) =>
                            setEditedReview({ ...editedReview, place: e.target.value })
                          }
                          className="border p-1 bg-gray-800 rounded w-full mt-2"
                        />
                      ) : (
                        <p className="text-sm text-gray-300">{testimonial.place}</p>
                      )}
                    </div>
                  </div>

                  {/* Review Text */}
                  {editingReviewId === testimonial.id ? (
                    <textarea
                      value={editedReview.review}
                      onChange={(e) =>
                        setEditedReview({ ...editedReview, review: e.target.value })
                      }
                      className="border p-1 bg-gray-800 rounded w-full"
                    />
                  ) : (
                    <p className="text-sm text-gray-300 italic">{testimonial.review}</p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      
                        <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.126c.969 0 1.371 1.24.588 1.81l-3.342 2.46a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.342 2.46c-.785.57-1.84-.197-1.54-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.708 8.374c-.783-.57-.381-1.81.588-1.81h4.126a1 1 0 00.95-.69l1.286-3.947z" />
                      </svg>
                    ))}
                  </div>

                    {editingReviewId === testimonial.id && (
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={handleUpdateReview}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ) : (
            <p className="text-white text-lg">No testimonials yet. Be the first to share your experience!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;