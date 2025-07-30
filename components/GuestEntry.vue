<script setup lang="ts">
import type { GuestEntry } from "~/types";

const props = defineProps<{
  entry: GuestEntry
}>();

const hueRotate = Math.floor(Math.random() * (360 + 1)) + 'deg';

function formatDate(date: string) {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]
  const d = new Date(date)
  return `${formatTime(d)} @ ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

function formatTime(date: Date) {
  const hours = date.getHours()
  const mins = date.getMinutes()
  const isPM = hours > 12

  return `${isPM ? hours - 12 : hours}:${mins < 10 ? `0${mins}` : mins} ${isPM ? "pm" : "am"}`
}
</script>

<template>
  <div class="entry">
    <img id="tape1" class="tape" src="../assets/guestbook/tape.png" alt="tape">
    <img id="tape2" class="tape" src="../assets/guestbook/tape.png" alt="tape">

    <p class="border-l-4 border-black pl-2 font-bold">{{ entry.text }}</p>
    <p>- {{ entry.name }}</p>
    <p class="line-clamp-1 text-sm">{{ formatDate(entry.date) }}</p>
  </div>
</template>

<style scoped>
.entry {
  @apply p-6;
  @apply my-8;
  @apply rounded-md;

  display: flex;
  flex-direction: column;

  position: relative;
  max-width: 85%;
  min-width: 45%;

  background: url("~/assets/guestbook/paper.jpg") no-repeat center fixed;
  background-size: cover;
  font-family: "Gloria Hallelujah", cursive;

  box-shadow: 19px 17px 37px -1px rgba(0,0,0,0.74);
}

.tape {
  position: absolute;
  width: 30%;

  filter: hue-rotate(v-bind(hueRotate));
}

#tape1 {
  top: -5%;
  right: -10%;
  transform: rotate(35deg);
}

#tape2 {
  bottom: -6%;
  left: -12%;
  transform: rotate(-325deg);
}
</style>