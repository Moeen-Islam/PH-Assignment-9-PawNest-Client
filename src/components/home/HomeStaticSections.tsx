import { Heart, Lightbulb, Quote, ShieldCheck, Stethoscope, Users } from "lucide-react";

export default function HomeStaticSections() {
  const successStories = [
    {
      name: "Luna found a family",
      text: "Luna was shy at first, but a caring family adopted her and helped her become playful and confident.",
    },
    {
      name: "Milo's second chance",
      text: "Milo now lives with a student who wanted a calm companion. They spend every evening together.",
    },
    {
      name: "Rocky became a protector",
      text: "Rocky was adopted by a family with children. He is now their loyal friend and home guardian.",
    },
  ];

  const careTips = [
    {
      title: "Prepare a safe space",
      text: "Set up food, water, bedding, and a quiet place before bringing your pet home.",
      icon: ShieldCheck,
    },
    {
      title: "Visit a vet early",
      text: "A health check helps confirm vaccination, nutrition needs, and special care.",
      icon: Stethoscope,
    },
    {
      title: "Build trust slowly",
      text: "Give your pet time to adjust with patience, routine, and gentle attention.",
      icon: Heart,
    },
  ];

  const whyAdopt = [
    {
      title: "Save a life",
      text: "Adoption gives homeless pets a safe home and a new chance to live with love.",
      icon: Heart,
    },
    {
      title: "Support responsible care",
      text: "Adopting helps reduce abandoned animals and supports ethical pet ownership.",
      icon: Users,
    },
    {
      title: "Find a loyal friend",
      text: "Adopted pets often become deeply attached to the families who give them care.",
      icon: Lightbulb,
    },
  ];

  return (
    <div className="space-y-20">
      <section id="success-stories" className="scroll-mt-24 mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
            Success Stories
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Happy endings from real adoptions
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {successStories.map((story) => (
            <div key={story.name} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <Quote className="mb-5 h-8 w-8 text-orange-500" />
              <h3 className="text-xl font-semibold text-white">{story.name}</h3>
              <p className="mt-3 leading-7 text-slate-400">{story.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pet-care-tips" className="scroll-mt-24 border-y border-white/10 bg-white/[0.03] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
            Pet Care Tips
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Simple tips for new pet parents
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {careTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.title} className="rounded-3xl border border-white/10 bg-[#0B1020] p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{tip.title}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{tip.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why-adopt" className="scroll-mt-24 mx-auto max-w-7xl px-6 pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
              Why Adopt?
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Adoption is more than bringing home a pet
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              When you adopt, you give an animal safety, comfort, and a family.
            </p>
          </div>

          <div className="grid gap-5">
            {whyAdopt.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-400">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}