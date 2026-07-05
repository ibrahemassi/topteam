import type { ReactNode } from "react";

function SectionDivider() {
  return (
    <hr className="my-12 border-0 border-t border-white/10 sm:my-16" aria-hidden />
  );
}

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
        {children}
      </div>
    </section>
  );
}

export function VisionPageContent() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffc200] sm:text-sm">
        Top Team Academy | Kingdom of Fighters
      </p>

      <SectionDivider />

      <ContentSection title="A Legacy Built Through Martial Arts">
        <p>
          For over 15 years, Top Team Academy has stood as one of Lebanon&apos;s
          leading martial arts institutions — training champions, developing
          discipline, and shaping character across four branches and a community
          of more than 500 active members.
        </p>
        <p>
          But our journey has never been only about competition. From the
          beginning, we believed martial arts is a language of resilience,
          focus, and self-mastery — a system that develops not just fighters,
          but stronger human beings.
        </p>
      </ContentSection>

      <SectionDivider />

      <ContentSection title="From Academy to Movement">
        <p>That belief evolved into a mission.</p>
        <p>Today, Top Team Academy operates as both:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-[#ffc200]">
          <li>A premier martial arts and gymnastics training center</li>
          <li>
            A registered NGO dedicated to human development through sport
          </li>
        </ul>
        <p>
          We use martial arts as a structured tool for psychosocial support,
          empowerment, and community development — reaching children, youth, and
          communities facing vulnerability and instability.
        </p>
      </ContentSection>

      <SectionDivider />

      <ContentSection title="The Top Team Behavioral Conditioning Model (TBCM)">
        <p>
          At the core of our methodology is the Top Team Behavioral Conditioning
          Model (TBCM) — a structured approach that integrates martial arts
          training with cognitive and behavioral development.
        </p>
        <p>
          TBCM ensures that training goes beyond physical performance and
          directly shapes:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-[#ffc200]">
          <li>Decision-making under pressure</li>
          <li>Emotional regulation</li>
          <li>Behavioral awareness</li>
          <li>Real-life discipline transfer</li>
        </ul>
      </ContentSection>

      <SectionDivider />

      <ContentSection title="Post-Training Cognitive Reset (PTCR)">
        <p>
          Immediately after each session, participants engage in a 10–15 minute
          structured reflection process called the Post-Training Cognitive Reset
          (PTCR).
        </p>
        <p>
          In this phase, we connect real training experiences to real-life
          behavior by exploring:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-[#ffc200]">
          <li>Emotional responses during training</li>
          <li>Decision-making patterns under stress</li>
          <li>Environmental triggers and reactions</li>
          <li>Transfer of discipline from the dojo to daily life</li>
        </ul>
        <p>
          PTCR transforms training from repetition into conscious development.
        </p>
      </ContentSection>

      <SectionDivider />

      <ContentSection title="Programs & Community Impact">
        <p>Our work on the ground includes:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-[#ffc200]">
          <li>
            Psychosocial martial arts programs for children in temporary camps
            across Lebanon, helping reduce stress, build confidence, and prevent
            trauma accumulation
          </li>
          <li>
            Community-based partnerships with municipalities to deliver structured
            training in high-risk areas affected by poverty, violence, and
            substance abuse
          </li>
          <li>
            Safe, disciplined environments that promote emotional regulation,
            resilience, and social connection through sport
          </li>
        </ul>
        <p>
          During periods of crisis, including displacement of people in Saida
          during the war, our programs have supported them through structured
          martial arts activities that restore stability, belonging, and focus.
        </p>
      </ContentSection>

      <SectionDivider />

      <ContentSection title="Our Belief">
        <p>We see martial arts as more than sport.</p>
        <p>
          It is a system for rebuilding discipline where it is lost, restoring
          confidence where it is broken, and creating structure where there is
          instability.
        </p>
      </ContentSection>

      <SectionDivider />

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl">
          From the Kingdom of Fighters
        </h2>
        <div className="mt-5 space-y-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
          <p>We are not only building athletes.</p>
          <p>
            We are building stronger minds, stronger communities, and stronger
            futures.
          </p>
        </div>
      </section>
    </article>
  );
}
