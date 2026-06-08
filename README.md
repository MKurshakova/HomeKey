
# HomeKey Realty - Responsive SPA

Projekt końcowy SPA dla agencji nieruchomości HomeKey Realty.

## Stack technologiczny

- React + TypeScript
- Vite
- Tailwind CSS v4
- React Hook Form
- Zod + @hookform/resolvers

## Uruchomienie lokalne

1. Zainstaluj zależności:

```bash
npm install
```

2. Uruchom tryb deweloperski:

```bash
npm run dev
```

3. Zbuduj wersję produkcyjną:

```bash
npm run build
```

## Kluczowe elementy projektu

- Responsywny layout Mobile First (desktop + mobile).
- Sekcje biznesowe: Hero, Usługi, Oferty, Opinie, Zespół, FAQ, Cennik, Kontakt.
- Formularz kontaktowy z walidacją React Hook Form + Zod.
- Polskie komunikaty walidacyjne pod polami.
- Animacje sekcji z wykorzystaniem Intersection Observer.
- Design tokens skonfigurowane w stylach i mapowane do Tailwind v4 przez `@theme`.
  