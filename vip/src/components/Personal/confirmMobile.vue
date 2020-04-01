<template>
  <div class="confirm_Mobile">
    <van-cell-group>
      <van-field v-model="phone" center clearable label="手机号" placeholder="请输入你的手机号">
        <van-button
          slot="button"
          size="small"
          type="primary"
          v-if="show === true"
          @click="sendVerify"
        >发送验证码</van-button>
        <van-button
          slot="button"
          size="small"
          type="default"
          v-else
          @click="sendVerify"
        >倒计时{{count}}</van-button>
      </van-field>
      <van-field v-model="sms" center clearable label="验证码" placeholder="请输入验证码"></van-field>
    </van-cell-group>
    <van-button size="large" color="#e0007d" @click="confirmMobile">保存</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      count: '',
      timer: null,
      show: true,
      sms: '',
      phone: ''
    }
  },
  methods: {
    sendVerify () {
      this.$http
        .post('/getPhoneVerifyCode', {
          phone: this.phone
        })
        .then(res => {
          // console.log(res)
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
    },
    confirmMobile () {
      this.$http.get('/VerifyCode', {
        params: {
          phone: this.phone,
          sms: this.sms
        }
      }).then(res => {
        // console.log(res)
        if (res.data.ok === 1) {
          this.$http.put(`/users/${localStorage.getItem('user_id')}`, {
            phone: this.phone,
            id: localStorage.getItem('user_id')
          }).then(res => {
            // console.log(res)
            if (res.data.ok === 1) {
              this.$toast('验证码正确,手机号修改成功!')
              this.$router.push('/me')
            }
          })
        } else {
          this.$toast('验证码错误,请填写正确的验证码!')
        }
      })
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
/* 绑定手机开始 */
.confirm_Mobile .van-cell-group .van-field {
  background-color: aliceblue;
}

.confirm_Mobile .van-cell-group .van-field:first-child {
  margin-bottom: 10px;
  margin-top: 10px;
}
.confirm_Mobile .van-button {
  margin-top: 10px;
}
</style>
