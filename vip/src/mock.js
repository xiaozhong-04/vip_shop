import Mock from 'mockjs'

// 分类
Mock.mock('http://127.0.0.1:1122/api/v1/classify', 'get', {
  'ok': 1,
  'data': [
    {
      'id': 1,
      'classify_name': '为你推荐'
    },
    {
      'id': 2,
      'classify_name': '女装'
    },
    {
      'id': 3,
      'classify_name': '男装'
    },
    {
      'id': 4,
      'classify_name': '男女内衣'
    },
    {
      'id': 5,
      'classify_name': '女鞋'
    },
    {
      'id': 6,
      'classify_name': '男鞋'
    },
    {
      'id': 7,
      'classify_name': '箱包皮具'
    },
    {
      'id': 8,
      'classify_name': '手表配饰'
    },

    {
      'id': 9,
      'classify_name': '护肤彩妆'
    },
    {
      'id': 10,
      'classify_name': '个人护理'
    },
    {
      'id': 11,
      'classify_name': '母婴'
    },
    {
      'id': 12,
      'classify_name': '运动户外'
    },
    {
      'id': 13,
      'classify_name': '手机数码'
    },
    {
      'id': 14,
      'classify_name': '家用电器'
    },
    {
      'id': 15,
      'classify_name': '家居家纺'
    },
    {
      'id': 16,
      'classify_name': '生活超市'
    },
    {
      'id': 17,
      'classify_name': '唯品国际'
    },
    {
      'id': 18,
      'classify_name': '唯品·奢'
    },
    {
      'id': 19,
      'classify_name': '唯品金融'
    },
    {
      'id': 20,
      'classify_name': '医药健康'
    },
    {
      'id': 21,
      'classify_name': '图书文娱'
    }
  ]
})
// 分类查询指定条数
Mock.mock('http://127.0.0.1:1122/api/v1/classify_limit', 'get', {
  'ok': 1,
  'data': [
    {
      'id': 1,
      'classify_name': '为你推荐'
    },
    {
      'id': 2,
      'classify_name': '女装'
    },
    {
      'id': 3,
      'classify_name': '男装'
    },
    {
      'id': 4,
      'classify_name': '男女内衣'
    },
    {
      'id': 5,
      'classify_name': '女鞋'
    },
    {
      'id': 6,
      'classify_name': '男鞋'
    },
    {
      'id': 7,
      'classify_name': '箱包皮具'
    },
    {
      'id': 8,
      'classify_name': '手表配饰'
    },

    {
      'id': 9,
      'classify_name': '护肤彩妆'
    },
    {
      'id': 10,
      'classify_name': '个人护理'
    }
  ]
})
// 商品展示
Mock.mock(/http:\/\/127.0.0.1:1122\/api\/v1\/goods\/\d+/, 'get', {
  'ok': 1,
  'images': 'https://a.vpimg4.com/upload/flow/2019/11/18/91/15740745145787.jpg',
  'data|2-4': [
    {
      'title': '你好',
      'goods_list|6-9': [
        {
          'id|+1': 1,
          'image': 'https://h2.appsimg.com/a.appsimg.com/upload/goadmin/2019/10/22/83/15717097318379_300x375_80.jpg!75.webp',
          'titel|+1': 1
        }
      ]
    }
  ]
})
// 品牌详情
Mock.mock('http://127.0.0.1:1122/api/v1/brand', 'get', {
  'ok': 1,
  'data': {
    'name': '阿迪达斯',
    'fans': 551.8,
    'logo': '@dataImage(40x40)',
    'image': '@dataImage(150x150)',
    'int': 'Adidas（阿迪达斯）创办于1949年，是德国运动用品制造商阿迪达斯AG成员公司。以其创办人阿道夫•阿迪•达斯勒（Adolf Adi Dassler）命名，1920年在黑措根奥拉赫开始生产鞋类产品。'
  }
})

// 品牌详情
Mock.mock('http://127.0.0.1:1122/api/v1/shopdes', 'get', {
  'ok': 1,
  'data': [
    '@dataImage(375x375)', '@dataImage(375x375)', '@dataImage(375x375)', '@dataImage(375x375)'
  ]

})
