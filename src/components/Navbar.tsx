import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavbarAuth } from "./navbar/NavbarAuth";
import { NavbarMenu } from "./navbar/NavbarMenu";
import { NavbarAdminMenu } from "./navbar/NavbarAdminMenu";

export function Navbar({ className }: { className?: string }) {
  return (
    <div className={cn("fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b", className)}>
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-8 flex items-center space-x-2">
          <span className="font-bold">Your Logo</span>
        </Link>
        <NavbarMenu />
        <NavbarAuth />
      </div>
    </div>
  );
}