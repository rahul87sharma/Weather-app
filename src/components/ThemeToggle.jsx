
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";

const ThemeToggle = ({ darkMode, setDarkMode }) => {

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add("dark") : root.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="flex items-center gap-2">
      <Sun className="w-4 h-4" />
      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      <Moon className="w-4 h-4" />
    </div>
  );
};

export default ThemeToggle;
