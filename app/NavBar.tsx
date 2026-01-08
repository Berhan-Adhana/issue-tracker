"use client";

import { Avatar, Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { DropdownMenu } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const NavBar = () => {
  const currentPath = usePathname();

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
            <AuthStatus />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  console.log("Session data: ", session);

  if (status === "loading") return <Skeleton width={"3rem"} />;
  if (status === "unauthenticated")
    return <Link href={"/api/auth/signin"}>Login</Link>;

  if (status === "authenticated")
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            radius="full"
            size={"2"}
            src={session!.user!.image!}
            className="cursor-pointer"
            referrerPolicy="no-referrer"
            fallback="?"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={"2"}>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            {" "}
            <Link href={"/api/auth/signout"}>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
};

export default NavBar;
