import { BarChart2 } from "lucide-react";
import { cookies } from "next/headers";
import { ToggleButton } from "./navbar.client";

export async function Navbar() {
  const cookiesStore = await cookies();
  const defaultDarkMode = cookiesStore.get("darkMode")?.value === "true";

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BarChart2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Calculadora de inversión
            </h1>
          </div>
          <ToggleButton defaultDarkMode={defaultDarkMode} />
        </div>
      </div>
    </nav>
  );
}
