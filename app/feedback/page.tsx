"use client"; // Ensure this is the first line

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar/navBar";

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
  const [showPopup, setShowPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    axios.defaults.baseURL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

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
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Please upload a valid JPG or PNG image.");
      return;
    }

    setUserPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  //   const handleSubmitReview = async () => {
  //     if (!userName || !userRating || !userReview || !userPlace || !userPhoto) {
  //       alert("Please fill in all fields and upload a photo.");
  //       return;
  //     }

  //     setIsUploading(true);

  //     try {
  //       // Upload image to Cloudinary
  //       const formData = new FormData();
  //       formData.append("file", userPhoto);
  //       formData.append("upload_preset", "Qflows");

  //       const uploadResponse = await axios.post(
  //         "https://api.cloudinary.com/v1_1/dpiobntr2/image/upload",
  //         formData
  //       );

  //       const avatarUrl = uploadResponse.data.secure_url;

  //       // Submit review
  //       await axios.post("/api/testimonials", {
  //         userName,
  //         place: userPlace,
  //         rating: userRating,
  //         review: userReview,
  //         avatarUrl,
  //       });

  //       // Refresh testimonials
  //       const { data } = await axios.get<Testimonial[]>("/api/testimonials");
  //       setTestimonials(data);

  //       // Reset form
  //       setUserName("");
  //       setUserPlace("");
  //       setUserRating(0);
  //       setUserReview("");
  //       setUserPhoto(null);
  //       setPhotoPreview(null);
  //       setShowPopup(true);

  //       setTimeout(() => setShowPopup(false), 3000);
  //     } catch (error) {
  //       console.error("Error submitting review:", error);
  //       alert("Something went wrong. Please try again.");
  //     } finally {
  //       setIsUploading(false);
  //     }

  // };

  const handleSubmitReview = async () => {
    if (!userName || !userRating || !userReview || !userPlace || !userPhoto) {
      alert("Please fill in all fields and upload a photo.");
      return;
    }

    setIsUploading(true);

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", userPhoto);
      formData.append("upload_preset", "Qflows");

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dpiobntr2/image/upload",
        formData
      );

      console.log("Cloudinary Response:", uploadResponse.data);

      const avatarUrl = uploadResponse.data.secure_url;
      if (!avatarUrl) {
        throw new Error("Failed to get avatar URL from Cloudinary");
      }

      // Get userId from session (if using authentication)
      ///const userId = session?.user?.id || "guest"; // Change this based on your auth system

      // Construct payload
      const payload = {
        userName,
        place: userPlace,
        rating: userRating,
        review: userReview,
        avatarUrl,
        //userId, // Include userId
      };

      console.log("Submitting payload:", payload);

      // Submit review to the API
      const response = await axios.post("/api/testimonials", payload);

      console.log("API Response:", response.data);

      // Refresh testimonials
      const { data } = await axios.get<Testimonial[]>("/api/testimonials");
      setTestimonials(data);

      // Reset form
      setUserName("");
      setUserPlace("");
      setUserRating(0);
      setUserReview("");
      setUserPhoto(null);
      setPhotoPreview(null);
      setShowPopup(true);

      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
      alert("Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
  // };

  return (
    <section className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen w-full flex flex-col items-center">
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <div className="max-w-4xl mx-auto text-center text-white mt-10 py-12">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl mt-8">
          <h3 className="text-xl font-semibold mb-6">
            Loved using our tool? Rate us!
          </h3>
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
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handlePhotoChange}
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              className="mt-4 w-24 h-24 rounded-full"
            />
          )}

          <div className="flex justify-center items-center space-x-2 my-4">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`cursor-pointer text-3xl ${
                  index < userRating ? "text-yellow-400" : "text-gray-600"
                }`}
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
            disabled={isUploading}
            className={`mt-6 bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg 
              ${
                isUploading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-yellow-500 transition"
              }`}
          >
            {isUploading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60">
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold">🎉 Thank You! 🎉</h3>
            <p className="text-gray-600 mt-2">
              Your review has been submitted successfully.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeedbackSection;
