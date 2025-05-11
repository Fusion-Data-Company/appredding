import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[id as keyof FormData]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user selects an option
    if (formErrors[id as keyof FormData]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/contact', formData);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message! We will contact you soon.",
      });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        interest: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 dark:bg-[#121212] bg-[#f5f2e8]" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4">Get In Touch</GradientHeading>
            <p className="text-[#a0a0a0] mb-8">
              Have questions about our products or services? Contact our team of coating experts for personalized assistance.
            </p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className={`w-full dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gray-100/90 border ${formErrors.firstName ? 'border-red-500' : 'dark:border-gray-600/40 border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3] dark:shadow-[0_0_15px_rgba(255,255,255,0.25)] shadow-[0_0_15px_rgba(0,0,0,0.25)] dark:text-white text-gray-800`}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className={`w-full dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gray-100/90 border ${formErrors.lastName ? 'border-red-500' : 'dark:border-gray-600/40 border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3] dark:shadow-[0_0_15px_rgba(255,255,255,0.25)] shadow-[0_0_15px_rgba(0,0,0,0.25)] dark:text-white text-gray-800`}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className={`w-full dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gray-100/90 border ${formErrors.email ? 'border-red-500' : 'dark:border-gray-600/40 border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3] dark:shadow-[0_0_15px_rgba(255,255,255,0.25)] shadow-[0_0_15px_rgba(0,0,0,0.25)] dark:text-white text-gray-800`}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gray-100/90 border dark:border-gray-600/40 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3] dark:shadow-[0_0_15px_rgba(255,255,255,0.25)] shadow-[0_0_15px_rgba(0,0,0,0.25)] dark:text-white text-gray-800"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="interest" className="block text-sm font-medium mb-2">I'm interested in</label>
                <select 
                  id="interest" 
                  className="w-full dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gray-100/90 border dark:border-gray-600/40 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3] dark:shadow-[0_0_15px_rgba(255,255,255,0.25)] shadow-[0_0_15px_rgba(0,0,0,0.25)] dark:text-white text-gray-800"
                  value={formData.interest}
                  onChange={handleSelectChange}
                >
                  <option value="">Select your interest</option>
                  <option value="wildfire">Wildfire Protection</option>
                  <option value="marine">Marine Applications</option>
                  <option value="pool">Pool Coatings</option>
                  <option value="construction">Construction</option>
                  <option value="painter">Becoming a Certified Painter</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gray-100/90 border dark:border-gray-600/40 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3] dark:shadow-[0_0_15px_rgba(255,255,255,0.25)] shadow-[0_0_15px_rgba(0,0,0,0.25)] dark:text-white text-gray-800 resize-none"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <GradientButton 
                type="submit" 
                className="w-full font-semibold tracking-wider"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </GradientButton>
            </form>
          </div>
          
          <div>
            <div className="dark:bg-gradient-to-r dark:from-gray-800/95 dark:to-gray-700/95 bg-gray-100/90 backdrop-blur-xl rounded-lg overflow-hidden h-full dark:border-gray-600/40 border-gray-300 border-4 dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] shadow-[0_0_20px_rgba(0,0,0,0.2)]">
              <div className="p-8">
                <GradientHeading level={3} className="text-xl mb-6" variant="blue">Contact Information</GradientHeading>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full p-2 mr-4 mt-1 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
                      <i className="fas fa-map-marker-alt dark:text-white text-gray-700"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Serving</h4>
                      <p className="dark:text-[#a0a0a0] text-gray-700">Northern California<br/>& Nationwide Distribution</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full p-2 mr-4 mt-1 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
                      <i className="fas fa-phone-alt dark:text-white text-gray-700"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="dark:text-[#a0a0a0] text-gray-700">(916) 809-6619<br/><span className="text-sm">(Call or text welcome)</span></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full p-2 mr-4 mt-1 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
                      <i className="fas fa-envelope dark:text-white text-gray-700"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="dark:text-[#a0a0a0] text-gray-700">
                        <a href="mailto:info@praetoriansmartcoat.com" className="hover:text-amber-500 transition-colors">info@praetoriansmartcoat.com</a><br/>
                        <a href="mailto:rob@praetoriansmartcoat.com" className="hover:text-amber-500 transition-colors">rob@praetoriansmartcoat.com</a> <span className="text-sm">(Management)</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full p-2 mr-4 mt-1 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
                      <i className="fas fa-clock dark:text-white text-gray-700"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Response Time</h4>
                      <p className="dark:text-[#a0a0a0] text-gray-700">Monday-Friday: Same day<br/>Weekends: Within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://facebook.com/praetoriansmartcoat" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80 hover:scale-110 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 dark:text-white text-gray-700">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a 
                      href="https://twitter.com/praetoriancoat"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80 hover:scale-110 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 dark:text-white text-gray-700">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com/company/praetorian-smartcoat" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80 hover:scale-110 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 dark:text-white text-gray-700">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </a>
                    <a 
                      href="https://instagram.com/praetoriansmartcoat"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80 hover:scale-110 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 dark:text-white text-gray-700">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
