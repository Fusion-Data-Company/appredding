import express from 'express';
import axios from 'axios';
import { z } from 'zod';

const router = express.Router();

// Schema for validating Google API responses
const GoogleReviewSchema = z.object({
  author_name: z.string(),
  rating: z.number(),
  text: z.string(),
  time: z.number(),
  profile_photo_url: z.string().optional(),
});

const GoogleReviewsResponseSchema = z.object({
  result: z.object({
    reviews: z.array(GoogleReviewSchema),
    rating: z.number(),
    user_ratings_total: z.number(),
    name: z.string(),
  }),
});

type GoogleReview = z.infer<typeof GoogleReviewSchema>;
type GoogleReviewsResponse = z.infer<typeof GoogleReviewsResponseSchema>;

// Google Places API endpoint
router.get('/', async (req, res) => {
  try {
    if (!process.env.GOOGLE_PLACES_API_KEY) {
      return res.status(500).json({ 
        error: 'Google Places API key not configured',
        message: 'The Google Places API key is missing. Please contact the administrator.'
      });
    }

    if (!process.env.GOOGLE_PLACE_ID) {
      return res.status(500).json({ 
        error: 'Google Place ID not configured',
        message: 'The Google Place ID is missing. Please contact the administrator.'
      });
    }

    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    // Fetch details with reviews from Google Places API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`
    );

    // Validate response with Zod schema
    const parseResult = GoogleReviewsResponseSchema.safeParse(response.data);
    
    if (!parseResult.success) {
      
      return res.status(500).json({ 
        error: 'Invalid API response',
        message: 'The Google API returned an unexpected response format.'
      });
    }

    const data = parseResult.data;
    
    // Process and return only what we need
    const processedReviews = data.result.reviews.map(review => ({
      author: review.author_name,
      rating: review.rating,
      text: review.text,
      date: new Date(review.time * 1000).toISOString(),
      profilePhoto: review.profile_photo_url || null
    }));

    res.json({
      businessName: data.result.name,
      averageRating: data.result.rating,
      totalRatings: data.result.user_ratings_total,
      reviews: processedReviews
    });
  } catch (error) {
    
    res.status(500).json({ 
      error: 'Failed to fetch reviews',
      message: 'An error occurred while fetching reviews from Google. Please try again later.'
    });
  }
});

export default router;