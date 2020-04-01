<template>
  <div class="shopping">
    <!-- 顶部导航 -->
    <van-nav-bar title="购物车历史" left-arrow @click-left="onClickleft"></van-nav-bar>

    <!-- 购物车内容 -->
    <!-- 购物车无内容 -->
    <div class="on_shopping">
      <img src="../../assets/images/2.png" alt />
      <img src="../../assets/images/3.png" alt />
      <p>还没有发现商品哦</p>
      <van-button color="#e61188" plain>先去首页逛逛吧</van-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 返回上一页
    onClickleft () {
      this.$router.back()
    }
  }
}
</script>

<style>
/* 导航栏 */
.shopping .van-icon {
  color: #000;
}

.shopping .van-nav-bar::after {
  display: none;
}

.shopping .van-icon:before {
  font-size: 24px;
}
/* 导航栏结束 */

/* 订单开始 */
.on_shopping {
  text-align: center;
}

.on_shopping img:first-child {
  width: 100%;
}

.on_shopping img:nth-child(2) {
  width: 35%;
  margin-top: -30%;
}

.on_shopping p {
  color: #585c64;
}

.on_shopping .van-button{
  border-radius: 5px;
}
</style>
