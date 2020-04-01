<template>
  <div class="goods">
    <div v-if="show">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="0"
      >
        <van-cell>
          <div
            class="goods_s"
            v-for="item in goods"
            :key="item.id"
            @click="$router.push(`/shopdes/${item.id}`)"
          >
            <div class="img">
              <img :src="item.goods_img" alt />
              <span></span>
              <i></i>
            </div>
            <div class="main-price">
              <span class="tag fast-tag">快抢价</span>
              <span class="price">¥{{item.price}}</span>
              <span class="del">¥{{item.before_price}}</span>
              <span class="desc" v-if="item.discount">{{item.discount}}折</span>
            </div>
            <div class="product-msg-box">
              <div class="product-name">{{item.goods_name}}</div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
    <div v-else>
      <div class="logo">
        <div class="logo_1">
          <div class="logo_2"></div>
          <div class="logo_3">
            <h1>
              <span>该网页无法正常运作</span>
            </h1>
            <p>如果问题仍然存在，请与网站所有者联系。</p>
            <p>HTTP ERROR 412</p>
          </div>
        </div>
      </div>
      <div class="cxjz"><van-button type="info" @click="$router.push('/goods/' + id)">重新加载</van-button></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      goods: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      show: true
    }
  },
  methods: {
    onLoad () {
      this.$http
        .get(
          `/categories_goods/${this.id}?page=${this.page}&per_page=${this.per_page}`
        )
        .then(res => {
          if (res.data.data.length === 0) {
            this.show = false
          } else {
            this.show = true
          }
          this.goods.push(...res.data.data)
          this.page += 1
          // 加载状态结束
          this.loading = false
          // 数据全部加载完成
          if (this.goods.length >= 300) {
            this.finished = true
          }
        })
    }
  }
}
</script>

<style lang="less">
.goods {
  overflow: hidden;
  padding-bottom: 20px;
  height: 100%;
  .van-cell__value {
    background-color: #f3f4f5;
  }
  .van-cell {
    padding: 0;
  }
  .goods_s {
    float: left;
    width: 47%;
    background-color: #fff;
    box-sizing: border-box;
    margin: 2.2% 0 0 2.2%;
    border-radius: 5px;
    overflow: hidden;
  }
  .img {
    position: relative;
    width: 168px;
    height: 168px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    span {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 12;
      width: 32px;
      height: 32px;
      background: url("../assets/images/1567393660571.png") no-repeat;
      background-size: 100%;
    }
    i {
      position: absolute;
      bottom: 5px;
      right: 5px;
      z-index: 12;
      width: 10px;
      height: 23px;
      background: url("../assets/images/xiaodian.jpg") no-repeat;
      background-size: 100%;
    }
  }
  .main-price {
    line-height: 14px;
    font-size: 0;
    color: #222;
    padding: 14px 0;
    height: 15px;
    overflow: hidden;
    box-sizing: content-box;
    .fast-tag {
      background: linear-gradient(90deg, #de3d96, #cb78dc);
      font-size: 0.26666666666666666rem;
      height: 0.39999999999999997rem;
      line-height: 0.39999999999999997rem;
      padding: 0 0.10666666666666666rem;
      color: #fff;
      border-radius: 0.21333333333333332rem;
    }
    .price {
      width: 38px;
      height: 14px;
      font-size: 15px;
      margin-left: 5px;
      font-weight: 700;
      font-family: PingFangSC-Medium;
    }
    .del,
    .desc {
      width: 38px;
      height: 14px;
      font-size: 13px;
      margin-left: 5px;
      color: #98989f;
      text-decoration: line-through;
    }
    .desc {
      text-decoration: none;
    }
  }
  .product-msg-box {
    height: 66px;
    padding: 0 8px;
    box-sizing: border-box;
    .product-name {
      width: 100%;
      overflow: hidden;
      font-family: PingFangSC-Regular;
      color: #585c64;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
.goods .logo {
  width: 86%;
  margin: 44px 0 150px 0;
  padding: 0 7%;
  .logo_1 {
    width: 100%;
    height: 218px;
    padding-bottom: 40px;
  }
  .logo_2 {
    width: 72px;
    height: 72px;
    margin-bottom: 36px;
    background: url("../assets/images/logo.png") no-repeat;
    background-size: 100%;
  }
  .logo_3 {
    h1 {
      margin-bottom: 15px;
    }
    span {
      font-size: 22px;
      font-weight: 500;
    }
    p {
      font-size: 14px;
      color: #5f6368;
      margin-bottom: 10px;
      font-family: "Segoe UI", Arial, "Microsoft Yahei", sans-serif;
    }
  }
}
.goods .cxjz .van-button {
  display: block;
  width: 80%;
  height: 50px;
  line-height: 50px;
  margin: 250px auto;
  border-radius: 5px;
}
</style>
