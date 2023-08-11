import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export const HeroSearch = () => {
  return (
    <div className="flex flex-row items-center border-2 bg-white rounded-full px-2 py-1">
      <MagnifyingGlassIcon className="ml-1 h-8 w-8" />
      <Input
        className="flex-grow bg-transparent border-none focus-visible:ring-offset-transparent focus-visible:ring-0 focus-visible:ring-transparent placeholder:text-[#A3A3A3]"
        placeholder="Search by community, role, or keyword"
        type="text"
      />
      <Button className="text-base rounded-full px-8 text-white bg-[#4542B2] font-semibold m-0.5">
        Search
      </Button>
    </div>
  );
};
