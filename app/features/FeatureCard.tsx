// components/FeatureCard.tsx
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  // icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group max-w-xs rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16">{icon}</div>
        </div>
        <h3 className="text-xl font-semibold text-center text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 text-center mt-2">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
