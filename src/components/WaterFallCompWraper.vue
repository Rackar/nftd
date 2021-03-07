<template>
  <div>
    <WaterFallComp :data="list" @loadMore="fetchMore" />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import WaterFallComp from './WaterFallComp';

export default {
  name: 'WaterFallComponent',
  components: {
    WaterFallComp,
  },
  // emits: {
  //   loadMore: () => {
  //     console.log('res');
  //     let newdata = [
  //       {
  //         key: '12',
  //         v: 1,
  //         src: 'assets/images/b1.png',
  //         artist: 'Picasso',
  //         info:
  //           'Bull. Screenprint in colors with embossing on Arches Cover paper',
  //         price: 12000,
  //       },
  //     ];
  //     list.value = [...list.value, ...newdata];
  //   },
  // },

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
    function fetchMore() {
      console.log('res');
      let newdata = [
        {
          key: '12',
          v: 1,
          src: 'assets/images/b1.png',
          artist: 'Picasso',
          info:
            'Bull. Screenprint in colors with embossing on Arches Cover paper',
          price: 12000,
        },
      ];
      list.value = [...list.value, ...newdata];
    }

    // onMounted(() => {});
    return {
      list,
      fetchMore,
      // loadMore,
    };
  },
};
</script>

<style>
</style>