import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu-fixed";

// Images for various products/solutions
const productImages = {
  marinas: "/src/assets_dir/images/marinas-thumb.jpg",
  pools: "/src/assets_dir/images/pools-thumb.jpg",
  firePrevention: "/src/assets_dir/images/fire-prevention-thumb.jpg", 
  construction: "/src/assets_dir/images/construction-thumb.jpg",
  painterNetwork: "/src/assets_dir/images/painter-thumb.jpg",
  mobileHome: "/src/assets_dir/images/mobile-home-thumb.jpg",
  municipality: "/src/assets_dir/images/municipality-thumb.jpg"
};

export function PremiumNavbar() {
  const [active, setActive] = useState<string | null>(null);
  
  return (
    <div className="flex-grow flex justify-end" style={{ zIndex: 2147483646, position: 'relative' }}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Solutions">
          <div className="grid grid-cols-2 gap-6 p-4">
            <ProductItem
              title="Marinas"
              href="/marinas"
              src={productImages.marinas}
              description="Advanced coating solutions for marine environments"
            />
            <ProductItem
              title="Pools"
              href="/pools"
              src={productImages.pools}
              description="Premium pool coating and protection systems"
            />
            <ProductItem
              title="Fire Prevention"
              href="/fire-prevention"
              src={productImages.firePrevention}
              description="Industry-leading fire retardant coatings"
            />
            <ProductItem
              title="Construction"
              href="/construction"
              src={productImages.construction}
              description="Durable solutions for construction applications"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Professionals">
          <div className="grid grid-cols-2 gap-6 p-4">
            <ProductItem
              title="Painter Network"
              href="/painter-network"
              src={productImages.painterNetwork}
              description="Join our elite network of certified painters"
            />
            <ProductItem
              title="Mobile Home & R.V."
              href="/mobile-home"
              src={productImages.mobileHome}
              description="Specialized coatings for mobile structures"
            />
            <ProductItem
              title="Municipality"
              href="/municipality"
              src={productImages.municipality}
              description="Infrastructure protection for public services"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="flex flex-col space-y-3 text-sm">
            <HoveredLink href="/products">All Products</HoveredLink>
            <HoveredLink href="/technology">Technical Data</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-3 text-sm">
            <HoveredLink href="/about">About Us</HoveredLink>
            <HoveredLink href="/contact">Contact</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="CRM">
          <div className="flex flex-col space-y-3 text-sm">
            <HoveredLink href="/crm">CRM Dashboard</HoveredLink>
            <HoveredLink href="/inventory">Inventory Management</HoveredLink>
            <HoveredLink href="/crm-login">Admin Login</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}