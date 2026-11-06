/** WCAG relative luminance of an sRGB colour given as 0-255 channels. */
function luminance([r, g, b]: number[]): number {
  const linear = (byte: number) => {
    const channel = byte / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/** WCAG contrast ratio of two sRGB colours given as 0-255 channels. */
export function contrastRatio(first: number[], second: number[]): number {
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}
