import {
  SiBun,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
} from "@icons-pack/react-simple-icons";

const Footer = () => {
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
    </footer>
  );
};

export default Footer;
