import Image from "next/image";
import Identity from "./Identity";
import AnimText from "./typing/AnimText";

import RichLink from "./ui/rich-link";

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

      <span className="leading-7">
        Recently graduated from{" "}
        <RichLink
          url="https://www.unsw.edu.au"
          image="/images/unsw-logo-yellow.png"
          imageAlt="unsw-logo"
        >
          University of New South Wales
        </RichLink>{" "}
        with a Bachelor’s degree in Computer Science, and now pursuing a
        Master’s degree at{" "}
        <RichLink
          url="https://unimelb.edu.au"
          image="/images/um-logo-blue.png"
          imageAlt="unsw-logo"
        >
          University of Melbourne
        </RichLink>
        .
      </span>
      <span className="leading-7">
        Appearance complex. Loyal fans of apple products. Prefer someone with a
        decent aesthetic. Enjoy the thing with the pretty designed.
      </span>

      {/* two lines height */}
      <div className="mt-8 leading-7 h-14">
        <AnimText delay={0} />
      </div>
    </main>
  );
};

export default Main;
