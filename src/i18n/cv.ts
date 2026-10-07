/**
 * The CV page's content in both languages. The two halves have the same
 * shape and the same order, entry for entry, so an edit to one shows where the
 * other needs it. Organization names, publication titles and program names
 * stay as they are officially written.
 */

// Type-only: the tests load this file under Node, which cannot resolve '@/'.
import type { Lang } from '@/i18n';

/** Ironman and Ironman 70.3 results, compiled by CoachCox from the official ones. */
export const IRONMAN = 'https://www.coachcox.co.uk/imstats/athlete/1189560/';

/** Contest rating and solved problems. Where the competitive programming lives now. */
export const LEETCODE = 'https://leetcode.com/u/redcpp/';

// Public verification page: anyone can confirm the credential without asking Diego.
const HBS_CORE = 'https://online.hbs.edu/verify-certificate?dvid=Z2EFLPBY';

interface Entry {
  years: string;
  title: string;
  org: string;
  /** One result per line. Short enough to scan; the essays carry the detail. */
  bullets: string[];
}

interface Degree {
  years: string;
  title: string;
  org: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  /** Intrinsic size, so the page reserves the space before the image loads. */
  image: { src: string; width: number; height: number } | null;
  link: string;
  /** A second, older home for the same work, shown after the main link. */
  archive?: string;
}

interface CV {
  meta: { title: string; description: string };
  role: string;
  headings: {
    about: string;
    experience: string;
    openSource: string;
    publications: string;
    education: string;
    honors: string;
    sport: string;
    skills: string;
  };
  about: string;
  experience: Entry[];
  projects: Project[];
  screenshotAlt: (title: string) => string;
  publications: { ref: string; citation: string; href: string }[];
  education: Degree[];
  /** Newest first. `href` links the entry to where it can be verified. */
  honors: { text: string; href?: string }[];
  /** Endurance results, kept apart from the honors. Same shape, newest first. */
  sport: { text: string; href?: string }[];
  skills: { title: string; items: string }[];
  spokenLanguages: string;
}

// The reference marker is split out so it can set in mono and in the citation
// colour, the way a paper's \cite renders under hyperref, and it links to the
// work the way a \cite does. Citations are the published titles, so both
// languages share them. A site path (/blog/...) is localized where it renders;
// the ADRs and the litepaper link to their annotated posts.
const PUBLICATIONS = [
  {
    ref: '[1]',
    citation:
      'D.S. Anaya Mancilla et al. "VCF/Plotein: visualization and prioritization of genomic variants from human exome sequencing projects." <em>Bioinformatics</em>, Oxford Academic, 2019.',
    href: 'https://doi.org/10.1093/bioinformatics/btz458',
  },
  {
    ref: '[2]',
    citation:
      'D.S. Anaya Mancilla et al. "ADR-47: The Case Against PACT xUSD Launch." xBacked DAO, 2022.',
    href: '/blog/adr47/',
  },
  {
    ref: '[3]',
    citation: 'D.S. Anaya Mancilla et al. "ADR-46: Vault Looping." xBacked DAO, 2022.',
    href: '/blog/adr46/',
  },
  {
    ref: '[4]',
    citation: 'D.S. Anaya Mancilla et al. "xBacked Litepaper v2.0." xBacked DAO, 2022.',
    href: '/blog/xbacked-litepaper/',
  },
];

export const CV: Record<Lang, CV> = {
  en: {
    meta: {
      title: 'CV — Diego Said Anaya Mancilla',
      description:
        'CV of Diego Said Anaya Mancilla: software engineer and business owner. Experience, open source, publications, education and skills.',
    },
    role: 'Software engineer and business owner',
    headings: {
      about: 'Summary',
      experience: 'Experience',
      openSource: 'Open source',
      publications: 'Publications',
      education: 'Education',
      honors: 'Honors & certifications',
      sport: 'Sport',
      skills: 'Technical competencies',
    },
    about:
      'Software engineer with 5+ years building production systems: at Oracle Cloud, as a remote contractor for US teams, and now for my own companies. Python, TypeScript and SQL; REST APIs, data pipelines, cloud infrastructure and LLM integration. Completing an M.S. in Computer Science at CU Boulder. I take on projects as an independent contractor.',
    experience: [
      {
        years: '2024 – present',
        title: 'Owner and technology lead',
        org: 'Century 21 CAM Grupo',
        bullets: [
          'Built a contract-generation service for regulated (NOM-247) real estate documents with document templating and MCP servers over the Claude API; drafting went from days to under an hour.',
          'Designed a market-intelligence dashboard over MLS transaction data (Python, pandas, PostgreSQL): cleaning pipelines, anomaly detection, and absorption by micro-market and price segment.',
          'Run a private on-premise LLM inference stack (Apple Silicon, MLX, Tailscale) so confidential client data never leaves the firm’s network.',
          'Build and maintain four production sites on Astro and Cloudflare, plus DNS, email and Airtable-based operations tracking.',
        ],
      },
      {
        years: '2021 – 2023',
        title: 'Full stack developer (contractor)',
        org: 'Augusto Digital',
        bullets: [
          'Decentracare: took over the MVP of a healthcare staffing platform and owned it for two years (React, Python/Flask, PostgreSQL, AWS); the network grew to 350+ clinicians.',
          'ADHD Online: built and maintained the core assessment flow and patient dashboard in Vue.js, and fixed long-standing production bugs.',
          'Worked fully async with a US team: scoped tickets, shipped weekly, owned deploys and production support.',
        ],
      },
      {
        years: '2021 – 2022',
        title: 'Core developer',
        org: 'xBacked DAO',
        bullets: [
          'Built the web app and wallet connection for xUSD, a collateralized stablecoin on Algorand.',
          'Co-authored the Litepaper v2.0 and the design documents ADR-46 and ADR-47; ADR-47 stopped a launch that would have diluted the collateral.',
          'Published crypto tutorials and two open-source samples featured on the Algorand Developer Portal.',
        ],
      },
      {
        years: '2019 – 2021',
        title: 'Software developer II',
        org: 'Oracle — Big Data Service (OCI)',
        bullets: [
          'Built OCI image pipelines to migrate on-premise Big Data applications to the cloud (Python REST services, Docker, TeamCity, Artifactory).',
          'Global on-call rotation for Severity-1 incidents; root-cause analysis on enterprise production outages.',
        ],
      },
      {
        years: '2018',
        title: 'Software engineer intern',
        org: 'LIIGH — Cancer Genomics Lab',
        bullets: [
          'Designed and built VCF/Plotein (Vue.js, Node.js) for the clinical interpretation of genomic variants from exome sequencing; co-author of the resulting Bioinformatics paper (2019) with UNAM and Cambridge.',
        ],
      },
    ],
    projects: [
      {
        title: 'VCF/Plotein',
        description:
          'Clinical genomics web app for visualizing and prioritizing exome VCF variants on protein structures. Published in Bioinformatics (Oxford Academic, 2019). Co-authored with researchers from UNAM and Cambridge.',
        image: { src: '/img/vcfplotein.webp', width: 3000, height: 2200 },
        link: 'https://github.com/redcpp/vcfplotein',
      },
      {
        title: 'Nepohualtzintzin',
        description:
          'Interactive web recreation of the Nepohualtzintzin, the pre-Hispanic Mesoamerican base-20 abacus. Vue 2 + Vuex with animated bead toggles.',
        image: { src: '/img/nepohualtzintzin.webp', width: 1440, height: 900 },
        link: 'https://github.com/redcpp/nepohualtzintzin',
      },
      {
        title: 'Algorand Vue RT',
        description:
          'Real-time generative visualization of the Algorand TestNet — every confirmed block rendered as a colored square on a p5.js canvas. Vue 2 + algosdk.',
        image: { src: '/img/algorand-vue-rt.webp', width: 2880, height: 1800 },
        link: 'https://github.com/redcpp/algorand-vue-rt',
      },
      {
        title: 'Competitive Programming',
        description:
          'I compete in LeetCode’s weekly contests: a contest rating of 1,733, in the top 12%, with 276 problems solved. Before that, from 2015 to 2018, 900+ solutions in C++ and Python for Codeforces, ACM-ICPC and Project Euler, archived on GitHub.',
        image: null,
        link: LEETCODE,
        archive: 'https://github.com/redcpp/Competitive-Programming',
      },
    ],
    screenshotAlt: (title) => `${title} screenshot`,
    publications: PUBLICATIONS,
    education: [
      {
        years: '2026 – present',
        title: 'M.S. Computer Science (in progress)',
        org: 'University of Colorado Boulder',
        description: '',
      },
      {
        years: '2015 – 2018',
        title: 'B.Sc. Software Engineering',
        org: 'Universidad Autonoma de Queretaro',
        description: 'GPA 9.5/10.',
      },
    ],
    honors: [
      { text: '2025 – 2026 — Member of AMPI México, the Mexican Association of Real Estate Professionals' },
      {
        text: '2022 — Credential of Readiness (CORe), Harvard Business School Online: Business Analytics, Economics for Managers, Financial Accounting',
        href: HBS_CORE,
      },
      { text: '2018 — ACM-ICPC Regional Finalist, Mexico & Central America' },
      { text: '2017 — ACM-ICPC Honorable Mention, Mexico & Central America' },
    ],
    sport: [
      {
        // No link: ZwiftPower shows profiles only to signed-in users.
        text: '2026 — Zwift cycling races, category C: a podium (2nd place) and six top-10 finishes',
      },
      {
        text: '2024 – 2025 — Ironman 70.3 finisher: Riviera Nayarit (2024) and Monterrey (2025)',
        href: IRONMAN,
      },
    ],
    skills: [
      { title: 'Languages', items: 'Python, TypeScript / JavaScript, SQL, C++' },
      {
        title: 'Backend & Data',
        items: 'Flask, Django, Node.js, REST API design, PostgreSQL, pandas, data pipelines, ETL',
      },
      { title: 'Frontend', items: 'React, Next.js, Vue.js, Astro' },
      {
        title: 'Cloud & Infra',
        items:
          'AWS (EC2, S3, Lambda, RDS, ECS, CloudFront), Oracle Cloud (OCI), Cloudflare, Docker, Linux, Git, CI/CD',
      },
      {
        title: 'LLM Integration',
        items: 'Claude / OpenAI APIs, MCP servers, local inference (MLX), document automation',
      },
    ],
    spokenLanguages: 'Languages: Spanish (native), English (fluent), Italian.',
  },

  es: {
    meta: {
      title: 'CV — Diego Said Anaya Mancilla',
      description:
        'CV de Diego Said Anaya Mancilla: ingeniero de software y empresario. Experiencia, código abierto, publicaciones, formación y competencias.',
    },
    role: 'Ingeniero de software y empresario',
    headings: {
      about: 'Resumen',
      experience: 'Experiencia',
      openSource: 'Código abierto',
      publications: 'Publicaciones',
      education: 'Formación',
      honors: 'Distinciones y certificaciones',
      sport: 'Deporte',
      skills: 'Competencias técnicas',
    },
    about:
      'Ingeniero de software con más de 5 años construyendo sistemas en producción: en Oracle Cloud, como contratista remoto para equipos de Estados Unidos y ahora para mis propias empresas. Python, TypeScript y SQL; APIs REST, pipelines de datos, infraestructura en la nube e integración de LLM. Curso la maestría en Ciencias de la Computación en CU Boulder. Acepto proyectos como contratista independiente.',
    experience: [
      {
        years: '2024 – actualidad',
        title: 'Dueño y líder de tecnología',
        org: 'Century 21 CAM Grupo',
        bullets: [
          'Construí un servicio que genera contratos inmobiliarios regulados (NOM-247) con plantillas de documentos y servidores MCP sobre la API de Claude; la redacción pasó de días a menos de una hora.',
          'Diseñé un tablero de inteligencia de mercado sobre transacciones de la MLS (Python, pandas, PostgreSQL): pipelines de limpieza, detección de anomalías y absorción por micromercado y segmento de precio.',
          'Opero un stack privado de inferencia de LLM on-premise (Apple Silicon, MLX, Tailscale) para que los datos confidenciales de los clientes nunca salgan de la red de la empresa.',
          'Construyo y mantengo cuatro sitios en producción con Astro y Cloudflare, además del DNS, el correo y el seguimiento de operaciones en Airtable.',
        ],
      },
      {
        years: '2021 – 2023',
        title: 'Desarrollador full stack (contratista)',
        org: 'Augusto Digital',
        bullets: [
          'Decentracare: tomé el MVP de una plataforma de contratación de personal de salud y fui responsable de ella durante dos años (React, Python/Flask, PostgreSQL, AWS); la red creció a más de 350 clínicos.',
          'ADHD Online: construí y mantuve el flujo principal de evaluación y el panel del paciente en Vue.js, y corregí errores de producción que llevaban tiempo abiertos.',
          'Trabajé de forma totalmente asíncrona con un equipo en Estados Unidos: definía el alcance de los tickets, entregaba cada semana y me encargaba de los despliegues y del soporte en producción.',
        ],
      },
      {
        years: '2021 – 2022',
        title: 'Desarrollador core',
        org: 'xBacked DAO',
        bullets: [
          'Construí la aplicación web y la conexión de wallets de xUSD, una stablecoin colateralizada en Algorand.',
          'Coautor del Litepaper v2.0 y de los documentos de diseño ADR-46 y ADR-47; el ADR-47 detuvo un lanzamiento que habría diluido el colateral.',
          'Publiqué tutoriales de cripto y dos ejemplos de código abierto destacados en el Algorand Developer Portal.',
        ],
      },
      {
        years: '2019 – 2021',
        title: 'Desarrollador de software II',
        org: 'Oracle — Big Data Service (OCI)',
        bullets: [
          'Construí pipelines de imágenes de OCI para migrar a la nube aplicaciones de Big Data on-premise (servicios REST en Python, Docker, TeamCity, Artifactory).',
          'Guardias en la rotación global para incidentes de severidad 1; análisis de causa raíz de caídas en producción de clientes empresariales.',
        ],
      },
      {
        years: '2018',
        title: 'Practicante de ingeniería de software',
        org: 'LIIGH — Laboratorio de Genómica del Cáncer',
        bullets: [
          'Diseñé y construí VCF/Plotein (Vue.js, Node.js) para la interpretación clínica de variantes genómicas de secuenciación de exoma; coautor del artículo resultante en Bioinformatics (2019), con la UNAM y Cambridge.',
        ],
      },
    ],
    projects: [
      {
        title: 'VCF/Plotein',
        description:
          'Aplicación web de genómica clínica para visualizar y priorizar variantes de archivos VCF de exoma sobre estructuras de proteínas. Publicada en Bioinformatics (Oxford Academic, 2019), en coautoría con investigadores de la UNAM y Cambridge.',
        image: { src: '/img/vcfplotein.webp', width: 3000, height: 2200 },
        link: 'https://github.com/redcpp/vcfplotein',
      },
      {
        title: 'Nepohualtzintzin',
        description:
          'Recreación web interactiva del Nepohualtzintzin, el ábaco mesoamericano prehispánico de base 20. Vue 2 + Vuex, con cuentas que se activan con animación.',
        image: { src: '/img/nepohualtzintzin.webp', width: 1440, height: 900 },
        link: 'https://github.com/redcpp/nepohualtzintzin',
      },
      {
        title: 'Algorand Vue RT',
        description:
          'Visualización generativa en tiempo real de la TestNet de Algorand: cada bloque confirmado se dibuja como un cuadro de color en un canvas de p5.js. Vue 2 + algosdk.',
        image: { src: '/img/algorand-vue-rt.webp', width: 2880, height: 1800 },
        link: 'https://github.com/redcpp/algorand-vue-rt',
      },
      {
        title: 'Programación competitiva',
        description:
          'Compito en los concursos semanales de LeetCode: rating de 1,733, dentro del 12% superior, con 276 problemas resueltos. Antes, de 2015 a 2018, más de 900 soluciones en C++ y Python para Codeforces, ACM-ICPC y Project Euler, archivadas en GitHub.',
        image: null,
        link: LEETCODE,
        archive: 'https://github.com/redcpp/Competitive-Programming',
      },
    ],
    screenshotAlt: (title) => `Captura de pantalla de ${title}`,
    publications: PUBLICATIONS,
    education: [
      {
        years: '2026 – actualidad',
        title: 'Maestría en Ciencias de la Computación (en curso)',
        org: 'University of Colorado Boulder',
        description: '',
      },
      {
        years: '2015 – 2018',
        title: 'Licenciatura en Ingeniería de Software',
        org: 'Universidad Autónoma de Querétaro',
        description: 'Promedio 9.5/10.',
      },
    ],
    honors: [
      { text: '2025 – 2026 — Asociado de AMPI México, la Asociación Mexicana de Profesionales Inmobiliarios' },
      {
        text: '2022 — Credential of Readiness (CORe), Harvard Business School Online: Business Analytics, Economics for Managers y Financial Accounting',
        href: HBS_CORE,
      },
      { text: '2018 — Finalista regional del ACM-ICPC, México y Centroamérica' },
      { text: '2017 — Mención honorífica en el ACM-ICPC, México y Centroamérica' },
    ],
    sport: [
      {
        // Sin enlace: ZwiftPower solo muestra perfiles con sesión iniciada.
        text: '2026 — Carreras de ciclismo en Zwift, categoría C: un podio (2.º lugar) y seis top 10',
      },
      {
        text: '2024 – 2025 — Finisher de Ironman 70.3: Riviera Nayarit (2024) y Monterrey (2025)',
        href: IRONMAN,
      },
    ],
    skills: [
      { title: 'Lenguajes', items: 'Python, TypeScript / JavaScript, SQL, C++' },
      {
        title: 'Backend y datos',
        items:
          'Flask, Django, Node.js, diseño de APIs REST, PostgreSQL, pandas, pipelines de datos, ETL',
      },
      { title: 'Frontend', items: 'React, Next.js, Vue.js, Astro' },
      {
        title: 'Nube e infraestructura',
        items:
          'AWS (EC2, S3, Lambda, RDS, ECS, CloudFront), Oracle Cloud (OCI), Cloudflare, Docker, Linux, Git, CI/CD',
      },
      {
        title: 'Integración de LLM',
        items:
          'APIs de Claude y OpenAI, servidores MCP, inferencia local (MLX), automatización de documentos',
      },
    ],
    spokenLanguages: 'Idiomas: español (nativo), inglés (fluido), italiano.',
  },
};
