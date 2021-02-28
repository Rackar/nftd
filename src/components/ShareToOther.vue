<template>
  <q-card class="my-card">
    <q-card-actions align="left"></q-card-actions>
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
  /* max-width: 320px; */
  /* padding: 20px 12px; */
}
</style>
