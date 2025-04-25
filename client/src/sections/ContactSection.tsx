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
                className="w-full"
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
                      <h4 className="font-semibold mb-1">Address</h4>
                      <p className="dark:text-[#a0a0a0] text-gray-700">1250 Industrial Parkway<br/>San Diego, CA 92154</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full p-2 mr-4 mt-1 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
                      <i className="fas fa-phone-alt dark:text-white text-gray-700"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="dark:text-[#a0a0a0] text-gray-700">Main: (800) 555-7890<br/>Support: (800) 555-7891</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full p-2 mr-4 mt-1 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
                      <i className="fas fa-envelope dark:text-white text-gray-700"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="dark:text-[#a0a0a0] text-gray-700">sales@praetoriansmartcoat.com<br/>support@praetoriansmartcoat.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full p-2 mr-4 mt-1 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
                      <i className="fas fa-clock dark:text-white text-gray-700"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Hours</h4>
                      <p className="dark:text-[#a0a0a0] text-gray-700">Monday-Friday: 8am - 6pm PST<br/>Saturday: 9am - 2pm PST</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
                      <i className="fab fa-facebook-f dark:text-white text-gray-700"></i>
                    </a>
                    <a href="#" className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
                      <i className="fab fa-twitter dark:text-white text-gray-700"></i>
                    </a>
                    <a href="#" className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
                      <i className="fab fa-linkedin-in dark:text-white text-gray-700"></i>
                    </a>
                    <a href="#" className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-300 to-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
                      <i className="fab fa-instagram dark:text-white text-gray-700"></i>
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
