import { useState, useEffect, useRef, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import svgPaths from "../imports/Design3375/svg-arl3ggk9v6";

// ═════════════════════════════════════════════════════════════════════════════
// TYPES & INTERFACES
// ═════════════════════════════════════════════════════════════════════════════

interface Service {
  icon: ReactNode;
  title: string;
  desc: string;
}

interface Property {
  id: number;
  type: "Na sprzedaż" | "Na wynajem";
  price: string;
  title: string;
  address: string;
  beds: number;
  baths: number;
  area: string;
  img: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface TeamMember {
  name: string;
  role: string;
  deals: string;
  img: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface PricingPlan {
  name: string;
  price: string;
  sub: string;
  features: string[];
  unavailable: string[];
  cta: string;
  highlight: boolean;
}

interface NavLink {
  label: string;
  id: string;
}

interface Stat {
  value: string;
  label: string;
}

// ═════════════════════════════════════════════════════════════════════════════
// ZOD VALIDATION SCHEMA
// ═════════════════════════════════════════════════════════════════════════════

const contactFormSchema = z.object({
  name: z.string().min(2, "Imię musi mieć co najmniej 2 znaki").max(50),
  email: z.string().email("Podaj poprawny adres e-mail"),
  phone: z.string().regex(/^[\d\s\+\-\(\)]*$/, "Podaj poprawny numer telefonu").optional().or(z.literal("")),
  interest: z.enum(["buying", "selling", "renting", "investing", "valuation"]),
  message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków").max(1000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// ═════════════════════════════════════════════════════════════════════════════
// CUSTOM HOOKS
// ═════════════════════════════════════════════════════════════════════════════

function useInView(ref: React.RefObject<HTMLElement>, options = { threshold: 0.1 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isVisible;
}

// ═════════════════════════════════════════════════════════════════════════════
// SVG ICONS ────────────────────────────────────────────────────────────────────

function IconSearch() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path clipRule="evenodd" d={svgPaths.p10ae5700} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

function IconMenu({ open }: { open: boolean }) {
  return open ? (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="22" height="19" fill="none" viewBox="0 0 24 19">
      <path d={svgPaths.p14f81300} fill="currentColor" />
    </svg>
  );
}

function IconFacebook() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 32 32"><path clipRule="evenodd" d={svgPaths.p18461880} fill="currentColor" fillRule="evenodd" /></svg>;
}
function IconTwitter() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 32 32"><path clipRule="evenodd" d={svgPaths.p1d155d00} fill="currentColor" fillRule="evenodd" /></svg>;
}
function IconInstagram() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 32 32"><path clipRule="evenodd" d={svgPaths.p2f50600} fill="currentColor" fillRule="evenodd" /></svg>;
}

function IconCheckmark() {
  return <svg width="14" height="12" fill="none" viewBox="0 0 12 10"><path clipRule="evenodd" d={svgPaths.pb3f7540} fill="#0076FF" fillRule="evenodd" /></svg>;
}

function IconChevronDown({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"
      className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHome() {
  return <svg width="26" height="26" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="#0076FF" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 21V12h6v9" stroke="#0076FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function IconKey() {
  return <svg width="26" height="26" fill="none" viewBox="0 0 24 24"><circle cx="8" cy="15" r="4" stroke="#0076FF" strokeWidth="1.8" /><path d="M12 11l8-8M17 6l2 2" stroke="#0076FF" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}
function IconBuilding() {
  return <svg width="26" height="26" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="1" stroke="#0076FF" strokeWidth="1.8" /><path d="M3 9h18M9 9v12M15 9v12" stroke="#0076FF" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}
function IconHandshake() {
  return <svg width="26" height="26" fill="none" viewBox="0 0 24 24"><path d="M4 12l4 4 8-8M20 8l-8 8-4-4" stroke="#0076FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function IconBed() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M2 20V10m0 0V7a1 1 0 011-1h18a1 1 0 011 1v3M2 10h20M22 20V10" stroke="#999" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}
function IconBath() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z" stroke="#999" strokeWidth="1.6" /><path d="M4 12V5a2 2 0 014 0v7" stroke="#999" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}
function IconArea() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="1" stroke="#999" strokeWidth="1.6" /><path d="M3 9h18M9 3v18" stroke="#999" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

// ═════════════════════════════════════════════════════════════════════════════
// DATA
// ═════════════════════════════════════════════════════════════════════════════

const navLinks: NavLink[] = [
  { label: "Usługi", id: "services" },
  { label: "Oferty", id: "properties" },
  { label: "Zespół", id: "team" },
  { label: "FAQ", id: "faq" },
  { label: "Kontakt", id: "contact" },
];

const services: Service[] = [
  { icon: <IconHome />, title: "Kup nieruchomość", desc: "Setki ofert dopasowanych do Twojego budżetu i preferencji. Prowadzimy Cię od oglądania do aktu notarialnego." },
  { icon: <IconKey />, title: "Wynajmij nieruchomość", desc: "Mieszkania, domy i studia dopasowane do Twojego stylu życia i portfela." },
  { icon: <IconBuilding />, title: "Sprzedaj nieruchomość", desc: "Skuteczna strategia marketingowa i sieć nabywców, która przynosi najlepszą cenę." },
  { icon: <IconHandshake />, title: "Inwestycje", desc: "Pomnóż swój kapitał dzięki eksperckiemu doradztwu i dostępowi do ofert poza rynkiem." },
];

const properties: Property[] = [
  {
    id: 1, type: "Na sprzedaż", price: "1 950 000 zł", title: "Nowoczesna willa Greenwood",
    address: "ul. Dębowa 14, Piaseczno",
    beds: 4, baths: 3, area: "204 m²",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwcmVhbCUyMGVzdGF0ZXxlbnwxfHx8fDE3ODA2Njc2NzF8MA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 2, type: "Na wynajem", price: "5 800 zł/mies.", title: "Luksusowy apartament Śródmieście",
    address: "Al. Jerozolimskie 65A, Warszawa",
    beds: 2, baths: 2, area: "72 m²",
    img: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzgwNjE4MDE5fDA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 3, type: "Na sprzedaż", price: "3 100 000 zł", title: "Rodzinny dom nad rzeką",
    address: "ul. Wiślana 88, Konstancin",
    beds: 5, baths: 4, area: "310 m²",
    img: "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwcmVhbCUyMGVzdGF0ZXxlbnwxfHx8fDE3ODA2Njc2NzF8MA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 4, type: "Na wynajem", price: "2 900 zł/mies.", title: "Kawalerka z tarasem",
    address: "ul. Kasztanowa 7, Wrocław",
    beds: 1, baths: 1, area: "38 m²",
    img: "https://images.unsplash.com/photo-1600494448850-6013c64ba722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzgwNjE4MDE5fDA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 5, type: "Na sprzedaż", price: "5 800 000 zł", title: "Willa z basenem Palmview",
    address: "ul. Słoneczna 220, Józefosław",
    beds: 6, baths: 5, area: "480 m²",
    img: "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwcmVhbCUyMGVzdGF0ZXxlbnwxfHx8fDE3ODA2Njc2NzF8MA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 6, type: "Na wynajem", price: "4 200 zł/mies.", title: "Nowoczesny penthouse",
    address: "ul. Wieżowa 1, piętro 18, Kraków",
    beds: 2, baths: 2, area: "95 m²",
    img: "https://images.unsplash.com/photo-1738168246881-40f35f8aba0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzgwNjE4MDE5fDA&ixlib=rb-4.1.0&q=80&w=800",
  },
];

const testimonials: Testimonial[] = [
  {
    quote: "HomeKey Realty pomogła nam sprzedać dom powyżej ceny wywoławczej w zaledwie tydzień. James był profesjonalny, szybki i szczerze dbał o nasze interesy.",
    name: "Dawid i Kasia Kowalski",
    role: "Sprzedający, Piaseczno",
  },
  {
    quote: "Sophie znalazła nam idealne mieszkanie w centrum w ciągu kilku dni. Cały proces był transparentny i bezstresowy. Gorąco polecam!",
    name: "Laura Wiśniewska",
    role: "Najemca, Śródmieście",
  },
  {
    quote: "Dzięki poradom Marii znacząco rozbudowałem swój portfel nieruchomości. Jej znajomość rynku i dostęp do ofert poza rynkiem to prawdziwa przewaga.",
    name: "Michał Osei",
    role: "Inwestor nieruchomościowy",
  },
];

const team: TeamMember[] = [
  {
    name: "Jakub Harrington", role: "Starszy agent sprzedaży", deals: "340 sfinalizowanych transakcji",
    img: "https://images.unsplash.com/photo-1647580427155-0483906cb9de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3ODA2NDYzMDJ8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    name: "Zofia Laurent", role: "Specjalistka ds. wynajmu", deals: "210 skutecznych wynajmów",
    img: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3ODA2NDYzMDJ8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    name: "Maria Gonzalez", role: "Doradca inwestycyjny", deals: "Portfel o wartości 42 mln zł",
    img: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3ODA2NDYzMDJ8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
];

const faqs: FAQ[] = [
  {
    q: "Jak zacząć proces kupna nieruchomości?",
    a: "Zacznij od uzyskania wstępnej zdolności kredytowej i skontaktowania się z naszym agentem. Pomożemy określić budżet, wyszukamy odpowiednie oferty, umówimy oglądania i przeprowadzimy przez cały proces zakupu.",
  },
  {
    q: "Jakie dokumenty są potrzebne do sprzedaży nieruchomości?",
    a: "Potrzebujesz m.in. aktu notarialnego, zaświadczenia o niezaleganiu z podatkami, ostatnich rachunków za media oraz dowodu osobistego. Nasz agent przygotuje kompletną listę dopasowaną do Twojej sytuacji.",
  },
  {
    q: "Jak długo trwa sprzedaż nieruchomości?",
    a: "Przy właściwej cenie większość nieruchomości w naszym regionie trafia pod umowę w ciągu 2–6 tygodni. Nasza strategia marketingowa — profesjonalne zdjęcia, obecność na portalach i sieć nabywców — zapewnia maksymalne zainteresowanie.",
  },
  {
    q: "Czy pomagacie też przy wynajmie nieruchomości?",
    a: "Tak. Obsługujemy cały proces: weryfikację najemców, sporządzenie umowy, przeglądy techniczne i bieżące zarządzanie. Pomagamy zarówno właścicielom, jak i osobom szukającym lokalu.",
  },
  {
    q: "Czy bezpłatna wycena nieruchomości czegoś mnie zobowiązuje?",
    a: "Nie. Wycena jest całkowicie bezpłatna i bez zobowiązań. Skontaktuj się z nami, a nasz agent umówi wizytę w dogodnym terminie.",
  },
  {
    q: "Jak wygląda Wasza prowizja?",
    a: "Prowizja jest naliczana jako procent od ostatecznej ceny transakcji i płatna wyłącznie po jej pomyślnym zakończeniu. Skontaktuj się z nami, aby poznać szczegółowy cennik — stawiamy na pełną transparentność.",
  },
];

const plans: PricingPlan[] = [
  {
    name: "Start", price: "Bezpłatny", sub: "Idealne na początek",
    features: ["Prezentacja oferty na stronie", "Konsultacja z agentem", "Wsparcie e-mail", "Raport rynkowy"],
    unavailable: ["Dedykowany agent", "Profesjonalna fotografia"],
    cta: "Zacznij teraz", highlight: false,
  },
  {
    name: "Standard", price: "199 zł", sub: "Najpopularniejszy wybór",
    features: ["Wszystko z Start", "Dedykowany agent", "Profesjonalna fotografia", "Promocja w social media", "Cotygodniowe raporty"],
    unavailable: ["Priorytetowe wyróżnienie oferty"],
    cta: "Wybierz Standard", highlight: true,
  },
  {
    name: "Premium", price: "499 zł", sub: "Pełna obsługa",
    features: ["Wszystko ze Standard", "Priorytetowe wyróżnienie oferty", "Wideo-tour nieruchomości", "Konsultacja prawna", "Home staging", "Dostęp 24/7"],
    unavailable: [],
    cta: "Wybierz Premium", highlight: false,
  },
];

const stats: Stat[] = [
  { value: "1 200+", label: "Sprzedanych nieruchomości" },
  { value: "98%", label: "Zadowolonych klientów" },
  { value: "15 lat", label: "Doświadczenia" },
];

// ═════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═════════════════════════════════════════════════════════════════════════════

function Navbar({ onNav }: { onNav: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    onNav(id);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#eee]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => handleNav("hero")} className="flex items-center gap-1 shrink-0">
          <span style={{ color: "#0076FF", fontWeight: 700, fontSize: 20 }}>HomeKey</span>
          <span style={{ color: "#333", fontWeight: 700, fontSize: 20 }}>Realty</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <button key={l.id} onClick={() => handleNav(l.id)}
              className="text-[#555] hover:text-[#0076FF] transition-colors"
              style={{ fontSize: 14, fontWeight: 500 }}>
              {l.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button onClick={() => handleNav("contact")}
          className="hidden md:flex items-center h-9 px-4 rounded-[3px] text-white hover:opacity-90 transition-opacity shrink-0"
          style={{ background: "#0076FF", fontWeight: 700, fontSize: 14 }}>
          Bezpłatna wycena
        </button>

        {/* Mobile hamburger */}
        <button className="md:hidden p-1 text-[#333]" onClick={() => setMenuOpen(!menuOpen)}>
          <IconMenu open={menuOpen} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#eee] px-4 py-3 flex flex-col">
          {navLinks.map((l) => (
            <button key={l.id} onClick={() => handleNav(l.id)}
              className="text-left text-[#333] py-3 border-b border-[#f5f5f5] last:border-0"
              style={{ fontSize: 16, fontWeight: 500 }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => handleNav("contact")}
            className="mt-3 h-11 rounded-[3px] text-white"
            style={{ background: "#0076FF", fontWeight: 700, fontSize: 15 }}>
            Bezpłatna wycena
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ onNav }: { onNav: (id: string) => void }) {
  const [searchVal, setSearchVal] = useState("");
  const [type, setType] = useState<"buy" | "rent">("buy");

  return (
    <section id="hero" className="relative min-h-[520px] md:min-h-[620px] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden bg-[#1a2d45]">
        <img
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwcmVhbCUyMGVzdGF0ZXxlbnwxfHx8fDE3ODA2Njc2NzF8MA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Nowoczesny dom"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 70%, transparent 100%)" }} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="max-w-xl">
          <p className="text-white/70 uppercase tracking-widest mb-3" style={{ fontSize: 12, fontWeight: 700 }}>
            HomeKey Realty
          </p>
          <h1 className="text-white mb-5" style={{ fontSize: "clamp(34px, 6vw, 60px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>
            Znajdź swój<br />wymarzony dom
          </h1>
          <p className="text-white/80 mb-8" style={{ fontSize: "clamp(15px,2vw,18px)", lineHeight: 1.7 }}>
            Łączymy kupujących, sprzedających i najemców z idealnymi nieruchomościami. Szybko, uczciwie i po ludzku.
          </p>

          {/* Search card */}
          <div className="bg-white rounded-[4px] p-4 shadow-xl">
            <div className="flex gap-1.5 mb-3">
              {(["buy", "rent"] as const).map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className="px-4 h-8 rounded-[3px] transition-all"
                  style={{
                    background: type === t ? "#0076FF" : "#f0f0f0",
                    color: type === t ? "#fff" : "#555",
                    fontWeight: 700, fontSize: 13,
                  }}>
                  {t === "buy" ? "Kup" : "Wynajmij"}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center border border-[#dcdcdc] rounded-[3px] px-3 h-10 gap-2 min-w-0">
                <span className="text-[#999] shrink-0"><IconSearch /></span>
                <input
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Miasto, dzielnica lub kod pocztowy…"
                  className="flex-1 outline-none bg-transparent min-w-0"
                  style={{ fontSize: 14 }}
                />
              </div>
              <button onClick={() => onNav("properties")}
                className="h-10 px-4 rounded-[3px] text-white shrink-0"
                style={{ background: "#0076FF", fontWeight: 700, fontSize: 14 }}>
                Szukaj
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-5 sm:gap-8 mt-7 flex-wrap">
            {[
              { value: "1 200+", label: "Sprzedanych nieruchomości" },
              { value: "98%", label: "Zadowolonych klientów" },
              { value: "15 lat", label: "Doświadczenia" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-white" style={{ fontWeight: 700, fontSize: "clamp(18px,2.5vw,22px)" }}>{s.value}</p>
                <p className="text-white/60" style={{ fontSize: 12 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-14 md:py-20 bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-10 md:mb-12">
          <p className="uppercase tracking-widest mb-2" style={{ color: "#0076FF", fontSize: 12, fontWeight: 700 }}>Nasze usługi</p>
          <h2 className="text-[#333] mb-3" style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, lineHeight: 1.2 }}>
            Kompleksowa obsługa nieruchomości
          </h2>
          <p className="text-[#999]" style={{ fontSize: "clamp(15px,1.5vw,17px)", lineHeight: 1.7 }}>
            Niezależnie czy kupujesz, sprzedajesz czy inwestujesz — nasi agenci zapewniają wyniki z pełną przejrzystością.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div key={s.title}
              className="border border-[#eee] rounded-[4px] p-5 hover:shadow-md hover:border-[#0076FF]/30 transition-all group cursor-pointer">
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-[#333] mb-2 group-hover:text-[#0076FF] transition-colors" style={{ fontSize: 16, fontWeight: 700 }}>{s.title}</h3>
              <p className="text-[#999]" style={{ fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Properties ──────────────────────────────────────────────────────────────

const properties = [
  {
    id: 1, type: "Na sprzedaż", price: "1 950 000 zł", title: "Nowoczesna willa Greenwood",
    address: "ul. Dębowa 14, Piaseczno",
    beds: 4, baths: 3, area: "204 m²",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwcmVhbCUyMGVzdGF0ZXxlbnwxfHx8fDE3ODA2Njc2NzF8MA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 2, type: "Na wynajem", price: "5 800 zł/mies.", title: "Luksusowy apartament Śródmieście",
    address: "Al. Jerozolimskie 65A, Warszawa",
    beds: 2, baths: 2, area: "72 m²",
    img: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzgwNjE4MDE5fDA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 3, type: "Na sprzedaż", price: "3 100 000 zł", title: "Rodzinny dom nad rzeką",
    address: "ul. Wiślana 88, Konstancin",
    beds: 5, baths: 4, area: "310 m²",
    img: "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwcmVhbCUyMGVzdGF0ZXxlbnwxfHx8fDE3ODA2Njc2NzF8MA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 4, type: "Na wynajem", price: "2 900 zł/mies.", title: "Kawalerka z tarasem",
    address: "ul. Kasztanowa 7, Wrocław",
    beds: 1, baths: 1, area: "38 m²",
    img: "https://images.unsplash.com/photo-1600494448850-6013c64ba722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzgwNjE4MDE5fDA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 5, type: "Na sprzedaż", price: "5 800 000 zł", title: "Willa z basenem Palmview",
    address: "ul. Słoneczna 220, Józefosław",
    beds: 6, baths: 5, area: "480 m²",
    img: "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwcmVhbCUyMGVzdGF0ZXxlbnwxfHx8fDE3ODA2Njc2NzF8MA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 6, type: "Na wynajem", price: "4 200 zł/mies.", title: "Nowoczesny penthouse",
    address: "ul. Wieżowa 1, piętro 18, Kraków",
    beds: 2, baths: 2, area: "95 m²",
    img: "https://images.unsplash.com/photo-1738168246881-40f35f8aba0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzgwNjE4MDE5fDA&ixlib=rb-4.1.0&q=80&w=800",
  },
];

function PropertyCard({ p }: { p: typeof properties[0] }) {
  return (
    <div className="bg-white border border-[#eee] rounded-[4px] overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative overflow-hidden bg-[#eee]" style={{ height: 200 }}>
        <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-[3px] text-white uppercase tracking-wide"
          style={{ background: "#0076FF", fontSize: 10, fontWeight: 700 }}>
          {p.type}
        </span>
      </div>
      <div className="p-4">
        <p style={{ color: "#0076FF", fontWeight: 700, fontSize: 18 }}>{p.price}</p>
        <h3 className="text-[#333] mt-1 mb-1" style={{ fontSize: 15, fontWeight: 700 }}>{p.title}</h3>
        <p className="text-[#999] mb-3" style={{ fontSize: 12 }}>{p.address}</p>
        <div className="flex items-center gap-3 text-[#999] border-t border-[#f0f0f0] pt-3">
          <span className="flex items-center gap-1" style={{ fontSize: 12 }}><IconBed />{p.beds} sypialnie</span>
          <span className="flex items-center gap-1" style={{ fontSize: 12 }}><IconBath />{p.baths} łazienki</span>
          <span className="flex items-center gap-1" style={{ fontSize: 12 }}><IconArea />{p.area}</span>
        </div>
      </div>
    </div>
  );
}

function Properties({ onNav }: { onNav: (id: string) => void }) {
  const [filter, setFilter] = useState<"all" | "sale" | "rent">("all");

  const filtered = properties.filter((p) => {
    if (filter === "sale") return p.type === "Na sprzedaż";
    if (filter === "rent") return p.type === "Na wynajem";
    return true;
  });

  return (
    <section id="properties" className="py-14 md:py-20" style={{ background: "#f7f7f7", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 md:mb-10">
          <div>
            <p className="uppercase tracking-widest mb-2" style={{ color: "#0076FF", fontSize: 12, fontWeight: 700 }}>Portfolio</p>
            <h2 className="text-[#333]" style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, lineHeight: 1.2 }}>
              Aktualne oferty
            </h2>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {[
              { key: "all", label: "Wszystkie" },
              { key: "sale", label: "Na sprzedaż" },
              { key: "rent", label: "Na wynajem" },
            ].map((f) => (
              <button key={f.key} onClick={() => setFilter(f.key as typeof filter)}
                className="h-9 px-4 rounded-[3px] transition-all"
                style={{
                  background: filter === f.key ? "#0076FF" : "#fff",
                  color: filter === f.key ? "#fff" : "#555",
                  border: `1px solid ${filter === f.key ? "#0076FF" : "#dcdcdc"}`,
                  fontWeight: 600, fontSize: 13,
                }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
        <div className="mt-8 text-center">
          <button onClick={() => onNav("contact")}
            className="h-11 px-8 rounded-[3px] text-white hover:opacity-90 transition-opacity"
            style={{ background: "#0076FF", fontWeight: 700, fontSize: 15 }}>
            Zapytaj o ofertę
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: "HomeKey Realty pomogła nam sprzedać dom powyżej ceny wywoławczej w zaledwie tydzień. James był profesjonalny, szybki i szczerze dbał o nasze interesy.",
    name: "Dawid i Kasia Kowalski",
    role: "Sprzedający, Piaseczno",
  },
  {
    quote: "Sophie znalazła nam idealne mieszkanie w centrum w ciągu kilku dni. Cały proces był transparentny i bezstresowy. Gorąco polecam!",
    name: "Laura Wiśniewska",
    role: "Najemca, Śródmieście",
  },
  {
    quote: "Dzięki poradom Marii znacząco rozbudowałem swój portfel nieruchomości. Jej znajomość rynku i dostęp do ofert poza rynkiem to prawdziwa przewaga.",
    name: "Michał Osei",
    role: "Inwestor nieruchomościowy",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-14 md:py-20" style={{ background: "#f0f4ff", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className="uppercase tracking-widest mb-2" style={{ color: "#0076FF", fontSize: 12, fontWeight: 700 }}>Opinie klientów</p>
        <h2 className="text-[#333] mb-10" style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 700 }}>
          Co mówią nasi klienci
        </h2>
        <blockquote className="text-[#333] mb-6" style={{ fontSize: "clamp(15px,1.8vw,19px)", lineHeight: 1.75, fontStyle: "italic", minHeight: 96 }}>
          „{t.quote}"
        </blockquote>
        <p className="text-[#333]" style={{ fontWeight: 700, fontSize: 17 }}>{t.name}</p>
        <p className="text-[#999] mb-8" style={{ fontSize: 13 }}>{t.role}</p>
        <div className="flex justify-center gap-2.5">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === active ? 22 : 8, height: 8, background: i === active ? "#0076FF" : "#ccc" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────

const team = [
  {
    name: "Jakub Harrington", role: "Starszy agent sprzedaży", deals: "340 sfinalizowanych transakcji",
    img: "https://images.unsplash.com/photo-1647580427155-0483906cb9de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3ODA2NDYzMDJ8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    name: "Zofia Laurent", role: "Specjalistka ds. wynajmu", deals: "210 skutecznych wynajmów",
    img: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3ODA2NDYzMDJ8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    name: "Maria Gonzalez", role: "Doradca inwestycyjny", deals: "Portfel o wartości 42 mln zł",
    img: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3ODA2NDYzMDJ8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
];

function Team() {
  return (
    <section id="team" className="py-14 md:py-20 bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-10 md:mb-12">
          <p className="uppercase tracking-widest mb-2" style={{ color: "#0076FF", fontSize: 12, fontWeight: 700 }}>Nasi eksperci</p>
          <h2 className="text-[#333] mb-3" style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, lineHeight: 1.2 }}>
            Poznaj zespół
          </h2>
          <p className="text-[#999]" style={{ fontSize: "clamp(15px,1.5vw,17px)", lineHeight: 1.7 }}>
            Licencjonowani agenci z głęboką znajomością lokalnego rynku i pełnym zaangażowaniem w Twój sukces.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((m) => (
            <div key={m.name} className="group">
              <div className="relative rounded-[4px] overflow-hidden bg-[#eee] mb-4" style={{ height: 280 }}>
                <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {[<IconFacebook />, <IconTwitter />, <IconInstagram />].map((icon, i) => (
                    <button key={i} className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#333] hover:text-[#0076FF] transition-colors">
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <h3 className="text-[#333]" style={{ fontSize: 17, fontWeight: 700 }}>{m.name}</h3>
              <p style={{ color: "#0076FF", fontSize: 13, fontWeight: 600 }}>{m.role}</p>
              <p className="text-[#999] mt-0.5" style={{ fontSize: 12 }}>{m.deals}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Jak zacząć proces kupna nieruchomości?",
    a: "Zacznij od uzyskania wstępnej zdolności kredytowej i skontaktowania się z naszym agentem. Pomożemy określić budżet, wyszukamy odpowiednie oferty, umówimy oglądania i przeprowadzimy przez cały proces zakupu.",
  },
  {
    q: "Jakie dokumenty są potrzebne do sprzedaży nieruchomości?",
    a: "Potrzebujesz m.in. aktu notarialnego, zaświadczenia o niezaleganiu z podatkami, ostatnich rachunków za media oraz dowodu osobistego. Nasz agent przygotuje kompletną listę dopasowaną do Twojej sytuacji.",
  },
  {
    q: "Jak długo trwa sprzedaż nieruchomości?",
    a: "Przy właściwej cenie większość nieruchomości w naszym regionie trafia pod umowę w ciągu 2–6 tygodni. Nasza strategia marketingowa — profesjonalne zdjęcia, obecność na portalach i sieć nabywców — zapewnia maksymalne zainteresowanie.",
  },
  {
    q: "Czy pomagacie też przy wynajmie nieruchomości?",
    a: "Tak. Obsługujemy cały proces: weryfikację najemców, sporządzenie umowy, przeglądy techniczne i bieżące zarządzanie. Pomagamy zarówno właścicielom, jak i osobom szukającym lokalu.",
  },
  {
    q: "Czy bezpłatna wycena nieruchomości czegoś mnie zobowiązuje?",
    a: "Nie. Wycena jest całkowicie bezpłatna i bez zobowiązań. Skontaktuj się z nami, a nasz agent umówi wizytę w dogodnym terminie.",
  },
  {
    q: "Jak wygląda Wasza prowizja?",
    a: "Prowizja jest naliczana jako procent od ostatecznej ceny transakcji i płatna wyłącznie po jej pomyślnym zakończeniu. Skontaktuj się z nami, aby poznać szczegółowy cennik — stawiamy na pełną transparentność.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-14 md:py-20 bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left */}
          <div className="lg:col-span-2">
            <p className="uppercase tracking-widest mb-2" style={{ color: "#0076FF", fontSize: 12, fontWeight: 700 }}>FAQ</p>
            <h2 className="text-[#333] mb-3" style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, lineHeight: 1.2 }}>
              Często zadawane pytania
            </h2>
            <p className="text-[#999] mb-8" style={{ fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.7 }}>
              Nie znalazłeś odpowiedzi? Zadzwoń lub napisz — odpowiemy w ciągu 24 godzin.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
              {[
                { value: "1 200+", label: "Sprzedanych" },
                { value: "500+", label: "Klientów" },
                { value: "15 lat", label: "Doświadczenia" },
              ].map((s) => (
                <div key={s.label} className="bg-[#f7f7f7] rounded-[4px] px-3 py-4 text-center">
                  <p style={{ color: "#0076FF", fontWeight: 700, fontSize: "clamp(16px,2vw,22px)" }}>{s.value}</p>
                  <p className="text-[#999]" style={{ fontSize: 11 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-3 space-y-2.5">
            {faqs.map((f, i) => (
              <div key={i} className="border rounded-[4px] overflow-hidden transition-colors"
                style={{ borderColor: open === i ? "#0076FF" : "#eee" }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-4 text-left gap-3">
                  <span className="text-[#333]" style={{ fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 700 }}>{f.q}</span>
                  <span className="text-[#999]"><IconChevronDown open={open === i} /></span>
                </button>
                {open === i && (
                  <div className="px-4 pb-4">
                    <p className="text-[#999]" style={{ fontSize: "clamp(13px,1.5vw,15px)", lineHeight: 1.7 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Plans ────────────────────────────────────────────────────────────────────

const plans = [
  {
    name: "Start", price: "Bezpłatny", sub: "Idealne na początek",
    features: ["Prezentacja oferty na stronie", "Konsultacja z agentem", "Wsparcie e-mail", "Raport rynkowy"],
    unavailable: ["Dedykowany agent", "Profesjonalna fotografia"],
    cta: "Zacznij teraz", highlight: false,
  },
  {
    name: "Standard", price: "199 zł", sub: "Najpopularniejszy wybór",
    features: ["Wszystko z Start", "Dedykowany agent", "Profesjonalna fotografia", "Promocja w social media", "Cotygodniowe raporty"],
    unavailable: ["Priorytetowe wyróżnienie oferty"],
    cta: "Wybierz Standard", highlight: true,
  },
  {
    name: "Premium", price: "499 zł", sub: "Pełna obsługa",
    features: ["Wszystko ze Standard", "Priorytetowe wyróżnienie oferty", "Wideo-tour nieruchomości", "Konsultacja prawna", "Home staging", "Dostęp 24/7"],
    unavailable: [],
    cta: "Wybierz Premium", highlight: false,
  },
];

function Plans({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section className="py-14 md:py-20" style={{ background: "#f7f7f7", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-12">
          <p className="uppercase tracking-widest mb-2" style={{ color: "#0076FF", fontSize: 12, fontWeight: 700 }}>Cennik</p>
          <h2 className="text-[#333] mb-3" style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700 }}>Nasze pakiety</h2>
          <p className="text-[#999] max-w-lg mx-auto" style={{ fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.7 }}>
            Wybierz pakiet dopasowany do Twoich potrzeb. Każdy obejmuje dostęp do pełnej bazy ofert i wsparcie agenta.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div key={p.name} className="rounded-[4px] overflow-hidden bg-white"
              style={{
                border: p.highlight ? "2px solid #0076FF" : "1px solid #eee",
                boxShadow: p.highlight ? "0 8px 32px rgba(0,118,255,0.1)" : "none",
              }}>
              {p.highlight && (
                <div className="py-1.5 text-center text-white" style={{ background: "#0076FF", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
                  NAJPOPULARNIEJSZY
                </div>
              )}
              <div className="p-6">
                <p className="text-[#999] mb-1 uppercase tracking-wider" style={{ fontSize: 11, fontWeight: 700 }}>{p.name}</p>
                <p className="text-[#333] mb-1" style={{ fontSize: "clamp(26px,3vw,34px)", fontWeight: 700 }}>{p.price}</p>
                <p className="text-[#999] mb-5" style={{ fontSize: 13 }}>{p.sub}</p>
                <div className="space-y-2.5 mb-6">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <span className="shrink-0 mt-0.5"><IconCheckmark /></span>
                      <span className="text-[#555]" style={{ fontSize: 13 }}>{f}</span>
                    </div>
                  ))}
                  {p.unavailable.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 opacity-40">
                      <span className="shrink-0 mt-0.5 flex items-center justify-center" style={{ width: 14, height: 12 }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 2l8 8M10 2L2 10" stroke="#ccc" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="text-[#999]" style={{ fontSize: 13 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNav("contact")}
                  className="w-full h-10 rounded-[3px] transition-opacity hover:opacity-90"
                  style={{
                    background: p.highlight ? "#0076FF" : "transparent",
                    color: p.highlight ? "#fff" : "#0076FF",
                    border: p.highlight ? "none" : "1.5px solid #0076FF",
                    fontWeight: 700, fontSize: 14,
                  }}>
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    form.reset();
  };

  return (
    <section ref={ref} id="contact" className="py-14 md:py-20 bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Info */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="uppercase tracking-widest mb-2" style={{ color: "#0076FF", fontSize: 12, fontWeight: 700 }}>Kontakt</p>
            <h2 className="text-[#333] mb-3" style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, lineHeight: 1.2 }}>
              Znajdźmy razem idealną nieruchomość
            </h2>
            <p className="text-[#999] mb-8" style={{ fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.7 }}>
              Niezależnie czy planujesz kupno, sprzedaż czy najem — nasz zespół jest do Twojej dyspozycji. Oddzwonimy w ciągu 24 godzin.
            </p>
            <div className="space-y-5 mb-8">
              <div>
                <p className="text-[#333]" style={{ fontWeight: 700, fontSize: 15 }}>📞 +48 22 123 45 67</p>
                <p className="text-[#999]" style={{ fontSize: 13 }}>Pn–Pt 9:00–19:00, Sb 10:00–16:00</p>
              </div>
              <div>
                <p className="text-[#333]" style={{ fontWeight: 700, fontSize: 15 }}>✉️ kontakt@homekeyrealty.pl</p>
                <p className="text-[#999]" style={{ fontSize: 13 }}>Odpowiadamy w ciągu 24 godzin</p>
              </div>
              <div>
                <p className="text-[#333]" style={{ fontWeight: 700, fontSize: 15 }}>📍 ul. Marszałkowska 24, lok. 100</p>
                <p className="text-[#999]" style={{ fontSize: 13 }}>00-576 Warszawa, Śródmieście</p>
              </div>
            </div>
            <div className="flex gap-3">
              {[<IconFacebook />, <IconTwitter />, <IconInstagram />].map((icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full border border-[#eee] flex items-center justify-center text-[#555] hover:text-[#0076FF] hover:border-[#0076FF] transition-colors">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in">
                <div className="w-14 h-14 rounded-full bg-[#e8f1ff] flex items-center justify-center mb-4">
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke="#0076FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-[#333] mb-2" style={{ fontSize: 20, fontWeight: 700 }}>Wiadomość wysłana!</h3>
                <p className="text-[#999]" style={{ fontSize: 15 }}>Dziękujemy. Nasz agent skontaktuje się z Tobą w ciągu 24 godzin.</p>
                <button onClick={handleReset}
                  className="mt-5 h-10 px-6 rounded-[3px] text-white"
                  style={{ background: "#0076FF", fontWeight: 700, fontSize: 14 }}>
                  Wyślij kolejną
                </button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#333] mb-1.5 uppercase tracking-wider" style={{ fontSize: 11, fontWeight: 700 }}>Imię i nazwisko</label>
                    <input
                      placeholder="Jan Kowalski"
                      className={`w-full h-11 border rounded-[3px] px-3 outline-none focus:border-[#0076FF] transition-colors bg-white ${form.formState.errors.name ? "border-red-500" : "border-[#dcdcdc]"}`}
                      style={{ fontSize: 14 }}
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[#333] mb-1.5 uppercase tracking-wider" style={{ fontSize: 11, fontWeight: 700 }}>E-mail</label>
                    <input
                      type="email"
                      placeholder="jan@example.pl"
                      className={`w-full h-11 border rounded-[3px] px-3 outline-none focus:border-[#0076FF] transition-colors bg-white ${form.formState.errors.email ? "border-red-500" : "border-[#dcdcdc]"}`}
                      style={{ fontSize: 14 }}
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#333] mb-1.5 uppercase tracking-wider" style={{ fontSize: 11, fontWeight: 700 }}>Telefon</label>
                    <input
                      placeholder="+48 600 000 000"
                      className={`w-full h-11 border rounded-[3px] px-3 outline-none focus:border-[#0076FF] transition-colors bg-white ${form.formState.errors.phone ? "border-red-500" : "border-[#dcdcdc]"}`}
                      style={{ fontSize: 14 }}
                      {...form.register("phone")}
                    />
                    {form.formState.errors.phone && <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[#333] mb-1.5 uppercase tracking-wider" style={{ fontSize: 11, fontWeight: 700 }}>Interesuje mnie</label>
                    <select
                      className={`w-full h-11 border rounded-[3px] px-3 outline-none focus:border-[#0076FF] transition-colors bg-white ${form.formState.errors.interest ? "border-red-500" : "border-[#dcdcdc]"}`}
                      style={{ fontSize: 14, color: "#333" }}
                      {...form.register("interest")}
                    >
                      <option value="buying">Kupno nieruchomości</option>
                      <option value="selling">Sprzedaż nieruchomości</option>
                      <option value="renting">Wynajem nieruchomości</option>
                      <option value="investing">Inwestycja</option>
                      <option value="valuation">Bezpłatna wycena</option>
                    </select>
                    {form.formState.errors.interest && <p className="text-red-500 text-sm mt-1">{form.formState.errors.interest.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-[#333] mb-1.5 uppercase tracking-wider" style={{ fontSize: 11, fontWeight: 700 }}>Wiadomość</label>
                  <textarea
                    placeholder="Powiedz nam, czego szukasz…"
                    rows={5}
                    className={`w-full border rounded-[3px] px-3 py-3 outline-none focus:border-[#0076FF] transition-colors resize-none bg-white ${form.formState.errors.message ? "border-red-500" : "border-[#dcdcdc]"}`}
                    style={{ fontSize: 14 }}
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full h-12 rounded-[3px] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ background: "#0076FF", fontWeight: 700, fontSize: 15 }}>
                  {isSubmitting ? "Wysyłanie…" : "Wyślij wiadomość"}
                </button>
                <p className="text-[#999] text-center" style={{ fontSize: 12 }}>
                  Odpiszemy w ciągu 24 godzin. Twoje dane są bezpieczne.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ onNav }: { onNav: (id: string) => void }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer style={{ background: "#f7f7f7", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <button onClick={() => onNav("hero")} className="flex items-center gap-1 mb-3">
              <span style={{ color: "#0076FF", fontWeight: 700, fontSize: 20 }}>HomeKey</span>
              <span style={{ color: "#333", fontWeight: 700, fontSize: 20 }}>Realty</span>
            </button>
            <p className="text-[#999] mb-5 max-w-xs" style={{ fontSize: 14, lineHeight: 1.7 }}>
              Pomagamy ludziom znaleźć wymarzone domy od 2009 roku. Zaufało nam ponad 500 rodzin w całym regionie.
            </p>
            <div className="flex gap-2.5">
              {[<IconFacebook />, <IconTwitter />, <IconInstagram />].map((icon, i) => (
                <button key={i} className="w-9 h-9 rounded-full border border-[#dcdcdc] flex items-center justify-center text-[#555] hover:text-[#0076FF] hover:border-[#0076FF] transition-colors">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-[#333] mb-3 uppercase tracking-wider" style={{ fontSize: 11, fontWeight: 700 }}>Nawigacja</p>
            <div className="space-y-2">
              {[
                { id: "services", label: "Usługi" },
                { id: "properties", label: "Oferty" },
                { id: "team", label: "Zespół" },
                { id: "faq", label: "FAQ" },
                { id: "contact", label: "Kontakt" },
              ].map((l) => (
                <button key={l.id} onClick={() => onNav(l.id)}
                  className="block text-[#999] hover:text-[#0076FF] transition-colors" style={{ fontSize: 14 }}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[#333] mb-3 uppercase tracking-wider" style={{ fontSize: 11, fontWeight: 700 }}>Newsletter</p>
            <p className="text-[#999] mb-4" style={{ fontSize: 13, lineHeight: 1.6 }}>
              Nowe oferty i aktualności rynkowe prosto na Twój e-mail.
            </p>
            {subscribed ? (
              <p style={{ color: "#0076FF", fontSize: 14, fontWeight: 700 }}>✓ Zapisano!</p>
            ) : (
              <div className="flex gap-2">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Twój e-mail"
                  className="flex-1 h-10 border border-[#dcdcdc] rounded-[3px] px-3 outline-none focus:border-[#0076FF] bg-white transition-colors min-w-0"
                  style={{ fontSize: 13 }} />
                <button onClick={() => email && setSubscribed(true)}
                  className="h-10 px-3 rounded-[3px] text-white shrink-0"
                  style={{ background: "#0076FF", fontWeight: 700, fontSize: 13 }}>
                  Zapisz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#dcdcdc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#999]" style={{ fontSize: 12 }}>© 2026 HomeKey Realty. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-4 flex-wrap justify-center">
            {["Polityka prywatności", "Regulamin", "Cookies"].map((l) => (
              <button key={l} className="text-[#999] hover:text-[#0076FF] transition-colors" style={{ fontSize: 12 }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <Services />
      <Properties onNav={scrollTo} />
      <Testimonials />
      <Team />
      <FAQ />
      <Plans onNav={scrollTo} />
      <Contact />
      <Footer onNav={scrollTo} />
    </div>
  );
}
