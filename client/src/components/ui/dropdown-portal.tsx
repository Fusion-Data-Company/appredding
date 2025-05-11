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
  const top = anchorRect.bottom + 16; // 16px below the anchor
  const left = anchorRect.left + (anchorRect.width / 2);

  return createPortal(
    <div
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        transform: 'translateX(-50%)',
        pointerEvents: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-black/95 backdrop-blur-sm rounded-md overflow-hidden border border-white/[0.2] shadow-xl"
      >
        {children}
      </motion.div>
    </div>,
    portalNode
  );
};