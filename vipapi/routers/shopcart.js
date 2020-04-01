// 创建路由
const router = require('express').Router()
// 导入数据库
const conn = require('../db')

// 根据商品id  查询商品信息
router.get('/shopcart', (req, res) => {
    // 接收前端数据
    let id = req.query.id

    // 把接收到的数据转换成数组
    id = id.split(",")
    // 循环数组获取？
    let wenhao = [] //保存？
    id.forEach(a => {
        wenhao.push('?')
    })
    // 把问号的数组转换成字符串
    wenhao = wenhao.join(',')

    let sql = `SELECT * FROM goods WHERE id in (${wenhao})`
    conn.query(sql, id, (error, results) => {
        if (error) {
            res.json({
                "code": 400,
                "error": error
            })
            return
        } else {
            res.json({
                "code": 200,
                "data": results
            })
        }
    })
})


// 根据用户id  查询地址信息
router.get('/users_address', (req, res) => {
    let users_Id = req.query.id

    let sql = `SELECT * FROM user_address WHERE users_id = ${users_Id}`
    conn.query(sql, users_Id, (error, results) => {
        if (error) {
            res.json({
                "code": 400,
                "error": error
            })
            return
        } else {
            res.json({
                "code": 200,
                "data": results
            })
        }
    })
})

// 根据用户id 查询商品
router.get('/users_goods', (req, res) => {
    let userId = req.query.userId

    let sql = `SELECT * FROM carts WHERE users_id = ${userId}`
    conn.query(sql, (error, results) => {
        if (error) {
            res.json({
                "code": 400,
                "error": error
            })
            return
        } else {
            // console.log(results)
            res.json({
                "code": 200,
                "data": results
            })
        }
    })
})

// 监听用户购买数量
router.post('/users_goods_count', (req, res) => {
    // 接收前端count 
    let count = req.body.count
    let userId = req.body.userId
    let goodsId = req.body.goodsId


    let sql = `UPDATE carts set cart_count = ${count} WHERE users_id = ${userId} AND goods_id = ${goodsId}`
    conn.query(sql, (error, results) => {
        if (error) {
            res.json({
                "code": 400,
                "error": error
            })
            return
        } else {
            res.json({
                "code": 200
            })
        }
    })
})

// 删除购物车商品
router.post('/del_users_goods', (req, res) => {
    let userId = req.body.userId
    let goodsId = req.body.goodsId

    let sql = `DELETE FROM carts WHERE users_id = ${userId} AND goods_id = ${goodsId}`
    conn.query(sql, (error, results) => {
        if (error) {
            res.json({
                "code": 400,
                "error": error
            })
            return
        } else {
            res.json({
                "code": 200
            })
        }
    })
})

// 下订单
router.post('/orders', (req, res) => {
    // 验证令牌
    // 先取出令牌(前端是把令牌放到headers协议头中了)
    let userId = req.body.userId
    // 接收订单参数
    let address_id = req.body.address_id    // 地址id
    let cart = []   // 所有的商品

    let sql = `SELECT * FROM carts`
    conn.query(sql, (error, results) => {
        if (error) {
            res.josn({
                "code": 400,
                "error": error
            })
            return
        } else {
            // console.log(results)
            results.forEach(v => {
                let str = { 'goods_id': v.goods_id, 'buy_count': v.cart_count }
                cart.push(str)
            })
            // console.log(cart)

            // 判断商品的库存量

            // 根据商品id到数据库中取出对应的库存量
            let goodsIds = []   // 所有商品的id
            cart.forEach(v => {
                goodsIds.push(v.goods_id)
            })
            // 根据商品ID到数据库中取出对应的库存量
            goodsIds = goodsIds.join(',')
            let sql2 = `SELECT * FROM goods WHERE id in (${goodsIds})`
            conn.query(sql2, (error, results) => {
                if (error) {
                    res.json({
                        "code": 400,
                        "error": error
                    })
                    return
                } else {
                    let goodsData = results
                    let totalPrice = 0  // 总价格
                    // 循环数据库中查询出来的库存量
                    for (let i = 0; i < results.length; i++) {
                        // 根据商品id到购物车中找出对应的商品
                        let goods = cart.find(v => {
                            return v.goods_id === results[i].id
                        })
                        // console.log(goods)
                        // 判断购物车中购买的数量是否大于数据库中库存的数量
                        if (goods.buy_count > results[i].stock) {
                            res.json({
                                "code": 400,
                                "error": "商品库存不足！"
                            })
                            return
                        }
                        // 计算商品小计并加到总价上
                        totalPrice += goods.buy_count * results[i].price
                    }

                    // 生成订单
                    // 定义数据 生成订单号
                    let sn = new Date().getFullYear().toString()
                    let year = sn.substring(sn.length - 2)
                    let ordersNum = year + (new Date().getMonth() + 1).toString() + new Date().getDate().toString() + parseInt(Math.random() * 100000000)


                    // 根据收货地址id 查询收货信息
                    let sql3 = `SELECT * FROM user_address WHERE id = ${address_id}`
                    conn.query(sql3, (error, results) => {
                        if (error) {
                            res.json({
                                "code": 400,
                                "error": error
                            })
                            return
                        } else {
                            // console.log(results)
                            // 订单表中所有的字段信息构造
                            let orderData = {
                                users_id: parseInt(userId),
                                order_sn: ordersNum,
                                order_status: 1,
                                create_time: parseInt(new Date().getTime() / 1000),
                                deliver_name: results[0].deliver_name,
                                phone: results[0].phone,
                                deliver_time: results[0].deliver_time,
                                province: results[0].province,
                                city: results[0].city,
                                county: results[0].county,
                                street: results[0].street,
                                detail: results[0].detail,
                                total_price: totalPrice,
                            }
                            // 将构造好的数据插入到订单表
                            conn.query('INSERT INTO `order` SET ?', orderData, (error, results) => {
                                if (error) {
                                    res.json({
                                        "code": 400,
                                        "error": error
                                    })
                                } else {
                                    // console.log(results)
                                    // console.log(goodsData)
                                    // 把购物车中的所有商品保存到订单商品表中
                                    for (let i = 0; i < cart.length; i++) {
                                        // 根据购物车中的商品id 查询商品数组找出对应的商品
                                        let goodsInfo = goodsData.find(v => {
                                            return v.id = cart[i].goods_id
                                        })
                                        // 构造数据
                                        let orderGoodsData = {
                                            order_id: results.insertId,
                                            goods_id: cart[i].goods_id,
                                            buy_count: cart[i].buy_count,
                                            goods_img: goodsInfo.goods_img,
                                            goods_name: goodsInfo.goods_name,
                                            before_price: goodsInfo.before_price,
                                            price: goodsInfo.price
                                        }
                                        conn.query('INSERT INTO `order_goods` SET ?', orderGoodsData, (error, results) => {
                                            if (error) {
                                                res.json({
                                                    "code": 400,
                                                    "error": error
                                                })
                                            } else {
                                                // 删除购物车中的所有商品
                                                let delgoodsSql = `DELETE FROM carts WHERE goods_id IN (${goodsIds})`
                                                conn.query(delgoodsSql, (error, results) => {
                                                    if (error) {
                                                        res.json({
                                                            "code": 400,
                                                            "error": error
                                                        })
                                                        return
                                                    } else {
                                                        res.json({
                                                            "code": 200,
                                                            "message": "成功清空了购物车数据"
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

module.exports = router