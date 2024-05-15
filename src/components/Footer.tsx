import {
  SiBun,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
} from "@icons-pack/react-simple-icons";
import { getLastVisitor, getVisitorCount, ipInfo } from "@/lib/kv";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formatNumberWithText = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + " billion";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + " million";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + " thousand";
  } else {
    return num;
  }
};
interface FooterProp {
  path?: string;
}

const Footer = async (prop: FooterProp) => {
  let lv: ipInfo | null = {
    ip: "0.0.0.0",
    city: "error",
    country: "error",
    flag: "🏳️‍🌈",
  };
  let vc = 0;
  try {
    lv = await getLastVisitor();
    vc = await getVisitorCount(prop.path);
  } catch (error) {
    console.log(error);
  }
  // const lv = await getLastVisitor();
  // const vc = await getVisitorCount(prop.path);

  return (
    <footer className="relative text-xs text-center px-6 py-2 primary-text">
      <div className="space-x-2 inline-flex items-center my-2">
        <SiVercel size={16} />
        <SiNextdotjs size={16} />
        <SiTailwindcss size={16} />
        <SiBun size={16} />
      </div>
      <div>
        Built with love by Bojin Li ©️ 2019 - {new Date().getFullYear()}
      </div>
      <div className="md:absolute md:bottom-0 md:right-6 md:p-2 md:text-xs md:text-right md:w-full">
        <div className="hidden md:block">
          Total visitors: {formatNumberWithText(vc)}
        </div>
        <div>
          Last visitor from:{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {lv
                  ? `${lv.city !== "unknown" ? `${lv.city}, ` : "Somewhere, "}${
                      lv.country
                    } ${lv.flag}`
                  : "Unknown"}
              </TooltipTrigger>
              <TooltipContent className="pb-1">
                <span>IP: {lv ? `${lv.ip}` : "Unknown"}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
