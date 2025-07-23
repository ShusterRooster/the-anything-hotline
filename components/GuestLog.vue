<script setup lang="ts">
const { find } = useStrapi()

type GuestEntry = {
  name: string
  date: string
  text: string
};


const response = await find<GuestEntry>("guest-entries")

const entries = response.data as GuestEntry[]
console.log(entries)

function formatDate(date: string) {
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
  const d = new Date(date)
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} @ ${formatTime(d)}`
}

function formatTime(date: Date) {
  const hours = date.getHours()
  const isPM = hours > 12
  return `${isPM ? hours - 12 : hours}:${date.getMinutes()} ${isPM ? 'pm' : 'am'}`
}


</script>

<template>
  <div class="h-full w-full">
    <div id="machine">
      <div id="display">
        <div
          v-for="entry in entries"
          :key="entry.date"
          class="font-mono text-lime-700"
        >
          <p class="border-lime-700 border-l-4 pl-2 font-bold">{{ entry.text }}</p>
          <p>- {{ entry.name }}</p>
          <p class="text-sm line-clamp-1">{{ formatDate(entry.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#machine {
  display: flex;
  justify-content: center;
  position: relative;

  max-width: 100%;
  max-height: 100%;

  object-fit: contain;
  aspect-ratio: 489 / 833;

  background: url("~/assets/guestlogs.png") no-repeat center;
  background-size: contain;
}

#display {
  position: absolute;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  background-color: rgba(12, 12, 12, 0.8);
  text-wrap: wrap;

  border-radius: 10px;

  left: 18.5%;
  top: 32.2%;
  width: 64.9%;
  height: 29.6%;
}
</style>