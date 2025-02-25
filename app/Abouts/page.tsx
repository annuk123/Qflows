// "use client";
// import React from 'react';
// import { useEffect } from 'react';
// import Navbar from '../components/NavBar/nav';

// const AboutPage: React.FC = () => {
//     const [isDarkMode, setIsDarkMode] = React.useState(false);

//     useEffect(() => {
//       if (isDarkMode) {
//         document.documentElement.classList.add("dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//       }
//     }, [isDarkMode]);

//     const toggleTheme = () => {
//       setIsDarkMode(!isDarkMode);
//     };

//   return (
//     // <div className="bg-gray-100 min-h-screen flex flex-col items-center min-w-80">
//     <div className= {`${
//         isDarkMode ? 'bg-gray-800' : 'bg-blue-200'
//       } min-w-80 min-h-screen  items-center`}>
//         <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
//       <header className="flex justify-center flex-col items-center w-full mt-4">
//         <h1 className="text-4xl font-bold text-blue-600 mb-4">About Qflows</h1>
//         <p className="text-lg text-gray-700">
//           Welcome to <strong>Qflows</strong>, your go-to platform for streamlined task management, collaboration, and productivity!
//         </p>
//       </header>

//       <section className="max-w-4xl bg-white rounded-lg shadow-lg flex flex-col justify-center w-full items-center p-6 mb-8">
//         <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Mission</h2>
//         <p className="text-gray-700 leading-relaxed">
//           At Qflows, we aim to revolutionize how individuals and teams work by providing tools that enhance productivity, improve organization,
//           and foster seamless collaboration. Whether you're managing tasks, tracking progress, or organizing workflows, Qflows has you covered.
//         </p>
//       </section>

//       <section className="max-w-4xl bg-white rounded-lg shadow-lg p-6 mb-8">
//         <h2 className="text-2xl font-semibold text-blue-500 mb-4">Key Features</h2>
//         <ul className="list-disc list-inside text-gray-700 leading-relaxed">
//           <li>Comprehensive task management tools to stay on top of deadlines.</li>
//           <li>Seamless integration with GitHub for developers.</li>
//           <li>Real-time collaboration and communication for teams.</li>
//           <li>Secure authentication powered by GitHub and credentials-based login.</li>
//           <li>Analytics and insights to track productivity and growth.</li>
//         </ul>
//       </section>

//       <section className="max-w-4xl bg-white rounded-lg shadow-lg p-6 mb-8">
//         <h2 className="text-2xl font-semibold text-blue-500 mb-4">Built With</h2>
//         <p className="text-gray-700 leading-relaxed">
//           Qflows is built with cutting-edge technologies like <strong>Next.js</strong>, <strong>React</strong>, and <strong>Prisma ORM</strong>.
//           It integrates with <strong>NeonDB</strong> for database management and leverages the power of <strong>Auth.js</strong> for secure authentication.
//         </p>
//       </section>

//       <section className="max-w-4xl bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-semibold text-blue-500 mb-4">Contact Us</h2>
//         <p className="text-gray-700 leading-relaxed">
//           We’d love to hear from you! For feedback, support, or general inquiries, feel free to reach out at
//           <a href="mailto:support@qflows.com" className="text-blue-600 hover:underline"> anuk@gmail.com .com</a>.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;

"use client";
import React from "react";
import { useEffect } from "react";
import Navbar from "../components/NavBar/navBar";

const AboutPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    // <div className="bg-gray-100 min-h-screen flex flex-col items-center min-w-80">
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-blue-200"
      } min-w-80 min-h-screen  items-center`}
    >
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <header className="flex justify-center flex-col items-center w-full mt-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About Qflows</h1>
        <p className="justify-center flex flex-col w-full text-lg text-gray-700 items-center text-center">
          Uh-oh <br />
          Developer was too busy to write this page. <br />
          Please check back later. <br />
          This page will be updated soon...
        </p>
      </header>
    </div>
  );
};

export default AboutPage;
