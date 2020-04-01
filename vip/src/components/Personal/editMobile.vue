<template>
  <div class="edit_mobile">
    <!-- 顶部导航 -->
    <van-nav-bar title="修改手机号码" left-arrow @click-right="onClickRight" @click-left="onClickleft">
      <van-icon name="wap-home-o" slot="right" />
    </van-nav-bar>

    <div class="mobile">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

  methods: {
    // 返回首页
    onClickRight () {
      this.$router.push('/')
    },
    // 返回上一页
    onClickleft () {
      this.$router.back()
    }
  },
  created () {

  }
}
</script>

<style >
/* 导航栏 */
.edit_mobile .van-nav-bar .van-icon {
  color: #000;
}

.edit_mobile .van-nav-bar::after {
  display: none;
}

.edit_mobile .van-nav-bar .van-icon:before {
  font-size: 24px;
}
/* 导航栏结束 */
</style>
