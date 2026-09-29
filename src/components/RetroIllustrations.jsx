import React from 'react';

// 1. Daily Practices Drawing SVG
export function DailyPracticesArt() {
  return (
    <div className="w-full h-24 bg-[#fff9f0] rounded-xl border-[1.5px] border-[#18181b] overflow-hidden flex items-center justify-center p-2 relative">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Sketching canvas */}
        <rect x="25" y="15" width="80" height="70" rx="8" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
        <line x1="35" y1="30" x2="95" y2="30" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
        <line x1="35" y1="42" x2="75" y2="42" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 70 Q 55 45, 70 70 T 90 70" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Character head & hand drawing */}
        <circle cx="140" cy="45" r="22" fill="#fed7aa" stroke="#18181b" strokeWidth="2" />
        <path d="M125 40 Q 140 20, 160 38" fill="#18181b" />
        {/* Eyes & smile */}
        <circle cx="134" cy="45" r="2.5" fill="#18181b" />
        <circle cx="146" cy="45" r="2.5" fill="#18181b" />
        <path d="M136 53 Q 140 58, 145 53" fill="none" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" />
        {/* Stylus / Pencil */}
        <rect x="95" y="48" width="30" height="6" rx="2" transform="rotate(-30 95 48)" fill="#fbbf24" stroke="#18181b" strokeWidth="1.5" />
        <polygon points="86,60 92,61 90,56" fill="#18181b" />
        {/* Creative sparks */}
        <path d="M168 25 L173 30 M173 25 L168 30" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 2. The Power of Procreate SVG (capsule/rocket with mail)
export function PowerOfProcreateArt() {
  return (
    <div className="w-full h-24 bg-[#eff6ff] rounded-xl border-[1.5px] border-[#18181b] overflow-hidden flex items-center justify-center p-2 relative">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Floating clouds */}
        <ellipse cx="40" cy="75" rx="30" ry="12" fill="#ffffff" stroke="#18181b" strokeWidth="1.5" />
        <ellipse cx="160" cy="30" rx="25" ry="10" fill="#ffffff" stroke="#18181b" strokeWidth="1.5" />
        
        {/* Yellow flying capsule */}
        <g transform="translate(60, 20) rotate(-5)">
          <rect x="0" y="15" width="70" height="34" rx="17" fill="#fde047" stroke="#18181b" strokeWidth="2" />
          {/* Window & character inside */}
          <circle cx="25" cy="32" r="11" fill="#bae6fd" stroke="#18181b" strokeWidth="1.5" />
          <circle cx="25" cy="32" r="6" fill="#fed7aa" stroke="#18181b" strokeWidth="1" />
          {/* Mail envelope */}
          <rect x="42" y="10" width="22" height="15" rx="2" fill="#ffffff" stroke="#18181b" strokeWidth="1.5" />
          <polyline points="42,10 53,19 64,10" fill="none" stroke="#18181b" strokeWidth="1.5" />
          {/* Flame exhaust */}
          <path d="M-8 32 Q -16 28, -22 32 Q -16 36, -8 32" fill="#f87171" stroke="#18181b" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

// 3. Expressive Sketching SVG (cyclist / swift motion)
export function ExpressiveSketchingArt() {
  return (
    <div className="w-full h-24 bg-[#fdf2f8] rounded-xl border-[1.5px] border-[#18181b] overflow-hidden flex items-center justify-center p-2 relative">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Bicycle wheels */}
        <circle cx="65" cy="65" r="18" fill="#ffffff" stroke="#18181b" strokeWidth="2.5" />
        <circle cx="135" cy="65" r="18" fill="#ffffff" stroke="#18181b" strokeWidth="2.5" />
        <circle cx="65" cy="65" r="4" fill="#18181b" />
        <circle cx="135" cy="65" r="4" fill="#18181b" />
        
        {/* Frame */}
        <polyline points="65,65 95,65 120,45 85,45 65,65" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="95" y1="65" x2="85" y2="40" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
        <line x1="120" y1="45" x2="135" y2="65" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
        
        {/* Rider */}
        <circle cx="95" cy="22" r="9" fill="#fed7aa" stroke="#18181b" strokeWidth="1.5" />
        <path d="M88 22 Q 95 12, 104 20" fill="#18181b" />
        <path d="M95 31 L90 48 L105 52" fill="none" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
        {/* Scarf flying behind */}
        <path d="M92 31 Q 70 25, 55 30" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 4. Drawing Toward Illustration SVG (megaphone & bright ideas)
export function DrawingTowardArt() {
  return (
    <div className="w-full h-24 bg-[#f0fdf4] rounded-xl border-[1.5px] border-[#18181b] overflow-hidden flex items-center justify-center p-2 relative">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Megaphone */}
        <g transform="translate(30, 25)">
          <polygon points="35,15 70,0 70,50 35,35" fill="#38bdf8" stroke="#18181b" strokeWidth="2" strokeLinejoin="round" />
          <rect x="15" y="18" width="20" height="14" rx="3" fill="#fde047" stroke="#18181b" strokeWidth="2" />
          <path d="M25 32 L20 48 L30 48 L32 32" fill="#18181b" />
        </g>
        {/* Sound bursts & creative icons */}
        <path d="M110 30 Q 130 15, 150 25" fill="none" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="130" cy="40" r="10" fill="#fef08a" stroke="#18181b" strokeWidth="1.5" />
        {/* Lightbulb in circle */}
        <circle cx="130" cy="38" r="5" fill="#f59e0b" />
        <rect x="128" y="43" width="4" height="2" fill="#18181b" />
        <path d="M155 55 L165 45 M160 65 L175 60" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 5. Color Theory for Illustrators SVG (piggy bank / color mixing)
export function ColorTheoryArt() {
  return (
    <div className="w-full h-24 bg-[#fffbeb] rounded-xl border-[1.5px] border-[#18181b] overflow-hidden flex items-center justify-center p-2 relative">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Piggy Bank body */}
        <ellipse cx="100" cy="55" rx="36" ry="26" fill="#f472b6" stroke="#18181b" strokeWidth="2" />
        {/* Snout */}
        <ellipse cx="138" cy="55" rx="9" ry="13" fill="#fb7185" stroke="#18181b" strokeWidth="1.5" />
        <circle cx="136" cy="52" r="2" fill="#18181b" />
        <circle cx="136" cy="58" r="2" fill="#18181b" />
        {/* Eye & Ear */}
        <circle cx="120" cy="44" r="3" fill="#18181b" />
        <polygon points="105,32 118,20 120,33" fill="#f43f5e" stroke="#18181b" strokeWidth="1.5" />
        {/* Feet */}
        <rect x="78" y="76" width="10" height="10" rx="3" fill="#fb7185" stroke="#18181b" strokeWidth="1.5" />
        <rect x="110" y="76" width="10" height="10" rx="3" fill="#fb7185" stroke="#18181b" strokeWidth="1.5" />
        {/* Color Coins dropping in slot */}
        <ellipse cx="70" cy="25" rx="9" ry="9" fill="#38bdf8" stroke="#18181b" strokeWidth="1.5" />
        <ellipse cx="92" cy="18" rx="9" ry="9" fill="#facc15" stroke="#18181b" strokeWidth="1.5" />
        <ellipse cx="100" cy="31" rx="8" ry="4" fill="#18181b" />
      </svg>
    </div>
  );
}

// 6. Illustrations to Life SVG (person reading book with plants)
export function IllustrationsToLifeArt() {
  return (
    <div className="w-full h-24 bg-[#faf5ff] rounded-xl border-[1.5px] border-[#18181b] overflow-hidden flex items-center justify-center p-2 relative">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Stack of books */}
        <rect x="30" y="65" width="55" height="12" rx="2" fill="#38bdf8" stroke="#18181b" strokeWidth="1.5" />
        <rect x="35" y="53" width="48" height="12" rx="2" fill="#fde047" stroke="#18181b" strokeWidth="1.5" />
        <rect x="40" y="41" width="40" height="12" rx="2" fill="#f43f5e" stroke="#18181b" strokeWidth="1.5" />
        
        {/* Person leaning and reading */}
        <circle cx="130" cy="30" r="14" fill="#fed7aa" stroke="#18181b" strokeWidth="1.5" />
        <path d="M120 28 Q 130 14, 142 24" fill="#18181b" />
        {/* Glasses */}
        <rect x="122" y="28" width="7" height="6" rx="1" fill="none" stroke="#18181b" strokeWidth="1" />
        <rect x="131" y="28" width="7" height="6" rx="1" fill="none" stroke="#18181b" strokeWidth="1" />
        {/* Body & Open Book */}
        <path d="M115 50 L145 50 L140 80 L120 80 Z" fill="#818cf8" stroke="#18181b" strokeWidth="1.5" />
        <polygon points="105,58 125,50 145,58 125,66" fill="#ffffff" stroke="#18181b" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// Background yellow ribbon decorative doodles
export function RetroRibbonDoodles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Top Left Yellow Curved Ribbon */}
      <svg
        className="absolute -top-12 -left-16 w-[420px] h-[340px] opacity-90"
        viewBox="0 0 400 300"
        fill="none"
      >
        <path
          d="M-20,120 C80,110 160,180 220,140 C280,100 320,40 370,10"
          stroke="#f59e0b"
          strokeWidth="38"
          strokeLinecap="round"
        />
        {/* Subtle pale yellow stroke shadow */}
        <path
          d="M-10,130 C90,120 170,190 230,150"
          stroke="#fbbf24"
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom Right Yellow Looped Ribbon */}
      <svg
        className="absolute -bottom-16 -right-16 w-[480px] h-[400px] opacity-95"
        viewBox="0 0 450 350"
        fill="none"
      >
        {/* Expressive circular loop as in the image */}
        <path
          d="M120,320 C180,330 290,360 360,280 C430,200 370,90 280,100 C190,110 170,220 220,290 C260,350 380,360 450,290"
          stroke="#f59e0b"
          strokeWidth="42"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M190,295 C230,350 330,350 390,280"
          stroke="#fcd34d"
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>

      {/* Organic light grey brush marks */}
      <svg
        className="absolute top-1/4 right-8 w-64 h-32 opacity-25"
        viewBox="0 0 200 100"
        fill="none"
      >
        <path
          d="M10,50 Q 80,20 180,60"
          stroke="#a1a1aa"
          strokeWidth="18"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute bottom-1/3 left-10 w-56 h-28 opacity-25"
        viewBox="0 0 200 100"
        fill="none"
      >
        <path
          d="M20,60 Q 90,40 180,50"
          stroke="#a1a1aa"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
