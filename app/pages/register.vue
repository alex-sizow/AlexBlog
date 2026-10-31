<script setup lang="ts">
import { Form, Input } from '@vuetify/v0'
import { shallowRef } from 'vue'

const { t } = useI18n()
const name = shallowRef('')
const email = shallowRef('')
const password = shallowRef('')
const notice = shallowRef('')

function emailRule(value: unknown): true | string {
  return typeof value === 'string' && value.includes('@') ? true : t('register.emailInvalid')
}

function passwordRule(value: unknown): true | string {
  return typeof value === 'string' && value.length >= 8 ? true : t('register.passwordShort')
}

function onSubmit(payload: { valid: boolean }) {
  notice.value = payload.valid ? t('register.notice') : ''
}
</script>

<template>
  <section>
    <h1>{{ $t('register.title') }}</h1>
    <Form @submit="onSubmit">
      <label class="field" for="reg-name">
        {{ $t('register.name') }}
        <Input.Root id="reg-name" v-model="name" name="name" type="text" :label="t('register.name')" required>
          <Input.Control autocomplete="name" />
          <Input.Error v-slot="{ errors }">
            <span v-for="message in errors" :key="message">{{ message }}</span>
          </Input.Error>
        </Input.Root>
      </label>

      <label class="field" for="reg-email">
        {{ $t('register.email') }}
        <Input.Root
          id="reg-email"
          v-model="email"
          name="email"
          type="email"
          :label="t('register.email')"
          required
          :rules="[emailRule]"
        >
          <Input.Control autocomplete="email" />
          <Input.Error v-slot="{ errors }">
            <span v-for="message in errors" :key="message">{{ message }}</span>
          </Input.Error>
        </Input.Root>
      </label>

      <label class="field" for="reg-password">
        {{ $t('register.password') }}
        <Input.Root
          id="reg-password"
          v-model="password"
          name="password"
          type="password"
          :label="t('register.password')"
          required
          :rules="[passwordRule]"
        >
          <Input.Control autocomplete="new-password" />
          <Input.Error v-slot="{ errors }">
            <span v-for="message in errors" :key="message">{{ message }}</span>
          </Input.Error>
        </Input.Root>
      </label>

      <!-- Button.Root always sets type="button" and does not submit the form. -->
      <button type="submit">{{ $t('register.submit') }}</button>
    </Form>
    <p v-if="notice" class="notice">{{ notice }}</p>
  </section>
</template>
