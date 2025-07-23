<script setup lang="ts">
const { find } = useStrapi();

interface About {
  title: string;
  blocks: [object];
}

const response = await find<About>("About", {
  populate: ["blocks"],
});
const about = response.data.blocks!;
// console.log(about)
</script>

<template>
  <div
    id="container"
    class="flex flex-col items-center overflow-hidden font-[Unbounded]"
  >
    <div id="background" />

    <img
      class="w-full"
      src="~/assets/the%20anything%20hotline.png"
      alt="the anything hotline"
    >

    <div class="flex flex-col items-center px-8 py-8">
      <div class="mb-8" v-for="data in about">
        <MDC :value="data.body" />
      </div>

    </div>

    <div class="relative flex flex-col items-center">
      <img id="guestbook" src="~/assets/guestbook.png" alt="sign my guestbook">
      <NuxtLink to="/guestbook" class="absolute w-full h-full"/>
    </div>

    <CallNow />
  </div>
</template>

<style scoped>
#container {
  width: 100vw;
  height: 100vh;
  margin-bottom: 12rem;
}

#guestbook {
  width: 90%;
  animation: 1s steps(2, end) infinite guestbook;
}

@keyframes guestbook {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(25deg);
  }
}

#background {
  position: fixed;
  width: 110vw;
  height: 110vh;

  background: url("~/assets/pink/pinkpattern3.gif") repeat;
  filter: brightness(0.75) blur(6px);
  transform: translateY(-5vw);
  z-index: -1;
}
</style>