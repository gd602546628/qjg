<template>
  <div class="add-coupon">
    <div class="in-btn" @click="importFile">导入卡券</div>
    <input type="file" hidden ref="import_input" @change="fileChange($event)"/>
    <commonTable :tableHeader="tableHeader" :table-data="tableData" :hide-delete="true"></commonTable>
    <div class="btn-group">
      <div class="q-btn-confirm" @click.stop="addCard">保存</div>
    </div>
  </div>
</template>

<script>
  import commonTable from '../../../component/table'
  import XLSX from 'xlsx'
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
        ]
      }
    },
    created() {

    },
    methods: {
      importFile() {
        this.$refs.import_input.click()
      },
      fileChange(e) {
        console.log(e)
        let f = e.target.files[0]
        let reader = new FileReader()
        let rABS = false
        let wb = null
        reader.onload = (e) => {
          let data = e.target.result
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(data, {
              type: 'binary'
            })
          }
          //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
          //wb.Sheets[Sheet名]获取第一个Sheet的数据
          let result = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          if (result.length === 0) {
            this.$message.error('导入数据为空')
            return
          }
          let flag = result[0].code && result[0].password && result[0].money && result[0].name
          if (!flag) {
            this.$message.error('导入格式不正确')
            return
          }
          this.tableData = result
        }
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      fixdata(data) {
        let o = "",
          l = 0,
          w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
      },
      async addCard() {
        if (this.tableData.length === 0) {
          this.$message.error('请导入卡券')
        } else {
          let data = await Api.card.add(this.tableData)
          if (code.SUCCESS === data.code) {
            this.$message.success('保存成功')
          } else {
            this.$message.error(data.mesg)
          }
        }
      }
    }
  }
</script>

<style lang='scss' type="text/scss" rel='stylesheet/scss' scoped>
  .add-coupon {
    padding: 10px;
    .in-btn {
      background: #fe842b;
      color: #ffffff;
      height: 28px;
      width: 140px;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .btn-group {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
