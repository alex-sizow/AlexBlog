<script setup lang="ts">
import { Switch } from '@vuetify/v0'

defineProps<{
  label: string
  namespace: string
}>()

const on = defineModel<boolean>({ required: true })
</script>

<template>
  <span class="tumbler">
    <Switch.Root
      v-model="on"
      class="tumbler__switch"
      :namespace="namespace"
      :label="label"
    >
      <Switch.Track class="tumbler__track" :namespace="namespace">
        <slot name="off" />
        <slot name="on" />
        <Switch.Thumb class="tumbler__knob" :namespace="namespace" />
      </Switch.Track>
    </Switch.Root>
  </span>
</template>

<style scoped>
.tumbler {
  --knob: 1.85rem;
  --gap: 0.14rem;
  --pad: 0.1rem;
  --flag: 1.05rem;
  display: inline-flex;
  flex: none;

  &:active {
    &:deep(.tumbler__knob) {
      transform: scale(0.94);
    }

    &:deep(.tumbler__knob[data-state='checked']) {
      transform: translateX(calc(100% + var(--gap))) scale(0.94);
    }
  }

  &:deep(.tumbler__switch) {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    line-height: 0;
    cursor: pointer;
    appearance: none;
  }

  &:deep(.tumbler__track) {
    position: relative;
    display: grid;
    grid-template-columns: var(--knob) var(--knob);
    gap: var(--gap);
    align-items: center;
    justify-items: center;
    width: max-content;
    min-height: calc(var(--knob) + var(--pad) * 2 + var(--stroke, 3px) * 2);
    margin: 0;
    padding: var(--pad);
    border: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
    border-radius: 999px;
    background: var(--v0-canvas, oklch(0.922 0 0));
  }

  & :slotted(.tumbler__glyph) {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: var(--flag);
    height: var(--flag);
    overflow: hidden;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px oklch(0 0 0 / 0.35);
  }

  & :slotted(.tumbler__glyph--emoji) {
    width: var(--knob);
    height: var(--knob);
    overflow: visible;
    box-shadow: none;
    font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
    font-size: 1.15rem;
    line-height: 1;
    user-select: none;
  }

  & :slotted(.tumbler__glyph--sun) {
    transform: translate(0.05em, 0.1em);
  }

  & :slotted(.tumbler__glyph--moon) {
    transform: translate(0.07em, 0.11em);
  }

  &:deep(.tumbler__knob) {
    position: absolute;
    z-index: 0;
    top: var(--pad);
    left: var(--pad);
    width: var(--knob);
    height: var(--knob);
    border: var(--stroke, 3px) solid var(--v0-ink, oklch(0 0 0));
    border-radius: 50%;
    background: var(--v0-yellow, oklch(0.947 0.103 99));
    transition: transform 160ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:deep(.tumbler__knob[data-state='checked']) {
    transform: translateX(calc(100% + var(--gap)));
  }

  @media (prefers-reduced-motion: reduce) {
    &:deep(.tumbler__knob) {
      transition: none;
    }
  }
}
</style>
