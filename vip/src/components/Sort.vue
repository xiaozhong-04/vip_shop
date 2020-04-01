<template>
  <div class="sort">
    <div v-if="show">
      <!-- 搜索框 -->
      <van-row class="search">
        <van-col span="24">
          <van-button type="default" to>
            <span>大家都在搜: 百丽</span>
            <i class="iconfont icon-sousuo"></i>
          </van-button>
          <!-- <router-link to>全部品牌</router-link> -->
        </van-col>
      </van-row>
      <!-- 分类 -->
      <div class="sort_1">
        <div class="img">
          <img :src="sort.images" alt />
        </div>
        <div class="sort_2">
          <van-grid :border="false" :column-num="4">
            <van-grid-item
              v-for="item in sort.san"
              :key="item.id"
              @click="$router.push('/goods/' + item.id)"
            >
              <van-image round width="63px" height="63px" :src="item.img" />
              <span slots="text" style="margin-top: 10px;">{{item.snmae}}</span>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <!-- 商品展示 -->
      <div class="sort_3">
        <van-grid :border="false" :column-num="1">
          <van-grid-item
            v-for="(item,index) in goods"
            :key="index"
            @click="$router.push(`/shopdes/${item.id}`)"
          >
            <van-image :src="item.goods_img" />
            <div slots="text" style="margin-top: 10px;">
              <span class="price">¥{{item.price}}</span>
              <span class="del">¥{{item.before_price}}</span>
              <span class="desc" v-if="item.discount">{{item.discount}}折</span>
              <div class="product-msg-box">
                <div class="product-name">{{item.goods_name}}</div>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
        <van-button color="#e8439e" @click="getGoods">
          加载更多
          <i></i>
        </van-button>
      </div>
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
      <div class="cxjz"><van-button type="info" @click="$router.push('/sort/' + id)">重新加载</van-button></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      sort: [],
      goods: [],
      loading: false,
      finished: false,
      show: true
    }
  },
  created () {
    this.$http.get('/storey/' + this.id).then(res => {
      this.sort = res.data.data
    })
    this.getGoods()
  },
  methods: {
    getGoods () {
      this.$http.get(`/storey/${this.id}/goods`).then(res => {
        if (res.data.data.length === 0) {
          this.show = false
        } else {
          this.show = true
        }
        if (this.goods.length <= 300) {
          this.goods.push(...res.data.data)
        }
      })
    }
  }
}
</script>

<style lang="less">
// 搜索
.sort .search {
  position: relative;
  .van-col {
    padding: 10px 15px;
    display: flex;
    .van-button {
      background-color: #f3f4f5;
      text-align: left;
      font-size: 14px;
      color: #98989f;
      width: 100%;
      height: 28px;
      padding: 1px 15px;
      line-height: 26px;
      border: 1px solid #d8d8d8;
      border-radius: 3px;
      i {
        position: absolute;
        right: 0;
        vertical-align: -2%;
        margin-right: 5px;
      }
    }
  }
}

// 分类
.sort .img {
  width: 360px;
  height: 120px;
  overflow: hidden;
  object-fit: contain;
  img {
    width: 100%;
    height: 100%;
  }
}
.sort_3 {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  padding-bottom: 30px;
  .price {
    width: 38px;
    height: 14px;
    font-size: 14px;
    font-weight: 700;
    font-family: PingFangSC-Medium;
  }
  .del,
  .desc {
    width: 38px;
    height: 14px;
    font-size: 12px;
    margin-left: 5px;
    color: #98989f;
    text-decoration: line-through;
  }
  .desc {
    text-decoration: none;
  }
  .product-msg-box {
    height: 30px;
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
  .van-button {
    position: relative;
    display: block;
    width: 60%;
    height: 30px;
    line-height: 30px;
    margin: 10px auto;
    i {
      position: absolute;
      top: 3px;
      right: 65px;
      width: 8px;
      height: 23px;
      background: url("../assets/images/xia.png") no-repeat 50%;
      background-size: 100%;
    }
  }
}
.sort .logo {
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
.sort .cxjz .van-button {
  display: block;
  width: 80%;
  height: 50px;
  line-height: 50px;
  margin: 250px auto;
  border-radius: 5px;
}
</style>
