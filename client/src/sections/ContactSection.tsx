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
            {/* Premium card container for heading - extends behind title */}
            <div className="absolute -top-12 inset-x-0 h-60 bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-t-xl z-0">
              {/* Premium gradient border effect - top edges only */}
              <div className="absolute inset-0 rounded-t-xl bg-gradient-to-r from-orange-500/50 via-transparent to-red-500/50 opacity-70" style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)' }}></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-t-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Subtle ambient glow behind the heading */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r from-orange-500/0 via-amber-500/20 to-orange-500/0 blur-[100px] rounded-full"></div>
            </div>
            
            <div className="relative mb-8 flex justify-center w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-lg blur-lg opacity-30 dark:opacity-40 z-10"></div>
              <h2 
                className="relative z-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 font-extrabold tracking-tight py-2" 
                style={{ 
                  fontSize: '3.25rem',
                  textShadow: '0 1px 8px rgba(255,150,0,0.3)',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.02em'
                }}
              >
                Get In Touch
              </h2>
            </div>
            <div className="relative z-10 mb-8" style={{ marginTop: "-2.5rem" }}>
              <p className="text-gray-300 text-lg text-center max-w-xl mx-auto mb-2">
                Have questions about our products or services? Contact our team of coating experts for personalized assistance.
              </p>
              <div className="flex justify-center">
                <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full"></div>
              </div>
            </div>
            
            <form className="space-y-6 bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-xl p-8 border-0 relative shadow-[0_10px_50px_rgba(0,0,0,0.5)]" onSubmit={handleSubmit}>
              {/* Premium gradient border effect */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-red-500/30 to-orange-500/50 opacity-70"></div>
              
              {/* Animated corner accents - premium effect */}
              <div className="absolute top-0 left-0 w-16 h-16 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/40 to-red-600/30 rounded-tl-xl blur-[2px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/40 to-red-600/30 rounded-tr-xl blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-amber-500/40 rounded-bl-xl blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-tl from-red-600/30 to-amber-500/40 rounded-br-xl blur-[2px]"></div>
              </div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  {/* Premium Enterprise Label */}
                  <label htmlFor="firstName" className="relative flex items-center mb-2 group">
                    {/* Label text with premium styling */}
                    <span className="relative z-10 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
                      First Name
                    </span>
                    
                    {/* Animated dot indicator */}
                    <span className="ml-1 w-1 h-1 rounded-full bg-red-500 opacity-70 group-hover:w-1.5 group-hover:h-1.5 transition-all duration-300"></span>
                  </label>
                  
                  {/* Premium Enterprise Input Container */}
                  <div className="relative">
                    {/* Premium input field */}
                    <input 
                      type="text" 
                      id="firstName" 
                      className={`w-full dark:bg-gradient-to-br dark:from-gray-800/95 dark:via-gray-900/95 dark:to-gray-800/95 bg-gray-100/90 border ${formErrors.firstName ? 'border-red-500' : 'dark:border-gray-600/30 border-gray-300'} rounded-lg px-4 py-3 focus:outline-none dark:focus:border-amber-500/70 focus:border-amber-500 dark:text-white text-gray-800 relative z-10 transition-all duration-300 backdrop-blur-sm placeholder-gray-400/80`}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    
                    {/* Subtle focus effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-red-500/0 dark:group-focus-within:from-amber-500/20 dark:group-focus-within:to-red-500/20 opacity-0 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                </div>
                <div>
                  {/* Premium Enterprise Label */}
                  <label htmlFor="lastName" className="relative flex items-center mb-2 group">
                    {/* Label text with premium styling */}
                    <span className="relative z-10 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
                      Last Name
                    </span>
                    
                    {/* Animated dot indicator */}
                    <span className="ml-1 w-1 h-1 rounded-full bg-red-500 opacity-70 group-hover:w-1.5 group-hover:h-1.5 transition-all duration-300"></span>
                  </label>
                  
                  {/* Premium Enterprise Input Container */}
                  <div className="relative">
                    {/* Premium input field */}
                    <input 
                      type="text" 
                      id="lastName" 
                      className={`w-full dark:bg-gradient-to-br dark:from-gray-800/95 dark:via-gray-900/95 dark:to-gray-800/95 bg-gray-100/90 border ${formErrors.lastName ? 'border-red-500' : 'dark:border-gray-600/30 border-gray-300'} rounded-lg px-4 py-3 focus:outline-none dark:focus:border-amber-500/70 focus:border-amber-500 dark:text-white text-gray-800 relative z-10 transition-all duration-300 backdrop-blur-sm placeholder-gray-400/80`}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                    
                    {/* Subtle focus effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-red-500/0 dark:group-focus-within:from-amber-500/20 dark:group-focus-within:to-red-500/20 opacity-0 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                </div>
              </div>
              
              {/* Premium Enterprise Email Field */}
              <div className="group">
                {/* Premium Enterprise Label */}
                <label htmlFor="email" className="relative flex items-center mb-2 group">
                  {/* Label text with premium styling */}
                  <span className="relative z-10 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
                    Email Address
                  </span>
                  
                  {/* Animated dot indicator */}
                  <span className="ml-1 w-1 h-1 rounded-full bg-red-500 opacity-70 group-hover:w-1.5 group-hover:h-1.5 transition-all duration-300"></span>
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
                    className={`w-full dark:bg-gradient-to-br dark:from-gray-800/95 dark:via-gray-900/95 dark:to-gray-800/95 bg-gray-100/90 border ${formErrors.email ? 'border-red-500' : 'dark:border-gray-600/30 border-gray-300'} rounded-lg pl-10 pr-4 py-3 focus:outline-none dark:focus:border-amber-500/70 focus:border-amber-500 dark:text-white text-gray-800 relative z-10 transition-all duration-300 backdrop-blur-sm placeholder-gray-400/80`}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  
                  {/* Premium glow effect on focus */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-red-500/0 dark:group-focus-within:from-amber-500/20 dark:group-focus-within:to-red-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-amber-500/0 to-red-500/0 group-focus-within:from-amber-500/10 group-focus-within:to-red-500/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                {/* Error message with enhanced styling */}
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
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
                  <span className="relative z-10 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
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
                    className="w-full dark:bg-gradient-to-br dark:from-gray-800/95 dark:via-gray-900/95 dark:to-gray-800/95 bg-gray-100/90 border dark:border-gray-600/30 border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none dark:focus:border-amber-500/70 focus:border-amber-500 dark:text-white text-gray-800 relative z-10 transition-all duration-300 backdrop-blur-sm placeholder-gray-400/80"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(000) 000-0000"
                  />
                  
                  {/* Premium glow effect on focus */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-red-500/0 dark:group-focus-within:from-amber-500/20 dark:group-focus-within:to-red-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-amber-500/0 to-red-500/0 group-focus-within:from-amber-500/10 group-focus-within:to-red-500/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                {/* Helper text */}
                <p className="text-gray-500/70 text-xs mt-1 ml-1">
                  <i className="fas fa-shield-alt mr-1 text-amber-500/70"></i>
                  Your privacy is protected, we never share your information
                </p>
              </div>
              
              {/* Premium Enterprise Interest Selector */}
              <div className="group">
                {/* Premium Enterprise Label */}
                <label htmlFor="interest" className="relative flex items-center mb-2 group">
                  {/* Label text with premium styling */}
                  <span className="relative z-10 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
                    I'm interested in
                  </span>
                  
                  {/* Animated dot indicator */}
                  <span className="ml-1 w-1 h-1 rounded-full bg-red-500 opacity-70 group-hover:w-1.5 group-hover:h-1.5 transition-all duration-300"></span>
                </label>
                
                {/* Premium Enterprise Select Container */}
                <div className="relative">
                  {/* Premium select field with icon */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-gray-400">
                    <i className="fas fa-tag text-sm opacity-70"></i>
                  </div>
                  
                  {/* Custom select container for premium styling */}
                  <div className="relative">
                    <select 
                      id="interest" 
                      className="w-full dark:bg-gradient-to-br dark:from-gray-800/95 dark:via-gray-900/95 dark:to-gray-800/95 bg-gray-100/90 border dark:border-gray-600/30 border-gray-300 rounded-lg pl-10 pr-10 py-3 focus:outline-none dark:focus:border-amber-500/70 focus:border-amber-500 dark:text-white text-gray-800 relative z-10 transition-all duration-300 backdrop-blur-sm appearance-none"
                      value={formData.interest}
                      onChange={handleSelectChange}
                      required
                    >
                      <option value="" disabled className="dark:bg-gray-900 bg-gray-100">Select your interest</option>
                      <option value="wildfire" className="dark:bg-gray-900 bg-gray-100">Wildfire Protection</option>
                      <option value="marine" className="dark:bg-gray-900 bg-gray-100">Marine Applications</option>
                      <option value="pool" className="dark:bg-gray-900 bg-gray-100">Pool Coatings</option>
                      <option value="construction" className="dark:bg-gray-900 bg-gray-100">Construction</option>
                      <option value="painter" className="dark:bg-gray-900 bg-gray-100">Becoming a Certified Painter</option>
                      <option value="other" className="dark:bg-gray-900 bg-gray-100">Other</option>
                    </select>
                    
                    {/* Custom dropdown arrow for enhanced styling */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 pointer-events-none">
                      <i className="fas fa-chevron-down"></i>
                    </div>
                    
                    {/* Animated glow effect on focus */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-red-500/0 dark:group-focus-within:from-amber-500/10 dark:group-focus-within:to-red-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  {/* Enhanced hover effect */}
                  <div className="absolute inset-0 rounded-lg dark:bg-gradient-to-r dark:from-amber-500/5 dark:to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              {/* Premium Enterprise Message Field */}
              <div className="group">
                {/* Premium Enterprise Label */}
                <label htmlFor="message" className="relative flex items-center mb-2 group">
                  {/* Label text with premium styling */}
                  <span className="relative z-10 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
                    Message
                  </span>
                  
                  {/* Animated dot indicator */}
                  <span className="ml-1 w-1 h-1 rounded-full bg-red-500 opacity-70 group-hover:w-1.5 group-hover:h-1.5 transition-all duration-300"></span>
                </label>
                
                {/* Premium Enterprise Textarea Container */}
                <div className="relative">
                  {/* Premium message icon */}
                  <div className="absolute left-4 top-4 z-20 text-gray-400">
                    <i className="fas fa-comment-alt text-sm opacity-70"></i>
                  </div>
                  
                  {/* Premium textarea field with advanced styling */}
                  <div className="relative">
                    <textarea 
                      id="message" 
                      rows={5} 
                      className="w-full dark:bg-gradient-to-br dark:from-gray-800/95 dark:via-gray-900/95 dark:to-gray-800/95 bg-gray-100/90 border dark:border-gray-600/30 border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none dark:focus:border-amber-500/70 focus:border-amber-500 dark:text-white text-gray-800 relative z-10 transition-all duration-300 backdrop-blur-sm resize-none"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us about your project needs..."
                    ></textarea>
                    
                    {/* Character counter */}
                    <div className="absolute bottom-2 right-3 text-xs text-gray-500 opacity-70">
                      {formData.message?.length || 0}/500
                    </div>
                    
                    {/* Premium glow effect on focus */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-red-500/0 dark:group-focus-within:from-amber-500/20 dark:group-focus-within:to-red-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-amber-500/0 to-red-500/0 group-focus-within:from-amber-500/30 group-focus-within:to-red-500/30 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced hover effect */}
                  <div className="absolute inset-0 rounded-lg dark:bg-gradient-to-r dark:from-amber-500/5 dark:to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Helper text */}
                <p className="text-gray-500/70 text-xs mt-1 ml-1 flex items-center">
                  <i className="fas fa-lightbulb mr-1 text-amber-500/70"></i>
                  Be specific about your needs for a more detailed response
                </p>
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
              <div className="absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r from-blue-500/50 via-cyan-400/30 to-blue-500/50 opacity-70"></div>
              
              {/* Animated corner accents - premium effect (blue variant) */}
              <div className="absolute top-0 left-0 w-16 h-16 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-cyan-600/30 rounded-tl-xl blur-[2px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/40 to-cyan-600/30 rounded-tr-xl blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/30 to-blue-500/40 rounded-bl-xl blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-tl from-cyan-600/30 to-blue-500/40 rounded-br-xl blur-[2px]"></div>
              </div>
              
              {/* Subtle top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              
              {/* Fire effect border top - enhanced */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 animate-pulse z-10" style={{ animationDuration: '3s' }}></div>
              
              {/* Water effect border bottom - enhanced */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 animate-pulse z-10" style={{ animationDuration: '4s' }}></div>
              
              {/* Premium glassmorphism effect - enhanced */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 dark:from-white/5 dark:via-transparent dark:to-white/5"></div>
              
              {/* Premium card container for heading - stretching from top */}
              <div className="absolute -top-12 inset-x-0 h-60 bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-t-xl z-0">
                {/* Premium gradient border effect - top edges only */}
                <div className="absolute inset-0 rounded-t-xl bg-gradient-to-r from-blue-500/50 via-transparent to-cyan-400/50 opacity-70" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)' }}></div>
                
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-t-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                
                {/* Subtle ambient glow behind the heading */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 blur-[100px] rounded-full"></div>
              </div>
              
              <div className="p-8 relative z-20">
                <div className="relative mb-8 flex justify-center w-full">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-lg blur-lg opacity-30 dark:opacity-40"></div>
                  <h2 
                    className="relative z-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 font-extrabold tracking-tight py-2" 
                    style={{ 
                      fontSize: '3.25rem',
                      textShadow: '0 1px 8px rgba(0,150,255,0.3)',
                      marginBottom: '1.5rem',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Contact Information
                  </h2>
                </div>
                <div className="relative z-10 mb-8" style={{ marginTop: "-2.5rem" }}>
                  <p className="text-gray-300 text-lg text-center max-w-xl mx-auto mb-2">
                    Reach out to our team through any of these channels for inquiries, support, or partnership opportunities.
                  </p>
                  <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {/* Premium Enterprise Contact Item - Location */}
                  <div className="group relative transform transition-all duration-500 hover:scale-[1.02] hover:z-10 rounded-xl p-4 hover:bg-gradient-to-r hover:from-orange-900/10 hover:via-transparent hover:to-orange-700/10">
                    <div className="flex items-start">
                      {/* Premium Enterprise Icon Container */}
                      <div className="relative flex-shrink-0">
                        {/* Premium Icon Container */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-4 mr-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 group-hover:scale-110 transition-transform duration-500">
                          {/* Premium gradient border effect - Fire variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-orange-500/60 via-red-500/60 to-red-600/60 opacity-70"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(251,113,36,0.6)]"></div>
                          
                          {/* Icon */}
                          <i className="fas fa-map-marker-alt text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-10"></i>
                          
                          {/* Animated concentric ring for enterprise effect */}
                          <div className="absolute inset-0 rounded-full border border-orange-500/20 scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-700"></div>
                        </div>
                        
                        {/* Bottom reflection */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                      
                      {/* Premium Content */}
                      <div>
                        {/* Enhanced title with animated underline */}
                        <div className="relative mb-3 pb-2">
                          <h4 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Serving</h4>
                          
                          {/* Animated underline */}
                          <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-1/2 transition-all duration-700 rounded-full opacity-70"></div>
                        </div>
                        
                        {/* Enhanced content text */}
                        <p className="text-gray-300 text-[15px] group-hover:text-gray-200 transition-colors duration-500">
                          Northern California<br/>& Nationwide Distribution
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Premium Enterprise Contact Item - Phone */}
                  <div className="group relative transform transition-all duration-500 hover:scale-[1.02] hover:z-10 rounded-xl p-4 hover:bg-gradient-to-r hover:from-orange-900/10 hover:via-transparent hover:to-amber-700/10">
                    <div className="flex items-start">
                      {/* Premium Enterprise Icon Container */}
                      <div className="relative flex-shrink-0">
                        {/* Premium Icon Container */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-4 mr-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 group-hover:scale-110 transition-transform duration-500">
                          {/* Premium gradient border effect - Amber variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-amber-500/60 via-orange-500/60 to-amber-600/60 opacity-70"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(245,158,11,0.6)]"></div>
                          
                          {/* Icon */}
                          <i className="fas fa-phone-alt text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-10"></i>
                          
                          {/* Animated concentric ring for enterprise effect */}
                          <div className="absolute inset-0 rounded-full border border-amber-500/20 scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-700"></div>
                        </div>
                        
                        {/* Bottom reflection */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                      
                      {/* Premium Content */}
                      <div>
                        {/* Enhanced title with animated underline */}
                        <div className="relative mb-3 pb-2">
                          <h4 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Phone</h4>
                          
                          {/* Animated underline */}
                          <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-1/2 transition-all duration-700 rounded-full opacity-70"></div>
                        </div>
                        
                        {/* Enhanced content text */}
                        <p className="text-gray-300 text-[15px] group-hover:text-gray-200 transition-colors duration-500">
                          (916) 809-6619<br/>
                          <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-500">(Call or text welcome)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Premium Enterprise Contact Item - Email */}
                  <div className="group relative transform transition-all duration-500 hover:scale-[1.02] hover:z-10 rounded-xl p-4 hover:bg-gradient-to-r hover:from-blue-900/10 hover:via-transparent hover:to-cyan-700/10">
                    <div className="flex items-start">
                      {/* Premium Enterprise Icon Container */}
                      <div className="relative flex-shrink-0">
                        {/* Premium Icon Container */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-4 mr-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 group-hover:scale-110 transition-transform duration-500">
                          {/* Premium gradient border effect - Blue variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-blue-500/60 via-cyan-400/60 to-blue-600/60 opacity-70"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
                          
                          {/* Icon */}
                          <i className="fas fa-envelope text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-10"></i>
                          
                          {/* Animated concentric ring for enterprise effect */}
                          <div className="absolute inset-0 rounded-full border border-blue-500/20 scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-700"></div>
                        </div>
                        
                        {/* Bottom reflection */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                      
                      {/* Premium Content */}
                      <div>
                        {/* Enhanced title with animated underline */}
                        <div className="relative mb-3 pb-2">
                          <h4 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Email</h4>
                          
                          {/* Animated underline */}
                          <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-1/2 transition-all duration-700 rounded-full opacity-70"></div>
                        </div>
                        
                        {/* Enhanced content text with premium email links */}
                        <p className="text-gray-300 text-[15px]">
                          <a 
                            href="mailto:info@praetoriansmartcoat.com" 
                            className="relative inline-block group-hover:text-gray-200 transition-colors duration-500"
                          >
                            <span className="relative z-10">info@praetoriansmartcoat.com</span>
                            {/* Animated underline for link */}
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-700"></span>
                          </a>
                          <br/>
                          <a 
                            href="mailto:rob@praetoriansmartcoat.com" 
                            className="relative inline-block group-hover:text-gray-200 transition-colors duration-500"
                          >
                            <span className="relative z-10">rob@praetoriansmartcoat.com</span>
                            {/* Animated underline for link */}
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-700"></span>
                          </a>
                          <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-500 ml-1">(Management)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Premium Enterprise Contact Item - Response Time */}
                  <div className="group relative transform transition-all duration-500 hover:scale-[1.02] hover:z-10 rounded-xl p-4 hover:bg-gradient-to-r hover:from-orange-900/10 hover:via-transparent hover:to-blue-700/10">
                    <div className="flex items-start">
                      {/* Premium Enterprise Icon Container */}
                      <div className="relative flex-shrink-0">
                        {/* Premium Icon Container */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-4 mr-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 group-hover:scale-110 transition-transform duration-500">
                          {/* Premium gradient border effect - Purple variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-orange-500/60 via-amber-400/60 to-blue-600/60 opacity-70"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(99,102,241,0.6)]"></div>
                          
                          {/* Icon */}
                          <i className="fas fa-clock text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-blue-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-10"></i>
                          
                          {/* Animated concentric ring for enterprise effect */}
                          <div className="absolute inset-0 rounded-full border border-orange-500/20 scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-700"></div>
                        </div>
                        
                        {/* Bottom reflection */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                      
                      {/* Premium Content */}
                      <div>
                        {/* Enhanced title with animated underline */}
                        <div className="relative mb-3 pb-2">
                          <h4 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-blue-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Response Time</h4>
                          
                          {/* Animated underline */}
                          <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-1/2 transition-all duration-700 rounded-full opacity-70"></div>
                        </div>
                        
                        {/* Enhanced content text with premium styling */}
                        <p className="text-gray-300 text-[15px] group-hover:text-gray-200 transition-colors duration-500">
                          <span className="inline-flex items-center">
                            <span className="opacity-90 group-hover:opacity-100 transition-opacity duration-300">Monday-Friday:</span>
                            <span className="ml-1 text-amber-300 group-hover:text-amber-200 transition-colors duration-300">Same day</span>
                          </span>
                          <br/>
                          <span className="inline-flex items-center">
                            <span className="opacity-90 group-hover:opacity-100 transition-opacity duration-300">Weekends:</span>
                            <span className="ml-1 text-amber-300 group-hover:text-amber-200 transition-colors duration-300">Within 24 hours</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Premium Enterprise Connect With Us Section */}
                <div className="relative mt-[2rem] mb-14">
                  {/* Premium Enterprise Heading Container */}
                  <div className="relative mb-10 flex justify-center w-full">
                    {/* Ambient glow behind heading */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-amber-500/20 rounded-lg blur-lg opacity-30"></div>
                    
                    {/* Premium heading with enhanced styling */}
                    <div className="relative z-10 inline-block" style={{ position: 'relative', top: '60px' }}>
                      <h4 className="font-bold text-xl relative bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 inline-block">
                        Connect With Us
                        
                        {/* Animated underline */}
                        <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-700 rounded-full opacity-70"></div>
                      </h4>
                    </div>
                  </div>
                  
                  {/* Premium Enterprise Social Icons Container */}
                  <div className="mt-14 pt-6 border-t border-gray-800/30 relative">
                    {/* Ambient glow behind icons */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/5 via-blue-500/5 to-red-500/5 blur-[50px] opacity-50"></div>
                    
                    <div className="flex space-x-6 inline-flex justify-center ml-10" style={{position: "relative", zIndex: 55}}>
                      {/* Facebook Icon - Premium Enterprise Styling */}
                      <a 
                        href="https://facebook.com/praetoriansmartcoat" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        {/* Premium Icon Container */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-full w-16 h-16 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-55 group-hover:scale-110 transition-transform duration-500">
                          {/* Premium gradient border effect - Blue variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-blue-500/50 via-transparent to-blue-600/50 opacity-70"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
                          
                          {/* Icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-40 transition-all duration-300">
                            <path fill="currentColor" d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                          </svg>
                          
                          {/* Animated concentric ring for enterprise effect */}
                          <div className="absolute inset-0 rounded-full border border-blue-500/20 scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-700"></div>
                        </div>
                        
                        {/* Subtle bottom reflection */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </a>
                      
                      {/* YouTube Icon - Premium Enterprise Styling */}
                      <a 
                        href="https://youtube.com/@praetoriansmartcoat"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        {/* Premium Icon Container */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-full w-16 h-16 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-30 group-hover:scale-110 transition-transform duration-500">
                          {/* Premium gradient border effect - Red variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-red-500/50 via-transparent to-red-600/50 opacity-70"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(220,38,38,0.6)]"></div>
                          
                          {/* Icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-40 transition-all duration-300">
                            <path fill="currentColor" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                          </svg>
                          
                          {/* Animated concentric ring for enterprise effect */}
                          <div className="absolute inset-0 rounded-full border border-red-500/20 scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-700"></div>
                        </div>
                        
                        {/* Subtle bottom reflection */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </a>
                      
                      {/* LinkedIn Icon - Premium Enterprise Styling */}
                      <a 
                        href="https://linkedin.com/company/praetorian-smartcoat" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        {/* Premium Icon Container */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-full w-16 h-16 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-30 group-hover:scale-110 transition-transform duration-500">
                          {/* Premium gradient border effect - LinkedIn variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-blue-600/50 via-transparent to-blue-800/50 opacity-70"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(37,99,235,0.6)]"></div>
                          
                          {/* Icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-40 transition-all duration-300">
                            <path fill="currentColor" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                          </svg>
                          
                          {/* Animated concentric ring for enterprise effect */}
                          <div className="absolute inset-0 rounded-full border border-blue-700/20 scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-700"></div>
                        </div>
                        
                        {/* Subtle bottom reflection */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-blue-700/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </a>
                      
                      {/* Instagram Icon - Premium Enterprise Styling */}
                      <a 
                        href="https://instagram.com/praetoriansmartcoat"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        {/* Premium Icon Container */}
                        <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-full w-16 h-16 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-30 group-hover:scale-110 transition-transform duration-500">
                          {/* Premium gradient border effect - Instagram gradient variant */}
                          <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-orange-500/50 via-amber-500/50 to-blue-500/50 opacity-70"></div>
                          
                          {/* Inner highlight */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(236,72,153,0.6)]"></div>
                          
                          {/* Icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-blue-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-40 transition-all duration-300">
                            <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          
                          {/* Animated concentric ring for enterprise effect */}
                          <div className="absolute inset-0 rounded-full border border-pink-500/20 scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-700"></div>
                        </div>
                        
                        {/* Subtle bottom reflection */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-pink-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
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
                  <i className="fas fa-shield-alt text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 text-sm"></i>
                </div>
                
                {/* Subtle light effect */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(251,113,36,0.4)]"></div>
              </div>
              
              {/* Logo text */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 font-semibold text-base">
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
