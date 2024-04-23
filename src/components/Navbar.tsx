"use client";
import Link from "next/link";
import { Rss } from "lucide-react";
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
    name: "Projects",
    link: "/projects",
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
      <Link
        href="/"
        passHref
        className="bg-black bg-opacity-40 text-white px-1 py-0.5 font-mono"
      >
        /xxxbrian
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
          <NavigationMenu className="rounded-lg">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="dark:bg-white dark:bg-opacity-10">
                  Go to
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col rounded-lg">
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
        <div onClick={() => window.open("/rss", "_self")}>
          <Rss size={20} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
