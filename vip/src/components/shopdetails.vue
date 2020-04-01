<template>
  <div class="shopdes">
    <!-- 顶部导航 -->
    <div class="nav">
      <div class="left">
        <img @click="$router.go(-1)" src="../assets/back.png" alt />
      </div>
      <div class="title"></div>
      <div class="right">
        <img @click="$router.push('/')" src="../assets/share.png" alt />
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swipe">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in shops" :key="index">
          <img :src="item.link" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--价格 -->
    <div class="price">
      <div class="inner">
        <span>¥{{details.price}}</span>
        <div class="discount">
          <i class="a">¥{{details.before_price}}</i>
          <i>¥{{details.discount}}折</i>
        </div>
      </div>
    </div>
    <!-- 介绍 -->
    <div class="int">
      <p>
        <span>{{details.goods_name}}</span>
      </p>
      <p
        class="int_a"
      >环球创于1988年， 以青春、 休闲、 舒适为宗旨深受消费者的青睐 以优质的帆布为鞋面，轻盈的鞋底，再加上严谨的制作流程 ，专业打造青春帆布鞋 ，环球为青春放飞梦想。</p>
    </div>
    <!-- 颜色和尺码 -->
    <div class="models">
      <div class="color">
        <div class="title">
          <span>颜色</span>
        </div>
        <div class="options">
          <div class="option" v-for="(item, index) in color" :key="index">
            <!-- <img :src="" /> -->
            <span>{{item.val_name}}</span>
          </div>
        </div>
      </div>
      <div class="size" v-if="size.length">
        <div class="title">
          <span>尺码</span>
        </div>
        <div class="options">
          <div class="option" v-for="(item, index) in size" :key="index">
            <span>{{item.val_name}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 运费-->
    <div class="freight">
      <div class="freight_box">
        <span class="tit">运费</span>
        <span class="in">新会员专享首单满38元免邮（限唯品自营商品，部分商品不可用）</span>
      </div>
    </div>
    <!-- 图文详情 -->
    <div class="datails">
      <div class="tit">图文详情</div>
      <img v-for="(item, index) in shopdes_img" :key="index" :src="item" alt />
    </div>
    <!-- 底部加入购物车 -->
    <van-goods-action>

  <van-goods-action-icon  @click="$router.push('/affirmorder')" icon="cart-o" text="购物车" />
      <van-goods-action-button @click="addshop" type="warning" text="加入购物车" />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  props: ['id'],
  data () {
    return {
      aa: false,
      shops: [],
      details: '',
      show: false,
      color: '',
      size: '',
      site: '',
      shopdes_img: [],
      num: 0
    }
  },
  created () {
    console.log(1)
    this.$http.get('/shopdesp/' + this.id).then(res => {
      this.shops = res.data.data
    })

    this.$http.get('/shopdespar/' + this.id).then(res => {
      this.details = res.data.data[0]
    })
    this.$http.get('/shopcolor/' + this.id).then(res => {
      this.color = res.data.data
    })
    this.$http.get('/shopsize/' + this.id).then(res => {
      this.siz = res.data.data
    })
    this.$http.get('/shopimg/' + this.id).then(res => {
      this.shopdes_img = res.data.data[0].goods_introduce.split(',')
      console.log(this.shopdes_img)
    })
  },
  methods: {
    // 添加购物车
    addshop () {
      let shopid = this.$route.params.id
      let userid = localStorage.getItem('user_id')
      this.$http
        .post('/catshop', {
          sid: shopid,
          uid: userid
        })
        .then(res => {
          // console.log(res)
          if (res.data.code === 0) {
            Toast('添加购物车失败')
          } else {
            Toast('添加购物车成功')
          }
        })
    }
  }
}
</script>

<style lang="less">
.shopdes {
  padding-bottom: 88px;
  background: #999999;
  position: relative;
  span {
    display: inline-block;
  }
  // 导航
  .nav {
    background-color: transparent;
    color: rgb(255, 255, 255);
    display: flex;
    height: 44px;
    width: 100%;
    line-height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    .left {
      z-index: 2;
      display: block;
      padding: 0 0.4rem;
      height: 26px;
      width: 26px;
    }
    .title {
      min-width: 270px;
      padding: 0 10px;
      height: 100%;
      flex: 1;
    }
    .right {
      z-index: 2;
      display: block;
      padding: 0 12px;
      height: 26px;
      width: 26px;
      font-size: 0.42667rem;
      float: right;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 轮播图
  .swipe {
    width: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 414px;
    }
  }
  // 价格
  .price {
    height: 48px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 0.8px solid #f7f7f7;
    .inner {
      padding-left: 10px;
      display: flex;
      span {
        margin-right: 5px;
        font-size: 25px;
        color: #222;
        line-height: 25px;
      }
      .discount {
        font-size: 13px;
        color: #98989f;
        line-height: 31px;
        .a {
          margin-right: 5px;
          text-decoration: line-through;
        }
      }
    }
  }
  // 介绍
  .int {
    padding: 0 15px 15px;
    background-color: #fff;
    p {
      padding-top: 5px;
      span {
        vertical-align: top;
        font: 14px;
        color: #222;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    .int_a {
      font-size: 12px;
      color: #98989f;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  // 颜色选择和尺码
  .models {
    margin-top: 8px;
    padding-top: 20px;
    background-color: #fff;
    .color {
      padding-bottom: 20px;
      .title {
        padding: 0 15px;
        margin-bottom: 8px;
        font-size: 0;
        span {
          display: inline-block;
          font-size: 14px;
          line-height: 14px;
          font-weight: 700;
          color: #222;
        }
      }
      .options {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .option {
          box-sizing: border-box;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          padding: 0 5px;
          margin-left: 15px;
          margin-top: 12px;
          min-width: 105px;
          height: 30px;
          border-radius: 3px;
          border: 1px solid #e5e5e5;
          text-align: center;
          img {
            -webkit-box-flex: 0;
            -ms-flex: none;
            flex: none;
            width: 19px;
            height: 19px;
            margin-right: 7px;
          }
          span {
            -webkit-box-flex: 1;
            flex: 1;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #222;
            line-height: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .size {
      padding-bottom: 20px;
      .title {
        padding: 0 15px;
        margin-bottom: 8px;
        font-size: 0;
        span {
          display: inline-block;
          font-size: 14px;
          line-height: 14px;
          font-weight: 700;
          color: #222;
        }
      }
      .options {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .option {
          box-sizing: border-box;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          padding: 0 5px;
          margin-left: 15px;
          margin-top: 12px;
          min-width: 105px;
          height: 30px;
          border-radius: 3px;
          border: 1px solid #e5e5e5;
          text-align: center;
          img {
            -webkit-box-flex: 0;
            -ms-flex: none;
            flex: none;
            width: 19px;
            height: 19px;
            margin-right: 7px;
          }
          span {
            -webkit-box-flex: 1;
            flex: 1;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #222;
            line-height: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  // 地址
  .site {
    margin-top: 8px;
    padding: 20px 15px;
    background-color: #fff;
    .address-box {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      .tit {
        -webkit-box-flex: 0;
        flex: none;
        width: 50px;
        font-size: 14px;
        line-height: 14px;
        font-weight: 700;
        color: #222;
      }
      .in {
        font-size: 12px;
        color: #585c64;
        line-height: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  // 运费
  .freight {
    padding: 10px 15px;
    background-color: #fff;
    .freight_box {
      align-items: center;
      .tit {
        width: 50px;
        font-size: 14px;
        line-height: 30px;
        font-weight: 700;
        color: #222;
      }
      .in {
        font-size: 12px;
        line-height: 20px;
        color: #585c64;
      }
    }
  }

  // 图文详情
  .datails {
    margin-top: 8px;
    padding-bottom: 20px;
    background-color: #fff;
    .tit {
      padding: 19px 15px;
      font-size: 14px;
      line-height: 14pxs;
      font-weight: 700;
      color: #222;
    }
    img {
      box-sizing: border-box;
      display: block;
      width: 100%;
    }
  }
}
</style>
