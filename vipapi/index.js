const express = require('express')
const bodyParser = require("body-parser")
// 导入cors
const cors = require('cors')
// 创建服务器
const app = express();
// 导入confing
const config = require("./config")

//设置静态目录
app.use(express.static('./public'))

// 解决跨域
app.use(cors())
// 配置post请求解析数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('./public'))
// ***********以下为引入路由代码

// 引入用户————注册 登录路由
const user = require('./routers/users')
app.use('/api/v1', user)

// 引入分类路由
const categories = require('./routers/categories')
app.use('/api/v1', categories)

// 引入购物车查询商品路由
const shopcart = require('./routers/shopcart')
app.use('/api/v1', shopcart)


// 引入商品详情路由
const shoppart = require('./routers/shoppart')
app.use('/api/v1', shoppart)

// 引入订单的路由
const order = require('./routers/order')
app.use('/api/v1', order)

const goods = require('./routers/goods')
app.use('/api/v1', goods)

// 监听并指定端口
app.listen(config.server.port, config.server.ip, () => {
    console.log(`启动访问 http://${config.server.ip}:${config.server.port}`);
})