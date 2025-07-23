<script setup lang="ts">

</script>

<template>
  <section>
    <div class="wave"/>
    <div id="fill"/>

    <div class="grid grid-cols-3 fixed max-w-full bottom-0 px-3">
      <img class="col-span-2" src="~/assets/callnow.gif" alt="call now!">
      <img class="self-center" src="~/assets/arrow.gif" alt="fun arrow">
    </div>

  </section>
</template>

<style scoped>
section {
  position: fixed;
  overflow: hidden;

  --height: 9rem;

  width: 100%;
  height: var(--height);
  bottom: 0;
}

#fill {
  background: #207420;
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: calc(var(--height) - 100px);
}

section .wave {
  top: 0;
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
    background-position-x: 1000px;
  }
}
</style>