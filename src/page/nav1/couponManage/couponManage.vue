<template>
  <div class="coupon-manage">
    <div class="title">卡券管理</div>
    <div class="select-form">
      <div class="form-left">
        <div class="form-item">
          <span>券码：</span>
          <el-input placeholder="请输入券码" class="input" v-model="selectOption.code"></el-input>
        </div>
        <div class="form-item">
          <span>密码：</span>
          <el-input placeholder="请输入密码" class="input" v-model="selectOption.password"></el-input>
        </div>
        <div class="form-item">
          <span>状态：</span>
          <el-select v-model="selectOption.status">
            <el-option label="未核销" :value="0"></el-option>
            <el-option label="已核销" :value="1"></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-right">
        <el-button type="primary" class="select-btn" icon="el-icon-search" @click.stop="select">检索</el-button>
      </div>
    </div>
    <common-table
      :table-header="tableHeader"
      :table-data="tableData"
      :hide-delete="true"
      :showOperation="true"
    ></common-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="this.selectOption.pageSize"
        :page-count="pageCount"
        @current-change="loadPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import commonTable from '../../../component/table'
  import Api from '../../../api/api'
  import {code} from '../../../config/config'

  export default {
    components: {
      commonTable
    },
    data() {
      return {
        tableData: [],
        tableHeader: [
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '券码',
            prop: 'code'
          },
          {
            label: '密码',
            prop: 'password'
          },
          {
            label: '金额',
            prop: 'money'
          },
          {
            label: '状态',
            prop: 'statusLabel'
          }
        ],
        selectOption: {
          pageNum: 1,
          pageSize: 10,
          password: '',
          status: '',
          code: ''
        },
        operation: [{
          label: '删除',
          color: '#ff5656',
          handle: this.deleteHandle,
        }],
        total: 0,
        pageCount: 0,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        let data = await Api.card.getList(this.selectOption)
        this.total = data.data.allCount
        this.pageCount = data.data.totalPage
        data.data.list.forEach(item => {
          item.operation = this.operation
          if (item.status === 0) {
            item.statusLabel = '未核销'
          } else {
            item.statusLabel = '已核销'
          }
        })
        this.tableData = data.data.list
      },
      async select() {
        this.selectOption.pageNum = 1
        this.getList()
      },
      loadPage(page) {
        this.selectOption.pageNum = page
        this.getList()
      },
      async deleteHandle(index, item) {
        let data = await Api.card.deleteById({
          id: item.id
        })
        if (data.code === code.SUCCESS) {
          this.tableData.splice(index, 1)
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      }
    }
  }
</script>

<style lang='scss' type="text/scss" rel='stylesheet/scss' scoped>
  .coupon-manage {
    padding: 20px;
    .title {
      color: #525252;
    }
    .select-form {
      background: #e7ecf2;
      border-radius: 6px;
      padding: 16px;
      margin: 20px 0;
      display: flex;
      .form-left {
        flex: 1;
        display: flex;
        .form-item {
          display: flex;
          align-items: center;
          margin-right: 10px;
          .input {
            width: 200px;
            margin-left: 12px;
          }
        }
        .date-picker {
          margin-top: 12px;
          .wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            .picker {
              margin-left: 10px;
              width: 200px;
            }
            .line {
              width: 18px;
              height: 2px;
              background: #cacbd0;
              margin-left: 10px;
            }
          }
        }
      }
      .form-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .add-btn {
          background: #fe842b;
          border: none;
          width: 150px;
        }
        .select-btn {
          background: #07c362;
          margin: 12px 0 0 0;
          border: none;
          width: 150px;
        }
      }
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
