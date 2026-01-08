"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Button, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  console.log("Session data: ", session);

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
  ];
  return (
    <nav className="mt-5">
      <Container>
        <Flex justify="between" direction="row" align={"center"}>
          <Box>
            <Flex direction="row" gap={"2"} align={"center"}>
              <Link href="/">
                <AiFillBug />
              </Link>
              <ul className="flex space-x-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className={classNames({
                        "hover:text-zinc-800 transition-colors": true,
                        "text-zinc-900": link.href === currentPath,
                        "text-zinc-500": link.href !== currentPath,
                      })}
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Flex>
          </Box>
          <Box>
            {status === "unauthenticated" && (
              <Button>
                <Link href={"/api/auth/signin"}>Login</Link>
              </Button>
            )}
            {status === "authenticated" && (
              <Button>
                <Link href={"/api/auth/signout"}>Logout</Link>
              </Button>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
