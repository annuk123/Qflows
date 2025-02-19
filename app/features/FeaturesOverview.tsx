// components/FeaturesOverview.tsx
import React from 'react';
import FeatureCard from './FeatureCard';



const FeaturesOverview: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <FeatureCard
  //key={index}
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M17.25 10.5l4.5-4.5-1.5-1.5-4.5 4.5a6.428 6.428 0 0 0-1.06-.63l-.78-4.67h-3.84l-.78 4.67a6.428 6.428 0 0 0-1.06.63l-4.5-4.5-1.5 1.5 4.5 4.5a6.428 6.428 0 0 0-.63 1.06l-4.67.78v3.84l4.67.78a6.428 6.428 0 0 0 .63 1.06l-4.5 4.5 1.5 1.5 4.5-4.5a6.428 6.428 0 0 0 1.06.63l.78 4.67h3.84l.78-4.67a6.428 6.428 0 0 0 1.06-.63l4.5 4.5 1.5-1.5-4.5-4.5a6.428 6.428 0 0 0 .63-1.06l4.67-.78v-3.84l-4.67-.78a6.428 6.428 0 0 0-.63-1.06z"/>
    </svg>
  }
  title="Interactive Debugging Tools"
  description="Debug your code interactively with breakpoints and variable tracking."
/>

<FeatureCard
  //key={index}
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M14 2h-4c-1.1 0-1.99.9-1.99 2L8 20c0 1.1.89 2 1.99 2h4c1.1 0 1.99-.9 1.99-2L16 4c0-1.1-.89-2-1.99-2zm-4 18c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1h-2z"/>
    </svg>
  }
  title="Support for Various Languages"
  description="Supports JavaScript, Python, and other programming languages."
/>

<FeatureCard
 // key={index}
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12 5c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0-2C6.48 3 2 7.48 2 12s4.48 9 10 9 10-4.48 10-9-4.48-9-10-9zm3 9l-4 3V8z"/>
    </svg>
  }
  title="Real-time Code Visualization"
  description="Visualize your code execution step by step in real-time."
/>

<FeatureCard
  //key={index}
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M21 16.58l-3.58-3.58c.38-.73.58-1.55.58-2.42s-.2-1.7-.58-2.42L21 7.42V4l-6 6 6 6v-3.42zm-9 3.42l-3.58-3.58c-.73.38-1.55.58-2.42.58s-1.7-.2-2.42-.58L3 19.58V22l6-6-6-6v3.42l3.58 3.58c.73-.38 1.55-.58 2.42-.58s1.7.2 2.42.58l3.58-3.58z"/>
    </svg>
  }
  title="Easy Sharing"
  description="Share your visualizations with a simple link or embed code."
/>


      </div>
    </section>
  );
};

export default FeaturesOverview;
