import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  Wrench, 
  Info, 
  BookOpen, 
  LogIn,
  Settings,
  LayoutDashboard,
  FileEdit,
  LogOut,
  UserCog
} from "lucide-react";

export function Navbar({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Could not verify admin status",
          variant: "destructive",
        });
        setIsAdmin(false);
        return;
      }

      // If no profile exists, create one with default role 'user'
      if (!profile) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: userId, role: 'user' }]);

        if (insertError) {
          console.error('Error creating profile:', insertError);
          setIsAdmin(false);
          return;
        }
        setIsAdmin(false);
        return;
      }

      setIsAdmin(profile?.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin/dashboard`
        }
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Failed to initiate login",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  // ... keep existing code (JSX for navigation menu items)

  return (
    <div className={cn("fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b", className)}>
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-8 flex items-center space-x-2">
          <span className="font-bold">Your Logo</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Wrench className="w-4 h-4 mr-2" />
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        to="/heat-pump-installation"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Heat Pump Installation
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Professional heat pump installation services
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem to="/plumbing-services" title="Plumbing Services">
                    Expert plumbing solutions for your home
                  </ListItem>
                  <ListItem to="/electrical-services" title="Electrical Services">
                    Complete electrical installation and maintenance
                  </ListItem>
                  <ListItem to="/heating-services" title="Heating Services">
                    Comprehensive heating system solutions
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Info className="w-4 h-4 mr-2" />
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-3 p-4">
                  <ListItem to="/about" title="About Us">
                    Learn more about our company
                  </ListItem>
                  <ListItem to="/contact" title="Contact">
                    Get in touch with us
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <BookOpen className="w-4 h-4 mr-2" />
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-3 p-4">
                  <ListItem to="/grants" title="Available Grants">
                    Find available funding options
                  </ListItem>
                  <ListItem to="/faqs" title="FAQs">
                    Common questions answered
                  </ListItem>
                  <ListItem to="/blog" title="Blog">
                    Latest news and updates
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {user && isAdmin && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <UserCog className="w-4 h-4 mr-2" />
                  Admin
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <ListItem to="/admin/dashboard" title="Dashboard">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </ListItem>
                    <ListItem to="/admin/blog" title="Manage Blog">
                      <FileEdit className="w-4 h-4 mr-2" />
                      Blog Management
                    </ListItem>
                    <li>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto">
          {!user && (
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={handleLogin}
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { to: string; title: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as any}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          to={to}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
