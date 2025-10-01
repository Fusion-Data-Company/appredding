import { db } from "./db";
import { products, productCategories } from "@shared/schema";

async function seedProducts() {
  console.log("Seeding product categories...");
  
  // Seed product categories
  const categories = [
    {
      slug: "solar-panels",
      name: "Solar Panels",
      description: "High-efficiency solar panels from leading manufacturers",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      displayOrder: 1
    },
    {
      slug: "inverters",
      name: "Inverters",
      description: "String inverters and microinverters for optimal energy conversion",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      displayOrder: 2
    },
    {
      slug: "batteries",
      name: "Battery Storage",
      description: "Store your solar energy for use anytime",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      displayOrder: 3
    },
    {
      slug: "mounting",
      name: "Mounting Systems",
      description: "Secure mounting solutions for all roof types",
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
      displayOrder: 4
    },
    {
      slug: "monitoring",
      name: "Monitoring Equipment",
      description: "Track and optimize your solar energy production",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      displayOrder: 5
    },
    {
      slug: "installation-services",
      name: "Installation Services",
      description: "Professional solar installation services",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
      displayOrder: 6
    },
    {
      slug: "maintenance-packages",
      name: "Maintenance Packages",
      description: "Keep your solar system running at peak performance",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      displayOrder: 7
    }
  ];

  await db.insert(productCategories).values(categories).onConflictDoNothing();
  
  console.log("Seeding products...");

  // Solar Panels (6 products)
  const solarPanels = [
    {
      sku: "SP-SUN-450",
      name: "SunPower Maxeon 3 450W",
      category: "solar-panels" as const,
      brand: "SunPower",
      price: "349.99",
      compareAtPrice: "399.99",
      description: "Premium solar panel with industry-leading 22.7% efficiency. Perfect for residential installations with limited roof space.",
      specifications: {
        power: "450W",
        efficiency: "22.7%",
        dimensions: "67.5 x 41.2 x 1.8 inches",
        weight: "46.4 lbs",
        warranty: "25 years",
        cellType: "Monocrystalline",
        temperature_coefficient: "-0.29%/°C"
      },
      images: [
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 50,
      featured: true,
      rating: "4.8",
      reviewCount: 127,
      tags: ["residential", "high-efficiency", "premium", "monocrystalline"]
    },
    {
      sku: "SP-LG-405",
      name: "LG NeON R 405W",
      category: "solar-panels" as const,
      brand: "LG",
      price: "299.99",
      description: "High-performance solar panel with excellent temperature coefficient for hot climates.",
      specifications: {
        power: "405W",
        efficiency: "21.7%",
        dimensions: "66.9 x 40.0 x 1.6 inches",
        weight: "39.7 lbs",
        warranty: "25 years",
        cellType: "Monocrystalline",
        temperature_coefficient: "-0.32%/°C"
      },
      images: [
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 75,
      featured: true,
      rating: "4.7",
      reviewCount: 94,
      tags: ["residential", "high-efficiency", "hot-climate"]
    },
    {
      sku: "SP-PAN-410",
      name: "Panasonic EverVolt 410W",
      category: "solar-panels" as const,
      brand: "Panasonic",
      price: "319.99",
      description: "Reliable solar panel with excellent performance in low-light conditions.",
      specifications: {
        power: "410W",
        efficiency: "21.2%",
        dimensions: "68.9 x 40.4 x 1.4 inches",
        weight: "44.1 lbs",
        warranty: "25 years",
        cellType: "Monocrystalline HIT",
        temperature_coefficient: "-0.26%/°C"
      },
      images: [
        "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 60,
      featured: false,
      rating: "4.6",
      reviewCount: 82,
      tags: ["residential", "low-light", "reliable"]
    },
    {
      sku: "SP-REC-400",
      name: "REC Alpha Pure 400W",
      category: "solar-panels" as const,
      brand: "REC",
      price: "289.99",
      compareAtPrice: "319.99",
      description: "High-efficiency panel with industry-leading warranty and durability.",
      specifications: {
        power: "400W",
        efficiency: "21.7%",
        dimensions: "67.5 x 39.4 x 1.2 inches",
        weight: "42.3 lbs",
        warranty: "25 years product, 25 years performance",
        cellType: "Monocrystalline heterojunction",
        temperature_coefficient: "-0.26%/°C"
      },
      images: [
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 90,
      featured: false,
      rating: "4.7",
      reviewCount: 68,
      tags: ["residential", "warranty", "durable"]
    },
    {
      sku: "SP-QC-385",
      name: "Q CELLS Q.PEAK DUO BLK-G10+ 385W",
      category: "solar-panels" as const,
      brand: "Q Cells",
      price: "249.99",
      description: "Cost-effective solar panel with solid performance and all-black aesthetic.",
      specifications: {
        power: "385W",
        efficiency: "20.6%",
        dimensions: "67.6 x 39.8 x 1.3 inches",
        weight: "41.9 lbs",
        warranty: "25 years",
        cellType: "Monocrystalline",
        temperature_coefficient: "-0.34%/°C"
      },
      images: [
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 120,
      featured: false,
      rating: "4.5",
      reviewCount: 156,
      tags: ["residential", "budget-friendly", "all-black"]
    },
    {
      sku: "SP-REC-430",
      name: "REC Alpha Pure-R 430W",
      category: "solar-panels" as const,
      brand: "REC",
      price: "339.99",
      description: "Premium high-power panel designed for maximum energy production.",
      specifications: {
        power: "430W",
        efficiency: "22.3%",
        dimensions: "67.5 x 39.4 x 1.2 inches",
        weight: "43.2 lbs",
        warranty: "25 years",
        cellType: "Monocrystalline heterojunction",
        temperature_coefficient: "-0.24%/°C"
      },
      images: [
        "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 45,
      featured: true,
      rating: "4.9",
      reviewCount: 43,
      tags: ["residential", "commercial", "high-power"]
    }
  ];

  // Inverters (4 products)
  const inverters = [
    {
      sku: "INV-ENP-IQ8M",
      name: "Enphase IQ8M Microinverter",
      category: "inverters" as const,
      brand: "Enphase",
      price: "189.99",
      description: "Advanced microinverter with grid-forming technology and sunlight backup capability.",
      specifications: {
        power_output: "330W AC",
        max_dc_input: "500W",
        efficiency: "97.0%",
        warranty: "25 years",
        type: "Microinverter",
        features: ["Sunlight Backup", "Rapid Shutdown", "Smart Grid Ready"]
      },
      images: [
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 200,
      featured: true,
      rating: "4.8",
      reviewCount: 215,
      tags: ["microinverter", "residential", "backup-capable"]
    },
    {
      sku: "INV-SE-HD7.6",
      name: "SolarEdge HD-Wave SE7600H-US",
      category: "inverters" as const,
      brand: "SolarEdge",
      price: "1899.99",
      compareAtPrice: "2199.99",
      description: "High-efficiency string inverter with HD-Wave technology and built-in safety features.",
      specifications: {
        power_output: "7.6 kW AC",
        max_dc_input: "12,000W",
        efficiency: "99.0%",
        warranty: "12 years standard, extendable to 25",
        type: "String Inverter",
        features: ["HD-Wave Technology", "Built-in Arc Fault Protection", "Rapid Shutdown"]
      },
      images: [
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 35,
      featured: true,
      rating: "4.7",
      reviewCount: 89,
      tags: ["string-inverter", "residential", "high-efficiency"]
    },
    {
      sku: "INV-FRO-8.2",
      name: "Fronius Primo 8.2 US",
      category: "inverters" as const,
      brand: "Fronius",
      price: "2299.99",
      description: "Premium string inverter with SnapINverter technology for quick installation.",
      specifications: {
        power_output: "8.2 kW AC",
        max_dc_input: "12,300W",
        efficiency: "98.1%",
        warranty: "10 years standard, extendable to 20",
        type: "String Inverter",
        features: ["SnapINverter", "Dynamic Peak Manager", "Integrated Data Communication"]
      },
      images: [
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 25,
      featured: false,
      rating: "4.6",
      reviewCount: 54,
      tags: ["string-inverter", "residential", "commercial"]
    },
    {
      sku: "INV-ENP-IQ8+",
      name: "Enphase IQ8+ Microinverter",
      category: "inverters" as const,
      brand: "Enphase",
      price: "219.99",
      description: "Higher power microinverter for larger solar panels with sunlight backup.",
      specifications: {
        power_output: "384W AC",
        max_dc_input: "560W",
        efficiency: "97.0%",
        warranty: "25 years",
        type: "Microinverter",
        features: ["Sunlight Backup", "Rapid Shutdown", "Smart Grid Ready", "Burst Mode"]
      },
      images: [
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 180,
      featured: false,
      rating: "4.8",
      reviewCount: 167,
      tags: ["microinverter", "residential", "high-power"]
    }
  ];

  // Battery Storage (4 products)
  const batteries = [
    {
      sku: "BAT-TES-PW2",
      name: "Tesla Powerwall 2",
      category: "batteries" as const,
      brand: "Tesla",
      price: "11499.99",
      description: "Industry-leading home battery system with integrated inverter and seamless app control.",
      specifications: {
        capacity: "13.5 kWh",
        power_output: "5 kW continuous, 7 kW peak",
        efficiency: "90% round-trip",
        warranty: "10 years",
        dimensions: "45.3 x 29.6 x 5.75 inches",
        weight: "251.3 lbs",
        features: ["Integrated Inverter", "Stackable", "App Control", "Backup Gateway"]
      },
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 15,
      featured: true,
      rating: "4.7",
      reviewCount: 342,
      tags: ["residential", "backup", "premium"]
    },
    {
      sku: "BAT-LG-RESU10H",
      name: "LG Chem RESU10H Prime",
      category: "batteries" as const,
      brand: "LG",
      price: "8999.99",
      compareAtPrice: "9999.99",
      description: "High-voltage battery with excellent performance and compatibility with major inverters.",
      specifications: {
        capacity: "9.6 kWh usable",
        voltage: "400V",
        efficiency: "95% round-trip",
        warranty: "10 years",
        dimensions: "30.3 x 18.7 x 10.4 inches",
        weight: "213 lbs",
        features: ["High Voltage", "Compact Design", "Wide Compatibility"]
      },
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 22,
      featured: true,
      rating: "4.6",
      reviewCount: 128,
      tags: ["residential", "high-voltage", "compact"]
    },
    {
      sku: "BAT-ENP-IQ10",
      name: "Enphase IQ Battery 10",
      category: "batteries" as const,
      brand: "Enphase",
      price: "9499.99",
      description: "Modular battery system that integrates seamlessly with Enphase microinverters.",
      specifications: {
        capacity: "10.08 kWh usable",
        power_output: "3.84 kW continuous",
        efficiency: "96% round-trip",
        warranty: "10 years",
        dimensions: "26.8 x 16.5 x 7.9 inches",
        weight: "195 lbs",
        features: ["Modular Design", "AC Coupled", "Enphase App", "Easy Expansion"]
      },
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 18,
      featured: false,
      rating: "4.7",
      reviewCount: 94,
      tags: ["residential", "modular", "enphase-ecosystem"]
    },
    {
      sku: "BAT-SE-BAT10K",
      name: "SolarEdge Energy Bank 10",
      category: "batteries" as const,
      brand: "SolarEdge",
      price: "10299.99",
      description: "High-performance battery designed to work with SolarEdge inverters for maximum efficiency.",
      specifications: {
        capacity: "9.7 kWh usable",
        power_output: "5 kW continuous",
        efficiency: "94.5% round-trip",
        warranty: "10 years",
        dimensions: "29.8 x 22.6 x 6.1 inches",
        weight: "246 lbs",
        features: ["DC Coupled", "SolarEdge Ecosystem", "Backup Ready", "Scalable"]
      },
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"
      ],
      inStock: true,
      stockQuantity: 12,
      featured: false,
      rating: "4.5",
      reviewCount: 67,
      tags: ["residential", "dc-coupled", "solaredge-ecosystem"]
    }
  ];

  // Installation Services (3 packages)
  const installationServices = [
    {
      sku: "SRV-INST-RES-STD",
      name: "Residential Solar Installation - Standard",
      category: "installation-services" as const,
      brand: "Advance Power of Redding",
      price: "10000.00",
      description: "Complete residential solar installation for systems up to 8kW. Includes design, permitting, installation, and inspection.",
      specifications: {
        system_size: "Up to 8kW",
        included: [
          "Site assessment and system design",
          "All permits and documentation",
          "Professional installation",
          "Electrical inspection",
          "Grid interconnection",
          "System monitoring setup",
          "2-year workmanship warranty"
        ],
        timeline: "4-8 weeks from contract",
        service_area: "Northern California"
      },
      images: [
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
      ],
      inStock: true,
      featured: true,
      rating: "4.9",
      reviewCount: 234,
      tags: ["residential", "installation", "standard"]
    },
    {
      sku: "SRV-INST-RES-PREM",
      name: "Residential Solar Installation - Premium",
      category: "installation-services" as const,
      brand: "Advance Power of Redding",
      price: "20000.00",
      compareAtPrice: "22000.00",
      description: "Premium residential solar installation for larger systems with battery backup. Includes expedited service and extended warranty.",
      specifications: {
        system_size: "8kW - 15kW with battery storage",
        included: [
          "Comprehensive energy audit",
          "Advanced system design with 3D modeling",
          "Expedited permitting",
          "Premium installation with aesthetic optimization",
          "Battery backup integration",
          "Smart home integration",
          "Advanced monitoring system",
          "5-year workmanship warranty",
          "Priority service"
        ],
        timeline: "3-6 weeks from contract",
        service_area: "Northern California"
      },
      images: [
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
      ],
      inStock: true,
      featured: true,
      rating: "4.9",
      reviewCount: 156,
      tags: ["residential", "installation", "premium", "battery"]
    },
    {
      sku: "SRV-INST-COM",
      name: "Commercial Solar Installation",
      category: "installation-services" as const,
      brand: "Advance Power of Redding",
      price: "50000.00",
      description: "Custom commercial solar installation for businesses. Pricing varies based on system size and complexity.",
      specifications: {
        system_size: "15kW and up",
        included: [
          "Commercial energy assessment",
          "ROI analysis and financial modeling",
          "Engineering and structural analysis",
          "Commercial permitting and compliance",
          "Professional installation by certified team",
          "Performance monitoring system",
          "Ongoing maintenance options",
          "5-year workmanship warranty",
          "Tax incentive assistance"
        ],
        timeline: "6-12 weeks from contract",
        service_area: "Northern California"
      },
      images: [
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
      ],
      inStock: true,
      featured: false,
      rating: "4.8",
      reviewCount: 87,
      tags: ["commercial", "installation", "custom"]
    }
  ];

  // Maintenance Packages (2 products)
  const maintenancePackages = [
    {
      sku: "SRV-MAINT-ANNUAL",
      name: "Annual Solar Maintenance Plan",
      category: "maintenance-packages" as const,
      brand: "Advance Power of Redding",
      price: "499.99",
      description: "Annual maintenance plan to keep your solar system running at peak efficiency.",
      specifications: {
        duration: "12 months",
        included: [
          "Annual system inspection",
          "Panel cleaning (one time per year)",
          "Performance analysis and reporting",
          "Inverter diagnostics",
          "Connection and wiring check",
          "Monitoring system verification",
          "Priority service for repairs",
          "10% discount on parts"
        ],
        service_area: "Northern California",
        response_time: "48 hours"
      },
      images: [
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80"
      ],
      inStock: true,
      featured: false,
      rating: "4.7",
      reviewCount: 312,
      tags: ["maintenance", "annual", "residential"]
    },
    {
      sku: "SRV-MAINT-5YR",
      name: "Comprehensive 5-Year Maintenance Plan",
      category: "maintenance-packages" as const,
      brand: "Advance Power of Redding",
      price: "1999.99",
      compareAtPrice: "2499.99",
      description: "Comprehensive 5-year maintenance plan with bi-annual service and extended coverage.",
      specifications: {
        duration: "60 months",
        included: [
          "Bi-annual system inspections",
          "Panel cleaning (twice per year)",
          "Quarterly performance reports",
          "Complete system diagnostics",
          "Inverter and battery health monitoring",
          "Priority emergency service",
          "Parts coverage up to $2,500",
          "20% discount on additional parts",
          "Transferable to new homeowner"
        ],
        service_area: "Northern California",
        response_time: "24 hours"
      },
      images: [
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80"
      ],
      inStock: true,
      featured: true,
      rating: "4.9",
      reviewCount: 189,
      tags: ["maintenance", "multi-year", "residential", "premium"]
    }
  ];

  // Insert all products
  const allProducts = [
    ...solarPanels,
    ...inverters,
    ...batteries,
    ...installationServices,
    ...maintenancePackages
  ];

  for (const product of allProducts) {
    await db.insert(products).values(product).onConflictDoNothing();
  }

  console.log(`Seeded ${allProducts.length} products successfully!`);
}

// Run the seed function
seedProducts()
  .then(() => {
    console.log("Product seeding completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding products:", error);
    process.exit(1);
  });
