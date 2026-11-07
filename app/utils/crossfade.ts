export function crossfade(update: () => void | Promise<void>) {
  if (import.meta.server || matchMedia('(prefers-reduced-motion: reduce)').matches || !document.startViewTransition) {
    void update()
    return
  }

  document.startViewTransition(async () => {
    await update()
    await nextTick()
  })
}
