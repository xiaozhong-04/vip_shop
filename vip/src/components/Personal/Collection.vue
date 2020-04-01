<template>
  <div class="collection">
    <!-- 顶部导航 -->
    <van-nav-bar left-arrow @click-right="onClickRight" @click-left="onClickleft">
      <van-icon name="wap-home-o" slot="right" />
    </van-nav-bar>

    <!-- 内容 -->
    <van-tabs type="card" slot="title" @click="onClick">
      <!-- 商品 -->
      <van-tab title="商品">
        <div class="category_collection">
          <a href="#">全部商品</a>
          <a href="#">有货</a>
          <a href="#">降价</a>
          <a href="#">库存紧张</a>
        </div>

        <div class="category_collection_content">
          <img
            src="https://h2.vipstatic.com/ms2-m.vipstatic.com/static_v2/img/favourite-list-empty.2671fff.png"
            alt
          />
          <p>没有找到符合条件的商品</p>
        </div>
      </van-tab>
      <!-- 品牌 -->
      <van-tab title="品牌">
        <div class="category_collection_content">
          <img
            src="https://h2.vipstatic.com/ms2-m.vipstatic.com/static_v2/img/favourite-list-empty.2671fff.png"
            alt
          />
          <p>没有找到符合条件的商品</p>
        </div>
      </van-tab>
      <!-- 店铺 -->
      <van-tab title="店铺">
        <div class="category_collection_content">
          <img
            src="https://h2.vipstatic.com/ms2-m.vipstatic.com/static_v2/img/favourite-list-empty.2671fff.png"
            alt
          />
          <p>没有找到符合条件的商品</p>
        </div>
      </van-tab>
    </van-tabs>
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
    },
    onClick (index) {
      this.$toast(index)
    }
  }
}
</script>

<style>
/* 导航栏 */
.collection .van-icon {
  color: #000;
}

.collection .van-nav-bar::after {
  display: none;
}

.collection .van-icon:before {
  font-size: 24px;
}

.collection .van-tabs {
  margin-top: 10px;
}

.collection .van-tabs__nav--card .van-tab.van-tab--active {
  color: #ffffff;
  background-color: #222222;
}

.collection .van-tabs__nav--card .van-tab {
  color: #222222;
}

.collection .van-tabs__nav--card .van-tab {
  border: none;
}

.collection .van-tabs__nav--card {
  border: 1px solid #222222;
}

.collection .van-tabs--card > .van-tabs__wrap {
  position: absolute;
  top: -43px;
  z-index: 100;
  left: 31%;
}
/* 导航栏结束 */

/* 内容开始 */
.category_collection {
  height: 45px;
  background-color: #f3f4f5;
  line-height: 45px;
}

.category_collection a {
  display: inline-block;
  width: 17%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #222222;
  border: 1px solid #c6c6c6;
  margin-right: 10px;
  background-color: #ffffff;
}

.category_collection a:first-child {
  margin-left: 10px;
}

.category_collection_content img {
  width: 100%;
}

.category_collection_content p {
  font-size: 24px;
  text-align: center;
}
</style>
