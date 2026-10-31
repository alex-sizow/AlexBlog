import { createBreakpointsPlugin, createHydrationPlugin, createLocalePlugin, createThemePlugin } from '@vuetify/v0'
import { VueI18nLocaleAdapter } from '@vuetify/v0/locale/adapters/vue-i18n'
import { V0UnheadThemeAdapter } from '@vuetify/v0/theme/adapters/unhead'

export default defineNuxtPlugin({
  name: 'v0',
  dependsOn: ['i18n:plugin'],
  setup(nuxtApp) {
    const themeCookie = useCookie<'light' | 'dark'>('theme')
    const widthCookie = useCookie<number>('viewport-width', {
      default: () => 1280,
    })

    nuxtApp.vueApp.use(createLocalePlugin({
      adapter: new VueI18nLocaleAdapter({ global: nuxtApp.$i18n }),
      default: 'en',
    }))
    nuxtApp.vueApp.use(createHydrationPlugin())
    nuxtApp.vueApp.use(
      createBreakpointsPlugin({
        ssr: {
          clientWidth: widthCookie.value || 1280,
        },
      }),
    )
    nuxtApp.vueApp.use(
      createThemePlugin({
        adapter: new V0UnheadThemeAdapter(),
        default: themeCookie.value === 'dark' ? 'dark' : 'light',
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#3b82f6',
              surface: '#ffffff',
              'on-primary': '#ffffff',
              'on-surface': '#212121',
            },
          },
          dark: {
            dark: true,
            colors: {
              primary: '#60a5fa',
              surface: '#1e1e1e',
              'on-primary': '#1a1a1a',
              'on-surface': '#e0e0e0',
            },
          },
        },
      }),
    )
  },
})
