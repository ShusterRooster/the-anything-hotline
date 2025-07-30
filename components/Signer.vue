<script setup lang="ts">
import type { GuestEntry } from "~/types";

const props = defineProps<{
  show: boolean;
}>();

async function submitData() {
  const name = document.forms["guestForm"]["name"].value;
  const text = document.forms["guestForm"]["text"].value;

  const { create } = useStrapi();

  await create<GuestEntry>("guest-entries", {
    name: name,
    date: Date.now(),
    text: text,
  });
}
</script>

<template>
  <div>
    <Transition name="mask">
      <div v-if="show" id="mask" @click="$emit('close')"/>
    </Transition>

    <Transition name="signer">
      <div v-if="show" id="signer" ref="signer">
        <div class="relative">

          <img class="absolute top-0 -translate-y-6" src="~/assets/guestbook/paperrip.png" alt="paper rip">

          <form name="guestForm" class="p-6 pt-12">
            <!--      name tag thing!-->
            <div
              class="mb-12 flex h-40 w-full rotate-6 flex-col items-center rounded-3xl bg-red-700 p-4 shadow-[22px_22px_41px_4px_rgba(0,0,0,0.75)]"
            >
              <div
                class="mb-4 h-3/4 content-center text-center font-sans text-2xl font-extrabold text-white"
              >
                <p>HELLO</p>
                <p>my name is</p>
              </div>

              <input
                name="name"
                class="h-1/2 w-full rounded-xl pl-2"
                placeholder="enter here!"
                minlength="1"
                maxlength="30"
                required
              >
            </div>

            <label for="text" class="mb-2 text-xl font-extrabold text-white">
              what would you like to say?
            </label>

            <textarea
              name="text"
              class="h-32 w-full rounded-3xl pl-2"
              minlength="1"
              maxlength="256"
              required
            />

            <div class="flex gap-6">
              <input
                type="submit"
                formmethod="post"
                class="rounded-3xl bg-green-700 p-4"
                @click="submitData"
              >
              <button
                type="reset"
                class="rounded-3xl bg-red-700 p-4"
                @click="$emit('close')"
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.signer-enter-active,
.signer-leave-active {
  transition: transform 0.5s ease-in-out;
}

.signer-enter-from,
.signer-leave-to {
  transform: translateY(120%);
}

.mask-enter-active,
.mask-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.mask-enter-from,
.mask-leave-to {
  opacity: 0;
}

#signer {
  position: fixed;
  width: 100vw;
  max-height: 100%;
  bottom: 0;

  background: url("~/assets/guestbook/pinkpaper.jpg") no-repeat center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  z-index: 9999;
  overflow: visible;
}

#mask {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
}
</style>
