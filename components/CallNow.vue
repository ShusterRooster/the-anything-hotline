<script setup lang="ts">

</script>

<template>
  <section>
    <div class="wave"/>
    <div id="fill"/>

    <div class="grid grid-cols-3 absolute max-w-full bottom-0 px-3">
      <img class="col-span-2" src="~/assets/callnow.gif" alt="call now!">
      <img class="self-center" src="~/assets/arrow.gif" alt="fun arrow">
    </div>

  </section>
</template>

<style scoped>
section {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  --offset: 4rem;
}

#fill {
  background: #207420;
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: var(--offset);
}

section .wave {
  position: absolute;
  bottom: var(--offset);
  left: 0;
  width: 100%;
  height: 100px;
  background: url("~/assets/wave2.png");
  background-size: 1000px 100px;

  animation: wave 5s linear infinite;
}

@keyframes wave {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -1000px;
  }
}
</style>