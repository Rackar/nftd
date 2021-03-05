<template>
  <WaterFallComp :data="list" />
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import WaterFallComp from './WaterFallComp';

export default {
  name: 'WaterFallComponent',
  components: {
    WaterFallComp,
  },

  setup() {
    let list = ref([
      {
        key: '12',
        v: 1,
        src: 'assets/images/art1.jpg',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '13',
        v: 2,
        src: 'assets/images/art2.jpg',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
    ]);

    // onMounted(() => {});
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
      list,
    };
  },
};
</script>

<style>
</style>