<template>
  <div class="page-wrap">
    <div class="project-category-manage-box">
      <el-scrollbar class="scroll-bar">
        <div class="scroll-bar-content">
          <div class="title">分类管理</div>
          <!--  <div class="add-category">
              <span class="el-icon-plus"></span>
              <div>添加分类</div>
            </div>-->
          <el-cascader
            style="margin:20px 0"
            placeholder="试试搜索：玉溪"
            :options="q_cityInfo"
            filterable
            :props="cityInfoProp"
            expand-trigger="hover"
            @change="selectCity"
            :value="defaultAreaSelect"
          ></el-cascader>
          <ul class="category-list">
            <li v-for="(item,index) in areaList"
                :class="{active:currentAreaIndex==index}"
                @click="areaSelectClick(item,index)"
                :key="index"
            >{{item.name}}
            </li>
          </ul>
        </div>
      </el-scrollbar>
    </div>
    <div class="category-manage">
      <div class="select-form">
        <div class="form-left">
          <div class="form-item">
            <div>
              <span>项目名称：</span>
              <el-input placeholder="请输入角色名称"
                        class="input"
                        v-model="selectOption.name"
                        style="margin-left: 5px"
              ></el-input>
            </div>
            <div style="margin-left: 20px">
              <span>项目分类：</span>
              <el-select placeholder="请选择项目分类" v-model="selectOption.cateId">
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="item in cateList"
                  :key="item.name"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-item date-picker">
            <div class="wrap">
              <span>创建时间：</span>
              <el-date-picker
                v-model="selectOption.startTime"
                type="datetime"
                placeholder="选择开始时间"
                class="picker"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
              <span class="line"></span>
              <el-date-picker
                v-model="selectOption.endTime"
                type="datetime"
                placeholder="选择结束时间"
                class="picker"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="form-right">
          <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="addProject">添加项目</el-button>
          <el-button type="primary" class="select-btn" icon="el-icon-search" @click.stop="select">检索</el-button>
        </div>
      </div>
      <q-table :tableHeader="tableHeader" :tableData="tableData" :showOperation="true" :hideDelete="true"></q-table>
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
    <common-model title="添加项目" :show="showModel" @closeModel="closeModel" class="model-form">
      <el-form class="form" :model="formData" :rules="rules" ref="addForm">

        <el-form-item label="项目名称：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>

        <el-form-item label="项目分类：" prop="category">
          <el-select v-model="formData.category" placeholder="请选择项目分类">
            <el-option :label="item.name" :value="item" v-for="item in cateList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目图片：" prop="imageUrl">
          <div class="upload-box">
            <!--  <p class="pro-image">项目图片：</p>-->
            <el-upload
              class="avatar-uploader"
              :action="pro_uploadImage"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
              <span v-if="!formData.imageUrl" class="el-icon-plus avatar-uploader-icon"></span>
            </el-upload>
          </div>
        </el-form-item>

      </el-form>
      <div class="btn-group">
        <div class="q-btn-confirm" @click.stip="addProjectConfirm">确定</div>
        <div class="q-btn-cancel" @click="closeModel()">取消</div>
      </div>
    </common-model>

    <common-model title="修改项目" :show="showModifyModel" @closeModel="closeModel" class="model-form">
      <el-form class="form" :model="formData" :rules="rules" ref="modifyForm">

        <el-form-item label="项目名称：" prop="name">
          <el-input v-model="formData.name" :placeholder="currentPro.name"></el-input>
        </el-form-item>

        <el-form-item label="项目分类：" prop="category">
          <el-select v-model="formData.category" :placeholder="currentPro.cateName">
            <el-option :label="item.name" :value="item" v-for="item in cateList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <div class="q-btn-confirm" @click.stip="modifyProjectConfirm">确定</div>
        <div class="q-btn-cancel" @click="closeModel()">取消</div>
      </div>
    </common-model>
  </div>
</template>
<script>
  import qTable from '@/component/table.vue'
  import commonModel from '@/component/commonModel.vue'
  import Api from '@/api/api'
  import {mapGetters} from 'vuex'
  import {filePre, code} from '@/config/config'
  export default{
    components: {
      qTable,
      commonModel
    },
    computed: {
      ...mapGetters(['q_cityInfo', 'pro_uploadImage'])
    },
    data(){
      return {
        cityInfoProp: {
          label: 'name',
          value: 'id',
          children: 'nextArea'
        },
        selectOption: {
          cateId: null,
          endTime: null,
          name: null,
          pageNum: 1,
          pageSize: 20,
          startTime: null,
          areaId: null
        },
        pageCount: 1,
        total: 1,
        name: '',
        startTime: '',
        endTime: '',
        showModel: false,
        showModifyModel: false,
        tableHeader: [
          {
            label: '项目名称',
            prop: 'name'
          },
          {
            label: '全景图片',
            prop: 'sourceNum'
          },
          {
            label: '创建时间',
            prop: 'createTime'
          }
        ],
        tableData: [],
        operation: [
          {
            label: '查看',
            color: '#20a7fe',
            handle: this.look,
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
        formData: {
          name: '',
          category: '',
          imageUrl: ''
        },
        rules: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}],
          category: [{required: true, message: '请选择一个分类', trigger: 'change'}],
          imageUrl: [{required: true, message: '请上传图片', trigger: 'change'}]
        },
        areaList: [],
        defaultAreaSelect: [], // 默认行政区域选择
        currentAreaIndex: -1, // 选择的区域索引
        cateList: [],
        addFlag: false, //标记是否正在添加，防止重复添加
        currentPro: {} // 当前操作的项目obj
      }
    },
    async created(){
      this.getCateList()
      this.defaultAreaSelect = [this.q_cityInfo[0].id,
        this.q_cityInfo[0].nextArea[0].id,
        this.q_cityInfo[0].nextArea[0].nextArea[0].id
      ]
      await this.getAreaList(this.defaultAreaSelect)
      this.selectOption.areaId = this.areaList[0].id
      this.currentAreaIndex = 0
      this.getObjectList()
    },
    methods: {
      async getCateList(){
        let data = await Api.cate.getList()
        this.cateList = data.data
      },
      look(index, item){
        this.$router.push({
          name: 'lookProject',
          params: {
            id: item.id
          }
        })
      },
      edit(index, item){
        this.currentPro = item
        this.showModifyModel = true
      },
      async delete(index, item){
        let data = await Api.sourceObject.deleteById({
          id: item.id
        })
        if (data.code === code.SUCCESS) {
          this.$message.success('删除成功')
          this.tableData.splice(index, 1)
        } else {
          this.$message.error(data.mesg)
        }
      },
      addProject(){ // 添加项目
        this.showModel = true
      },
      closeModel(){
        this.showModel = false
        this.showModifyModel = false
        this.formData = {
          name: '',
          category: '',
          imageUrl: ''
        }
      },
      loadPage(currentPage){
        this.selectOption.pageNum = currentPage
        this.getObjectList()
      },
      select(){ // 检索
        this.selectOption.pageNum = 1
        this.getObjectList()
      },
      async getObjectList(){
        let data = await Api.sourceObject.getList(this.selectOption)
        data = data.data
        this.total = data.allCount
        this.pageCount = data.totalPage
        let list = data.list
        list.forEach(item => {
          item.operation = this.operation
        })
        this.tableData = list
      },
      selectCity(value){ // 选择城市 value：array<String> [省ID，市ID，区ID]
        this.getAreaList(value)
      },
      async getAreaList(arr){
        this.currentAreaIndex = -1
        let data = await Api.area.getList({
          provinceCode: arr[0],
          cityCode: arr[1],
          countyCode: arr[2]
        })
        this.areaList = data.data.list
        return this.areaList
      },
      areaSelectClick(item, index){ // 点击区域进行筛选
        this.currentAreaIndex = index
        this.selectOption = {
          cateId: null,
          endTime: null,
          name: null,
          pageNum: 1,
          pageSize: 20,
          startTime: null,
          areaId: item.id
        }
        this.getObjectList()
      },
      handleAvatarSuccess(e){// 上传成功处理
        if (e.code == code.SUCCESS) {
          this.formData.imageUrl = filePre + e.data
        } else {
          this.$message.error(e.mesg)
        }
      },
      addProjectConfirm(){
        if (this.addFlag) return
        this.addFlag = true
        this.$refs.addForm.validate(async (validate) => {
          if (validate) {
            let data = await Api.sourceObject.add({
              areaId: this.selectOption.areaId,
              cateId: this.formData.category.id,
              cateName: this.formData.category.name,
              image: this.formData.imageUrl.split(filePre)[1],
              name: this.formData.name
            })
            if (data.code === code.SUCCESS) {
              this.$message.success('添加成功')
              let obj = data.data
              obj.sourceNum = 0
              obj.operation = this.operation
              this.tableData.unshift(obj)
              this.closeModel()
            } else {
              this.$message.error(data.mesg)
            }
            this.addFlag = false
          } else {
            this.addFlag = false
          }
        })
      },
      modifyProjectConfirm(){
        this.$refs.modifyForm.validate(async (validate) => {
          if (validate) {
            let data = await Api.sourceObject.update({
              id: this.currentPro.id,
              areaId: this.selectOption.areaId,
              cateId: this.formData.category.id,
              cateName: this.formData.category.name,
              name: this.formData.name
            })
            if (data.code === code.SUCCESS) {
              this.$message.success('修改成功')
              this.currentPro.name = this.formData.name
              this.currentPro.cateName = this.formData.category.name
              this.closeModel()
            } else {
              this.$message.error(data.mesg)
            }
          }
        })
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  .page-wrap {
    display: flex;
    height: 100%;
    .category-manage {
      flex: 1;
      padding: 20px;
      .pagination {
        margin-top: 20px;
        text-align: center;
      }
      .select-form {
        background: #e7ecf2;
        border-radius: 6px;
        padding: 16px;
        display: flex;
        margin-bottom: 20px;
        .form-left {
          flex: 1;
          .form-item {
            display: flex;
            align-items: center;
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
    }
    .project-category-manage-box {
      overflow: hidden;
      background-image: url("../../../assets/image/xmgl_bg.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      min-width: 210px;
      border-top: 1px solid #434552;
      height: 100%;
      .scroll-bar {
        height: 100%;
        position: relative;
        bottom: -17px;
        .scroll-bar-content {
          padding: 20px;
          .title {
            color: #ffffff;
            font-weight: 600;
          }
          .add-category {
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            color: #20a7fe;
            margin: 20px 0 14px 0;
            cursor: pointer;
            span {
              margin-right: 6px;
            }
          }
          .category-list {
            li {
              padding-left: 20px;
              color: #ffffff;
              height: 22px;
              margin-top: 6px;
              cursor: pointer;
              &:hover {
                background: #443f45;
                color: #20a7fe;
              }
              &.active {
                background: #443f45;
                color: #20a7fe;
              }
            }
          }
        }
      }
    }
    .model-form {
      .upload-box {
        display: flex;
        width: 392px;
        .pro-image {
          font-size: 14px;
          color: #606266;
          margin-right: 12px;
        }
        .avatar-uploader {
          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .el-upload:hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
        }
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
      .form {
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .el-form-item {
          display: flex;
          .el-select {
            width: 100%;
          }
          .el-form-item__content {
            width: 320px;
          }
        }

      }
      .btn-group {
        display: flex;
        justify-content: center;
        border-top: 1px solid #d9d9d9;
        padding-top: 30px;
      }
    }
  }
</style>
