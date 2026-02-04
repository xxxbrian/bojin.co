import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopologyWrap from "@/components/TopologyWrap";
import ToolLibrary from "@/components/use/ToolLibrary";
import {
  getUseCategories,
  resolveUseLocale,
  USE_PAGE_COPY,
} from "@/content/use";

export default async function UsePage(props: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const searchParams = await props.searchParams;
  const locale = resolveUseLocale({
    requested: searchParams?.lang ?? null,
  });

  const copy = USE_PAGE_COPY[locale];
  const categories = getUseCategories(locale);
  const totalTools = categories.reduce(
    (count, category) => count + category.tools.length,
    0,
  );

  return (
    <TopologyWrap>
      <Navbar />
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 right-[-10%] h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />
          <div className="absolute bottom-[-140px] left-[-80px] h-72 w-72 rounded-full bg-emerald-400/10 blur-[120px]" />
          <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-[140px]" />
        </div>

        <div className="container relative mx-auto flex-1 max-w-7xl px-6 pb-24">
          <section className="mt-6 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:grid-cols-[1.2fr,0.8fr]">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.45em] text-white/50">
                {copy.eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {copy.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                {copy.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {copy.statTotalLabel}
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  {totalTools}
                </div>
                <div className="text-xs text-white/50">
                  {copy.statTotalSuffix}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {copy.statInstallLabel}
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  {copy.statInstallValue}
                </div>
                <div className="text-xs text-white/50">
                  {copy.statInstallSuffix}
                </div>
              </div>
            </div>
          </section>

          <ToolLibrary categories={categories} locale={locale} />
        </div>
      </div>
      <Footer path="/use" />
    </TopologyWrap>
  );
}
