// ─────────────────────────────────────────────
//  DECORATIONS COMPONENT
// ─────────────────────────────────────────────

import { memo } from "react";
import Zigzag from "../svg/Zigzag";
import TriangleOutline from "../svg/TriangleOutline";
import TriangleSolid from "../svg/TriangleSolid";
import DotsGrid from "../svg/DotsGrid";
import CircleRing from "../svg/CircleRing";
import CrossPlus from "../svg/CrossPlus";
import StarBurst from "../svg/StarBurst";
import SquareRotated from "../svg/SquareRotated";
import WaveLine from "../svg/WaveLine";
import Hexagon from "../svg/Hexagon";
import ArcShape from "../svg/ArcShape";
import Diamond from "../svg/Diamond";
import OrbitRing from "../svg/OrbitRing";
import SpiralDots from "../svg/SpiralDots";

const HeroDecorations = memo(({s}: {s: Record<string, string>}) => (
    <>
      <div className={`${s.deco} ${s.decoZigzag}`} aria-hidden="true"><Zigzag /></div>
      <div className={`${s.deco} ${s.decoTriTop}`} aria-hidden="true"><TriangleOutline size={30} /></div>
      <div className={`${s.deco} ${s.decoTriMid}`} aria-hidden="true"><TriangleSolid size={20} /></div>
      <div className={`${s.deco} ${s.decoTriRight}`} aria-hidden="true"><TriangleSolid size={28} color="rgba(62,200,120,0.5)" /></div>
      <div className={`${s.deco} ${s.decoTriBottomRight}`} aria-hidden="true"><TriangleSolid size={24} color="rgba(74,61,143,0.4)" /></div>
      <div className={`${s.deco} ${s.decoDotsPurple}`} aria-hidden="true"><DotsGrid color="#4A3D8F" cols={5} rows={5} /></div>
      <div className={`${s.deco} ${s.decoDotsGreen}`} aria-hidden="true"><DotsGrid color="#3EC878" cols={7} rows={7} gap={15} /></div>
      <div className={`${s.deco} ${s.decoRingTopLeft}`} aria-hidden="true"><CircleRing size={80} color="#3EC878" strokeWidth={2} /></div>
      <div className={`${s.deco} ${s.decoRingBottom}`} aria-hidden="true"><CircleRing size={56} color="#4A3D8F" strokeWidth={2} dashed /></div>
      <div className={`${s.deco} ${s.decoCrossLeft}`} aria-hidden="true"><CrossPlus size={30} color="rgba(74,61,143,0.28)" /></div>
      <div className={`${s.deco} ${s.decoCrossRight}`} aria-hidden="true"><CrossPlus size={26} color="rgba(62,200,120,0.4)" /></div>
      <div className={`${s.deco} ${s.decoStar}`} aria-hidden="true"><StarBurst size={30} color="rgba(62,200,120,0.65)" /></div>
      <div className={`${s.deco} ${s.decoSquare}`} aria-hidden="true"><SquareRotated size={24} color="rgba(74,61,143,0.32)" /></div>
      <div className={`${s.deco} ${s.decoWave}`} aria-hidden="true"><WaveLine color="rgba(62,200,120,0.35)" /></div>
      <div className={`${s.deco} ${s.decoHexLeft}`} aria-hidden="true"><Hexagon size={44} color="rgba(74,61,143,0.25)" /></div>
      <div className={`${s.deco} ${s.decoArcTop}`} aria-hidden="true"><ArcShape size={60} color="rgba(62,200,120,0.35)" /></div>
      <div className={`${s.deco} ${s.decoSpiral}`} aria-hidden="true"><SpiralDots color="#4A3D8F" /></div>
      <div className={`${s.deco} ${s.decoDiamond}`} aria-hidden="true"><Diamond size={28} color="rgba(62,200,120,0.45)" /></div>
      <div className={`${s.deco} ${s.decoOrbitRing}`} aria-hidden="true"><OrbitRing size={70} color="rgba(74,61,143,0.2)" /></div>
    </>
  ));
  
  HeroDecorations.displayName = 'HeroDecorations';

  export default HeroDecorations;