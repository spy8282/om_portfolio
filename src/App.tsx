import { useRef, useEffect, type MouseEvent, type FormEvent } from "react";
import {
  motion,
  useScroll,
  useSpring,
  animate,
  type Variants,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  Download,
  ChevronRight,
  Code2,
  Briefcase,
  GraduationCap,
  MapPin,
  Phone,
} from "lucide-react";

// ---------------- Types ----------------

type SectionKey =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "contact";

// ---------------- Motion Variants ----------------

const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const popBehindText: Variants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.92,
    rotateX: -12,
    filter: "blur(3px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const popBehindCard: Variants = {
  initial: { opacity: 0, y: 30, scale: 0.95, rotateX: -8, filter: "blur(2px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const stagger = (delayChildren = 0.12, staggerChildren = 0.08): Variants => ({
  animate: { transition: { delayChildren, staggerChildren } },
});

// ---------------- Little Helpers ----------------

function Reveal({
  children,
  variants = fadeUp,
  amount = 0.45,
}: {
  children: React.ReactNode;
  variants?: Variants;
  amount?: number;
}) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

function Orbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-56 w-56 rounded-full blur-3xl opacity-20"
          style={{
            background:
              i % 2 === 0
                ? "radial-gradient(closest-side, rgba(168,85,247,0.6), rgba(168,85,247,0))"
                : "radial-gradient(closest-side, rgba(236,72,153,0.5), rgba(236,72,153,0))",
            left: `${(i * 13) % 90}%`,
            top: `${(i * 23) % 80}%`,
          }}
          animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
          transition={{ duration: 6 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ---------------- Component ----------------

export default function App() {
  // ✅ no explicit type annotation on `sections`
// ✅ useRef<HTMLDivElement>(null) (no `| null` in the generic)
const sections = {
  home: useRef<HTMLDivElement>(null),
  about: useRef<HTMLDivElement>(null),
  skills: useRef<HTMLDivElement>(null),
  projects: useRef<HTMLDivElement>(null),
  experience: useRef<HTMLDivElement>(null),
  contact: useRef<HTMLDivElement>(null),
} satisfies Record<SectionKey, React.RefObject<HTMLDivElement>>;

const scrollTo = (key: SectionKey) => {
  sections[key].current?.scrollIntoView({ behavior: "smooth", block: "start" });
};

  const projects = [
    {
      title: "Epilepsy Detection ML",
      desc: "SVM-based seizure prediction with live EEG wave plots and inference UI.",
      tags: ["Python", "SVM", "Signal Processing", "Matplotlib"],
      live: "#",
      repo: "#",
    },
    {
      title: "Used Cars Analytics",
      desc: "EDA on pricing, top brands, and customer preferences for targeted insights.",
      tags: ["Python", "Pandas", "EDA", "Plotly"],
      live: "#",
      repo: "#",
    },
    {
      title: "Expats Mate (WIP)",
      desc: "Responsive landing with custom German city selector and multi-step forms.",
      tags: ["HTML", "CSS", "JS", "Responsive"],
      live: "#",
      repo: "#",
    },
  ];

  const skills = [
    { name: "Java", level: 85 },
    { name: "Python (Data Analysis)", level: 80 },
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 75 },
    { name: "React", level: 70 },
    { name: "SQL", level: 70 },
    { name: "Git/GitHub", level: 80 },
    { name: "Basics: ML / EDA", level: 65 },
  ];

  // Top scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.2,
  });

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0033] via-[#1a001a] to-black text-white">
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-fuchsia-500 to-purple-400"
      />

      {/* Top Nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#1a001a]/60 bg-[#1a001a]/70 border-b border-purple-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <motion.button
            onClick={() => scrollTo("home")}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 font-semibold text-purple-300"
          >
            <Code2 className="h-5 w-5" /> Om Raut
          </motion.button>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {(Object.keys(sections) as SectionKey[]).map((k) => (
              <motion.button
                key={k}
                onClick={() => scrollTo(k)}
                whileHover={{ y: -2, color: "#e9d5ff" }}
                whileTap={{ scale: 0.98 }}
                className="transition"
              >
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </motion.button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <motion.a
              href="#"
              aria-label="GitHub"
              className="p-2 hover:bg-purple-900/50 rounded-xl"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, rotate: [-2, 2, 0] }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
            >
              <Github className="h-5 w-5 text-purple-300" />
            </motion.a>
            <motion.a
              href="#"
              aria-label="LinkedIn"
              className="p-2 hover:bg-purple-900/50 rounded-xl"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, rotate: [2, -2, 0] }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
            >
              <Linkedin className="h-5 w-5 text-purple-300" />
            </motion.a>
            <motion.a
              href="mailto:om@example.com"
              aria-label="Email"
              className="p-2 hover:bg-purple-900/50 rounded-xl"
              whileHover={{ y: -2 }}
            >
              <Mail className="h-5 w-5 text-purple-300" />
            </motion.a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section ref={sections.home} className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-900/40 via-[#1a001a] to-black" />
        <Orbs />
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div style={{ perspective: 1200 }}>
            <Reveal variants={popBehindText}>
              <p className="inline-flex items-center gap-2 rounded-full bg-purple-800 text-white text-xs px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to Opportunities
              </p>
            </Reveal>
            <Reveal variants={popBehindText}>
              <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-200 to-purple-300 [background-size:200%_auto] animate-[shimmer_6s_linear_infinite]">
                Om Madhav Raut
              </h1>
            </Reveal>
            <Reveal variants={fadeUp}>
              <p className="mt-4 text-lg text-gray-300">
                Software Developer & Data Analyst — I build clean, fast, and accessible web experiences and turn messy data into clear insights.
              </p>
            </Reveal>
            <motion.div
              variants={stagger(0.15, 0.1)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <motion.a
                variants={fadeUp}
                href="#projects"
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  scrollTo("projects");
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-purple-800 text-white px-4 py-2 transition shadow hover:shadow-fuchsia-700/30"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects <ChevronRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                variants={fadeUp}
                href="/om_resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-2xl border border-purple-700 px-4 py-2 hover:bg-purple-900/30 transition"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="h-4 w-4 text-purple-300" /> Download CV
              </motion.a>
            </motion.div>
            <Reveal variants={fadeUp}>
              <div className="mt-5 flex items-center gap-4 text-sm text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-purple-400" /> Ahmednagar / Pune, IN
                </span>
                <span className="inline-flex items-center gap-1">
                  <Phone className="h-4 w-4 text-purple-400" /> +91-8329005775
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={sections.about} className="mx-auto max-w-6xl px-4 py-16 text-gray-200">
        <div style={{ perspective: 1200 }}>
          <Reveal variants={popBehindText}>
            <h2 className="text-3xl font-bold text-purple-300">About</h2>
          </Reveal>
          <Reveal variants={popBehindText}>
            <p className="mt-4 text-gray-300 max-w-3xl">
              I'm a Computer Science engineer passionate about building modern, responsive web apps and data-driven solutions. I focus on writing clean code and creating visually engaging experiences while using analytics to derive insights from complex data. Outside code, I enjoy the gym, where consistency fuels both strength and discipline.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section ref={sections.skills} className="mx-auto max-w-6xl px-4 py-16 text-gray-200">
        <Reveal variants={popBehindText}>
          <h2 className="text-3xl font-bold text-purple-300">Skills</h2>
        </Reveal>
        <motion.div
          variants={stagger(0.1, 0.08)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skills.map((s) => (
            <motion.div key={s.name} variants={popBehindCard} className="rounded-2xl border border-purple-800 bg-[#12001f] p-5 shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-purple-200">{s.name}</span>
                <span className="text-sm text-gray-400">{s.level}%</span>
              </div>
              <div className="mt-3 h-2.5 w-full rounded-full bg-gray-700 overflow-hidden">
                <motion.div
                  className="h-2.5 rounded-full bg-purple-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Projects */}
      <section ref={sections.projects} className="mx-auto max-w-6xl px-4 py-16 text-gray-200">
        <div style={{ perspective: 1200 }}>
          <Reveal variants={popBehindText}>
            <h2 className="text-3xl font-bold text-purple-300 flex items-center gap-2">
              <Code2 className="h-6 w-6" /> Projects
            </h2>
          </Reveal>
          <motion.div
            variants={stagger(0.1, 0.08)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.35 }}
            className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((p) => (
              <motion.article
                key={p.title}
                variants={popBehindCard}
                whileHover={{ y: -6, rotateZ: 0.3 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="rounded-2xl border border-purple-800 bg-[#12001f] p-5 shadow-md flex flex-col"
              >
                <h3 className="text-lg font-semibold text-purple-200">{p.title}</h3>
                <p className="mt-2 text-gray-300">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-purple-700 px-2 py-0.5 text-xs text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  <motion.a
                    href={p.live}
                    className="inline-flex items-center gap-1 text-sm text-purple-300 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 2 }}
                  >
                    <ExternalLink className="h-4 w-4" /> Live
                  </motion.a>
                  <motion.a
                    href={p.repo}
                    className="inline-flex items-center gap-1 text-sm text-purple-300 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 2 }}
                  >
                    <Github className="h-4 w-4" /> Code
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience & Education */}
      <section ref={sections.experience} className="mx-auto max-w-6xl px-4 py-16 text-gray-200">
        <div style={{ perspective: 1200 }}>
          <Reveal variants={popBehindText}>
            <h2 className="text-3xl font-bold text-purple-300 flex items-center gap-2">
              <Briefcase className="h-6 w-6" /> Experience & Education
            </h2>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Reveal variants={popBehindCard}>
              <div className="rounded-2xl border border-purple-800 bg-[#12001f] p-5 shadow-md">
                <h3 className="font-semibold text-purple-200">Experience</h3>
                <ul className="mt-3 space-y-3 text-gray-300">
                  <li>
                    <p className="font-medium">Trainee / Apprentice — LTIMindtree (Offer)</p>
                    <p className="text-sm text-gray-400">
                      Tracks: Java Full-Stack • DevOps • Cloud (open to rotations)
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Projects & Freelance</p>
                    <p className="text-sm text-gray-400">
                      Landing pages, responsive websites, and analytics dashboards.
                    </p>
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal variants={popBehindCard}>
              <div className="rounded-2xl border border-purple-800 bg-[#12001f] p-5 shadow-md">
                <h3 className="font-semibold text-purple-200 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" /> Education
                </h3>
                <p className="mt-2 text-gray-300">
                  B.E. in Computer Science & Engineering, 2025
                </p>
                <p className="text-sm text-gray-400">
                  Savitribai Phule Pune University (SPPU)
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section ref={sections.contact} className="mx-auto max-w-6xl px-4 py-16 text-gray-200">
        <div style={{ perspective: 1200 }}>
          <Reveal variants={popBehindText}>
            <h2 className="text-3xl font-bold text-purple-300 flex items-center gap-2">
              <Mail className="h-6 w-6" /> Contact
            </h2>
          </Reveal>
          <Reveal variants={fadeUp}>
            <p className="mt-2 text-gray-300">
              Have a role, freelance project, or idea? Let’s chat.
            </p>
          </Reveal>
          <motion.form
            onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
            variants={stagger(0.15, 0.1)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-6 grid md:grid-cols-2 gap-4"
          >
            <motion.input
              variants={fadeUp}
              className="rounded-2xl border border-purple-800 bg-[#0c0015] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Your name"
            />
            <motion.input
              variants={fadeUp}
              className="rounded-2xl border border-purple-800 bg-[#0c0015] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Email"
              type="email"
            />
            <motion.input
              variants={fadeUp}
              className="md:col-span-2 rounded-2xl border border-purple-800 bg-[#0c0015] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Subject"
            />
            <motion.textarea
              variants={fadeUp}
              className="md:col-span-2 rounded-2xl border border-purple-800 bg-[#0c0015] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Message"
              rows={5}
            />
            <motion.button
              variants={fadeUp}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-800 text-white px-5 py-3 shadow"
            >
              Send Message <ChevronRight className="h-4 w-4" />
            </motion.button>
          </motion.form>
          <Reveal variants={fadeUp}>
            <div className="mt-6 text-sm text-gray-400">
              Prefer email?{' '}
              <a href="mailto:om@example.com" className="underline text-purple-400">
                om@example.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-800 bg-[#0c0015]">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            © {new Date().getFullYear()} Om Raut. All rights reserved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <a className="inline-flex items-center gap-1 underline text-purple-400" href="/om_resume.pdf" download>
              <FileText className="h-4 w-4" /> Resume
            </a>
            <a className="inline-flex items-center gap-1 underline text-purple-400" href="#">
              Privacy
            </a>
          </motion.div>
        </div>
      </footer>

      {/* keyframes for shimmer */}
      <style>{`
        @keyframes shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
      `}</style>
    </div>
  );
}