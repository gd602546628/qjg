<template>
  <div class="nav1-page">
    <div class="left-nav">
      <el-menu
        default-active="advertiseManage"
        class="el-menu-vertical-demo"
        @select="select"
        background-color="#323542"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="advertiseManageIndex">
          <!--    <i class="el-icon-menu"></i>-->
          <span slot="title">广告管理</span>
        </el-menu-item>
        <el-menu-item index="areaManageIndex">
          <!-- <i class="el-icon-menu"></i>-->
          <span slot="title">区域管理</span>
        </el-menu-item>
        <el-menu-item index="projectManageIndex">
          <!--<i class="el-icon-setting"></i>-->
          <span slot="title">项目管理</span>
        </el-menu-item>
        <el-submenu index="systemManageIndex">
          <template slot="title">
            <span>系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="roleManage">角色管理</el-menu-item>
            <el-menu-item index="accountManage">账号管理</el-menu-item>
            <el-menu-item index="categoryManage">分类管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="category-manage-box" v-if="showCategory">
      <div class="title">项目管理</div>
      <div class="add-category">
        <span class="el-icon-plus"></span>
        <div>添加分类</div>
      </div>
      <ul class="category-list">
        <li>极中心</li>
        <li>极中心</li>
        <li>极中心</li>
      </ul>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        showCategory: false
      }
    },
    created(){
      this.isShowCategory()
    },
    watch: {
      $route(){
        this.isShowCategory()
      }
    },
    methods: {
      select(a, b, c){
        this.$router.push({
          name: a
        })
      },
      isShowCategory(){
        let showRouteMap = ['projectManageIndex', 'categoryManage']
        if (showRouteMap.indexOf(this.$route.name) >= 0) {
          this.showCategory = true
        }else{
          this.showCategory = false
        }
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .nav1-page {
    display: flex;
    .left-nav {
      width: 200px;
      border-top: 1px solid #434552;
      .el-menu-vertical-demo {
        height: 100%;
        border: none;
      }
    }
    .content {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
    }
    .category-manage-box {
      background: #281e26;
      width: 210px;
      border-top: 1px solid #434552;
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
          &:hover {
            background: #443f45;
            color: #20a7fe;
          }
        }
      }
    }
  }
</style>
