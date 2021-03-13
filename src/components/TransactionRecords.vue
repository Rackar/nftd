<template>
  <div class="table">
    <div class="table-title">
      <div class="table-title-investor">Investors</div>
      <div class="table-title-bought">Bought</div>
      <div class="table-title-time">Time</div>
    </div>
    <div class="table-content" v-for="row in buyers" :key="row.id">
      <div class="table-content-investor">
        {{
        row.Buyer.substr(0, 5) + '...' + row.Buyer.substr(-3, 5)
        }}
      </div>
      <div class="table-content-bought">{{row.count}}</div>
      <div class="table-content-time">{{row.updatedAt.toLocaleString().substr(0,19)}}</div>
    </div>
    <!-- <div>1 2 3 11</div> -->
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  name: 'TransactionRecords',
  props: {
    buyers: Array,
  },

  setup() {
    let list = ref([
      {
        key: '11',
        investor: '0x...117d',
        bought: 40,
        time: '01.12.2020 / 09:00 am',
      },
      {
        key: '12',
        investor: '0x...117d',
        bought: 40,
        time: '01.12.2020 / 09:00 am',
      },
      {
        key: '13',
        investor: '0x...117d',
        bought: 40,
        time: '01.12.2020 / 09:00 am',
      },
      {
        key: '14',
        investor: '0x...117d',
        bought: 40,
        time: '01.12.2020 / 09:00 am',
      },
      {
        key: '15',
        investor: '0x...117d',
        bought: 40,
        time: '01.12.2020 / 09:00 am',
      },
    ]);

    // onMounted(() => {});
    return {
      list,
    };
  },
};
</script>

<style>
.table {
  width: 400px;
}
.table-title {
  font-size: 16px;
  display: flex;
  color: #4b4b4b;
  justify-content: space-between;
  border-bottom: 1px gainsboro solid;
}
.table-content {
  font-size: 16px;
  display: flex;
  color: #4b4b4b;
  justify-content: space-between;
  line-height: 30px;
  border-bottom: 1px gainsboro solid;
}
</style>