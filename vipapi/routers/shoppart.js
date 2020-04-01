//引入路由模块
const router = require('express').Router()
// 导入数据库
const conn = require('../db')
// 获取轮播图图片
router.get('/shopdesp/:id', (req, res) => {
  // 获取商品id
  let goodsId = req.params.id;
  let sql = `SELECT link FROM gbanner WHERE goods_id=${goodsId}`
  conn.query(sql, (error, data) => {
    if (error) {
      res.json({
        "code": 0,
        "error": error
      })
    } else {
      res.json({
        "code": 1,
        "data": data
      })
    }
  })
})
// // 获取商品基本信息
router.get('/shopdespar/:id', (req, res) => {
  // 获取商品id
  let goodsId = req.params.id;
  let sql = `SELECT goods_name,goods_desc,before_price,discount,price,stock FROM goods where id = ${goodsId}`
  conn.query(sql, (error, data) => {
    if (error) {
      res.json({
        "code": 0,
        "error": error
      })
    } else {
      res.json({
        "code": 1,
        "data": data
      })
    }
  })
})
// // 获取参数
router.get('/shopcolor/:id', (req, res) => {
  // 获取商品id
  let goodsId = req.params.id
  let sql = `SELECT val_name FROM goods_spec_val WHERE attr_id=${goodsId}`
  conn.query(sql, (error, data) => {
    if (error) {
      res.json({
        "code": 0,
        "error": error
      })
    } else {
      res.json({
        "code": 1,
        "data": data
      })
    }
  })
})
router.get('/shopsize/:id', (req, res) => {
  // 获取商品id
  let goodsId = req.params.id
  let sql = `SELECT val_name FROM goods_spec_val WHERE attr_id=${goodsId}`
  conn.query(sql, (error, data) => {
    if (error) {
      res.json({
        "code": 0,
        "error": error
      })
    } else {
      res.json({
        "code": 1,
        "data": data
      })
    }
  })
})
// 获取商品详情图片
router.get('/shopimg/:id', (req, res) => {
  // 获取商品id
  let goodsId = req.params.id
  let sql = `SELECT goods_introduce FROM goods WHERE id=${goodsId}`
  conn.query(sql, (error, data) => {
    if (error) {
      res.json({
        "code": 0,
        "error": error
      })
    } else {
      res.json({
        "code": 1,
        "data": data
      })
    }
  })
})
// 添加购物车
router.post('/catshop', (req, res) => {
  let shopId = req.body.sid
  let userId = req.body.uid
  // console.log(userId)
  let shop = []
  let sql = `SELECT * FROM goods where id=${shopId}`
  conn.query(sql, (error, data) => {
    if (error) {
      res.json({
        "code": 0,
        "error": error
      })
    } else {
      shop.push(data[0])
      // console.log(shop)
      let sqli = `insert into carts (users_id ,goods_id,goods_name,before_price,price,goods_img) values
      (${userId},${shop[0].id},'${shop[0].goods_name}',${shop[0].before_price},${shop[0].price},'${shop[0].goods_img}')`

      conn.query(sqli, (error, data) => {
        if (error) {
          console.log(error);

          res.json({
            "code": 1,
            "error": error
          })
        } else {
          res.json({
            "code": 2,
            "data": shop
          })
        }
      })
    }
  })
})
// 导出路由
module.exports = router