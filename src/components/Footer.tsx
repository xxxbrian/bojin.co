import {
  SiBun,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
} from "@icons-pack/react-simple-icons";
import { getLastVisitor } from "@/lib/kv";
const Footer = async () => {
  const lv = await getLastVisitor();
  return (
    <footer className="text-xs text-center p-6 primary-text">
      <div className="space-x-2 inline-flex items-center my-2">
        <SiBun size={16} />
        <SiNextdotjs size={16} />
        <SiTailwindcss size={16} />
        <SiVercel size={16} />
      </div>
      <div>Built with love by Bojin Li</div>
      <div>©️ 2019 - {new Date().getFullYear()}</div>
      <div>
        Last visitor:{" "}
        {lv ? `${lv.ip} ${lv.country} ${lv.city} ${lv.flag}` : "Unknown"}
      </div>
    </footer>
  );
};

export default Footer;
