"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14  items-center ">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              "hover:text-zinc-800 transition-colors": true,
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
            })}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
