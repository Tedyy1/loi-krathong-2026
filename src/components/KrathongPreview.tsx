import React from 'react';
import { KrathongCustomization } from '../types';

interface KrathongPreviewProps {
  config: KrathongCustomization;
  size?: number; // width in pixels
  className?: string;
  showWaterGlow?: boolean;
}

export const KrathongPreview: React.FC<KrathongPreviewProps> = ({
  config,
  size = 380,
  className = '',
  showWaterGlow = true,
}) => {
  const { base, flower, candle, decorations, isLit } = config;

  // Candle colors
  const candleColorMap = {
    golden: { body: '#F5D58B', top: '#FFEAA7', shadow: '#D4AF37', border: '#B8860B' },
    pink: { body: '#F4BBD0', top: '#FCE4EC', shadow: '#D87093', border: '#C2185B' },
    white: { body: '#FFF6E9', top: '#FFFFFF', shadow: '#E0D6C8', border: '#BDBDBD' },
    lavender: { body: '#C7A9E8', top: '#EDE7F6', shadow: '#9575CD', border: '#7E57C2' },
  };
  const activeCandle = candleColorMap[candle];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size * 0.95 }}
    >
      {/* Background radial glow when lit */}
      {isLit && (
        <div
          className="absolute inset-0 -top-8 rounded-full pointer-events-none transition-all duration-1000 animate-pulse-glow"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 222, 125, 0.45) 0%, rgba(245, 213, 139, 0.2) 40%, rgba(244, 187, 208, 0.08) 65%, transparent 80%)',
            filter: 'blur(14px)',
          }}
        />
      )}

      {/* Main SVG Graphic */}
      <svg
        viewBox="0 0 400 380"
        className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Water reflection gradient */}
          <radialGradient id="waterRippleGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#20264A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#10152B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10152B" stopOpacity="0" />
          </radialGradient>

          {/* Candle glow radial */}
          <radialGradient id="candleGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9E6" stopOpacity="1" />
            <stop offset="25%" stopColor="#FFD166" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FF9F1C" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
          </radialGradient>

          {/* Banana Leaf Gradients */}
          <linearGradient id="bananaLeafDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B6343" />
            <stop offset="60%" stopColor="#4D7C55" />
            <stop offset="100%" stopColor="#2E4F35" />
          </linearGradient>
          <linearGradient id="bananaLeafLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6CA375" />
            <stop offset="50%" stopColor="#587F63" />
            <stop offset="100%" stopColor="#3E6548" />
          </linearGradient>

          {/* Lotus Petal Gradients */}
          <linearGradient id="lotusPetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="35%" stopColor="#F4BBD0" />
            <stop offset="100%" stopColor="#D46A8B" />
          </linearGradient>
          <linearGradient id="lotusPetalDeep" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8BBD0" />
            <stop offset="60%" stopColor="#D46A8B" />
            <stop offset="100%" stopColor="#9C2755" />
          </linearGradient>

          {/* Golden Petal Gradients */}
          <linearGradient id="goldPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E6" />
            <stop offset="40%" stopColor="#F5D58B" />
            <stop offset="85%" stopColor="#C99738" />
            <stop offset="100%" stopColor="#8A6317" />
          </linearGradient>

          {/* Purple Royal Gradients */}
          <linearGradient id="purplePetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="45%" stopColor="#9B72CF" />
            <stop offset="100%" stopColor="#4A2C68" />
          </linearGradient>

          {/* Base Rim Gradient */}
          <linearGradient id="baseRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B37D28" />
            <stop offset="30%" stopColor="#F5D58B" />
            <stop offset="70%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#96671A" />
          </linearGradient>
        </defs>

        {/* 1. Water Ripple & Reflections Base */}
        {showWaterGlow && (
          <g id="water-glow-base" opacity={isLit ? 0.9 : 0.45}>
            <ellipse cx="200" cy="310" rx="170" ry="45" fill="url(#waterRippleGrad)" />
            <ellipse
              cx="200"
              cy="312"
              rx="135"
              ry="32"
              fill="none"
              stroke="#594477"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              opacity="0.6"
            />
            {isLit && (
              <ellipse
                cx="200"
                cy="315"
                rx="90"
                ry="22"
                fill="#FFDE7D"
                opacity="0.25"
                className="animate-pulse"
              />
            )}
          </g>
        )}

        {/* 2. Krathong Foundation Base: Hand-crafted vessel bowl */}
        <g id="krathong-vessel-hull">
          {/* Main Banana Trunk Disc / Foundation */}
          <ellipse cx="200" cy="275" rx="145" ry="46" fill="#2E4F35" stroke="#1D3623" strokeWidth="2" />
          <ellipse cx="200" cy="272" rx="142" ry="42" fill="#3E6548" />

          {/* Golden or Ornamental Braid around the vessel rim */}
          <path
            d="M 58 272 Q 200 325 342 272 Q 200 295 58 272 Z"
            fill="url(#baseRimGrad)"
            opacity="0.9"
          />
          {/* Rim woven detail dots */}
          <g fill="#5D4037" opacity="0.6">
            {[80, 110, 140, 170, 200, 230, 260, 290, 320].map((cx) => (
              <circle key={cx} cx={cx} cy={280 + Math.sin((cx / 400) * Math.PI) * 15} r="2.5" />
            ))}
          </g>
        </g>

        {/* 3. Outer Tier Petals / Krathong Base Style */}
        <g id="krathong-base-petals">
          {base === 'banana-leaf' && (
            // Traditional Folded Banana Leaves (Klip Leb Meu Nang)
            <g id="banana-leaves">
              {/* Outer fan of triangular folded leaves */}
              {[
                { angle: -65, x: 80, y: 245, s: 0.9 },
                { angle: -45, x: 110, y: 260, s: 1 },
                { angle: -25, x: 145, y: 272, s: 1.05 },
                { angle: 0, x: 200, y: 278, s: 1.1 },
                { angle: 25, x: 255, y: 272, s: 1.05 },
                { angle: 45, x: 290, y: 260, s: 1 },
                { angle: 65, x: 320, y: 245, s: 0.9 },
                // Back tier
                { angle: -75, x: 75, y: 220, s: 0.8 },
                { angle: -50, x: 110, y: 228, s: 0.85 },
                { angle: -20, x: 160, y: 235, s: 0.9 },
                { angle: 20, x: 240, y: 235, s: 0.9 },
                { angle: 50, x: 290, y: 228, s: 0.85 },
                { angle: 75, x: 325, y: 220, s: 0.8 },
              ].map((leaf, idx) => (
                <g key={`leaf-${idx}`} transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.angle * 0.4}) scale(${leaf.s})`}>
                  {/* Folded leaf shape */}
                  <path
                    d="M 0 -45 C 22 -20 30 5 0 25 C -30 5 -22 -20 0 -45 Z"
                    fill={idx % 2 === 0 ? "url(#bananaLeafLight)" : "url(#bananaLeafDark)"}
                    stroke="#2E4F35"
                    strokeWidth="1.2"
                  />
                  {/* Central vein */}
                  <line x1="0" y1="-40" x2="0" y2="20" stroke="#87B38D" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                  {/* Side vein chevrons */}
                  <path d="M -12 -15 L 0 -5 L 12 -15 M -15 5 L 0 15 L 15 5" stroke="#466F4F" strokeWidth="1" opacity="0.6" />
                </g>
              ))}
            </g>
          )}

          {base === 'pink-lotus' && (
            // Romantic Pink Lotus Petals
            <g id="lotus-leaves">
              {[
                { angle: -70, x: 75, y: 235, s: 0.9 },
                { angle: -45, x: 110, y: 255, s: 1.0 },
                { angle: -22, x: 150, y: 268, s: 1.08 },
                { angle: 0, x: 200, y: 275, s: 1.15 },
                { angle: 22, x: 250, y: 268, s: 1.08 },
                { angle: 45, x: 290, y: 255, s: 1.0 },
                { angle: 70, x: 325, y: 235, s: 0.9 },
                // Back petals
                { angle: -80, x: 70, y: 210, s: 0.82 },
                { angle: -50, x: 115, y: 222, s: 0.88 },
                { angle: 0, x: 200, y: 230, s: 0.95 },
                { angle: 50, x: 285, y: 222, s: 0.88 },
                { angle: 80, x: 330, y: 210, s: 0.82 },
              ].map((petal, idx) => (
                <g key={`lotus-${idx}`} transform={`translate(${petal.x}, ${petal.y}) rotate(${petal.angle * 0.45}) scale(${petal.s})`}>
                  <path
                    d="M 0 -50 C 28 -25 35 15 0 30 C -35 15 -28 -25 0 -50 Z"
                    fill="url(#lotusPetalGrad)"
                    stroke="#D46A8B"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 0 -42 C 16 -20 20 8 0 20 C -20 8 -16 -20 0 -42 Z"
                    fill="url(#lotusPetalDeep)"
                    opacity="0.35"
                  />
                  <line x1="0" y1="-44" x2="0" y2="24" stroke="#FFF0F5" strokeWidth="1.5" opacity="0.7" />
                </g>
              ))}
            </g>
          )}

          {base === 'golden-flower' && (
            // Golden Flower (Dok Mai Thong)
            <g id="golden-leaves">
              {[
                { angle: -70, x: 75, y: 235, s: 0.95 },
                { angle: -45, x: 110, y: 255, s: 1.05 },
                { angle: -22, x: 150, y: 268, s: 1.1 },
                { angle: 0, x: 200, y: 275, s: 1.2 },
                { angle: 22, x: 250, y: 268, s: 1.1 },
                { angle: 45, x: 290, y: 255, s: 1.05 },
                { angle: 70, x: 325, y: 235, s: 0.95 },
              ].map((petal, idx) => (
                <g key={`gold-${idx}`} transform={`translate(${petal.x}, ${petal.y}) rotate(${petal.angle * 0.4}) scale(${petal.s})`}>
                  <path
                    d="M 0 -52 C 26 -28 32 10 0 28 C -32 10 -26 -28 0 -52 Z"
                    fill="url(#goldPetalGrad)"
                    stroke="#C99738"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 0 -45 Q 12 -15 0 15 Q -12 -15 0 -45 Z"
                    fill="#FFF9E6"
                    opacity="0.5"
                  />
                  {/* Golden bead accent */}
                  <circle cx="0" cy="18" r="3" fill="#FFE082" stroke="#8A6317" strokeWidth="0.8" />
                </g>
              ))}
            </g>
          )}

          {base === 'purple-royal' && (
            // Elegant Royal Purple Petals
            <g id="purple-leaves">
              {[
                { angle: -70, x: 75, y: 235, s: 0.92 },
                { angle: -45, x: 110, y: 255, s: 1.02 },
                { angle: -22, x: 150, y: 268, s: 1.1 },
                { angle: 0, x: 200, y: 275, s: 1.18 },
                { angle: 22, x: 250, y: 268, s: 1.1 },
                { angle: 45, x: 290, y: 255, s: 1.02 },
                { angle: 70, x: 325, y: 235, s: 0.92 },
              ].map((petal, idx) => (
                <g key={`purple-${idx}`} transform={`translate(${petal.x}, ${petal.y}) rotate(${petal.angle * 0.4}) scale(${petal.s})`}>
                  <path
                    d="M 0 -52 C 28 -25 35 12 0 30 C -35 12 -28 -25 0 -52 Z"
                    fill="url(#purplePetalGrad)"
                    stroke="#594477"
                    strokeWidth="1.2"
                  />
                  <line x1="0" y1="-46" x2="0" y2="22" stroke="#E9D5FF" strokeWidth="1.6" opacity="0.8" />
                </g>
              ))}
            </g>
          )}
        </g>

        {/* 4. Flower Centerpiece Selection */}
        <g id="krathong-flower-center">
          {/* Inner bed of florals */}
          <ellipse cx="200" cy="242" rx="105" ry="34" fill="#1B3822" opacity="0.4" />

          {flower === 'pink-lotus' && (
            // Full Royal Pink Lotus Blossom
            <g id="flower-pink-lotus" transform="translate(200, 235)">
              {/* Outer lotus petals ring */}
              {[-60, -35, -12, 12, 35, 60, -90, 90].map((deg, i) => (
                <path
                  key={`bl-${i}`}
                  d="M 0 -22 C 16 -12 20 6 0 16 C -20 6 -16 -12 0 -22 Z"
                  fill="url(#lotusPetalGrad)"
                  stroke="#D46A8B"
                  strokeWidth="0.8"
                  transform={`rotate(${deg}) translate(0, -18)`}
                />
              ))}
              {/* Inner lotus cup */}
              <circle cx="0" cy="0" r="14" fill="#F5D58B" stroke="#D4AF37" strokeWidth="1" />
              {/* Pollen pistil dots */}
              <circle cx="-5" cy="-4" r="2" fill="#8B6B15" />
              <circle cx="4" cy="-4" r="2" fill="#8B6B15" />
              <circle cx="0" cy="4" r="2.2" fill="#8B6B15" />
              <circle cx="0" cy="-1" r="1.8" fill="#FFF9E6" />
            </g>
          )}

          {flower === 'white-jasmine' && (
            // Fragrant Jasmine Garland (Phuang Malai style)
            <g id="flower-white-jasmine">
              {/* Circular garland of jasmine buds */}
              {[
                { x: 140, y: 235 }, { x: 160, y: 228 }, { x: 185, y: 225 },
                { x: 215, y: 225 }, { x: 240, y: 228 }, { x: 260, y: 235 },
                { x: 250, y: 248 }, { x: 225, y: 254 }, { x: 200, y: 256 },
                { x: 175, y: 254 }, { x: 150, y: 248 },
              ].map((pos, idx) => (
                <g key={`jasmine-${idx}`} transform={`translate(${pos.x}, ${pos.y})`}>
                  {/* Calyx */}
                  <ellipse cx="0" cy="4" rx="4" ry="2" fill="#4D7C55" />
                  {/* Jasmine petals */}
                  <path
                    d="M 0 -10 C 6 -6 6 2 0 4 C -6 2 -6 -6 0 -10 Z"
                    fill="#FFF6E9"
                    stroke="#E0D6C8"
                    strokeWidth="0.7"
                  />
                  <ellipse cx="0" cy="-3" rx="2.5" ry="5" fill="#FFFFFF" />
                </g>
              ))}
              {/* Inner yellow accent */}
              <circle cx="200" cy="240" r="12" fill="#F5D58B" opacity="0.8" />
            </g>
          )}

          {flower === 'yellow-marigold' && (
            // Dense ruffled Auspicious Yellow Marigold
            <g id="flower-yellow-marigold" transform="translate(200, 238)">
              {/* Multi-layered dense ruffle petals */}
              {[38, 30, 22, 14].map((rad, tier) => (
                <g key={`marigold-tier-${tier}`} opacity={1 - tier * 0.05}>
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <circle
                      key={`petal-${tier}-${deg}`}
                      cx={Math.cos((deg * Math.PI) / 180) * (rad * 0.7)}
                      cy={Math.sin((deg * Math.PI) / 180) * (rad * 0.55)}
                      r={rad * 0.38}
                      fill={tier === 0 ? '#F59E0B' : tier === 1 ? '#FBBF24' : '#FDE047'}
                      stroke="#D97706"
                      strokeWidth="0.5"
                    />
                  ))}
                </g>
              ))}
              <circle cx="0" cy="0" r="8" fill="#F59E0B" />
              <circle cx="0" cy="0" r="4" fill="#B45309" />
            </g>
          )}

          {flower === 'purple-orchid' && (
            // Royal Purple Thai Orchid
            <g id="flower-purple-orchid" transform="translate(200, 235)">
              {/* Dorsal sepal */}
              <path d="M 0 -30 C 14 -16 12 0 0 0 C -12 0 -14 -16 0 -30 Z" fill="#9B72CF" stroke="#594477" strokeWidth="0.8" />
              {/* Lateral petals */}
              <path d="M -26 -12 C -18 8 0 0 0 0 C -4 -16 -18 -22 -26 -12 Z" fill="#C7A9E8" stroke="#594477" strokeWidth="0.8" />
              <path d="M 26 -12 C 18 8 0 0 0 0 C 4 -16 18 -22 26 -12 Z" fill="#C7A9E8" stroke="#594477" strokeWidth="0.8" />
              {/* Lower lip / labellum */}
              <path d="M 0 20 C 16 18 14 0 0 0 C -14 0 -16 18 0 20 Z" fill="#80185A" stroke="#500736" strokeWidth="1" />
              <circle cx="0" cy="6" r="3.5" fill="#F5D58B" />
            </g>
          )}

          {flower === 'rose-petals' && (
            // Romantic Rose Petals Heart Cluster
            <g id="flower-rose-petals" transform="translate(200, 236)">
              {[-45, -20, 0, 20, 45].map((deg, i) => (
                <path
                  key={`rose-${i}`}
                  d="M 0 -25 C 18 -15 16 10 0 16 C -16 10 -18 -15 0 -25 Z"
                  fill={i % 2 === 0 ? '#BE123C' : '#E11D48'}
                  stroke="#881337"
                  strokeWidth="0.8"
                  transform={`rotate(${deg * 1.3}) scale(1.1)`}
                />
              ))}
              <circle cx="0" cy="0" r="6" fill="#881337" />
              <circle cx="1" cy="-2" r="2" fill="#FDA4AF" opacity="0.8" />
            </g>
          )}
        </g>

        {/* 5. Extra Optional Decorations */}
        <g id="krathong-extra-decorations">
          {/* A. Miniature Lotus Buds */}
          {decorations.miniLotuses && (
            <g id="mini-lotuses">
              {[
                { x: 130, y: 255, s: 0.55, rot: -20 },
                { x: 270, y: 255, s: 0.55, rot: 20 },
                { x: 170, y: 268, s: 0.45, rot: -5 },
                { x: 230, y: 268, s: 0.45, rot: 5 },
              ].map((bud, i) => (
                <g key={`bud-${i}`} transform={`translate(${bud.x}, ${bud.y}) rotate(${bud.rot}) scale(${bud.s})`}>
                  <path d="M 0 -20 C 12 -8 10 8 0 14 C -10 8 -12 -8 0 -20 Z" fill="#F4BBD0" stroke="#C2185B" strokeWidth="1" />
                  <path d="M 0 12 L 0 20" stroke="#3E6548" strokeWidth="3" strokeLinecap="round" />
                </g>
              ))}
            </g>
          )}

          {/* B. Flower Petals Scattered */}
          {decorations.flowerPetals && (
            <g id="scattered-petals">
              {[
                { x: 95, y: 275, r: 25, color: '#F4BBD0' },
                { x: 130, y: 290, r: -40, color: '#FDE047' },
                { x: 180, y: 298, r: 10, color: '#F4BBD0' },
                { x: 220, y: 298, r: -15, color: '#FFF6E9' },
                { x: 265, y: 292, r: 35, color: '#FDE047' },
                { x: 305, y: 276, r: -25, color: '#F4BBD0' },
              ].map((pt, i) => (
                <path
                  key={`pet-${i}`}
                  d="M 0 -8 C 6 -4 6 4 0 8 C -6 4 -6 -4 0 -8 Z"
                  fill={pt.color}
                  transform={`translate(${pt.x}, ${pt.y}) rotate(${pt.r}) scale(0.9)`}
                  opacity="0.9"
                />
              ))}
            </g>
          )}

          {/* C. Gold Leaf Foil Flakes */}
          {decorations.goldFoil && (
            <g id="gold-leaf-flakes">
              {[
                { x: 120, y: 245, s: 7 },
                { x: 155, y: 260, s: 6 },
                { x: 200, y: 265, s: 8 },
                { x: 245, y: 260, s: 6 },
                { x: 280, y: 245, s: 7 },
                { x: 160, y: 240, s: 5 },
                { x: 240, y: 240, s: 5 },
              ].map((g, i) => (
                <polygon
                  key={`gold-foil-${i}`}
                  points="0,-4 3,-1 4,3 -1,4 -4,0"
                  fill="#FFE082"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  transform={`translate(${g.x}, ${g.y}) rotate(${i * 47}) scale(${g.s * 0.18})`}
                  className="animate-pulse"
                />
              ))}
            </g>
          )}

          {/* D. Heart Ornaments */}
          {decorations.heartOrnaments && (
            <g id="heart-ornaments">
              {[
                { x: 150, y: 215, s: 0.7, color: '#F4BBD0' },
                { x: 250, y: 215, s: 0.7, color: '#F5D58B' },
                { x: 200, y: 260, s: 0.65, color: '#F4BBD0' },
              ].map((h, i) => (
                <path
                  key={`heart-${i}`}
                  d="M 12 21.35 l -1.45 -1.32 C 5.4 15.36 2 12.28 2 8.5 C 2 5.42 4.42 3 7.5 3 c 1.74 0 3.41 0.81 4.5 2.09 C 13.09 3.81 14.76 3 16.5 3 C 19.58 3 22 5.42 22 8.5 c 0 3.78 -3.4 6.86 -8.55 11.54 L 12 21.35 z"
                  fill={h.color}
                  stroke="#FFF6E9"
                  strokeWidth="0.8"
                  transform={`translate(${h.x - 12 * h.s}, ${h.y - 12 * h.s}) scale(${h.s})`}
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                />
              ))}
            </g>
          )}
        </g>

        {/* 6. Traditional Thai 3 Incense Sticks (ธูป ๓ ดอก) */}
        {decorations.incense && (
          <g id="thai-incense-sticks">
            {/* Left stick */}
            <line x1="184" y1="210" x2="178" y2="120" stroke="#795548" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="178" y1="120" x2="176" y2="95" stroke="#C62828" strokeWidth="2.2" strokeLinecap="round" />

            {/* Center stick */}
            <line x1="193" y1="205" x2="191" y2="110" stroke="#795548" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="191" y1="110" x2="190" y2="85" stroke="#C62828" strokeWidth="2.2" strokeLinecap="round" />

            {/* Right stick */}
            <line x1="202" y1="210" x2="207" y2="120" stroke="#795548" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="207" y1="120" x2="209" y2="95" stroke="#C62828" strokeWidth="2.2" strokeLinecap="round" />

            {/* Glowing ember tips & smoke wisps when lit */}
            {isLit && (
              <g id="incense-smoke" className="animate-pulse">
                {/* Embers */}
                <circle cx="176" cy="95" r="2.2" fill="#FF5722" filter="drop-shadow(0 0 3px #FF9800)" />
                <circle cx="190" cy="85" r="2.2" fill="#FF5722" filter="drop-shadow(0 0 3px #FF9800)" />
                <circle cx="209" cy="95" r="2.2" fill="#FF5722" filter="drop-shadow(0 0 3px #FF9800)" />

                {/* Delicate smoke curls */}
                <path
                  d="M 176 95 Q 170 75 178 55 T 172 30"
                  fill="none"
                  stroke="#FFF6E9"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.35"
                />
                <path
                  d="M 190 85 Q 196 65 188 45 T 194 20"
                  fill="none"
                  stroke="#FFF6E9"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.4"
                />
                <path
                  d="M 209 95 Q 215 75 207 55 T 213 30"
                  fill="none"
                  stroke="#FFF6E9"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </g>
            )}
          </g>
        )}

        {/* 7. The Central Candle (เทียน) */}
        <g id="krathong-candle" transform="translate(200, 215)">
          {/* Candle shadow */}
          <ellipse cx="0" cy="2" rx="14" ry="5" fill="#000000" opacity="0.3" />

          {/* Candle Cylinder Body */}
          <rect
            x="-9"
            y="-65"
            width="18"
            height="65"
            rx="3"
            fill={activeCandle.body}
            stroke={activeCandle.border}
            strokeWidth="1"
          />
          {/* Candle body highlight */}
          <rect x="-6" y="-63" width="3" height="61" fill="#FFFFFF" opacity="0.4" rx="1" />
          {/* Candle Top Rim */}
          <ellipse cx="0" cy="-65" rx="9" ry="3.5" fill={activeCandle.top} stroke={activeCandle.border} strokeWidth="1" />

          {/* Candle Wick */}
          <line x1="0" y1="-65" x2="0" y2="-75" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />

          {/* 8. Glowing Candle Flame (Only when isLit is true) */}
          {isLit ? (
            <g id="candle-flame" className="animate-flicker">
              {/* Outer Radiant Glow */}
              <circle cx="0" cy="-90" r="32" fill="url(#candleGlowGrad)" opacity="0.8" />

              {/* Flame Tear Drop Base: Outer Orange */}
              <path
                d="M 0 -115 C 16 -95 14 -76 0 -72 C -14 -76 -16 -95 0 -115 Z"
                fill="#FF6F00"
                opacity="0.9"
              />

              {/* Inner Flame: Warm Gold / Yellow */}
              <path
                d="M 0 -110 C 11 -94 10 -76 0 -73 C -10 -76 -11 -94 0 -110 Z"
                fill="#FFD54F"
              />

              {/* Core Flame: White/Blue hot core */}
              <path
                d="M 0 -95 C 5 -85 5 -76 0 -74 C -5 -76 -5 -85 0 -95 Z"
                fill="#FFF9E6"
              />
              <ellipse cx="0" cy="-74" rx="3" ry="1.5" fill="#81D4FA" opacity="0.8" />

              {/* Little Rising Sparks */}
              <circle cx="-4" cy="-122" r="1.2" fill="#FFE082" className="animate-ping" />
              <circle cx="5" cy="-128" r="1" fill="#FFCA28" className="animate-pulse" />
            </g>
          ) : (
            // Unlit wick indicator
            <circle cx="0" cy="-75" r="1.5" fill="#5D4037" />
          )}
        </g>
      </svg>
    </div>
  );
};
