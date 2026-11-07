<template>
  <div class="flock" aria-hidden="true">
    <div class="flock__mask" />
  </div>
  <div class="shell">
    <AppHeader />
    <main class="shell__main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
