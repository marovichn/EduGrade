import { Frown, Meh, Smile } from "lucide-react";

export const grades = [
  { key: "A", value: "A" },
  { key: "B", value: "B" },
  { key: "C", value: "C" },
  { key: "D", value: "D" },
  { key: "F", value: "F" },
];
export const activities = [
  { key: "Green", value: ">80%", Icon: Smile, color: "#79AC78" },
  { key: "Yellow", value: ">50%", Icon: Meh, color: "#F0DE36" },
  { key: "Red", value: "<50%", Icon: Frown, color: "#D80032" },
];
