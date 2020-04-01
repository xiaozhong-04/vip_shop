<template>
  <div class="validation_mobile">
    <div class="mobile">
      <p>已验证手机号：{{users.phone}}</p>
      <van-cell-group>
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="sendVerify"
            v-if="show === true"
          >发送验证码</van-button>
          <van-button
            slot="button"
            size="small"
            type="default"
            @click="sendVerify"
            v-if="show === false"
          >倒计时{{count}}</van-button>
        </van-field>
      </van-cell-group>
      <van-button size="large" color="#e0007d" @click="confirmMobile">下一步</van-button>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  data () {
    return {
      users: {},
      sms: '',
      count: '',
      timer: null,
      show: true
    }
  },
  methods: {
    confirmMobile () {
      // console.log(this.sms)
      this.$http
        .get('/VerifyCode', {
          params: {
            phone: this.users.phone,
            sms: this.sms
          }
        })
        .then(res => {
          // console.log(res)
          if (res.data.ok === 1) {
            this.$toast('验证码正确')
            this.$router.push('/confirm_mobile')
          } else {
            this.$toast('验证码错误,请填写正确验证码')
          }
        })
    },
    sendVerify () {
      this.$http.post('/getPhoneVerifyCode', this.users).then(res => {
        if (res.data.code === 200) {
          this.$toast('验证码已发送,请注意查收')
          const TIME_COUNT = 59
          if (!this.timer) {
            this.count = TIME_COUNT
            this.show = false
            this.timer = setInterval(() => {
              if (this.count > 1 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.show = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        }
      })
    }
  },
  created () {
    this.$http.get(`/users/${localStorage.getItem('user_id')}`).then(res => {
      // console.log(res)
      this.users = res.data.data
      // console.log(this.users)
    })
  }
}
</script>

<style>
/* 绑定手机开始 */
.validation_mobile .mobile p {
  margin-left: 10px;
  margin-bottom: 15px;
}

.validation_mobile .mobile .van-button {
  margin-top: 10px;
}
</style>
