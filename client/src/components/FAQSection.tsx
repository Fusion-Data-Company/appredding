import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GradientHeading } from "@/components/ui/gradient-heading";

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
    <section className="py-24 bg-primary-950" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <GradientHeading level={2} className="text-4xl mb-4" variant="mixed">Frequently Asked Questions</GradientHeading>
          <p className="text-lg text-gray-300">
            Find answers to common questions about our protective coating products and services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {faqs.map((category, idx) => (
            <div key={idx} className="bg-primary-900 rounded-xl p-6 border border-primary-800">
              <GradientHeading level={3} className="text-xl mb-6 pb-4 border-b border-primary-800" variant={idx % 3 === 0 ? "fire" : idx % 3 === 1 ? "blue" : "mixed"}>
                {category.category}
              </GradientHeading>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border-none">
                    <AccordionTrigger className="bg-primary-800 rounded-lg px-5 py-3 text-left hover:no-underline hover:bg-primary-700 transition-colors font-medium text-base">
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
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            <i className="fas fa-envelope mr-2"></i> Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;