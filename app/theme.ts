export const themeIds = ['light', 'dark'] as const

export type ThemeId = (typeof themeIds)[number]

type ThemeColors = {
  canvas: string
  surface: string
  'on-surface': string
  primary: string
  'on-primary': string
  pink: string
  yellow: string
  muted: string
  border: string
  ink: string
  link: string
}

const ink = 'oklch(0 0 0)'
const white = 'oklch(1 0 0)'
const pink = 'oklch(0.869 0.070 19)'
const yellow = 'oklch(0.947 0.103 99)'
const primary = 'oklch(0.482 0.298 277)'

export const themes: Record<ThemeId, { dark: boolean, colors: ThemeColors }> = {
  light: {
    dark: false,
    colors: {
      canvas: 'oklch(0.922 0 0)',
      surface: white,
      'on-surface': ink,
      primary,
      'on-primary': white,
      pink,
      yellow,
      muted: 'oklch(0.510 0 0)',
      border: ink,
      ink,
      link: primary,
    },
  },
  dark: {
    dark: true,
    colors: {
      canvas: 'oklch(0.178 0 0)',
      surface: 'oklch(0.226 0 0)',
      'on-surface': white,
      primary,
      'on-primary': white,
      pink,
      yellow,
      muted: 'oklch(0.833 0 0)',
      border: white,
      ink,
      link: yellow,
    },
  },
}
