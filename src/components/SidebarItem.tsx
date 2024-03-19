"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  href: string;
  icon: ReactNode;
  label: string;
}

export const SidebarItem = ({ href, icon, label }: Props) => {
  const pathName = usePathname();
  return (
    <li>
      <a
        href={href}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
        hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
        ${
          href === pathName
            ? " text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            : ""
        } 
        `}
      >
        {icon}
        <span className="group-hover:text-white">{label}</span>
      </a>
    </li>
  );
};
