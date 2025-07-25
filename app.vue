<script setup lang="ts">
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
  <NuxtPage />
</template>

<style scoped></style>
