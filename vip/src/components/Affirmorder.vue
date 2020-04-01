<template>
  <div class="affirmorder">
    <div class="nav_top">
      <van-nav-bar title="确认订单" left-arrow @click-left="onClickLeft">
        <span v-show="show" slot="right" class="timer_clock">{{minute}}:{{second}}</span>
      </van-nav-bar>
    </div>
    <div class="affirmorder-safety-tips">
      <div class="affirmorder-icon-safe"></div>
      <div class="affirmorder-text-safe">你正在安全购物环境中，请放心购买</div>
    </div>
    <!-- 设置收货地址 -->
    <div class="setaddress" v-show="!address_show">
      <van-nav-bar left-text="设置收货地址">
        <a href="javascript:;" slot="right" class="setaddress_next">
          <i></i>
        </a>
      </van-nav-bar>
    </div>
    <!-- 收货人信息 -->
    <div class="addressInfo" v-show="address_show" v-for="(item,index) in address" :key="index">
      <div class="addressInfo-one">
        <p class="users-gitgoods">{{item.deliver_name}}</p>
        <p class="users-gitmobile">{{item.phone}}</p>
      </div>
      <div class="addressInfo-two">
        <p>{{item.province}}省{{item.city}}市{{item.county}}{{item.street}}{{item.detail}}</p>
      </div>
      <div class="addressInfo-three">
        <p v-if="item.deliver_time === 0">收货时间不限</p>
        <p v-if="item.deliver_time === 1">周六日/节假日收货</p>
        <p v-if="item.deliver_time === 2">周一至周五收货</p>
      </div>
      <div class="addressInfo-four">
        <i></i>
      </div>
      <div class="addressInfo-five">
        <p>预计1个包裹，11月29日（周五）送达</p>
        <a href="javascript:;" class="addressInfo-five-icon">
          <i></i>
        </a>
      </div>
    </div>
    <div>
      <h2 class="shopInfo-category">精选特卖</h2>
    </div>
    <!-- 商品信息 -->
    <div class="shopInfo" v-for="item in goods" :key="item.id">
      <van-card :title="item.goods_name" :thumb="item.goods_img">
        <div slot="desc" class="van-card_desc">
          <p>{{item.goods_desc}}</p>
        </div>
        <div slot="tags">
          <van-tag plain type="danger">不支持七天无理由退换</van-tag>
        </div>
        <div slot="price" class="van-card_step">
          <van-stepper v-model="item.cart_count" />
        </div>
      </van-card>
      <!-- 现价and原价 -->
      <a href="javascript:;" class="van-card_price">
        <p class="current_price">{{item.price}}</p>
        <p class="original_price">
          <del>￥{{item.before_price}}</del>
        </p>
      </a>
      <!-- 删除商品叉叉 -->
      <a href="javascript:;" class="close" @click="delCartgoods(item.goods_id)"></a>
    </div>
    <!-- 总价格 -->
    <div class="merge_price">
      <p class="merge_price_price">{{totalPrice}}</p>
      <ul>
        <li class="merge_price_info clearfix">
          <span>免邮</span>
          <p>唯品国际商品已满88元，已享免10元运费</p>
        </li>
        <li class="merge_price_info clearfix">
          <span>限免</span>
          <p>唯品快抢商品仅支持叠加参与买赠、返券、免邮活动，不支持使用优惠券及满减、折扣、任选活动</p>
        </li>
      </ul>
    </div>
    <!-- 零钱已升级 -->
    <div class="loose_price">零钱已升级，提交订单后可在支付列表使用</div>
    <!-- 结算 -->
    <div class="all_price">
      <p class="all_price_p clearfix">
        <span class="all_price_aaa">订单金额</span>
        <span class="all_price_bbb">￥{{totalPrice}}</span>
      </p>
      <p class="all_price_p clearfix">
        <span>商品总价格</span>
        <span>￥{{totalPrice}}</span>
      </p>
      <p class="all_price_p clearfix">
        <span>运费</span>
        <span>含运费￥0.00</span>
      </p>
    </div>
    <van-divider>
      <p class="footer_text">
        本人承诺所购商品系个人合理自用,
        <br />现委托商家代理申报、代缴税款等通关事宜
      </p>
    </van-divider>

    <!-- 底部支付框 -->
    <div class="pay_box">
      <p class="pay_box_one">
        还需支付:
        <span>￥{{totalPrice}}</span>
      </p>
      <p class="pay_box_two">海淘或预定商品,暂不支持货到付款</p>
      <p class="pay_box_three">
        <van-button type="default" disabled class="pay_box_three_btnone">货到付款</van-button>
        <van-button
          type="default"
          class="pay_box_three_btntwo"
          to="/cashierdesk"
          @click="onlinePay"
        >在线支付</van-button>
      </p>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      value: '',
      minutes: 19,
      seconds: 59,
      show: true,
      address: [], // 用户地址
      address_show: false,
      goods: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/')
    },
    // 倒计时
    num (n) {
      return n < 10 ? '0' + n : '' + n
    },
    add () {
      var _this = this
      var time = window.setInterval(function () {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59
          _this.minutes -= 1
        } else if (_this.minutes === 0 && _this.seconds === 1) {
          _this.seconds = 0
          window.clearInterval(time)
          _this.$router.push('/shopcart')
        } else {
          _this.seconds -= 1
        }
      }, 1000)
    },
    // 获取用户地址信息
    getUsersAddress () {
      let usersId = JSON.parse(localStorage.getItem('user_id'))
      this.$http.get('/users_address?id=' + usersId).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.address.push(res.data.data[0])
          // console.log(this.address)
          localStorage.setItem('addressId', this.address[0].id)
          this.address_show = true
        } else {
          this.address_show = false
        }
      })
    },
    // 获取商品信息
    getUsersGoods () {
      let userId = JSON.parse(localStorage.getItem('user_id'))
      this.$http.get('/users_goods?userId=' + userId).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          if (res.data.data.length !== 0) {
            this.goods = res.data.data
          } else {
            this.$router.push('/shopcart')
          }
        }
      })
    },
    // 删除购物车商品
    delCartgoods (goodId) {
      Dialog.confirm({
        message: '删除商品可能会被别人抢走哦，要删除吗？',
        confirmButtonText: '删除',
        cancelButtonText: '先留着'
      }).then(() => {
        let userId = JSON.parse(localStorage.getItem('user_id'))
        this.$http
          .post(
            '/del_users_goods',
            qs.stringify({ userId: userId, goodsId: goodId })
          )
          .then(res => {
            // console.log(res)
            this.getUsersGoods()
          })
          .catch(() => {})
      })
    },
    onlinePay () {
      let totalPrice = this.totalPrice
      localStorage.setItem('totalPrice', totalPrice)
    }
  },
  watch: {
    second: {
      handler (newVal) {
        this.num(newVal)
      }
    },
    minute: {
      handler (newVal) {
        this.num(newVal)
      }
    },
    goods: {
      deep: true, // 深度监听
      handler: function () {
        let userId = JSON.parse(localStorage.getItem('user_id'))
        // 调取后台接口 把商品数量写回数据库
        this.goods.forEach(v => {
          this.$http
            .post(
              '/users_goods_count',
              qs.stringify({
                count: v.cart_count,
                userId: userId,
                goodsId: v.goods_id
              })
            )
            .then(res => {})
        })
      }
    }
  },
  computed: {
    second: function () {
      return this.num(this.seconds)
    },
    minute: function () {
      return this.num(this.minutes)
    },
    // 总价格
    totalPrice: function () {
      let sum = 0
      this.goods.forEach(v => {
        // 如果勾选了 就把价格加到总价上
        sum += v.cart_count * v.price
      })
      // 组件中price默认单位为分
      return sum
    }
  },
  created () {
    this.add()
    this.getUsersAddress()
    this.getUsersGoods()
  }
}
</script>

<style>
html,
body,
.affirmorder {
  width: 100%;
  height: 100%;
}

.affirmorder {
  height: 100%;
  background-color: #f3f4f5;
}

.affirmorder .van-nav-bar__title {
  font-size: 18px;
}

.timer_clock {
  margin-right: 75px;
  font-size: 16px;
  color: #e80080;
}

.affirmorder .van-icon-arrow-left:before {
  color: #696969;
}

.affirmorder .affirmorder-safety-tips {
  position: relative;
  height: 34px;
  background-color: #ffffff;
  padding: 5px 14px;
  box-sizing: border-box;
}

.affirmorder-icon-safe {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: pink;
  margin-right: 10px;
  background-image: url("../assets/images/22.png");
}

.affirmorder .affirmorder-text-safe {
  display: inline-block;
  position: absolute;
  top: 10px;
  left: 45px;
}

.affirmorder .setaddress .van-nav-bar {
  position: relative;
  background-color: #656c89;
}

.affirmorder .setaddress_next {
  position: absolute;
  top: -26px;
  right: 4px;
  display: block;
}

.affirmorder .setaddress_next > i {
  display: block;
  width: 7px;
  height: 7px;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
}

.affirmorder .van-nav-bar__text {
  color: #ffffff;
  font-size: 16px;
}

.affirmorder .addressInfo {
  position: relative;
  padding: 14px 40px 14px 15px;
  background-color: #656c89;
  color: #ffffff;
  font-size: 14px;
}

.affirmorder .addressInfo-one {
  height: 20px;
  line-height: 20px;
}

.affirmorder .addressInfo-one > p {
  display: inline-block;
  margin-right: 15px;
}

.affirmorder .addressInfo-three,
.affirmorder .addressInfo-two {
  margin-top: 10px;
}

.affirmorder .addressInfo-four {
  position: absolute;
  top: 60px;
  right: 15px;
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.affirmorder .addressInfo-four > i {
  display: block;
  width: 7px;
  height: 7px;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
}

.affirmorder .addressInfo-five {
  border-top: 1px solid #5d647e;
  padding: 10px 0 0 0;
  margin-top: 15px;
}

.affirmorder .addressInfo-five-icon {
  position: absolute;
  top: 140px;
  right: 15px;
  width: 14px;
  height: 14px;
}

.affirmorder .addressInfo-five-icon > i {
  display: block;
  width: 7px;
  height: 7px;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
}

.affirmorder .shopInfo-category {
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  padding-left: 20px;
  background-color: #fff;
  margin-top: 10px;
}

.affirmorder .van-card {
  margin-top: 0;
}

/* 商品卡片start */
.affirmorder .van-card__title {
  padding-right: 25%;
  font-size: 13px;
  line-height: 17px;
}

.affirmorder .van-card_desc > p {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.affirmorder .van-tag {
  border: 1px solid #3a5998;
  color: #3a5998;
  margin-top: 10px;
}

.affirmorder .van-card_step {
  margin-top: 5px;
}

.affirmorder .shopInfo {
  position: relative;
}

.affirmorder .van-card_price {
  position: absolute;
  top: 55px;
  right: 15px;
  display: inline-block;
  /* width: 20px; */
}

.affirmorder .current_price {
  width: 75px;
  text-align: right;
  font-size: 13px;
  color: #000;
}

.affirmorder .original_price {
  width: 75px;
  text-align: right;
  font-size: 12px;
  color: #98989f;
}

.affirmorder .current_price::before {
  content: "￥";
}

.close {
  position: absolute;
  right: 32px;
  bottom: 15px;
  width: 12px;
  height: 12px;
  display: inline-block;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 12px;
  width: 1px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
/* 商品卡片end */
.merge_price {
  padding: 0 5%;
  background-color: #ffffff;
}
.merge_price_price {
  height: 45px;
  line-height: 45px;
  border-top: 1px solid #cccccc;
  font-size: 14px;
  text-align: right;
}

.merge_price_info {
  margin-top: 10px;
}

.merge_price > ul {
  height: 70px;
}

.merge_price_info > span {
  display: inline-block;
  float: left;
  width: 10%;
  height: 15px;
  line-height: 15px;
  text-align: center;
  border: 1px solid #3a5998;
  color: #3a5998;
  border-radius: 3px;
  margin-right: 5px;
}

.merge_price_info > p {
  display: inline-block;
  float: left;
  width: 87%;
  line-height: 23px;
  color: #999;
}

.clearfix {
  clear: both;
}

.loose_price {
  padding: 0 5%;
  height: 40px;
  line-height: 40px;
  background-color: #f3f4f5;
  font-size: 13px;
  color: #585c64;
}

.all_price {
  padding: 0 5%;
  margin-bottom: 10px;
  background-color: #fff;
}

.all_price_p {
  height: 30px;
  line-height: 30px;
}

.all_price_p:nth-child(1) {
  margin-bottom: 20px;
}

.all_price_p > span {
  font-size: 13px;
}

.all_price_aaa {
  font-weight: bold;
}

.all_price_bbb {
  color: #e80080;
  font-weight: bold;
}

.all_price_p > span:nth-child(1) {
  float: left;
}

.all_price_p > span:nth-child(2) {
  float: right;
}

.affirmorder .footer_text {
  display: block;
  text-indent: 2em;
  font-size: 12px;
}

.affirmorder .van-divider {
  border-color: #333;
  background-color: #f3f4f5;
  padding: 30px 0;
  margin-bottom: 0;
  padding-bottom: 200px;
}

/* 底部支付框 */
.affirmorder .pay_box {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  border-top: 1px solid #caccd2;
  padding: 5%;
  background-color: #fff;
  box-sizing: border-box;
}

.affirmorder .pay_box_one {
  width: 100%;
  font-size: 16px;
  text-align: center;
}

.affirmorder .pay_box_one > span {
  color: #e80080;
}

.affirmorder .pay_box_two {
  width: 100%;
  text-align: center;
  color: #98989f;
  margin-top: 8px;
}

.affirmorder .pay_box_three {
  margin-top: 8px;
}

.pay_box_three_btnone,
.pay_box_three_btntwo {
  width: 45%;
}

.pay_box_three_btnone {
  margin-right: 10%;
  border: 1px solid #caccd2;
}

.pay_box_three_btntwo {
  color: #ffffff;
  background-color: #e80080;
  border: none;
}
</style>
