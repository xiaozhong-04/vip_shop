<template>
  <div class="brand">
    <!--顶部 -->
    <div class="header">
      <!-- 导航蓝 -->
      <div class="nav">
        <div class="left">
          <img src="../assets/back.png" alt />
        </div>
        <div class="title"></div>
        <div class="right">
          <img src="../assets/home.png" alt />
        </div>
      </div>
      <!-- 品牌背景图 -->
      <div class="logo">
        <div class="box">
          <img :src="branks.image" alt />
        </div>
      </div>
    </div>
    <!-- 品牌介绍 -->
    <div class="brandint">
      <div class="top">
        <div class="logo">
          <img :src="branks.logo" />
        </div>
        <div class="title">{{branks.name}}</div>
        <div class="collect">
          <van-button color="#de3d96" size="mini" plain>收藏</van-button>
          <span class="fans">{{branks.fans}}万粉丝</span>
        </div>
      </div>
      <div class="btn">
        <span class="explain">{{branks.int}}</span>
        <p>
          <span class="none"></span>
          <span class="unfold">
            展开
            <van-icon name="arrow-down" />
          </span>
        </p>
      </div>
    </div>
    <!-- 筛选排序 -->
    <div class="rank">
      <ul>
        <li>
          <div>价格</div>
        </li>
        <li>
          <div>折扣</div>
        </li>
        <li>
          <div>筛选</div>
        </li>
      </ul>
    </div>
    <!-- 宫格 -->
    <van-grid :gutter="5" :column-num="2">
      <van-grid-item>
        <div class="shopl">
          <img src="../assets/shop.jpg" alt />
        </div>
        <div class="shoptit">
          <div class="price">
            <span class="one">
              ￥369
              <i class="original">￥499</i>
              <i>7折</i>
            </span>
          </div>
          <span class="state">男鞋高帮帆布鞋男复古高帮鞋男休闲鞋男运动鞋男</span>
        </div>
      </van-grid-item>

    </van-grid>
  </div>
</template>
<script>
export default {
  data () {
    return {
      branks: ''
    }
  },
  // 首屏数据
  created () {
    this.$http.get('/brand').then(res => {
      this.branks = res.data.data
    })
  }
}
</script>
<style lang="less">
.brand {
  position: relative;
  background-color: #f3f4f5;
  overflow: hidden;
  // 头部
  .header {
    .nav {
      background-color: transparent;
      color: rgb(255, 255, 255);
      display: flex;
      height: 44px;
      line-height: 60px;
      .left {
        z-index: 2;
        display: block;
        padding: 0 0.4rem;
        height: 26px;
        width: 26px;
      }
      .title {
        min-width: 0.58667rem;
        padding: 0 0.4rem;
        height: 100%;
        flex: 1;
      }
      .right {
        z-index: 2;
        display: block;
        padding: 0 0.4rem;
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
    .logo {
      height: 61px;
      .box {
        position: absolute;
        height: 105px;
        top: 0;
        left: 0;
        right: 0;
        overflow: hidden;
      }

      img {
        height: auto;
        width: 100%;
      }
    }
  }
  // 品牌介绍介绍
  .brandint {
    position: relative;
    background-color: #fff;
    margin-bottom: 12px;
    .top {
      display: flex;
      align-items: center;
      position: relative;
      height: 44px;
      padding-bottom: 20px;
      margin: 0 22px;
      .logo {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        position: absolute;
        z-index: 1240;
        top: -25px;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 0.05333rem;
        height: 72px;
        width: 72px;
        padding: 4px;
        img {
          // padding-top: 15px;
          height: auto;
          width: 100%;
          max-height: 100%;
        }
      }
      .title {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: normal;
        font-weight: 600;
        margin-left: 80px;
        font-size: 15px;
        color: #222;
        -webkit-box-flex: 1;
        flex: 1;
      }
      .collect {
        position: relative;
        display: block;
        text-align: center;
        -webkit-appearance: none;
        border: 0;
        box-sizing: border-box;
        outline: 0;
        padding: 0;
        margin: 0;
        font-family: PingFang-SC-Regular, Helvetica Neue, Helvetica,
          microsoft yahei, sans-serif;
        .fans {
          position: absolute;
          right: 0;
          bottom: -16.7px;
          font-size: 5px;
          color: #585c64;
          white-space: nowrap;
          text-align: center;
        }
      }
    }
    .btn {
      margin: 0 15px;
      font-size: 12px;
      color: #585c64;
      letter-spacing: 0;
      line-height: 12px;
      .explain {
        -webkit-line-clamp: 2;
        line-height: 18px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }
      p {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        font-size: 0.32rem;
        color: #98989f;
        line-height: 19px;
        .none {
          -webkit-box-flex: 1;
          flex: 1;
        }
        .unfold {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
        }
      }
    }
  }
  // 排序
  .rank {
    width: 100%;
    height: 41px;
    font-size: 12px;
    text-align: center;
    color: #585c64;
    background: #fff;
    overflow: hidden;
    margin-bottom: 10px;
    ul {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      li {
        display: flex;
        line-height: 42px;
        -webkit-box-flex: 1;
        flex: 1;
        border-right: 1px solid #e5e5e5;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
      }
    }
  }
  //宫格
  .van-grid-item__content {
    padding: 0;
  }
  .shopl {
    width: 178px;
    height: 225px;
    position: relative;
    padding: 0;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .shoptit {
    width: 158px;
    height: 68px;
    position: relative;
    .price {
      color: rgb(34, 34, 34);
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-align: left;
      font-size: 12.5px;
      margin: 2px 0;
      font-family: Microsoft Yahei, Tahoma, Arial, Roboto, Droid Sans,
        Helvetica Neue, Droid Sans Fallback, Heiti SC, sans-self;
      .original {
        text-decoration: line-through;
      }
      i {
        transform: scale(0.916);
        display: inline-block;
        white-space: nowrap;
        color: #98989f;
      }
    }
    .state {
      color: #585c64;
      font-size: 12px;
      text-align: left;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
