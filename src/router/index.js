import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index.vue'
import login from '@/page/login.vue'
import nav1 from '@/page/nav1/nav1.index.vue'
/*广告管理start*/
import advertiseManage from '@/page/nav1/advertiseManage/advertiseManage.vue'
import addAdvertise from '@/page/nav1/advertiseManage/addAdvertise.vue'
/*广告管理END*/
import areaManageIndex from '@/page/nav1/areaManage/index.vue'
/*项目管理start*/
import projectManageIndex from '@/page/nav1/projectManage/index.vue'
import lookProject from '@/page/nav1/projectManage/lookProject'
/*项目管理END*/
/*账号管理start*/
import systemManageIndex from '@/page/nav1/systemManage/index.vue'
import roleManage from '@/page/nav1/systemManage/roleManage.vue'
import accountManage from '@/page/nav1/systemManage/accountManage.vue'
import categoryManage from '@/page/nav1/systemManage/categoryManage.vue'
import addRole from '@/page/nav1/systemManage/addRole.vue'
import addAcount from '@/page/nav1/systemManage/addAccount.vue'
/*账号管理end*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/nav1/advertiseManage'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/nav1',
      children: [
        {
          path: 'nav1',
          component: nav1,
          name: 'nav1',
          redirect: '/index/nav1/advertiseManage',
          children: [
            /*广告管理start*/
            {
              path: 'advertiseManage',
              component: advertiseManage,
              name: 'advertiseManageIndex'
            },
            {
              path: 'addAdvertise',
              component: addAdvertise,
              name: 'addAdvertise'
            },
            /*广告管理End*/
            {
              path: 'areaManage',
              component: areaManageIndex,
              name: 'areaManageIndex'
            },
            /*项目管理start*/
            {
              path: 'projectManage',
              component: projectManageIndex,
              name: 'projectManageIndex'
            },
            {
              path: 'lookProject',
              component: lookProject,
              name: 'lookProject'
            },
            /*项目管理End*/
            /*系统管理start*/
            {
              path: 'systemManage',
              component: systemManageIndex,
              name: 'systemManageIndex',
            },
            {
              path: 'systemRoleManage',
              component: roleManage,
              name: 'roleManage'
            },
            {
              path: 'systemAccountManage',
              component: accountManage,
              name: 'accountManage'
            },
            {
              path: 'systemCategoryManage',
              component: categoryManage,
              name: 'categoryManage'
            },
            {
              path: 'systemAddRole/:id?',
              component: addRole,
              name: 'addRole',
              meta: {
                activeName: 'roleManage'
              }
            },
            {
              path: 'systemAddAccount',
              component: addAcount,
              name: 'addAccount',
              meta: {
                activeName: 'accountManage'
              }
            }
            /*系统管理End*/
          ]
        }
      ]
    }
  ]
})
