<template>
  <div>
    <section class="row top">
      <div class="col-2 text-h5">Filoli</div>
      <div class="col-2 offset-8">Connect Wallet About</div>
    </section>
    <section class="row" style=" justify-content:  center; ">
      <div class="col" style="max-width: 220px;  ">
        <q-input
          filled
          bottom-slots
          v-model="text"
          label="Search"
          counter
          maxlength="20"
          :dense="dense"
        >
          <template v-slot:append>
            <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
            <q-icon name="search" />
          </template>

          <!-- <template v-slot:hint>Field hint</template> -->
        </q-input>
      </div>
    </section>
    <section class="banner">
      <div class="banner-img">banner</div>
    </section>
    <section>
      <div class="row">
        <div>Most viewed</div>
        <div>pics</div>
      </div>
      <div class="water-fall"></div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
    };
  },
};
</script>

<style>
.top: {
  align-items: baseline;
}
.banner {
  display: 'flex';
  position: 'relative';
  align-items: 'center';
  align-self: 'center';
  flex-direction: 'row';
  margin-top: '40px';
  background-image: 'linear-gradient(44.99999999999997deg, #0065F6 0%,#2F9BFF 100%)';
  overflow: 'hidden';
}
.banner-img {
  height: 160px;
  background-color: blue;
}
</style>