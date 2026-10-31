export const themeIds = ['light', 'dark'] as const

export type ThemeId = (typeof themeIds)[number]

const hue = 260

function color(lightness: number, chroma: number): string {
  return `oklch(${lightness} ${chroma} ${hue})`
}

type ThemeColors = {
  surface: string
  'on-surface': string
  primary: string
  'on-primary': string
  muted: string
  border: string
}

export const themes: Record<ThemeId, { dark: boolean, colors: ThemeColors }> = {
  light: {
    dark: false,
    colors: {
      surface: color(0.99, 0.004),
      'on-surface': color(0.248, 0.012),
      primary: color(0.623, 0.188),
      'on-primary': color(0.99, 0.004),
      muted: color(0.474, 0.016),
      border: color(0.812, 0.01),
    },
  },
  dark: {
    dark: true,
    colors: {
      surface: color(0.235, 0.014),
      'on-surface': color(0.907, 0.012),
      primary: color(0.714, 0.143),
      'on-primary': color(0.218, 0.014),
      muted: color(0.705, 0.016),
      border: color(0.403, 0.018),
    },
  },
}
