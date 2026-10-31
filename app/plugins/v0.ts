import { createBreakpointsPlugin, createHydrationPlugin, createLocalePlugin, createThemePlugin } from '@vuetify/v0'
import { VueI18nLocaleAdapter } from '@vuetify/v0/locale/adapters/vue-i18n'
import { V0UnheadThemeAdapter } from '@vuetify/v0/theme/adapters/unhead'
import { themes, type ThemeId } from '~/theme'

export default defineNuxtPlugin({
  name: 'v0',
  dependsOn: ['i18n:plugin'],
  setup(nuxtApp) {
    const themeCookie = useCookie<ThemeId>('theme')
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
        themes,
      }),
    )
  },
})
