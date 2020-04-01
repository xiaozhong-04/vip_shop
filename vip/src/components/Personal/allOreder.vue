<template>
  <div class="all_oreder">
    <!-- 顶部导航 -->
    <van-nav-bar title="全部订单" left-arrow @click-right="onClickRight" @click-left="onClickleft">
      <van-icon name="wap-home-o" slot="right" />
    </van-nav-bar>
    <!-- 通知栏 -->
    <van-notice-bar text="预定订单请下载唯品会APP查看" left-icon="volume-o" mode="link" />
    <!-- 订单内容 -->
    <!-- 没有订单情况下 -->
    <div class="on_order" v-if="orderList.length === 0">
      <img src="../../assets/images/1.png" alt />
      <p>暂无全部订单</p>
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
    },
    getOrder () {
      this.$http
        .get('/order_status', {
          params: { users_id: localStorage.getItem('user_id'), order_status: 1 }
        })
        .then(res => {
          console.log(res)
          this.orderList = res.data.data
        })
    }
  },
  created () {
    this.getOrder()
  }
}
</script>

<style>
/* 导航栏 */
.all_oreder .van-icon {
  color: #000;
}

.all_oreder .van-nav-bar::after {
  display: none;
}

.all_oreder .van-nav-bar .van-icon:before {
  font-size: 24px;
}
/* 导航栏结束 */

/* 通知栏开始 */
.all_oreder .van-notice-bar {
  background-color: #e6e8f4;
  color: #585c64;
  height: 30px;
  font-size: 12px;
}

.all_oreder .van-notice-bar .van-icon-arrow:before {
  font-size: 12px;
}
/* 通知栏结束 */
/* 订单内容开始 */
.all_oreder .on_order {
  text-align: center;
}

.all_oreder .on_order > img {
  width: 50%;
}

.all_oreder .on_order > p {
  font-size: 19px;
  color: #585c64;
}
/* 订单内容结束 */
</style>
