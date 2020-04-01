<template>
  <div class="payment">
    <!-- 顶部导航 -->
    <van-nav-bar title="待付款订单" left-arrow @click-right="onClickRight" @click-left="onClickleft">
      <van-icon name="wap-home-o" slot="right" />
    </van-nav-bar>

    <!-- 订单内容 -->
    <!-- 没有订单情况下 -->
    <div class="on_order" v-if="shopList.length === 0">
      <img src="../../assets/images/1.png" alt />
      <p>暂无待付款订单</p>
    </div>

    <div v-else>
      <van-card
        v-for="(item,index) in shopList"
        :key="index"
        :price="item.price"
        :title="item.goods_name"
        :thumb="item.goods_img"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shopList: []
    }
  },
  methods: {
    // 返回首页
    onClickRight () {
      this.$router.push('/')
    },
    // 返回上一页
    onClickleft () {
      this.$router.back()
    },
    getShopping () {
      this.$http.get('/carts').then(res => {
        this.shopList = res.data.data
      })
    }
  },
  created () {
    this.getShopping()
  }
}
</script>

<style>
/* 导航栏 */
.payment .van-icon {
  color: #000;
}

.payment .van-nav-bar::after {
  display: none;
}

.payment .van-icon:before {
  font-size: 24px;
}
/* 导航栏结束 */

/* 订单内容开始 */
.payment .on_order {
  text-align: center;
}

.payment .on_order > img {
  width: 50%;
}

.payment .on_order > p {
  font-size: 19px;
  color: #585c64;
}
/* 订单内容结束 */
</style>
