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
        backgroundPosition: "center", 
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
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border border-gray-600/40 shadow-[0_0_20px_rgba(255,255,255,0.2)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Frequently Asked Questions</GradientHeading>
            <p className="text-[#a0a0a0] max-w-2xl mx-auto">
              Find answers to common questions about our protective coating products and services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {faqs.map((category, idx) => (
            <div key={idx} className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 rounded-xl p-6 border border-gray-600/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <GradientHeading level={3} className="text-xl mb-6 pb-4 border-b border-gray-600/40" variant={idx % 3 === 0 ? "fire" : idx % 3 === 1 ? "blue" : "mixed"}>
                {category.category}
              </GradientHeading>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border-none">
                    <AccordionTrigger className="bg-gray-800/60 rounded-lg px-5 py-3 text-left hover:no-underline hover:bg-gray-700/70 transition-colors font-medium text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pt-4 pb-2 text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="mb-5 text-gray-300">Still have questions? We're here to help.</p>
          <GradientButton href="#contact" className="inline-flex items-center gap-2" size="lg">
            <i className="fas fa-envelope"></i> Contact Support
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;