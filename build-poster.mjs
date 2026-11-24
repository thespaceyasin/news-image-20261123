import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SCRATCH_DIR = process.env.POSTER_SCRATCH_DIR
  ?? 'C:\\Users\\ACER\\.gemini\\antigravity\\brain\\ab9c3a9c-e1a2-461c-bce3-444b83b8a4c9\\scratch';
const OUT_IMAGE = process.env.POSTER_OUT ?? path.resolve('entry.png');
const CHROME_PATH = process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const HERO_STORIES = [
  {
    kicker: 'MARKETS · UNITED STATES',
    accent: '#0E5A3E',
    accentSoft: '#E3F3EC',
    badge: '+31% · +$1T',
    headline: 'Nvidia Reinstates CEO Jensen Huang',
    summary: 'Board unanimously restores CEO 11 days after exit; Nasdaq jumps 6.5%, S&P +4.7%, Dow +1,448 pts.',
    art: `
      <svg viewBox="0 0 240 108" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gMkt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0A3526"/>
            <stop offset="100%" stop-color="#146C4C"/>
          </linearGradient>
          <linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#34D399" stop-opacity="0.58"/>
            <stop offset="100%" stop-color="#34D399" stop-opacity="0.04"/>
          </linearGradient>
        </defs>
        <rect width="240" height="108" fill="url(#gMkt)"/>
        <g stroke="#2B7A5D" stroke-width="0.7" opacity="0.5">
          <line x1="0" y1="27" x2="240" y2="27"/>
          <line x1="0" y1="54" x2="240" y2="54"/>
          <line x1="0" y1="81" x2="240" y2="81"/>
          <line x1="60" y1="0" x2="60" y2="108"/>
          <line x1="120" y1="0" x2="120" y2="108"/>
          <line x1="180" y1="0" x2="180" y2="108"/>
        </g>
        <!-- GPU Chip silhouette on left -->
        <g transform="translate(14,18)">
          <rect x="6" y="6" width="46" height="46" rx="4" fill="#07281D" stroke="#6EE7B7" stroke-width="1.6"/>
          <rect x="14" y="14" width="30" height="30" rx="2" fill="#10B981" fill-opacity="0.28" stroke="#A7F3D0" stroke-width="1"/>
          <rect x="21" y="21" width="16" height="16" rx="1.5" fill="#34D399"/>
          <g stroke="#6EE7B7" stroke-width="1.4">
            <line x1="16" y1="0" x2="16" y2="6"/><line x1="25" y1="0" x2="25" y2="6"/><line x1="34" y1="0" x2="34" y2="6"/><line x1="42" y1="0" x2="42" y2="6"/>
            <line x1="16" y1="52" x2="16" y2="58"/><line x1="25" y1="52" x2="25" y2="58"/><line x1="34" y1="52" x2="34" y2="58"/><line x1="42" y1="52" x2="42" y2="58"/>
            <line x1="0" y1="16" x2="6" y2="16"/><line x1="0" y1="25" x2="6" y2="25"/><line x1="0" y1="34" x2="6" y2="34"/><line x1="0" y1="42" x2="6" y2="42"/>
            <line x1="52" y1="16" x2="58" y2="16"/><line x1="52" y1="25" x2="58" y2="25"/><line x1="52" y1="34" x2="58" y2="34"/><line x1="52" y1="42" x2="58" y2="42"/>
          </g>
        </g>
        <!-- Rebound curve routed cleanly below the top-right badge -->
        <path d="M 74 82 L 96 85 L 116 88 L 134 80 L 148 64 L 166 44 L 188 35 L 222 30 L 222 108 L 74 108 Z" fill="url(#gArea)"/>
        <polyline points="74,82 96,85 116,88 134,80 148,64 166,44 188,35 222,30" fill="none" stroke="#6EE7B7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="116" cy="88" r="3" fill="#FCA5A5"/>
        <circle cx="222" cy="30" r="4.5" fill="#A7F3D0" stroke="#064E3B" stroke-width="1.5"/>
        <path d="M 192 56 L 214 38 M 214 38 L 204 38 M 214 38 L 214 48" stroke="#FDE68A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <rect x="0" y="88" width="240" height="20" fill="#062319" fill-opacity="0.72"/>
        <text x="10" y="101" font-family="Segoe UI, Arial, sans-serif" font-size="8.8" font-weight="700" fill="#D1FAE5">NASDAQ +6.5% · S&amp;P +4.7% · DOW +1,448</text>
      </svg>`
  },
  {
    kicker: 'EUROPE · NATO & UKRAINE',
    accent: '#1B3B6F',
    accentSoft: '#E4ECF7',
    badge: 'AWACS · 11 DEAD',
    headline: 'NATO Meets on Poland; Dymer Toll 11',
    summary: 'Emergency Brussels talks after Kh-101 debris hits 3 Polish sites; Kyiv-area rubble rescue concludes.',
    art: `
      <svg viewBox="0 0 240 108" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gNato" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0F2347"/>
            <stop offset="100%" stop-color="#224D8F"/>
          </linearGradient>
        </defs>
        <rect width="240" height="108" fill="url(#gNato)"/>
        <g transform="translate(56,50)" fill="none" stroke="#60A5FA" stroke-opacity="0.48">
          <circle cx="0" cy="0" r="14" stroke-width="1"/>
          <circle cx="0" cy="0" r="27" stroke-width="1" stroke-dasharray="3 2"/>
          <circle cx="0" cy="0" r="40" stroke-width="1.1"/>
          <path d="M 0 0 L 26 -30 A 40 40 0 0 1 38 10 Z" fill="#93C5FD" fill-opacity="0.24" stroke="none"/>
          <line x1="-42" y1="0" x2="42" y2="0" stroke-width="0.7"/>
          <line x1="0" y1="-42" x2="0" y2="42" stroke-width="0.7"/>
        </g>
        <g transform="translate(36,20)" fill="#F8FAFC">
          <path d="M 2 14 L 18 11 L 24 4 L 27 4 L 24 11 L 34 11 L 38 7 L 40 7 L 38 13 L 34 14 L 24 15 L 27 22 L 24 22 L 18 15 Z"/>
          <ellipse cx="18" cy="9" rx="7" ry="2.2" fill="#FDE047"/>
        </g>
        <path d="M 122 8 Q 128 48 118 88" stroke="#F87171" stroke-width="2" stroke-dasharray="4 3" fill="none"/>
        <g fill="#EF4444" stroke="#FEF2F2" stroke-width="1">
          <circle cx="105" cy="42" r="3.4"/>
          <circle cx="111" cy="57" r="3.4"/>
          <circle cx="102" cy="72" r="3.4"/>
        </g>
        <g transform="translate(142,24)">
          <rect x="8" y="10" width="66" height="52" fill="#0B172E" stroke="#93C5FD" stroke-width="1.2"/>
          <path d="M 46 10 L 62 10 L 74 22 L 74 30 L 54 30 L 46 20 Z" fill="#EF4444" fill-opacity="0.82"/>
          <g fill="#FBBF24" opacity="0.9">
            <rect x="15" y="18" width="7" height="7"/><rect x="26" y="18" width="7" height="7"/><rect x="37" y="18" width="7" height="7"/>
            <rect x="15" y="30" width="7" height="7"/><rect x="26" y="30" width="7" height="7"/><rect x="37" y="30" width="7" height="7"/><rect x="50" y="30" width="7" height="7"/>
            <rect x="15" y="42" width="7" height="7"/><rect x="26" y="42" width="7" height="7"/><rect x="37" y="42" width="7" height="7"/><rect x="50" y="42" width="7" height="7"/>
          </g>
        </g>
        <rect x="0" y="88" width="240" height="20" fill="#08142B" fill-opacity="0.72"/>
        <text x="10" y="101" font-family="Segoe UI, Arial, sans-serif" font-size="8.8" font-weight="700" fill="#DBEAFE">POLAND AIRSPACE · DYMER RESCUE</text>
      </svg>`
  },
  {
    kicker: 'UKRAINE · LIBYA',
    accent: '#0E5569',
    accentSoft: '#E2F2F6',
    badge: 'CORVETTE SUNK',
    headline: 'Ukraine Sinks Russian Warship off Libya',
    summary: 'Zelenskyy confirms 7 naval drones sank Russian corvette Merkury & Ka-27; E. Libya files UN complaint.',
    art: `
      <svg viewBox="0 0 240 108" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gSea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#092E3E"/>
            <stop offset="56%" stop-color="#115167"/>
            <stop offset="100%" stop-color="#072835"/>
          </linearGradient>
        </defs>
        <rect width="240" height="108" fill="url(#gSea)"/>
        <path d="M 0 56 L 240 56" stroke="#38BDF8" stroke-opacity="0.38" stroke-width="1"/>
        <g stroke="#7DD3FC" stroke-opacity="0.45" stroke-width="1.3" fill="none">
          <path d="M 16 56 L 16 28 L 42 18 L 42 32"/>
          <line x1="16" y1="32" x2="42" y2="24"/>
          <rect x="52" y="42" width="22" height="14" fill="#0D3C4E" stroke="none"/>
        </g>
        <g transform="translate(116,40) rotate(14)">
          <path d="M 4 18 L 88 18 L 98 8 L 76 8 L 70 0 L 42 0 L 36 8 L 12 8 Z" fill="#1E293B" stroke="#E2E8F0" stroke-width="1.3"/>
          <rect x="46" y="-8" width="14" height="8" fill="#334155" stroke="#E2E8F0" stroke-width="1"/>
          <line x1="53" y1="-8" x2="53" y2="-16" stroke="#E2E8F0" stroke-width="1.3"/>
        </g>
        <path d="M 155 43 C 145 27, 152 13, 167 11 C 178 4, 195 10, 194 23 C 204 27, 200 41, 186 45 Z" fill="#F97316" fill-opacity="0.9"/>
        <path d="M 164 41 C 159 31, 164 22, 173 21 C 179 16, 188 20, 187 29 Z" fill="#FDE047"/>
        <g stroke="#38BDF8" stroke-width="1.7" stroke-linecap="round">
          <line x1="20" y1="70" x2="96" y2="63"/><line x1="26" y1="76" x2="104" y2="68"/><line x1="34" y1="82" x2="112" y2="73"/>
          <line x1="14" y1="64" x2="88" y2="59"/><line x1="46" y1="86" x2="120" y2="77"/>
        </g>
        <g fill="#FEF08A">
          <circle cx="98" cy="63" r="2.2"/><circle cx="106" cy="68" r="2.2"/><circle cx="114" cy="73" r="2.2"/>
          <circle cx="90" cy="59" r="2.2"/><circle cx="122" cy="77" r="2.2"/>
        </g>
        <rect x="0" y="88" width="240" height="20" fill="#06212C" fill-opacity="0.72"/>
        <text x="10" y="101" font-family="Segoe UI, Arial, sans-serif" font-size="8.8" font-weight="700" fill="#BAE6FD">BENGHAZI HARBOR · 7 NAVAL DRONES</text>
      </svg>`
  },
  {
    kicker: 'CLIMATE · GLOBAL',
    accent: '#9E3219',
    accentSoft: '#FCEAE5',
    badge: 'NO DEAL',
    headline: 'COP31 Closes Without a Climate Pact',
    summary: '190+ nations deadlock on fossil-fuel exit in Antalya (1st collapse since 2009); 35% power pledge holds.',
    art: `
      <svg viewBox="0 0 240 108" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gCop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#5B1B0D"/>
            <stop offset="100%" stop-color="#9E3219"/>
          </linearGradient>
        </defs>
        <rect width="240" height="108" fill="url(#gCop)"/>
        <circle cx="72" cy="46" r="36" fill="#F97316" fill-opacity="0.22"/>
        <g transform="translate(72,46)">
          <circle cx="0" cy="0" r="27" fill="#0F4C5C" stroke="#FED7AA" stroke-width="1.6"/>
          <path d="M -17 -13 C -9 -17, 2 -11, -2 -2 C -6 6, -17 7, -19 -4 Z" fill="#84A98C"/>
          <path d="M 6 -15 C 17 -13, 22 0, 13 13 C 6 19, 0 11, 4 2 Z" fill="#84A98C"/>
          <polyline points="-9,-26 -2,-9 7,-2 -4,11 6,26" fill="none" stroke="#FDE047" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g transform="translate(142,16)">
          <rect x="6" y="34" width="68" height="33" rx="4" fill="#3B0D06" stroke="#FCA5A5" stroke-width="1.2"/>
          <text x="40" y="48" text-anchor="middle" font-family="Georgia, serif" font-size="11" font-weight="700" fill="#FECACA">COP31</text>
          <text x="40" y="60" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="8.5" font-weight="700" fill="#FDE047">DEADLOCK</text>
          <circle cx="40" cy="14" r="11" fill="#DC2626" stroke="#FEF2F2" stroke-width="1.4"/>
          <path d="M 35 9 L 45 19 M 45 9 L 35 19" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
        </g>
        <rect x="0" y="88" width="240" height="20" fill="#3B0D06" fill-opacity="0.72"/>
        <text x="10" y="101" font-family="Segoe UI, Arial, sans-serif" font-size="8.8" font-weight="700" fill="#FED7AA">ANTALYA · 190+ NATIONS SPLIT</text>
      </svg>`
  }
];

const ICONS = {
  bank: `<svg viewBox="0 0 18 18"><path d="M9 2L2 6h14L9 2zM3 7v6h2V7H3zm5 0v6h2V7H8zm5 0v6h2V7h-2zM2 14v2h14v-2H2z" fill="currentColor"/></svg>`,
  ship: `<svg viewBox="0 0 18 18"><path d="M3 11l1.5 3.5h9L15 11H3zm2-5h8v4H5V6zm3-3h2v3H8V3zM2 15.5c2 1 4-1 7 0s5 1 7 0" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>`,
  plane: `<svg viewBox="0 0 18 18"><path d="M16 9l-5-1.5V3.5a1 1 0 0 0-2 0v4L4 9v1.5l5-1v3.5l-2 1.5V16l3-1 3 1v-1.5l-2-1.5V9.5l5 1V9z" fill="currentColor"/><line x1="2" y1="2" x2="16" y2="16" stroke="#DC2626" stroke-width="2"/></svg>`,
  dove: `<svg viewBox="0 0 18 18"><path d="M14.5 4.5c-1.5 0-2.8.8-3.5 2-.9-1.7-2.7-2.8-4.8-2.8-1 0-1.9.3-2.7.7 1.3.7 2.2 2 2.2 3.6 0 2.1-1.6 3.8-3.7 4 1.3 1.3 3.1 2.1 5.1 2.1 3.7 0 6.8-2.9 7-6.6.7-.3 1.4-.9 1.9-1.6-.8.2-1.6.1-2-.4z" fill="currentColor"/></svg>`,
  ballot: `<svg viewBox="0 0 18 18"><rect x="3" y="8" width="12" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 8V3h6v5M7 5.5l1.3 1.3L11 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  capitol: `<svg viewBox="0 0 18 18"><path d="M9 2v2m-4 4a4 4 0 0 1 8 0v2H5V8zm-2 2h12v5H3v-5zM2 15h14v1.5H2z" fill="currentColor"/></svg>`,
  siren: `<svg viewBox="0 0 18 18"><path d="M5 12V8a4 4 0 0 1 8 0v4H5zm-2 0h12v2.5H3V12zM9 2v1.5m4.5.5l-1 1M4.5 4l1 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  gavel: `<svg viewBox="0 0 18 18"><path d="M4 14h10v2H4v-2zm6.8-9.8l3 3-1.8 1.8-3-3 1.8-1.8zM7.8 7.2l2.4 2.4-4.5 4.5-2.4-2.4 4.5-4.5z" fill="currentColor"/></svg>`,
  train: `<svg viewBox="0 0 18 18"><rect x="4" y="2.5" width="10" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6.8" cy="10" r="1" fill="currentColor"/><circle cx="11.2" cy="10" r="1" fill="currentColor"/><path d="M5 6.5h8M6 12.5l-2 3m8-3l2 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  storm: `<svg viewBox="0 0 18 18"><path d="M5 11a3 3 0 0 1 .4-5.9A4 4 0 0 1 13 6a2.5 2.5 0 0 1-.2 5H5zm4.5 0L7.5 14h2.2l-1 3 3.3-4H9.8l.7-2z" fill="currentColor"/></svg>`,
  tower: `<svg viewBox="0 0 18 18"><path d="M6 16V4l3-2 3 2v12H6zm2-9h2v2H8V7zm0 4h2v2H8v-2z" fill="currentColor"/><path d="M13 4l2.5-1.5M13 7l3 0" stroke="#DC2626" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  alert: `<svg viewBox="0 0 18 18"><path d="M9 2L1.8 15h14.4L9 2zm0 4.8v4.2m0 1.8v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  tanker: `<svg viewBox="0 0 18 18"><path d="M2 11h14l-1.5 3.5h-11L2 11zm2-4h7v4H4V7zm8 1h3v3h-3V8z" fill="currentColor"/><circle cx="13.5" cy="4.5" r="2" fill="#DC2626"/></svg>`,
  hazard: `<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 5.5v4m0 2.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  drone: `<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="2.2" fill="currentColor"/><path d="M3 5l4 3m8-3l-4 3M3 13l4-3m8 3l-4-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="3" cy="5" r="1.4" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="15" cy="5" r="1.4" fill="none" stroke="currentColor" stroke-width="1.1"/></svg>`,
  handshake: `<svg viewBox="0 0 18 18"><path d="M2 8l3-3 4 2 4-2 3 3-3 4-4-2-4 2-3-4z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  shield: `<svg viewBox="0 0 18 18"><path d="M9 2L3.5 4.5v4.2c0 3.6 2.3 6.3 5.5 7.3 3.2-1 5.5-3.7 5.5-7.3V4.5L9 2z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  water: `<svg viewBox="0 0 18 18"><path d="M9 2.5C9 2.5 4 8 4 11.2a5 5 0 0 0 10 0C14 8 9 2.5 9 2.5z" fill="currentColor"/></svg>`,
  medical: `<svg viewBox="0 0 18 18"><rect x="3" y="3" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 5.8v6.4M5.8 9h6.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  chartDown: `<svg viewBox="0 0 18 18"><polyline points="2,5 7,9 10,7 16,13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><polyline points="12,13 16,13 16,9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  scale: `<svg viewBox="0 0 18 18"><path d="M9 2.5v13M4 15.5h10M4 5.5h10M4 5.5L2.2 10h3.6L4 5.5zm10 0L12.2 10h3.6L14 5.5z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none"/></svg>`,
  chip: `<svg viewBox="0 0 18 18"><rect x="5" y="5" width="8" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 2v3m4-3v3M7 13v3m4-3v3M2 7h3m-3 4h3m8-4h3m-3 4h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  globe: `<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="6.5" fill="none" stroke="currentColor" stroke-width="1.4"/><ellipse cx="9" cy="9" rx="3" ry="6.5" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="2.5" y1="9" x2="15.5" y2="9" stroke="currentColor" stroke-width="1.2"/></svg>`,
  bug: `<svg viewBox="0 0 18 18"><rect x="3" y="3.5" width="12" height="9" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 15h5M9 12.5V15M9 6v2.5m0 1.8v.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  moon: `<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="5.5" fill="currentColor"/><circle cx="11.2" cy="7.5" r="4" fill="#F7F3EA" opacity="0.28"/></svg>`,
  soccer: `<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="9,6 11.8,8 10.7,11.3 7.3,11.3 6.2,8" fill="currentColor"/></svg>`,
  rugby: `<svg viewBox="0 0 18 18"><ellipse cx="9" cy="9" rx="6.5" ry="4" transform="rotate(-30 9 9)" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6.5" y1="10.5" x2="11.5" y2="7.5" stroke="currentColor" stroke-width="1.3"/></svg>`,
  trophy: `<svg viewBox="0 0 18 18"><path d="M5 3h8v4a4 4 0 0 1-8 0V3zm0 1.5H3a1.5 1.5 0 0 0 0 3h2m8-3h2a1.5 1.5 0 0 1 0 3h-2M9 11v3.5M6.5 15h5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`
};

const SECTIONS = [
  {
    title: 'EUROPE',
    count: '5 REPORTS',
    color: '#1B3B6F',
    items: [
      { icon: 'bank', lead: 'EU 22nd Sanctions:', text: 'Von der Leyen proposes cutting ~60 Russian banks from SWIFT, plus crypto & athlete bans.' },
      { icon: 'ship', lead: 'Gulf of Finland:', text: 'Drones spark fire on sanctioned Russian cargo ship Sparta II; 16 crew evacuated.' },
      { icon: 'plane', lead: 'Belgium Strike:', text: 'Nationwide ATC strike grounds Brussels & Charleroi flights; 50,000+ travelers hit.' },
      { icon: 'dove', lead: 'Germany / Peace:', text: 'Chancellor Merz & NATO’s Rutte back 4-party Ukraine talks, possibly in Abu Dhabi.' },
      { icon: 'ballot', lead: 'United Kingdom:', text: 'PM Andy Burnham tells Parliament rejoining EU without a referendum is "unthinkable."' }
    ]
  },
  {
    title: 'AMERICAS',
    count: '5 REPORTS',
    color: '#0E5A3E',
    items: [
      { icon: 'capitol', lead: 'US House:', text: 'Democrats clinch 258 seats (biggest majority since 1992) after NC concession.' },
      { icon: 'siren', lead: 'Mexico / Sinaloa:', text: 'Forces arrest cartel kingpin "El Chapo Isidro" with US drone aid; deadly clashes follow.' },
      { icon: 'gavel', lead: 'US Justice Dept:', text: 'Court filing admits a US citizen was mistakenly deported to Mexico in enforcement sweep.' },
      { icon: 'train', lead: 'Canada Rail:', text: 'Ottawa defends fast-track expropriation powers for Toronto–Quebec high-speed rail.' },
      { icon: 'storm', lead: 'South America:', text: 'IOM aids 20,000 displaced by S. Brazil storm; Peru marches against femicide.' }
    ]
  },
  {
    title: 'MIDDLE EAST',
    count: '5 REPORTS',
    color: '#9E3219',
    items: [
      { icon: 'tower', lead: 'Saudi Arabia:', text: 'Houthi strike hits Riyadh’s KAFD PIF Tower, injuring at least 11; GCC condemns attack.' },
      { icon: 'alert', lead: 'Iran & US:', text: 'Trump warns strikes could resume after New Year without deal; Tehran claims $290B award.' },
      { icon: 'tanker', lead: 'Strait of Hormuz:', text: 'Projectile strikes outbound oil tanker near Oman amid heightened Gulf naval tensions.' },
      { icon: 'hazard', lead: 'Gaza Report:', text: 'Oxfam & CEOBS warn conflict left widespread toxic debris; UN cites 77-yr development loss.' },
      { icon: 'dove', lead: 'Yemen & Talks:', text: 'Airstrikes hit Hodeidah telecom & Lahj; US Sec. Rubio meets Qatari PM in Washington.' }
    ]
  },
  {
    title: 'AFRICA',
    count: '5 REPORTS',
    color: '#8C5311',
    items: [
      { icon: 'drone', lead: 'Sudan:', text: 'Drone strikes hit Khartoum & a UN compound, killing civilians; army blames RSF.' },
      { icon: 'handshake', lead: 'Kenya & DRC:', text: 'Presidents Ruto & Tshisekedi agree at Oyo summit to restore diplomatic ties & envoys.' },
      { icon: 'shield', lead: 'Nigeria:', text: 'Niger State land clashes leave dozens dead; Tinubu urges decriminalizing attempted suicide.' },
      { icon: 'water', lead: 'South Africa:', text: 'Gauteng sets Level 2 water curbs amid El Niño; govt unveils R100M AI fund & sat plan.' },
      { icon: 'medical', lead: 'Pan-Africa:', text: 'Addis Ababa opens 5th CPHIA health summit; CREA finds 9 oil exporters gained $21.6B.' }
    ]
  },
  {
    title: 'ASIA & OCEANIA',
    count: '5 REPORTS',
    color: '#632973',
    items: [
      { icon: 'chartDown', lead: 'Asia Markets:', text: 'Kospi slides >3% on AI-bubble jitters before US rebound; China eases margin rules.' },
      { icon: 'scale', lead: 'Myanmar / ICJ:', text: 'UK recognizes Rohingya genocide in Commons; Australia, Canada & UN back ICJ ruling.' },
      { icon: 'chip', lead: 'SE Asia Chips:', text: 'US BIS adds 7 Singapore, Malaysia & Thailand firms to Entity List over AI-chip flows.' },
      { icon: 'globe', lead: 'South Asia:', text: 'Ex-PM Hasina plans Dec 16 Bangladesh return; India tests all major bottled water brands.' },
      { icon: 'ship', lead: 'Pacific & Trade:', text: 'China hosts Dutch FM Berendsen; Saudi–Japan crude pact; Pacific King Tides alerts.' }
    ]
  },
  {
    title: 'TECH, SCIENCE & SPORT',
    count: '5 REPORTS',
    color: '#1F5666',
    items: [
      { icon: 'bug', lead: 'Microsoft:', text: 'Internal memos declare "Code Red" security & engineering overhaul after 24-hr cloud outage.' },
      { icon: 'moon', lead: 'Space & Sky:', text: 'ISS crew runs microgravity DNA & stem-cell tests as November’s Beaver Supermoon peaks.' },
      { icon: 'soccer', lead: 'Premier League:', text: 'Brentford rout Everton 4–0 in Moyes’s record 593rd game; captain Tarkowski sent off.' },
      { icon: 'rugby', lead: 'Rugby Union:', text: 'New Zealand All Blacks reel after record 37–12 loss to England; coach admits "miles off."' },
      { icon: 'trophy', lead: 'Global Sport:', text: 'Copa América 2028 nears US return; Brazil’s Diogo Moreira wins MotoGP Rookie of the Year.' }
    ]
  }
];

// Map pins in 1000x102 natural-earth equirectangular SVG coordinate space
const MAP_PINS = [
  // Americas (#0E5A3E)
  { x: 162, y: 36, c: '#0E5A3E', hero: true },  // US Silicon Valley / West
  { x: 258, y: 36, c: '#0E5A3E' },              // Washington / US East
  { x: 266, y: 29, c: '#0E5A3E' },              // Ottawa / Toronto-Quebec
  { x: 186, y: 47, c: '#0E5A3E' },              // Sinaloa, Mexico
  { x: 260, y: 69, c: '#0E5A3E' },              // Peru
  { x: 318, y: 80, c: '#0E5A3E' },              // Southern Brazil
  // Europe (#1B3B6F)
  { x: 462, y: 25, c: '#1B3B6F' },              // UK
  { x: 484, y: 26, c: '#1B3B6F' },              // Brussels / Belgium
  { x: 500, y: 26, c: '#1B3B6F' },              // Berlin
  { x: 520, y: 27, c: '#1B3B6F', hero: true },  // SE Poland
  { x: 530, y: 18, c: '#1B3B6F' },              // Gulf of Finland
  { x: 540, y: 29, c: '#1B3B6F', hero: true },  // Dymer / Kyiv
  // Middle East (#9E3219)
  { x: 542, y: 37, c: '#9E3219', hero: true },  // Antalya COP31
  { x: 554, y: 42, c: '#9E3219' },              // Gaza
  { x: 576, y: 48, c: '#9E3219' },              // Riyadh
  { x: 598, y: 47, c: '#9E3219' },              // Strait of Hormuz / Iran
  { x: 575, y: 55, c: '#9E3219' },              // Yemen
  // Africa (#8C5311)
  { x: 518, y: 41, c: '#0E5569', hero: true },  // Benghazi, Libya
  { x: 488, y: 57, c: '#8C5311' },              // Nigeria
  { x: 550, y: 54, c: '#8C5311' },              // Khartoum, Sudan
  { x: 564, y: 60, c: '#8C5311' },              // Addis Ababa
  { x: 545, y: 65, c: '#8C5311' },              // Kenya / DRC
  { x: 530, y: 83, c: '#8C5311' },              // South Africa
  // Asia & Oceania (#632973)
  { x: 676, y: 49, c: '#632973' },              // India
  { x: 702, y: 48, c: '#632973' },              // Bangladesh
  { x: 722, y: 51, c: '#632973' },              // Myanmar
  { x: 746, y: 61, c: '#632973' },              // SE Asia (SG/MY/TH)
  { x: 774, y: 39, c: '#632973' },              // China
  { x: 816, y: 38, c: '#632973' },              // South Korea / Japan
  { x: 846, y: 78, c: '#632973' },              // Australia
  { x: 908, y: 86, c: '#632973' }               // New Zealand
];

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const heroHtml = HERO_STORIES.map((h) => `
  <article class="hero-card" style="border-top: 3px solid ${h.accent}">
    <div class="hero-art">
      ${h.art}
      <span class="hero-badge" style="background:${h.accent}">${escapeHtml(h.badge)}</span>
    </div>
    <div class="hero-body">
      <div class="hero-kicker" style="color:${h.accent}">${escapeHtml(h.kicker)}</div>
      <h2 class="hero-title">${escapeHtml(h.headline)}</h2>
      <p class="hero-summary">${escapeHtml(h.summary)}</p>
    </div>
  </article>
`).join('');

const sectionsHtml = SECTIONS.map((sec) => `
  <section class="sec-card">
    <header class="sec-head" style="background:${sec.color}">
      <span class="sec-title">${escapeHtml(sec.title)}</span>
      <span class="sec-count">${escapeHtml(sec.count)}</span>
    </header>
    <ul class="sec-list">
      ${sec.items.map((it) => `
        <li class="sec-item">
          <span class="item-ico" style="color:${sec.color}; background:${sec.color}14; border-color:${sec.color}30">
            ${ICONS[it.icon]}
          </span>
          <div class="item-copy">
            <strong>${escapeHtml(it.lead)}</strong> ${escapeHtml(it.text)}
          </div>
        </li>
      `).join('')}
    </ul>
  </section>
`).join('');

const pinsSvg = MAP_PINS.map((p) => p.hero
  ? `<g><circle cx="${p.x}" cy="${p.y}" r="6" fill="${p.c}" fill-opacity="0.28"/><circle cx="${p.x}" cy="${p.y}" r="3.4" fill="${p.c}" stroke="#FFFFFF" stroke-width="1.2"/></g>`
  : `<circle cx="${p.x}" cy="${p.y}" r="2.6" fill="${p.c}" stroke="#FFFFFF" stroke-width="0.9"/>`
).join('');

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
    background: #F6F1E6;
    color: #131A26;
    font-family: "Segoe UI", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 0 12px 6px 12px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  /* MASTHEAD */
  .masthead {
    margin: 0 -12px;
    height: 70px;
    background: #0D192B;
    border-top: 4px solid #C62828;
    border-bottom: 3px solid #D4A12A;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  .mast-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .mast-eyebrow {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 2.2px;
    color: #F4C44E;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .mast-date {
    font-family: "Georgia", "Cambria", serif;
    font-size: 31px;
    line-height: 1.05;
    font-weight: 700;
    letter-spacing: 0.7px;
    color: #FFFFFF;
  }
  .mast-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 4px;
  }
  .mast-pill {
    background: #C62828;
    color: #FFFFFF;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.1px;
    padding: 4px 10px;
    border-radius: 3px;
    text-transform: uppercase;
  }
  .mast-sub {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.8px;
    color: #CBD5E1;
  }

  /* HERO GRID */
  .hero-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    height: 214px;
    flex-shrink: 0;
  }
  .hero-card {
    background: #FFFFFF;
    border: 1px solid #D8CEBC;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 2px rgba(13,25,43,0.06);
  }
  .hero-art {
    position: relative;
    height: 106px;
    width: 100%;
    flex-shrink: 0;
    border-bottom: 1px solid #D8CEBC;
  }
  .hero-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    color: #FFFFFF;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.5px;
    padding: 2.5px 6px;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.45);
    box-shadow: 0 1px 3px rgba(0,0,0,0.35);
  }
  .hero-body {
    padding: 7px 9px 7px 9px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    flex: 1;
  }
  .hero-kicker {
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.7px;
    text-transform: uppercase;
  }
  .hero-title {
    font-family: "Georgia", "Cambria", serif;
    font-size: 13.5px;
    line-height: 1.15;
    font-weight: 700;
    color: #0F172A;
  }
  .hero-summary {
    font-size: 10.3px;
    line-height: 1.28;
    color: #2B3544;
  }

  /* MAP BAND */
  .map-band {
    height: 102px;
    background: #E4EEF5;
    border: 1px solid #C6D5E3;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }
  .map-caption {
    position: absolute;
    left: 10px;
    bottom: 5px;
    background: rgba(13, 25, 43, 0.86);
    color: #FFFFFF;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.4px;
    padding: 2px 7px;
    border-radius: 2px;
  }
  .map-legend {
    position: absolute;
    right: 8px;
    bottom: 5px;
    background: rgba(255,255,255,0.9);
    border: 1px solid #CBD5E1;
    padding: 2px 7px;
    border-radius: 2px;
    display: flex;
    gap: 8px;
    font-size: 8.5px;
    font-weight: 700;
    color: #1E293B;
  }
  .leg-dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin-right: 3px;
    vertical-align: middle;
  }

  /* 6 REGIONAL PANELS */
  .sec-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px;
    flex: 1;
    min-height: 0;
  }
  .sec-card {
    background: #FFFDF9;
    border: 1px solid #D8CEBC;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .sec-head {
    height: 23px;
    padding: 0 9px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #FFFFFF;
    flex-shrink: 0;
  }
  .sec-title {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1px;
  }
  .sec-count {
    font-size: 8.8px;
    font-weight: 700;
    letter-spacing: 0.6px;
    opacity: 0.9;
  }
  .sec-list {
    list-style: none;
    padding: 5px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 3px;
  }
  .sec-item {
    display: flex;
    align-items: flex-start;
    gap: 7px;
    padding-bottom: 3.5px;
    border-bottom: 1px solid #EDE6D8;
  }
  .sec-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .item-ico {
    width: 22px;
    height: 22px;
    border-radius: 3px;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    padding: 2.5px;
  }
  .item-ico svg {
    width: 100%;
    height: 100%;
    display: block;
  }
  .item-copy {
    font-size: 10.8px;
    line-height: 1.28;
    color: #232C3B;
  }
  .item-copy strong {
    color: #0D192B;
    font-weight: 700;
  }

  /* FOOTER */
  .footer {
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #CBBFA9;
    padding-top: 2px;
    font-size: 8.8px;
    font-weight: 700;
    letter-spacing: 0.6px;
    color: #4A5568;
    flex-shrink: 0;
  }
</style>
</head>
<body>
  <main class="page">
    <header class="masthead">
      <div class="mast-left">
        <div class="mast-eyebrow">GLOBAL DAILY DISPATCH · WORLD EDITION</div>
        <h1 class="mast-date">MONDAY · 23 NOVEMBER 2026</h1>
      </div>
      <div class="mast-right">
        <div class="mast-pill">THE WORLD'S NEWS IN ONE IMAGE</div>
        <div class="mast-sub">34 VERIFIED REPORTS · 7 REGIONS &amp; BEATS</div>
      </div>
    </header>

    <section class="hero-grid">${heroHtml}</section>

    <section class="map-band">
      <svg viewBox="0 0 1000 102" width="1000" height="102" xmlns="http://www.w3.org/2000/svg">
        <!-- Graticule lines -->
        <g stroke="#CBD9E6" stroke-width="0.8">
          <line x1="0" y1="51" x2="1000" y2="51"/>
          <line x1="0" y1="26" x2="1000" y2="26" stroke-dasharray="3 4"/>
          <line x1="0" y1="76" x2="1000" y2="76" stroke-dasharray="3 4"/>
          <line x1="250" y1="0" x2="250" y2="102" stroke-dasharray="3 4"/>
          <line x1="500" y1="0" x2="500" y2="102"/>
          <line x1="750" y1="0" x2="750" y2="102" stroke-dasharray="3 4"/>
        </g>
        <!-- Refined Natural-Earth-style continent silhouettes -->
        <g fill="#D7CCB7" stroke="#9F9279" stroke-width="0.85" stroke-linejoin="round">
          <!-- North America -->
          <path d="M 96 14 C 125 9, 175 9, 224 12 C 258 14, 286 17, 294 23 C 292 31, 276 34, 266 38 C 254 44, 244 48, 226 48 C 216 49, 212 56, 222 61 L 214 63 C 202 58, 192 52, 180 49 C 166 44, 152 38, 140 28 C 122 25, 102 22, 96 14 Z"/>
          <!-- Greenland -->
          <path d="M 314 5 C 338 3, 366 5, 376 11 C 368 18, 342 19, 322 15 Z"/>
          <!-- South America -->
          <path d="M 244 61 C 266 58, 294 63, 326 70 C 336 74, 336 82, 322 88 C 304 94, 286 99, 270 100 C 262 94, 260 84, 254 74 C 246 69, 240 65, 244 61 Z"/>
          <!-- Europe -->
          <path d="M 454 27 C 466 22, 484 19, 498 12 C 516 9, 540 10, 560 14 L 560 32 C 544 35, 526 35, 512 34 C 498 35, 482 36, 466 34 C 456 33, 450 30, 454 27 Z"/>
          <!-- UK & Ireland -->
          <path d="M 457 20 L 465 19 L 466 28 L 458 28 Z"/>
          <!-- Africa -->
          <path d="M 458 41 C 484 37, 516 38, 546 44 C 558 49, 568 58, 574 63 C 568 72, 556 80, 544 90 C 532 94, 518 90, 510 76 C 500 66, 482 62, 466 56 C 454 51, 452 44, 458 41 Z"/>
          <!-- Madagascar -->
          <path d="M 578 76 L 585 75 L 582 88 L 575 86 Z"/>
          <!-- Asia & Middle East -->
          <path d="M 556 12 C 625 8, 725 9, 828 14 C 864 17, 886 22, 876 28 C 852 30, 834 34, 818 42 C 802 48, 782 51, 766 54 C 752 60, 742 66, 726 60 C 712 55, 696 50, 682 58 C 668 59, 656 50, 634 49 C 618 52, 600 57, 578 58 C 564 56, 554 48, 544 41 C 542 35, 552 33, 556 30 Z"/>
          <!-- Japan -->
          <path d="M 818 30 C 826 29, 832 35, 826 43 L 818 42 Z"/>
          <!-- Maritime SE Asia -->
          <path d="M 738 66 C 756 65, 774 67, 786 70 C 774 74, 752 73, 738 71 Z"/>
          <!-- Australia -->
          <path d="M 806 72 C 832 68, 862 70, 878 79 C 874 88, 854 93, 824 91 C 806 88, 798 79, 806 72 Z"/>
          <!-- New Zealand -->
          <path d="M 902 82 L 912 80 L 910 92 L 901 91 Z"/>
        </g>
        <!-- Region Watermarks -->
        <g font-family="Segoe UI, Arial, sans-serif" font-size="8.2" font-weight="800" fill="#334155" opacity="0.62" letter-spacing="1.2">
          <text x="150" y="25">AMERICAS</text>
          <text x="478" y="10">EUROPE</text>
          <text x="582" y="40">MIDEAST</text>
          <text x="486" y="68">AFRICA</text>
          <text x="688" y="30">ASIA</text>
          <text x="816" y="65">OCEANIA</text>
        </g>
        ${pinsSvg}
      </svg>
      <div class="map-caption">GEOGRAPHIC COVERAGE · 23 NOVEMBER 2026</div>
      <div class="map-legend">
        <span><i class="leg-dot" style="background:#0E5A3E"></i>Americas &amp; Markets</span>
        <span><i class="leg-dot" style="background:#1B3B6F"></i>Europe &amp; NATO</span>
        <span><i class="leg-dot" style="background:#0E5569"></i>Libya Naval</span>
        <span><i class="leg-dot" style="background:#9E3219"></i>COP31 &amp; Mideast</span>
        <span><i class="leg-dot" style="background:#8C5311"></i>Africa</span>
        <span><i class="leg-dot" style="background:#632973"></i>Asia &amp; Oceania</span>
      </div>
    </section>

    <section class="sec-grid">${sectionsHtml}</section>

    <footer class="footer">
      <span>MONDAY, 23 NOVEMBER 2026 · GLOBAL NEWS SUMMARY</span>
      <span>ALL EVENTS REPORTED ON 23 NOV 2026 · 4 LEAD + 30 REGIONAL &amp; BEAT DISPATCHES</span>
    </footer>
  </main>
</body>
</html>`;

fs.mkdirSync(SCRATCH_DIR, { recursive: true });
const htmlPath = path.join(SCRATCH_DIR, 'poster.html');
fs.writeFileSync(htmlPath, html, 'utf8');

const fileUrl = pathToFileURL(htmlPath).href;
execFileSync(CHROME_PATH, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1024,1024',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--default-background-color=F6F1E6',
  `--screenshot=${OUT_IMAGE}`,
  fileUrl
], { stdio: 'inherit' });

const stat = fs.statSync(OUT_IMAGE);
console.log(`Rendered ${OUT_IMAGE} (${stat.size} bytes)`);
