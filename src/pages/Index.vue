<template>
  <q-page class="column">
    <h3>这里是项目介绍，以及静态图片</h3>
    <div>
      <router-link to="/add">
        <q-btn color="white" text-color="black" label="我要发起众筹" />
      </router-link>
    </div>

    <div class="row">
      <div class="col">
        <div>当前众筹项目</div>
        <PieCharts />
      </div>
      <div class="col">
        <div>可交易项目</div>
        <KlineCharts />
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { Todo, Meta } from 'components/models';
import { defineComponent, ref } from 'vue';
import PieCharts from 'components/PieCharts.vue';
import KlineCharts from 'components/KlineCharts.vue';
export default defineComponent({
  name: 'PageIndex',
  components: {
    PieCharts,
    KlineCharts,
  },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    return { todos, meta };
  },
});
</script>
