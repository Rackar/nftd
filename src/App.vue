<template>
  <router-view class="main-body" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
<style>
@media only screen and (min-width: 1200px) {
  .main-body {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
