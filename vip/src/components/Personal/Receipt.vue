<template>
  <div class="goods">
    <!-- 顶部导航 -->
    <van-nav-bar title="待收货订单" left-arrow @click-right="onClickRight" @click-left="onClickleft">
      <van-icon name="wap-home-o" slot="right" />
    </van-nav-bar>

    <!-- 订单内容 -->
    <!-- 没有订单情况下 -->
    <div class="on_order" v-if="orderList.length === 0">
      <img src="../../assets/images/1.png" alt="">
      <p>暂无待收货订单</p>
    </div>

     <div v-else>
      <van-card
        v-for="(item,index) in orderList"
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
      orderList: []
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
    }
  },
  created () {
    this.$http.get('/order_status', { params: { users_id: localStorage.getItem('user_id'), order_status: 1 } }).then(res => {
      console.log(res)
      this.orderList = res.data.data
    })
  }
}
</script>

<style>
/* 导航栏 */
.goods .van-icon {
  color: #000;
}

.goods .van-nav-bar::after {
  display: none;
}

.goods .van-icon:before {
  font-size: 24px;
}
/* 导航栏结束 */

/* 订单内容开始 */
.goods .on_order{
  text-align: center;
}

.goods .on_order>img{
  width: 50%;
}

.goods .on_order>p{
  font-size: 19px;
  color: #585c64;
}
/* 订单内容结束 */
</style>
