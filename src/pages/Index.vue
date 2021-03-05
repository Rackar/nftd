<template>
  <q-page class="column">
    <h3>info title {{t("index.title")}}</h3>
    <div>
      <router-link to="/add">
        <q-btn color="white" text-color="black" label="start" />
      </router-link>
    </div>

    <div class="row">
      <div class="col">
        <div>当前</div>
        <PieCharts />
      </div>
      <div class="col">
        <div>总</div>
        <KlineCharts />
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { Todo, Meta } from 'components/models';
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import PieCharts from 'components/PieCharts.vue';
import KlineCharts from 'components/KlineCharts.vue';

// import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'PageIndex',
  components: {
    PieCharts,
    KlineCharts,
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t } = useI18n();
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
    return { todos, meta, t };
  },
});
</script>
