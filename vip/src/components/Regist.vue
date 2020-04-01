<template>
  <div class="regist">
    <!-- logo -->
    <div class="regist-logo">
      <div class="icon-regist-logo"></div>
      <a href="javascript:;" class="iconfont" @click="toIndex">
        <span class="mlogin-close-in"></span>
      </a>
      <div class="login-error-message" v-if="display">
        <i class="login-err-tips">
          <span class="mlogin-err-tips-in"></span>
        </i>
        <span>{{this.error.message}}</span>
      </div>
    </div>
    <!-- 手机号验证码 -->
    <van-cell-group>
      <van-field
        v-model="registForm.mobile"
        clearable
        label="手机号"
        placeholder="请输入手机号"
        @clear="changeDisplay"
      />
      <van-field
        v-model="registForm.sms"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
        @clear="changeDisplay"
      >
        <van-button
          v-show="show"
          slot="button"
          class="authcode"
          type="default"
          :disabled="this.registForm.mobile.length > 0? false:true"
          :style="{color:this.registForm.mobile.length > 0? '#4a90e2':'#98989f'}"
          @click="handleVerifyCode"
        >获取验证码</van-button>
        <van-button
          v-show="!show"
          slot="button"
          class="authcode authcode22"
          type="default"
          :disabled="true"
          :style="{color:this.registForm.mobile.length > 0? '#4a90e2':'#98989f'}"
          @click="handleVerifyCode"
        >{{count}}秒后重新获取</van-button>
      </van-field>
    </van-cell-group>
    <!-- 注册按钮 -->
    <div class="submit-box">
      <van-button
        type="primary"
        size="large"
        class="registBtn"
        @click="register"
        :disabled="this.registForm.mobile.length <= 0 || this.registForm.sms.length <=0? true:false"
      >手机号注册登录</van-button>
      <p class="regist-footer-tips">
        <van-checkbox
          v-model="checked"
          shape="square"
          checked-color="#49c43f"
          @change="handleCheckbox"
        ></van-checkbox>同意
        <a href="javascript:;">《唯品会服务条款》</a>
        <a href="javascript:;">《隐私条款》</a>
        <a href="javascript:;">《唯品支付用户服务协议》</a>
      </p>
    </div>
    <!-- 跳转密码登录 -->
    <div class="regist-footer">
      <fieldset class="regist-modele">
        <legend>或</legend>
        <van-button class="topasslogin" to="/login">密码登录</van-button>
      </fieldset>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      registForm: {
        mobile: '', // 手机号码
        sms: '' // 验证码
      },
      checked: true,
      display: false, // 表单验证错误的提示信息
      error: {
        message: ''
      },
      show: true,
      count: '',
      timer: null
    }
  },
  methods: {
    toIndex () {
      this.$router.push('/')
    },
    // 当任意输入框被清空内容时 隐藏错误信息
    changeDisplay () {
      this.display = false
    },
    handleCheckbox () {
      this.display = false
    },
    // 手机号码验证
    handleVerifyCode () {
      let mobileRe = /^1(3|5|6|7|8|9)\d{9}$/
      if (!mobileRe.test(this.registForm.mobile)) {
        this.error.message = '手机号码格式不正确，请重新输入'
        this.display = true
      }
      this.$http
        .post(
          '/getPhoneVerifyCode',
          qs.stringify({ phone: this.registForm.mobile })
        )
        .then(res => {
          // console.log(res)
          if (res.data.code === 400) {
            this.error.message = res.data.error
          } else {
            this.$toast('验证码已发送，请注意查收')
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
    // 注册
    register () {
      if (this.checked === false) {
        this.error.message = '您必须同意唯品会服务跳转后，才能进行下一步'
        this.display = true
      }
      // 调取后台接口
      this.$http
        .post(
          '/regist',
          qs.stringify({
            phone: this.registForm.mobile,
            sms: this.registForm.sms
          })
        )
        .then(res => {
          // console.log(res)
          if (res.data.code === 404) {
            this.$router.push('/setpassword')
            localStorage.setItem('phone', this.registForm.mobile)
          }
          if (res.data.code === 200) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user_id', res.data.data.id)
            this.$toast.success('登录成功')
            this.$router.push('/')
          }
          if (res.data.code === 400) {
            this.error.message = res.data.error
            this.display = true
          }
        })
    }
  }
}
</script>

<style>
.regist {
  font-family: "PingFang-SC-Regular,Helvetica Neue,Helvetica,microsoft yahei,sans-serif";
}

.regist .regist-logo {
  position: relative;
  height: 170px;
  border-top: 1px solid #e3017e;
  background-image: url("../assets/images/login_bg.3a93a8bf.jpg");
}

.icon-regist-logo {
  position: absolute;
  top: 65px;
  left: 120px;
  width: 125px;
  height: 50px;
  background: url("../assets/images/logo.ac5608f4.png") no-repeat 0 0;
  background-size: 100% auto;
}

.regist .iconfont {
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-block;
  width: 22px;
  height: 22px;
  opacity: 0.7;
  /* background-color: pink; */
}

/* 表单验证错误时 的提示信息样式 */
.regist .login-error-message {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 30px;
  line-height: 30px;
  padding-left: 33px;
}

.regist .login-err-tips {
  position: relative;
  position: absolute;
  top: 8px;
  left: 20px;
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: #ec5648;
  border-radius: 50%;
  text-align: center;
}

.regist .mlogin-err-tips-in {
  position: absolute;
  top: 7px;
  left: 1.2px;
  display: inline-block;
  width: 12px;
  height: 1px;
  background: #ffffff;
  line-height: 0;
  font-size: 0;
  vertical-align: middle;
  -webkit-transform: rotate(45deg);
}

.regist .mlogin-err-tips-in::after {
  content: "/";
  display: block;
  width: 12px;
  height: 1px;
  background: #ffffff;
  -webkit-transform: rotate(-90deg);
}

.regist .login-error-message > span {
  display: inline-block;
  width: 305px;
  font-size: 12px;
  color: #c93c29;
  margin-left: 10px;
}
/* end */

.regist .mlogin-close-in {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.regist .mlogin-close-in::before,
.regist .mlogin-close-in::after {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  margin-top: -1px;
  background-color: #000;
  width: 100%;
  height: 1px;
}

.regist .mlogin-close-in::before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}

.regist .mlogin-close-in::after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
}

.regist .van-cell {
  font-size: 16px;
  height: 52px;
  line-height: 35px;
}

.regist .van-field__label {
  width: 65px;
}

.regist .authcode {
  height: 52px;
  width: 120px;
  border-top: none;
  border-right: none;
  border-bottom: none;
  font-size: 16px;
  color: #969799;
}

.regist .submit-box {
  padding: 30px 15px 0;
}

.regist .registBtn {
  width: 330px;
  height: 44px;
  line-height: 44px;
  border-radius: 50px;
  background-color: #de3d96;
  border: none;
}

.regist .regist-footer-tips {
  font-size: 12px;
  margin-top: 15px;
  line-height: 24px;
}

.regist .van-checkbox {
  display: inline-block;
  margin-right: 4px;
}

.regist .regist-footer-tips a {
  color: #157efa;
}

.regist .regist-footer-tips a::after {
  content: "、";
}

.regist .regist-footer-tips a:last-child::after {
  content: "";
}

.regist-footer {
  margin-top: 50px;
}

.regist .regist-modele {
  text-align: center;
  border-left: none;
  border-right: none;
  border-bottom: none;
  border-top: 1px solid #caccd2;
}

.regist .regist-modele legend {
  font-size: 12px;
  color: #caccd2;
  padding: 0 10px;
}

.regist .regist-modele .topasslogin {
  border-radius: 25px;
  color: #e3017e;
  border: 1px solid #e3017e;
  height: 40px;
  line-height: 35px;
  margin-top: 15px;
}

.regist .authcode22 {
  font-size: 12px;
  font-weight: bold;
}
</style>
