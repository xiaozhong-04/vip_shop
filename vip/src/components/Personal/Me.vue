<template>
  <div class="me">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-right="onClickRight" @click-left="onClickleft">
      <van-icon name="wap-home-o" slot="right" />
    </van-nav-bar>

    <!-- 用户头像 -->
    <div class="avatar">
      <van-uploader :after-read="afterRead">
        <van-image round :src="users.avatar" slot="default" />
      </van-uploader>
      <p>
        <van-image
          src="https://h2.appsimg.com/a.appsimg.com/upload/uls/0/2018/12/11/150/deae2906957a4f30a33577a686379f4f.png"
        ></van-image>银卡会员
      </p>
      <p>{{users.phone}}</p>
    </div>

    <!-- 订单 -->
    <div class="order">
      <van-grid :column-num="3">
        <van-grid-item text="待收款" @click="GoPayment">
          <van-icon name="failure" slot="icon" />
        </van-grid-item>

        <van-grid-item text="待收货" @click="GoGoods">
          <van-icon name="records" slot="icon" />
        </van-grid-item>

        <van-grid-item text="全部订单" @click="GoAllOreder">
          <van-icon name="completed" slot="icon" />
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 关于用户 -->
    <div class="about">
      <van-cell is-link @click="GoCollection">我的收藏</van-cell>
      <van-cell is-link @click="GoShopping">购物车历史</van-cell>
      <van-cell is-link @click="GoBrowsing">浏览历史</van-cell>
      <van-cell is-link>申请退换</van-cell>
      <van-cell is-link>零钱</van-cell>
      <van-cell is-link>唯品花</van-cell>
      <van-cell is-link>优惠券</van-cell>
      <van-cell is-link>我的唯品币</van-cell>
      <van-cell is-link @click="GoAddress">收货地址</van-cell>
      <van-cell is-link @click="GoEditPassword">修改登录密码</van-cell>
      <van-cell is-link>管理支付密码</van-cell>
      <van-cell is-link @click="GoEditMobile">绑定手机</van-cell>
      <van-cell is-link>实名认证</van-cell>
      <van-cell is-link>我的银行卡</van-cell>
    </div>

    <!-- 退出登录 -->
    <div class="loginOut">
      <van-button type="default" size="large" @click="outLogin">退出登录</van-button>
    </div>

    <!-- 底部 -->
    <div class="bottom">
      <span>唯品会首页</span>
      <span>关于我们</span>
      <span>个人中心</span>
      <p>Copyright © 2008-2017 m.vip.com, All Rights Reserved 粤ICP备08114786号</p>
      <p>粤公网安备 44010302000068号</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      uploadImg: ''
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
    // 跳转待支付
    GoPayment () {
      this.$router.push('/payment')
    },
    // 跳转待收货页
    GoGoods () {
      this.$router.push('/receipt')
    },
    // 跳转全部订单
    GoAllOreder () {
      this.$router.push('/alloreder')
    },
    // 跳转我的收藏
    GoCollection () {
      this.$router.push('/collection')
    },
    // 跳转购物车
    GoShopping () {
      this.$router.push('/shopping')
    },
    // 跳转浏览历史
    GoBrowsing () {
      this.$router.push('/browsing')
    },
    // 跳转收货地址
    GoAddress () {
      this.$router.push('/address')
    },
    // 跳转修改密码
    GoEditPassword () {
      this.$router.push('/editpassword')
    },
    // 跳转绑定手机
    GoEditMobile () {
      this.$router.push('/editmobile')
    },
    // 退出登录
    outLogin () {
      this.$router.push('/')
      localStorage.clear()
    },
    afterRead (file) {
      // console.log(file)
      this.uploadImg = file.content
      let formData = new FormData()
      formData.append('avatar', file.file)
      // console.log(file.content)
      this.$http.post('/upload_img', formData).then(res => {
        // console.log(res)
        if (res.data.ok === 1) {
          // this.$toast('头像更换成功')
          let avatarImg = res.data.path
          this.$http.patch(`/users/${localStorage.getItem('user_id')}`, { id: localStorage.getItem('user_id'), avatar: avatarImg }).then(res => {
            console.log(res)
            if (res.data.ok === 1) {
              this.$toast('修改成功')
              this.getUser()
            } else {
              this.$toast('修改失败')
              // this.getUser()
            }
          })
        } else {
          this.$toast('头像更换失败,请稍后重试')
        }
      })
    },
    getUser () {
      this.$http.get(`/users/${localStorage.getItem('user_id')}`).then(res => {
        console.log(res)
        this.users = res.data.data
        // console.log(this.users)
        // this.uploadImg = this.users.avatar
      })
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style>
/* 导航栏 */
.me .van-icon {
  color: #000;
}

.me .van-nav-bar::after {
  display: none;
}

.me .van-icon:before {
  font-size: 24px;
}
/* 导航栏结束 */

/* 用户头像栏开始 */
.me .avatar {
  width: 100%;
  height: 175px;
  background-image: url(https://h2.vipstatic.com/ms2-m.vipstatic.com/static/base/img/07e0a3f4.user-login-bg.png);
  background-size: 100% 100%;
  text-align: center;
}

.me .avatar .van-uploader .van-image{
  width: 100px;
  height: 100px;
}

.me .avatar > .van-image:first-child {
  width: 20%;
  height: 45%;
  border: 3px solid #a9905c;
}

.me .avatar > p:nth-child(2) {
  color: #98989f;
  font-size: 14px;
  margin-bottom: 15px;
}

.me .avatar > p:nth-child(3) {
  font-size: 16px;
}

.me .avatar > p > .van-image {
  width: 8%;
  margin: 0 0px -11px 0px;
}
/* 用户头像结束 */

/* 订单开始 */
.me .order {
  width: 100%;
  /* height: 120px; */
  border-bottom: 1px solid #cccccc;
}

.me .order .van-grid-item__icon-wrapper > .van-icon {
  background-color: beige;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50px;
}

.me .order .van-grid-item__content::after {
  display: none;
}
/* 订单结束 */

/* 关于开始 */
.me .about {
  border-bottom: 1px solid #cccccc;
}
/* 关于结束 */

/* 退出按钮 */
.me .loginOut {
  text-align: center;
}
/* 退出结束 */

/* 底部导航开始 */
.me .bottom {
  margin-top: 15px;
}

.me .bottom > span {
  display: inline-block;
  color: #585c64;
}

.me .bottom span:first-child {
  float: left;
  margin-right: 15px;
  margin-left: 10px;
}

.me .bottom > span:nth-child(3) {
  float: right;
  margin-right: 10px;
}

.me .bottom > p:nth-child(4) {
  font-size: 13px;
  text-align: center;
  color: #ccc;
}

.me .bottom > p:last-child {
  font-size: 13px;
  text-align: center;
  color: #ccc;
}
/* 底部导航结束 */
</style>
