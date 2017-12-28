import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index.vue'

import nav1 from '@/page/nav1/nav1.index.vue'
import advertiseManageIndex from '@/page/nav1/advertiseManage/index.vue'
import areaManageIndex from '@/page/nav1/areaManage/index.vue'
import projectManageIndex from '@/page/nav1/projectManage/index.vue'

/*账号管理start*/
import systemManageIndex from '@/page/nav1/systemManage/index.vue'
import roleManage from '@/page/nav1/systemManage/roleManage.vue'
import accountManage from '@/page/nav1/systemManage/accountManage.vue'
import categoryManage from '@/page/nav1/systemManage/categoryManage.vue'
/*账号管理end*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'nav1',
          component: nav1,
          name: 'nav1',
          redirect: '/index/nav1/advertiseManage',
          children: [
            {
              path: 'advertiseManage',
              component: advertiseManageIndex,
              name: 'advertiseManageIndex'
            },
            {
              path: 'areaManage',
              component: areaManageIndex,
              name: 'areaManageIndex'
            },
            {
              path: 'projectManage',
              component: projectManageIndex,
              name: 'projectManageIndex'
            },
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
            }
          ]
        }
      ]
    }
  ]
})
