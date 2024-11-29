// Color conversion utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
}

export function getContrastColor(hexcolor: string): string {
  const { r, g, b } = hexToRgb(hexcolor);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
}

export function generateRandomColor(): string {
  const letters = '0123456789abcdef';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function adjustBrightness(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;

  const newR = Math.round((t - r) * p) + r;
  const newG = Math.round((t - g) * p) + g;
  const newB = Math.round((t - b) * p) + b;

  return rgbToHex(newR, newG, newB);
}

// Color name mapping
export const colorNames: Record<string, string> = {
  red: '#ff0000',
  blue: '#0000ff',
  green: '#00ff00',
  yellow: '#ffff00',
  purple: '#800080',
  orange: '#ffa500',
  pink: '#ffc0cb',
  brown: '#a52a2a',
  gray: '#808080',
  black: '#000000',
  white: '#ffffff',
  cyan: '#00ffff',
  magenta: '#ff00ff',
  lime: '#00ff00',
  indigo: '#4b0082',
  violet: '#ee82ee',
  maroon: '#800000',
  navy: '#000080',
  olive: '#808000',
  teal: '#008080',
  aqua: '#00ffff',
  silver: '#c0c0c0',
  gold: '#ffd700',
  coral: '#ff7f50',
  crimson: '#dc143c',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  salmon: '#fa8072',
  turquoise: '#40e0d0',
};

// Generate variations of a base color
export function generateColorVariations(baseColor: string): string[] {
  const variations: string[] = [];
  const { r, g, b } = hexToRgb(baseColor);

  // Add the base color
  variations.push(baseColor);

  // Add a lighter shade
  variations.push(adjustBrightness(baseColor, 0.2));

  // Add a darker shade
  variations.push(adjustBrightness(baseColor, -0.2));

  // Add a complementary color
  variations.push(rgbToHex(255 - r, 255 - g, 255 - b));

  // Add an analogous color
  const hslColor = rgbToHsl(r, g, b);
  const analogousHue = (hslColor.h + 30) % 360;
  variations.push(hslToHex(analogousHue, hslColor.s, hslColor.l));

  return variations;
}

// Helper function to convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

// Helper function to convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return rgbToHex(
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  );
}