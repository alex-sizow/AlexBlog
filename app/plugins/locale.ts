type LocaleCode = 'en' | 'fr'

function deviceLocale(): LocaleCode {
  const raw = import.meta.server
    ? useRequestHeaders(['accept-language'])['accept-language'] ?? ''
    : navigator.languages.join(',')
  for (const part of raw.split(',')) {
    const lang = part.split(';')[0]?.trim().toLowerCase().split('-')[0]
    if (lang === 'fr' || lang === 'en') return lang
  }
  return 'en'
}

export default defineNuxtPlugin({
  name: 'locale-choice',
  enforce: 'pre',
  setup(nuxtApp) {
    nuxtApp.hook('i18n:beforeLocaleSwitch', (data: { newLocale: string, initialSetup: boolean }) => {
      const choice = useCookie<string | null>('lang').value
      if (choice === 'en' || choice === 'fr') {
        data.newLocale = choice
        return
      }
      if (data.initialSetup) data.newLocale = deviceLocale()
    })
  },
})
