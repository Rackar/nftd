<template>
  <div class="table">
    <div class="table-title">
      <div class="table-title-investor">Investors</div>
      <div class="table-title-bought">Bought</div>
      <div class="table-title-time">Time</div>
    </div>
    <div class="table-content" v-for="row in buyers" :key="row.id">
      <div class="table-title-investor">
        {{
        row.Buyer.substr(0, 5) + '...' + row.Buyer.substr(-3, 5)
        }}
      </div>
      <div class="table-title-bought">{{row.count}}</div>
      <div class="table-title-time">{{new Date(row.updatedAt).toLocaleString()}}</div>
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
  /* width: 400px; */
}
.table-title {
  font-size: 16px;
  /* display: flex; */
  color: #4b4b4b;
  /* justify-content: space-between; */
  border-bottom: 1px gainsboro solid;
}
.table-content {
  font-size: 16px;
  color: #4b4b4b;
  line-height: 30px;
  border-bottom: 1px gainsboro solid;
}
.table-title-investor {
  display: inline-block;
  width: 150px;
}
.table-title-bought {
  display: inline-block;
  width: 100px;
}
.table-title-time {
  display: inline-block;
  width: 200px;
}
@media only screen and (max-width: 1024px) {
  .table-title-investor {
    display: inline-block;
    width: 100px;
  }
  .table-title-bought {
    display: inline-block;
    width: 60px;
  }
  .table-title-time {
    display: inline-block;
  }
}
</style>