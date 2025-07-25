<script setup lang="ts">
import type { GuestEntry } from "~/types";

useSeoMeta({ title: "guestbook" });

const { find } = useStrapi();

const response = await find<GuestEntry>("guest-entries");
const entries = response.data as GuestEntry[];

const signer = ref();
const signerTiming = "0.75s";

function launchSigner() {
  signer.value.style.bottom = "0";
  document.body.style.overflow = "hidden";
}

function closeSigner() {
  signer.value.style.bottom = "-100%";
  document.body.style.overflow = "scroll";
}

async function submitData() {
  const name = document.forms["guestForm"]["name"].value;
  const text = document.forms["guestForm"]["text"].value;

  const { create } = useStrapi();

  await create<GuestEntry>("guest-entries", {
    name: name,
    date: Date.now(),
    text: text
  });

  console.log(name, text);
}
</script>

<template>
  <div class="overflow-x-hidden">
    <div id="background" />

    <div id="header">
      <img src="~/assets/guestbook/guestbookheader.png" alt="guest book" />
    </div>

    <div class="mb-40 flex h-full w-full flex-col items-center p-4">
      <GuestEntry
        v-for="entry in [...entries].reverse()"
        :key="entry.date"
        :entry="entry"
      />
    </div>

    <img
      id="sign-now"
      src="~/assets/guestbook/signnow.png"
      alt="sign now!"
      @click="launchSigner"
    />

    <div id="signer" ref="signer">
      <img src="~/assets/guestbook/guestbook.gif" alt="sign the guestbook" />

      <form name="guestForm">
        <!--      name tag thing!-->
        <div
          class="mb-8 flex h-40 w-full rotate-6 flex-col items-center rounded-3xl bg-red-700 p-4 shadow-[22px_22px_41px_4px_rgba(0,0,0,0.75)]"
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
          />
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

          <input type="submit" formmethod="post" class="bg-green-700 p-4 rounded-3xl" @click="submitData">
          <button class="bg-red-700 p-4 rounded-3xl" @click="closeSigner">🗙</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.invalid {
  @apply border-4 border-red-400 bg-red-400;
}

#signer {
  @apply p-6;
  position: fixed;
  width: 100vw;
  min-height: 100vh;

  bottom: -100%;
  background: url("~/assets/guestbook/pinkpaper.jpg") no-repeat center;
  transition: all v-bind(signerTiming) ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}

#sign-now {
  position: fixed;
  right: 0;
  bottom: 0;

  @apply mb-5;
  @apply max-h-40;
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
