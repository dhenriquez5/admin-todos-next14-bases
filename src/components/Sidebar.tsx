import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { SidebarItem } from "./SidebarItem";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoPersonOutline,
  IoSaveOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "./LogoutButton";

const MenuItems = [
  {
    id: 1,
    href: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
    label: "Dashboard",
  },
  {
    id: 2,
    href: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
    label: "Rest TODOS",
  },
  {
    id: 3,
    href: "/dashboard/server-todos",
    icon: <IoListOutline size={30} />,
    label: "Server Actions",
  },
  {
    id: 4,
    href: "/dashboard/cookies",
    icon: <IoSaveOutline size={30} />,
    label: "Cookies",
  },
  {
    id: 5,
    href: "/dashboard/products",
    icon: <IoBasketOutline size={30} />,
    label: "Productos",
  },
  {
    id: 6,
    href: "/dashboard/profile",
    icon: <IoPersonOutline size={30} />,
    label: "Perfil",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              width={150}
              height={150}
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            width={150}
            height={150}
            src={session?.user?.image ?? ""}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name}
          </h5>
          <span className="hidden text-gray-400 lg:block">
            {session?.user?.roles?.join(',')}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
          {MenuItems &&
            MenuItems.map((menu) => (
              <SidebarItem
                key={menu.id}
                href={menu.href}
                icon={menu.icon}
                label={menu.label}
              />
            ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
