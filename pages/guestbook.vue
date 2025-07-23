<script setup lang="ts">
import type { GuestEntry } from "~/types";

const { find } = useStrapi();

const response = await find<GuestEntry>("guest-entries");
const entries = response.data as GuestEntry[];
</script>

<template>
  <div>
    <div id="background" />

    <div id="header">
      <img src="~/assets/guestbookheader.png" alt="guest book">
    </div>

    <div class="flex h-full w-full flex-col items-center overflow-x-hidden p-4">
      <GuestEntry
        v-for="entry in [...entries].reverse()"
        :key="entry.date"
        :entry="entry"
      />
    </div>

    <img src="~/assets/signhere.png" alt="speech bubble">
  </div>
</template>

<style scoped>
#header {
  @apply p-4;
  @apply h-28;
  width: 100%;

  background: url("~/assets/cardboard.png") no-repeat bottom;
  background-size: cover;
}

.entry:first-child {
  @apply mt-4;
}

.entry:nth-child(even) {
  transform: rotate(5deg);
}

.entry:nth-child(odd) {
  transform: rotate(-5deg);
}

#background {
  position: fixed;
  width: 100vw;
  height: 100vh;

  top: 0;

  background: url("~/assets/starbg.jpg") no-repeat center fixed;
  background-size: cover;
  filter: brightness(0.7);
  z-index: -1;
}
</style>
