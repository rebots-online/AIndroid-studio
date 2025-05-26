
"use client";

import * as React from "react";
import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const THEME_STYLES = [
  { value: "default", label: "Default" },
  { value: "brutalist", label: "Brutalist" },
  { value: "skeuomorphic", label: "Skeuomorphic" },
  { value: "glassmorphic", label: "Glassmorphic" },
  { value: "neumorphic", label: "Neumorphic" },
  { value: "retro", label: "Retro" },
];

export function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [selectedStyle, setSelectedStyle] = React.useState("default");

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  React.useEffect(() => {
    const root = window.document.documentElement;
    THEME_STYLES.forEach(style => root.classList.remove(`theme-${style.value}`));
    if (selectedStyle !== "default") {
      root.setAttribute("data-theme-style", selectedStyle);
      // Potentially add a class like `theme-${selectedStyle}` if specific CSS targeting is needed beyond data attribute.
    } else {
      root.removeAttribute("data-theme-style");
    }
  }, [selectedStyle]);
  
  React.useEffect(() => {
    // Check for saved theme preference or system preference
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(prefersDarkMode);
    }

    const savedStyle = localStorage.getItem("theme-style");
    if (savedStyle && THEME_STYLES.some(s => s.value === savedStyle)) {
      setSelectedStyle(savedStyle);
    }
  }, []);


  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    localStorage.setItem("theme", checked ? "dark" : "light");
  };

  const handleStyleChange = (styleValue: string) => {
    setSelectedStyle(styleValue);
    localStorage.setItem("theme-style", styleValue);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center space-x-2">
        <Sun className="h-5 w-5 text-yellow-500" />
        <Switch
          id="theme-mode"
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        />
        <Moon className="h-5 w-5 text-blue-500" />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Change UI style">
            <Palette className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>UI Style</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {THEME_STYLES.map((style) => (
            <DropdownMenuItem
              key={style.value}
              onSelect={() => handleStyleChange(style.value)}
              className={selectedStyle === style.value ? "bg-accent text-accent-foreground" : ""}
            >
              {style.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
