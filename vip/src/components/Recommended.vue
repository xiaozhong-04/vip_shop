<template>
  <div class="recommended">
    <!-- 图片logo -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image
          src="https://h2.appsimg.com/a.appsimg.com/upload/flow/2019/11/21/165/15743027429306.gif"
        />
      </van-swipe-item>
      <van-swipe-item>
        <van-image
          src="https://h2.appsimg.com/a.appsimg.com/upload/flow/2019/11/21/108/15743212117889.jpg"
        ></van-image>
      </van-swipe-item>
      <van-swipe-item>
        <van-image
          src="https://h2.appsimg.com/a.appsimg.com/upload/flow/2019/08/30/67/15671641941819.jpg"
        ></van-image>
      </van-swipe-item>
      <van-swipe-item>
        <van-image
          src="https://h2.appsimg.com/a.appsimg.com/upload/flow/2019/11/21/28/15743264609161.jpg"
        ></van-image>
      </van-swipe-item>
    </van-swipe>

    <!-- 分类 -->
    <van-grid class="Vipshop_category" :column-num="5">
      <van-grid-item v-for="(item,index) in categoryList" :key="index" :to="'/sort/' + item.id">
        <van-image round :src="item.imgs" />
        <span>{{item.cname}}</span>
      </van-grid-item>
    </van-grid>

    <div class="Vipshop_recommended">
      <!-- 品牌钜献 -->
      <van-grid class="Vipshop_brand" :column-num="1">
        <van-grid-item>
          <van-image
            src="https://h2.appsimg.com/a.appsimg.com/upload/flow/2019/11/15/32/15737890600666.jpg"
          />
        </van-grid-item>
        <van-grid-item>
          <van-row>
            <van-col span="8">
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/flow/2019/11/18/124/15740570802521.jpg"
              />
            </van-col>
            <van-col span="8">
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/flow/2019/11/18/39/15740430247375.jpg"
              />
            </van-col>
            <van-col span="8">
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/flow/2019/11/18/91/15740431134263.jpg"
              />
            </van-col>
          </van-row>
        </van-grid-item>
      </van-grid>

      <!-- 唯品快抢 -->
      <van-grid class="Vipshop_quickly" :column-num="1">
        <van-grid-item>
          <van-image
            src="https://h2.appsimg.com/b.appsimg.com/upload/mst/2019/10/15/147/mst_d56fa74afedc5e1c20d91734819549bd_1125x660_90.png"
          ></van-image>
        </van-grid-item>
        <van-grid-item>
          <van-row gutter="20">
            <van-col span="6">
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/105933/2019/0801/199/00f173d5-e504-4982-b2af-b92f5071f33c_251x251_90.jpg"
              />
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/brandcool/0/d61a7dad69f84808b0098b24cdff0f42/10001444/primary_120x60_90.png"
              />
              <p>快抢价</p>
              <span>￥89</span>
            </van-col>

            <van-col span="6">
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/100287/2019/0930/153/30988558-0628-46f3-9a0d-7ae25cbdb770_251x251_90.jpg"
              />
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/brandcool/0/1a3d613045d344dca6ad21dcc3f0d781/10000335/primary_120x60_90.png"
              />
              <p>快抢价</p>
              <span>￥99起</span>
            </van-col>

            <van-col span="6">
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/105239/2018/0626/195/ac918b07-24e7-4d45-b5cf-b5612072a614_251x251_90.jpg"
              />
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/brandcool/0/bbfbee76a33644509734585fa5bc3c3e/10000401/primary_120x60_90.png"
              />
              <p>快抢价</p>
              <span>￥85</span>
            </van-col>

            <van-col span="6">
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/106143/2019/0812/134/433a47bc-4d4f-477d-9ca4-000f8791aafd_251x251_90.jpg"
              />
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/brandcool/0/3eb1e71070a04ef19c12daa360f7ef56/10007154/primary_120x60_90.png"
              />
              <p>快抢价</p>
              <span>￥43</span>
            </van-col>
          </van-row>
        </van-grid-item>
      </van-grid>

      <!-- 最后疯抢 -->
      <van-grid class="Vipshop_rob" :column-num="1">
        <van-grid-item>
          <van-image
            src="https://h2.appsimg.com/b.appsimg.com/upload/mst/2019/11/18/57/mst_545d835571bb48b1c43a854f9e927cf5_1125x773_90.png"
          ></van-image>
        </van-grid-item>
        <van-grid-item>
          <van-row gutter="9">
            <van-col span="8">
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/613392/2019/1113/121/6acb4de3-2f5f-448e-bd34-dfa22e3f7dff_420_531_336x425_90.jpg"
              />
              <div>
                <van-image
                  src="https://h2.appsimg.com/a.appsimg.com/upload/brandcool/0/ea444364f508412b9b42bb3bbae0cf5b/10034981/black_165x83_90.png"
                />
                <p>共592款</p>
              </div>
              <p>快抢价</p>
              <span>￥434</span>
            </van-col>

            <van-col span="8">
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcimg/2019/10/25/83/484063261571985831877_5t_336x425_90.jpg"
              />
              <div>
                <van-image
                  src="https://h2.appsimg.com/a.appsimg.com/upload/brandcool/0/1b5b73ef19044f63a3020bcc48813491/10010163/black_165x83_90.png"
                />
                <p>共58款</p>
              </div>
              <p>快抢价</p>
              <span>￥499</span>
            </van-col>

            <van-col span="8">
              <van-image
                src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/2019/06/27/63/7c6863e0-1466-46a4-8f64-10974c8e2cb8_420_531_336x425_90.jpg"
              />
              <div>
                <van-image
                  src="https://h2.appsimg.com/a.appsimg.com/upload/brandcool/0/52c67f4065db4874aa201abda1fb66e5/10006810/black_165x83_90.png"
                />
                <p>共4783款</p>
              </div>
              <p>快抢价</p>
              <span>￥43</span>
            </van-col>
          </van-row>
        </van-grid-item>
      </van-grid>

      <!-- 商品展示 -->
      <van-grid class="vipShop_last" :column-num="2">
        <van-grid-item v-for="(item,index) in goodsList" :key="index">
          <van-image :src="item.goods_img" />
          <p>{{item.goods_name}}</p>
          <p>￥{{item.price}}</p>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="shopping" @click="toShopping">
      <van-icon name="cart-o" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoryList: [], // 分类列表
      time: 30 * 60 * 60 * 1000,
      goodsList: []
    }
  },
  methods: {
    toShopping () {
      this.$router.push('/affirmorder')
    }
  },
  created () {
    this.$http.get('/lcategories').then(res => {
      // console.log(res.data.data)
      this.categoryList = res.data.data
    })

    let id = 1
    this.$http.get(`/storey/${id}/goods`).then(res => {
      console.log(res)
      this.goodsList = res.data.data
    })
  }
}
</script>

<style>
/* 清除浮动 */
.clear {
  clear: both;
}

.Vipshop_recommended .van-grid-item__content {
  padding: 0;
}

.Vipshop_recommended .van-grid-item__content::after {
  display: none;
}

/* 分类开始 */
.Vipshop_category {
  background-color: #f3f4f6;
}

.Vipshop_category .van-grid-item__content {
  background-color: #f3f4f6;
}

.Vipshop_category .van-grid-item__content::after {
  display: none;
}

.Vipshop_category .van-image {
  background: #ffffff;
  height: 70%;
}

.Vipshop_category span {
  font-size: 13px;
  margin-top: 5px;
}
/* 分类结束 */
.Vipshop_recommended .vipShop_last p:nth-child(2) {
  width: 95%;
  height: 30px;
  overflow: hidden;
  color: #000;
}

.Vipshop_recommended .vipShop_last p:last-child {
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  width: 60%;
  margin-left: -70px;
  margin-top: 6px;
  color: #dd409a;
}

.Vipshop_recommended .vipShop_last .van-grid-item__content:first-child {
  margin-left: 6px;
}

.Vipshop_recommended .vipShop_last .van-grid-item__content {
  background-color: #f3f4f5;
  width: 93%;
}

/* 品牌钜献开始 */
.Vipshop_brand .van-row {
  margin: 0;
}
/* 品牌钜献结束 */

/* 唯品快抢开始 */
.Vipshop_quickly {
  position: relative;
  margin-top: -4px;
}

.Vipshop_quickly .van-grid-item:last-child {
  position: absolute;
  left: 4%;
  right: 4%;
  top: 27%;
}

.Vipshop_quickly .van-grid-item:last-child .van-image:nth-child(2) {
  text-align: -webkit-center;
}

.Vipshop_quickly .van-grid-item:last-child .van-image:nth-child(2) img {
  width: 50%;
}

.Vipshop_quickly .van-grid-item:last-child p {
  display: inline-block;
  color: #ffffff;
  font-size: 12px;
  background-image: url(https://h2.appsimg.com/b.appsimg.com/upload/mst/2019/10/29/159/mst_42da2786a8b9b2d0c444fc508905de88_102x39_90.png);
  background-size: 48px 16px;
  width: 48px;
}
/* 唯品快抢结束 */

/* 最后疯抢开始 */
.Vipshop_rob .van-grid-item:last-child {
  position: absolute;
  left: 4%;
  right: 4%;
  top: 27%;
}

.Vipshop_rob .van-grid-item:nth-child(2) .van-grid-item__content {
  height: 157px;
}

.Vipshop_rob .van-grid-item:last-child .van-col {
  position: relative;
}

.Vipshop_rob .van-grid-item:last-child .van-col > div:nth-child(2) {
  position: absolute;
  top: 35%;
  left: 17%;
  background: rgba(255, 255, 255, 0.83);
  width: 65%;
  border-radius: 5px;
}

.Vipshop_rob .van-grid-item:last-child .van-col > div:nth-child(2) > p {
  font-size: 12px;
  color: rgb(88, 92, 100);
  margin: 0;
}

.Vipshop_rob .van-grid-item:last-child .van-col > p {
  display: inline-block;
  color: #ffffff;
  font-size: 12px;
  background-image: url(https://h2.appsimg.com/b.appsimg.com/upload/mst/2019/10/29/159/mst_42da2786a8b9b2d0c444fc508905de88_102x39_90.png);
  background-size: 48px 16px;
  width: 48px;
}
/* 最后疯抢结束 */

.recommended .vipShop_last {
  margin-top: 10px;
}

.recommended .vipShop_last .van-grid-item{
  background-color: #f3f4f5;
  margin-bottom: 10px;
  border-radius: 10px;
}

.recommended .shopping {
  position: fixed;
  width: 15%;
  height: 55px;
  bottom: 60px;
  left: 15px;
  text-align: center;
  line-height: 78px;
  border-radius: 50px;
  background-color: rgba(25, 29, 38, 0.95);
}

.recommended .shopping .van-icon-cart-o:before {
  color: #ffffff;
  font-size: 30px;
}
</style>
