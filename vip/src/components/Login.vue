<template>
  <div class="login">
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
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="loginForm.username"
        clearable
        label="登录名"
        placeholder="请输入手机号或邮箱"
        @clear="changeDisplay"
      />
      <van-field
        v-model="loginForm.password"
        clearable
        :type="type.type"
        label="密码"
        placeholder="请输入密码"
        @clear="changeDisplay"
      >
        <a href="javascript:;" slot="right-icon" class="icon-show-password">
          <img :src="type.src" alt @click="changeType" />
        </a>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-module">
      <van-button
        :disabled="this.loginForm.username.length <= 0 || this.loginForm.password.length <=0? true:false"
        type="primary"
        size="large"
        class="loginBtn"
        @click="login"
      >登录</van-button>
      <van-button type="primary" size="small" class="forgetPassw" to="/findpassstep1">忘记密码</van-button>
    </div>
    <!-- 跳转注册 -->
    <div class="login-footer">
      <fieldset class="login-footer-modele">
        <legend>或</legend>
        <van-button class="topasslogin" to="/regist">手机号注册登录</van-button>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单内容
      loginForm: {
        username: '',
        password: ''
      },
      error: {
        message: ''
      },
      display: false,
      // 显示隐藏密码切换
      type: {
        type: 'password',
        src: require('../assets/images/hidepassword.fe24f3c7.png')
      },
      disabled: false
    }
  },
  methods: {
    toIndex () {
      this.$router.push('/')
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
    // 当任意输入框被清空内容时 隐藏错误信息
    changeDisplay () {
      this.display = false
    },
    // 登录
    login () {
      // 验证登录名
      let phoneRe = /^1(3|5|6|7|8|9)\d{9}$/
      if (!phoneRe.test(this.loginForm.username)) {
        this.error.message = '账号名或密码错误，请重试'
        this.display = true
        return false
      }

      // 验证密码
      let passwordRe = /^[0-9a-zA-Z_]{6,18}$/
      if (!passwordRe.test(this.loginForm.password)) {
        this.error.message = '账号名或密码错误，请重试'
        this.display = true
        return false
      }

      // 创建一个URLSearchParams 对象
      const formData = new URLSearchParams()
      formData.append('phone', this.loginForm.username)
      formData.append('password', this.loginForm.password)
      // 调取后台接口 登录
      this.$http.post('/login', formData).then(res => {
        // console.log(res)
        if (res.data.code !== 400) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user_id', res.data.data.id)
          this.$toast.success('登录成功')
          this.$router.push('/')
        } else {
          this.error.message = res.data.error
          this.display = true
        }
      })
    }
  }
}
</script>

<style>
.login .regist-logo {
  position: relative;
  height: 170px;
  border-top: 1px solid #e3017e;
  background-image: url("../assets/images/login_bg.3a93a8bf.jpg");
}

.login .icon-regist-logo {
  position: absolute;
  top: 65px;
  left: 120px;
  width: 125px;
  height: 50px;
  background: url("../assets/images/logo.ac5608f4.png") no-repeat 0 0;
  background-size: 100% auto;
}

/* 表单校验错误时候的提示信息 的样式 */
.login .login-err-tips {
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

.login .mlogin-err-tips-in {
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

.login .mlogin-err-tips-in::after {
  content: "/";
  display: block;
  width: 12px;
  height: 1px;
  background: #ffffff;
  -webkit-transform: rotate(-90deg);
}

.login .login-error-message > span {
  font-size: 12px;
  color: #c93c29;
  margin-left: 10px;
}
/* end */

.login .iconfont {
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-block;
  width: 22px;
  height: 22px;
  opacity: 0.7;
  /* background-color: pink; */
}

.login .login-error-message {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 30px;
  line-height: 30px;
  padding-left: 33px;
}

.login .mlogin-close-in {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.login .mlogin-close-in::before,
.login .mlogin-close-in::after {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  margin-top: -1px;
  background-color: #000;
  width: 100%;
  height: 1px;
}

.login .mlogin-close-in::before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}

.login .mlogin-close-in::after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
}

.login .van-field__label {
  width: 65px;
}

.login .van-field__control {
  width: 75%;
}

.login .van-cell {
  height: 52px;
  line-height: 35px;
  font-size: 16px;
}

.login .van-field {
  position: relative;
}

.login .icon-show-password {
  position: absolute;
  top: 3px;
  right: 0;
  display: inline-block;
  width: 36px;
  height: 24px;
}

.login .icon-show-password img {
  width: 65%;
  height: 65%;
}

.login .login-module {
  padding: 30px 15px 0 15px;
}

.login .loginBtn {
  background-color: #de3d96;
  border: none;
  height: 44px;
  line-height: 44px;
  width: 330px;
  border-radius: 50px;
}

.login .forgetPassw {
  float: right;
  margin-top: 12px;
  color: #0079ff;
  background-color: #ffffff;
  border: none;
  font-size: 14px;
}

.login-footer {
  margin-top: 50px;
}

.login .login-footer-modele {
  text-align: center;
  border-left: none;
  border-right: none;
  border-bottom: none;
  border-top: 1px solid #caccd2;
}

.login .login-modele legend {
  font-size: 12px;
  color: #caccd2;
  padding: 0 10px;
}

.login .login-footer-modele .topasslogin {
  border-radius: 25px;
  color: #e3017e;
  border: 1px solid #e3017e;
  height: 40px;
  line-height: 35px;
  margin-top: 15px;
}
</style>
