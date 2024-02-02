import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? "light" : theme;

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-2">
      {currentTheme === "dark" ? (
        <button
          className="flex items-center justify-center bg-purple-700  w-16 rounded-md border-purple-400 border-2 p-4  hover:scale-105"
          onClick={() => setTheme("light")}
        >
          <Image src="/SunIcon.svg" alt="sun" width={18} height={18} />
        </button>
      ) : (
        <button
          className="flex items-center justify-center bg-gray-100 w-16 rounded-md border-purple-400 border-2 p-4 hover:scale-105"
          onClick={() => setTheme("dark")}
        >
          <Image src="/MoonIcon.svg" alt="moon" width={18} height={18} />
        </button>
      )}
    </div>
  );
};

export default ThemeSwitch;
