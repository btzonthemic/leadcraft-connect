import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Wrench, Info, BookOpen } from "lucide-react";
import { ListItem } from "./NavbarMenuItems";

export const NavbarMenu = () => {
  return (
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};