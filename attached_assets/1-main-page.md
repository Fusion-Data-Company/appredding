Set up the frontend according to the following prompt:
  <frontend-prompt>
  Create detailed components with these requirements:
  1. Use 'use client' directive for client-side components
  2. Make sure to concatenate strings correctly using backslash
  3. Style with Tailwind CSS utility classes for responsive design
  4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
  5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
  6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
  7. Create root layout.tsx page that wraps necessary navigation items to all pages
  8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
  9. Accurately implement necessary grid layouts
  10. Follow proper import practices:
     - Use @/ path aliases
     - Keep component imports organized
     - Update current src/app/page.tsx with new comprehensive code
     - Don't forget root route (page.tsx) handling
     - You MUST complete the entire prompt before stopping
  </frontend-prompt>

  <summary_title>
Modern Real Estate Property Search & Listing Platform
</summary_title>

<image_analysis>
1. Navigation Elements:
- Primary navigation: BUY, PROGRAMS, NEWS, SEARCH, CONTACT, INSTANT HOME VALUE, SELL, INSTANT OFFER, Search By Map
- Logo positioned top-left: "Josh Barker Real Estate"
- Secondary navigation includes Login/Register and Blog
- Language selector in top-right
- Navigation height: approximately 60px
- Clean white background with dark text

2. Layout Components:
- Hero section: Full-width banner (100vw x 500px)
- Search bar container: 800px width, centered
- Property listings grid: 3-column layout
- Action buttons: "SELL YOUR HOME", "MAP SEARCH", "INSTANT CASH OFFER"
- Responsive container max-width: 1200px

3. Content Sections:
- Hero message: "Explore ALL your options before selling your home"
- Property count indicator: "724 listings available"
- Search filters: Location/ZIP input, Min/Max Price
- Featured listings carousel
- Category tabs: FEATURED LISTINGS, NEWEST LISTINGS, SINGLE FAMILY, CONDOS & TOWNHOMES, LUXURY HOMES

4. Interactive Controls:
- Primary search button: "SEARCH HOMES" (red background)
- Price range inputs
- Location search field
- "CHECK INSTANTLY FOR FREE!" CTA button
- Property listing cards with hover states

5. Colors:
- Primary Red: #E31837
- Navigation Background: #FFFFFF
- Text Dark: #333333
- Secondary Gray: #666666
- Button Hover: #CC1630

6. Grid/Layout Structure:
- Main container: 1200px max-width
- Grid gap: 24px
- Property cards: 380px width
- Responsive breakpoints at 1200px, 992px, 768px
</image_analysis>

<development_planning>
1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Header
│   │   ├── Navigation
│   │   ├── SearchBar
│   │   └── PropertyGrid
│   ├── features/
│   │   ├── PropertySearch
│   │   ├── InstantOffer
│   │   └── PropertyListing
│   └── shared/
├── assets/
├── styles/
├── hooks/
└── utils/
```

2. Key Features:
- Advanced property search
- Instant home valuation
- Property listing management
- User authentication
- Map integration
- Filtering system

3. State Management:
```typescript
interface AppState {
  properties: {
    listings: Property[]
    filters: SearchFilters
    pagination: PaginationState
  }
  search: {
    location: string
    priceRange: PriceRange
    propertyType: string[]
  }
  user: {
    isAuthenticated: boolean
    preferences: UserPreferences
  }
}
```

4. Component Architecture:
- PropertyCard
- SearchFilters
- NavigationBar
- PropertyGrid
- HomeValuation
- MapView

5. Responsive Breakpoints:
```scss
$breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 992px,
  'wide': 1200px
);
```
</development_planning>