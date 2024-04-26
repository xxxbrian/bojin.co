"use client";
import Link from "next/link";
import { BookHeart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const navigations = [
  {
    name: "Blog",
    link: "/blog",
    target: "_self",
  },
  {
    name: "Links",
    link: "/links",
    target: "_self",
  },
  {
    name: "Github",
    link: "https://github.com/xxxbrian",
    target: "_blank",
  },
  {
    name: "AS198734",
    link: "https://bgp.tools/as/198734",
    target: "_blank",
  },
];

const MenuItemLink = (props: {
  [x: string]: any;
  href: any;
  children: any;
}) => {
  const { href, children, ...rest } = props;
  return (
    <Link
      href={href}
      passHref
      {...rest}
      className="border-b border-b-dark-200/30 transition-all duration-100 no-underline dark:border-b-light-900/50 hover:border-b-dark-200/60 dark:hover:border-b-light-900/80"
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  return (
    <header className="flex p-6 z-10 items-center justify-between primary-text">
      <Link href="/" passHref className="border-b border-b-white">
        xxxbrian
      </Link>
      <div className="flex space-x-4 items-center">
        <nav className="space-x-4 items-center hidden sm:flex">
          {navigations.map((n, i) => (
            <MenuItemLink href={n.link} target={n.target} key={i}>
              {n.name}
            </MenuItemLink>
          ))}
        </nav>

        <div className="block sm:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger />
                <NavigationMenuContent className="flex flex-col">
                  {navigations.map((n, i) => (
                    <NavigationMenuLink
                      key={i}
                      href={n.link}
                      className={`hover:font-bold mb-3 px-3 ${
                        i === 0 ? "mt-3" : ""
                      }`}
                    >
                      {n.name}
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Link href="https://github.com/xxxbrian/bojin.co/tree/new">
          <BookHeart />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
