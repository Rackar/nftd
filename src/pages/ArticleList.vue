<template>
  <div class="row">
    <div class="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
      <div style="padding:10px 10px;" v-for="item in 4" :key="item.key">
        <PreviewCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PreviewCard from 'components/PreviewCard.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArticleList',
  components: {
    PreviewCard,
  },
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
    let list = [{}];
    return {
      list,
    };
  },
});
</script>
