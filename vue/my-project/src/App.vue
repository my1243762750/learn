<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <my-table :data="tableData">
      <my-table-column prop="date" sortable label="日期" width="100"></my-table-column>
      <my-table-column prop="name" label="姓名" width="100"></my-table-column>
      <my-table-column prop="address" label="地址" width="100"></my-table-column>
    </my-table>
  </div>
</template>

<script>
import MyTable from "./components/MyTable";
import MyTableColumn from "./components/MyTableColumn";

export default {
  name: 'App',
  components: {
    MyTable,
    MyTableColumn
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
