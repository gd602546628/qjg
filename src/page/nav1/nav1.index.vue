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
    <div class="content">
      <el-scrollbar class="scroll-bar">
        <router-view/>
      </el-scrollbar>
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
    },
    methods: {
      select(a, b, c){
        this.$router.push({
          name: a
        })
      },
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
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
      overflow: hidden;
      display: flex;
      margin-bottom: -17px;
      .scroll-bar {
        flex: 1;
        .el-scrollbar__view {
          height: 100%;
        }
      }
    }
  }
</style>
