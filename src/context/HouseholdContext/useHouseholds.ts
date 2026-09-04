import { useContext } from "react";
import { HouseholdContext } from "./HouseholdContext";

export function useHouseholds() {
  const context = useContext(HouseholdContext);

  if (!context) {
    throw new Error(
      "useHouseholds must be used within HouseholdProvider",
    );
  }

  return context;
}