import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

// Sample customer reviews
const reviews: Review[] = [
  {
    id: 1,
    author: "Michael R.",
    location: "Houston, TX",
    rating: 5,
    text: "Smart-Coat has saved my industrial facility thousands in cooling costs. The ceramic technology actually works exactly as advertised. Will be ordering more for other buildings.",
    date: "May 3, 2023"
  },
  {
    id: 2,
    author: "Sarah L.",
    location: "Phoenix, AZ",
    rating: 5,
    text: "Applied the 1-gallon Smart-Coat to my roof as a test, and the temperature difference is incredible. Already ordered the 5-gallon to finish the job.",
    date: "April 15, 2023"
  },
  {
    id: 3,
    author: "Robert J.",
    location: "Miami, FL",
    rating: 5,
    text: "Our marina dock buildings were constantly overheating. After applying Praetorian Smart-Coat, we measured a 24°F temperature drop inside. Amazing product!",
    date: "April 28, 2023"
  },
  {
    id: 4,
    author: "David W.",
    location: "Las Vegas, NV",
    rating: 4,
    text: "The stucco formula works beautifully with our desert architecture. Installation was easy and the temperature difference is noticeable.",
    date: "March 22, 2023"
  },
  {
    id: 5,
    author: "Jennifer K.",
    location: "Orlando, FL",
    rating: 5,
    text: "We've tried several reflective coatings before, but nothing compares to this. Our energy bills are down 32% since application.",
    date: "April 11, 2023"
  },
  {
    id: 6,
    author: "Thomas M.",
    location: "Austin, TX",
    rating: 5,
    text: "As a professional contractor, I've used most products on the market. Praetorian Smart-Coat's elastomeric quality and durability puts it in a class of its own.",
    date: "May 1, 2023"
  },
  {
    id: 7,
    author: "Maria G.",
    location: "San Diego, CA",
    rating: 5,
    text: "Applied to our pool area and the surface temperature dropped by 39°F in direct sunlight. The kids can finally play outside in summer!",
    date: "April 23, 2023"
  },
  {
    id: 8,
    author: "Richard T.",
    location: "Atlanta, GA",
    rating: 4,
    text: "The application was a bit more involved than expected, but the results are worth it. The ceramic formula definitely delivers on its promises.",
    date: "March 30, 2023"
  }
];

const ScrollingReviews = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-amber-50/50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-300 mb-2">What Our Customers Say</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from professionals and property owners who have experienced the Praetorian difference.
          </p>
        </div>
      </div>
      
      <div className="relative">
        {/* Gradient overlay for left edge */}
        <div className="absolute top-0 bottom-0 left-0 w-16 z-10 bg-gradient-to-r from-amber-50/90 dark:from-gray-900/90 to-transparent pointer-events-none" />
        
        {/* Gradient overlay for right edge */}
        <div className="absolute top-0 bottom-0 right-0 w-16 z-10 bg-gradient-to-l from-amber-50/90 dark:from-gray-900/90 to-transparent pointer-events-none" />
        
        {/* Scrolling review track */}
        <motion.div 
          className="flex gap-6 py-4"
          animate={{ x: [0, -3500] }}
          transition={{ 
            duration: 60,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        >
          {/* First set of reviews */}
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          
          {/* Duplicate reviews for continuous scrolling */}
          {reviews.map((review) => (
            <ReviewCard key={`dup-${review.id}`} review={review} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="flex-shrink-0 w-80 h-60 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-amber-100 dark:border-amber-900/30 relative overflow-hidden">
    {/* Top quote decoration */}
    <div className="absolute top-3 right-3 text-amber-200 dark:text-amber-800 opacity-30">
      <Quote size={24} />
    </div>
    
    {/* Subtle curved line decoration */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-200/0 via-amber-300/30 to-amber-200/0" />
    
    {/* Rating stars */}
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={i < review.rating 
            ? "text-amber-400 fill-amber-400" 
            : "text-gray-300"
          } 
        />
      ))}
    </div>
    
    {/* Review text */}
    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-4 mb-4">
      "{review.text}"
    </p>
    
    {/* Author info */}
    <div className="mt-auto">
      <p className="font-semibold text-amber-900 dark:text-amber-400">{review.author}</p>
      <div className="flex justify-between items-center mt-1">
        <p className="text-gray-500 dark:text-gray-400 text-xs">{review.location}</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs">{review.date}</p>
      </div>
    </div>
  </div>
);

export default ScrollingReviews;