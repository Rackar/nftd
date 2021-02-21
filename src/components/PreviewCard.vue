<template>
  <q-card class="my-card">
    <q-img src="https://cdn.quasar.dev/img/mountains.jpg">
      <div class="absolute-bottom text-h6">Title</div>
    </q-img>
    <q-card-section>这是一个NFT团购信息的预览</q-card-section>

    <q-card-actions align="right">
      <q-btn flat round color="red" icon="favorite" />
      <q-btn flat round color="teal" icon="bookmark" />
      <q-btn flat round color="primary" icon="share" />
    </q-card-actions>
    <q-card-actions align="left">总价10/100,token: 0/100,截止时间5天</q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PreviewCard',
  props: {
    title: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style>
.my-card {
  width: 100%;
  max-width: 320px;
  margin: 20px 12px;
}
</style>
