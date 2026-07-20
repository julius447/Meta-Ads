# Ampy — Meta-Ads

Internt design- och granskningsverktyg för Ampys Meta-annonser (Facebook/Instagram).

**Live:** https://julius447.github.io/Meta-Ads/

## Vad det är
Varje kampanj → varje annons → i alla tre format (4:5 feed, 1:1 kvadrat, 9:16 story/reels),
renderat i exakt designstorlek och nedskalat visuellt för granskning.

## Arkitektur
- **Next.js 16 (App Router) + TypeScript + Tailwind**, statisk export → GitHub Pages.
- `lib/formats.ts` — en sanning för format, safe zones och typografisk skala.
  Safe zones är **data**, inte CSS (unified 9:16-zon från mars 2026: topp 14%, botten 20–35%, sidor 6%).
- `lib/registry.ts` + `registry.generated.ts` — annonsmanifest. Genereras av `npm run sync`.
- Annonser är antingen `kind:'image'` (befintlig PNG) eller `kind:'component'` (React-annons — nya spåret).

## Renderingsbeslut
Vi använder **Playwright/Chromium** som exportmotor, inte Satori:
Satori saknar stöd för kerning, ligaturer och OpenType-features — diskvalificerande
för typografidriven annonsdesign. Vi designar i 1080-bas (dsf=1) så preview = export;
`exportScale` (1,333×) ger Metas rekommenderade 1440-bas vid behov.

## Kommandon
```bash
npm run dev     # lokal utveckling
npm run sync    # synka annonsmaterial + generera registret
npm run build   # statisk export till out/
```
