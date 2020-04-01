<template>
  <div class="edit_password">
    <!-- 顶部导航 -->
    <van-nav-bar title="修改登录密码" left-arrow @click-right="onClickRight" @click-left="onClickleft">
      <van-icon name="wap-home-o" slot="right" />
    </van-nav-bar>

    <!-- 修改密码 -->
    <div class="password">
      <p>你的账号名为：{{users.phone}}</p>
      <van-cell-group>
        <van-field
          v-model="password"
          label="登录密码"
          placeholder="6-20位字母、数字组成"
          right-icon="close"
          @click-right-icon="clearPassword"
        />
        <p>请设置新的登录密码</p>
        <van-field
          v-model="cpassword"
          label="设置新密码"
          placeholder="6-20位字母、数字组成"
          right-icon="close"
          @click-right-icon="clearPassword"
        />
        <van-field
          v-model="zcpassword"
          label="确认新密码"
          placeholder="再次填写密码"
          right-icon="close"
          @click-right-icon="clearPassword"
        />
      </van-cell-group>
    </div>
    <van-button color="#e1007d" size="large" @click="editPassword">完成</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      cpassword: '',
      zcpassword: '',
      users: []
    }
  },
  methods: {
    // 返回首页
    onClickRight () {
      this.$router.push('/')
    },
    // 返回上一页
    onClickleft () {
      this.$router.back()
    },
    clearPassword () {
      this.password = ''
      this.zcpassword = ''
      this.cpassword = ''
    },
    editPassword () {
      if (this.cpassword === this.zcpassword) {
        // console.log(1)
        this.$http
          .patch(`/users/${localStorage.getItem('user_id')}`, {
            id: localStorage.getItem('user_id'),
            password: this.password,
            cpassword: this.cpassword
          })
          .then(res => {
            console.log(res)
            if (res.data.ok === 1) {
              this.$toast('修改成功')
              this.$router.push('/me')
            } else {
              this.$toast(res.data.error)
            }
          })
      } else {
        this.$toast('两次输入的密码不同,请重新输入')
      }
    }
  },
  created () {
    this.$http.get(`/users/${localStorage.getItem('user_id')}`).then(res => {
      this.users = res.data.data
    })
  }
}
</script>

<style>
/* 导航栏 */
.edit_password .van-nav-bar .van-icon {
  color: #000;
}

.edit_password .van-nav-bar::after {
  display: none;
}

.edit_password .van-nav-bar .van-icon:before {
  font-size: 24px;
}
/* 导航栏结束 */

/* 修改密码开始 */
.edit_password .password p {
  font-size: 14px;
  margin-bottom: 5px;
  margin-top: 12px;
}

.edit_password .password .van-cell {
  background-color: aliceblue;
}

.edit_password .password .van-cell-group .van-cell:nth-child(3) {
  margin-bottom: 20px;
}

.edit_password .van-button {
  margin-top: 20px;
}
/* 修改密码结束 */
</style>
