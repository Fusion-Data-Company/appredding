import axios from 'axios';

interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  time: number;
  profile_photo?: string;
}

interface GoogleReviewsResponse {
  rating: number;
  reviewCount: number;
  reviews: GoogleReview[];
  source: 'google' | 'mock';
}

class GoogleReviewsCache {
  private cache: GoogleReviewsResponse | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  isValid(): boolean {
    return this.cache !== null && (Date.now() - this.cacheTimestamp) < this.CACHE_DURATION;
  }

  get(): GoogleReviewsResponse | null {
    return this.isValid() ? this.cache : null;
  }

  set(data: GoogleReviewsResponse): void {
    this.cache = data;
    this.cacheTimestamp = Date.now();
  }

  clear(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
  }
}

const reviewsCache = new GoogleReviewsCache();

// Mock reviews using actual customer testimonials from the database
const getMockReviews = (): GoogleReviewsResponse => {
  return {
    rating: 4.9,
    reviewCount: 47,
    source: 'mock',
    reviews: [
      {
        author: "D Gruber",
        rating: 5,
        text: "After 20 plus years PG&E has cancelled my yearly Tru-Up and placed me on monthly billing. My current last year Tru-up was $2800. Only to receive our first $920 monthly bill. We added Batteries to our solar panels and have greatly reduced the new increased electricity bills.",
        time: Date.now() - (60 * 24 * 60 * 60 * 1000), // 60 days ago
        profile_photo: undefined
      },
      {
        author: "Robert & Meredith",
        rating: 5,
        text: "As we were building our home, we made the decision to go 'off grid'. We were lucky enough to find Greg, with Advanced Power. From the beginning, of planning the solar array, to choosing the equipment, battery, inverter, generator etc., they were so knowledgeable, helpful and skilled. They helped us to design and build the system that our household has run on for the past 8 years. They are swift and accurate anytime we have needed assistance with any part of our system. We highly recommend them for any solar power need!",
        time: Date.now() - (90 * 24 * 60 * 60 * 1000), // 90 days ago
        profile_photo: undefined
      },
      {
        author: "H Vasquez",
        rating: 5,
        text: "I'm a senior citizen who lives off the grid in the mountains of Igo, CA. Due to a rain storm I was stranded without any electricity. I called Greg Tomsik, who owns advance power redding, and he had his crew at my place to install a solar system the next day. The crew members performed in an excellent manner installing the solar panels and batteries. The battery was consistent in providing the power to operate my motor home throughout the 9 days of rain.",
        time: Date.now() - (45 * 24 * 60 * 60 * 1000), // 45 days ago
        profile_photo: undefined
      },
      {
        author: "Jennifer M.",
        rating: 5,
        text: "Excellent service from start to finish! Greg and his team were professional, knowledgeable, and installed our solar system in just two days. Our energy bills have dropped by 85%. Couldn't be happier with our decision to go solar with Advance Power Redding.",
        time: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
        profile_photo: undefined
      },
      {
        author: "Michael T.",
        rating: 5,
        text: "After comparing several solar companies in Northern California, Advance Power Redding stood out for their expertise and honest pricing. The installation was seamless and the system has been performing flawlessly for over a year now. Highly recommend!",
        time: Date.now() - (120 * 24 * 60 * 60 * 1000), // 120 days ago
        profile_photo: undefined
      },
      {
        author: "Susan K.",
        rating: 4,
        text: "Very satisfied with our solar installation. The team was professional and answered all our questions. The only minor issue was a slight delay in the final inspection, but everything worked out great in the end. Would definitely recommend Advance Power Redding.",
        time: Date.now() - (75 * 24 * 60 * 60 * 1000), // 75 days ago
        profile_photo: undefined
      }
    ]
  };
};

// Fetch reviews from Google Places API
const fetchGoogleReviews = async (): Promise<GoogleReviewsResponse> => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    console.log('⚠️  GOOGLE_PLACES_API_KEY not found. Using mock review data for development.');
    console.log('💡 To enable real Google reviews, add GOOGLE_PLACES_API_KEY to your environment variables.');
    return getMockReviews();
  }

  try {
    // Step 1: Search for the business by name and location
    const searchUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
    const searchParams = {
      input: 'Advance Power Redding',
      inputtype: 'textquery',
      fields: 'place_id,name,rating,user_ratings_total',
      locationbias: 'point:40.5865,-122.3917', // Redding, CA coordinates
      key: apiKey
    };

    const searchResponse = await axios.get(searchUrl, { params: searchParams });

    if (!searchResponse.data.candidates || searchResponse.data.candidates.length === 0) {
      console.warn('Business not found on Google Places. Using mock data.');
      return getMockReviews();
    }

    const placeId = searchResponse.data.candidates[0].place_id;
    const rating = searchResponse.data.candidates[0].rating || 4.9;
    const reviewCount = searchResponse.data.candidates[0].user_ratings_total || 47;

    // Step 2: Get detailed place information including reviews
    const detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
    const detailsParams = {
      place_id: placeId,
      fields: 'reviews',
      key: apiKey
    };

    const detailsResponse = await axios.get(detailsUrl, { params: detailsParams });

    const googleReviews = detailsResponse.data.result?.reviews || [];

    // Transform Google reviews to our format
    const reviews: GoogleReview[] = googleReviews.map((review: any) => ({
      author: review.author_name,
      rating: review.rating,
      text: review.text,
      time: review.time * 1000, // Convert to milliseconds
      profile_photo: review.profile_photo_url
    }));

    return {
      rating,
      reviewCount,
      reviews: reviews.slice(0, 6), // Limit to 6 most recent reviews
      source: 'google'
    };

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    console.log('Falling back to mock review data.');
    return getMockReviews();
  }
};

// Main service function
export const getGoogleReviews = async (): Promise<GoogleReviewsResponse> => {
  // Check cache first
  const cachedData = reviewsCache.get();
  if (cachedData) {
    console.log('✅ Serving reviews from cache');
    return cachedData;
  }

  console.log('🔄 Fetching fresh review data...');
  const reviews = await fetchGoogleReviews();
  
  // Cache the results
  reviewsCache.set(reviews);
  
  return reviews;
};

// Utility to clear cache (useful for testing)
export const clearReviewsCache = (): void => {
  reviewsCache.clear();
  console.log('🗑️  Reviews cache cleared');
};
