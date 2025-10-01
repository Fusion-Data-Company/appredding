import React, { createContext, useContext, useReducer, useEffect, ReactNode, useMemo } from 'react';
import praetorianProductsImg from '../assets_dir/images/optimized/praetorian-products-updated.webp';
import praetorianStuccoImg from '../assets_dir/images/optimized/praetorian-stucco.webp';

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
  baseProduct?: number;
  stockQuantity?: number;
}

export interface CartItem {
  productId: number;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  size: string;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: { items: CartItem[] } };

interface CartContextType extends CartState {
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const TAX_RATE = 0.0775; // California tax rate 7.75%
const SHIPPING_COST = 50;
const FREE_SHIPPING_THRESHOLD = 1000;
const MAX_QUANTITY_PER_ITEM = 99;
const CART_STORAGE_KEY = 'solar-cart';

const StoreContext = createContext<CartContextType | undefined>(undefined);

const productData: Product[] = [
  {
    id: 1,
    name: "Smart-Coat 1-gallon",
    price: 89.95,
    description: "Praetorian's flagship ceramic-based thermal protective coating in our convenient 1-gallon size. Perfect for smaller projects, repairs, and touch-ups. Features our proprietary NASA-derived ceramic technology offering superior heat reflection, UV protection, and extreme durability.",
    image: praetorianProductsImg,
    category: "Coating",
    size: "1-gallon",
    inStock: true,
    featured: true,
    rating: 4.9,
    stockQuantity: 50
  },
  {
    id: 2,
    name: "Smart-Coat 5-gallon",
    price: 449.95,
    description: "Our professional-grade Smart-Coat in commercial 5-gallon sizing. The industry-leading ceramic thermal barrier coating with documented thermal conductivity of 0.00543 W/cm²/K. Ideal for complete exterior applications, industrial facilities, and large commercial projects.",
    image: praetorianProductsImg,
    category: "Coating",
    size: "5-gallon",
    inStock: true,
    baseProduct: 1,
    rating: 4.9,
    stockQuantity: 30
  },
  {
    id: 3,
    name: "Stucco 1-gallon",
    price: 89.95,
    description: "Specialized ceramic-infused stucco formula in 1-gallon size. Engineered for textured surface applications with enhanced adhesion and flexibility (156% elasticity). Provides the perfect balance of protection and traditional stucco aesthetics for exterior walls.",
    image: praetorianStuccoImg,
    category: "Stucco",
    size: "1-gallon",
    inStock: true,
    rating: 4.8,
    stockQuantity: 45
  },
  {
    id: 4,
    name: "Stucco 5-gallon",
    price: 449.95,
    description: "Professional-grade ceramic stucco coating in 5-gallon container. Our advanced formula combines traditional stucco appearance with cutting-edge thermal protection. Ideal for complete building exteriors with Class A fire rating (0/0 scores) and ABS certification (#MC-1372).",
    image: praetorianStuccoImg,
    category: "Stucco",
    size: "5-gallon",
    inStock: true,
    baseProduct: 3,
    rating: 4.8,
    stockQuantity: 25
  }
];

const calculateCartTotals = (items: CartItem[]): Omit<CartState, 'items'> => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + tax + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, tax, shipping, total, itemCount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newItems: CartItem[];

  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productId === product.id);

      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        const newQuantity = Math.min(
          newItems[existingItemIndex].quantity + quantity,
          MAX_QUANTITY_PER_ITEM
        );
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newQuantity
        };
      } else {
        const cartItem: CartItem = {
          productId: product.id,
          sku: `${product.category.toUpperCase()}-${product.size.toUpperCase().replace('-', '')}`,
          name: product.name,
          price: product.price,
          quantity: Math.min(quantity, MAX_QUANTITY_PER_ITEM),
          image: product.image,
          category: product.category,
          size: product.size
        };
        newItems = [...state.items, cartItem];
      }

      const totals = calculateCartTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'REMOVE_FROM_CART': {
      newItems = state.items.filter(item => item.productId !== action.payload.productId);
      const totals = calculateCartTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        newItems = state.items.filter(item => item.productId !== productId);
      } else {
        newItems = state.items.map(item =>
          item.productId === productId
            ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY_PER_ITEM) }
            : item
        );
      }

      const totals = calculateCartTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'CLEAR_CART': {
      return {
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        itemCount: 0
      };
    }

    case 'LOAD_CART': {
      const totals = calculateCartTotals(action.payload.items);
      return { items: action.payload.items, ...totals };
    }

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  itemCount: 0
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (parsed.items && Array.isArray(parsed.items)) {
          dispatch({ type: 'LOAD_CART', payload: { items: parsed.items } });
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      const cartData = {
        items: state.items,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.items]);

  const addToCart = (product: Product, quantity: number) => {
    if (!product.inStock) {
      console.warn('Product is out of stock');
      return;
    }
    
    if (product.stockQuantity !== undefined) {
      const existingItem = state.items.find(item => item.productId === product.id);
      const currentQuantity = existingItem ? existingItem.quantity : 0;
      const totalQuantity = currentQuantity + quantity;
      
      if (totalQuantity > product.stockQuantity) {
        console.warn('Not enough stock available');
        return;
      }
    }

    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const contextValue: CartContextType = useMemo(() => ({
    products: productData,
    items: state.items,
    subtotal: state.subtotal,
    tax: state.tax,
    shipping: state.shipping,
    total: state.total,
    itemCount: state.itemCount,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartTotal: state.total,
    cartCount: state.itemCount
  }), [state]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
