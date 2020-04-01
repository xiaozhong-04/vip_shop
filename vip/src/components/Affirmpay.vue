<template>
  <div class="affirmpay"></div>
</template>

<script>
import qs from 'qs'
import { Dialog } from 'vant'
export default {
  methods: {
    diglog () {
      Dialog.confirm({
        title: '支付确认',
        message:
          '如已完成付款，请点击已付款；如未完成付款，请点击"取消"并重新去付款',
        confirmButtonText: '已付款'
      })
        .then(() => {
          let userId = JSON.parse(localStorage.getItem('user_id'))
          let addressId = JSON.parse(localStorage.getItem('addressId'))
          this.$http
            .post(
              '/orders',
              qs.stringify({ userId: userId, address_id: addressId })
            )
            .then(res => {
              console.log(res)
              if (res.data.code === 200) {
                this.$toast.success(
                  '付款成功,您可以在个人中心-全部订单中查看您的订单信息'
                )
                this.$router.push('/')
              }
            })
        })
        .catch(() => {
          this.$router.push('/cashierdesk')
        })
    }
  },
  created () {
    this.diglog()
  }
}
</script>

<style>
body,
html,
.affirmpay {
  width: 100%;
  height: 100%;
}

.affirmpay {
  background-color: #585858;
  opacity: 0.1;
}
</style>
