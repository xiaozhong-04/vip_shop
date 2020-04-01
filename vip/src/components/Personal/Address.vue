<template>
  <div class="address">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="收货地址列表"
      left-arrow
      border
      @click-right="$router.push('/')"
      @click-left="$router.back()"
    >
      <van-icon name="wap-home-o" slot="right" />
    </van-nav-bar>

    <!-- 收货地址列表 -->
    <div class="address_on">
      <p v-show="list.length === 0">暂无收货地址</p>
      <van-address-list @add="onAdd">
        <div slot="top">
          <ul>
            <li v-for="item in list" :key="item.id">
              <h4>
                <span class="username">{{item.deliver_name}}</span>
                <span class="cellphone">{{item.phone}}</span>
              </h4>
              <p class="address">{{item.province + item.city + item.county +item.street}}</p>
              <p class="time">{{item.deliver_time}}</p>
              <div class="manage-address">
                <a class="J_address_link" href="javascript:;" @click="echo(item.id)">修改</a>
                <a class="J_address_del" href="javascript:;" @click="remove(item.id)">删除</a>
              </div>
            </li>
          </ul>
        </div>
      </van-address-list>
    </div>
    <!-- 修改地址 -->
    <van-dialog v-model="show" title="标题" :showConfirmButton="false" closeOnClickOverlay>
      <van-address-edit
        :area-list="areaList"
        delete-button-text="取消"
        :address-info="info"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      >
        <div slot="default">
          <van-dropdown-menu :overlay="false">
            <van-dropdown-item v-model="value" :options="option" />
          </van-dropdown-menu>
        </div>
      </van-address-edit>
      <van-button type="default" class="qx" @click="show = !show">取消</van-button>
    </van-dialog>
  </div>
</template>

<script>
import areaList from '../../assets/js/Area.js'
export default {
  data () {
    return {
      user_id: JSON.parse(localStorage.getItem('user_id')),
      list: [],
      areaList: areaList,
      // 下拉
      value: 0,
      option: [
        { text: '收货时间不限', value: 0 },
        { text: '周六日/节假日收货', value: 1 },
        { text: '周一至周五收货', value: 2 }
      ],
      show: false,
      info: {
        id: '',
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '',
        addressDetail: ''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get('/address?users_id=' + this.user_id).then(res => {
        this.list = res.data.data
      })
    },
    onAdd () {
      this.$router.push('/edit')
    },
    remove (id) {
      this.$dialog
        .confirm({
          title: '你要删除该地址嘛!'
        })
        .then(() => {
          this.$http.delete('/address/' + id).then(res => {
            if (res.data.ok === 1) {
              this.getList()
              this.$toast(res.data.message)
            } else {
              this.$toast(res.data.message)
            }
          })
        })
    },
    echo (id) {
      this.show = true
      this.$http.get(`/address/${id}/echo`).then(res => {
        this.info.id = res.data.data.id
        this.info.name = res.data.data.deliver_name
        this.info.tel = res.data.data.phone
        this.info.province = res.data.data.province
        this.info.city = res.data.data.city
        this.info.county = res.data.data.county
        this.info.addressDetail = res.data.data.street
        this.value = res.data.data.deliver_time
      })
    },
    onSave (e) {
      console.log(e)
      let data = {}
      data.address_id = e.id
      data.deliver_name = e.name
      data.phone = e.tel
      data.deliver_time = this.value
      data.province = e.province
      data.city = e.city
      data.county = e.county
      data.street = e.addressDetail
      this.$http.put('/address', data).then(res => {
        console.log(res)
        if (res.data.ok === 1) {
          this.show = false
          this.getList()
          this.$toast(res.data.message)
        } else {
          this.$toast('修改失败！！！')
        }
      })
    }
  }
}
</script>

<style lang="less">
/* 导航栏 */
.address .van-nav-bar .van-icon {
  color: #000;
}

.address .van-nav-bar::after {
  display: none;
}

.address .van-nav-bar .van-icon:before {
  font-size: 24px;
}
/* 导航栏结束 */

/* 收货地址开始 */
.address .address_on > p {
  text-align: center;
  font-size: 24px;
  line-height: 900%;
  color: #ccc;
}

.address_on li {
  position: relative;
  padding: 20px 0 36px 14px;
  border-bottom: 1px solid #ccc;
  h4 {
    margin-bottom: 8px;
  }
  .username,
  .cellphone {
    margin-right: 28px;
    font-weight: 600;
    font-family: PingFang-SC-Regular, "Helvetica Neue", Helvetica,
      "microsoft yahei", sans-serif;
  }
  p {
    font-size: 14px;
    color: #585c64;
    font-family: PingFang-SC-Regular, "Helvetica Neue", Helvetica,
      "microsoft yahei", sans-serif;
  }
  p.time {
    margin-top: 8px;
  }
  .manage-address {
    position: absolute;
    bottom: 10px;
    right: 10px;
    a {
      float: left;
      margin-left: 20px;
      color: #157efa;
      padding: 10px;
      text-decoration: none;
    }
  }
}

.address {
  li:nth-child(odd) {
    background-color: #fbfbfa;
  }
  li:nth-child(even) {
    background-color: #fff;
  }
  li:first-child {
    border-top: 1px solid #ccc;
  }
}
.address {
  .van-address-edit__buttons {
    margin-top: 50px;
    padding: 32px 16px 0px 16px;
  }
  .van-dropdown-item {
    transform: translateY(-50px);
  }
  .qx {
    display: block;
    width: 286px;
    height: 44;
    border: 1px solid #ccc;
    margin: 10px auto;
    margin-bottom: 50px;
  }
}
</style>
