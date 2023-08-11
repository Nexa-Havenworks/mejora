import { Button } from "@/components/ui/button";
import Link from "next/link";

const menuLinks = ["Home", "Profile", "Governance", "Become a Mentor"];

export const NavBar = () => {
  return (
    <nav>
      <div className="flex justify-between items-baseline">
        <ul className="flex space-x-8">
          {menuLinks.map((link) => {
            return (
              <li key={link}>
                <Link href="#">{link}</Link>
              </li>
            );
          })}
        </ul>
        <div className="flex">
          <Button
            className="text-base text-[#4542B2] font-semibold"
            variant="ghost"
          >
            Sign up
          </Button>
          <Button className="text-base rounded-full px-8 text-white bg-[#4542B2] font-semibold items-baseline">
            Connect
          </Button>
        </div>
      </div>
    </nav>
  );
};
