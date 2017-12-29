<template>
  <div>
    <div>
      <span>用户名</span>
      <input v-model="username"/>
    </div>
    <div>
      <span>密码</span>
      <input v-model="password"/>
    </div>

    <input value="登录" type="button" @click="login"/>
  </div>
</template>
<script>
  import api from '@/api/api'
  import {code} from '@/config/config'
  import {mapGetters, mapMutations} from 'vuex'
  import httpService from '@/service/httpService'
  export default{
    data(){
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created(){
      if (this.isLogin) {
        this.$router.push({
          name: 'index'
        })
      }
    },
    methods: {
      ...mapMutations(['saveUserInfo']),
      async login(){
        let data = await api.login({
          username: this.username,
          password: this.password
        })
        if (data.code === code.SUCCESS) {
          console.log(this.$route.params)
          if (this.$route.params.resolve) {
            this.$route.params.resolve(data.data)
            this.$route.params.fn()
          } else {
            this.saveUserInfo(data.data)
            this.$router.push({
              name: 'index'
            })
          }
        }
        /*if (this.$route.params.resolve) {
         this.$route.params.resolve({
         sysAuthUrls: '11111',
         sysUserBg: '2222'
         })
         this.$route.params.fn()
         } else {
         this.saveUserInfo({
         sysAuthUrls: '11111',
         sysUserBg: '2222'
         })
         this.$router.push({
         name: 'index'
         })
         }*/
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped></style>
