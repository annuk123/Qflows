
"use client"; // Ensure this is the first line in the file

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar/nav";

interface Testimonial {
  id: string;
  userName: string;
  avatarUrl: string;
  place: string;
  rating: number;
  review: string;
}

const FeedbackSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [userName, setUserName] = useState("");
  const [userPlace, setUserPlace] = useState("");
 const [userPhoto, setUserPhoto] = useState<File | null>(null);
 const [photoPreview, setPhotoPreview] = useState<string | null>(null);
 const [showPopup, setShowPopup] = useState(false); // ✅ State for Thank You popup


  useEffect(() => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    async function fetchTestimonials() {
      try {
        const { data } = await axios.get<Testimonial[]>("/api/testimonials");
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    }
    fetchTestimonials();
  }, []);

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setUserPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid JPG or PNG image.");
    }
  };

  




const handleSubmitReview = async () => {
    if (!userName || !userRating || !userReview || !userPlace || !userPhoto) {
      return alert("Please fill in all fields and upload a photo.");
    }
  
    try {
      // Validate image type
      if (!["image/jpeg", "image/png"].includes(userPhoto.type)) {
        return alert("Only JPG and PNG images are allowed.");
      }
  
      // Upload photo to Cloudinary
      const formData = new FormData();
      formData.append("file", userPhoto);
      formData.append("upload_preset", "Qflows"); // Use your actual upload preset
  
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dpiobntr2/image/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (!uploadResponse.data.secure_url) {
        throw new Error("Image upload failed");
      }
  
      const avatarUrl = uploadResponse.data.secure_url; // Get the uploaded image URL
  
      // Send the testimonial data as JSON
      const { data } = await axios.post(
        "/api/testimonials",
        {
          userName,
          place: userPlace,
          rating: userRating,
          review: userReview,
          avatarUrl, // Use uploaded image URL
        },
        { headers: { "Content-Type": "application/json" } }
      );
  
      // Update state with new testimonial
     // setTestimonials((prev) => [data, ...prev]);
     setShowPopup(true);
     setTimeout(() => setShowPopup(false), 3000); // Auto-hide after 3s
      // Reset form fields
      setUserName("");
      setUserPlace("");
      setUserRating(0);
      setUserReview("");
      setUserPhoto(null);
      setPhotoPreview(null);
    } catch (error: any) {
      console.error("Error submitting review:", error);
      alert(error.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  
    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [isDarkMode]);
      // Optional: Add any animations or effects here
   
      const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
      };
  
  return (
  <section className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen w-full flex flex-col items-center">
  <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

  <div className="max-w-4xl mx-auto text-center text-white mt-10 py-12">
    {/* <h2 className="text-5xl font-bold mb-8">What Our Users Say</h2>
     */}
    {/* Submit a Review */}
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl mt-8">
      <h3 className="text-xl font-semibold mb-6">Loved using our tool? Rate us!</h3>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Your Name"
        className="w-full rounded-lg p-3 bg-gray-700 text-white mb-4"
      />
      <input
        type="text"
        value={userPlace}
        onChange={(e) => setUserPlace(e.target.value)}
        placeholder="Your Place"
        className="w-full rounded-lg p-3 bg-gray-700 text-white mb-4"
      />
      <input type="file" accept="image/jpeg, image/png" onChange={handlePhotoChange} />
      {photoPreview && (
        <img src={photoPreview} alt="Preview" className="mt-4 w-24 h-24 rounded-full" />
      )}
      
      <div className="flex justify-center items-center space-x-2 my-4">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer text-3xl ${index < userRating ? "text-yellow-400" : "text-gray-600"}`}
            onClick={() => setUserRating(index + 1)}
          >
            ★
          </span>
        ))}
      </div>
      
      <textarea
        value={userReview}
        onChange={(e) => setUserReview(e.target.value)}
        className="w-full rounded-lg p-3 bg-gray-700 text-white"
        placeholder="Write your review here..."
      />
      <button
        onClick={handleSubmitReview}
        className="mt-6 bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition"
      >
        Submit Review
      </button>
    </div>
  </div>

  {/* Thank You Popup */}
  {showPopup && (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60">
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-xl transform scale-105 transition-all">
        <h3 className="text-xl font-bold">🎉 Thank You! 🎉</h3>
        <p className="text-gray-600 mt-2">Your review has been submitted successfully.</p>
      </div>
    </div>
  )}
</section>
  );
};

export default FeedbackSection;
