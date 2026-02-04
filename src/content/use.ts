import type { Tool, ToolCategory } from "@/components/use/ToolLibrary";

export type UseLocale = "en" | "zh";

export const USE_PAGE_COPY: Record<
  UseLocale,
  {
    eyebrow: string;
    title: string;
    description: string;
    statTotalLabel: string;
    statTotalSuffix: string;
    statInstallLabel: string;
    statInstallValue: string;
    statInstallSuffix: string;
  }
> = {
  en: {
    eyebrow: "Use",
    title: "Tools I Use",
    description:
      "A curated list of tools I use day-to-day (derived from my declarative nix-darwin setup, then filtered for recommendations). Click a category to expand, then open a tool card for install commands and links.",
    statTotalLabel: "Total",
    statTotalSuffix: "tools",
    statInstallLabel: "Install",
    statInstallValue: "Nix + Homebrew",
    statInstallSuffix: "unified commands",
  },
  zh: {
    eyebrow: "Use",
    title: "Tools I Use",
    description:
      "按场景分类的工具清单（由我的 nix-darwin 声明式配置生成，并做了“推荐向”的筛选）。点击分类展开详细列表，再点工具卡片查看安装命令与链接。",
    statTotalLabel: "Total",
    statTotalSuffix: "个工具",
    statInstallLabel: "Install",
    statInstallValue: "Nix + Homebrew",
    statInstallSuffix: "统一命令",
  },
};

const titleCase = (input: string) =>
  input
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) =>
      part.length <= 2
        ? part.toUpperCase()
        : part[0].toUpperCase() + part.slice(1),
    )
    .join(" ");

const humanizeCaskName = (cask: string) => {
  if (cask === "1password") return "1Password";
  if (cask === "1password-cli") return "1Password CLI";
  if (cask === "visual-studio-code") return "VS Code";
  if (cask === "firefox@developer-edition") return "Firefox Developer Edition";
  if (cask === "logi-options+") return "Logi Options+";
  return titleCase(cask.replace(/@/g, " "));
};

const caskTool = (
  cask: string,
  overrides?: Partial<Omit<Tool, "brew" | "nix">>,
  descriptionFallback?: string,
): Tool => ({
  name: overrides?.name ?? humanizeCaskName(cask),
  description:
    overrides?.description ?? descriptionFallback ?? "macOS application.",
  brew: `brew install --cask ${cask}`,
  // NOTE: cask apps are GUI-focused here; no Nix install command/link per request.
  website: overrides?.website,
  github: overrides?.github,
});

const formulaTool = (name: string, tool: Omit<Tool, "name">): Tool => ({
  name,
  ...tool,
});

// ---- GUI apps (Homebrew casks) ----
// Source list mirrors your nix-darwin flake `homebrew.casks`.
const ALL_CASKS = [
  "1password",
  "1password-cli",
  "adrive",
  "affine",
  "alacritty-full",
  "alt-tab",
  "android-studio",
  "anythingllm",
  "apparency",
  "arc",
  "arduino-ide",
  "balenaetcher",
  "binary-ninja-free",
  "blender",
  "chatgpt",
  "chatwise",
  "cherry-studio",
  "citrix-workspace",
  "claude-code",
  "clion",
  "cool-retro-term",
  "cursor",
  "discord",
  "douyin",
  "epic-games",
  "fastmail",
  "figma",
  "firefox",
  "firefox@developer-edition",
  "fission-cli",
  "fleet",
  "folo",
  "font-fira-code",
  "font-fira-code-nerd-font",
  "font-fontawesome",
  "font-hack-nerd-font",
  "font-jetbrains-mono",
  "font-jetbrains-mono-nerd-font",
  "font-noto-color-emoji",
  "font-symbols-only-nerd-font",
  "ghostty",
  "goland",
  "google-chrome",
  "google-drive",
  "gstreamer-runtime",
  "helium-browser",
  "iina",
  "imhex",
  "intellij-idea",
  "ios-app-signer",
  "iterm2",
  "lm-studio",
  "localsend",
  "logi-options+",
  "loop",
  "mediamate",
  "megasync",
  "microsoft-auto-update",
  "microsoft-teams",
  "minecraft",
  "mochi-diffusion",
  "mongodb-compass",
  "moonlight",
  "motrix",
  "neteasemusic",
  "network-radar",
  "notion",
  "notion-calendar",
  "nvidia-geforce-now",
  "obs",
  "obsidian",
  "orbstack",
  "parallels",
  "pycharm",
  "qflipper",
  "raycast",
  "reqable",
  "rstudio",
  "rustdesk",
  "rustrover",
  "setapp",
  "spacedrive",
  "spotify",
  "squirrel-app",
  "steam",
  "sublime-text",
  "surge",
  "suspicious-package",
  "syntax-highlight",
  "tailscale-app",
  "telegram",
  "tencent-meeting",
  "thunder",
  "tigervnc-viewer",
  "tor-browser",
  "typora",
  "unity-hub",
  "utm",
  "visual-studio-code",
  "vmware-fusion",
  "webstorm",
  "wechatwork",
  "wetype",
  "wezterm",
  "whisky",
  "windows-app",
  "windsurf",
  "wireshark-app",
  "yaak",
  "zed",
  "zen",
  "zerotier-one",
  "zoom",
] as const;

// Curated exclusions: these are in my system config but not "recommendations" for a public Use page.
// (Also includes a few items you explicitly removed.)
const EXCLUDED_CASKS = new Set<string>([
  "goland",
  "mongodb-compass",
  "rstudio",
  "clion",
  "intellij-idea",
  "pycharm",
  "webstorm",
  "rustrover",
  "discord",
  "zoom",
  "microsoft-teams",
  "wechatwork",
  "tencent-meeting",
  "telegram",
  "citrix-workspace",
  "steam",
  "epic-games",
  "minecraft",
  "nvidia-geforce-now",
  "microsoft-auto-update",
  // Deprecated Homebrew cask (scheduled to be disabled); not a good recommendation.
  "gstreamer-runtime",
]);

const INCLUDED_CASKS = ALL_CASKS.filter((c) => !EXCLUDED_CASKS.has(c));
const CASK_SET = new Set<string>(INCLUDED_CASKS);

const assertAllCasksCovered = (covered: string[]) => {
  const missing: string[] = [];
  for (const cask of INCLUDED_CASKS) {
    if (!covered.includes(cask)) missing.push(cask);
  }
  // We don't throw in production; this is a dev-time guard.
  // If you add new casks later, they'll fall into GUI: Other automatically.
  return missing;
};

const CASK_OVERRIDES_ZH: Record<string, Partial<Omit<Tool, "brew" | "nix">>> = {
  raycast: {
    description: "效率启动器与自动化平台（Spotlight 替代）。",
    website: "https://www.raycast.com",
  },
  orbstack: {
    description: "轻量且高速的容器/虚拟化体验（Docker Desktop 替代）。",
    website: "https://orbstack.dev",
  },
  arc: {
    description: "工作流导向的现代浏览器。",
    website: "https://arc.net",
  },
  obsidian: {
    description: "本地优先的知识库/双链笔记。",
    website: "https://obsidian.md",
  },
  affine: {
    description: "本地优先的知识管理（Docs + Whiteboard）。",
    website: "https://affine.pro",
  },
  wezterm: {
    description: "GPU 加速终端（强可定制）。",
    website: "https://wezfurlong.org/wezterm/",
  },
  ghostty: {
    description: "现代 macOS 终端（性能与体验取向）。",
    website: "https://ghostty.org",
  },
  "alacritty-full": {
    name: "Alacritty",
    description: "GPU 加速终端（极简，偏性能）。",
    website: "https://alacritty.org",
  },
  iterm2: {
    description: "老牌 macOS 终端模拟器。",
    website: "https://iterm2.com",
  },
  "alt-tab": {
    name: "AltTab",
    description: "更像 Windows 的 Alt-Tab 窗口切换体验。",
    website: "https://alt-tab-macos.netlify.app",
  },
  loop: {
    description: "窗口管理（贴边吸附/分屏布局）。",
    website: "https://loopapp.com",
  },
  mediamate: {
    description: "音量/亮度等系统 HUD 增强。",
    website: "https://wouter01.github.io/MediaMate/",
  },
  figma: {
    description: "协同设计工具。",
    website: "https://www.figma.com",
  },
  iina: {
    description: "macOS 上体验很好的视频播放器。",
    website: "https://iina.io",
  },
  obs: {
    name: "OBS",
    description: "录屏/直播工具。",
    website: "https://obsproject.com",
  },
  balenaetcher: {
    name: "balenaEtcher",
    description: "写入系统镜像到 U 盘/SD 卡。",
    website: "https://etcher.balena.io",
  },
  "1password": {
    name: "1Password",
    description: "密码管理与安全存储。",
    website: "https://1password.com",
  },
  "1password-cli": {
    name: "1Password CLI",
    description: "1Password 的命令行工具。",
    website: "https://developer.1password.com/docs/cli/",
  },
  "suspicious-package": {
    description: "安装包内容审查工具（看清它到底要装什么）。",
    website: "https://www.mothersruin.com/software/SuspiciousPackage/",
  },
  apparrency: {
    description: "应用体检：签名、权限、内嵌组件与风险检查。",
    website: "https://www.mothersruin.com/software/Apparency/",
  },
  "visual-studio-code": {
    name: "VS Code",
    description: "通用代码编辑器。",
    website: "https://code.visualstudio.com",
  },
  cursor: {
    description: "AI 辅助代码编辑器。",
    website: "https://www.cursor.com",
  },
  zed: {
    description: "高性能协同编辑器。",
    website: "https://zed.dev",
  },
  "android-studio": {
    name: "Android Studio",
    description: "Android 官方 IDE（Gradle、模拟器与调试一体）。",
    website: "https://developer.android.com/studio",
  },
  "binary-ninja-free": {
    name: "Binary Ninja (Free)",
    description: "逆向工程平台的免费版本（偏交互式分析）。",
    website: "https://binary.ninja",
  },
  imhex: {
    name: "ImHex",
    description: "强大的十六进制编辑器/二进制分析工具。",
    website: "https://imhex.werwolv.net",
  },
  "ios-app-signer": {
    name: "iOS App Signer",
    description: "对 `.ipa` 进行重签名（用于自签/企业签/测试）。",
    github: "https://github.com/DanTheMan827/ios-app-signer",
  },
  "logi-options+": {
    name: "Logi Options+",
    description: "Logitech 键鼠驱动与自定义（手势、按键映射等）。",
    website: "https://www.logitech.com/en-us/software/logi-options-plus.html",
  },
  "squirrel-app": {
    name: "Squirrel (Rime)",
    description: "Rime 输入法引擎的 macOS 版本（高度可定制）。",
    website: "https://rime.im",
    github: "https://github.com/rime/squirrel",
  },
  "fission-cli": {
    name: "Fission CLI",
    description: "Kubernetes 上的 Serverless 框架命令行工具。",
    website: "https://fission.io/docs/installation/",
  },
  notion: {
    name: "Notion",
    description: "一体化工作区：笔记、文档、数据库与协作。",
    website: "https://www.notion.so",
  },
  "notion-calendar": {
    name: "Notion Calendar",
    description: "日历与日程管理（与 Notion 深度整合）。",
    website: "https://www.notion.so/product/calendar",
  },
  typora: {
    name: "Typora",
    description: "所见即所得的 Markdown 编辑器。",
    website: "https://typora.io",
  },
  chatgpt: {
    name: "ChatGPT",
    description: "OpenAI 的 ChatGPT 桌面客户端。",
    website: "https://chatgpt.com",
  },
  anythingllm: {
    name: "AnythingLLM",
    description: "本地/自托管知识库 + RAG 工作台。",
    website: "https://anythingllm.com",
  },
  "lm-studio": {
    name: "LM Studio",
    description: "本地大模型下载、管理与运行（偏桌面体验）。",
    website: "https://lmstudio.ai",
  },
  blender: {
    name: "Blender",
    description: "开源 3D 创作套件。",
    website: "https://www.blender.org",
  },
  parallels: {
    name: "Parallels Desktop",
    description: "macOS 上成熟的虚拟机解决方案。",
    website: "https://www.parallels.com",
  },
  utm: {
    name: "UTM",
    description: "轻量虚拟化（QEMU 前端）。",
    website: "https://mac.getutm.app",
  },
  surge: {
    name: "Surge",
    description: "网络代理与调试（规则、抓包、MITM）。",
    website: "https://nssurge.com",
  },
  "tailscale-app": {
    name: "Tailscale",
    description: "基于 WireGuard 的易用 VPN/零信任组网。",
    website: "https://tailscale.com",
  },
  "zerotier-one": {
    name: "ZeroTier",
    description: "虚拟网络组网工具。",
    website: "https://www.zerotier.com",
  },
  "wireshark-app": {
    name: "Wireshark",
    description: "网络抓包与协议分析。",
    website: "https://www.wireshark.org",
  },
  "google-drive": {
    name: "Google Drive",
    description: "Google Drive 同步客户端。",
    website: "https://www.google.com/drive/download/",
  },
  localsend: {
    name: "LocalSend",
    description: "局域网跨平台文件传输。",
    website: "https://localsend.org",
  },
  setapp: {
    name: "Setapp",
    description: "订阅制应用合集（按需装常用工具）。",
    website: "https://setapp.com",
  },
  rustdesk: {
    name: "RustDesk",
    description: "开源远程桌面（可自建中继）。",
    website: "https://rustdesk.com",
  },
  moonlight: {
    name: "Moonlight",
    description: "游戏/桌面串流客户端（NVIDIA GameStream 生态）。",
    website: "https://moonlight-stream.org",
  },
  motrix: {
    name: "Motrix",
    description: "下载器前端（支持 aria2）。",
    github: "https://github.com/agalwood/Motrix",
  },
  fastmail: {
    name: "Fastmail",
    description: "注重隐私与体验的邮箱服务客户端。",
    website: "https://www.fastmail.com",
  },
};

const CASK_OVERRIDES_EN: Record<string, Partial<Omit<Tool, "brew" | "nix">>> = {
  raycast: {
    description:
      "Productivity launcher and automation platform (Spotlight alternative).",
    website: "https://www.raycast.com",
  },
  orbstack: {
    description:
      "Fast, lightweight containers & Linux VMs (Docker Desktop alternative).",
    website: "https://orbstack.dev",
  },
  arc: {
    description: "A workflow-first modern browser.",
    website: "https://arc.net",
  },
  obsidian: {
    description: "Local-first knowledge base with backlinks.",
    website: "https://obsidian.md",
  },
  affine: {
    description: "Local-first docs + whiteboard knowledge workspace.",
    website: "https://affine.pro",
  },
  wezterm: {
    description: "GPU-accelerated terminal with deep configurability.",
    website: "https://wezfurlong.org/wezterm/",
  },
  ghostty: {
    description: "Modern macOS terminal focused on performance and UX.",
    website: "https://ghostty.org",
  },
  "alacritty-full": {
    name: "Alacritty",
    description: "Minimal, GPU-accelerated terminal focused on performance.",
    website: "https://alacritty.org",
  },
  iterm2: {
    description: "Classic macOS terminal emulator.",
    website: "https://iterm2.com",
  },
  "alt-tab": {
    name: "AltTab",
    description: "Windows-style Alt-Tab window switcher.",
    website: "https://alt-tab-macos.netlify.app",
  },
  loop: {
    description: "Window manager for snapping and layouts.",
    website: "https://loopapp.com",
  },
  mediamate: {
    description: "Better system HUDs for volume/brightness and more.",
    website: "https://wouter01.github.io/MediaMate/",
  },
  figma: {
    description: "Collaborative design tool.",
    website: "https://www.figma.com",
  },
  iina: {
    description: "A great macOS video player.",
    website: "https://iina.io",
  },
  obs: {
    name: "OBS",
    description: "Screen recording and live streaming.",
    website: "https://obsproject.com",
  },
  balenaetcher: {
    name: "balenaEtcher",
    description: "Flash OS images to USB drives and SD cards.",
    website: "https://etcher.balena.io",
  },
  "1password": {
    name: "1Password",
    description: "Password manager and secure vault.",
    website: "https://1password.com",
  },
  "1password-cli": {
    name: "1Password CLI",
    description: "Command-line tool for 1Password.",
    website: "https://developer.1password.com/docs/cli/",
  },
  "suspicious-package": {
    description: "Inspect installer packages before you run them.",
    website: "https://www.mothersruin.com/software/SuspiciousPackage/",
  },
  apparrency: {
    description:
      "Inspect app signatures, permissions, and embedded components.",
    website: "https://www.mothersruin.com/software/Apparency/",
  },
  "visual-studio-code": {
    name: "VS Code",
    description: "General-purpose code editor.",
    website: "https://code.visualstudio.com",
  },
  cursor: {
    description: "AI-assisted code editor.",
    website: "https://www.cursor.com",
  },
  zed: {
    description: "High-performance collaborative code editor.",
    website: "https://zed.dev",
  },
  "android-studio": {
    name: "Android Studio",
    description: "Official IDE for Android development.",
    website: "https://developer.android.com/studio",
  },
  "binary-ninja-free": {
    name: "Binary Ninja (Free)",
    description: "Reverse engineering platform (free edition).",
    website: "https://binary.ninja",
  },
  imhex: {
    name: "ImHex",
    description: "Hex editor and binary analysis tool.",
    website: "https://imhex.werwolv.net",
  },
  "ios-app-signer": {
    name: "iOS App Signer",
    description: "Re-sign iOS .ipa files for development and testing.",
    github: "https://github.com/DanTheMan827/ios-app-signer",
  },
  "logi-options+": {
    name: "Logi Options+",
    description: "Configure Logitech devices (gestures, key mappings, etc.).",
    website: "https://www.logitech.com/en-us/software/logi-options-plus.html",
  },
  "squirrel-app": {
    name: "Squirrel (Rime)",
    description: "Rime input method for macOS (highly configurable).",
    website: "https://rime.im",
    github: "https://github.com/rime/squirrel",
  },
  "fission-cli": {
    name: "Fission CLI",
    description: "CLI for Fission serverless on Kubernetes.",
    website: "https://fission.io/docs/installation/",
  },
  notion: {
    name: "Notion",
    description:
      "All-in-one workspace for docs, notes, databases, and collaboration.",
    website: "https://www.notion.so",
  },
  "notion-calendar": {
    name: "Notion Calendar",
    description: "Calendar app with deep Notion integration.",
    website: "https://www.notion.so/product/calendar",
  },
  typora: {
    name: "Typora",
    description: "WYSIWYG Markdown editor.",
    website: "https://typora.io",
  },
  chatgpt: {
    name: "ChatGPT",
    description: "ChatGPT desktop app by OpenAI.",
    website: "https://chatgpt.com",
  },
  anythingllm: {
    name: "AnythingLLM",
    description: "Local/self-hosted knowledge base + RAG workspace.",
    website: "https://anythingllm.com",
  },
  "lm-studio": {
    name: "LM Studio",
    description:
      "Download, manage, and run local LLMs with a desktop-first UX.",
    website: "https://lmstudio.ai",
  },
  blender: {
    name: "Blender",
    description: "Open-source 3D creation suite.",
    website: "https://www.blender.org",
  },
  parallels: {
    name: "Parallels Desktop",
    description: "Mature virtual machine solution for macOS.",
    website: "https://www.parallels.com",
  },
  utm: {
    name: "UTM",
    description: "Lightweight virtualization (QEMU frontend).",
    website: "https://mac.getutm.app",
  },
  surge: {
    name: "Surge",
    description: "Network proxy and debugging toolkit (rules, capture, MITM).",
    website: "https://nssurge.com",
  },
  "tailscale-app": {
    name: "Tailscale",
    description: "Easy VPN/zero-trust networking built on WireGuard.",
    website: "https://tailscale.com",
  },
  "zerotier-one": {
    name: "ZeroTier",
    description: "Virtual networking solution.",
    website: "https://www.zerotier.com",
  },
  "wireshark-app": {
    name: "Wireshark",
    description: "Packet capture and protocol analysis.",
    website: "https://www.wireshark.org",
  },
  "google-drive": {
    name: "Google Drive",
    description: "Google Drive sync client.",
    website: "https://www.google.com/drive/download/",
  },
  localsend: {
    name: "LocalSend",
    description: "Cross-platform LAN file transfer.",
    website: "https://localsend.org",
  },
  setapp: {
    name: "Setapp",
    description: "Subscription bundle of curated macOS apps.",
    website: "https://setapp.com",
  },
  rustdesk: {
    name: "RustDesk",
    description: "Open-source remote desktop (self-hostable relay).",
    website: "https://rustdesk.com",
  },
  moonlight: {
    name: "Moonlight",
    description: "Game/desktop streaming client (NVIDIA GameStream ecosystem).",
    website: "https://moonlight-stream.org",
  },
  motrix: {
    name: "Motrix",
    description: "Download manager frontend (powered by aria2).",
    github: "https://github.com/agalwood/Motrix",
  },
  fastmail: {
    name: "Fastmail",
    description: "Email service client with a focus on privacy and UX.",
    website: "https://www.fastmail.com",
  },
};

type LocalizedString = Record<UseLocale, string>;

const GUI_GROUPS: Array<{
  title: string;
  subtitle: LocalizedString;
  casks: string[];
  descriptionFallback: LocalizedString;
}> = [
  {
    title: "GUI: Editors & IDEs",
    subtitle: {
      en: "Editors, IDEs, and developer-facing GUI tools",
      zh: "编辑器、IDE 与开发类 GUI 工具",
    },
    casks: [
      "cursor",
      "visual-studio-code",
      "zed",
      "windsurf",
      "sublime-text",
      "fleet",
      "android-studio",
      "arduino-ide",
    ],
    descriptionFallback: { en: "Code editor / IDE.", zh: "代码编辑器 / IDE。" },
  },
  {
    title: "GUI: Terminals",
    subtitle: {
      en: "Terminal emulators and shell UX",
      zh: "终端与 shell 体验",
    },
    casks: [
      "alacritty-full",
      "iterm2",
      "wezterm",
      "ghostty",
      "cool-retro-term",
    ],
    descriptionFallback: { en: "Terminal emulator.", zh: "终端模拟器。" },
  },
  {
    title: "GUI: Browsers",
    subtitle: { en: "Browsers and privacy tools", zh: "浏览器与隐私工具" },
    casks: [
      "arc",
      "firefox",
      "firefox@developer-edition",
      "google-chrome",
      "helium-browser",
      "tor-browser",
      "zen",
    ],
    descriptionFallback: { en: "Web browser.", zh: "浏览器。" },
  },
  {
    title: "GUI: Notes & Knowledge",
    subtitle: { en: "Notes, knowledge, and writing", zh: "笔记、知识库与写作" },
    casks: [
      "notion",
      "notion-calendar",
      "obsidian",
      "affine",
      "typora",
      "wetype",
    ],
    descriptionFallback: {
      en: "Notes / writing app.",
      zh: "笔记 / 写作工具。",
    },
  },
  {
    title: "GUI: Reverse Engineering",
    subtitle: {
      en: "Reverse engineering and binary tools",
      zh: "逆向分析、二进制与签名工具",
    },
    casks: ["binary-ninja-free", "imhex", "ios-app-signer"],
    descriptionFallback: {
      en: "Reverse engineering tool.",
      zh: "逆向工程工具。",
    },
  },
  {
    title: "GUI: Input & Keyboard",
    subtitle: {
      en: "Input methods and keyboard utilities",
      zh: "输入法与键盘相关",
    },
    casks: ["squirrel-app", "logi-options+"],
    descriptionFallback: {
      en: "Input / device utility.",
      zh: "输入法 / 设备工具。",
    },
  },
  {
    title: "GUI: AI",
    subtitle: {
      en: "AI clients and local model tools",
      zh: "AI 客户端与本地模型相关",
    },
    casks: [
      "chatgpt",
      "claude-code",
      "anythingllm",
      "lm-studio",
      "mochi-diffusion",
      "cherry-studio",
      "chatwise",
    ],
    descriptionFallback: { en: "AI client.", zh: "AI 客户端。" },
  },
  {
    title: "GUI: Design & Media",
    subtitle: { en: "Design, media, and creation", zh: "设计、影音与创作" },
    casks: [
      "figma",
      "blender",
      "iina",
      "obs",
      "spotify",
      "neteasemusic",
      "douyin",
    ],
    descriptionFallback: { en: "Creative app.", zh: "创作类应用。" },
  },
  {
    title: "GUI: DevOps & Virtualization",
    subtitle: {
      en: "Virtualization, containers, and system tools",
      zh: "虚拟化、容器与系统相关",
    },
    casks: [
      "orbstack",
      "parallels",
      "vmware-fusion",
      "utm",
      "windows-app",
      "unity-hub",
      "fission-cli",
    ],
    descriptionFallback: {
      en: "DevOps / virtualization app.",
      zh: "DevOps / 虚拟化工具。",
    },
  },
  {
    title: "GUI: Networking",
    subtitle: {
      en: "Networking, proxying, and packet capture",
      zh: "网络、代理与抓包",
    },
    casks: [
      "surge",
      "tailscale-app",
      "zerotier-one",
      "wireshark-app",
      "network-radar",
      "reqable",
      "yaak",
    ],
    descriptionFallback: { en: "Networking tool.", zh: "网络工具。" },
  },
  {
    title: "GUI: Storage & Sync",
    subtitle: {
      en: "Cloud storage, sync, and transfer",
      zh: "云盘、同步与传输",
    },
    casks: ["google-drive", "megasync", "adrive", "localsend"],
    descriptionFallback: {
      en: "Sync / transfer app.",
      zh: "同步 / 传输工具。",
    },
  },
  {
    title: "GUI: Security",
    subtitle: { en: "Security and inspection tools", zh: "安全与鉴别工具" },
    casks: ["1password", "1password-cli", "suspicious-package", "apparency"],
    descriptionFallback: { en: "Security tool.", zh: "安全工具。" },
  },
  {
    title: "GUI: Gaming",
    subtitle: { en: "Gaming and streaming", zh: "游戏与串流" },
    casks: [
      "steam",
      "epic-games",
      "minecraft",
      "nvidia-geforce-now",
      "moonlight",
    ],
    descriptionFallback: {
      en: "Game / streaming client.",
      zh: "游戏 / 串流客户端。",
    },
  },
  {
    title: "GUI: Utilities",
    subtitle: {
      en: "System enhancements and utilities",
      zh: "系统增强与杂项工具",
    },
    casks: [
      "alt-tab",
      "loop",
      "mediamate",
      "balenaetcher",
      "motrix",
      "thunder",
      "spacedrive",
      "setapp",
      "fastmail",
      "folo",
      "tigervnc-viewer",
      "whisky",
      "qflipper",
      "rustdesk",
      "syntax-highlight",
      "raycast",
    ],
    descriptionFallback: { en: "Utility app.", zh: "系统工具。" },
  },
  {
    title: "Fonts",
    subtitle: { en: "Fonts (Homebrew casks)", zh: "字体（Homebrew cask）" },
    casks: [
      "font-fira-code",
      "font-fira-code-nerd-font",
      "font-fontawesome",
      "font-hack-nerd-font",
      "font-jetbrains-mono",
      "font-jetbrains-mono-nerd-font",
      "font-noto-color-emoji",
      "font-symbols-only-nerd-font",
    ],
    descriptionFallback: { en: "Font package.", zh: "字体包。" },
  },
];

const GUI_CASKS_COVERED = Array.from(
  new Set(GUI_GROUPS.flatMap((g) => g.casks)),
).filter((c) => CASK_SET.has(c));
const GUI_CASKS_MISSING = assertAllCasksCovered(GUI_CASKS_COVERED);

const buildGuiCategories = (locale: UseLocale): ToolCategory[] => {
  const overrides = locale === "zh" ? CASK_OVERRIDES_ZH : CASK_OVERRIDES_EN;

  const built = GUI_GROUPS.map<ToolCategory>((group) => ({
    title: group.title,
    subtitle: group.subtitle[locale],
    tools: group.casks
      .filter((c) => CASK_SET.has(c))
      .map((cask) =>
        caskTool(cask, overrides[cask], group.descriptionFallback[locale]),
      ),
  }));

  // De-dupe any accidental duplicates inside groups (e.g., google-drive).
  const deduped = built.map<ToolCategory>((cat) => {
    const seen = new Set<string>();
    const tools = cat.tools.filter((tool) => {
      if (seen.has(tool.brew ?? tool.name)) return false;
      seen.add(tool.brew ?? tool.name);
      return true;
    });
    return { ...cat, tools };
  });

  if (GUI_CASKS_MISSING.length === 0) return deduped;

  const other: ToolCategory = {
    title: "GUI: Other",
    subtitle:
      locale === "zh"
        ? "未归类的 GUI 应用（后续可继续细分）"
        : "Uncategorized GUI apps (can be refined later).",
    tools: GUI_CASKS_MISSING.map((cask) =>
      caskTool(
        cask,
        overrides[cask],
        locale === "zh" ? "macOS 应用。" : "macOS application.",
      ),
    ),
  };

  return [...deduped, other];
};

// ---- CLI / non-GUI tools (Nix + Brew) ----
// (Language runtimes like go/rust/zig are intentionally omitted per earlier request;
// we keep "tools" like mise/uv and general build utilities.)
export const USE_CATEGORIES_EN: ToolCategory[] = [
  {
    title: "System Utilities",
    subtitle: "Everyday shell and system utilities",
    tools: [
      formulaTool("xz", {
        description: "General-purpose compression with high ratios.",
        brew: "brew install xz",
        nix: "nix profile install nixpkgs#xz",
      }),
      formulaTool("zstd", {
        description: "Modern compression balancing speed and ratio.",
        brew: "brew install zstd",
        nix: "nix profile install nixpkgs#zstd",
      }),
      formulaTool("p7zip", {
        description: "7z archive tool.",
        brew: "brew install p7zip",
        nix: "nix profile install nixpkgs#p7zip",
      }),
      formulaTool("ouch", {
        description: "Unified CLI for decompressing archives.",
        brew: "brew install ouch",
        nix: "nix profile install nixpkgs#ouch",
      }),
      formulaTool("age", {
        description: "Modern, easy-to-use file encryption.",
        brew: "brew install age",
        nix: "nix profile install nixpkgs#age",
      }),
      formulaTool("wget", {
        description: "Classic command-line downloader.",
        brew: "brew install wget",
        nix: "nix profile install nixpkgs#wget",
      }),
      formulaTool("curl", {
        description: "Powerful data transfer and HTTP client.",
        brew: "brew install curl",
        nix: "nix profile install nixpkgs#curl",
      }),
      formulaTool("lsd", {
        description: "Modern `ls` replacement.",
        brew: "brew install lsd",
        nix: "nix profile install nixpkgs#lsd",
      }),
      formulaTool("eza", {
        description: "Featureful `ls` replacement written in Rust.",
        brew: "brew install eza",
        nix: "nix profile install nixpkgs#eza",
      }),
      formulaTool("bat", {
        description: "`cat` clone with syntax highlighting.",
        brew: "brew install bat",
        nix: "nix profile install nixpkgs#bat",
      }),
      formulaTool("btop", {
        description: "Resource monitor.",
        brew: "brew install btop",
        nix: "nix profile install nixpkgs#btop",
      }),
      formulaTool("htop", {
        description: "Interactive process viewer.",
        brew: "brew install htop",
        nix: "nix profile install nixpkgs#htop",
      }),
      formulaTool("jq", {
        description: "Command-line JSON processor.",
        brew: "brew install jq",
        nix: "nix profile install nixpkgs#jq",
      }),
      formulaTool("fzf", {
        description: "Fuzzy finder.",
        brew: "brew install fzf",
        nix: "nix profile install nixpkgs#fzf",
      }),
      formulaTool("fd", {
        description: "Simple, fast alternative to `find`.",
        brew: "brew install fd",
        nix: "nix profile install nixpkgs#fd",
      }),
      formulaTool("ripgrep", {
        description: "Blazing-fast text search.",
        brew: "brew install ripgrep",
        nix: "nix profile install nixpkgs#ripgrep",
      }),
      formulaTool("macchina", {
        description: "System information in the terminal.",
        brew: "brew install macchina",
        nix: "nix profile install nixpkgs#macchina",
      }),
      formulaTool("procs", {
        description: "Modern replacement for `ps`.",
        brew: "brew install procs",
        nix: "nix profile install nixpkgs#procs",
      }),
      formulaTool("tree", {
        description: "Display directories as a tree.",
        brew: "brew install tree",
        nix: "nix profile install nixpkgs#tree",
      }),
      formulaTool("yazi", {
        description: "Terminal file manager.",
        brew: "brew install yazi",
        nix: "nix profile install nixpkgs#yazi",
      }),
      formulaTool("zellij", {
        description: "Terminal multiplexer.",
        brew: "brew install zellij",
        nix: "nix profile install nixpkgs#zellij",
      }),
      formulaTool("zoxide", {
        description: "Smarter `cd` with frecency.",
        brew: "brew install zoxide",
        nix: "nix profile install nixpkgs#zoxide",
      }),
      formulaTool("starship", {
        description: "Fast, cross-shell prompt.",
        brew: "brew install starship",
        nix: "nix profile install nixpkgs#starship",
      }),
    ],
  },
  {
    title: "Editors (CLI)",
    subtitle: "Terminal editors",
    tools: [
      formulaTool("helix", {
        description: "Modern modal editor.",
        brew: "brew install helix",
        nix: "nix profile install nixpkgs#helix",
      }),
      formulaTool("neovim", {
        description: "Extensible Vim ecosystem.",
        brew: "brew install neovim",
        nix: "nix profile install nixpkgs#neovim",
      }),
    ],
  },
  {
    title: "Dev Tooling",
    subtitle: "Tooling, formatting, and developer utilities",
    tools: [
      formulaTool("mise", {
        description: "Multi-language version manager and task runner.",
        brew: "brew install mise",
        nix: "nix profile install nixpkgs#mise",
      }),
      formulaTool("uv", {
        description: "Fast Python package and environment manager.",
        brew: "brew install uv",
        nix: "nix profile install nixpkgs#uv",
      }),
      formulaTool("pipx", {
        description:
          "Install and run Python CLI tools in isolated environments.",
        brew: "brew install pipx",
        nix: "nix profile install nixpkgs#pipx",
      }),
      formulaTool("deno", {
        description: "Secure, modern JS/TS runtime.",
        brew: "brew install deno",
        nix: "nix profile install nixpkgs#deno",
      }),
      formulaTool("bun", {
        description: "High-performance JS runtime and toolchain.",
        brew: "brew install bun",
        nix: "nix profile install nixpkgs#bun",
      }),
      formulaTool("biome", {
        description: "All-in-one JS/TS lint + format.",
        brew: "brew install biome",
        nix: "nix profile install nixpkgs#biome",
      }),
      formulaTool("nixfmt-rfc-style", {
        description: "Nix code formatter.",
        brew: "brew install nixfmt-rfc-style",
        nix: "nix profile install nixpkgs#nixfmt-rfc-style",
      }),
      formulaTool("xcodegen", {
        description: "Generate Xcode projects from YAML.",
        brew: "brew install xcodegen",
        nix: "nix profile install nixpkgs#xcodegen",
      }),
      formulaTool("xcbeautify", {
        description: "Prettify Xcode build output.",
        brew: "brew install xcbeautify",
        nix: "nix profile install nixpkgs#xcbeautify",
      }),
      formulaTool("jadx", {
        description: "Android APK decompiler.",
        brew: "brew install jadx",
        nix: "nix profile install nixpkgs#jadx",
      }),
      formulaTool("gh", {
        description: "GitHub CLI.",
        brew: "brew install gh",
        nix: "nix profile install nixpkgs#gh",
      }),
      formulaTool("act", {
        description: "Run GitHub Actions locally.",
        brew: "brew install act",
        nix: "nix profile install nixpkgs#act",
      }),
      formulaTool("direnv", {
        description: "Directory-scoped environment variables.",
        brew: "brew install direnv",
        nix: "nix profile install nixpkgs#direnv",
      }),
      formulaTool("just", {
        description: "Command runner (Make alternative).",
        brew: "brew install just",
        nix: "nix profile install nixpkgs#just",
      }),
      formulaTool("tokei", {
        description: "Code statistics.",
        brew: "brew install tokei",
        nix: "nix profile install nixpkgs#tokei",
      }),
      formulaTool("hyperfine", {
        description: "Command-line benchmarking.",
        brew: "brew install hyperfine",
        nix: "nix profile install nixpkgs#hyperfine",
      }),
    ],
  },
  {
    title: "Network (CLI)",
    subtitle: "Diagnostics and load testing",
    tools: [
      formulaTool("iperf3", {
        description: "Network bandwidth and performance testing.",
        brew: "brew install iperf3",
        nix: "nix profile install nixpkgs#iperf3",
      }),
      formulaTool("mtr", {
        description: "Network path diagnostics.",
        brew: "brew install mtr",
        nix: "nix profile install nixpkgs#mtr",
      }),
      formulaTool("speedtest-go", {
        description: "Speed test from the command line.",
        brew: "brew install speedtest-go",
        nix: "nix profile install nixpkgs#speedtest-go",
      }),
      formulaTool("gping", {
        description: "Ping with graphs.",
        brew: "brew install gping",
        nix: "nix profile install nixpkgs#gping",
      }),
      formulaTool("nmap", {
        description: "Network scanner.",
        brew: "brew install nmap",
        nix: "nix profile install nixpkgs#nmap",
      }),
      formulaTool("oha", {
        description: "HTTP load testing.",
        brew: "brew install oha",
        nix: "nix profile install nixpkgs#oha",
      }),
      formulaTool("doggo", {
        description: "DNS lookup tool.",
        brew: "brew install doggo",
        nix: "nix profile install nixpkgs#doggo",
      }),
    ],
  },
  {
    title: "Media & Data (CLI)",
    subtitle: "Media and data utilities",
    tools: [
      formulaTool("ffmpeg", {
        description: "Media processing toolkit.",
        brew: "brew install ffmpeg",
        nix: "nix profile install nixpkgs#ffmpeg",
      }),
      formulaTool("duckdb", {
        description: "Lightweight analytical database.",
        brew: "brew install duckdb",
        nix: "nix profile install nixpkgs#duckdb",
      }),
      formulaTool("rclone", {
        description: "Sync and migrate across cloud storage providers.",
        brew: "brew install rclone",
        nix: "nix profile install nixpkgs#rclone",
      }),
      formulaTool("scrcpy", {
        description: "Display and control Android devices.",
        brew: "brew install scrcpy",
        nix: "nix profile install nixpkgs#scrcpy",
      }),
      formulaTool("aria2", {
        description: "Multi-connection, high-speed downloader.",
        brew: "brew install aria2",
        nix: "nix profile install nixpkgs#aria2",
      }),
    ],
  },
  {
    title: "AI (CLI)",
    subtitle: "Model tooling and research utilities",
    tools: [
      formulaTool("ollama", {
        description: "Run and manage local LLMs.",
        brew: "brew install ollama",
        nix: "nix profile install nixpkgs#ollama",
      }),
      formulaTool("codex", {
        description: "Command-line AI assistant.",
        brew: "brew install codex",
        nix: "nix profile install nixpkgs#codex",
      }),
      formulaTool("openai-whisper", {
        description: "Speech recognition model CLI.",
        brew: "brew install openai-whisper",
        nix: "nix profile install nixpkgs#openai-whisper",
      }),
      formulaTool("whisper-cpp", {
        description: "C++ implementation of Whisper.",
        brew: "brew install whisper-cpp",
        nix: "nix profile install nixpkgs#whisper-cpp",
      }),
    ],
  },
  ...buildGuiCategories("en"),
];

export const USE_CATEGORIES_ZH: ToolCategory[] = [
  {
    title: "System Utilities",
    subtitle: "日常系统与终端效率工具",
    tools: [
      formulaTool("xz", {
        description: "高压缩比的通用压缩工具。",
        brew: "brew install xz",
        nix: "nix profile install nixpkgs#xz",
      }),
      formulaTool("zstd", {
        description: "速度与压缩率平衡的现代压缩算法与工具。",
        brew: "brew install zstd",
        nix: "nix profile install nixpkgs#zstd",
      }),
      formulaTool("p7zip", {
        description: "7z 格式压缩工具。",
        brew: "brew install p7zip",
        nix: "nix profile install nixpkgs#p7zip",
      }),
      formulaTool("ouch", {
        description: "统一的解压缩命令行工具。",
        brew: "brew install ouch",
        nix: "nix profile install nixpkgs#ouch",
      }),
      formulaTool("age", {
        description: "现代、易用的文件加密工具。",
        brew: "brew install age",
        nix: "nix profile install nixpkgs#age",
      }),
      formulaTool("wget", {
        description: "经典的命令行下载工具。",
        brew: "brew install wget",
        nix: "nix profile install nixpkgs#wget",
      }),
      formulaTool("curl", {
        description: "强大的网络请求与传输工具。",
        brew: "brew install curl",
        nix: "nix profile install nixpkgs#curl",
      }),
      formulaTool("lsd", {
        description: "现代化 `ls` 替代品。",
        brew: "brew install lsd",
        nix: "nix profile install nixpkgs#lsd",
      }),
      formulaTool("eza", {
        description: "Rust 写的 `ls` 增强版。",
        brew: "brew install eza",
        nix: "nix profile install nixpkgs#eza",
      }),
      formulaTool("bat", {
        description: "带语法高亮的 `cat`。",
        brew: "brew install bat",
        nix: "nix profile install nixpkgs#bat",
      }),
      formulaTool("btop", {
        description: "系统资源监控。",
        brew: "brew install btop",
        nix: "nix profile install nixpkgs#btop",
      }),
      formulaTool("htop", {
        description: "交互式进程查看器。",
        brew: "brew install htop",
        nix: "nix profile install nixpkgs#htop",
      }),
      formulaTool("jq", {
        description: "命令行 JSON 处理器。",
        brew: "brew install jq",
        nix: "nix profile install nixpkgs#jq",
      }),
      formulaTool("fzf", {
        description: "模糊搜索与选择器。",
        brew: "brew install fzf",
        nix: "nix profile install nixpkgs#fzf",
      }),
      formulaTool("fd", {
        description: "更快更友好的 `find`。",
        brew: "brew install fd",
        nix: "nix profile install nixpkgs#fd",
      }),
      formulaTool("ripgrep", {
        description: "速度极快的文本搜索。",
        brew: "brew install ripgrep",
        nix: "nix profile install nixpkgs#ripgrep",
      }),
      formulaTool("macchina", {
        description: "终端系统信息展示。",
        brew: "brew install macchina",
        nix: "nix profile install nixpkgs#macchina",
      }),
      formulaTool("procs", {
        description: "现代化 `ps`。",
        brew: "brew install procs",
        nix: "nix profile install nixpkgs#procs",
      }),
      formulaTool("tree", {
        description: "目录树展示。",
        brew: "brew install tree",
        nix: "nix profile install nixpkgs#tree",
      }),
      formulaTool("yazi", {
        description: "终端文件管理器。",
        brew: "brew install yazi",
        nix: "nix profile install nixpkgs#yazi",
      }),
      formulaTool("zellij", {
        description: "终端多路复用器。",
        brew: "brew install zellij",
        nix: "nix profile install nixpkgs#zellij",
      }),
      formulaTool("zoxide", {
        description: "智能目录跳转。",
        brew: "brew install zoxide",
        nix: "nix profile install nixpkgs#zoxide",
      }),
      formulaTool("starship", {
        description: "跨平台终端提示符。",
        brew: "brew install starship",
        nix: "nix profile install nixpkgs#starship",
      }),
    ],
  },
  {
    title: "Editors (CLI)",
    subtitle: "终端编辑器",
    tools: [
      formulaTool("helix", {
        description: "现代 modal 编辑器。",
        brew: "brew install helix",
        nix: "nix profile install nixpkgs#helix",
      }),
      formulaTool("neovim", {
        description: "可扩展的 Vim 生态。",
        brew: "brew install neovim",
        nix: "nix profile install nixpkgs#neovim",
      }),
    ],
  },
  {
    title: "Dev Tooling",
    subtitle: "版本管理、格式化与开发工具",
    tools: [
      formulaTool("mise", {
        description: "跨语言版本管理与任务运行器。",
        brew: "brew install mise",
        nix: "nix profile install nixpkgs#mise",
      }),
      formulaTool("uv", {
        description: "更快的 Python 包与环境管理。",
        brew: "brew install uv",
        nix: "nix profile install nixpkgs#uv",
      }),
      formulaTool("pipx", {
        description: "隔离安装与运行 Python 工具。",
        brew: "brew install pipx",
        nix: "nix profile install nixpkgs#pipx",
      }),
      formulaTool("deno", {
        description: "安全、现代的 JS/TS 运行时。",
        brew: "brew install deno",
        nix: "nix profile install nixpkgs#deno",
      }),
      formulaTool("bun", {
        description: "高性能 JS 运行时与工具链。",
        brew: "brew install bun",
        nix: "nix profile install nixpkgs#bun",
      }),
      formulaTool("biome", {
        description: "一体化 JS/TS Lint/Format。",
        brew: "brew install biome",
        nix: "nix profile install nixpkgs#biome",
      }),
      formulaTool("nixfmt-rfc-style", {
        description: "Nix 代码格式化。",
        brew: "brew install nixfmt-rfc-style",
        nix: "nix profile install nixpkgs#nixfmt-rfc-style",
      }),
      formulaTool("xcodegen", {
        description: "基于 YAML 生成 Xcode 工程。",
        brew: "brew install xcodegen",
        nix: "nix profile install nixpkgs#xcodegen",
      }),
      formulaTool("xcbeautify", {
        description: "让 Xcode 构建输出更清爽。",
        brew: "brew install xcbeautify",
        nix: "nix profile install nixpkgs#xcbeautify",
      }),
      formulaTool("jadx", {
        description: "Android APK 反编译。",
        brew: "brew install jadx",
        nix: "nix profile install nixpkgs#jadx",
      }),
      formulaTool("gh", {
        description: "GitHub CLI。",
        brew: "brew install gh",
        nix: "nix profile install nixpkgs#gh",
      }),
      formulaTool("act", {
        description: "本地运行 GitHub Actions。",
        brew: "brew install act",
        nix: "nix profile install nixpkgs#act",
      }),
      formulaTool("direnv", {
        description: "目录级环境变量管理。",
        brew: "brew install direnv",
        nix: "nix profile install nixpkgs#direnv",
      }),
      formulaTool("just", {
        description: "任务运行器。",
        brew: "brew install just",
        nix: "nix profile install nixpkgs#just",
      }),
      formulaTool("tokei", {
        description: "代码统计。",
        brew: "brew install tokei",
        nix: "nix profile install nixpkgs#tokei",
      }),
      formulaTool("hyperfine", {
        description: "命令行基准测试。",
        brew: "brew install hyperfine",
        nix: "nix profile install nixpkgs#hyperfine",
      }),
    ],
  },
  {
    title: "Network (CLI)",
    subtitle: "网络诊断与压测",
    tools: [
      formulaTool("iperf3", {
        description: "网络带宽与性能测试。",
        brew: "brew install iperf3",
        nix: "nix profile install nixpkgs#iperf3",
      }),
      formulaTool("mtr", {
        description: "网络链路诊断。",
        brew: "brew install mtr",
        nix: "nix profile install nixpkgs#mtr",
      }),
      formulaTool("speedtest-go", {
        description: "命令行测速。",
        brew: "brew install speedtest-go",
        nix: "nix profile install nixpkgs#speedtest-go",
      }),
      formulaTool("gping", {
        description: "带可视化图表的 ping。",
        brew: "brew install gping",
        nix: "nix profile install nixpkgs#gping",
      }),
      formulaTool("nmap", {
        description: "网络扫描。",
        brew: "brew install nmap",
        nix: "nix profile install nixpkgs#nmap",
      }),
      formulaTool("oha", {
        description: "HTTP 压测。",
        brew: "brew install oha",
        nix: "nix profile install nixpkgs#oha",
      }),
      formulaTool("doggo", {
        description: "DNS 查询工具。",
        brew: "brew install doggo",
        nix: "nix profile install nixpkgs#doggo",
      }),
    ],
  },
  {
    title: "Media & Data (CLI)",
    subtitle: "多媒体与数据工具",
    tools: [
      formulaTool("ffmpeg", {
        description: "多媒体处理工具箱。",
        brew: "brew install ffmpeg",
        nix: "nix profile install nixpkgs#ffmpeg",
      }),
      formulaTool("duckdb", {
        description: "轻量分析型数据库。",
        brew: "brew install duckdb",
        nix: "nix profile install nixpkgs#duckdb",
      }),
      formulaTool("rclone", {
        description: "跨云存储同步与迁移。",
        brew: "brew install rclone",
        nix: "nix profile install nixpkgs#rclone",
      }),
      formulaTool("scrcpy", {
        description: "安卓投屏与控制。",
        brew: "brew install scrcpy",
        nix: "nix profile install nixpkgs#scrcpy",
      }),
      formulaTool("aria2", {
        description: "多连接高速下载器。",
        brew: "brew install aria2",
        nix: "nix profile install nixpkgs#aria2",
      }),
    ],
  },
  {
    title: "AI (CLI)",
    subtitle: "模型与研究相关工具",
    tools: [
      formulaTool("ollama", {
        description: "本地大模型运行与管理。",
        brew: "brew install ollama",
        nix: "nix profile install nixpkgs#ollama",
      }),
      formulaTool("codex", {
        description: "命令行 AI 助手。",
        brew: "brew install codex",
        nix: "nix profile install nixpkgs#codex",
      }),
      formulaTool("openai-whisper", {
        description: "语音识别模型 CLI。",
        brew: "brew install openai-whisper",
        nix: "nix profile install nixpkgs#openai-whisper",
      }),
      formulaTool("whisper-cpp", {
        description: "whisper 的 C++ 实现。",
        brew: "brew install whisper-cpp",
        nix: "nix profile install nixpkgs#whisper-cpp",
      }),
    ],
  },
  ...buildGuiCategories("zh"),
];

export function resolveUseLocale(params?: {
  requested?: string | null;
}): UseLocale {
  const requested = (params?.requested ?? "").toLowerCase();
  return requested === "zh" ? "zh" : "en";
}

export function getUseCategories(locale: UseLocale): ToolCategory[] {
  return locale === "zh" ? USE_CATEGORIES_ZH : USE_CATEGORIES_EN;
}
