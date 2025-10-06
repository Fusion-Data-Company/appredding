import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Zap, DollarSign, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { PortfolioProject } from "@shared/schema";
import SEOHead from "@/components/SEOHead";
import rooftopInstallation from '@assets/360-rooftop-pool-im-sommer.jpg';
import projectInstallation from '@assets/491844865_1271014964874224_7004732250107002194_n.jpg';
import solarArrayImage from '@assets/andreas-gucklhorn-Ilpf2eUPpUE-unsplash-500x375.jpg';
import teamWithPanel from '@assets/Greg-with-panel.jpg';

type CategoryFilter = "all" | "residential" | "commercial" | "maintenance";

export default function Portfolio() {
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Solar Installation Portfolio",
    "description": "1,000+ successful solar installations across Northern California. View our residential, commercial, and maintenance projects.",
    "provider": {
      "@type": "Organization",
      "name": "Advance Power Redding"
    }
  };
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);

  const { data, isLoading } = useQuery<{ success: boolean; projects: PortfolioProject[] }>({
    queryKey: ['/api/portfolio/projects', activeCategory],
    queryFn: async () => {
      const params = activeCategory !== 'all' ? `?category=${activeCategory}` : '';
      const response = await fetch(`/api/portfolio/projects${params}`);
      return response.json();
    }
  });

  const projects = data?.projects || [];
  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const nextGalleryImage = () => {
    if (selectedProject && selectedProject.galleryImages.length > 0) {
      setGalleryIndex((prev) => (prev + 1) % selectedProject.galleryImages.length);
    }
  };

  const prevGalleryImage = () => {
    if (selectedProject && selectedProject.galleryImages.length > 0) {
      setGalleryIndex((prev) => (prev - 1 + selectedProject.galleryImages.length) % selectedProject.galleryImages.length);
    }
  };

  return (
    <MainLayout>
      <SEOHead
        title="Solar Portfolio | 1,000+ Installations | APR Redding"
        description="View 1,000+ solar success stories: residential, commercial & maintenance projects across Northern CA. 25+ years experience. Real results from customers."
        keywords={['solar portfolio', 'solar installation examples', 'Northern California solar projects', 'residential solar portfolio', 'commercial solar projects', 'solar gallery Redding']}
        url="/portfolio"
        type="website"
        structuredData={portfolioSchema}
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Our Solar Success Stories
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                1,000+ Systems Installed Across Northern California
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-12">
                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-semibold">25+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Licensed & Insured</Badge>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="font-semibold">$50M+ in Energy Savings</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Portfolio Image - Rooftop Installation */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={rooftopInstallation}
              alt="Completed rooftop solar installation with pool area"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-portfolio-1"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {(['all', 'residential', 'commercial', 'maintenance'] as const).map((category) => (
              <Button
                key={category}
                data-testid={`filter-${category}`}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(12);
                }}
                variant={activeCategory === category ? "default" : "outline"}
                className={`capitalize transition-all duration-300 ${
                  activeCategory === category 
                    ? "shadow-lg shadow-primary/20" 
                    : "hover:bg-primary/10"
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
              </Button>
            ))}
          </div>
        </section>

        {/* Featured Portfolio Image - Solar Array */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={solarArrayImage}
              alt="Professional commercial solar array installation"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-portfolio-2"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <section className="container mx-auto px-4 pb-20">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No projects found in this category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    data-testid={`project-card-${project.id}`}
                    className="group relative rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Before/After Image Preview */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.afterImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      {project.featured && (
                        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold line-clamp-2">{project.title}</h3>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="gap-1">
                          <Zap className="w-3 h-3" />
                          {project.systemSize}
                        </Badge>
                        <Badge variant="secondary">
                          {project.panelCount} Panels
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(project.date)}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Annual Savings</p>
                            <p className="text-lg font-bold text-primary">{project.annualSavings}</p>
                          </div>
                          <Button
                            data-testid={`view-details-${project.id}`}
                            onClick={() => {
                              setSelectedProject(project);
                              setGalleryIndex(0);
                              setBeforeAfterSlider(50);
                            }}
                            size="sm"
                            className="gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <Button
                    data-testid="load-more-button"
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    size="lg"
                    variant="outline"
                    className="gap-2"
                  >
                    Load More Projects
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Featured Portfolio Image - Project Installation */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={projectInstallation}
              alt="Successful residential solar installation project in progress"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-portfolio-3"
            />
          </div>
        </div>

        {/* Featured Portfolio Image - Team with Panel */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={teamWithPanel}
              alt="APR team with completed solar installation project"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-portfolio-4"
            />
          </div>
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
              data-testid="project-modal"
            >
              <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto bg-card rounded-2xl shadow-2xl overflow-hidden">
                  {/* Modal Header */}
                  <div className="p-6 border-b flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {selectedProject.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(selectedProject.date)}
                        </span>
                      </div>
                    </div>
                    <Button
                      data-testid="close-modal"
                      onClick={() => setSelectedProject(null)}
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Before/After Comparison */}
                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Before & After</h3>
                      <div className="relative h-96 rounded-lg overflow-hidden">
                        <img
                          src={selectedProject.beforeImage}
                          alt="Before"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ clipPath: `inset(0 ${100 - beforeAfterSlider}% 0 0)` }}
                        >
                          <img
                            src={selectedProject.afterImage}
                            alt="After"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                          style={{ left: `${beforeAfterSlider}%` }}
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                            <div className="flex gap-1">
                              <ChevronLeft className="w-3 h-3" />
                              <ChevronRight className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={beforeAfterSlider}
                          onChange={(e) => setBeforeAfterSlider(Number(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                        />
                        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                          Before
                        </div>
                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                          After
                        </div>
                      </div>
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-sm text-muted-foreground mb-1">System Size</p>
                        <p className="text-2xl font-bold text-primary">{selectedProject.systemSize}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Panel Count</p>
                        <p className="text-2xl font-bold text-primary">{selectedProject.panelCount}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Annual Savings</p>
                        <p className="text-2xl font-bold text-primary">{selectedProject.annualSavings}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Category</p>
                        <p className="text-2xl font-bold text-primary capitalize">{selectedProject.category}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Project Details</h3>
                      <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>
                    </div>

                    {/* Gallery */}
                    {selectedProject.galleryImages.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Gallery</h3>
                        <div className="relative">
                          <img
                            src={selectedProject.galleryImages[galleryIndex]}
                            alt={`Gallery ${galleryIndex + 1}`}
                            className="w-full h-96 object-cover rounded-lg"
                          />
                          {selectedProject.galleryImages.length > 1 && (
                            <>
                              <Button
                                onClick={prevGalleryImage}
                                variant="secondary"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </Button>
                              <Button
                                onClick={nextGalleryImage}
                                variant="secondary"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </Button>
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                                {galleryIndex + 1} / {selectedProject.galleryImages.length}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
