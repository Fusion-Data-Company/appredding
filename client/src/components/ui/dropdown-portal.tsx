import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

// Define the portal component that will be rendered at the root level
export const DropdownPortal = ({ 
  children, 
  isOpen,
  anchorRect
}: { 
  children: ReactNode;
  isOpen: boolean;
  anchorRect: DOMRect | null;
}) => {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  // Create portal node on mount
  useEffect(() => {
    // Check if portal container exists, create if not
    let node = document.getElementById('dropdown-portal-container');
    if (!node) {
      node = document.createElement('div');
      node.id = 'dropdown-portal-container';
      node.style.position = 'fixed';
      node.style.top = '0';
      node.style.left = '0';
      node.style.width = '100%';
      node.style.height = '100%';
      node.style.pointerEvents = 'none';
      node.style.zIndex = '2147483647'; // Maximum z-index
      document.body.appendChild(node);
    }
    
    setPortalNode(node);
    
    // Cleanup on unmount
    return () => {
      // Don't remove the container as other menus might be using it
    };
  }, []);

  if (!portalNode || !isOpen || !anchorRect) return null;

  // Calculate position
  const top = anchorRect.bottom + 8; // 8px below the anchor
  const left = anchorRect.left + (anchorRect.width / 2);

  return createPortal(
    <div
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        transform: 'translateX(-50%)',
        pointerEvents: 'auto',
        maxHeight: 'calc(100vh - ' + (top + 20) + 'px)', // Ensure it doesn't go off-screen
        overflow: 'visible',
        zIndex: 2147483647 // Maximum z-index
      }}
    >
      {/* Premium dropdown animation with subtle glow effects */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative bg-gradient-to-b from-[#080c14]/95 to-black/95 backdrop-blur-xl 
                  rounded-lg overflow-auto border border-blue-900/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
        style={{ 
          width: 'auto', 
          maxWidth: '550px',
          maxHeight: 'calc(100vh - ' + (top + 40) + 'px)', // Make sure dropdown doesn't exceed viewport
          overflowX: 'hidden' // Prevent horizontal scrolling
        }}
      >
        {/* Premium accent lines and glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top accent line */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
          
          {/* Left accent line */}
          <div className="absolute top-[10%] bottom-[10%] left-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
          
          {/* Right accent line */}
          <div className="absolute top-[10%] bottom-[10%] right-0 w-px bg-gradient-to-b from-transparent via-orange-500/20 to-transparent"></div>
          
          {/* Ambient glow effects */}
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-blue-600/5 rounded-full filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-orange-600/5 rounded-full filter blur-3xl opacity-50"></div>
        </div>
        
        {/* Connection area for better UX when moving mouse */}
        <div className="p-2 absolute w-full h-4 top-[-16px]">
          <div className="w-full h-full" />
        </div>
        
        {/* Subtle triangle indicator pointing to the menu item */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-[#080c14] border-l border-t border-blue-900/30"></div>
        
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>,
    portalNode
  );
};