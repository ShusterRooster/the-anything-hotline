<script setup lang="ts">
import type { GuestEntry } from "~/types";

useSeoMeta({ title: "guestbook" });

const { find } = useStrapi();

const response = await find<GuestEntry>("guest-entries");
const entries = response.data as GuestEntry[];

// for (const entry of entries) {
//   console.log(entry.date)
//   const date = Date.parse(entry.date as string)
//   console.log(date.valueOf())
// }

const showSigner = ref(false);
</script>

<template>
  <div class="overflow-x-hidden">
    <div id="background" />

    <div id="header">
      <img src="~/assets/guestbook/guestbookheader.png" alt="guest book" >
    </div>

    <div class="mb-40 flex flex-col items-center p-4">
      <GuestEntry
        v-for="entry in [...entries].reverse()"
        :key="entry.date.valueOf()"
        :entry="entry"
      />
    </div>

    <img
      id="sign-now"
      src="~/assets/guestbook/signnow.png"
      alt="sign now!"
      @click="showSigner = true"
    />

    <Teleport to="body">
      <div id="mask" ref="mask"/>
      <LazySigner :show="showSigner" @close="showSigner = false" />
    </Teleport>
  </div>
</template>

<style scoped>
#sign-now {
  position: fixed;
  right: 0;
  bottom: 0;

  @apply mb-5;
  @apply max-h-40;
  animation: 1s steps(2, end) infinite sign;
  transform-origin: right;
  filter: drop-shadow(16px 16px 8px rgba(0, 0, 0, 0.4));
}

@keyframes sign {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(5deg) scale(1.2) translateX(2%);
  }
}

#header {
  @apply p-4;
  @apply h-28;

  width: 100%;

  background: url("~/assets/guestbook/cardboard.png") no-repeat bottom;
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

  background: url("~/assets/guestbook/starbg.jpg") no-repeat center fixed;
  background-size: cover;
  filter: brightness(0.7);
  z-index: -1;
}
</style>
