<template>
  <div class="findpassstep1">
    <van-nav-bar title="无法登录" left-arrow @click-left="onClickLeft" />
    <p class="findpassstep1-info">请输入需要找回密码的用户名/绑定手机/绑定邮箱：</p>
    <van-cell-group>
      <van-field v-model="bindingmobile" clearable placeholder="用户名 / 绑定手机 / 绑定邮箱" />
    </van-cell-group>
    <van-button
      type="primary"
      size="large"
      class="next"
      :disabled="this.bindingmobile.length <= 0 ? true:false"
      @click="findPass"
    >下一步</van-button>
  </div>
</template>

<script>
import qs from 'qs'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      bindingmobile: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/login')
    },
    // 点击下一步 向手机号码发送验证码
    findPass () {
      // 调取后台接口
      this.$http
        .post('/findPassGetphone', qs.stringify({ phone: this.bindingmobile }))
        .then(res => {
          // console.log(res)
          if (res.data.code === 400) {
            Dialog.alert({
              message: '该账号不存在，请重新输入再试'
            })
            return false
          } else {
            this.$toast('验证码已发送，请注意查收')
            localStorage.setItem('findpassPhone', this.bindingmobile)
            this.$router.push('/findpassstep2')
          }
        })
    }
  }
}
</script>

<style>
.findpassstep1 .van-icon-arrow-left:before {
  color: #323233;
}

.findpassstep1 .van-nav-bar__title {
  font-size: 18px;
}

.findpassstep1 .findpassstep1-info {
  height: 40px;
  line-height: 50px;
  font-size: 14px;
  padding-left: 14px;
  color: #585c64;
  background-color: #f3f4f5;
  border-top: 1px solid #e0e0e1;
}

.findpassstep1 .next {
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
