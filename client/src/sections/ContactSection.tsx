import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import backgroundImage from "@/assets_dir/images/optimized/praetorian-background-new.png";
import stoneTexturePath from "@/assets_dir/images/textures/stone-texture.png";

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
    <section 
      className="pt-20 pb-0 relative" 
      id="contact"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Enterprise level backdrop overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
      
      {/* Subtle animated ambient light effects */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-orange-500/10 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/3 bg-blue-500/10 blur-[150px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      
      {/* Particle overlay for enterprise feel */}
      <div className="absolute inset-0 bg-[url('/src/assets_dir/images/noise.svg')] opacity-[0.03] bg-repeat bg-[length:200px_200px] mix-blend-overlay pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative group">
            {/* Subtle ambient glow behind the heading */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-3/4 h-20 bg-gradient-to-r from-orange-500/0 via-amber-500/20 to-orange-500/0 blur-[100px] rounded-full"></div>
            
            <div className="relative mb-10 flex justify-center w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-lg blur-lg opacity-30 dark:opacity-40"></div>
              <h2 
                className="relative z-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 font-extrabold tracking-tight py-2" 
                style={{ 
                  fontSize: '3rem',
                  textShadow: '0 1px 8px rgba(255,150,0,0.3)',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.02em'
                }}
              >
                Get In Touch
              </h2>
            </div>
            <p className="text-[#a0a0a0] mb-8 text-lg text-center max-w-xl mx-auto">
              Have questions about our products or services? Contact our team of coating experts for personalized assistance.
            </p>
            
            <form className="space-y-6 bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-xl p-8 border-0 relative shadow-[0_10px_50px_rgba(0,0,0,0.5)]" onSubmit={handleSubmit}>
              {/* Premium gradient border effect */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
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
              
              <div className="relative group">
                {/* Fire effect shadow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 rounded-lg blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                
                {/* Water effect shadow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-lg blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" style={{ animationDelay: '500ms' }}></div>
                
                <GradientButton 
                  type="submit" 
                  className="w-full font-semibold tracking-wider relative z-10 dark:shadow-[0_0_20px_rgba(0,0,0,0.7)] shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </GradientButton>
              </div>
            </form>
          </div>
          
          <div className="relative group">
            {/* Ambient blue glow for the card */}
            <div className="absolute -bottom-10 right-1/2 transform translate-x-1/2 w-3/4 h-20 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 blur-[100px] rounded-full"></div>
            
            <div className="relative dark:bg-gradient-to-br dark:from-gray-900/95 dark:via-gray-950/95 dark:to-gray-900/95 bg-white/90 backdrop-blur-xl rounded-lg overflow-hidden h-full border-0 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
              {/* Enterprise level gradient border */}
              <div className="absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r from-blue-500/50 via-transparent to-cyan-400/50 opacity-70"></div>
              
              {/* Subtle top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              
              {/* Fire effect border top - enhanced */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 animate-pulse z-10" style={{ animationDuration: '3s' }}></div>
              
              {/* Water effect border bottom - enhanced */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 animate-pulse z-10" style={{ animationDuration: '4s' }}></div>
              
              {/* Premium glassmorphism effect - enhanced */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 dark:from-white/5 dark:via-transparent dark:to-white/5"></div>
              
              <div className="p-8 relative z-20">
                <div className="relative mb-10 flex justify-center w-full">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-lg blur-lg opacity-30 dark:opacity-40"></div>
                  <h2 
                    className="relative z-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 font-extrabold tracking-tight py-2" 
                    style={{ 
                      fontSize: '3rem',
                      textShadow: '0 1px 8px rgba(0,150,255,0.3)',
                      marginBottom: '1.5rem',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Contact Information
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start group">
                    <div className="relative">
                      {/* Pulsing ambient glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-red-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      <div className="relative dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-full p-4 mr-5 mt-1 shadow-lg border border-gray-200/30 dark:border-orange-500/30 flex items-center justify-center group-hover:border-orange-400/50 transition-all duration-300">
                        <i className="fas fa-map-marker-alt text-2xl bg-clip-text text-transparent bg-gradient-to-br from-amber-400 to-red-500"></i>
                        
                        {/* Inner concentric ring */}
                        <div className="absolute inset-0 rounded-full border border-orange-500/20 scale-[1.15] group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-red-500">Serving</h4>
                      <p className="dark:text-white text-gray-700 text-[15px]">Northern California<br/>& Nationwide Distribution</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="relative">
                      {/* Pulsing ambient glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-red-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      <div className="relative dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-full p-4 mr-5 mt-1 shadow-lg border border-gray-200/30 dark:border-orange-500/30 flex items-center justify-center group-hover:border-orange-400/50 transition-all duration-300">
                        <i className="fas fa-phone-alt text-2xl bg-clip-text text-transparent bg-gradient-to-br from-amber-400 to-red-500"></i>
                        
                        {/* Inner concentric ring */}
                        <div className="absolute inset-0 rounded-full border border-orange-500/20 scale-[1.15] group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-red-500">Phone</h4>
                      <p className="dark:text-white text-gray-700 text-[15px]">(916) 809-6619<br/><span className="text-sm">(Call or text welcome)</span></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="relative">
                      {/* Pulsing ambient glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      <div className="relative dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-full p-4 mr-5 mt-1 shadow-lg border border-gray-200/30 dark:border-blue-500/30 flex items-center justify-center group-hover:border-blue-400/50 transition-all duration-300">
                        <i className="fas fa-envelope text-2xl bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-cyan-500"></i>
                        
                        {/* Inner concentric ring */}
                        <div className="absolute inset-0 rounded-full border border-blue-500/20 scale-[1.15] group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Email</h4>
                      <p className="dark:text-white text-gray-700 text-[15px]">
                        <a href="mailto:info@praetoriansmartcoat.com" className="hover:text-blue-400 transition-colors">info@praetoriansmartcoat.com</a><br/>
                        <a href="mailto:rob@praetoriansmartcoat.com" className="hover:text-blue-400 transition-colors">rob@praetoriansmartcoat.com</a> <span className="text-sm">(Management)</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="relative">
                      {/* Pulsing ambient glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      <div className="relative dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-full p-4 mr-5 mt-1 shadow-lg border border-gray-200/30 dark:border-blue-500/30 flex items-center justify-center group-hover:border-blue-400/50 transition-all duration-300">
                        <i className="fas fa-clock text-2xl bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-cyan-500"></i>
                        
                        {/* Inner concentric ring */}
                        <div className="absolute inset-0 rounded-full border border-blue-500/20 scale-[1.15] group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Response Time</h4>
                      <p className="dark:text-white text-gray-700 text-[15px]">Monday-Friday: Same day<br/>Weekends: Within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-gray-800/30">
                  <h4 className="font-bold text-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 inline-block">Connect With Us:</h4>
                  <div className="flex space-x-6 inline-flex">
                    <a 
                      href="https://facebook.com/praetoriansmartcoat" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 bg-gradient-to-br from-gray-100 via-white to-gray-200 w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 dark:shadow-[0_0_10px_rgba(59,130,246,0.2)] shadow-[0_0_5px_rgba(0,0,0,0.1)] border border-gray-200/30 dark:border-blue-600/30 group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 dark:text-blue-400 text-blue-600 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a 
                      href="https://youtube.com/@praetoriansmartcoat"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 bg-gradient-to-br from-gray-100 via-white to-gray-200 w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 dark:shadow-[0_0_10px_rgba(255,0,0,0.2)] shadow-[0_0_5px_rgba(0,0,0,0.1)] border border-gray-200/30 dark:border-red-500/30 group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 dark:text-red-500 text-red-600 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com/company/praetorian-smartcoat" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 bg-gradient-to-br from-gray-100 via-white to-gray-200 w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 dark:shadow-[0_0_10px_rgba(14,118,168,0.2)] shadow-[0_0_5px_rgba(0,0,0,0.1)] border border-gray-200/30 dark:border-blue-800/30 group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 dark:text-blue-500 text-blue-700 group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </a>
                    <a 
                      href="https://instagram.com/praetoriansmartcoat"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 bg-gradient-to-br from-gray-100 via-white to-gray-200 w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 dark:shadow-[0_0_10px_rgba(225,48,108,0.2)] shadow-[0_0_5px_rgba(0,0,0,0.1)] border border-gray-200/30 dark:border-pink-500/30 group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 dark:text-pink-400 text-pink-600 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors">
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
