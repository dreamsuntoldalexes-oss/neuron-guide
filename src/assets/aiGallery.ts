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
import upOIP from "./upload-OIP.png.asset.json";
import upOIP2 from "./upload-OIP2.png.asset.json";
import upOIP3 from "./upload-OIP3.png.asset.json";
import upOIP4 from "./upload-OIP4.png.asset.json";
import upOIP5 from "./upload-OIP5.png.asset.json";

const toSrc = (m: any): string => (typeof m === "string" ? m : m?.url ?? m?.default ?? "");

export const aiGalleryImages = [
  { src: toSrc(upOIP5), alt: "Two AI beings face-to-face", quote: "Two minds. One future — powered by AI." },
  { src: toSrc(upOIP4), alt: "AI hand meets human hand", quote: "Where human intuition meets machine intelligence." },
  { src: toSrc(upOIP3), alt: "AI arm wrestling with search engines", quote: "Outsmart the search. Discover with Neuron Guide." },
  { src: toSrc(upOIP2), alt: "AI working at futuristic workstation", quote: "Your smartest workspace is one prompt away." },
  { src: toSrc(upOIP), alt: "Developer building an AI app", quote: "Build the future — one AI tool at a time." },
  { src: toSrc(aiHero1), alt: "AI hero character glowing with neural circuits", quote: "Neurons alive. Ideas amplified." },
  { src: toSrc(aiCharacterCircuit), alt: "Glowing AI humanoid character", quote: "Every circuit sparks a new possibility." },
  { src: toSrc(aiHero2), alt: "Futuristic AI assistant preview", quote: "The best assistant never sleeps." },
  { src: toSrc(aiRobotHand), alt: "Robotic hand holding a glowing AI atom", quote: "Hold the future in your hands." },
  { src: toSrc(aiHero3), alt: "AI dashboard visualization", quote: "See beyond data — see the pattern." },
  { src: toSrc(aiRobotsGallery), alt: "Friendly robots helping people", quote: "AI made human. AI made helpful." },
  { src: toSrc(aiHero4), alt: "Neon AI character exploring the digital universe", quote: "Explore. Create. Repeat." },
  { src: toSrc(aiCharacterCircuitAlt), alt: "Futuristic neural AI character", quote: "Think faster. Dream bigger." },
  { src: toSrc(aiFusion), alt: "Fusion of AI energy and information", quote: "Fusion of human and machine — reimagined." },
  { src: toSrc(landingHero), alt: "Landing hero AI scene", quote: "Welcome to the era of intelligent tools." },
].filter((image) => Boolean(image.src));
