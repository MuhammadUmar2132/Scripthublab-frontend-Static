import {
  Code2,
  Smartphone,
  Server,
  Layers,
  Palette,
  Sparkles,
  ShieldCheck,
  Clock,
  Wallet,
  Wrench,
  Smile,
  Rocket,
  Boxes,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiFlutter,
  SiDocker,
  SiGithub,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

export const TECH_STACK = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Express", icon: SiExpress },
  { name: "Flutter", icon: SiFlutter },
  { name: "AWS", icon: FaAws },
  { name: "Docker", icon: SiDocker },
  { name: "GitHub", icon: SiGithub },
];

export const SERVICES = [
  {
    icon: Code2,
    slug: "web-development",
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications using latest technologies.",
    techStack: ["React", "Next.js", "TypeScript", "Node.js"],
    subservices: [
      {
        slug: "custom-website-development",
        title: "Custom Website Development",
        description:
          "Hand-built websites tailored to your brand, optimized for speed and conversions.",
        features: [
          "Pixel-perfect, responsive UI for every device",
          "SEO-friendly structure and fast page loads",
          "Easy-to-manage content with a simple CMS",
        ],
      },
      {
        slug: "ecommerce-development",
        title: "E-Commerce Development",
        description: "Online stores built on modern stacks with secure payments and checkout flows.",
        features: [
          "Secure payment gateway integration",
          "Product catalog, cart & order management",
          "Built to handle traffic spikes during sales",
        ],
      },
      {
        slug: "web-app-development",
        title: "Web Application Development",
        description: "Interactive, data-driven web apps with real-time features and dashboards.",
        features: [
          "Real-time data with sockets & live updates",
          "Role-based dashboards for admins & users",
          "Scalable architecture that grows with you",
        ],
      },
      {
        slug: "cms-development",
        title: "CMS Development",
        description: "Headless & traditional CMS setups so your team can manage content with ease.",
        features: [
          "No-code content editing for your team",
          "Headless CMS options for multi-channel content",
          "Custom workflows for approvals & publishing",
        ],
      },
    ],
  },
  {
    icon: Smartphone,
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description: "Cross-platform mobile apps for Android & iOS using React Native & Flutter.",
    techStack: ["Flutter", "React", "Node.js"],
    subservices: [
      {
        slug: "android-app-development",
        title: "Android App Development",
        description: "Native & cross-platform Android apps built for performance and scale.",
        features: [
          "Optimized for a wide range of Android devices",
          "Play Store submission & release support",
          "Push notifications & offline support",
        ],
      },
      {
        slug: "ios-app-development",
        title: "iOS App Development",
        description: "Polished iOS apps that follow Apple's design and performance guidelines.",
        features: [
          "Apple Human Interface Guidelines compliant",
          "App Store submission & release support",
          "Smooth animations and native feel",
        ],
      },
      {
        slug: "cross-platform-development",
        title: "Cross-Platform Development",
        description: "Single codebase apps with React Native & Flutter for Android and iOS.",
        features: [
          "One codebase, faster time to market",
          "Consistent experience across platforms",
          "Lower long-term maintenance cost",
        ],
      },
      {
        slug: "app-maintenance-support",
        title: "App Maintenance & Support",
        description: "Ongoing updates, bug fixes, and performance improvements post-launch.",
        features: [
          "Regular OS & dependency updates",
          "Crash monitoring and quick bug fixes",
          "Feature additions as your product grows",
        ],
      },
    ],
  },
  {
    icon: Server,
    slug: "backend-development",
    title: "Backend Development",
    description: "Scalable APIs, databases, authentication, and cloud infrastructure.",
    techStack: ["Node.js", "Express", "MongoDB", "AWS"],
    subservices: [
      {
        slug: "api-development",
        title: "API Development",
        description: "REST & GraphQL APIs designed for reliability and easy integration.",
        features: [
          "Well-documented, versioned endpoints",
          "Rate limiting & input validation built in",
          "Easy integration with mobile & web clients",
        ],
      },
      {
        slug: "database-architecture",
        title: "Database Architecture",
        description: "Efficient schema design and optimization for SQL & NoSQL databases.",
        features: [
          "Schema design for fast, reliable queries",
          "Indexing & performance tuning",
          "Backup & disaster-recovery planning",
        ],
      },
      {
        slug: "authentication-security",
        title: "Authentication & Security",
        description: "Secure auth flows, role-based access, and industry-standard encryption.",
        features: [
          "JWT / OAuth based authentication",
          "Role-based access control (RBAC)",
          "Data encryption at rest and in transit",
        ],
      },
      {
        slug: "cloud-devops",
        title: "Cloud & DevOps",
        description: "CI/CD pipelines, containerization, and cloud deployment on AWS.",
        features: [
          "Automated CI/CD pipelines",
          "Dockerized deployments for consistency",
          "Monitoring, logging & auto-scaling on AWS",
        ],
      },
    ],
  },
  {
    icon: Layers,
    slug: "saas-development",
    title: "SaaS Development",
    description: "Custom SaaS applications built for performance, scalability & security.",
    techStack: ["Next.js", "Node.js", "MongoDB", "AWS"],
    subservices: [
      {
        slug: "saas-mvp-development",
        title: "SaaS MVP Development",
        description: "Launch-ready MVPs to validate your product idea quickly.",
        features: [
          "Fast turnaround focused on core value",
          "Built to iterate based on real user feedback",
          "Clear path to scale post-validation",
        ],
      },
      {
        slug: "multi-tenant-architecture",
        title: "Multi-Tenant Architecture",
        description: "Scalable multi-tenant systems built for growing SaaS businesses.",
        features: [
          "Isolated data per tenant with shared infrastructure",
          "Plan-based feature access & limits",
          "Designed to scale as customers grow",
        ],
      },
      {
        slug: "subscription-billing",
        title: "Subscription & Billing",
        description: "Payment gateway and subscription billing integrations that just work.",
        features: [
          "Recurring billing & plan upgrades/downgrades",
          "Invoicing and payment history",
          "Support for trials, coupons & refunds",
        ],
      },
      {
        slug: "saas-analytics-dashboards",
        title: "SaaS Analytics Dashboards",
        description: "Actionable, real-time dashboards for your customers and admins.",
        features: [
          "Real-time usage & performance metrics",
          "Exportable reports for stakeholders",
          "Custom dashboards per user role",
        ],
      },
    ],
  },
  {
    icon: Palette,
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Beautiful, modern & user-focused designs that convert visitors.",
    techStack: ["React", "Next.js"],
    subservices: [
      {
        slug: "product-design",
        title: "Product Design",
        description: "End-to-end product design from wireframes to high-fidelity prototypes.",
        features: [
          "User flows & wireframes before pixel polish",
          "High-fidelity, interactive prototypes",
          "Design decisions backed by user needs",
        ],
      },
      {
        slug: "design-systems",
        title: "Design Systems",
        description: "Reusable component libraries that keep your product visually consistent.",
        features: [
          "Reusable, documented components",
          "Consistent spacing, color & typography rules",
          "Faster development for future features",
        ],
      },
      {
        slug: "usability-testing",
        title: "Usability Testing",
        description: "User research and testing to validate design decisions before launch.",
        features: [
          "Real user feedback before you build",
          "Identifies friction points early",
          "Data-informed design iterations",
        ],
      },
      {
        slug: "branding-visual-identity",
        title: "Branding & Visual Identity",
        description: "Logos, color systems, and visual identity that reflect your brand.",
        features: [
          "Logo & brand mark design",
          "Color palette & typography system",
          "Brand guidelines for consistent use",
        ],
      },
    ],
  },
  {
    icon: Sparkles,
    slug: "ai-integration",
    title: "AI Integration",
    description: "AI chatbots, automation, OpenAI integration & smart business solutions.",
    techStack: ["Node.js", "Next.js", "AWS"],
    subservices: [
      {
        slug: "ai-chatbots",
        title: "AI Chatbots",
        description: "Conversational AI assistants for support, sales, and onboarding.",
        features: [
          "Trained on your business's own data",
          "Handles support, sales & onboarding queries",
          "Seamless handoff to a human when needed",
        ],
      },
      {
        slug: "workflow-automation",
        title: "Workflow Automation",
        description: "Automate repetitive business processes with AI-driven pipelines.",
        features: [
          "Removes repetitive manual work",
          "Connects your existing tools & data sources",
          "Reduces errors from manual processes",
        ],
      },
      {
        slug: "llm-integration",
        title: "LLM Integration",
        description: "Integrate OpenAI, Claude & other LLMs into your existing products.",
        features: [
          "Works with OpenAI, Claude & other providers",
          "Prompt design tuned to your use case",
          "Cost-aware usage & response caching",
        ],
      },
      {
        slug: "ai-powered-analytics",
        title: "AI-Powered Analytics",
        description: "Predictive insights and smart reporting built on your business data.",
        features: [
          "Predictive trends from your existing data",
          "Plain-language summaries of complex reports",
          "Alerts for anomalies that need attention",
        ],
      },
    ],
  },
];

export const WHY_CHOOSE_US = [
  { icon: Boxes, title: "Clean Architecture", description: "Well-structured and maintainable code." },
  { icon: Rocket, title: "On-Time Delivery", description: "We respect deadlines and deliver on time." },
  { icon: Layers, title: "Scalable Solutions", description: "Built to grow with your business." },
  { icon: ShieldCheck, title: "Secure & Reliable", description: "Security and performance are our top priority." },
  { icon: Wallet, title: "Affordable Pricing", description: "High-quality services at reasonable price." },
  { icon: Clock, title: "24/7 Support", description: "We're always here to help you." },
  { icon: Wrench, title: "Modern Technologies", description: "We use the latest tools and frameworks." },
  { icon: Smile, title: "Client Satisfaction", description: "100+ happy clients worldwide." },
];

export const COMPANY_STATS = [
  { label: "Years of Experience", value: "5+" },
  { label: "Projects Delivered", value: "120+" },
  { label: "Happy Clients", value: "100+" },
  { label: "Team Members", value: "15+" },
];

export const COMPANY_VALUES = [
  {
    icon: Rocket,
    title: "Our Mission",
    description:
      "To help businesses of every size turn their ideas into reliable, scalable software — without the usual agency friction.",
  },
  {
    icon: Boxes,
    title: "Our Vision",
    description:
      "To be the development partner clients come back to for every new product, not just the one that shipped this year.",
  },
];

export const SERVICE_OPTIONS = [
  "Web Development",
  "Mobile App Development",
  "Backend Development",
  "SaaS Development",
  "UI/UX Design",
  "AI Integration",
  "Other",
];
