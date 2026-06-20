import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const EXPERIENCE = [
  {
    years: '2025 – present',
    title: 'Founder & Broker — AI-Native Brokerage',
    org: 'Century 21 CAM Grupo',
    description:
      'Lead a 20+ agent luxury brokerage in Riviera Nayarit. Architected MCP servers for NOM-247 contract generation; operate a private vMLX inference stack on Apple Silicon; Claude-skill library for legal workflows; HDR computer-vision pipeline; market intelligence over 1,500+ MLS transactions with DCF / IRR / Monte Carlo pricing.',
  },
  {
    years: '2021 – 2023',
    title: 'Full Stack Developer (Contractor)',
    org: 'Augusto Consulting',
    description:
      'Decentracare — healthcare gig-economy staffing platform on React + Python/Flask + AWS; grew to 350+ clinicians. ADHD Online -- Vue.js assessment flow and dashboard.',
  },
  {
    years: '2021 – 2022',
    title: 'Core Developer — Protocol & Smart Contracts',
    org: 'xBacked DAO',
    description:
      'Core engineer on xUSD (CDP stablecoin on Algorand): vault contracts, liquidation engine, redemption mechanism, staking, governance, keeper economy. Co-authored Litepaper v2.0; authored ADR-46 (Vault Looping) and ADR-47.',
  },
  {
    years: '2020 – present',
    title: 'Operations & IT (Part-Time)',
    org: 'CAM Grupo -- Construction & Development',
    description:
      'Airtable operations (project tracking, document workflows, lead management); corporate email infrastructure and the marketing website camgrupo.com plus individual sites per development.',
  },
  {
    years: '2019 – 2021',
    title: 'Software Developer II',
    org: 'Oracle -- Big Data Service',
    description:
      'OCI image pipelines migrating on-prem Big Data apps to cloud (TeamCity CI/CD, Docker, Artifactory, Java/Python REST APIs). Global Severity 1 incident support.',
  },
  {
    years: '2018',
    title: 'Software Engineer Intern',
    org: 'ILHGR -- Cancer Genomics Lab',
    description:
      'Built VCF/Plotein (Vue.js, Node.js). Co-author on the resulting paper in Bioinformatics (Oxford Academic), with collaborators from UNAM, Oxford, and Cambridge.',
  },
];

const PROJECTS = [
  {
    title: 'VCF/Plotein',
    description:
      'Clinical genomics web app for visualizing and prioritizing exome VCF variants on protein structures. Published in Bioinformatics (Oxford Academic, 2019). Co-authored with researchers from UNAM, Oxford, and Cambridge.',
    image: '/img/vcfplotein.webp',
    link: 'https://github.com/redcpp/vcfplotein',
  },
  {
    title: 'Nepohualtzintzin',
    description:
      'Interactive web recreation of the Nepohualtzintzin, the pre-Hispanic Mesoamerican base-20 abacus. Vue 2 + Vuex with animated bead toggles.',
    image: '/img/nepohualtzintzin.webp',
    link: 'https://github.com/redcpp/nepohualtzintzin',
  },
  {
    title: 'Algorand Vue RT',
    description:
      'Real-time generative visualization of the Algorand TestNet — every confirmed block rendered as a colored square on a p5.js canvas. Vue 2 + algosdk.',
    image: '/img/algorand-vue-rt.webp',
    link: 'https://github.com/redcpp/algorand-vue-rt',
  },
  {
    title: 'Competitive Programming',
    description:
      '900+ competitive programming solutions in C++ and Python (2015–2018): Codeforces, ACM-ICPC, Project Euler, and more.',
    image: null,
    link: 'https://github.com/redcpp/Competitive-Programming',
  },
];

const EDUCATION = [
  {
    years: '2022',
    title: 'Credential of Readiness (CORe)',
    org: 'Harvard Business School Online',
    description: 'Business Analytics, Economics, Financial Accounting.',
  },
  {
    years: '2015 – 2018',
    title: 'B.Sc. Software Engineering',
    org: 'Universidad Autonoma de Queretaro',
    description: 'Grade: 9.5/10.',
  },
];

const SKILLS = [
  {
    title: 'AI & LLM Systems',
    items:
      'MCP Servers, Claude API & SDK, Claude Code, Claude Skills, Agentic Workflows, Tool-use Design, Prompt Engineering, RAG, On-Prem Inference (vMLX), n8n Automation',
  },
  {
    title: 'Languages',
    items: 'Python, TypeScript / JavaScript, C++, Java, SQL',
  },
  {
    title: 'Frameworks & Data',
    items:
      'Next.js, React, Vue.js, Node.js, Flask, Django, REST APIs, PostgreSQL, Supabase, Tailwind / HTML / CSS, NumPy, Pandas, Matplotlib',
  },
  {
    title: 'Cloud & Infra',
    items:
      'AWS (S3, EC2, Lambda, RDS, CloudFront, IAM, ECS), Oracle Cloud (OCI), Docker, Linux, Bash & Python scripting, tmux, Git, CI/CD',
  },
  {
    title: 'Specialized Domains',
    items:
      'DeFi Protocol Design, Algorand Smart Contracts (Python), Computer Vision (CLAHE, HDR, LUT), Quantitative Finance Modeling, DCF, IRR, Monte Carlo, Algorithmic Problem Solving, Genomics',
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (!state?.scrollTo) return;
    const el = document.getElementById(state.scrollTo);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <div className="max-w-[780px] mx-auto px-6 lg:px-8 pb-16">
      {/* -------------------------------------------------------- */}
      {/*  1. HEADER                                                */}
      {/* -------------------------------------------------------- */}
      <header className="py-16 lg:py-24 text-center">
        <h1 className="text-[28px] lg:text-[32px] font-bold tracking-tight text-ink font-serif">
          Diego Said Anaya Mancilla
        </h1>
        <p className="text-[17px] text-muted mt-2 font-serif">
          Applied AI Engineer &middot; Systems Architect
        </p>
        <p className="text-[14px] font-mono text-muted mt-6">
          Nuevo Vallarta, Nayarit, Mexico
        </p>
        <p className="text-[14px] font-mono mt-1">
          <a href="mailto:redcpp@gmail.com" className="text-accent">
            redcpp@gmail.com
          </a>
          <span className="text-muted"> &middot; </span>
          <a
            href="https://github.com/redcpp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
          >
            github.com/redcpp
          </a>
          <span className="text-muted"> &middot; </span>
          <a
            href="https://linkedin.com/in/redcpp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
          >
            linkedin.com/in/redcpp
          </a>
        </p>
      </header>

      {/* -------------------------------------------------------- */}
      {/*  2. ABOUT                                                 */}
      {/* -------------------------------------------------------- */}
      <section className="border-t border-rule pt-12 mt-12">
        <h2 className="text-[22px] font-bold font-serif">About</h2>
        <p className="mt-4 text-[17px] leading-[1.75] font-serif text-ink">
          Applied AI engineer shipping production LLM systems on top of a strong
          systems and protocol-engineering foundation. 7+ years across enterprise
          cloud, DeFi protocol design, healthcare platforms, and clinical genomics
          — co-author of a paper in <em>Bioinformatics</em> (Oxford Academic).
          Currently seeking remote Applied AI or backend engineering roles.
        </p>
      </section>

      {/* -------------------------------------------------------- */}
      {/*  3. EXPERIENCE                                            */}
      {/* -------------------------------------------------------- */}
      <section className="border-t border-rule pt-12 mt-12">
        <h2 className="text-[22px] font-bold font-serif mb-8">Experience</h2>
        <div className="space-y-0">
          {EXPERIENCE.map((entry) => (
            <div
              key={entry.title}
              className="flex flex-col sm:flex-row sm:gap-8 py-6"
            >
              <div className="w-[140px] shrink-0 font-mono text-[13px] text-muted">
                {entry.years}
              </div>
              <div className="mt-1 sm:mt-0">
                <p className="font-semibold font-serif text-ink">
                  {entry.title}
                </p>
                <p className="italic text-muted text-[15px] mt-0.5 font-serif">
                  {entry.org}
                </p>
                <p className="text-[15px] leading-[1.7] text-ink/85 mt-2 font-serif">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- */}
      {/*  4. OPEN SOURCE                                           */}
      {/* -------------------------------------------------------- */}
      <section className="border-t border-rule pt-12 mt-12">
        <h2 className="text-[22px] font-bold font-serif mb-8">Open Source</h2>
        {PROJECTS.map((project, i) => (
          <div key={project.title} className={i === 0 ? '' : 'mt-10'}>
            <p className="font-semibold text-[18px] font-serif text-ink">
              {project.title}
            </p>
            <p className="text-[15px] leading-[1.7] mt-2 font-serif text-ink">
              {project.description}
            </p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[14px] text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent mt-2 inline-block"
            >
              {project.link.replace('https://', '')}
            </a>
            {project.image && (
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                loading="lazy"
                decoding="async"
                className="rounded-lg border border-rule w-full mt-4"
              />
            )}
          </div>
        ))}
      </section>

      {/* -------------------------------------------------------- */}
      {/*  5. PUBLICATIONS                                          */}
      {/* -------------------------------------------------------- */}
      <section className="border-t border-rule pt-12 mt-12">
        <h2 className="text-[22px] font-bold font-serif mb-6">Publications</h2>
        <p className="text-[15px] leading-[1.7] mb-4 font-serif text-ink">
          [1] D.S. Anaya Mancilla et al. "VCF/Plotein: visualization and
          prioritization of genomic variants from VCF files."{' '}
          <em>Bioinformatics</em>, Oxford Academic, 2019.
        </p>
        <p className="text-[15px] leading-[1.7] mb-4 font-serif text-ink">
          [2] D.S. Anaya Mancilla. "ADR-47: The Case Against PACT xUSD
          Launch." xBacked DAO, 2022.
        </p>
        <p className="text-[15px] leading-[1.7] mb-4 font-serif text-ink">
          [3] D.S. Anaya Mancilla. "ADR-46: Vault Looping." xBacked DAO,
          2022.
        </p>
        <p className="text-[15px] leading-[1.7] mb-4 font-serif text-ink">
          [4] D.S. Anaya Mancilla et al. "xBacked Litepaper v2.0." xBacked
          DAO, 2022.
        </p>
      </section>

      {/* -------------------------------------------------------- */}
      {/*  6. EDUCATION                                             */}
      {/* -------------------------------------------------------- */}
      <section className="border-t border-rule pt-12 mt-12">
        <h2 className="text-[22px] font-bold font-serif mb-8">Education</h2>
        <div className="space-y-0">
          {EDUCATION.map((entry) => (
            <div
              key={entry.title}
              className="flex flex-col sm:flex-row sm:gap-8 py-6"
            >
              <div className="w-[140px] shrink-0 font-mono text-[13px] text-muted">
                {entry.years}
              </div>
              <div className="mt-1 sm:mt-0">
                <p className="font-semibold font-serif text-ink">
                  {entry.title}
                </p>
                <p className="italic text-muted text-[15px] mt-0.5 font-serif">
                  {entry.org}
                </p>
                <p className="text-[15px] leading-[1.7] text-ink/85 mt-2 font-serif">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- */}
      {/*  7. HONORS                                                */}
      {/* -------------------------------------------------------- */}
      <section className="border-t border-rule pt-12 mt-12">
        <h2 className="text-[22px] font-bold font-serif mb-6">Honors</h2>
        <p className="text-[15px] leading-[1.7] font-serif text-ink">
          2018 — ACM-ICPC Regional Finalist, Mexico & Central America
        </p>
        <p className="text-[15px] leading-[1.7] font-serif text-ink">
          2017 — ACM-ICPC Honorable Mention, Mexico & Central America
        </p>
      </section>

      {/* -------------------------------------------------------- */}
      {/*  8. SKILLS                                                */}
      {/* -------------------------------------------------------- */}
      <section className="border-t border-rule pt-12 mt-12">
        <h2 className="text-[22px] font-bold font-serif mb-6">
          Technical Competencies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {SKILLS.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-[15px] font-semibold mb-1 font-serif">
                {cat.title}
              </h3>
              <p className="text-[15px] text-muted leading-relaxed font-serif">
                {cat.items}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[15px] text-muted font-serif">
          Languages: Spanish (native), English (fluent), Italian
          (conversational).
        </p>
      </section>

      {/* -------------------------------------------------------- */}
      {/*  9. CONTACT                                               */}
      {/* -------------------------------------------------------- */}
      <section id="contact" className="border-t border-rule pt-12 mt-12">
        <h2 className="text-[22px] font-bold font-serif mb-6">Contact</h2>
        <div className="space-y-2 font-mono text-[15px]">
          <p>
            Email:{' '}
            <a
              href="mailto:redcpp@gmail.com"
              className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
            >
              redcpp@gmail.com
            </a>
          </p>
          <p className="text-ink">Phone: +52 322 111 7595</p>
          <p>
            GitHub:{' '}
            <a
              href="https://github.com/redcpp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
            >
              github.com/redcpp
            </a>
          </p>
          <p>
            LinkedIn:{' '}
            <a
              href="https://linkedin.com/in/redcpp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
            >
              linkedin.com/in/redcpp
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
