import React, { useEffect, useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  profilePhoto: string | null;
}

interface GoogleReviewsData {
  businessName: string;
  averageRating: number;
  totalRatings: number;
  reviews: Review[];
}

export const GoogleReviews = () => {
  // Fetch real reviews from Google API
  const { data, isLoading, error } = useQuery<GoogleReviewsData>({
    queryKey: ['/api/google-reviews'],
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: 1,
  });

  // Format the date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
        />
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  useEffect(() => {
    // Update the average rating element if it exists
    if (data) {
      const avgRatingElement = document.getElementById('average-rating');
      if (avgRatingElement) {
        avgRatingElement.textContent = data.averageRating.toFixed(1);
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-primary-400 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-primary-400 mx-auto mb-4 animate-spin" />
            <p className="text-primary-100">Loading verified customer reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-red-400">
        <h3 className="text-xl font-bold mb-3 text-red-300">Unable to load reviews</h3>
        <p className="text-white">
          We're experiencing difficulties loading our Google reviews. 
          Please check back later or visit our 
          <a 
            href="https://g.page/r/CYourGoogleReviewLink" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline ml-1 hover:text-primary-300"
          >
            Google Business Profile
          </a> 
          directly.
        </p>
      </div>
    );
  }

  if (!data || data.reviews.length === 0) {
    return (
      <div className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-primary-400">
        <h3 className="text-xl font-bold mb-3 text-primary-100">No Reviews Available</h3>
        <p className="text-white">
          We don't have any reviews to display at the moment. Be the first to 
          <a 
            href="https://g.page/r/CYourGoogleReviewLink/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline mx-1 hover:text-primary-300"
          >
            leave a review
          </a> 
          on our Google Business Profile.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {data.reviews.map((review, index) => (
        <div key={index} className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-primary-400">
          <div className="flex items-start mb-4">
            <div className="mr-3">
              {review.profilePhoto ? (
                <img 
                  src={review.profilePhoto} 
                  alt={review.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-400"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary-700 flex items-center justify-center border-2 border-primary-400">
                  <span className="text-white font-bold">{review.author.charAt(0)}</span>
                </div>
              )}
            </div>
            <div>
              <h4 className="font-bold text-white">{review.author}</h4>
              <div className="flex items-center mt-1">
                {renderStars(review.rating)}
                <span className="text-xs text-primary-300 ml-2">{formatDate(review.date)}</span>
              </div>
            </div>
          </div>
          <p className="text-white text-sm">
            {review.text.length > 250 
              ? `${review.text.substring(0, 250)}...` 
              : review.text
            }
          </p>
        </div>
      ))}
    </div>
  );
};

export default GoogleReviews;