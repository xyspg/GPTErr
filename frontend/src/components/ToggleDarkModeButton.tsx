"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Half2Icon } from "@radix-ui/react-icons";

const ToggleDarkModeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const darkMode = currentTheme === "dark";

  return (
    <div
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className={`text-${darkMode ? "white" : "black"} cursor-pointer transition-all duration-100 px-2 md:px-4 py-2 text-2xl md:text-2xl rounded-lg absolute top-4 right-4`}
    >
      <Half2Icon />
    </div>
  );
};

export default ToggleDarkModeButton;
