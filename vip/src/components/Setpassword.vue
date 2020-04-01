<template>
  <div class="setpassword">
    <van-nav-bar title="设置登录密码" />
    <p class="setpassword-info">请为您正在注册的用户名设置一个密码：</p>
    <van-cell-group>
      <van-field
        v-model="setpassword"
        clearable
        label="密码"
        :type="type.type"
        placeholder="请输入密码"
        :error-message="error_message"
      >
        <a href="javascript:;" slot="right-icon" class="icon-show-password">
          <img :src="type.src" alt @click="changeType" />
        </a>
      </van-field>
    </van-cell-group>
    <van-button
      type="primary"
      size="large"
      class="setpasswordBtn"
      :disabled="this.setpassword.length <= 0 ? true:false"
      @click="setPassword"
    >确认</van-button>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      setpassword: '',
      // 显示隐藏密码切换
      type: {
        type: 'password',
        src: require('../assets/images/hidepassword.fe24f3c7.png')
      },
      error_message: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/regist')
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
    // 设置密码
    setPassword () {
      // console.log(this.setpassword)
      // 验证密码
      let passwordRe = /^[0-9a-zA-Z_]{6,18}$/
      if (!passwordRe.test(this.setpassword)) {
        this.error_message = '密码必须是6~18位数字、字母、下划线'
        return false
      }

      let phone = localStorage.getItem('phone')

      // 调取后台接口 设置密码
      this.$http
        .post(
          '/setpassword',
          qs.stringify({ phone: phone, password: this.setpassword })
        )
        .then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.$toast.success('注册成功')
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>

<style>
.setpassword .van-nav-bar__title {
  font-size: 18px;
}

.setpassword .setpassword-info {
  height: 40px;
  line-height: 50px;
  font-size: 14px;
  padding-left: 14px;
  color: #585c64;
  background-color: #f3f4f5;
  border-top: 1px solid #e0e0e1;
}

.setpassword .van-cell {
  font-size: 16px;
  line-height: 40px;
}

.setpassword .van-field__body {
  position: relative;
}

.setpassword .icon-show-password {
  display: inline-block;
  margin-top: 3px;
  display: inline-block;
  width: 36px;
  height: 24px;
}

.setpassword .icon-show-password > img {
  width: 65%;
  height: 65%;
}

.setpassword .van-field__control {
  width: 75%;
}

.setpassword .setpasswordBtn {
  height: 44px;
  line-height: 44px;
  border-radius: 25px;
  width: 85%;
  margin-top: 30px;
  margin-left: calc((100% - 85%) / 2);
  background-color: #de3d96;
  border: none;
}
</style>
