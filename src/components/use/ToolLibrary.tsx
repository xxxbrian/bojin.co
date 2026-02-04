"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Globe, Plus, X } from "lucide-react";
import { SiGithub, SiHomebrew, SiNixos } from "@icons-pack/react-simple-icons";
import type React from "react";

export type Tool = {
  name: string;
  description: string;
  brew?: string;
  nix?: string;
  website?: string;
  github?: string;
  // Back-compat for older data. Prefer website/github.
  official?: string;
};

export type ToolCategory = {
  title: string;
  subtitle: string;
  tools: Tool[];
};

export type ToolLibraryLocale = "en" | "zh";

type ToolLinkKind = "brew" | "nix" | "github" | "website";

type ToolLink = {
  kind: ToolLinkKind;
  title: string;
  href: string;
};

const buildLinks = (tool: Tool): ToolLink[] => {
  const links: ToolLink[] = [];
  const website =
    tool.website ??
    (tool.official?.includes("github.com") ? undefined : tool.official);
  const github =
    tool.github ??
    (tool.official?.includes("github.com") ? tool.official : undefined);

  if (website) {
    links.push({ kind: "website", title: "Website", href: website });
  }
  if (github) {
    links.push({ kind: "github", title: "GitHub", href: github });
  }
  if (tool.brew) {
    const brewName = tool.brew.split(" ").pop();
    if (brewName) {
      links.push({
        kind: "brew",
        title: "Homebrew",
        href: tool.brew.includes("--cask")
          ? `https://formulae.brew.sh/cask/${brewName}`
          : `https://formulae.brew.sh/formula/${brewName}`,
      });
    }
  }
  if (tool.nix) {
    const nixAttr = tool.nix.split("#").pop();
    if (nixAttr) {
      links.push({
        kind: "nix",
        title: "Nix",
        href: `https://search.nixos.org/packages?channel=unstable&show=${encodeURIComponent(
          nixAttr,
        )}`,
      });
    }
  }
  return links;
};

const LinkIcon = ({ kind }: { kind: ToolLinkKind }) => {
  const size = 16;

  const mono = (() => {
    switch (kind) {
      case "brew":
        return <SiHomebrew size={size} color="currentColor" />;
      case "nix":
        return <SiNixos size={size} color="currentColor" />;
      case "github":
        return <SiGithub size={size} color="currentColor" />;
      case "website":
        return <Globe size={size} />;
    }
  })();

  const colored = (() => {
    switch (kind) {
      case "brew":
        return <SiHomebrew size={size} color="default" />;
      case "nix":
        return <SiNixos size={size} color="default" />;
      case "github":
        return <SiGithub size={size} color="default" />;
      case "website":
        // We don't have a "default brand color" for generic websites.
        // Keep it tasteful and consistent with the page palette.
        return <Globe size={size} className="text-cyan-300" />;
    }
  })();

  return (
    <span className="relative flex h-4 w-4 items-center justify-center">
      <span className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-200 group-hover/tool:opacity-0 group-hover/link:opacity-0">
        {mono}
      </span>
      <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover/tool:opacity-100 group-hover/link:opacity-100">
        {colored}
      </span>
    </span>
  );
};

const splitIntoColumns = <T,>(items: T[], columns: number) => {
  const result: T[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => {
    result[index % columns].push(item);
  });
  return result;
};

const useCategoryColumns = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const queries = [
      { query: "(min-width: 1280px)", count: 3 },
      { query: "(min-width: 768px)", count: 2 },
      { query: "(min-width: 0px)", count: 1 },
    ];
    const media = queries.map((item) => ({
      ...item,
      media: window.matchMedia(item.query),
    }));

    const update = () => {
      const match = media.find((item) => item.media.matches);
      setCount(match?.count ?? 1);
    };

    update();
    media.forEach((item) => item.media.addEventListener("change", update));
    return () =>
      media.forEach((item) => item.media.removeEventListener("change", update));
  }, []);

  return count;
};

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Non-blocking: clipboard can fail in some browsers / contexts.
  }
};

const COPY: Record<
  ToolLibraryLocale,
  {
    library: string;
    libraryHint: string;
    categoriesCount: (count: number) => string;
    previewMore: (count: number) => string;
    expanded: string;
    toolHint: string;
    noInstall: string;
    copyCmd: (label: string) => string;
  }
> = {
  en: {
    library: "Library",
    libraryHint:
      "Fixed-column layout: no horizontal reflow; expansion only pushes within the same column.",
    categoriesCount: (count) => `${count} categories`,
    previewMore: (count) => `+ ${count} more`,
    expanded: "Expanded",
    toolHint: "click a tool for install & links",
    noInstall: "No install command available.",
    copyCmd: (label) => `Copy ${label} command`,
  },
  zh: {
    library: "Library",
    libraryHint: "固定列布局：不会左右跳位；展开只会挤开同列内容。",
    categoriesCount: (count) => `${count} 个分类`,
    previewMore: (count) => `+ ${count} 个`,
    expanded: "展开",
    toolHint: "点工具卡片查看安装与链接",
    noInstall: "暂无安装命令。",
    copyCmd: (label) => `复制 ${label} 命令`,
  },
};

const ToolLibrary = ({
  categories,
  locale = "en",
}: {
  categories: ToolCategory[];
  locale?: ToolLibraryLocale;
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const categoryColumns = useCategoryColumns();
  const t = COPY[locale];

  const toggleCategory = (title: string) => {
    setActiveTool(null);
    setActiveCategory((prev) => (prev === title ? null : title));
  };

  const toggleTool = (categoryTitle: string, toolName: string) => {
    const id = `${categoryTitle}::${toolName}`;
    setActiveTool((prev) => (prev === id ? null : id));
  };

  const columns = splitIntoColumns(categories, categoryColumns);

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.45em] text-white/40">
            {t.library}
          </p>
          <p className="mt-2 text-sm text-white/70">{t.libraryHint}</p>
        </div>
        <div className="shrink-0 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/60">
          {t.categoriesCount(categories.length)}
        </div>
      </div>

      <div
        className="mt-6 grid gap-5"
        style={{
          gridTemplateColumns: `repeat(${categoryColumns}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-5">
            {column.map((category) => {
              const isOpen = activeCategory === category.title;
              const isDimmed = activeCategory && !isOpen;

              const preview = category.tools.slice(
                0,
                categoryColumns >= 3 ? 8 : 6,
              );
              const remaining = Math.max(
                category.tools.length - preview.length,
                0,
              );

              // Inside a category card, keep tools stable as vertical stacks.
              const toolColumns =
                categoryColumns >= 3 ? 2 : categoryColumns >= 2 ? 1 : 1;
              const toolCols = splitIntoColumns(category.tools, toolColumns);

              return (
                <div
                  key={category.title}
                  className={cn(
                    "group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300",
                    isOpen
                      ? "border-white/30 bg-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
                      : "hover:border-white/25 hover:bg-white/10",
                    isDimmed ? "opacity-60 hover:opacity-100" : "",
                  )}
                >
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="block w-full text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex w-full min-w-0 items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-semibold text-white">
                          {category.title}
                        </h2>
                        <p className="mt-1 truncate text-xs uppercase tracking-[0.25em] text-white/50">
                          {category.subtitle}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 text-xs text-white/60">
                        <div className="hidden shrink-0 rounded-full border border-white/10 bg-black/30 px-3 py-1 uppercase tracking-[0.2em] sm:block">
                          {category.tools.length} Tools
                        </div>
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition",
                            isOpen
                              ? "border-white/40 bg-white/10 text-white"
                              : "",
                          )}
                        >
                          {isOpen ? <X size={16} /> : <Plus size={16} />}
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "overflow-hidden px-6 transition-all duration-300",
                        isOpen
                          ? "max-h-0 pb-0 opacity-0"
                          : "max-h-[520px] pb-6 opacity-100",
                      )}
                    >
                      <div className="grid gap-2 text-xs text-white/60 sm:grid-cols-2">
                        {preview.map((tool) => (
                          <div
                            key={tool.name}
                            className="flex min-w-0 items-start gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2 transition group-hover:border-white/20"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                            <div className="min-w-0 flex-1">
                              <div className="truncate font-semibold text-white/80">
                                {tool.name}
                              </div>
                              <div className="mt-1 truncate text-[11px] text-white/40">
                                {tool.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {remaining > 0 ? (
                        <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-white/40">
                          {t.previewMore(remaining)}
                        </div>
                      ) : null}
                    </div>
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden px-6 transition-all duration-300",
                      isOpen
                        ? "max-h-[5000px] pb-6 opacity-100"
                        : "max-h-0 pb-0 opacity-0",
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                        {t.expanded}
                      </div>
                      <div className="hidden text-[11px] uppercase tracking-[0.25em] text-white/40 sm:block">
                        {t.toolHint}
                      </div>
                    </div>

                    <div
                      className="mt-4 grid gap-3"
                      style={{
                        gridTemplateColumns: `repeat(${toolColumns}, minmax(0, 1fr))`,
                      }}
                    >
                      {toolCols.map((toolCol, toolColIndex) => (
                        <div key={toolColIndex} className="flex flex-col gap-3">
                          {toolCol.map((tool) => {
                            const id = `${category.title}::${tool.name}`;
                            const isExpanded = activeTool === id;
                            const links = buildLinks(tool);
                            const installBlocks = [
                              tool.nix
                                ? ({
                                    key: "nix",
                                    label: "Nix",
                                    icon: <SiNixos size={14} />,
                                    command: tool.nix,
                                  } as const)
                                : null,
                              tool.brew
                                ? ({
                                    key: "brew",
                                    label: "Brew",
                                    icon: <SiHomebrew size={14} />,
                                    command: tool.brew,
                                  } as const)
                                : null,
                            ].filter(Boolean) as Array<{
                              key: "nix" | "brew";
                              label: string;
                              icon: React.ReactNode;
                              command: string;
                            }>;

                            return (
                              <div
                                key={tool.name}
                                className={cn(
                                  // No translate/shadow here because the category wrapper animates with overflow-hidden.
                                  "group/tool rounded-2xl border border-white/10 bg-black/25 transition-colors duration-200 hover:border-white/30 hover:bg-white/10",
                                  isExpanded
                                    ? "border-white/35 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                                    : "",
                                )}
                              >
                                <button
                                  onClick={() =>
                                    toggleTool(category.title, tool.name)
                                  }
                                  className="flex w-full min-w-0 items-start justify-between gap-3 px-4 py-4 text-left"
                                  aria-expanded={isExpanded}
                                >
                                  <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-sm font-semibold text-white">
                                      {tool.name}
                                    </h3>
                                    <p className="mt-1 text-xs leading-5 text-white/60 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                                      {tool.description}
                                    </p>
                                  </div>
                                  <span
                                    className={cn(
                                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition",
                                      isExpanded
                                        ? "border-white/40 text-white"
                                        : "group-hover:border-white/40 group-hover:text-white",
                                    )}
                                  >
                                    {isExpanded ? (
                                      <X size={14} />
                                    ) : (
                                      <Plus size={14} />
                                    )}
                                  </span>
                                </button>

                                <div
                                  className={cn(
                                    "overflow-hidden px-4 transition-all duration-300",
                                    isExpanded
                                      ? "max-h-[1400px] pb-4 opacity-100"
                                      : "max-h-0 pb-0 opacity-0",
                                  )}
                                >
                                  {installBlocks.length > 0 ? (
                                    <div
                                      className={cn(
                                        "grid min-w-0 grid-cols-1 gap-2 text-[11px] text-white/70",
                                      )}
                                    >
                                      {installBlocks.map((block) => (
                                        <div
                                          key={block.key}
                                          className="min-w-0 rounded-xl border border-white/10 bg-black/40 px-3 py-2"
                                        >
                                          <div className="mb-2 flex min-w-0 items-center justify-between gap-2 text-[10px] uppercase tracking-[0.25em] text-white/50">
                                            <div className="flex min-w-0 items-center gap-2">
                                              <span className="text-white/70">
                                                {block.icon}
                                              </span>
                                              <span>{block.label}</span>
                                            </div>
                                            <button
                                              type="button"
                                              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-white/60 transition hover:border-white/35 hover:bg-white/10 hover:text-white"
                                              onClick={(event) => {
                                                event.stopPropagation();
                                                void copyText(block.command);
                                              }}
                                              aria-label={t.copyCmd(
                                                block.label,
                                              )}
                                              title={t.copyCmd(block.label)}
                                            >
                                              <Copy size={14} />
                                            </button>
                                          </div>
                                          <code className="block min-w-0 max-w-full overflow-x-auto font-mono whitespace-nowrap">
                                            {block.command}
                                          </code>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-[11px] text-white/40">
                                      {t.noInstall}
                                    </div>
                                  )}
                                  {links.length > 0 ? (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {links.map((link) => (
                                        <a
                                          key={`${link.kind}:${link.href}`}
                                          href={link.href}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="group/link inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/60 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                                          onClick={(event) =>
                                            event.stopPropagation()
                                          }
                                          title={link.title}
                                          aria-label={link.title}
                                        >
                                          <LinkIcon kind={link.kind} />
                                        </a>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToolLibrary;
