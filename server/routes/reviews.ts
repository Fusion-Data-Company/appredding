import { Router } from "express";
import { getGoogleReviews, clearReviewsCache } from "../services/googleReviewsService";

const router = Router();

// GET /api/reviews/google - Returns Google reviews with caching
router.get("/google", async (req, res) => {
  try {
    const reviews = await getGoogleReviews();
    res.json({ 
      success: true, 
      data: reviews,
      cached: true // Indicates data may be cached up to 24 hours
    });
  } catch (error) {
    console.error('Error in /api/reviews/google endpoint:', error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch reviews. Please try again later.",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// GET /api/reviews/google/refresh - Force refresh cache (admin use)
router.get("/google/refresh", async (req, res) => {
  try {
    clearReviewsCache();
    const reviews = await getGoogleReviews();
    res.json({ 
      success: true, 
      data: reviews,
      message: "Cache cleared and reviews refreshed"
    });
  } catch (error) {
    console.error('Error refreshing reviews cache:', error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to refresh reviews",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
