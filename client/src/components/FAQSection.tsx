import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { GradientButton } from "@/components/ui/gradient-button";
import backgroundImg from "../assets_dir/images/optimized/praetorian-background-new.png";

interface FAQProps {
  faqs: {
    category: string;
    questions: {
      question: string;
      answer: string;
    }[];
  }[];
}

const FAQSection = ({ faqs }: FAQProps) => {
  return (
    <section 
      className="py-24 relative" 
      id="faq"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center", // Standardized position
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        position: "relative", // ensure position is relative for z-index to work
        zIndex: 0 // base z-index
      }}
    >
      {/* Semi-transparent overlay for better readability with darkened effect for the buckets image */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,255,255,0.25)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Frequently Asked Questions</GradientHeading>
            <p className="text-[#a0a0a0] max-w-2xl mx-auto">
              Find answers to common questions about our protective coating products and services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {faqs && faqs.length > 0 ? faqs.map((category, categoryIdx) => (
            <div key={categoryIdx} className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-xl p-6 border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,255,255,0.25)]">
              <GradientHeading level={3} className="text-xl mb-6 pb-4 border-b border-gray-600/40" variant={categoryIdx % 3 === 0 ? "fire" : categoryIdx % 3 === 1 ? "blue" : "mixed"}>
                {category.category}
              </GradientHeading>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions && category.questions.map((faq, faqIdx) => (
                  <AccordionItem key={`faq-${categoryIdx}-${faqIdx}`} value={`item-${categoryIdx}-${faqIdx}`} className="border-none">
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-lg blur-sm opacity-60 z-0"></div>
                      <AccordionTrigger className="bg-gray-800/90 backdrop-blur-md rounded-lg px-5 py-3 text-left hover:no-underline hover:bg-gray-700/90 transition-colors font-medium text-base relative z-10 border border-amber-500/50">
                        {faq.question}
                      </AccordionTrigger>
                    </div>
                    <AccordionContent className="px-5 pt-4 pb-2 text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )) : (
            <div className="col-span-3 text-center">
              <p className="text-lg text-gray-400">Loading FAQ content...</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <p className="mb-5 text-gray-300">Still have questions? We're here to help.</p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-orange-900/30 hover:shadow-xl hover:shadow-orange-900/40 hover:translate-y-[-2px]">
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;