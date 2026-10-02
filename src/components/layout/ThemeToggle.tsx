"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full opacity-70">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            aria-label="Toggle theme"
            className="h-9 w-9 rounded-full text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          />
        }
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : theme === "light" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Laptop className="h-4 w-4" />
        )}
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <span>Current: {theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"} (click to switch)</span>
      </TooltipContent>
    </Tooltip>
  );
}
