import aiHero1 from "./ai-hero-1.jpg";
import aiHero2 from "./ai-hero-2.jpg";
import aiHero3 from "./ai-hero-3.jpg";
import aiHero4 from "./ai-hero-4.jpg";
import aiFusion from "./ai-fusion-bg.jpg";
import landingHero from "./landing-hero.jpg";
import aiRobotHand from "./ai-robot-hand.jpg.asset.json";
import aiRobotsGallery from "./ai-robots-gallery.jpg.asset.json";
import aiCharacterCircuit from "./ai-character-circuit.jpg.asset.json";
import aiCharacterCircuitAlt from "./ai-character-circuit-alt.jpg.asset.json";

const toSrc = (m: any): string => (typeof m === "string" ? m : m?.url ?? m?.default ?? "");

export const aiGalleryImages = [
  { src: toSrc(aiHero1), alt: "AI hero character glowing with neural circuits" },
  { src: toSrc(aiCharacterCircuit), alt: "Glowing AI humanoid character for Neuron Guide" },
  { src: toSrc(aiHero2), alt: "Futuristic AI assistant preview" },
  { src: toSrc(aiRobotHand), alt: "Robotic hand holding a glowing AI atom" },
  { src: toSrc(aiHero3), alt: "AI dashboard visualization" },
  { src: toSrc(aiRobotsGallery), alt: "Friendly robots helping people discover AI tools" },
  { src: toSrc(aiHero4), alt: "Neon AI character exploring the digital universe" },
  { src: toSrc(aiCharacterCircuitAlt), alt: "Futuristic neural AI character with data particles" },
  { src: toSrc(aiFusion), alt: "Fusion of AI energy and information" },
  { src: toSrc(landingHero), alt: "Landing hero AI scene" },
].filter((image) => Boolean(image.src));
