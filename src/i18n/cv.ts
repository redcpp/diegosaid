/**
 * The home page's content in both languages. The two halves have the same
 * shape and the same order, entry for entry, so an edit to one shows where the
 * other needs it. Organization names, publication titles and program names
 * stay as they are officially written.
 */

import type { Lang } from '@/i18n';

interface Entry {
  years: string;
  title: string;
  org: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  image: string | null;
  link: string;
}

interface CV {
  meta: { description: string };
  role: string;
  location: string;
  headings: {
    about: string;
    experience: string;
    openSource: string;
    publications: string;
    education: string;
    honors: string;
    skills: string;
    contact: string;
  };
  about: string;
  experience: Entry[];
  projects: Project[];
  screenshotAlt: (title: string) => string;
  publications: { ref: string; citation: string; href: string }[];
  education: Entry[];
  honors: string[];
  skills: { title: string; items: string }[];
  spokenLanguages: string;
  contactLabels: { email: string; phone: string };
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
      description:
        'Software engineer building production backend and full-stack systems. Portfolio, publications, and technical writing.',
    },
    role: 'Software Engineer',
    location: 'Vallarta, Mexico (UTC−6)',
    headings: {
      about: 'About',
      experience: 'Experience',
      openSource: 'Open Source',
      publications: 'Publications',
      education: 'Education',
      honors: 'Honors & Diplomas',
      skills: 'Technical Competencies',
      contact: 'Contact',
    },
    about:
      'Software engineer with 5+ years building production backend and full-stack systems as a remote contractor and in-house engineer: REST APIs, data pipelines, cloud deployments, and web applications in Python, TypeScript/JavaScript, and SQL. Comfortable taking over an existing codebase, shipping end-to-end, and working async with US/European teams. Currently completing an M.S. in Computer Science at CU Boulder.',
    experience: [
      {
        years: '2024 – present',
        title: 'Software Engineer Technical Lead',
        org: 'Century 21 CAM Grupo',
        description:
          'Lead operations and commercial strategy for C21 CAM Grupo in Riviera Nayarit. Built an automated contract-generation service for regulated (NOM-247) real estate documents using document templating and MCP servers over the Claude API, cutting drafting time from days to under 1 hour. Designed and shipped a market-intelligence dashboard over MLS transaction data (Python, pandas, PostgreSQL): automated cleaning pipelines, anomaly detection, and absorption metrics by micro-market and price segment. Deployed and operate a private on-premise LLM inference stack (Apple Silicon, MLX, Tailscale) so confidential client data never leaves the firm’s network. Build and maintain four production marketing sites on Astro + Cloudflare (camgrupo.com and one per development), plus DNS, email infrastructure, and Airtable-based operations tracking.',
      },
      {
        years: '2021 – 2023',
        title: 'Full Stack Developer (Contractor)',
        org: 'Augusto Digital',
        description:
          'Decentracare — took over the MVP of a healthcare staffing platform (clinicians and outpatient providers) and owned its evolution for two years across a React frontend, Python/Flask REST backend, PostgreSQL, and AWS (EC2, S3, RDS); network grew to 350+ clinicians. ADHD Online — implemented and maintained the core assessment flow and patient dashboard in Vue.js; fixed long-standing production bugs. Worked fully async with a US-based team: scoped tickets, shipped weekly, and owned deploys and production support.',
      },
      {
        years: '2021 – 2022',
        title: 'Core Developer',
        org: 'xBacked DAO',
        description:
          'Built the web app and wallet connection for xUSD, a collateralized stablecoin on Algorand. Published crypto tutorials and two open-source samples featured on the Algorand Developer Portal (IPFS file sharing, real-time block visualizer). Co-authored the protocol’s Litepaper v2.0 and design documents ADR-46 and ADR-47 on leverage limits and collateral safety; ADR-47 prevented a launch that would have diluted collateral.',
      },
      {
        years: '2019 – 2021',
        title: 'Software Developer II',
        org: 'Oracle — Big Data Service (OCI)',
        description:
          'Built OCI image pipelines to migrate on-premise Big Data applications to the cloud using Python REST services, Docker, TeamCity CI/CD, and Artifactory. Global on-call rotation for Severity-1 incidents; root-cause analysis on enterprise production outages.',
      },
      {
        years: '2018',
        title: 'Software Engineer Intern',
        org: 'LIIGH — Cancer Genomics Lab',
        description:
          'Designed and built VCF/Plotein (Vue.js, Node.js), a web application for clinical interpretation of genomic variants from exome sequencing; co-author on the resulting Bioinformatics (Oxford Academic, 2019) paper with UNAM and Cambridge.',
      },
    ],
    projects: [
      {
        title: 'VCF/Plotein',
        description:
          'Clinical genomics web app for visualizing and prioritizing exome VCF variants on protein structures. Published in Bioinformatics (Oxford Academic, 2019). Co-authored with researchers from UNAM and Cambridge.',
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
      '2022 — Credential of Readiness (CORe), Harvard Business School Online: Business Analytics, Economics for Managers, Financial Accounting',
      '2018 — ACM-ICPC Regional Finalist, Mexico & Central America',
      '2017 — ACM-ICPC Honorable Mention, Mexico & Central America',
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
    contactLabels: { email: 'Email', phone: 'Phone' },
  },

  es: {
    meta: {
      description:
        'Ingeniero de software que construye sistemas backend y full-stack en producción. Portafolio, publicaciones y escritos técnicos.',
    },
    role: 'Ingeniero de software',
    location: 'Vallarta, México (UTC−6)',
    headings: {
      about: 'Acerca de',
      experience: 'Experiencia',
      openSource: 'Código abierto',
      publications: 'Publicaciones',
      education: 'Formación',
      honors: 'Distinciones y diplomas',
      skills: 'Competencias técnicas',
      contact: 'Contacto',
    },
    about:
      'Ingeniero de software con más de 5 años construyendo sistemas backend y full-stack en producción, como contratista remoto y como ingeniero de planta: APIs REST, pipelines de datos, despliegues en la nube y aplicaciones web en Python, TypeScript/JavaScript y SQL. Me siento cómodo tomando una base de código existente, entregando de principio a fin y trabajando de forma asíncrona con equipos de Estados Unidos y Europa. Actualmente curso la maestría en Ciencias de la Computación en CU Boulder.',
    experience: [
      {
        years: '2024 – actualidad',
        title: 'Líder técnico de ingeniería de software',
        org: 'Century 21 CAM Grupo',
        description:
          'Dirijo las operaciones y la estrategia comercial de C21 CAM Grupo en Riviera Nayarit. Construí un servicio que genera automáticamente contratos inmobiliarios regulados (NOM-247) con plantillas de documentos y servidores MCP sobre la API de Claude, y que redujo el tiempo de redacción de días a menos de una hora. Diseñé y puse en producción un tablero de inteligencia de mercado sobre datos de transacciones de la MLS (Python, pandas, PostgreSQL): pipelines de limpieza automatizados, detección de anomalías y métricas de absorción por micromercado y segmento de precio. Desplegué y opero un stack privado de inferencia de LLM on-premise (Apple Silicon, MLX, Tailscale) para que los datos confidenciales de los clientes nunca salgan de la red de la empresa. Construyo y mantengo cuatro sitios de marketing en producción con Astro y Cloudflare (camgrupo.com y uno por desarrollo), además del DNS, la infraestructura de correo y el seguimiento de operaciones en Airtable.',
      },
      {
        years: '2021 – 2023',
        title: 'Desarrollador full stack (contratista)',
        org: 'Augusto Digital',
        description:
          'Decentracare: tomé el MVP de una plataforma de contratación de personal de salud (clínicos y proveedores ambulatorios) y fui responsable de su evolución durante dos años, con un frontend en React, un backend REST en Python/Flask, PostgreSQL y AWS (EC2, S3, RDS); la red creció a más de 350 clínicos. ADHD Online: implementé y mantuve el flujo principal de evaluación y el panel del paciente en Vue.js, y corregí errores de producción que llevaban tiempo abiertos. Trabajé de forma totalmente asíncrona con un equipo en Estados Unidos: definía el alcance de los tickets, entregaba cada semana y me encargaba de los despliegues y del soporte en producción.',
      },
      {
        years: '2021 – 2022',
        title: 'Desarrollador core',
        org: 'xBacked DAO',
        description:
          'Construí la aplicación web y la conexión de wallets de xUSD, una stablecoin colateralizada en Algorand. Publiqué tutoriales de cripto y dos ejemplos de código abierto destacados en el Algorand Developer Portal (intercambio de archivos con IPFS y un visualizador de bloques en tiempo real). Coautor del Litepaper v2.0 del protocolo y de los documentos de diseño ADR-46 y ADR-47 sobre límites de apalancamiento y seguridad del colateral; ADR-47 evitó un lanzamiento que habría diluido el colateral.',
      },
      {
        years: '2019 – 2021',
        title: 'Desarrollador de software II',
        org: 'Oracle — Big Data Service (OCI)',
        description:
          'Construí pipelines de imágenes de OCI para migrar a la nube aplicaciones de Big Data on-premise, con servicios REST en Python, Docker, CI/CD en TeamCity y Artifactory. Guardias en la rotación global para incidentes de severidad 1; análisis de causa raíz de caídas en producción de clientes empresariales.',
      },
      {
        years: '2018',
        title: 'Practicante de ingeniería de software',
        org: 'LIIGH — Laboratorio de Genómica del Cáncer',
        description:
          'Diseñé y construí VCF/Plotein (Vue.js, Node.js), una aplicación web para la interpretación clínica de variantes genómicas obtenidas por secuenciación de exoma; coautor del artículo resultante en Bioinformatics (Oxford Academic, 2019), junto con la UNAM y Cambridge.',
      },
    ],
    projects: [
      {
        title: 'VCF/Plotein',
        description:
          'Aplicación web de genómica clínica para visualizar y priorizar variantes de archivos VCF de exoma sobre estructuras de proteínas. Publicada en Bioinformatics (Oxford Academic, 2019), en coautoría con investigadores de la UNAM y Cambridge.',
        image: '/img/vcfplotein.webp',
        link: 'https://github.com/redcpp/vcfplotein',
      },
      {
        title: 'Nepohualtzintzin',
        description:
          'Recreación web interactiva del Nepohualtzintzin, el ábaco mesoamericano prehispánico de base 20. Vue 2 + Vuex, con cuentas que se activan con animación.',
        image: '/img/nepohualtzintzin.webp',
        link: 'https://github.com/redcpp/nepohualtzintzin',
      },
      {
        title: 'Algorand Vue RT',
        description:
          'Visualización generativa en tiempo real de la TestNet de Algorand: cada bloque confirmado se dibuja como un cuadro de color en un canvas de p5.js. Vue 2 + algosdk.',
        image: '/img/algorand-vue-rt.webp',
        link: 'https://github.com/redcpp/algorand-vue-rt',
      },
      {
        title: 'Programación competitiva',
        description:
          'Más de 900 soluciones de programación competitiva en C++ y Python (2015–2018): Codeforces, ACM-ICPC, Project Euler y más.',
        image: null,
        link: 'https://github.com/redcpp/Competitive-Programming',
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
      '2022 — Credential of Readiness (CORe), Harvard Business School Online: Business Analytics, Economics for Managers y Financial Accounting',
      '2018 — Finalista regional del ACM-ICPC, México y Centroamérica',
      '2017 — Mención honorífica en el ACM-ICPC, México y Centroamérica',
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
    contactLabels: { email: 'Correo', phone: 'Teléfono' },
  },
};
