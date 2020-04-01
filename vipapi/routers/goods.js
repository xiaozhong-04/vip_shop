// 创建路由
const router = require('express').Router();
// 连接数据库
const db = require('../db');

// 添加商品
router.post('/goods', (req, res) => {
    // 初始化商品数据
    const info = {
        goods_name: req.body.goods_name,
        goods_img: req.body.goods_img,
        scate_id: req.body.scate_id,
        before_price: req.body.before_price,
        price: req.body.price,
        stock: req.body.stock,
    }
    // 检查必需提交的商品字段
    for(let item in info) {
        if(!info[item]) {
           res.json({
               ok: 1,
               error: '缺少必需提交的商品信息, 请检查'
           })
           return;
        }
    }
    // 判断可选商品信息，添加
    if (req.body.goods_desc) {
        info.goods_desc = req.body.goods_desc
    }
    if (req.body.discount) {
        info.discount = req.body.discount
    }
    if (req.body.warn_stock) {
        info.warn_stock = req.body.warn_stock
    }
    if (req.body.isSale) {
        info.isSale = req.body.isSale
    }
    if (req.body.isBest) {
        info.isBest = req.body.isBest
    }
    if (req.body.isHot) {
        info.isHot = req.body.isHot
    }
    if (req.body.isNew) {
        info.isNew = req.body.isNew
    }
    if (req.body.isRecom) {
        info.isRecom = req.body.isRecom
    }
    if (req.body.isDiscount) {
        info.isDiscount = req.body.isDiscount
    }
    if (req.body.isRobPrice) {
        info.isRobPrice = req.body.isRobPrice
    }
    if (req.body.goods_detail) {
        info.goods_detail = req.body.goods_detail
    }
    if (req.body.goods_introduce) {
        info.goods_introduce = req.body.goods_introduce
    }
    // 初始化五张轮播图
    let banner = []
    if (req.body.banner_one) {
        banner.push(req.body.banner_one)
    }
    if (req.body.banner_two) {
        banner.push(req.body.banner_two)
    }
    if (req.body.banner_three) {
        banner.push(req.body.banner_three)
    }
    if (req.body.banner_four) {
        banner.push(req.body.banner_four)
    }
    if (req.body.banner_five) {
        banner.push(req.body.banner_five)
    }
    if (banner.length < 1) {
        res.json({
            ok: 0,
            error: '至少要传一张商品轮播图'
        })
        return;
    }
    // 插入商品数据
    const sql = 'insert into goods set ?'
    db.query(sql, info, (error, results) => {
        if (error) {
            res.json({
                ok: 0,
                error,
            })
            return;
        }
        if (results.affectedRows) {
            // 插入五张轮播图
            banner.forEach(item => {
                const sql = 'insert into gbanner set ?'
                const gid = {
                    goods_id: results.insertId,
                    link: item,
                    img: item
                }
                db.query(sql, gid, (err, results) => {
                    if (err) {
                        res.json({
                            ok: 0,
                            error: err
                        })
                        return;
                    }
                    if (!results.affectedRows) {
                        res.json({
                            ok: 0,
                            error: '商品添加成功，商品轮播图插入失败'
                        })
                    }
                })
            })
            res.json({
                ok: 1,
                message: '商品添加成功'
            })
        } else {
            res.json({
                ok: 0,
                error: '添加商品失败'
            })
        }
    })

})

// 修改商品
router.put('/goods/:id', (req, res) => {
    // 商品 id
    const id = req.params.id;
    const info = {}
    if (req.body.goods_name) {
        info.goods_name = req.body.goods_name
    }
    if (req.body.goods_img) {
        info.goods_img = req.body.goods_img
    }
    if (req.body.scate_id) {
        info.scate_id = req.body.scate_id
    }
    if (req.body.before_price) {
        info.before_price = req.body.before_price
    }
    if (req.body.price) {
        info.price = req.body.price
    }
    if (req.body.stock) {
        info.stock = req.body.stock
    }
    if (req.body.goods_desc) {
        info.goods_desc = req.body.goods_desc
    }
    if (req.body.discount) {
        info.discount = req.body.discount
    }
    if (req.body.warn_stock) {
        info.warn_stock = req.body.warn_stock
    }
    if (req.body.isSale) {
        info.isSale = req.body.isSale
    }
    if (req.body.isBest) {
        info.isBest = req.body.isBest
    }
    if (req.body.isHot) {
        info.isHot = req.body.isHot
    }
    if (req.body.isNew) {
        info.isNew = req.body.isNew
    }
    if (req.body.isRecom) {
        info.isRecom = req.body.isRecom
    }
    if (req.body.isDiscount) {
        info.isDiscount = req.body.isDiscount
    }
    if (req.body.isRobPrice) {
        info.isRobPrice = req.body.isRobPrice
    }
    if (req.body.goods_detail) {
        info.goods_detail = req.body.goods_detail
    }
    if (req.body.goods_introduce) {
        info.goods_introduce = req.body.goods_introduce
    }
    if (JSON.stringify(info) === '{}') {
        res.json({
            ok: 0,
            error: "必需修改一项才能提交"
        })
    }
    const sql = 'update goods set ? where id = ?'
    db.query(sql, [info, id], (error, results) => {
        if(error) {
            res.json({
                ok: 0,
                error: error
            })
            return;
        }
        if(results.affectedRows) {
            res.json({
                ok: 1,
                message: '商品修改成功'
            })
        } else {
            res.json({
                ok: 0,
                error: '商品修改失败，检查商品id是否存在'
            })
        }
    })
})

// 删除商品
router.delete('/goods/:id', (req, res) => {
    const id = req.params.id
    const sql = 'delete from goods where id = ?'
    db.query(sql, id, (err, results) => {
        if (err) {
            res.json({
                ok: 0,
                error: err
            })
            return;
        }
        if (results.affectedRows) {
            res.json({
                ok: 1,
                message: '删除成功'
            })
        } else[
            res.json({
                ok: 0,
                message: '删除失败'
            })
        ]
    })
})

module.exports = router;