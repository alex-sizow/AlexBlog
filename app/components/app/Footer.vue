<script setup lang="ts">
const year = new Date().getFullYear()

const profiles = [
  { href: 'https://x.com/alexsizov_demo', key: 'footer.x', icon: 'x' },
  { href: 'https://www.linkedin.com/in/alexsizov-demo', key: 'footer.linkedin', icon: 'linkedin' },
] as const
</script>

<template>
  <footer class="footer">
    <div class="footer__meta">
      <p class="footer__name">{{ $t('footer.name') }}</p>
      <p class="footer__note">{{ $t('footer.note', { year }) }}</p>
    </div>
    <ul class="footer__profiles">
      <li v-for="profile in profiles" :key="profile.href">
        <a
          class="footer__link"
          :href="profile.href"
          rel="noopener noreferrer"
          target="_blank"
          :aria-label="$t(profile.key)"
        >
          <span class="footer__icon" :class="`footer__icon--${profile.icon}`" />
        </a>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding: 0.9rem 1.25rem 1.05rem;
  border-top: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));

  & .footer__name,
  & .footer__note {
    margin: 0;
  }

  & .footer__name {
    color: var(--v0-on-surface, oklch(0 0 0));
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.3;
  }

  & .footer__note {
    color: var(--v0-muted, oklch(0.510 0 0));
    font-size: 0.8rem;
    line-height: 1.35;
  }

  & .footer__profiles {
    display: flex;
    gap: 0.45rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  & .footer__link {
    display: grid;
    place-items: center;
    width: 2.1rem;
    height: 2.1rem;
    border: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
    border-radius: var(--radius, 8px);
    color: var(--v0-on-surface, oklch(0 0 0));

    &:hover {
      background: var(--v0-yellow, oklch(0.947 0.103 99));
      color: var(--v0-ink, oklch(0 0 0));
    }
  }

  & .footer__icon {
    width: 0.85rem;
    height: 0.85rem;
    background: currentColor;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;

    &.footer__icon--x {
      mask-image: url('/icons/x.svg');
    }

    &.footer__icon--linkedin {
      mask-image: url('/icons/linkedin.svg');
    }
  }
}
</style>
