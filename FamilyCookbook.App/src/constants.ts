import { SelectOption } from "./components/FormComponents";

export const RECIPE_NAME_MAX_LENGTH = 100;
export const UNIT_ABBREVIATION_MAX_LENGTH = 25;
export const UNIT_NAME_MAX_LENGTH = 50;

export const MEAL_FRESHNESS_OPTIONS: SelectOption[] = [
  { label: "Fresh made", value: "20" },
  { label: "Fridge stored", value: "40" },
  { label: "Freezer stored", value: "60" },
];

export const MEAL_TYPE_OPTIONS: SelectOption[] = [
  {
    label: "Breakfast",
    value: "20",
  },
  {
    label: "Lunch",
    value: "40",
  },
  {
    label: "Dinner",
    value: "60",
  },
];

export const MEAL_SOURCE_OPTIONS: SelectOption[] = [
  { label: "Self-made", value: "20" },
  { label: "Made by others", value: "40" },
  { label: "Ready-made", value: "60" },
  { label: "Restaurant (pick-up)", value: "80" },
  { label: "Restaurant (dine-in)", value: "100" },
];

export const MEAL_STATUS_OPTIONS: SelectOption[] = [
  { label: "Planned", value: "20" },
  { label: "Realized", value: "40" },
];
