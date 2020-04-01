// 创建路由
const router = require('express').Router();
// 连接数据库
const db = require('../db');

router.get('/order',(req,res) => {
  let users_id = req.query.users_id
  // console.log(users_id)
  db.query('select * from `order` where users_id = ?',users_id,(err,result) => {
    // console.log(result)
    if(err){
      res.json({
        "code":400,
        "error":err
      })
    }else{
      res.json({
        "code":200,
        "data":result
      })
    }
  })
})


router.get('/order_all',(req,res) => {
  db.query('select * from `order`', (err,result) => {
    if(err){
      res.json({
        "code":400,
        "error":err
      })
    }else{
      res.json({
        "code":200,
        "data":result
      })
    }
  })
})

router.delete('/order/:id',(req,res) =>{
  let id = req.params.id;
  db.query('delete from `order` where id = ?',id,(err,result) => {
    if(err){
      res.json({
        "code":400,
        "error":err
      })
    }else{
      res.json({
        'code':200,
        "msg":"删除成功"
      })
    }
  })
})

// 订单查询
router.get('/order_status',(req,res) => {
  const users_id = req.query.users_id
  const order_status = req.query.order_status
  db.query('select id from `order` where users_id = ? and order_status = ?', [users_id, order_status], (err,result) => {
    if(err){
      res.json({
        "code":400,
        "error":err
      })
    }else{
      const sql = 'select * from order_goods where order_id = ?'
      let goods = [] 
      result.forEach(item => {
        db.query(sql, item.id, (err, goodsResult) => {
          goodsResult.forEach(item2 => {
            goods.push(item2)
          })
          res.json({
            "code":200,
            "data": goods
          })
        })
      })
      
    }
  })
})

module.exports = router;