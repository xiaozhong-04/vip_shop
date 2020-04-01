// 创建路由
const router = require('express').Router();
// 连接数据库
const db = require('../db');

// 查询一级分类
router.get('/categories', (req, res) => {
  let sql = 'select * from categories'
  db.query(sql, (error, result) => {
    if (error) {
      res.json({
        "code": 400,
        "error": error
      })
    } else {
      result.forEach(v => {
        if (v.img) {
          v.img = 'http://127.0.0.1:1122' + v.img;
        }
        if (v.imgs) {
          v.imgs = 'http://127.0.0.1:1122' + v.imgs;
        }
      })
      res.json({
        "code": 200,
        "data": result
      })
    }
  })
})

// 查询一级分类
router.get('/lcategories', (req, res) => {
  let num = req.query.num || 10;
  let sql = `select * from categories limit ${num}`
  db.query(sql, (error, result) => {
    if (error) {
      res.json({
        "code": 400,
        "error": error
      })
    } else {
      result.forEach(v => {
        if (v.img) {
          v.img = 'http://127.0.0.1:1122' + v.img;
        }
        if (v.imgs) {
          v.imgs = 'http://127.0.0.1:1122' + v.imgs;
        }
      })
      res.json({
        "code": 200,
        "data": result
      })
    }
  })
})

// 查询二三级分类
router.get('/sn_categories', (req, res) => {
  let parent_id = req.query.parent_id || 1
  db.query(`select * from sub_Categories where parent_id = ${parent_id}`, (error, result) => {
    if (error) {
      res.json({
        "code": 400,
        "error": error
      })
    } else {
      let sub_catId = []
      for (let i = 0; i < result.length; i++) {
        sub_catId.push(JSON.stringify(result[i].id))
      }
      let sub_cat = result;
      db.query(`select * from sub_sub_Categories where parent_id in(${sub_catId}) `, (error, results) => {
        if (error) {
          res.json({
            "code": 400,
            "error": error
          })
        } else {
          let subCat = results
          sub_cat.forEach(v => {
            v.subCat = []
            subCat.forEach(f => {
              if (v.id === f.parent_id) {
                v.subCat.push(f)
              }
            })
          });
          sub_cat.forEach(item => {
            item.img = 'http://127.0.0.1:1122' + item.img;
            item.subCat.forEach(item2 => {
              item2.img = 'http://127.0.0.1:1122' + item2.img;
            })
          })
          res.json({
            "code": 200,
            "sub_cat": sub_cat
          })
        }
      })
    }

  })
})

// 通过三级分类查询商品
router.get('/categories_goods/:id', (req, res) => {
  let id = req.params.id
  let page = parseInt(req.query.page) || 1
  let per_page = parseInt(req.query.per_page) || 10
  let page_1 = (page - 1) * per_page
  let sql = 'SELECT id,goods_name, goods_img, before_price, price, discount FROM `goods` WHERE scate_id = ? limit ?,?'
  db.query(sql, [id, page_1, per_page], (error, data) => {
    if (error) {
      res.json({
        "code": 400,
        "error": error
      })
    } else {
      res.json({
        "code": 200,
        "data": data
      })
    }
  })

})

// 通过一级分类查询三级分类
router.get('/storey/:id', (req, res) => {
  let id = req.params.id
  let sql = `SELECT imgss FROM categories WHERE id = ?`
  db.query(sql, id, (error, data) => {
    if (error) {
      res.json({
        'code': 400,
        'error': error
      })
    } else {
      let images = data
      let sql = `SELECT c.* FROM categories a 
                    LEFT JOIN sub_categories b on a.id = b.parent_id 
                    LEFT JOIN sub_sub_categories c on b.id = c.parent_id
                    WHERE a.id = ? LIMIT 12`
      db.query(sql, id, (error, data) => {
        if (error) {
          res.json({
            'code': 400,
            'error': error
          })
        } else {
          let san = data
          san.forEach(v => {
            if(v.img) {
              v.img = 'http://127.0.0.1:1122' + v.img
            }
          })
          let sql = ``
          res.json({
            'code': 200,
            'data': {
              images: images[0].imgss,
              san
            }
          })
        }
      })
    }
  })
})

router.get('/storey/:id/goods', (req, res) => {
  let id = req.params.id
  // let page = parseInt(req.query.page) || 1
  // let per_page = parseInt(req.query.per_page) || 30
  // let page_1 = (page - 1) * per_page
  let sql = `SELECT d.id, d.goods_name, d.goods_img, d.before_price, d.price, d.discount FROM categories a 
                  LEFT JOIN sub_categories b on a.id = b.parent_id 
                  LEFT JOIN sub_sub_categories c on b.id = c.parent_id
                  LEFT JOIN goods d on c.id = d.scate_id
                  WHERE a.id = ? AND d.id IS NOT NULL
                  ORDER BY RAND() LIMIT 30`
  db.query(sql, [id], (error, data) => {
    if (error) {
      res.json({
        'code': 400,
        'error': error
      })
    } else {
      res.json({
        'code': 200,
        'data': data
      })
    }
  })
})

router.get('/goods',(req,res) => {
  let page_size = req.query.page_size || 20
  let page_num = req.query.page_num || 1
  let offset = (page_num - 1) * page_size
  db.query(`select * from goods limit ${offset},${page_size}`,(err,result) => {
    if(err){
      res.json({
        "code":400,
        "error":err
      })
    }else{
      db.query('select count(*) as total from goods', (err, result2) => {
        if(err) {
          res.json({
            ok: 0,
            errror: err
          })
          return;
        }
       res.json({
        code: 400,
        total: result2[0].total,
        data: result
      })
      })
    }
  })
})

module.exports = router;