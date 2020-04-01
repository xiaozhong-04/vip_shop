<template>
  <div class="classify">
    <!-- 导航 -->
    <van-nav-bar left-arrow @click-left="$router.go(-1)" @click-right="$router.push('/')">
      <span class="iconfont icon-home" slot="right"></span>
      <div slot="title" class="title">
        <router-link to="/classify">分类</router-link>
        <!-- <router-link to>品牌</router-link> -->
      </div>
    </van-nav-bar>
    <!-- 搜索 -->
    <van-row class="search">
      <van-col span="24">
        <van-button type="default" to>
          <i class="iconfont icon-sousuo"></i>
          <span>搜索品牌或商品</span>
        </van-button>
        <!-- <router-link to>全部品牌</router-link> -->
      </van-col>
    </van-row>
    <!-- 侧边分类导航 -->
    <div class="navigation">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          :title="item.cname"
          v-for="item in classify"
          :key="item.id"
          @click="getGoods(item.id)"
        />
      </van-sidebar>
    </div>
    <div class="content">
      <template v-if="images[activeKey]">
        <div class="login">
          <img :src="images[activeKey]" alt="image" />
        </div>
      </template>
      <div v-for="item in goods_classify" :key="item.id" class="spfl">
        <h2>{{item.snmae}}</h2>
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="item1 in item.subCat" :key="item1.id" :to="'/goods/' + item1.id">
            <van-image :src="item1.img" />
            <span slots="text">{{item1.snmae}}</span>
          </van-grid-item>
        </van-grid>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 分类
      classify: [],
      // 侧边导航值
      activeKey: 0,
      goods_classify: [],
      images: []
    }
  },
  created () {
    this.$http.get('/categories').then(res => {
      this.classify = res.data.data
      this.classify.forEach(v => {
        this.images.push(v.img)
      })
    })
    this.getGoods(1)
  },
  methods: {
    getGoods (id) {
      this.$http.get(`/sn_categories?parent_id=${id}`).then(res => {
        this.goods_classify = res.data.sub_cat
      })
    }
  }
}
</script>

<style lang="less">
.classify {
  position: fixed;
  width: 100%;
  height: 100%;
}
// 导航
.classify .van-icon-arrow-left:before {
  color: #000;
}
.classify .title {
  width: 100%;
  padding: 10px 0;
  height: 24px;
  line-height: 24px;
  a {
    font-style: Microsoft Yahei, Helvetica Neue, Helvetica, STHeiTi, sans-serif;
    font-size: 14px;
    width: 76px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    display: inline-block;
    color: #000;
    border: 1px solid #585c64;
    background-color: #fff;
    border-radius: 5px;
  }
  a:hover {
    color: #000;
  }
  // a:first-child {
  //   border: 1px solid #585c64;
  //   border-right: none;
  //   background-color: #585c64;
  //   border-radius: 5px 0 0 5px;
  //   color: #fff;
  // }
  // a:last-child {
  //   border: 1px solid #585c64;
  //   border-left: none;
  //   border-radius: 0 5px 5px 0;
  //   color: #585c64;
  // }
}

// 搜索
.classify .search .van-col {
  background-color: #f3f4f5;
  padding: 10px 15px;
  display: flex;
  .van-button {
    font-size: 14px;
    color: #98989f;
    width: 100%;
    height: 34px;
    padding: 1px 6px;
    line-height: 32px;
    border: 1px solid #d8d8d8;
    border-radius: 2px 0 0 2px;
    i {
      vertical-align: -2%;
      margin-right: 5px;
    }
  }
  //   a {
  //   position: relative;
  //   display: block;
  //   width: 106px;
  //   height: 32px;
  //   line-height: 32px;
  //   font-size: 14px;
  //   text-align: center;
  //   background-color: #fff;
  //   border: 1px solid #d8d8d8;
  //   border-left: none;
  //   color: #000;
  //   border-radius: 0 2px 2px 0;
  // }
  //   a::after {
  //   content: "";
  //   position: absolute;
  //   left: 0;
  //   top: 7px;
  //   height: 18px;
  //   width: 1.5px;
  //   background-color: #dcdcdc;
  //   margin-top: px;
  // }
}
// 侧边导航
.navigation {
  overflow: auto;
  height: 100%;
  width: 24%;
  float: left;
  .van-sidebar {
    width: 100%;
  }
  .van-sidebar-item {
    position: relative;
    width: 100%;
    height: 46px;
    padding: 0;
    font-size: 14px;
    text-align: center;
    line-height: 46px;
    background-color: #f3f4f5;
    margin: 0;
  }
  .van-sidebar-item--select {
    background-color: #fff;
    border-color: #de3d96;
    box-sizing: border-box;
    // border: 1px solid #fff;
    padding-top: 1px;
    transform: translateY(-1px);
  }
  .van-sidebar-item--select:first-child {
    padding: 0;
    transform: translateY(0px);
  }
  .van-sidebar-item::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 1px;
    width: 65%;
    background-color: #dcdcdc;
    margin-top: px;
  }
  .van-sidebar-item--select::after {
    height: 0px;
  }
  .van-sidebar {
    padding-bottom: 110px;
    background-color: #f3f4f5;
  }
}
// 内容
.content {
  overflow: auto;
  padding-bottom: 50px;
  float: left;
  width: 76%;
  height: 100%;
  h2 {
    font-size: 12px;
    padding-top: 0.53333rem;
    margin: 0 0.74667rem 0 0.69333rem;
    letter-spacing: normal;
    overflow: hidden;
  }
  .van-image__img {
    width: 47px;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5px;
  }
  .spfl:last-child {
    padding-bottom: 120px;
  }
  .login {
    width: 86%;
    height: 100px;
    padding: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  hr{
    margin: 0 5%;
    width: 90%;
  }
}
</style>
