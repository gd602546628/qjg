<template>
  <div class="advManage-page">
    <div class="header">
      <div class="title">账号管理</div>
      <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="goAdd">添加广告</el-button>
    </div>
    <q-table :tableHeader="tableHeader" :tableData="tableData" :showOperation="true" @deleteAll="deleteAll"></q-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="loadPage"
      >
      </el-pagination>
    </div>
  </div>
</template>


<script>
  import qTable from '@/component/table.vue'
  export default{
    components: {
      qTable
    },
    data(){
      return {
        tableHeader: [
          {
            label: '标题',
            prop: 'title'
          },
          {
            label: '添加时间',
            prop: 'createTime'
          },
          {
            label: '发布状态',
            prop: 'status'
          },
          {
            label: '浏览量',
            prop: 'viewCount'
          }
        ],
        tableData: [
          {
            title: '奔驰全新宣传片',
            createTime: '2017-11-23 15:23',
            status: '已发布',
            viewCount: '28'
          }
        ],
        operationPublic: [
          {
            label: '查看',
            color: '#20a7fe',
            handle: this.look,
          },
          {
            label: '置顶',
            color: '#07c362',
            handle: this.toTop,
          },
          {
            label: '撤销',
            color: '#f6781d',
            handle: this.stop,
          },
          {
            label: '修改',
            color: '#adadad',
            handle: null,
          },
          {
            label: '删除',
            color: '#adadad',
            handle: null,
          }
        ],
        operationUnPublic: [
          {
            label: '查看',
            color: '#20a7fe',
            handle: this.look,
          },
          {
            label: '置顶',
            color: '#07c362',
            handle: this.toTop,
          },
          {
            label: '发布',
            color: '#20a7fe',
            handle: this.start,
          },
          {
            label: '修改',
            color: '#20a7fe',
            handle: this.edit,
          },
          {
            label: '删除',
            color: '#ff5656',
            handle: this.delete,
          }
        ],
      }
    },
    created(){
      this.tableData[0].operation = this.operationUnPublic
    },
    methods: {
      look(index, item){ // 查看
        console.log('查看')
      },
      edit(index, item){ // 修改
        console.log('修改')
      },
      stop(index, item){ // 撤销
        console.log('撤销')
      },
      delete(index, item){ // 删除
        console.log('删除')
      },
      start(index, item){ // 发布
        console.log('发布')
      },
      toTop(index, item){ // 置顶
        console.log('置顶')
      },
      deleteAll(arr){ //删除所选
        console.log(arr)
      },
      goAdd(){ //跳转添加
        this.$router.push({
          name: 'addAdvertise'
        })
      },
      loadPage(currentPage){ // 点击分页器
        console.log(currentPage)
      },
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .advManage-page {
    padding: 20px;
    .header {
      display: flex;
      margin-bottom: 20px;
      .title {
        color: #525252;
        flex: 1;
      }
      .add-btn {
        background: #fe842b;
        border: none;
        width: 150px;
      }
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
