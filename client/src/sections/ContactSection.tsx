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
    <section className="py-20 bg-[#121212]" id="contact">
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
                    className={`w-full bg-gradient-to-r from-gray-800/90 to-gray-700/90 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-600/40'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3] shadow-[0_0_8px_rgba(255,255,255,0.05)]`}
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
                    className={`w-full bg-gradient-to-r from-gray-800/90 to-gray-700/90 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-600/40'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3] shadow-[0_0_8px_rgba(255,255,255,0.05)]`}
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
                  className={`w-full bg-[#1e1e1e] border ${formErrors.email ? 'border-red-500' : 'border-[#333333]'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3]`}
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
                  className="w-full bg-[#1e1e1e] border border-[#333333] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="interest" className="block text-sm font-medium mb-2">I'm interested in</label>
                <select 
                  id="interest" 
                  className="w-full bg-[#1e1e1e] border border-[#333333] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
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
                  className="w-full bg-[#1e1e1e] border border-[#333333] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3] resize-none"
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
            <div className="bg-gradient-to-r from-gray-800/95 to-gray-700/95 backdrop-blur-xl rounded-lg overflow-hidden h-full border border-gray-600/40 shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              <div className="p-8">
                <GradientHeading level={3} className="text-xl mb-6" variant="blue">Contact Information</GradientHeading>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#0070f3]/20 rounded-full p-2 mr-4 mt-1">
                      <i className="fas fa-map-marker-alt text-[#0070f3]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Address</h4>
                      <p className="text-[#a0a0a0]">1250 Industrial Parkway<br/>San Diego, CA 92154</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#0070f3]/20 rounded-full p-2 mr-4 mt-1">
                      <i className="fas fa-phone-alt text-[#0070f3]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="text-[#a0a0a0]">Main: (800) 555-7890<br/>Support: (800) 555-7891</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#0070f3]/20 rounded-full p-2 mr-4 mt-1">
                      <i className="fas fa-envelope text-[#0070f3]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-[#a0a0a0]">sales@praetoriancoatings.com<br/>support@praetoriancoatings.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#0070f3]/20 rounded-full p-2 mr-4 mt-1">
                      <i className="fas fa-clock text-[#0070f3]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Hours</h4>
                      <p className="text-[#a0a0a0]">Monday-Friday: 8am - 6pm PST<br/>Saturday: 9am - 2pm PST</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-white/10 hover:bg-[#0070f3]/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                      <i className="fab fa-facebook-f text-[#0070f3]"></i>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-[#0070f3]/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                      <i className="fab fa-twitter text-[#0070f3]"></i>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-[#0070f3]/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                      <i className="fab fa-linkedin-in text-[#0070f3]"></i>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-[#0070f3]/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                      <i className="fab fa-instagram text-[#0070f3]"></i>
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
