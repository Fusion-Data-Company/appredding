import { GradientHeading } from "@/components/ui/gradient-heading";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  price: string;
  description: string;
}

const ProductCard = ({ imageSrc, title, price, description }: ProductCardProps) => {
  return (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden hover:transform hover:-translate-y-1 transition-transform">
      <div className="h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/product-placeholder.jpg';
          }}
        />
      </div>
      <div className="p-6">
        <GradientHeading level={3} className="text-xl mb-2" variant={title.includes("Fire") ? "fire" : title.includes("Marine") || title.includes("Aqua") ? "blue" : "mixed"}>{title}</GradientHeading>
        <div className="text-[#0070f3] font-bold mb-4">
          {price} <span className="text-[#a0a0a0] font-normal">/ gallon</span>
        </div>
        <p className="text-[#a0a0a0] mb-6">{description}</p>
        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <button
              onClick={() => window.open('/contact', '_blank')}
              className="inline-block px-3 py-1 border border-[#333333] rounded-md text-sm hover:bg-white/5 transition-colors"
            >
              Gallon
            </button>
            <button
              onClick={() => window.open('/contact', '_blank')}
              className="inline-block px-3 py-1 border border-[#333333] rounded-md text-sm hover:bg-white/5 transition-colors"
            >
              5-Gallon
            </button>
            <button
              onClick={() => window.open('/contact', '_blank')}
              className="inline-block px-3 py-1 border border-[#333333] rounded-md text-sm hover:bg-white/5 transition-colors"
            >
              Pallet
            </button>
          </div>
          <button
            onClick={() => window.open('/about', '_blank')}
            className="text-[#0070f3] hover:text-blue-400 transition-colors"
            title="More Information"
          >
            <i className="fas fa-info-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const products = [
    {
      imageSrc: "/images/fire-coating-product.jpg",
      title: "FireGuard Pro",
      price: "$189.99",
      description: "Class-A fire retardant coating with intumescent technology for wildfire protection."
    },
    {
      imageSrc: "/images/marine-coating-product.jpg",
      title: "MarineShield Ultra",
      price: "$229.99",
      description: "Premium marine-grade coating with anti-fouling and UV protection properties."
    },
    {
      imageSrc: "/images/pool-coating-product.jpg",
      title: "AquaGuard Pool Finish",
      price: "$159.99",
      description: "Chemical-resistant pool coating for long-lasting protection and appearance."
    }
  ];

  return (
    <section className="py-20 bg-[#121212]" id="products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="fire">Our Product Line</GradientHeading>
          <p className="text-[#a0a0a0] max-w-2xl mx-auto">
            Choose from our range of professional-grade protective coatings available in various sizes to meet your project needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              imageSrc={product.imageSrc}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={() => window.open('/contact', '_blank')}
            className="bg-transparent border border-[#0070f3] text-[#0070f3] hover:bg-[#0070f3]/10 font-medium py-3 px-6 rounded-lg transition-colors inline-block"
          >
            View Full Product Catalog
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
