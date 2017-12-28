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
      <router-view/>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      select(a, b, c){
         this.$router.push({
         name: a
         })
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .nav1-page {
    display: flex;
    .left-nav {
      width: 201px;
      .el-menu-vertical-demo {
        height: 100%;
      }
    }
    .content {
      flex: 1;
      overflow-y: scroll;
    }
  }
</style>
