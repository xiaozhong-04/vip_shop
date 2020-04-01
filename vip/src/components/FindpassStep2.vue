<template>
  <div class="findpassstep2">
    <van-nav-bar title="无法登录" left-arrow @click-left="onClickLeft" />
    <p class="findpassstep1-info">短信验证码已经发送到绑定手机{{this.userMobile}}：</p>
    <van-cell-group>
      <van-field
        v-model="findPass.sms"
        center
        clearable
        label="验证码"
        placeholder="短信验证码"
        :error-message="error.sms"
      >
        <van-button
          v-show="show"
          slot="button"
          size="small"
          type="primary"
          class="getsmsbtn"
          @click="findPassAgain"
        >获取验证码</van-button>
        <van-button
          v-show="!show"
          :disabled="true"
          slot="button"
          size="small"
          type="primary"
          class="getsmsbtn"
        >{{count}}后重新获取</van-button>
      </van-field>
      <van-field
        v-model="findPass.password"
        clearable
        :type="type.type"
        label="密码"
        placeholder="请输入密码"
        :error-message="error.password"
      >
        <a href="javascript:;" slot="right-icon" class="icon-show-password">
          <img :src="type.src" alt @click="changeType" />
        </a>
      </van-field>
    </van-cell-group>
    <van-button
      :disabled="this.findPass.sms.length <= 0 || this.findPass.password.length <=0? true:false"
      type="primary"
      size="large"
      class="affirmPass"
      @click="resetPassword"
    >确认</van-button>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      findPass: {
        sms: '',
        password: ''
      },
      // 显示隐藏密码切换
      type: {
        type: 'password',
        src: require('../assets/images/hidepassword.fe24f3c7.png')
      },
      error: {
        sms: '',
        password: ''
      },
      show: true,
      count: '',
      timer: null,
      userMobile: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/login')
    },
    // 切换查看或显示密码时 输入框的属性
    changeType () {
      if (this.type.type === 'password') {
        this.type.type = 'text'
        this.type.src = require('../assets/images/showpassword.441a0c3e.png')
      } else {
        this.type.type = 'password'
        this.type.src = require('../assets/images/hidepassword.fe24f3c7.png')
      }
    },
    // 重置密码
    resetPassword () {
      let phone = localStorage.getItem('findpassPhone')
      this.$http
        .post(
          '/resetPassword',
          qs.stringify({
            phone: phone,
            password: this.findPass.password,
            sms: this.findPass.sms
          })
        )
        .then(res => {
          // console.log(res)
          if (res.data.code === 400) {
            this.error.sms = '短信验证码有误，请重试'
          } else if (res.data.code === 401) {
            this.error.password = '密码必须为6~18位数字、字母、下划线'
          } else if (res.data.code === 200) {
            this.$toast('密码重置成功')
            this.$router.push('/login')
          }
        })
    },
    getCode () {
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
    },
    findPassAgain () {
      let phone = localStorage.getItem('findpassPhone')
      this.$http
        .post('/findPassGetphoneAgain', qs.stringify({ phone: phone }))
        .then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.$toast('短信验证码发送成功，请注意查收')
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
    this.userMobile = localStorage.getItem('findpassPhone')
    this.getCode()
  }
}
</script>

<style>
.findpassstep2 .van-icon-arrow-left:before {
  color: #323233;
}

.findpassstep2 .van-nav-bar__title {
  font-size: 18px;
}

.findpassstep2 .findpassstep1-info {
  height: 40px;
  line-height: 50px;
  font-size: 14px;
  padding-left: 14px;
  color: #585c64;
  background-color: #f3f4f5;
  border-top: 1px solid #e0e0e1;
}

.findpassstep2 .van-cell {
  font-size: 16px;
}

.findpassstep2 .icon-show-password {
  display: inline-block;
  margin-top: 3px;
  width: 36px;
  height: 24px;
}

.findpassstep2 .icon-show-password > img {
  width: 65%;
  height: 65%;
}

.findpassstep2 .getsmsbtn {
  color: #000;
  background-color: #e0e0e1;
  border: none;
}

.findpassstep2 .affirmPass {
  width: 85%;
  border-radius: 25px;
  height: 44px;
  line-height: 44px;
  margin-left: calc((100% - 85%) / 2);
  margin-top: 30px;
  background-color: #de3d96;
  border: none;
}
</style>
