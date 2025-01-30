import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("fixed top-4 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/heat-pump-installation">Heat Pump Installation</HoveredLink>
            <HoveredLink to="/plumbing-services">Plumbing Services</HoveredLink>
            <HoveredLink to="/electrical-services">Electrical Services</HoveredLink>
            <HoveredLink to="/heating-services">Heating Services</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/about">About Us</HoveredLink>
            <HoveredLink to="/contact">Contact</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Resources">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/grants">Available Grants</HoveredLink>
            <HoveredLink to="/faqs">FAQs</HoveredLink>
            <HoveredLink to="/blog">Blog</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}