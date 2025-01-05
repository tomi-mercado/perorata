"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { updateCookie } from "../actions";
import { Button } from "../ui/button";

export const ToggleButton = ({
  defaultDarkMode,
}: {
  defaultDarkMode: boolean;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(defaultDarkMode);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document
      .getElementById("dark-mode-provider")
      ?.classList.toggle("dark", newMode);
    await updateCookie("darkMode", newMode);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
};
