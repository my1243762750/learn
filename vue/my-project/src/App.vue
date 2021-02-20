<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <my-table :data="tableData">
      <my-table-column prop="date" sortable label="日期" width="100"></my-table-column>
      <my-table-column prop="name" label="姓名" width="100"></my-table-column>
      <my-table-column prop="address" label="地址" width="100"></my-table-column>
    </my-table>
    <!--后备内容-->
    <submit-button></submit-button>
    <submit-button>Save</submit-button>
    <!--2.6.0 v-slot-->
    <layout>
      <template v-slot:header>
        <div>header</div>
      </template>
      <!--v-slot可以缩写为#-->
      <template #default>
        <div>body</div>
      </template>
      <!--这种方式取代 slot 和 scope-slot-->
      <!--动态插槽 暂时不演示-->
      <template v-slot:footer="{msg, age}">
        <div>footer {{ msg }} {{ age }}</div>
      </template>
    </layout>
    <br>
    <!--2.6.0 v-slot-->
    <layout v-slot="obj">
      {{ obj }}
    </layout>
    <br>
    <!--2.6.0以前 废弃的语法 slot-->
    <layout>
      <template slot="header">
        <div>header</div>
      </template>
      <template>
        <div>body</div>
      </template>
      <template slot="footer">
        <div>footer</div>
      </template>
    </layout>
    <br>
    <!--2.6.0以前 废弃的语法 slot-scope-->
    <layout>
      <template slot="header" slot-scope="obj">
        <div>header {{ obj }}</div>
      </template>
      <template>
        <div>body</div>
      </template>
      <template slot="footer">
        <div>footer</div>
      </template>
    </layout>
  </div>
</template>

<script>
import MyTable from "./components/MyTable";
import MyTableColumn from "./components/MyTableColumn";
import SubmitButton from "./components/Button";
import Layout from "./components/Layout";

export default {
  name: 'App',
  components: {
    MyTable,
    MyTableColumn,
    SubmitButton,
    Layout
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
