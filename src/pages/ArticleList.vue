<template>
  <div>
    
<PreviewCard v-for="item in 4" :key="item.key" />
  </div>
</template>

<script lang="ts">
import PreviewCard from 'components/PreviewCard.vue'
import {
  defineComponent,
  PropType,
  computed,
  ref,
  toRef,
  Ref,
} from 'vue';

export default defineComponent({
  name: 'ArticleList',
  components: {
    PreviewCard,
  },
  props: {
    title: {
      type: String,
      required: true
    },
   
    active: {
      type: Boolean
    }
  },
  setup() {
      let list=[{
            
        }]
    return { 
        list
     };
  },
});
</script>
