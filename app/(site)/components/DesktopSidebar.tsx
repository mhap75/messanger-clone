"use client";

import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import { useState } from "react";
import Avatar from "./Avatar";
import SettingsModal from "@/app/(site)/components/SettingsModal";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="
			hidden
			justify-between
			lg:fixed
			lg:inset-y-0
			lg:left-0
			lg:z-40
			lg:flex
			lg:w-20
			lg:flex-col
			lg:overflow-y-auto
			lg:border-r-[1px]
			lg:bg-white
			lg:pb-4
			xl:px-6
        "
      >
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((route) => (
              <DesktopItem
                key={route.label}
                href={route.href}
                label={route.label}
                icon={route.icon}
                active={route.active}
                onClick={route.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col items-center justify-between">
          <div
            className="cursor-pointer transition hover:opacity-75"
            onClick={() => setIsOpen((s) => !s)}
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
