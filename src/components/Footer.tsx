import {
  SiBun,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
} from "@icons-pack/react-simple-icons";
import { getLastVisitor } from "@/lib/kv";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Footer = async () => {
  const lv = await getLastVisitor();
  return (
    <footer className="text-xs text-center px-6 py-2 primary-text">
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
        Last visitor from:{" "}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {lv
                ? `${lv.city !== "unknown" ? `${lv.city}, ` : ""}${
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
    </footer>
  );
};

export default Footer;
