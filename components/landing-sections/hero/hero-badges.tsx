import { Badge } from "@/components/ui/badge";

const badges = [
  "Relationship",
  "Personal development",
  "Web3",
  "Frontend",
  "Soft skills",
  "UX design",
  "Communication",
];

export const HeroBadges = () => {
  return (
    <div className="flex space-x-0.5 overflow-hidden">
      {badges.map((badge) => (
        <Badge
          className="text-[#4E4D93] bg-[#F7F6FD] whitespace-nowrap"
          key={badge}
        >
          {badge}
        </Badge>
      ))}
    </div>
  );
};
