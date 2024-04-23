import { MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Identity from "./Identity";

const Main = () => {
  return (
    <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6 justify-center">
      <div className="mb-2">
        <Image
          className="rounded-full transition-all duration-100"
          src="/images/avatar.png"
          alt="avatar"
          width={130}
          height={130}
          priority
        />
      </div>
      <h1 className="font-bold mb-8 text-2xl heading-text">Bojin Li (Brian)</h1>

      <div className="mb-8">
        <Identity />
      </div>

      <p className="leading-7">
        Currently studying in{" "}
        <Link
          href="https://unsw.edu.au"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-b-white"
        >
          University of New South Wales
        </Link>{" "}
        for a degree in Computer Science.
      </p>
      <p className="leading-7">
        Appearance complex. Loyal fans of apple products. Prefer someone with a
        decent aesthetic. Enjoy the thing with the pretty designed.
      </p>

      <p className="mt-8 leading-7">A flunky of strongly-typed languages.</p>
      <p className="flex space-x-2 items-center leading-7">
        <MailIcon size={16} />
        <a href="mailto:bojinxx@gmail.com">bojinxx#gmail.com</a>
      </p>
    </main>
  );
};

export default Main;
