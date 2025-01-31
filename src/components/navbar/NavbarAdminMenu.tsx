import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import {
  UserCog,
  LayoutDashboard,
  FileEdit,
  LogOut,
} from "lucide-react";
import { ListItem } from "./NavbarMenuItems";

export const NavbarAdminMenu = ({ user, onLogout }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      checkAdminStatus(user.id);
    }
  }, [user]);

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

  if (!isAdmin) return null;

  return (
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
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};