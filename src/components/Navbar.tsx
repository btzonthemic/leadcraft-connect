import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Wrench, 
  Info, 
  BookOpen, 
  LogIn,
  Settings,
  LayoutDashboard,
  FileEdit,
  LogOut
} from "lucide-react";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className={cn("fixed top-4 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive} className="backdrop-blur-sm bg-white/75 dark:bg-black/75 border border-black/10">
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            <span>Services</span>
          </div>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/heat-pump-installation">Heat Pump Installation</HoveredLink>
            <HoveredLink to="/plumbing-services">Plumbing Services</HoveredLink>
            <HoveredLink to="/electrical-services">Electrical Services</HoveredLink>
            <HoveredLink to="/heating-services">Heating Services</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>About</span>
          </div>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/about">About Us</HoveredLink>
            <HoveredLink to="/contact">Contact</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Resources">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Resources</span>
          </div>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/grants">Available Grants</HoveredLink>
            <HoveredLink to="/faqs">FAQs</HoveredLink>
            <HoveredLink to="/blog">Blog</HoveredLink>
          </div>
        </MenuItem>
        {user ? (
          <>
            <MenuItem setActive={setActive} active={active} item="Admin">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Admin</span>
              </div>
              <div className="flex flex-col space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <HoveredLink to="/admin/dashboard">Dashboard</HoveredLink>
                </div>
                <div className="flex items-center gap-2">
                  <FileEdit className="w-4 h-4" />
                  <HoveredLink to="/admin/blog">Manage Blog</HoveredLink>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-left hover:bg-transparent hover:text-primary flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </MenuItem>
          </>
        ) : (
          <Button 
            variant="ghost" 
            className="ml-4 flex items-center gap-2"
            onClick={handleLogin}
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </Button>
        )}
      </Menu>
    </div>
  );
}