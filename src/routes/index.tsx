import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, FlaskConical, Truck, Star, ArrowRight } from "lucide-react";
import heroTub from "@/assets/hero-tub.png";
import lifestyle from "@/assets/lifestyle-train.jpg";
import goalMuscle from "@/assets/goal-muscle.jpg";
import goalLean from "@/assets/goal-lean.jpg";
import goalRecovery from "@/assets/goal-recovery.jpg";
import { products, goals, formatINR } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Marquee } from "@/components/site/Marquee";
import { Reveal, Counter, Magnetic } from "@/components/site/Motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kumar & Kumar Sons — Premium Protein & Sports Nutrition" },
      {
        name: "description",
        content:
          "Lab-tested whey protein, isolate, creatine and pre-workout built in India. Batch traceable, athlete approved, free shipping over ₹1,499.",
      },
      { property: "og:title", content: "Kumar & Kumar Sons — Built Different" },
      {
        property: "og:description",
        content: "Premium performance nutrition engineered for people who refuse to settle.",
      },
    ],
  }),
  component: Home,
});

const GOAL_IMAGES: Record<string, string> = {
  "Muscle Gain": goalMuscle,
  "Lean Muscle": goalLean,
  Recovery: goalRecovery,
};

function Home() {
  const bestsellers = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  const featured = products[0]!;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grain-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="pulse-orb absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "var(--gradient-acid)", opacity: 0.18 }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-14 pb-16 sm:px-6 md:grid-cols-2 md:pt-24 md:pb-24">
          <div>
            <Reveal>
              <span className="label-caps inline-flex items-center gap-2 rounded-sm border border-primary/40 px-3 py-1.5 text-primary">
                Made in India · Lab Tested
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display-xl mt-6 text-[3.2rem] sm:text-7xl lg:text-8xl">
                Fuel that
                <br />
                <span className="acid-text">refuses</span>
                <br />
                to settle
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-base text-muted-foreground">
                Kumar &amp; Kumar Sons builds performance nutrition with published labels,
                third-party testing and zero filler math. Train harder. Recover faster.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Link
                    to="/shop"
                    className="acid-glow inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-4 text-xs font-bold tracking-widest text-primary-foreground uppercase"
                  >
                    Shop the range <ArrowRight className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <Link
                  to="/product/$slug"
                  params={{ slug: featured.slug }}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-7 py-4 text-xs font-bold tracking-widest uppercase transition-colors hover:border-primary hover:text-primary"
                >
                  Bestseller — {formatINR(featured.price)}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
                {[
                  { n: 120, s: "k+", l: "Athletes fuelled" },
                  { n: 4.8, s: "★", l: "Average rating", d: 1 },
                  { n: 100, s: "%", l: "Batch tested" },
                ].map((s) => (
                  <div key={s.l}>
                    <dd className="font-display text-3xl font-black text-primary">
                      <Counter to={s.n} suffix={s.s} decimals={s.d ?? 0} />
                    </dd>
                    <dt className="mt-1 text-[0.65rem] tracking-widest text-muted-foreground uppercase">
                      {s.l}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <div
              className="absolute inset-8 rounded-full blur-3xl"
              style={{ background: "var(--gradient-acid)", opacity: 0.22 }}
              aria-hidden="true"
            />
            <img
              src={heroTub}
              alt="Kumar & Kumar Sons signature whey protein tub"
              width={900}
              height={900}
              fetchPriority="high"
              className="float-slow relative mx-auto w-full max-w-md object-contain drop-shadow-2xl"
            />
          </Reveal>
        </div>
      </section>

      <Marquee
        accent
        items={["Free shipping over ₹1,499", "Third-party lab tested", "Batch traceable", "No proprietary blends", "Made in India"]}
      />

      {/* TRUST */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:grid-cols-3 sm:px-6">
        {[
          { Icon: FlaskConical, t: "Lab Tested", d: "Every batch screened for heavy metals and protein content." },
          { Icon: ShieldCheck, t: "Honest Labels", d: "Full disclosure. No amino spiking, no proprietary blends." },
          { Icon: Truck, t: "Fast Delivery", d: "Dispatched in 24 hours. Free above ₹1,499 across India." },
        ].map(({ Icon, t, d }, i) => (
          <Reveal key={t} delay={i * 80} className="rounded-lg border border-border bg-card p-6">
            <Icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="label-caps text-primary">The Line-up</span>
            <h2 className="display-xl mt-3 text-4xl sm:text-5xl">Bestsellers</h2>
          </div>
          <Link
            to="/shop"
            className="label-caps shrink-0 text-muted-foreground transition-colors hover:text-primary"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {bestsellers.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* GOALS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <span className="label-caps text-primary">Shop by goal</span>
        <h2 className="display-xl mt-3 text-4xl sm:text-5xl">Pick your outcome</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((g, i) => (
            <Reveal key={g.name} delay={i * 60}>
              <Link
                to="/shop"
                search={{ goal: g.name }}
                className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-lg border border-border p-5"
              >
                <img
                  src={GOAL_IMAGES[g.name] ?? lifestyle}
                  alt={g.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "var(--gradient-fade)" }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <h3 className="text-2xl">{g.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{g.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LIFESTYLE BANNER */}
      <section className="relative overflow-hidden border-y border-border">
        <img
          src={lifestyle}
          alt="Athlete training in a gym"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <Reveal>
            <h2 className="display-xl max-w-2xl text-4xl sm:text-6xl">
              Built for the ones who <span className="acid-text">show up</span> anyway
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground">
              Cold mornings, heavy sets, long weeks. Our formulas exist to make the work
              count — nothing more, nothing less.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-4 text-xs font-bold tracking-widest text-primary-foreground uppercase"
            >
              Start your stack <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <span className="label-caps text-primary">Proof</span>
        <h2 className="display-xl mt-3 text-4xl sm:text-5xl">What lifters say</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { n: "Arjun M.", c: "Mixes clean, no bloat. Third tub in and my recovery is genuinely different." },
            { n: "Nisha R.", c: "Finally a brand that prints the full label. Isolate is worth every rupee." },
            { n: "Vikram S.", c: "Pre-workout gives focus without the jittery crash. Delivery was 2 days." },
          ].map((r, i) => (
            <Reveal key={r.n} delay={i * 70} className="rounded-lg border border-border bg-card p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">“{r.c}”</p>
              <p className="mt-4 label-caps">{r.n}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
