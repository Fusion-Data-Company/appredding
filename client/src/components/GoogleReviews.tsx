import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star, Quote, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  time: number;
  profile_photo?: string;
}

interface GoogleReviewsData {
  rating: number;
  reviewCount: number;
  reviews: GoogleReview[];
  source: 'google' | 'mock';
}

const GoogleReviews = () => {
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

  const { data, isLoading, error } = useQuery<{ success: boolean; data: GoogleReviewsData }>({
    queryKey: ['/api/reviews/google'],
  });

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedReviews(newExpanded);
  };

  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 1) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    if (days < 60) return '1 month ago';
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    if (days < 730) return '1 year ago';
    return `${Math.floor(days / 365)} years ago`;
  };

  const getInitials = (name: string): string => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[parts.length - 1][0];
    }
    return name.substring(0, 2);
  };

  const truncateText = (text: string, maxLength: number = 200): { text: string; isTruncated: boolean } => {
    if (text.length <= maxLength) {
      return { text, isTruncated: false };
    }
    return { text: text.substring(0, maxLength) + '...', isTruncated: true };
  };

  const renderStars = (rating: number, size: string = "w-5 h-5") => {
    return (
      <div className="flex items-center gap-1" data-testid={`stars-rating-${rating}`}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`${size} ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'} drop-shadow-sm`}
            data-testid={`star-${i + 1}`}
          />
        ))}
      </div>
    );
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="space-y-8" data-testid="loading-skeleton">
        {/* Header Skeleton */}
        <div className="text-center space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse"></div>
        </div>
        
        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 space-y-4 border border-gray-200" data-testid={`skeleton-card-${i}`}>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error || !data?.success) {
    return (
      <div className="text-center py-16 px-4" data-testid="error-state">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" data-testid="error-icon" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Reviews</h3>
            <p className="text-gray-600 mb-6">
              We're having trouble loading our customer reviews right now. Please try again later or contact us directly.
            </p>
            <a
              href="tel:530-226-0701"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300"
              data-testid="button-call-us"
            >
              Call Us: (530) 226-0701
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  const reviewsData = data.data;
  const googleMapsUrl = "https://search.google.com/local/writereview?placeid=ChIJYQQNXbKZ0lQRcZThcV_rAAM";

  return (
    <div className="space-y-12" data-testid="google-reviews-container">
      {/* Overall Rating Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
        data-testid="reviews-header"
      >
        <div className="inline-block bg-white/90 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-xl border border-gray-200">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text mb-2" data-testid="text-overall-rating">
                {reviewsData.rating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 font-medium">out of 5.0</div>
            </div>
            
            <div className="border-l-2 border-gray-300 h-20"></div>
            
            <div className="text-left">
              {renderStars(Math.round(reviewsData.rating), "w-7 h-7")}
              <div className="text-gray-700 font-semibold mt-2" data-testid="text-review-count">
                {reviewsData.reviewCount} Reviews
              </div>
              {reviewsData.source === 'google' && (
                <div className="text-xs text-orange-600 font-medium flex items-center gap-1 mt-1" data-testid="badge-google-verified">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Google Verified
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="reviews-grid">
        {reviewsData.reviews.map((review, index) => {
          const { text: displayText, isTruncated } = truncateText(review.text);
          const isExpanded = expandedReviews.has(index);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 hover:border-orange-200 overflow-hidden"
              data-testid={`review-card-${index}`}
            >
              {/* Glassmorphism Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-orange-50/20 to-red-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Quote Icon */}
                <div className="absolute top-0 right-0">
                  <Quote className="w-8 h-8 text-yellow-500/10 group-hover:text-orange-500/15 transition-colors duration-300" />
                </div>
                
                {/* Star Rating */}
                <div className="mb-4" data-testid={`review-rating-${index}`}>
                  {renderStars(review.rating)}
                </div>
                
                {/* Review Text */}
                <p className="text-gray-800 mb-4 leading-relaxed italic" data-testid={`review-text-${index}`}>
                  "{isExpanded ? review.text : displayText}"
                </p>
                
                {/* Read More Button */}
                {isTruncated && (
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="text-orange-600 hover:text-orange-700 font-semibold text-sm mb-4 transition-colors"
                    data-testid={`button-read-more-${index}`}
                  >
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </button>
                )}
                
                {/* Reviewer Info */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-3">
                    {/* Profile Photo or Initials */}
                    {review.profile_photo ? (
                      <img
                        src={review.profile_photo}
                        alt={review.author}
                        className="w-12 h-12 rounded-full object-cover shadow-md"
                        data-testid={`img-profile-${index}`}
                      />
                    ) : (
                      <div 
                        className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                        data-testid={`img-initials-${index}`}
                      >
                        {getInitials(review.author)}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-gray-900" data-testid={`text-reviewer-name-${index}`}>
                        {review.author}
                      </h4>
                      <p className="text-sm text-gray-600" data-testid={`text-time-ago-${index}`}>
                        {formatTimeAgo(review.time)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Write a Review CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center"
        data-testid="cta-section"
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            Have You Worked With Us?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Share your experience and help others discover the Advance Power Redding difference. 
            Your feedback helps us continue delivering exceptional solar solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              data-testid="button-write-review"
            >
              <Star className="w-5 h-5" />
              Write a Review on Google
              <ExternalLink className="w-4 h-4" />
            </motion.a>
            
            <motion.a
              href="tel:530-226-0701"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-300 font-bold rounded-lg text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              data-testid="button-call-now"
            >
              Call (530) 226-0701
            </motion.a>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center" data-testid="trust-badges">
              <div>
                <div className="text-3xl font-bold text-yellow-400" data-testid="badge-years">25+</div>
                <div className="text-gray-400 text-sm">Years in Business</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-orange-400" data-testid="badge-systems">1,000+</div>
                <div className="text-gray-400 text-sm">Systems Installed</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-red-400" data-testid="badge-satisfaction">98%</div>
                <div className="text-gray-400 text-sm">Customer Satisfaction</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-orange-400" data-testid="badge-licensed">Licensed</div>
                <div className="text-gray-400 text-sm">Bonded & Insured</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GoogleReviews;
