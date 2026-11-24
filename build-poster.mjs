import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SCRATCH_DIR = process.env.POSTER_SCRATCH_DIR
  ?? 'C:\\Users\\ACER\\.gemini\\antigravity\\brain\\ab9c3a9c-e1a2-461c-bce3-444b83b8a4c9\\scratch';
const OUT_IMAGE = process.env.POSTER_OUT ?? path.resolve('entry.png');
const CHROME_PATH = process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const REGIONS = {
  eu: { name: 'EUROPE', color: '#1D4ED8', count: 10 },
  me: { name: 'MIDDLE EAST', color: '#C2410C', count: 4 },
  af: { name: 'AFRICA', color: '#15803D', count: 5 },
  as: { name: 'ASIA', color: '#B91C1C', count: 7 },
  na: { name: 'N. AMERICA', color: '#6D28D9', count: 4 },
  la: { name: 'LATIN AMERICA', color: '#0F766E', count: 3 },
  oc: { name: 'OCEANIA', color: '#0369A1', count: 2 }
};

const UTC_TICKS = [
  { time: '05:00', text: 'NZ holds India to Test draw' },
  { time: '06:00', text: 'Belgium ATC strike begins' },
  { time: '06:30', text: 'Seoul KOSPI closes −3.3%' },
  { time: '14:00', text: 'Nvidia reinstates CEO Huang' },
  { time: '15:12', text: 'EU 22nd Russia sanctions plan' },
  { time: '21:00', text: 'Nasdaq closes +6.51%' }
];

const LEAD_STORIES = [
  {
    num: 1,
    reg: 'na',
    place: 'SANTA CLARA · NEW YORK',
    cert: 'CONFIRMED',
    headline: 'Nvidia reinstates Huang as CEO; Wall St rallies',
    summary: 'Board restores CEO 11 days after exit; Nvidia surges ~31%, Nasdaq +6.51%, S&P 500 +4.7%.',
    source: 'Reuters, AP',
    tagTop: 'HUANG RETURNS',
    tagBot: 'NASDAQ +6.51%',
    art: `<svg viewBox="0 0 326 84" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lead1bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0B2436"/><stop offset="100%" stop-color="#114056"/>
        </linearGradient>
        <linearGradient id="lead1fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#22C55E" stop-opacity="0.48"/><stop offset="100%" stop-color="#22C55E" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      <rect width="326" height="84" fill="url(#lead1bg)"/>
      <g stroke="#295B72" stroke-width="0.6" opacity="0.55">
        <line x1="0" y1="21" x2="326" y2="21"/><line x1="0" y1="42" x2="326" y2="42"/><line x1="0" y1="63" x2="326" y2="63"/>
        <line x1="80" y1="0" x2="80" y2="84"/><line x1="163" y1="0" x2="163" y2="84"/><line x1="245" y1="0" x2="245" y2="84"/>
      </g>
      <g transform="translate(22,22)">
        <rect x="6" y="6" width="40" height="40" rx="4" fill="#071B29" stroke="#34D399" stroke-width="1.6"/>
        <rect x="14" y="14" width="24" height="24" rx="2" fill="#10B981" fill-opacity="0.28" stroke="#A7F3D0" stroke-width="1"/>
        <rect x="20" y="20" width="12" height="12" rx="1" fill="#34D399"/>
        <g stroke="#6EE7B7" stroke-width="1.3">
          <line x1="16" y1="0" x2="16" y2="6"/><line x1="26" y1="0" x2="26" y2="6"/><line x1="36" y1="0" x2="36" y2="6"/>
          <line x1="16" y1="46" x2="16" y2="52"/><line x1="26" y1="46" x2="26" y2="52"/><line x1="36" y1="46" x2="36" y2="52"/>
          <line x1="0" y1="16" x2="6" y2="16"/><line x1="0" y1="26" x2="6" y2="26"/><line x1="0" y1="36" x2="6" y2="36"/>
          <line x1="46" y1="16" x2="52" y2="16"/><line x1="46" y1="26" x2="52" y2="26"/><line x1="46" y1="36" x2="52" y2="36"/>
        </g>
      </g>
      <path d="M 94 68 L 122 65 L 146 72 L 172 64 L 198 44 L 226 30 L 254 22 L 298 11 L 298 84 L 94 84 Z" fill="url(#lead1fill)"/>
      <polyline points="94,68 122,65 146,72 172,64 198,44 226,30 254,22 298,11" fill="none" stroke="#4ADE80" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="146" cy="72" r="3" fill="#F87171"/>
      <circle cx="298" cy="11" r="4.5" fill="#BBF7D0" stroke="#064E3B" stroke-width="1.4"/>
      <path d="M 274 36 L 292 18 M 292 18 L 282 18 M 292 18 L 292 28" stroke="#FDE047" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    num: 2,
    reg: 'eu',
    place: 'BRUSSELS · POLAND',
    cert: 'CONFIRMED',
    headline: 'NATO holds emergency talks on Poland; AWACS sent',
    summary: 'All 32 allies convene over Russian Kh-101 missiles that fell in Poland on Friday; early-warning jet deployed.',
    source: 'AP, Reuters',
    tagTop: '32 ALLIES MEET',
    tagBot: 'AWACS TO POLAND',
    art: `<svg viewBox="0 0 326 84" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lead2bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#13294B"/><stop offset="100%" stop-color="#1E447E"/>
        </linearGradient>
      </defs>
      <rect width="326" height="84" fill="url(#lead2bg)"/>
      <!-- Council semicircular table on left -->
      <g transform="translate(88,58)">
        <ellipse cx="0" cy="0" rx="58" ry="20" fill="none" stroke="#93C5FD" stroke-width="6"/>
        <ellipse cx="0" cy="0" rx="44" ry="13" fill="#0F213E" stroke="#60A5FA" stroke-width="1"/>
        <path d="M -22 -2 L 22 -2 M 0 -10 L 0 6" stroke="#F8FAFC" stroke-width="1.2" opacity="0.7"/>
        <g fill="#E2E8F0">
          <circle cx="-54" cy="0" r="2.8"/><circle cx="-46" cy="-12" r="2.8"/><circle cx="-28" cy="-18" r="2.8"/>
          <circle cx="0" cy="-21" r="2.8"/><circle cx="28" cy="-18" r="2.8"/><circle cx="46" cy="-12" r="2.8"/><circle cx="54" cy="0" r="2.8"/>
        </g>
      </g>
      <!-- Radar + AWACS on right -->
      <g transform="translate(248,40)" fill="none" stroke="#60A5FA" stroke-opacity="0.5">
        <circle cx="0" cy="0" r="15" stroke-width="1"/>
        <circle cx="0" cy="0" r="30" stroke-width="1" stroke-dasharray="3 2"/>
        <path d="M 0 0 L -22 -21 A 30 30 0 0 1 18 -24 Z" fill="#93C5FD" fill-opacity="0.22" stroke="none"/>
      </g>
      <g transform="translate(216,18)" fill="#FFFFFF">
        <path d="M 2 14 L 20 11 L 27 3 L 31 3 L 27 11 L 39 11 L 44 6 L 47 6 L 44 13 L 39 14 L 27 15 L 31 23 L 27 23 L 20 15 Z"/>
        <ellipse cx="21" cy="9" rx="8" ry="2.4" fill="#FDE047"/>
      </g>
      <g fill="#EF4444" stroke="#FFFFFF" stroke-width="0.9">
        <circle cx="176" cy="48" r="3"/><circle cx="184" cy="60" r="3"/><circle cx="172" cy="68" r="3"/>
      </g>
    </svg>`
  },
  {
    num: 3,
    reg: 'eu',
    place: 'BRUSSELS · EU',
    cert: 'OFFICIAL',
    headline: 'EU unveils 22nd Russia sanctions: 60 banks off SWIFT',
    summary: 'Von der Leyen targets ~60 Russian banks, crypto evasion & sports flags; needs 27-state approval.',
    source: 'AFP, Al Jazeera',
    tagTop: '60 BANKS',
    tagBot: '22ND PACKAGE',
    art: `<svg viewBox="0 0 326 84" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="326" height="84" fill="#173363"/>
      <!-- EU stars ring on left -->
      <g transform="translate(56,42)" fill="#FACC15">
        <circle cx="0" cy="-24" r="2.6"/><circle cx="12" cy="-21" r="2.6"/><circle cx="21" cy="-12" r="2.6"/>
        <circle cx="24" cy="0" r="2.6"/><circle cx="21" cy="12" r="2.6"/><circle cx="12" cy="21" r="2.6"/>
        <circle cx="0" cy="24" r="2.6"/><circle cx="-12" cy="21" r="2.6"/><circle cx="-21" cy="12" r="2.6"/>
        <circle cx="-24" cy="0" r="2.6"/><circle cx="-21" cy="-12" r="2.6"/><circle cx="-12" cy="-21" r="2.6"/>
      </g>
      <!-- Bank building crossed out in center -->
      <g transform="translate(122,17)">
        <polygon points="34,0 2,16 66,16" fill="#CBD5E1"/>
        <rect x="8" y="18" width="8" height="24" fill="#E2E8F0"/>
        <rect x="22" y="18" width="8" height="24" fill="#E2E8F0"/>
        <rect x="38" y="18" width="8" height="24" fill="#E2E8F0"/>
        <rect x="52" y="18" width="8" height="24" fill="#E2E8F0"/>
        <rect x="2" y="44" width="64" height="6" fill="#94A3B8"/>
        <circle cx="34" cy="28" r="22" fill="none" stroke="#EF4444" stroke-width="5"/>
        <line x1="18" y1="12" x2="50" y2="44" stroke="#EF4444" stroke-width="5"/>
      </g>
      <!-- Crypto & visa/sports ban badges on right (shifted up cleanly above 22ND PACKAGE tag) -->
      <g transform="translate(224,11)">
        <rect x="0" y="0" width="84" height="19" rx="3" fill="#0F2347" stroke="#60A5FA" stroke-width="1"/>
        <text x="42" y="12.5" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="8.8" font-weight="800" fill="#FDE047">SWIFT · CRYPTO</text>
        <rect x="0" y="24" width="84" height="19" rx="3" fill="#0F2347" stroke="#60A5FA" stroke-width="1"/>
        <text x="42" y="36.5" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="8.8" font-weight="800" fill="#FECACA">FLAGS · VISAS</text>
      </g>
    </svg>`
  }
];

const FEATURE_ROW_2 = [
  {
    num: 4,
    reg: 'eu',
    place: 'DYMER, UKRAINE',
    cert: 'OFFICIAL',
    headline: 'Kyiv-area apartment strike toll hits 11',
    summary: 'Rescuers conclude debris clearance on Monday; dead include a child.',
    source: 'AP, Reuters',
    tag: '11 DEAD',
    art: `<svg viewBox="0 0 192 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="192" height="64" fill="#182234"/>
      <rect x="0" y="54" width="192" height="10" fill="#0F172A"/>
      <rect x="44" y="12" width="62" height="44" fill="#2A364B" stroke="#94A3B8" stroke-width="1"/>
      <path d="M 80 12 L 106 12 L 106 32 L 88 32 Z" fill="#EF4444" fill-opacity="0.82"/>
      <g fill="#FBBF24">
        <rect x="50" y="18" width="7" height="7"/><rect x="61" y="18" width="7" height="7"/><rect x="72" y="18" width="7" height="7"/>
        <rect x="50" y="29" width="7" height="7"/><rect x="61" y="29" width="7" height="7"/><rect x="72" y="29" width="7" height="7"/>
        <rect x="50" y="40" width="7" height="7"/><rect x="61" y="40" width="7" height="7"/><rect x="72" y="40" width="7" height="7"/><rect x="84" y="40" width="7" height="7"/>
      </g>
      <path d="M 118 54 L 130 34 L 146 54 Z" fill="#F97316"/>
      <circle cx="24" cy="18" r="6" fill="#E2E8F0" opacity="0.25"/>
    </svg>`
  },
  {
    num: 5,
    reg: 'me',
    place: 'JABALIA, GAZA',
    cert: 'CONFIRMED',
    headline: 'Strike kills UNRWA aid worker at well',
    summary: 'UNRWA names Adel al-Helo among three killed in Gaza Monday.',
    source: 'Al Jazeera, Reuters',
    tag: 'UNRWA WORKER',
    art: `<svg viewBox="0 0 192 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="192" height="64" fill="#E7D8C5"/>
      <rect x="0" y="48" width="192" height="16" fill="#C4B097"/>
      <!-- Water tank / well -->
      <rect x="34" y="26" width="28" height="22" rx="3" fill="#0284C7" stroke="#0C4A6E" stroke-width="1.2"/>
      <text x="48" y="40" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF">UN</text>
      <!-- Shelter & blast plume -->
      <path d="M 78 48 L 88 30 L 122 30 L 132 48 Z" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
      <path d="M 136 48 C 128 32, 134 16, 148 15 C 156 8, 170 15, 166 28 C 174 34, 168 46, 156 48 Z" fill="#DC2626" fill-opacity="0.78"/>
      <path d="M 144 46 C 140 36, 146 27, 154 27 C 160 27, 163 36, 158 46 Z" fill="#F59E0B"/>
    </svg>`
  },
  {
    num: 6,
    reg: 'me',
    place: 'WASHINGTON · IRAN',
    cert: 'OFFICIAL',
    headline: 'US sanctions Iran ‘shadow banking’ ring',
    summary: 'Treasury hits 24+ exchange houses & fronts after $15bn FinCEN probe.',
    source: 'US Treasury',
    tag: '$15BN PROBE',
    art: `<svg viewBox="0 0 192 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="192" height="64" fill="#2A1D19"/>
      <g transform="translate(22,12)">
        <rect x="4" y="18" width="38" height="26" rx="3" fill="#4B5563" stroke="#D1D5DB" stroke-width="1.2"/>
        <path d="M 11 18 V 11 A 12 12 0 0 1 35 11 V 18" fill="none" stroke="#FBBF24" stroke-width="3.5"/>
        <circle cx="23" cy="30" r="4" fill="#FBBF24"/>
      </g>
      <g transform="translate(78,19)" stroke="#F87171" stroke-width="1.6" fill="none">
        <rect x="0" y="2" width="52" height="16" rx="2" fill="#7F1D1D" stroke="#FCA5A5"/>
        <text x="26" y="13" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="8.2" font-weight="800" fill="#FEF2F2" stroke="none">24+ FIRMS</text>
        <rect x="0" y="23" width="52" height="16" rx="2" fill="#7F1D1D" stroke="#FCA5A5"/>
        <text x="26" y="34" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="8.2" font-weight="800" fill="#FDE047" stroke="none">FROZEN</text>
      </g>
    </svg>`
  },
  {
    num: 7,
    reg: 'af',
    place: 'KINSHASA, DR CONGO',
    cert: 'OFFICIAL',
    headline: 'DR Congo halts all cobalt exports',
    summary: 'Regulator ARECOMS freezes shipments from 30 Nov to fight glut.',
    source: 'Reuters, Bloomberg',
    tag: 'FROM 30 NOV',
    art: `<svg viewBox="0 0 192 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="192" height="64" fill="#D9E7D7"/>
      <rect x="0" y="46" width="192" height="18" fill="#6F8C6D"/>
      <!-- Ore mound -->
      <path d="M 16 48 L 44 20 L 76 48 Z" fill="#475569" stroke="#1E293B" stroke-width="1.2"/>
      <polygon points="38,32 45,26 52,33 44,39" fill="#38BDF8"/>
      <!-- Stop gate barrier -->
      <rect x="92" y="24" width="70" height="8" fill="#FFFFFF" stroke="#B91C1C" stroke-width="1.2"/>
      <path d="M 96 24 L 106 32 M 114 24 L 124 32 M 132 24 L 142 32 M 150 24 L 160 32" stroke="#DC2626" stroke-width="4"/>
      <rect x="96" y="32" width="6" height="18" fill="#334155"/>
      <circle cx="84" cy="28" r="10" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
      <rect x="78" y="26.5" width="12" height="3" fill="#FFFFFF"/>
    </svg>`
  },
  {
    num: 8,
    reg: 'af',
    place: 'LUSAKA, ZAMBIA',
    cert: 'OFFICIAL',
    headline: 'Opposition chief faces treason trial',
    summary: 'Runner-up Brian Mundubile & co-accused committed to High Court.',
    source: 'Reuters, AFP',
    tag: 'TREASON TRIAL',
    art: `<svg viewBox="0 0 192 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="192" height="64" fill="#E7E1D3"/>
      <rect x="0" y="52" width="192" height="12" fill="#A89F8D"/>
      <!-- Courthouse columns -->
      <polygon points="62,10 18,24 106,24" fill="#64748B"/>
      <rect x="24" y="26" width="8" height="24" fill="#CBD5E1" stroke="#475569"/>
      <rect x="44" y="26" width="8" height="24" fill="#CBD5E1" stroke="#475569"/>
      <rect x="64" y="26" width="8" height="24" fill="#CBD5E1" stroke="#475569"/>
      <rect x="84" y="26" width="8" height="24" fill="#CBD5E1" stroke="#475569"/>
      <rect x="18" y="50" width="88" height="5" fill="#475569"/>
      <!-- Gavel -->
      <g transform="translate(124,26) rotate(-25)">
        <rect x="0" y="0" width="24" height="10" rx="2" fill="#78350F"/>
        <rect x="10" y="10" width="4" height="22" fill="#92400E"/>
      </g>
    </svg>`
  }
];

const FEATURE_ROW_3 = [
  {
    num: 9,
    reg: 'as',
    place: 'NEW DELHI · NEPAL',
    cert: 'OFFICIAL',
    headline: 'India pledges $1.6bn flood aid to Nepal',
    summary: 'PM Modi unveils recovery package during Nepal PM Balendra Shah’s visit.',
    source: 'AFP, Reuters',
    tag: '$1.6BN AID',
    art: `<svg viewBox="0 0 192 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="192" height="64" fill="#DCE7EE"/>
      <!-- Himalayan mountain silhouette -->
      <path d="M 0 52 L 38 18 L 68 38 L 100 14 L 136 52 Z" fill="#64748B"/>
      <path d="M 38 18 L 28 28 L 48 28 Z M 100 14 L 88 26 L 112 26 Z" fill="#F8FAFC"/>
      <rect x="0" y="48" width="192" height="16" fill="#0284C7" opacity="0.65"/>
      <!-- Gold coins stack + flags badge -->
      <g transform="translate(124,20)">
        <ellipse cx="18" cy="28" rx="16" ry="5" fill="#D97706" stroke="#FEF3C7"/>
        <ellipse cx="18" cy="22" rx="16" ry="5" fill="#F59E0B" stroke="#FEF3C7"/>
        <ellipse cx="18" cy="16" rx="16" ry="5" fill="#FBBF24" stroke="#FEF3C7"/>
      </g>
    </svg>`
  },
  {
    num: 10,
    reg: 'la',
    place: 'BRASÍLIA, BRAZIL',
    cert: 'CONFIRMED',
    headline: 'Brazil’s lower house backs fiscal curbs',
    summary: 'Deputies vote 353–128 to pass Lula’s public-spending adjustment bill.',
    source: 'Reuters',
    tag: '353–128 VOTE',
    art: `<svg viewBox="0 0 192 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="192" height="64" fill="#E6EFEA"/>
      <!-- Brasília dome & twin towers silhouette -->
      <path d="M 16 50 C 16 32, 54 32, 54 50 Z" fill="#FFFFFF" stroke="#0F766E" stroke-width="1.3"/>
      <rect x="64" y="18" width="8" height="32" fill="#0F766E"/>
      <rect x="75" y="18" width="8" height="32" fill="#0F766E"/>
      <rect x="10" y="50" width="80" height="5" fill="#334155"/>
      <!-- Vote bar 353 vs 128 -->
      <g transform="translate(102,27)">
        <rect x="0" y="0" width="74" height="12" rx="2" fill="#15803D"/>
        <text x="37" y="9" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF">YES 353</text>
        <rect x="0" y="16" width="38" height="12" rx="2" fill="#DC2626"/>
        <text x="19" y="25" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF">128</text>
      </g>
    </svg>`
  },
  {
    num: 11,
    reg: 'la',
    place: 'CÚCUTA, COLOMBIA',
    cert: 'CONFIRMED',
    headline: 'Explosive drones strike police base',
    summary: 'Border-city attack injures 3 civilians incl. infant; 60+ homes damaged.',
    source: 'AP, Al Jazeera',
    tag: '60+ HOMES HIT',
    art: `<svg viewBox="0 0 192 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="192" height="64" fill="#292524"/>
      <rect x="18" y="34" width="76" height="24" fill="#44403C" stroke="#A8A29E"/>
      <rect x="26" y="40" width="10" height="10" fill="#FDE047"/>
      <rect x="42" y="40" width="10" height="10" fill="#FDE047"/>
      <path d="M 68 38 C 62 24, 72 12, 86 16 C 96 10, 108 20, 102 32 C 110 38, 102 52, 90 50 Z" fill="#F97316"/>
      <path d="M 76 38 C 72 28, 80 22, 88 26 C 92 32, 88 42, 80 42 Z" fill="#FDE047"/>
      <!-- Drone silhouette top-left -->
      <g transform="translate(22,12)" stroke="#E7E5E4" stroke-width="1.6" fill="none">
        <line x1="0" y1="6" x2="24" y2="6"/><circle cx="12" cy="6" r="3" fill="#EF4444" stroke="none"/>
        <line x1="0" y1="3" x2="6" y2="3"/><line x1="18" y1="3" x2="24" y2="3"/>
      </g>
    </svg>`
  },
  {
    num: 12,
    reg: 'na',
    place: 'ZURICH · FIFA',
    cert: 'OFFICIAL',
    headline: 'FIFA names 2031 & 2035 Women’s World Cups',
    summary: 'US, Mexico, Costa Rica & Jamaica host 2031; UK confirmed for 2035.',
    source: 'FIFA, AP',
    tag: '2031 & 2035',
    art: `<svg viewBox="0 0 192 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="192" height="64" fill="#14532D"/>
      <line x1="0" y1="48" x2="192" y2="48" stroke="#4ADE80" stroke-width="1" opacity="0.5"/>
      <!-- Trophy + soccer ball -->
      <g transform="translate(30,14)">
        <path d="M 8 4 H 28 V 16 C 28 24, 18 28, 18 28 C 18 28, 8 24, 8 16 Z" fill="#FACC15" stroke="#FEF08A" stroke-width="1"/>
        <rect x="15" y="28" width="6" height="9" fill="#EAB308"/>
        <rect x="10" y="37" width="16" height="5" rx="1" fill="#CA8A04"/>
      </g>
      <circle cx="96" cy="36" r="14" fill="#FFFFFF" stroke="#1E293B" stroke-width="1.4"/>
      <polygon points="96,28 103,33 100,41 92,41 89,33" fill="#1E293B"/>
      <rect x="122" y="29" width="54" height="14" rx="2" fill="#4C1D95"/>
      <text x="149" y="39" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="8.5" font-weight="800" fill="#FFFFFF">48 TEAMS</text>
    </svg>`
  },
  {
    num: 13,
    reg: 'oc',
    place: 'WELLINGTON, NZ',
    cert: 'CONFIRMED',
    headline: 'New Zealand bat out day to draw India',
    summary: 'Black Caps survive 120 overs to close 239–5 after India’s 720/9.',
    source: 'ICC, Reuters',
    tag: 'NZ 239–5',
    art: `<svg viewBox="0 0 192 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="192" height="64" fill="#166534"/>
      <ellipse cx="96" cy="40" rx="76" ry="20" fill="#22C55E" fill-opacity="0.28" stroke="#86EFAC" stroke-width="1"/>
      <rect x="64" y="26" width="64" height="24" rx="2" fill="#D6C59E" opacity="0.85"/>
      <!-- Wicket stumps -->
      <g stroke="#FEF3C7" stroke-width="2.2">
        <line x1="40" y1="22" x2="40" y2="48"/><line x1="46" y1="22" x2="46" y2="48"/><line x1="52" y1="22" x2="52" y2="48"/>
        <line x1="39" y1="22" x2="53" y2="22" stroke="#F59E0B" stroke-width="2"/>
      </g>
      <circle cx="116" cy="37" r="4.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="0.8"/>
      <rect x="132" y="28" width="44" height="16" rx="2" fill="#0F172A"/>
      <text x="154" y="39" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="8.5" font-weight="800" fill="#FFFFFF">DRAW</text>
    </svg>`
  }
];

const MORE_COL_1 = [
  { num: 14, reg: 'eu', place: 'Belgium:', text: 'Nationwide ATC strike shuts Brussels & Charleroi skies 06:00–20:00 UTC; 50,000+ hit.' },
  { num: 15, reg: 'eu', place: 'Moscow / Estonia:', text: 'Russia summons envoy, claims border closure courts “open war”; Tallinn denies.', claim: true },
  { num: 16, reg: 'eu', place: 'Finland:', text: 'Summons Russian ambassador over suspected helicopter incursion & Ukraine strikes.' },
  { num: 17, reg: 'eu', place: 'Germany:', text: 'Hoax emailed bomb threats hit ~450 schools; flash PMI hits 56-month high (55.0).' },
  { num: 18, reg: 'eu', place: 'Denmark:', text: 'Supreme Court upholds “ghetto law” housing rules against ethnic-bias challenge.' },
  { num: 19, reg: 'eu', place: 'Spain:', text: 'Supreme Court applies amnesty law to close Carles Puigdemont embezzlement case.' },
  { num: 20, reg: 'eu', place: 'UK:', text: 'NHS opens EDITH AI breast-screening trial for 700,000 women; Brentford beat Everton 4–0.' },
  { num: 21, reg: 'me', place: 'Gaza:', text: 'Oxfam & CEOBS warn war left widespread toxic debris & unexploded ordnance.' },
  { num: 22, reg: 'me', place: 'Tehran / US:', text: 'Trump warns strikes may resume after New Year; Iran claims $290bn court award.', claim: true },
  { num: 23, reg: 'af', place: 'Ituri, DR Congo:', text: 'WHO warns fighting trapped Ebola staff 24 hrs; outbreak reaches 11,613 cases.' },
  { num: 24, reg: 'af', place: 'Ghana:', text: 'Opens GH¢28.6bn voluntary domestic bond buyback ahead of 2027 maturity.' }
];

const MORE_COL_2 = [
  { num: 25, reg: 'af', place: 'Senegal:', text: 'U-17 squad thrashes Cuba 9–0 at FIFA U-17 World Cup in Qatar.' },
  { num: 26, reg: 'as', place: 'South Korea:', text: 'Lee names Kang Kum-sil first woman spy chief; KOSPI drops 3.3% before US rally.' },
  { num: 27, reg: 'as', place: 'Indonesia:', text: 'Search & forensic ID continue Monday after Saturday’s Cikande candy plant fire.' },
  { num: 28, reg: 'as', place: 'Tajikistan:', text: 'Formally notifies UN of withdrawal from the International Criminal Court.' },
  { num: 29, reg: 'as', place: 'Bangladesh:', text: 'Garment wage board deadlocks in minimum-pay talks amid factory unrest.' },
  { num: 30, reg: 'as', place: 'SE Asia / US:', text: 'US BIS adds 7 Singapore, Malaysia & Thailand firms to Entity List over AI chips.' },
  { num: 31, reg: 'as', place: 'China:', text: 'Hosts Dutch FM Tom Berendsen (23–25 Nov) and eases stock margin rules.' },
  { num: 32, reg: 'na', place: 'US Tech:', text: 'Virginia & Oregon sue xAI/X over Grok AI images; Microsoft starts “Code Red” overhaul.' },
  { num: 33, reg: 'na', place: 'US / Energy:', text: 'WTI oil drops 3.9% while EU gas climbs 4%; DOJ admits mistaken deportation.' },
  { num: 34, reg: 'la', place: 'South America:', text: 'IOM aids 20,000 displaced by S. Brazil storm; Peru holds anti-femicide marches.' },
  { num: 35, reg: 'oc', place: 'Australia:', text: 'Treasurer Chalmers warns jobless rate will top 5% & growth slow below 2%.' }
];

// Map coordinates inside 316 x 122 SVG viewport
const MAP_PINS = [
  { num: 1, x: 45, y: 42, c: REGIONS.na.color },   // Santa Clara / NY
  { num: 2, x: 168, y: 31, c: REGIONS.eu.color },  // Brussels / Poland
  { num: 3, x: 154, y: 34, c: REGIONS.eu.color },  // Brussels EU
  { num: 4, x: 181, y: 34, c: REGIONS.eu.color },  // Dymer, Ukraine
  { num: 5, x: 186, y: 50, c: REGIONS.me.color },  // Gaza
  { num: 6, x: 206, y: 48, c: REGIONS.me.color },  // Iran / Washington
  { num: 7, x: 170, y: 74, c: REGIONS.af.color },  // Kinshasa, DRC
  { num: 8, x: 178, y: 86, c: REGIONS.af.color },  // Lusaka, Zambia
  { num: 9, x: 230, y: 53, c: REGIONS.as.color },  // New Delhi / Nepal
  { num: 10, x: 102, y: 86, c: REGIONS.la.color }, // Brasília, Brazil
  { num: 11, x: 84, y: 69, c: REGIONS.la.color },  // Cúcuta, Colombia
  { num: 12, x: 76, y: 43, c: REGIONS.na.color },  // US / Mexico / FIFA
  { num: 13, x: 299, y: 101, c: REGIONS.oc.color } // Wellington, NZ
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const totalCount = Object.values(REGIONS).reduce((a, r) => a + r.count, 0);
const regionBarHtml = Object.values(REGIONS).map((r) =>
  `<div class="reg-seg" style="flex:${r.count}; background:${r.color}">${r.name} ${r.count}</div>`
).join('');

const utcHtml = UTC_TICKS.map((t) =>
  `<div class="utc-item"><span class="utc-t">${esc(t.time)}</span><span class="utc-txt">${esc(t.text)}</span></div>`
).join('');

const leadHtml = LEAD_STORIES.map((s) => {
  const regColor = REGIONS[s.reg].color;
  return `
    <article class="lead-card">
      <div class="lead-art">
        ${s.art}
        <span class="art-tag top-left">${esc(s.tagTop)}</span>
        <span class="art-tag bot-right">${esc(s.tagBot)}</span>
      </div>
      <div class="card-meta">
        <span class="num-dot" style="background:${regColor}">${s.num}</span>
        <span class="place-txt" style="color:${regColor}">${esc(s.place)}</span>
        <span class="cert-badge cert-${s.cert.toLowerCase()}">${s.cert}</span>
      </div>
      <h2 class="lead-title">${esc(s.headline)}</h2>
      <p class="lead-sum">${esc(s.summary)} <span class="src-txt">${esc(s.source)}</span></p>
    </article>`;
}).join('');

function renderFeatureRow(list) {
  return list.map((s) => {
    const regColor = REGIONS[s.reg].color;
    return `
      <article class="feat-card">
        <div class="feat-art">
          ${s.art}
          <span class="art-tag top-right">${esc(s.tag)}</span>
        </div>
        <div class="card-meta">
          <span class="num-dot" style="background:${regColor}">${s.num}</span>
          <span class="place-txt" style="color:${regColor}">${esc(s.place)}</span>
          <span class="cert-badge cert-${s.cert.toLowerCase()}">${s.cert}</span>
        </div>
        <h3 class="feat-title">${esc(s.headline)}</h3>
        <p class="feat-sum">${esc(s.summary)} <span class="src-txt">${esc(s.source)}</span></p>
      </article>`;
  }).join('');
}

function renderWireList(items) {
  return items.map((it) => {
    const c = REGIONS[it.reg].color;
    return `
      <li class="wire-item">
        <span class="wire-num" style="background:${c}">${it.num}</span>
        <span class="wire-copy"><strong style="color:${c}">${esc(it.place)}</strong> ${esc(it.text)}${it.claim ? ' <span class="cert-badge cert-claim">CLAIM</span>' : ''}</span>
      </li>`;
  }).join('');
}

const mapPinsSvg = MAP_PINS.map((p) => `
  <g>
    <circle cx="${p.x}" cy="${p.y}" r="6.4" fill="${p.c}" stroke="#FFFFFF" stroke-width="1.1"/>
    <text x="${p.x}" y="${p.y + 2.6}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="7.2" font-weight="800" fill="#FFFFFF">${p.num}</text>
  </g>
`).join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1024px;
    height: 1024px;
    overflow: hidden;
    background: #FBF8F1;
    color: #111827;
    font-family: "Segoe UI", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .sheet {
    width: 1024px;
    height: 1024px;
    padding: 9px 14px 7px 14px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  /* TOP MASTHEAD */
  .top-kicker {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9.5px;
    font-weight: 800;
    letter-spacing: 0.7px;
    color: #7F1D1D;
    border-bottom: 1.5px solid #1E293B;
    padding-bottom: 2px;
  }
  .top-kicker .right { color: #1E293B; }
  .masthead {
    text-align: center;
    padding: 1px 0 4px 0;
    border-bottom: 2px solid #1E293B;
  }
  .masthead h1 {
    font-family: "Georgia", "Cambria", serif;
    font-size: 48px;
    line-height: 1.06;
    font-weight: 700;
    color: #0F172A;
    letter-spacing: -0.4px;
  }
  .masthead-sub {
    margin-top: 3px;
    font-family: "Georgia", serif;
    font-style: italic;
    font-size: 12px;
    color: #7F1D1D;
    font-weight: 600;
  }

  /* REGION PROPORTION BAR */
  .reg-bar {
    display: flex;
    height: 15px;
    border-radius: 2px;
    overflow: hidden;
    gap: 1px;
    flex-shrink: 0;
  }
  .reg-seg {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 8.2px;
    font-weight: 800;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }

  /* UTC TIMELINE */
  .utc-bar {
    display: flex;
    align-items: stretch;
    border: 1px solid #D6CEBF;
    background: #F4EFE4;
    height: 29px;
    flex-shrink: 0;
  }
  .utc-label {
    background: #8B1E1E;
    color: #FFFFFF;
    font-size: 8.2px;
    font-weight: 800;
    line-height: 1.1;
    padding: 0 7px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.4px;
    flex-shrink: 0;
  }
  .utc-ticks {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    flex: 1;
  }
  .utc-item {
    border-left: 1px solid #D6CEBF;
    padding: 2px 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }
  .utc-t {
    font-size: 8.8px;
    font-weight: 800;
    color: #8B1E1E;
    line-height: 1.05;
  }
  .utc-txt {
    font-size: 8.3px;
    color: #1F2937;
    line-height: 1.1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* LEAD ROW (3 CARDS) */
  .lead-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 9px;
    height: 175px;
    flex-shrink: 0;
  }
  .lead-card {
    display: flex;
    flex-direction: column;
    border-bottom: 1.5px solid #CBD5E1;
    padding-bottom: 3px;
    overflow: hidden;
  }
  .lead-art {
    position: relative;
    height: 84px;
    border: 1px solid #CBD5E1;
    border-radius: 2px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .art-tag {
    position: absolute;
    background: rgba(15, 23, 42, 0.9);
    color: #FFFFFF;
    font-size: 8.8px;
    font-weight: 800;
    letter-spacing: 0.4px;
    padding: 2px 5px;
    border-radius: 2px;
  }
  .art-tag.top-left { top: 4px; left: 4px; background: #991B1B; }
  .art-tag.bot-right { bottom: 4px; right: 4px; }
  .art-tag.top-right { top: 3px; right: 3px; font-size: 8px; padding: 1.5px 4.5px; }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 3px;
    min-width: 0;
  }
  .num-dot {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    color: #FFFFFF;
    font-size: 8px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .place-txt {
    font-size: 8.2px;
    font-weight: 800;
    letter-spacing: 0.3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cert-badge {
    margin-left: auto;
    font-size: 7.2px;
    font-weight: 800;
    padding: 0.5px 3.5px;
    border-radius: 2px;
    border: 1px solid;
    flex-shrink: 0;
  }
  .cert-confirmed { color: #166534; border-color: #16A34A; background: #F0FDF4; }
  .cert-official { color: #1E40AF; border-color: #3B82F6; background: #EFF6FF; }
  .cert-reported { color: #475569; border-color: #94A3B8; background: #F8FAFC; }
  .cert-claim { color: #991B1B; border-color: #DC2626; background: #FEF2F2; margin-left: 3px; }

  .lead-title {
    font-family: "Georgia", "Cambria", serif;
    font-size: 14px;
    line-height: 1.15;
    font-weight: 700;
    color: #0F172A;
    margin-top: 2px;
  }
  .lead-sum {
    font-size: 9.6px;
    line-height: 1.24;
    color: #334155;
    margin-top: 2px;
  }
  .src-txt {
    font-size: 8.6px;
    color: #64748B;
    font-weight: 600;
  }

  /* FEATURE ROWS (5 CARDS EACH) */
  .feat-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    height: 141px;
    flex-shrink: 0;
  }
  .feat-card {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #D6CEBF;
    padding-bottom: 2px;
    overflow: hidden;
  }
  .feat-art {
    position: relative;
    height: 62px;
    border: 1px solid #CBD5E1;
    border-radius: 2px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .feat-title {
    font-family: "Georgia", "Cambria", serif;
    font-size: 11.4px;
    line-height: 1.14;
    font-weight: 700;
    color: #0F172A;
    margin-top: 2px;
  }
  .feat-sum {
    font-size: 8.9px;
    line-height: 1.2;
    color: #334155;
    margin-top: 1.5px;
  }

  /* BOTTOM SECTION: MAP + 22 DISPATCHES */
  .bottom-split {
    display: grid;
    grid-template-columns: 316px 1fr;
    gap: 10px;
    flex: 1;
    min-height: 0;
    padding-top: 2px;
  }
  .map-box {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .sub-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 9.2px;
    font-weight: 800;
    letter-spacing: 0.4px;
    color: #8B1E1E;
    border-bottom: 1px solid #CBD5E1;
    padding-bottom: 1.5px;
  }
  .sub-head span.muted {
    font-weight: 600;
    font-size: 8.2px;
    color: #64748B;
    letter-spacing: 0;
  }
  .map-frame {
    background: #DCE8F2;
    border: 1px solid #B8C9D9;
    border-radius: 3px;
    height: 122px;
    overflow: hidden;
  }
  .map-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 3px 8px;
    font-size: 8.1px;
    font-weight: 700;
    color: #334155;
    padding-top: 1px;
  }
  .leg-i { display: inline-flex; align-items: center; gap: 3px; }
  .leg-dot { width: 6.5px; height: 6.5px; border-radius: 50%; display: inline-block; }

  .wire-box {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-height: 0;
  }
  .wire-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    flex: 1;
    min-height: 0;
  }
  .wire-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5px;
  }
  .wire-item {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 8.65px;
    line-height: 1.18;
    color: #1F2937;
  }
  .wire-num {
    width: 12.5px;
    height: 12.5px;
    border-radius: 50%;
    color: #FFFFFF;
    font-size: 7.4px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 0.5px;
  }
  .wire-copy strong { font-weight: 800; }

  /* DATE CHECK & FOOTER */
  .date-check {
    border: 1.4px solid #991B1B;
    background: #FEF6F5;
    padding: 3.5px 8px;
    font-size: 8.3px;
    line-height: 1.24;
    color: #1F2937;
    flex-shrink: 0;
  }
  .date-check strong.dc-title {
    color: #991B1B;
    font-weight: 800;
    margin-right: 4px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8px;
    color: #475569;
    padding-top: 1px;
    flex-shrink: 0;
  }
  .footer-key { display: flex; align-items: center; gap: 6px; }
</style>
</head>
<body>
  <main class="sheet">
    <div class="top-kicker">
      <span>THE WORLD IN ONE DAY · ONE PAGE</span>
      <span class="right">${totalCount} STORIES · 7 REGIONS · EVERY STORY FROM MONDAY 23 NOVEMBER 2026</span>
    </div>

    <header class="masthead">
      <h1>Monday 23 November 2026</h1>
      <div class="masthead-sub">Nvidia reinstates Huang · NATO Poland AWACS · EU 22nd Russia sanctions · Dymer toll hits 11</div>
    </header>

    <div class="reg-bar">${regionBarHtml}</div>

    <div class="utc-bar">
      <div class="utc-label">THE DAY<br/>IN UTC</div>
      <div class="utc-ticks">${utcHtml}</div>
    </div>

    <section class="lead-grid">${leadHtml}</section>
    <section class="feat-grid">${renderFeatureRow(FEATURE_ROW_2)}</section>
    <section class="feat-grid">${renderFeatureRow(FEATURE_ROW_3)}</section>

    <section class="bottom-split">
      <div class="map-box">
        <div class="sub-head">
          <span>WHERE IT HAPPENED</span>
          <span class="muted">pins 1–13 match cards above</span>
        </div>
        <div class="map-frame">
          <svg viewBox="0 0 316 122" width="316" height="122" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#C6D7E6" stroke-width="0.6">
              <line x1="0" y1="61" x2="316" y2="61"/>
              <line x1="158" y1="0" x2="158" y2="122"/>
            </g>
            <g fill="#D7CFC0" stroke="#9F9480" stroke-width="0.6" stroke-linejoin="round">
              <!-- North America -->
              <path d="M 28 16 C 46 10, 74 11, 92 20 C 96 28, 86 38, 76 46 C 68 53, 62 59, 68 64 L 62 66 C 53 60, 44 50, 36 40 C 28 32, 24 22, 28 16 Z"/>
              <!-- Greenland -->
              <path d="M 100 8 C 110 6, 122 8, 125 14 C 118 20, 106 20, 100 15 Z"/>
              <!-- South America -->
              <path d="M 76 64 C 88 61, 102 68, 112 78 C 114 87, 104 97, 94 110 C 89 114, 85 106, 84 94 C 81 82, 73 72, 76 64 Z"/>
              <!-- Europe -->
              <path d="M 146 31 C 154 24, 165 18, 178 16 C 187 18, 190 28, 185 37 C 175 40, 162 40, 150 38 Z"/>
              <!-- UK -->
              <path d="M 146 24 L 151 23 L 151 30 L 146 30 Z"/>
              <!-- Africa -->
              <path d="M 146 46 C 160 42, 176 44, 186 54 C 192 62, 196 72, 188 86 C 182 96, 174 102, 169 96 C 165 86, 162 76, 152 68 C 144 62, 141 52, 146 46 Z"/>
              <!-- Asia & Middle East -->
              <path d="M 186 16 C 216 11, 254 13, 286 20 C 296 24, 288 34, 274 42 C 266 49, 258 55, 250 64 C 242 66, 236 58, 229 66 C 221 63, 214 55, 206 54 C 196 58, 188 54, 184 44 Z"/>
              <!-- Japan -->
              <path d="M 278 36 L 284 34 L 285 43 L 279 45 Z"/>
              <!-- SE Asia islands -->
              <path d="M 248 68 C 258 67, 268 70, 273 75 C 263 77, 252 75, 248 72 Z"/>
              <!-- Australia -->
              <path d="M 262 82 C 274 79, 288 83, 291 93 C 287 101, 274 103, 263 97 C 258 92, 259 86, 262 82 Z"/>
              <!-- New Zealand -->
              <path d="M 297 96 L 304 94 L 302 106 L 296 104 Z"/>
            </g>
            ${mapPinsSvg}
          </svg>
        </div>
        <div class="map-legend">
          <span class="leg-i"><i class="leg-dot" style="background:${REGIONS.eu.color}"></i>Europe 10</span>
          <span class="leg-i"><i class="leg-dot" style="background:${REGIONS.me.color}"></i>Middle East 4</span>
          <span class="leg-i"><i class="leg-dot" style="background:${REGIONS.af.color}"></i>Africa 5</span>
          <span class="leg-i"><i class="leg-dot" style="background:${REGIONS.as.color}"></i>Asia 7</span>
          <span class="leg-i"><i class="leg-dot" style="background:${REGIONS.na.color}"></i>N. America 4</span>
          <span class="leg-i"><i class="leg-dot" style="background:${REGIONS.la.color}"></i>Latin America 3</span>
          <span class="leg-i"><i class="leg-dot" style="background:${REGIONS.oc.color}"></i>Oceania 2</span>
        </div>
      </div>

      <div class="wire-box">
        <div class="sub-head">
          <span>ALSO ON MONDAY 23 NOVEMBER 2026</span>
          <span class="muted">22 additional verified dispatches</span>
        </div>
        <div class="wire-cols">
          <ul class="wire-list">${renderWireList(MORE_COL_1)}</ul>
          <ul class="wire-list">${renderWireList(MORE_COL_2)}</ul>
        </div>
      </div>
    </section>

    <div class="date-check">
      <strong class="dc-title">DATE CHECK</strong>
      <span><strong>Left out, first reported before Monday:</strong> COP31 collapse (Sun 22), Ukraine warship strike off Libya (Sun 22), House Democrats reaching 258 seats (Sun 22), Khartoum UN drone strike (Sun 22), Kenya–DRC summit (Sun 22), El Chapo Isidro capture &amp; Sparta II strike (Sat 21), Cikande fire start (Sat 21; Monday IDs in #27), Russian missiles in Poland (Fri 20; context for #2), ICJ Rohingya ruling (Thu 19). <strong>Not yet:</strong> Taiwan local elections (Sat 28).</span>
    </div>

    <footer class="footer">
      <div class="footer-key">
        <span class="cert-badge cert-confirmed">CONFIRMED</span><span>2+ outlets</span>
        <span class="cert-badge cert-official">OFFICIAL</span><span>authority on record</span>
        <span class="cert-badge cert-reported">REPORTED</span><span>one outlet</span>
        <span class="cert-badge cert-claim">CLAIM</span><span>one side says</span>
      </div>
      <span>Sources: Reuters, AP, AFP, BBC, Al Jazeera, Guardian, WHO, FIFA, ICC, US Treasury · Original drawings</span>
    </footer>
  </main>
</body>
</html>`;

fs.mkdirSync(SCRATCH_DIR, { recursive: true });
const htmlPath = path.join(SCRATCH_DIR, 'poster_v2.html');
fs.writeFileSync(htmlPath, html, 'utf8');

const fileUrl = pathToFileURL(htmlPath).href;
execFileSync(CHROME_PATH, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1024,1024',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--default-background-color=FBF8F1',
  `--screenshot=${OUT_IMAGE}`,
  fileUrl
], { stdio: 'inherit' });

const stat = fs.statSync(OUT_IMAGE);
console.log(`Rendered ${OUT_IMAGE} (${stat.size} bytes)`);
