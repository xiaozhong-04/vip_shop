<template>
  <div class="index">
    <!-- 登录顶部 -->
    <van-row>
      <van-col span="3">
        <span @click="GoLogin" v-if="token === null">登录</span>
        <van-icon name="manager-o" v-if="token" @click="GoMe" />
      </van-col>
      <van-col span="18">
        <van-cell-group>
          <van-field placeholder="请根据商品名搜索" />
        </van-cell-group>
      </van-col>
      <van-col span="3">
        <van-icon name="apps-o" @click="$router.push('/classify')" />
      </van-col>
    </van-row>

    <!-- 分类导航 -->
    <router-view></router-view>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  data () {
    return {
      categoryList: [], // 分类列表
      token: ''
    }
  },
  methods: {
    GoLogin () {
      this.$router.push('/login')
    },
    onClick () {},
    GoMe () {
      this.$router.push(`/me`)
    }
  },
  created () {
    this.$http.get('/lcategories').then(res => {
      this.categoryList = res.data.data
    })

    this.token = localStorage.getItem('token')
  }
}
</script>

<style>
.index .van-row {
  margin-top: 10px;
}

.index .van-col {
  text-align: center;
}
.index .van-row span {
  display: inline-block;
  font-size: 14px;
  height: 44px;
  line-height: 40px;
}

.index .van-row .van-cell-group {
  width: 100%;
  display: inline-block;
  font-size: 14px;
  height: 44px;
  line-height: 40px;
  border: none;
}

.index .van-row .van-cell-group::after {
  display: none;
}

.index .van-row .van-field {
  background-color: #eeeeee;
  border-radius: 50px;
  border: 1px solid #ccc;
  height: 30px;
  margin-top: 7px;
}

.index .van-row .van-field .van-cell__value--alone {
  height: 30px;
  margin-top: -10px;
}

.index .van-row .van-icon {
  line-height: 44px;
  font-size: 22px;
}

.index .van-tabs__line {
  background-color: #d34ba8;
}

.index .van-tab--active {
  color: #d34ba8;
}
</style>
