import { cn } from "@/lib/utils";
import { cookies } from "next/headers";

export const DarkModeProvider = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const cookiesStore = await cookies();
  const defaultDarkMode = cookiesStore.get("darkMode")?.value === "true";

  return (
    <div
      id="dark-mode-provider"
      className={cn("w-full", defaultDarkMode && "dark")}
    >
      {children}
    </div>
  );
};
