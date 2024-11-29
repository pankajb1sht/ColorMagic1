import { colorNames, generateColorVariations } from './colorUtils';

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function HSLToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c/2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}

export function generatePalette(text: string): string[] {
  if (!text.trim()) return [];
  
  // Check if the input is a color name
  const lowerText = text.toLowerCase();
  if (colorNames[lowerText]) {
    return generateColorVariations(colorNames[lowerText]);
  }
  
  // If not a color name, generate based on text hash
  const hash = hashString(text);
  const baseHue = hash % 360;
  
  return [
    HSLToHex(baseHue, 90, 50),                     // Primary color
    HSLToHex((baseHue + 30) % 360, 85, 60),        // Analogous color
    HSLToHex((baseHue + 180) % 360, 80, 45),       // Complementary color
    HSLToHex((baseHue + 60) % 360, 70, 65),        // Split-complementary
    HSLToHex((baseHue + 150) % 360, 60, 75),       // Triadic color
  ];
}