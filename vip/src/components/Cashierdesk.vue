<template>
  <div class="cashierdesk">
    <van-nav-bar title="唯品会收银台" left-text="退出" @click-left="payDialog" />
    <!-- 状态 -->
    <div class="step">
      <van-steps :active="active">
        <van-step>提交订单</van-step>
        <van-step>付款</van-step>
      </van-steps>
      <p class="step_text">
        订单提交成功，请在
        <span>{{minute}}:{{second}}</span>
        内完成付款
      </p>
    </div>
    <!-- 选择支付方式 -->
    <div class="checkbox">
      <van-radio-group v-model="radio">
        <van-radio name="1">
          <span class="payIcon_1">
            <img src="../assets/images/payIcon_1.png" alt />
          </span>唯品支付银行卡
        </van-radio>
        <van-radio name="2">
          <span class="payIcon_2">
            <img src="../assets/images/payIcon_2.png" alt />
          </span>微信支付
        </van-radio>
        <van-radio name="3">
          <span class="payIcon_3">
            <img src="../assets/images/payIcon_3.png" alt />
          </span>支付宝
        </van-radio>
      </van-radio-group>
    </div>
    <!-- 提交按钮 -->
    <div class="payBtn">
      <p>
        支付
        <span>￥{{totalPrice}}</span>
      </p>
      <van-button
        :disabled="this.radio? false:true"
        type="default"
        class="payBtn_btn"
        to="/affirmpay"
      >去付款</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  data () {
    return {
      active: 0,
      radio: false,
      minutes: 29,
      seconds: 59,
      totalPrice: JSON.parse(localStorage.getItem('totalPrice'))
    }
  },
  methods: {
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
          Dialog.alert({
            message: '该订单已失效'
          })
          _this.$router.push('/shopcart')
        } else {
          _this.seconds -= 1
        }
      }, 1000)
    },
    payDialog () {
      Dialog.confirm({
        title: '放弃支付吗？',
        message: '已提交的订单需在30分钟内完成支付，不然就会被取消订单了哦~',
        cancelButtonText: '继续支付',
        confirmButtonText: '不支付了'
      })
        .then(() => {
          this.$router.push('/affirmorder')
        })
        .catch(() => {
          return false
        })
    }
  },
  created () {
    this.add()
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
    }
  },
  computed: {
    second: function () {
      return this.num(this.seconds)
    },
    minute: function () {
      return this.num(this.minutes)
    }
  }
}
</script>

<style>
body,
html,
.cashierdesk {
  width: 100%;
  height: 100%;
}

.cashierdesk {
  background-color: #f3f3f3;
}

.cashierdesk .van-nav-bar__title {
  font-size: 16px;
}

.cashierdesk .van-nav-bar__text {
  color: #999;
}

.cashierdesk .step {
  height: 100px;
  background-color: #f2fdec;
}

.cashierdesk .van-steps {
  width: 50%;
  background-color: #f2fdec;
  margin-left: calc(50% / 2);
}

.cashierdesk .step_text {
  text-align: center;
}

.cashierdesk .step_text > span {
  font-size: 13px;
  color: #e4007f;
  font-weight: bold;
}

.cashierdesk .checkbox {
  background-color: #fff;
}

.cashierdesk .van-radio {
  height: 57px;
  line-height: 57px;
  font-size: 14px;
  border-bottom: 1px solid #e7e7e7;
  margin-left: 10px;
  box-sizing: border-box;
}

.cashierdesk .payIcon_1,
.cashierdesk .payIcon_2,
.cashierdesk .payIcon_3 {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid #dddddd;
  border-radius: 2px;
  margin-right: 10px;
}

.cashierdesk .payIcon_3 {
  border: none;
}

.cashierdesk .payIcon_1 > img,
.cashierdesk .payIcon_2 > img,
.cashierdesk .payIcon_3 > img {
  width: 18px;
  height: 18px;
  display: block;
}

.cashierdesk .payBtn {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 88px;
  background-color: #fff;
  padding-top: 10px;
}

.cashierdesk .payBtn > p {
  width: 100%;
  text-align: center;
  font-size: 14px;
}

.cashierdesk .payBtn > p > span {
  font-weight: bold;
}

.cashierdesk .payBtn_btn {
  width: 80%;
  background-color: #e03897;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: calc(20% / 2);
}

.cashierdesk .van-button__text {
  color: #fff;
}
</style>
