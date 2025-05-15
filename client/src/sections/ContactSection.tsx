import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PremiumActionButton } from "@/utils/premium-buttons";
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
      {/* Enhanced enterprise level backdrop overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-sm z-0"></div>
      
      {/* Premium animated ambient light effects */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-orange-500/10 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/3 bg-blue-500/10 blur-[150px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-1/3 h-1/4 bg-purple-500/5 blur-[180px] animate-pulse" style={{ animationDuration: '15s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-1/3 h-1/4 bg-emerald-500/5 blur-[180px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '3s' }}></div>
      
      {/* Premium particle overlay for enterprise feel */}
      <div className="absolute inset-0 bg-[url('/src/assets_dir/images/noise.svg')] opacity-[0.03] bg-repeat bg-[length:200px_200px] mix-blend-overlay pointer-events-none"></div>
      
      {/* Sophisticated diagonal line accents */}
      <div className="absolute top-0 right-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform rotate-45 translate-y-20 translate-x-10 opacity-70"></div>
      <div className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent transform -rotate-45 translate-y-32 -translate-x-10 opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent transform -rotate-45 -translate-y-48 translate-x-10 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform rotate-45 -translate-y-64 -translate-x-10 opacity-70"></div>
      
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative group">
            {/* Ambient glow effects */}
            <div className="absolute -top-10 left-1/4 w-1/2 h-1/3 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-10 right-1/4 w-1/2 h-1/3 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="mb-12 flex justify-center w-full">
              <div className="relative w-full max-w-2xl group">
                {/* Enterprise card background for section title */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-black/95 backdrop-blur-xl rounded-xl -z-10 transform scale-[1.03] shadow-[0_10px_50px_rgba(0,0,0,0.5)]"></div>
                
                {/* Premium gradient border effect */}
                <div className="absolute inset-0 scale-[1.03] rounded-xl bg-gradient-to-r from-orange-500/50 via-blue-500/30 to-orange-500/50 opacity-70 group-hover:opacity-90 transition-opacity duration-700 -z-10"></div>
                
                {/* Ambient glow effects - positioned behind card */}
                <div className="absolute -right-10 -bottom-5 w-40 h-40 bg-orange-500/20 rounded-full blur-[60px] opacity-70 group-hover:opacity-100 transition-opacity duration-1000 -z-20"></div>
                <div className="absolute -left-10 -top-5 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] opacity-70 group-hover:opacity-100 transition-opacity duration-1000 -z-20"></div>
                
                {/* Animated corner accents - premium effect */}
                <div className="absolute top-0 left-0 w-16 h-16 opacity-60 scale-[1.03] -z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/40 to-blue-600/30 rounded-tl-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '4s' }}></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 opacity-60 scale-[1.03] -z-10">
                  <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/40 to-blue-600/30 rounded-tr-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '5s' }}></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 opacity-60 scale-[1.03] -z-10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-amber-500/40 rounded-bl-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '4.5s' }}></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-60 scale-[1.03] -z-10">
                  <div className="absolute inset-0 bg-gradient-to-tl from-blue-600/30 to-amber-500/40 rounded-br-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '5.5s' }}></div>
                </div>
                
                {/* Animated edge highlight effects */}
                <div className="absolute top-0 inset-x-0 h-[2px] scale-[1.03] bg-gradient-to-r from-orange-500/0 via-orange-500/70 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[1px] -z-10"></div>
                <div className="absolute bottom-0 inset-x-0 h-[2px] scale-[1.03] bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[1px] -z-10"></div>
                
                <div className="text-center relative px-8 py-8 z-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Get In Touch
                  </h2>
                  <p className="text-gray-300 text-lg max-w-xl mx-auto mb-6">
                    Have questions about our products or services? Contact our team of coating experts for personalized assistance.
                  </p>
                  <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-black/95 backdrop-blur-xl rounded-xl p-1 border-0 shadow-[0_10px_50px_rgba(0,0,0,0.5)] group">
              {/* Premium gradient border effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/50 via-blue-500/30 to-orange-500/50 opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>
              
              {/* Ambient glow effects - positioned behind card */}
              <div className="absolute -right-20 -bottom-10 w-40 h-40 bg-orange-500/20 rounded-full blur-[80px] opacity-70 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute -left-20 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px] opacity-70 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              {/* Animated corner accents - premium effect */}
              <div className="absolute top-0 left-0 w-16 h-16 opacity-60">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/40 to-blue-600/30 rounded-tl-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '4s' }}></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 opacity-60">
                <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/40 to-blue-600/30 rounded-tr-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '5s' }}></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 opacity-60">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-amber-500/40 rounded-bl-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '4.5s' }}></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-60">
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-600/30 to-amber-500/40 rounded-br-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '5.5s' }}></div>
              </div>
              
              {/* Animated edge highlight effects */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-500/70 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[1px]"></div>
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[1px]"></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Premium subtle texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] bg-repeat bg-[length:150px_150px] mix-blend-overlay pointer-events-none rounded-xl" style={{ backgroundImage: "url('/src/assets_dir/images/textures/stone-texture.png')" }}></div>
              
              <form className="space-y-6 p-8 relative" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    {/* Premium Enterprise Label */}
                    <label htmlFor="firstName" className="relative flex items-center mb-2 group">
                      {/* Label text with premium styling */}
                      <span className="relative z-10 text-sm font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
                        First Name
                      </span>
                      
                      {/* Animated dot indicator */}
                      <span className="ml-1 w-1 h-1 rounded-full bg-blue-500 opacity-70 group-hover:w-1.5 group-hover:h-1.5 transition-all duration-300"></span>
                    </label>
                    
                    {/* Premium Enterprise Input Container */}
                    <div className="relative">
                      {/* Premium input field */}
                      <input 
                        type="text" 
                        id="firstName" 
                        className={`w-full bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 border ${formErrors.firstName ? 'border-blue-500' : 'border-gray-600/30'} rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500/70 text-white relative z-10 transition-all duration-300 backdrop-blur-sm placeholder-gray-400/80`}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      
                      {/* Premium enterprise focus effect */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/0 to-blue-500/0 group-focus-within:from-orange-500/20 group-focus-within:to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {formErrors.firstName && <p className="text-blue-500 text-xs mt-1">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    {/* Premium Enterprise Label */}
                    <label htmlFor="lastName" className="relative flex items-center mb-2 group">
                      {/* Label text with premium styling */}
                      <span className="relative z-10 text-sm font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
                        Last Name
                      </span>
                      
                      {/* Animated dot indicator */}
                      <span className="ml-1 w-1 h-1 rounded-full bg-blue-500 opacity-70 group-hover:w-1.5 group-hover:h-1.5 transition-all duration-300"></span>
                    </label>
                    
                    {/* Premium Enterprise Input Container */}
                    <div className="relative">
                      {/* Premium input field */}
                      <input 
                        type="text" 
                        id="lastName" 
                        className={`w-full bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 border ${formErrors.lastName ? 'border-blue-500' : 'border-gray-600/30'} rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500/70 text-white relative z-10 transition-all duration-300 backdrop-blur-sm placeholder-gray-400/80`}
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                      
                      {/* Premium enterprise focus effect */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/0 to-blue-500/0 group-focus-within:from-orange-500/20 group-focus-within:to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {formErrors.lastName && <p className="text-blue-500 text-xs mt-1">{formErrors.lastName}</p>}
                  </div>
                </div>
                
                {/* Premium Enterprise Email Field */}
                <div className="group">
                  {/* Premium Enterprise Label */}
                  <label htmlFor="email" className="relative flex items-center mb-2 group">
                    {/* Label text with premium styling */}
                    <span className="relative z-10 text-sm font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
                      Email Address
                    </span>
                    
                    {/* Animated dot indicator */}
                    <span className="ml-1 w-1 h-1 rounded-full bg-blue-500 opacity-70 group-hover:w-1.5 group-hover:h-1.5 transition-all duration-300"></span>
                  </label>
                  
                  {/* Premium Enterprise Input Container */}
                  <div className="relative">
                    {/* Email icon */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-gray-400">
                      <i className="fas fa-envelope text-sm opacity-70"></i>
                    </div>
                    
                    {/* Premium input field */}
                    <input 
                      type="email" 
                      id="email" 
                      className={`w-full bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 border ${formErrors.email ? 'border-blue-500' : 'border-gray-600/30'} rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-orange-500/70 text-white relative z-10 transition-all duration-300 backdrop-blur-sm placeholder-gray-400/80`}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    
                    {/* Premium glow effect on focus */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-blue-500/0 dark:group-focus-within:from-amber-500/20 dark:group-focus-within:to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-amber-500/0 to-blue-500/0 group-focus-within:from-amber-500/10 group-focus-within:to-blue-500/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Error message with enhanced styling */}
                  {formErrors.email && (
                    <p className="text-blue-500 text-xs mt-1 flex items-center">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {formErrors.email}
                    </p>
                  )}
                </div>
                
                {/* Premium Enterprise Phone Field */}
                <div className="group">
                  {/* Premium Enterprise Label */}
                  <label htmlFor="phone" className="relative flex items-center mb-2 group">
                    {/* Label text with premium styling */}
                    <span className="relative z-10 text-sm font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
                      Phone Number
                    </span>
                    
                    {/* Small "optional" indicator */}
                    <span className="ml-2 text-xs text-gray-400 italic">(optional)</span>
                  </label>
                  
                  {/* Premium Enterprise Input Container */}
                  <div className="relative">
                    {/* Phone icon */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-gray-400">
                      <i className="fas fa-phone-alt text-sm opacity-70"></i>
                    </div>
                    
                    {/* Premium input field */}
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 border border-gray-600/30 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-orange-500/70 text-white relative z-10 transition-all duration-300 backdrop-blur-sm placeholder-gray-400/80"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(000) 000-0000"
                    />
                    
                    {/* Premium glow effect on focus */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-blue-500/0 dark:group-focus-within:from-amber-500/20 dark:group-focus-within:to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-amber-500/0 to-blue-500/0 group-focus-within:from-amber-500/10 group-focus-within:to-blue-500/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                {/* Premium Enterprise Interest Selection */}
                <div className="group">
                  {/* Premium Enterprise Label */}
                  <label htmlFor="interest" className="relative flex items-center mb-2 group">
                    {/* Label text with premium styling */}
                    <span className="relative z-10 text-sm font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
                      I'm Interested In
                    </span>
                    
                    {/* Animated dot indicator */}
                    <span className="ml-1 w-1 h-1 rounded-full bg-blue-500 opacity-70 group-hover:w-1.5 group-hover:h-1.5 transition-all duration-300"></span>
                  </label>
                  
                  {/* Premium Enterprise Select Container */}
                  <div className="relative">
                    {/* Premium input field */}
                    <select 
                      id="interest" 
                      className="w-full bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 border border-gray-600/30 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500/70 text-white relative z-10 transition-all duration-300 backdrop-blur-sm appearance-none"
                      value={formData.interest}
                      onChange={handleSelectChange}
                    >
                      <option value="" className="bg-gray-900">Choose an option</option>
                      <option value="industrial" className="bg-gray-900">Industrial Coatings</option>
                      <option value="commercial" className="bg-gray-900">Commercial Applications</option>
                      <option value="residential" className="bg-gray-900">Residential Projects</option>
                      <option value="distributor" className="bg-gray-900">Becoming a Distributor</option>
                      <option value="other" className="bg-gray-900">Other</option>
                    </select>
                    
                    {/* Custom select arrow */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none">
                      <i className="fas fa-chevron-down text-orange-500/70 text-sm"></i>
                    </div>
                    
                    {/* Premium glow effect on focus */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-blue-500/0 dark:group-focus-within:from-amber-500/20 dark:group-focus-within:to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                {/* Premium Enterprise Message Field */}
                <div className="group">
                  {/* Premium Enterprise Label */}
                  <label htmlFor="message" className="relative flex items-center mb-2 group">
                    {/* Label text with premium styling */}
                    <span className="relative z-10 text-sm font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
                      Message
                    </span>
                    
                    {/* Animated dot indicator */}
                    <span className="ml-1 w-1 h-1 rounded-full bg-blue-500 opacity-70 group-hover:w-1.5 group-hover:h-1.5 transition-all duration-300"></span>
                  </label>
                  
                  {/* Premium Enterprise Textarea Container */}
                  <div className="relative">
                    {/* Premium textarea field */}
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 border border-gray-600/30 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500/70 text-white relative z-10 transition-all duration-300 backdrop-blur-sm placeholder-gray-400/80 resize-none"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                    
                    {/* Premium glow effect on focus */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-blue-500/0 dark:group-focus-within:from-amber-500/20 dark:group-focus-within:to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                {/* Premium Enterprise-level Submit Button */}
                <div className="flex justify-center pt-4">
                  <PremiumActionButton 
                    type="submit"
                    disabled={isSubmitting}
                    variant="fire"
                    size="lg"
                  >
                    {isSubmitting ? "Processing..." : "Send Message"}
                  </PremiumActionButton>
                </div>
              </form>
            </div>
          </div>
          
          <div className="relative">
            {/* Ambient glow effects */}
            <div className="absolute -top-10 left-1/4 w-1/2 h-1/3 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-10 right-1/4 w-1/2 h-1/3 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="mb-12 flex justify-center w-full">
              <div className="relative w-full max-w-2xl group">
                {/* Enterprise card background for section title - blue variant */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-black/95 backdrop-blur-xl rounded-xl -z-10 transform scale-[1.03] shadow-[0_10px_50px_rgba(0,0,0,0.5)]"></div>
                
                {/* Premium gradient border effect - flipped color order from first card */}
                <div className="absolute inset-0 scale-[1.03] rounded-xl bg-gradient-to-r from-blue-500/50 via-orange-500/30 to-blue-500/50 opacity-70 group-hover:opacity-90 transition-opacity duration-700 -z-10"></div>
                
                {/* Ambient glow effects - blue-dominant, opposite of first card */}
                <div className="absolute -right-10 -bottom-5 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] opacity-70 group-hover:opacity-100 transition-opacity duration-1000 -z-20"></div>
                <div className="absolute -left-10 -top-5 w-40 h-40 bg-orange-500/20 rounded-full blur-[60px] opacity-70 group-hover:opacity-100 transition-opacity duration-1000 -z-20"></div>
                
                {/* Animated corner accents - blue variant */}
                <div className="absolute top-0 left-0 w-16 h-16 opacity-60 scale-[1.03] -z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-orange-600/30 rounded-tl-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '5s' }}></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 opacity-60 scale-[1.03] -z-10">
                  <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/40 to-orange-600/30 rounded-tr-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '4s' }}></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 opacity-60 scale-[1.03] -z-10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 to-blue-500/40 rounded-bl-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '5.5s' }}></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-60 scale-[1.03] -z-10">
                  <div className="absolute inset-0 bg-gradient-to-tl from-orange-600/30 to-blue-500/40 rounded-br-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '4.5s' }}></div>
                </div>
                
                {/* Animated edge highlight effects - flipped colors from first card */}
                <div className="absolute top-0 inset-x-0 h-[2px] scale-[1.03] bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[1px] -z-10"></div>
                <div className="absolute bottom-0 inset-x-0 h-[2px] scale-[1.03] bg-gradient-to-r from-orange-500/0 via-orange-500/70 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[1px] -z-10"></div>
                
                <div className="text-center relative px-8 py-8 z-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Contact Information
                  </h2>
                  <p className="text-gray-300 text-lg max-w-xl mx-auto mb-6">
                    Reach out to our team through any of these channels for inquiries, support, or partnership opportunities.
                  </p>
                  <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-black/95 backdrop-blur-xl rounded-xl p-1 border-0 shadow-[0_10px_50px_rgba(0,0,0,0.5)] group">
              {/* Premium gradient border effect - flipped color order from first card */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/50 via-orange-500/30 to-blue-500/50 opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>
              
              {/* Ambient glow effects - blue-dominant, opposite of first card */}
              <div className="absolute -right-20 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px] opacity-70 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute -left-20 -top-10 w-40 h-40 bg-orange-500/20 rounded-full blur-[80px] opacity-70 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              {/* Animated corner accents - blue variant */}
              <div className="absolute top-0 left-0 w-16 h-16 opacity-60">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-orange-600/30 rounded-tl-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '5s' }}></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 opacity-60">
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/40 to-orange-600/30 rounded-tr-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '4s' }}></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 opacity-60">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 to-blue-500/40 rounded-bl-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '5.5s' }}></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-60">
                <div className="absolute inset-0 bg-gradient-to-tl from-orange-600/30 to-blue-500/40 rounded-br-xl blur-[2px] group-hover:animate-pulse-slow" style={{ animationDuration: '4.5s' }}></div>
              </div>
              
              {/* Animated edge highlight effects - flipped colors from first card */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[1px]"></div>
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-500/70 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[1px]"></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Premium subtle texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] bg-repeat bg-[length:150px_150px] mix-blend-overlay pointer-events-none rounded-xl" style={{ backgroundImage: "url('/src/assets_dir/images/textures/stone-texture.png')" }}></div>
              
              <div className="space-y-8 p-8 relative">
                {/* Premium Enterprise Contact Item - Location */}
                <div className="group relative transform transition-all duration-500 hover:scale-[1.02] hover:z-10 rounded-xl p-4 hover:bg-gradient-to-r hover:from-orange-900/10 hover:via-transparent hover:to-orange-700/10 overflow-hidden">
                  {/* Premium subtle glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute -inset-1 bg-orange-500/10 blur-[30px] rounded-full"></div>
                  </div>
                  
                  {/* Animated corner accents on hover */}
                  <div className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 to-red-600/30 rounded-tl-xl blur-[2px] animate-pulse-slow" style={{ animationDuration: '4s' }}></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/40 to-red-600/30 rounded-br-xl blur-[2px] animate-pulse-slow" style={{ animationDuration: '5s' }}></div>
                  </div>
                  
                  {/* Moving shine effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full opacity-0 group-hover:opacity-100 transition-all ease-in-out pointer-events-none"
                    style={{ transitionDuration: '1.5s', transitionDelay: '0.1s' }}
                  ></div>
                  
                  <div className="flex items-start relative z-10">
                    {/* Premium Enterprise Icon Container */}
                    <div className="relative flex-shrink-0">
                      {/* Premium Icon Container */}
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-4 mr-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 group-hover:scale-110 transition-transform duration-500">
                        {/* Premium gradient border effect - Fire variant */}
                        <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-orange-500/60 via-red-500/60 to-red-600/60 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Inner highlight */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                        
                        {/* Icon itself */}
                        <div className="relative z-10">
                          <i className="fas fa-map-marker-alt text-2xl text-gradient from-orange-400 to-red-600 w-6 h-6 flex items-center justify-center"></i>
                        </div>
                        
                        {/* Subtle glow effect */}
                        <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-400 pb-1 group-hover:scale-[1.02] transition-transform duration-500 origin-left">Global Headquarters</h3>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                        2500 Innovation Boulevard<br />
                        Suite 300<br />
                        Houston, Texas 77042
                      </p>
                      <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-orange-500/60 via-transparent to-transparent rounded-full transition-all duration-700 mt-2 opacity-60 group-hover:opacity-100"></div>
                    </div>
                  </div>
                </div>
                
                {/* Premium Enterprise Contact Item - Phone */}
                <div className="group relative transform transition-all duration-500 hover:scale-[1.02] hover:z-10 rounded-xl p-4 hover:bg-gradient-to-r hover:from-blue-900/10 hover:via-transparent hover:to-blue-700/10 overflow-hidden">
                  {/* Premium subtle glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute -inset-1 bg-blue-500/10 blur-[30px] rounded-full"></div>
                  </div>
                  
                  {/* Animated corner accents on hover */}
                  <div className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-cyan-600/30 rounded-tl-xl blur-[2px] animate-pulse-slow" style={{ animationDuration: '4.2s' }}></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/40 to-cyan-600/30 rounded-br-xl blur-[2px] animate-pulse-slow" style={{ animationDuration: '5.2s' }}></div>
                  </div>
                  
                  {/* Moving shine effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full opacity-0 group-hover:opacity-100 transition-all ease-in-out pointer-events-none"
                    style={{ transitionDuration: '1.5s', transitionDelay: '0.1s' }}
                  ></div>
                  
                  <div className="flex items-start relative z-10">
                    {/* Premium Enterprise Icon Container */}
                    <div className="relative flex-shrink-0">
                      {/* Premium Icon Container */}
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-4 mr-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 group-hover:scale-110 transition-transform duration-500">
                        {/* Premium gradient border effect - Water variant */}
                        <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-blue-500/60 via-blue-500/60 to-blue-600/60 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Inner highlight */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                        
                        {/* Icon itself */}
                        <div className="relative z-10">
                          <i className="fas fa-phone-alt text-2xl text-gradient from-blue-400 to-blue-600 w-6 h-6 flex items-center justify-center"></i>
                        </div>
                        
                        {/* Subtle glow effect */}
                        <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400 pb-1 group-hover:scale-[1.02] transition-transform duration-500 origin-left">Phone Support</h3>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                        Main: (800) 555-7890<br />
                        Technical Support: (800) 555-7891<br />
                        Hours: 24/7 Support Available
                      </p>
                      <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500/60 via-transparent to-transparent rounded-full transition-all duration-700 mt-2 opacity-60 group-hover:opacity-100"></div>
                    </div>
                  </div>
                </div>
                
                {/* Premium Enterprise Contact Item - Email */}
                <div className="group relative transform transition-all duration-500 hover:scale-[1.02] hover:z-10 rounded-xl p-4 hover:bg-gradient-to-r hover:from-orange-900/10 hover:via-blue-900/10 hover:to-orange-700/10 overflow-hidden">
                  {/* Premium subtle glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 via-blue-500/10 to-orange-500/10 blur-[30px] rounded-full"></div>
                  </div>
                  
                  {/* Animated corner accents on hover */}
                  <div className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 to-blue-600/30 rounded-tl-xl blur-[2px] animate-pulse-slow" style={{ animationDuration: '4.6s' }}></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/40 to-orange-600/30 rounded-br-xl blur-[2px] animate-pulse-slow" style={{ animationDuration: '5.6s' }}></div>
                  </div>
                  
                  {/* Moving shine effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full opacity-0 group-hover:opacity-100 transition-all ease-in-out pointer-events-none"
                    style={{ transitionDuration: '1.5s', transitionDelay: '0.1s' }}
                  ></div>
                  
                  <div className="flex items-start relative z-10">
                    {/* Premium Enterprise Icon Container */}
                    <div className="relative flex-shrink-0">
                      {/* Premium Icon Container */}
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-4 mr-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 group-hover:scale-110 transition-transform duration-500">
                        {/* Premium gradient border effect - Dual variant */}
                        <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-orange-500/60 via-blue-500/60 to-orange-500/60 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Inner highlight */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                        
                        {/* Icon itself */}
                        <div className="relative z-10">
                          <i className="fas fa-envelope text-2xl text-gradient from-amber-400 to-blue-400 w-6 h-6 flex items-center justify-center"></i>
                        </div>
                        
                        {/* Subtle glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-300 to-blue-300 pb-1 group-hover:scale-[1.02] transition-transform duration-500 origin-left">Email</h3>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                        Sales: sales@praetoriansmartcoat.com<br />
                        Support: support@praetoriansmartcoat.com<br />
                        Press: media@praetoriansmartcoat.com
                      </p>
                      <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-orange-500/60 via-blue-500/40 to-transparent rounded-full transition-all duration-700 mt-2 opacity-60 group-hover:opacity-100"></div>
                    </div>
                  </div>
                </div>
                
                {/* Premium Enterprise Social Media Connect */}
                <div className="pt-8 group">
                  <div className="relative overflow-hidden">
                    {/* Premium card background for social media */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 opacity-0 group-hover:opacity-80 transition-opacity duration-700 rounded-xl"></div>
                    
                    {/* Premium animated ambient light effects */}
                    <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-orange-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                    <div className="absolute bottom-0 right-1/4 w-1/2 h-1/3 bg-blue-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                    
                    {/* Animated corner accents on hover */}
                    <div className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 to-blue-600/30 rounded-tl-xl blur-[2px] animate-pulse-slow" style={{ animationDuration: '4.8s' }}></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-10">
                      <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/40 to-orange-600/30 rounded-br-xl blur-[2px] animate-pulse-slow" style={{ animationDuration: '5.8s' }}></div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-5 text-center text-white relative group-hover:scale-[1.02] transition-transform duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      style={{ 
                        textShadow: '0 0 10px rgba(59,130,246,0.2), 0 0 5px rgba(59,130,246,0.1)'
                      }}
                    >
                      Connect With Us
                    </h3>
                    
                    {/* Animated gradient underline - center aligned */}
                    <div className="h-0.5 w-0 group-hover:w-48 bg-gradient-to-r from-orange-500/40 via-blue-500/40 to-orange-500/40 rounded-full mx-auto transition-all duration-700 mb-6"></div>
                    
                    {/* Floating effect container with enhanced styling */}
                    <div className="flex justify-center flex-wrap gap-6 pt-4">
                      {/* Facebook Icon - Premium Enterprise Styling */}
                      <a 
                        href="https://facebook.com/praetoriansmartcoat" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative transform transition-all duration-500"
                      >
                        {/* Premium Icon Container with enhanced styling */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-[0_15px_40px_rgba(59,130,246,0.4)]">
                          {/* Premium gradient border effect - Blue variant for Facebook */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-blue-500/50 via-blue-600/50 to-blue-700/50 opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Icon itself */}
                          <div className="relative z-10">
                            <i className="fab fa-facebook-f text-2xl text-gradient from-blue-400 to-blue-600 w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"></i>
                          </div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-pulse-slow"></div>
                        </div>
                        
                        {/* Animated bottom shine effect */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-700/40 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        {/* Subtle hover tooltip */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap text-xs text-blue-400 font-medium tracking-wide">Facebook</div>
                      </a>
                      
                      {/* X (formerly Twitter) Icon - Premium Enterprise Styling */}
                      <a 
                        href="https://x.com/praetoriansmartcoat" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative transform transition-all duration-500"
                      >
                        {/* Premium Icon Container with enhanced styling */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-[0_15px_40px_rgba(156,163,175,0.4)]">
                          {/* Premium gradient border effect - X variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-gray-700/50 via-gray-800/50 to-gray-900/50 opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Icon itself */}
                          <div className="relative z-10">
                            <i className="fab fa-twitter text-2xl text-gradient from-gray-100 to-gray-300 w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"></i>
                          </div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute -inset-1 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-pulse-slow"></div>
                        </div>
                        
                        {/* Animated bottom shine effect */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-gray-500/40 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        {/* Subtle hover tooltip */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap text-xs text-gray-400 font-medium tracking-wide">X</div>
                      </a>
                      
                      {/* LinkedIn Icon - Premium Enterprise Styling */}
                      <a 
                        href="https://linkedin.com/company/praetorian-smartcoat" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative transform transition-all duration-500"
                      >
                        {/* Premium Icon Container with enhanced styling */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)]">
                          {/* Premium gradient border effect - LinkedIn variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-blue-700/50 via-blue-800/50 to-blue-900/50 opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Icon itself */}
                          <div className="relative z-10">
                            <i className="fab fa-linkedin-in text-2xl text-gradient from-blue-500 to-blue-700 w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"></i>
                          </div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute -inset-1 bg-blue-700/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-pulse-slow"></div>
                        </div>
                        
                        {/* Animated bottom shine effect */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-700/40 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        {/* Subtle hover tooltip */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap text-xs text-blue-400 font-medium tracking-wide">LinkedIn</div>
                      </a>
                      
                      {/* YouTube Icon - Premium Enterprise Styling */}
                      <a 
                        href="https://youtube.com/praetoriansmartcoat"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative transform transition-all duration-500"
                      >
                        {/* Premium Icon Container with enhanced styling */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)]">
                          {/* Premium gradient border effect - YouTube variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-red-600/50 via-red-700/50 to-red-800/50 opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Icon itself */}
                          <div className="relative z-10">
                            <i className="fab fa-youtube text-2xl text-gradient from-red-500 to-red-700 w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"></i>
                          </div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute -inset-1 bg-red-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-pulse-slow"></div>
                        </div>
                        
                        {/* Animated bottom shine effect */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        {/* Subtle hover tooltip */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap text-xs text-red-400 font-medium tracking-wide">YouTube</div>
                      </a>
                      
                      {/* Instagram Icon - Premium Enterprise Styling */}
                      <a 
                        href="https://instagram.com/praetoriansmartcoat"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative transform transition-all duration-500"
                      >
                        {/* Premium Icon Container with enhanced styling */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-[0_15px_40px_rgba(236,72,153,0.4)]">
                          {/* Premium gradient border effect - Instagram variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-purple-600/50 via-pink-500/50 to-orange-500/50 opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Icon itself */}
                          <div className="relative z-10">
                            <i className="fab fa-instagram text-2xl text-gradient from-purple-500 via-pink-500 to-orange-500 w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"></i>
                          </div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-orange-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-pulse-slow"></div>
                        </div>
                        
                        {/* Animated bottom shine effect */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        {/* Subtle hover tooltip */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap text-xs text-pink-400 font-medium tracking-wide">Instagram</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Enterprise-level Copyright Footer */}
      <div className="relative mt-16 pt-10">
        {/* Premium gradient divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
        
        {/* Ambient light effect */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-2/3 h-12 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 blur-[50px] rounded-full"></div>
        
        {/* Premium branded footer content */}
        <div className="text-center relative z-10 pb-8">
          {/* Premium logo treatment */}
          <div className="mb-4 inline-block">
            <div className="relative inline-flex items-center gap-2 mx-auto">
              {/* Logo ambient glow */}
              <div className="absolute inset-0 scale-[1.5] bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 blur-xl rounded-full opacity-50"></div>
              
              {/* Logo icon */}
              <div className="relative">
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-full p-2 shadow-[0_5px_15px_rgba(0,0,0,0.3)] z-10 border border-amber-500/20">
                  <i className="fas fa-shield-alt text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-blue-500 text-sm"></i>
                </div>
                
                {/* Subtle light effect */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(251,113,36,0.4)]"></div>
              </div>
              
              {/* Logo text */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-blue-500 font-semibold text-base">
                Praetorian
              </span>
            </div>
          </div>
          
          {/* Premium copyright statement */}
          <p className="text-gray-400 text-sm relative group overflow-hidden">
            <span className="relative inline-block transition-transform duration-500 transform translate-y-0 group-hover:-translate-y-full">
              © {new Date().getFullYear()} Praetorian SmartCoat Solutions. All rights reserved.
            </span>
            <span className="absolute top-0 left-0 right-0 inline-block transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 text-gray-300">
              NASA-derived ceramic technology for maximum protection
            </span>
          </p>
          
          {/* Premium tagline with subtle animation */}
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400 text-xs mt-2 tracking-wide relative opacity-90 hover:opacity-100 transition-opacity duration-300">
            Enterprise-grade coating solutions for professional applications
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;