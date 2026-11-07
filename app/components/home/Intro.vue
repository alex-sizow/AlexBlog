<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="intro">
    <div class="intro__grid">
      <p class="intro__hi">{{ t('home.intro.hi') }}</p>
      <h1 class="intro__name">{{ t('footer.name') }}</h1>
      <img
        class="intro__photo"
        src="/intro-duck.png"
        :alt="t('home.duck')"
        width="512"
        height="512"
        fetchpriority="high"
        decoding="async"
      />
      <p class="intro__who">{{ t('home.intro.who') }}</p>
      <p class="intro__what">{{ t('home.intro.what') }}</p>
      <svg class="intro__scribble" viewBox="0 0 280 220" fill="none" aria-hidden="true">
        <path
          d="M36 128c6-58 58-92 108-70 38 16 52 64 24 90-24 22-56 6-62-24-6-30 24-48 50-36 36 14 30 68-10 90-46 26-102 6-120-32"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          d="M162 46c16 8 22 24 8 34"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          d="M78 164c20 24 58 30 84 8"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.intro {
  --intro-plate: light-dark(
    var(--v0-yellow, oklch(0.947 0.103 99)),
    var(--v0-primary, oklch(0.482 0.298 277))
  );
  --intro-scribble: light-dark(
    color-mix(in oklch, var(--v0-pink, oklch(0.869 0.070 19)) 46%, var(--v0-canvas, oklch(0.922 0 0))),
    color-mix(in oklch, var(--v0-on-surface, white) 18%, transparent)
  );

  margin: 0 0 1.75rem;
  container: intro / inline-size;

  & .intro__grid {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    column-gap: 0.75rem;
  }

  & .intro__hi,
  & .intro__who,
  & .intro__what {
    margin: 0;
  }

  & .intro__hi {
    z-index: 1;
    grid-area: 1 / 2 / 2 / span 4;
    align-self: start;
    margin-block-start: 0.2rem;
    font-size: 0.95rem;
  }

  & .intro__name {
    grid-area: 1 / 1 / 2 / -1;
    min-width: 0;
    margin: 0;
    padding-block: 1.55rem 0.7rem;
    font-weight: 800;
    font-size: 17.6cqi;
    letter-spacing: -0.05em;
    line-height: 0.9;
    text-transform: uppercase;
    white-space: nowrap;
  }

  & .intro__photo {
    grid-area: 2 / 1 / 3 / span 5;
    align-self: end;
    display: block;
    width: 100%;
    min-width: 0;
    height: auto;
    background: var(--intro-plate);
    border: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
    border-radius: var(--radius, 8px);
  }

  & .intro__who {
    z-index: 1;
    grid-area: 2 / 5 / 3 / -1;
    align-self: end;
    min-width: 0;
    padding-block-end: 1.15rem;
    padding-inline-start: 0.45rem;
    font-weight: 800;
    font-size: clamp(1.35rem, 4.6cqi, 2.2rem);
    letter-spacing: -0.03em;
    line-height: 1.05;
  }

  & .intro__what {
    grid-area: 3 / 6 / 4 / -1;
    min-width: 0;
    padding-block-start: 0.85rem;
    color: var(--v0-muted, oklch(0.510 0 0));
    font-size: 0.95rem;
    line-height: 1.45;
  }

  & .intro__scribble {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    width: 18rem;
    height: auto;
    color: var(--intro-scribble);
    pointer-events: none;
    transform: scaleX(-1);
  }
}

@container intro (max-width: 35.99rem) {
  .intro .intro__grid {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 0.85rem;
  }

  .intro .intro__hi,
  .intro .intro__name,
  .intro .intro__photo,
  .intro .intro__who,
  .intro .intro__what {
    grid-area: auto;
    align-self: auto;
    padding: 0;
  }

  .intro .intro__name {
    font-size: 12.2cqi;
  }

  .intro .intro__who {
    font-size: clamp(1.35rem, 7cqi, 2rem);
    line-height: 1.15;
  }

  .intro .intro__scribble {
    display: none;
  }
}
</style>
