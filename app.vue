<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
const { find } = useStrapi();

type Global = {
  siteName: string;
  siteDescription: string;
};

const response = await find<Global>("global", {
  populate: "*",
});
const entries = response.data;
console.log(entries);
</script>

<template>
  <Analytics/>
  <NuxtPage />
</template>

<style scoped></style>
