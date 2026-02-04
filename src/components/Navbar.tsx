"use client";
import Link from "next/link";
import { BookHeart, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    name: "Use",
    link: "/use",
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [menuOpen]);

  return (
    <header className="relative flex p-6 z-10 items-center justify-between primary-text">
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

        <div className="relative block sm:hidden" ref={menuRef}>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-white/60 hover:text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={18} />
          </button>
          {menuOpen ? (
            <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-black/70 p-3 text-sm text-white/80 shadow-2xl backdrop-blur">
              {navigations.map((n, i) => (
                <Link
                  href={n.link}
                  target={n.target}
                  key={i}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/10 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {n.name}
                  <span className="text-white/40">↗</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <Link href="https://github.com/xxxbrian/bojin.co/tree/new">
          <BookHeart />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
