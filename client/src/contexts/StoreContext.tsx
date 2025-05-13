import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  size: '1-gallon' | '5-gallon';
  inStock: boolean;
  featured?: boolean;
  rating?: number;
  baseProduct?: number; // For 5-gallon versions to reference their 1-gallon counterpart
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

// Create the context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Define our actual product data
const productData: Product[] = [
  {
    id: 1,
    name: "Smart-Coat 1-gallon",
    price: 89.95,
    description: "Praetorian's flagship ceramic-based thermal protective coating in our convenient 1-gallon size. Perfect for smaller projects, repairs, and touch-ups. Features our proprietary NASA-derived ceramic technology offering superior heat reflection, UV protection, and extreme durability.",
    image: "/src/assets_dir/images/praetorian-bucket-new.png",
    category: "Coating",
    size: "1-gallon",
    inStock: true,
    featured: true,
    rating: 4.9
  },
  {
    id: 2,
    name: "Smart-Coat 5-gallon",
    price: 449.95,
    description: "Our professional-grade Smart-Coat in commercial 5-gallon sizing. The industry-leading ceramic thermal barrier coating with documented thermal conductivity of 0.00543 W/cm²/K. Ideal for complete exterior applications, industrial facilities, and large commercial projects.",
    image: "/src/assets_dir/images/praetorian-bucket-new.png",
    category: "Coating",
    size: "5-gallon",
    inStock: true,
    baseProduct: 1,
    rating: 4.9
  },
  {
    id: 3,
    name: "Stucco 1-gallon",
    price: 89.95,
    description: "Specialized ceramic-infused stucco formula in 1-gallon size. Engineered for textured surface applications with enhanced adhesion and flexibility (156% elasticity). Provides the perfect balance of protection and traditional stucco aesthetics for exterior walls.",
    image: "/src/assets_dir/images/praetorian-bucket-new.png",
    category: "Stucco",
    size: "1-gallon",
    inStock: true,
    rating: 4.8
  },
  {
    id: 4,
    name: "Stucco 5-gallon",
    price: 449.95,
    description: "Professional-grade ceramic stucco coating in 5-gallon container. Our advanced formula combines traditional stucco appearance with cutting-edge thermal protection. Ideal for complete building exteriors with Class A fire rating (0/0 scores) and ABS certification (#MC-1372).",
    image: "/src/assets_dir/images/praetorian-bucket-new.png",
    category: "Stucco",
    size: "5-gallon",
    inStock: true,
    baseProduct: 3,
    rating: 4.8
  }
];

// Create the provider component
export const StoreProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [products] = useState<Product[]>(productData);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('praetorianCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart', error);
        localStorage.removeItem('praetorianCart');
      }
    }
  }, []);
  
  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('praetorianCart', JSON.stringify(cart));
    
    // Calculate totals
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [cart]);

  // Add item to cart
  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity if product already in cart
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  // Update item quantity
  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the store context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};