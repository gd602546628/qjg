<template>
  <div class="nav1-page">
    <div class="left-nav">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @select="select"
        text-color="#fff"
        active-text-color="#ffffff"
      >
        <el-menu-item index="welcome">
          <i class="icon-gg title-icon"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="advertiseManageIndex" v-if="sysAuth.advert">
          <i class="icon-gg title-icon"></i>
          <span slot="title">广告管理</span>
        </el-menu-item>
        <el-menu-item index="areaManageIndex" v-if="sysAuth.sourceArea">
          <i class="icon-qygl title-icon"></i>
          <span slot="title">区域管理</span>
        </el-menu-item>
        <el-menu-item index="fileManage" v-if="sysAuth.sourceFile">
          <i class="icon-wjgl title-icon"></i>
          <span slot="title">文件管理</span>
        </el-menu-item>
        <el-menu-item index="projectManageIndex" v-if="sysAuth.sourceObject">
          <i class="icon-xm title-icon"></i>
          <span slot="title">项目管理</span>
        </el-menu-item>


        <el-submenu index="addCoupon" v-if="sysAuth.coupon">
          <template slot="title">
            <i class="icon-select title-icon"></i>
            <span>卡券管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="addCoupon" v-if="sysAuth.systemRole">添加卡券</el-menu-item>
            <el-menu-item index="couponManage" v-if="sysAuth.systemUser">卡券管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>


        <el-submenu index="systemManageIndex" v-if="sysAuth.system">
          <template slot="title">
            <i class="icon-select title-icon"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="roleManage" v-if="sysAuth.systemRole">角色管理</el-menu-item>
            <el-menu-item index="accountManage" v-if="sysAuth.systemUser">账号管理</el-menu-item>
            <el-menu-item index="categoryManage" v-if="sysAuth.systemCate">分类管理</el-menu-item>
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
  import {mapGetters} from 'vuex'
  import {isTest} from '../../config/config'

  export default {
    data() {
      return {
        showCategory: false,
        defaultActive: ''
      }
    },
    computed: {
      ...mapGetters(['sysAuthUrls']),
      sysAuth() {
        let authObj = {
          system: false, // 系统设置
          systemRole: false, //角色设置
          systemUser: false,//账号设置
          systemCate: false,//分类管理
          sourceArea: false,//区域管理
          sourceObject: false,//项目管理
          advert: false,//广告管理
          coupon: false, //优惠券管理
        }
        if (!isTest) {
          for (let key in authObj) {
            authObj[key] = true
          }
        }
        let authMap = [
          {
            url: '/system',
            target: 'system'
          },
          {
            url: '/system/role',
            target: 'systemRole'
          },
          {
            url: '/system/user',
            target: 'systemUser'
          },
          {
            url: '/cate',
            target: 'systemCate'
          },
          {
            url: '/source',
            target: 'sourceObject'
          },
          {
            url: '/sourceArea',
            target: 'sourceArea'
          },
          {
            url: '/advert',
            target: 'advert'
          },
          {
            url: '/sourceFile',
            target: 'sourceFile'
          },
          {
            url: '/card',
            target: 'coupon'
          }
        ]
        this.sysAuthUrls.forEach(item => {
          for (let i = 0; i < authMap.length; i++) {
            if (authMap[i].url === item.url) {
              authObj[authMap[i].target] = true
            }
          }
        })
        return authObj
      }
    },
    created() {
      this.defaultActive = this.$route.meta.activeName || this.$route.name
    },
    methods: {
      select(a, b, c) {
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
        background-image: url("../../assets/image/bg01.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        .title-icon {
          margin-right: 20px;
          font-size: 24px;
        }
        .el-menu {
          background: none;
        }
        .el-submenu__title {
          &:hover {
            background: #20a7fe !important;
          }
        }
        .el-menu-item {
          &.is-active {
            background: #20a7fe !important;
          }
          &:hover {
            background: #20a7fe !important;
          }
        }
      }
    }
    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      margin-bottom: -17px;
      .scroll-bar {
        height: 100%;
        width: 100%;
        .el-scrollbar__view {
          height: 100%;
        }
      }
    }
  }
</style>
