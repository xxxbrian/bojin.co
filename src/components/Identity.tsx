"use client";
import { Braces, GraduationCap } from "lucide-react";
import Link from "next/link";

const Designer = () => {
  return (
    <span className="group relative bg-black/5 p-1 dark:bg-white/5">
      <span>Designer</span>
      <span className="pointer-events-none absolute inset-0 border border-cyan-700/90 opacity-70 group-hover:border-dashed group-hover:opacity-100 dark:border-cyan-400/90">
        <span className="absolute -left-[3.5px] -top-[3.5px] size-1.5 border border-cyan-700 bg-zinc-50 dark:border-cyan-400" />
        <span className="absolute -bottom-[3.5px] -right-[3.5px] size-1.5 border border-cyan-700 bg-zinc-50 dark:border-cyan-400" />
        <span className="absolute -bottom-[3.5px] -left-[3.5px] size-1.5 border border-cyan-700 bg-zinc-50 dark:border-cyan-400" />
        <span className="absolute -right-[3.5px] -top-[3.5px] size-1.5 border border-cyan-700 bg-zinc-50 dark:border-cyan-400" />
      </span>
    </span>
  );
};

const Developer = () => {
  return (
    <span className="group items-center space-x-1">
      <span>Developer</span>
      <Braces className="mr-1 inline-flex transform-gpu transition-transform duration-500 group-hover:rotate-180" />
    </span>
  );
};

const Student = () => {
  return (
    <span className="group items-center space-x-1">
      <span>Student</span>
      <GraduationCap className="mr-1 inline-flex group-hover:fill-white" />
    </span>
  );
};

const BGP = () => {
  return (
    <>
      <Link
        href="https://bgp.he.net/AS198734"
        target="_blank"
        rel="noopener noreferrer"
        className="border-b border-b-white"
      >
        AS198734
      </Link>{" "}
      Operator
    </>
  );
};

const Identity: React.FC = () => {
  return (
    <>
      <Developer /> / <Designer /> /
      <span className="block h-2" />
      <Student /> / <BGP />
    </>
  );
};

export default Identity;
