import { db } from "./db";
import { portfolioProjects } from "@shared/schema";

const sampleProjects = [
  {
    title: "Residential Solar Installation - Modern Family Home",
    category: "residential" as const,
    location: "Redding, CA",
    date: new Date("2024-11-15"),
    systemSize: "8.5 kW",
    panelCount: 24,
    annualSavings: "$2,400",
    description: "Complete solar installation for a 2,400 sq ft family home in Redding. This system includes 24 high-efficiency solar panels, net metering setup, and battery backup integration. The homeowners are now saving an average of $200/month on their electricity bills and have achieved 90% energy independence.",
    beforeImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop"
    ],
    featured: true
  },
  {
    title: "Commercial Solar System - Local Business Center",
    category: "commercial" as const,
    location: "Anderson, CA",
    date: new Date("2024-10-20"),
    systemSize: "45 kW",
    panelCount: 120,
    annualSavings: "$12,000",
    description: "Large-scale commercial installation for a business complex in Anderson. This 45 kW system powers multiple office units and warehouse space, significantly reducing operational costs. Features include smart monitoring, peak demand management, and grid-tied configuration with net metering.",
    beforeImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
    ],
    featured: true
  },
  {
    title: "Hybrid Solar & Battery System - Ranch Property",
    category: "residential" as const,
    location: "Shasta Lake, CA",
    date: new Date("2024-09-10"),
    systemSize: "12 kW",
    panelCount: 32,
    annualSavings: "$3,200",
    description: "Off-grid capable hybrid system for a rural ranch property near Shasta Lake. Combines solar panels with lithium battery storage for complete energy independence during power outages. The system includes backup power capabilities and can run essential loads for up to 3 days without sun.",
    beforeImage: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop"
    ],
    featured: true
  },
  {
    title: "Rooftop Solar Array - Retail Store",
    category: "commercial" as const,
    location: "Palo Cedro, CA",
    date: new Date("2024-08-25"),
    systemSize: "28 kW",
    panelCount: 75,
    annualSavings: "$7,500",
    description: "Rooftop solar installation for a busy retail store in Palo Cedro. This system offset 85% of the store's energy consumption and includes real-time monitoring accessible via smartphone app. The business qualified for federal tax credits and accelerated depreciation benefits.",
    beforeImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop"
    ],
    featured: true
  },
  {
    title: "Residential Solar Installation - Historic Home",
    category: "residential" as const,
    location: "Redding, CA",
    date: new Date("2024-07-15"),
    systemSize: "6.8 kW",
    panelCount: 20,
    annualSavings: "$1,900",
    description: "Careful solar installation on a historic home requiring special attention to aesthetics and roof preservation. Low-profile mounting system maintains the home's classic appearance while providing modern energy efficiency. System includes micro-inverters for optimal performance.",
    beforeImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop"
    ],
    featured: false
  },
  {
    title: "Solar System Maintenance & Upgrade",
    category: "maintenance" as const,
    location: "Anderson, CA",
    date: new Date("2024-06-30"),
    systemSize: "10 kW",
    panelCount: 28,
    annualSavings: "$2,800",
    description: "Complete maintenance service and inverter upgrade for an existing 10 kW system. Included panel cleaning, electrical inspection, inverter replacement with latest technology, and system optimization. Customer saw a 15% improvement in energy production after service.",
    beforeImage: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop"
    ],
    featured: true
  },
  {
    title: "Commercial Solar - Manufacturing Facility",
    category: "commercial" as const,
    location: "Redding, CA",
    date: new Date("2024-05-20"),
    systemSize: "75 kW",
    panelCount: 200,
    annualSavings: "$20,000",
    description: "Large-scale industrial solar installation for a manufacturing facility. This ground-mount system provides clean energy for production operations and includes a carport structure for employee parking. The facility now meets 70% of its energy needs from solar.",
    beforeImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
    ],
    featured: true
  },
  {
    title: "Pool Solar Heating System",
    category: "residential" as const,
    location: "Shasta Lake, CA",
    date: new Date("2024-04-10"),
    systemSize: "5 kW",
    panelCount: 14,
    annualSavings: "$1,200",
    description: "Solar pool heating system combined with electric system installation. This dual-purpose system heats the pool year-round while providing electricity to the home. Customer eliminated gas pool heater costs and reduced electric bills simultaneously.",
    beforeImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
    galleryImages: [],
    featured: false
  },
  {
    title: "Mobile Home Solar Solution",
    category: "residential" as const,
    location: "Anderson, CA",
    date: new Date("2024-03-15"),
    systemSize: "4.5 kW",
    panelCount: 12,
    annualSavings: "$1,100",
    description: "Custom solar installation designed specifically for a mobile home. Special mounting system ensures proper weight distribution and weatherproofing. This affordable system helps fixed-income homeowner reduce monthly expenses significantly.",
    beforeImage: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    galleryImages: [],
    featured: false
  },
  {
    title: "Agricultural Solar Pumping System",
    category: "commercial" as const,
    location: "Palo Cedro, CA",
    date: new Date("2024-02-20"),
    systemSize: "15 kW",
    panelCount: 40,
    annualSavings: "$4,000",
    description: "Solar-powered irrigation pumping system for agricultural operation. This off-grid system eliminates diesel generator costs and provides reliable water pumping during growing season. Includes battery backup for evening watering needs.",
    beforeImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
    galleryImages: [],
    featured: false
  },
  {
    title: "Multi-Family Solar Installation",
    category: "commercial" as const,
    location: "Redding, CA",
    date: new Date("2024-01-15"),
    systemSize: "35 kW",
    panelCount: 95,
    annualSavings: "$9,500",
    description: "Community solar system for a 12-unit apartment complex. Individual tenant metering allows residents to benefit from solar savings. System includes EV charging stations for residents and reduces common area electricity costs.",
    beforeImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    galleryImages: [],
    featured: false
  },
  {
    title: "Solar System Annual Maintenance",
    category: "maintenance" as const,
    location: "Shasta Lake, CA",
    date: new Date("2023-12-10"),
    systemSize: "9 kW",
    panelCount: 25,
    annualSavings: "$2,500",
    description: "Annual maintenance service including panel cleaning, electrical testing, inverter inspection, and performance optimization. Regular maintenance ensures maximum energy production and extends system lifespan. Customer's system is now producing at 98% of original capacity after 5 years.",
    beforeImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    galleryImages: [],
    featured: false
  }
];

async function seedPortfolio() {
  try {
    console.log('🌱 Seeding portfolio projects...');
    
    for (const project of sampleProjects) {
      await db.insert(portfolioProjects).values(project);
      console.log(`✅ Created: ${project.title}`);
    }
    
    console.log('✨ Portfolio seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding portfolio:', error);
    process.exit(1);
  }
}

seedPortfolio();
