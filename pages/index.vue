<script setup lang="ts">
import type {Article} from '~/types'

const {find} = useStrapi()

// const response = await find<Article>('articles', {
//   populate: ["blocks"]
// })
// console.log(response.data)
// console.log(response.data[0].blocks)

interface About {
  title: string
  blocks: [object]
}
const response = await find<About>('About', {
  populate: ["blocks"]
})
const about = response.data.blocks!
// console.log(about)
</script>

<template>
  <div id="container" class="flex flex-col items-center font-unbounded">
    <div id="background"/>

    <img class="w-full" src="~/assets/the%20anything%20hotline.png" alt="the anything hotline">

    <div class="px-8 py-8" v-for="data in about">
      <MDC :value="data.body"/>
    </div>

    <CallNow/>
  </div>
</template>

<style scoped>
#container {
  width: 100vw;
  height: 100vh;
}

#background {
  position: fixed;
  width: 100vw;
  height: 100vh;

  background: url("~/assets/pink/pinkpattern3.gif") repeat fixed;
  z-index: -1;
}
</style>