import React from 'react';
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

// Fixed FAQ section component with proper display of accordion items and styling
const FAQSection: React.FC<FAQProps> = ({ faqs }) => {
  return (
    <section 
      className="py-24 relative overflow-hidden" 
      id="faq"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,69,0,0.25)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">
              Frequently Asked Questions
            </GradientHeading>
            <p className="text-[#a0a0a0] max-w-2xl mx-auto">
              Find answers to common questions about our protective coating products and services.
            </p>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {faqs.map((category, categoryIdx) => (
            <div key={categoryIdx} className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-xl p-6 border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,69,0,0.25)]">
              <GradientHeading 
                level={3} 
                className="text-xl mb-6 pb-4 border-b border-gray-600/40" 
                variant={categoryIdx % 3 === 0 ? "fire" : categoryIdx % 3 === 1 ? "blue" : "mixed"}
              >
                {category.category}
              </GradientHeading>
              
              {/* FAQ Items */}
              <div className="space-y-4">
                {category.questions.map((faq, faqIdx) => (
                  <div key={faqIdx} className="relative mb-4">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-lg blur-sm opacity-60"></div>
                    <Accordion type="single" collapsible>
                      <AccordionItem value={`faq-${categoryIdx}-${faqIdx}`} className="border-none relative z-10">
                        <AccordionTrigger className="bg-gray-800/70 backdrop-blur-sm rounded-lg px-5 py-3 text-left hover:no-underline hover:bg-gray-700/80 transition-colors font-medium text-base border border-amber-500/30">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pt-4 pb-2 text-gray-300 mt-1 bg-gray-800/50 backdrop-blur-sm rounded-b-lg">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="mb-5 text-gray-300">Still have questions? We're here to help.</p>
          <GradientButton href="#contact" className="inline-flex items-center gap-2" size="lg">
            Contact Support
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;