<template>
  <div class="browsing">
    <!-- 顶部导航 -->
    <van-nav-bar title="浏览历史" left-arrow @click-right="onClickRight" @click-left="onClickleft">
      <van-icon name="wap-home-o" slot="right" />
    </van-nav-bar>

    <!-- 浏览内容 -->
    <!-- 没有浏览历史 -->
    <div class="on_browsing">
      <span></span>
      <p>你还没有浏览商品呢</p>
      <p>先去首页逛逛</p>
      <van-button color="#ed2b87" size="large">马上去逛逛</van-button>
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
  }
}
</script>

<style>
/* 导航栏 */
.browsing .van-icon {
  color: #000;
}

.browsing .van-nav-bar::after {
  display: none;
}

.browsing .van-icon:before {
  font-size: 24px;
}
/* 导航栏结束 */

/* 浏览历史开始 */
.on_browsing {
  text-align: center;
  margin-top: 13%;
}

.browsing .on_browsing > span:first-child {
  width: 100px;
  height: 100px;
  display: inline-block;
  background: url(https://ms2-m.vipstatic.com/images/common/4b3677481a.nullicon.png?20141013)
    no-repeat;
  background-size: 200px;
}

.browsing .on_browsing > p:nth-child(2) {
  margin-bottom: 0;
}

.browsing .on_browsing > p:nth-child(3) {
  margin-top: 0;
}

.browsing .on_browsing > .van-button {
  border-radius: 50px;
}

.browsing .on_browsing > .van-button--large {
  width: 65%;
}
/* 浏览历史结束 */
</style>
