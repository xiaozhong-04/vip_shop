<template>
  <div class="shopcart">
    <van-nav-bar title="购物车" left-arrow @click-left="onClickLeft" />
    <div class="shopcart_bgc">
      <div class="shopcart_bgc_img">
        <img src="../assets/images/2.png" alt />
      </div>
      <div class="shopcart_bgc_cart">
        <img src="../assets/images/3.png" alt />
      </div>
      <div class="shopcart_bgc_text">
        <p>购物车空空如也</p>
        <van-button type="default" to="/">去抢购</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    onClickLeft () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.shopcart .van-nav-bar__title {
  font-size: 18px;
}

.shopcart .van-icon-arrow-left:before {
  color: #5a5555;
}

.shopcart_bgc {
  position: relative;
}

.shopcart .shopcart_bgc_img {
  width: 298px;
  height: 134px;
  margin-left: calc((100% - 298px) / 2);
}

.shopcart .shopcart_bgc_img > img,
.shopcart .shopcart_bgc_cart > img {
  width: 100%;
  height: 100%;
}

.shopcart .shopcart_bgc_cart {
  position: absolute;
  top: 58px;
  left: 125px;
  width: 105px;
  height: 135px;
}

.shopcart .shopcart_bgc_text {
  position: absolute;
  top: 210px;
  left: 0;
  padding-left: calc((100% - 175px) / 2);
}

.shopcart .shopcart_bgc_text > p {
  font-size: 16px;
  color: #3e3e3e;
  text-align: center;
}

.shopcart .van-button {
  width: 175px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #e255a3;
  margin-top: 20px;
}

.shopcart .van-button__text {
  color: #e255a3;
}
</style>
