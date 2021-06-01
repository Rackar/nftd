<template>
  <div class="table">
    <div class="table-title">
      <div class="table-title-investor">Investors</div>
      <div class="table-title-bought">Bought</div>
      <div class="table-title-time">Time</div>
    </div>
    <div class="table-content" v-for="row in buyers" :key="row.id">
      <div class="table-title-investor">
        <q-avatar
          size="18px"
          font-size="16px"
          color="teal"
          text-color="white"
          icon="person"
          class="table-title-investor-avatar"
        ></q-avatar>
        <span class="table-title-investor-id">
          {{
          row.Buyer.substr(0, 5) + '...' + row.Buyer.substr(-3, 5)
          }}
        </span>
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
  padding: 14px 10px;
}
.table-content {
  font-size: 14px;
  padding: 20px 10px;
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
  width: 140px;
}
.table-title-time {
  display: inline-block;
  width: 200px;
}
.table-title-investor-avatar {
  top: -4px;
}
.table-title-investor-id {
  padding-left: 12px;
}
@media only screen and (max-width: 1440px) {
  .table-title-investor {
    display: inline-block;
    width: 140px;
  }
  .table-title-bought {
    display: inline-block;
    width: 80px;
  }
  .table-title-time {
    display: inline-block;
  }
  .table-title-investor-id {
    padding-left: 8px;
  }
}
@media only screen and (max-width: 1024px) {
  .table-title-investor {
    display: inline-block;
    width: 100px;
  }
  .table-title-investor-avatar {
    display: none;
  }
  .table-title-bought {
    display: inline-block;
    width: 60px;
  }
  .table-title-time {
    display: inline-block;
  }
  .table-title-investor-id {
    padding-left: 0;
  }
}
</style>