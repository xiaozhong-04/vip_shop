<template>
  <div class="edit">
    <van-nav-bar
      title="添加收货地址"
      left-arrow
      border
      @click-right="$router.push('/')"
      @click-left="$router.back()"
    >
      <van-icon name="wap-home-o" slot="right" />
    </van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    >
      <div slot="default">
            <van-dropdown-menu>
              <van-dropdown-item v-model="value" :options="option" />
            </van-dropdown-menu>
      </div>
    </van-address-edit>
  </div>
</template>

<script>
import areaList from '../../assets/js/Area.js'
export default {
  data () {
    return {
      user_id: JSON.parse(localStorage.getItem('user_id')),
      areaList: areaList,
      // 下拉
      value: 0,
      option: [
        { text: '收货时间不限', value: 0 },
        { text: '周六日/节假日收货', value: 1 },
        { text: '周一至周五收货', value: 2 }
      ]
    }
  },

  methods: {
    onSave (e) {
      let data = {}
      data.users_id = this.user_id
      data.deliver_name = e.name
      data.phone = e.tel
      data.deliver_time = this.value
      data.province = e.province
      data.city = e.city
      data.county = e.county
      data.street = e.addressDetail
      this.$http.post('/address', data).then(res => {
        console.log(res)
        if (res.data.ok === 1) {
          this.$toast(res.data.message)
          this.$router.push('/address')
        } else {
          this.$toast('添加失败！！！')
        }
      })
    }
  }
}
</script>
