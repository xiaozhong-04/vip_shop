// 创建路由
const router = require('express').Router()
const path = require('path')
const fs = require('fs')
// 导入jwt
const jwt = require('../jwt')
// 引入MD5
const md5 = require('md5')
const { md5_key } = require('../config')
// 导入数据库
const conn = require('../db')

// 获取阿里短信SDk
const SMSClient = require('@alicloud/sms-sdk')

const multer = require('multer')
const upload = multer()

// **************以下为接口代码

// 登录
router.post('/login', (req, res) => {
    // 1. 接收表单中的数据
    let phone = req.body.phone
    let password = req.body.password

    // 2. 正则表达式验证数据
    // 2.1 验证登录名
    let phoneRe1 = /^1(3|5|6|7|8|9)\d{9}$/ // 手机号

    if (!phoneRe1.test(phone)) {
        res.json({
            "code": 400,
            "error": "账号名或密码错误，请重试"
        })
        // 退出程序
        return
    }

    // 2.2 验证密码
    let passwordRe = /^[0-9a-zA-Z_]{6,18}$/

    if (!passwordRe.test(password)) {
        res.json({
            "code": 400,
            "error": "账号名或密码错误，请重试"
        })
        // 退出程序
        return
    }

    // 3. 根据接收到的登录名 到数据库中查询是否存在
    let sql = `SELECT id,password FROM users WHERE phone = ?`
    conn.query(sql, phone, (error, results) => {
        if (error) {
            res.json({
                "code": 400,
                "error": error
            })
            return
        } else {
            // 如果用户存在 判断用户密码是否正确
            if (results.length > 0) {
                if (results[0].password === md5(password + md5_key)) {
                    // 生成令牌
                    let data = {
                        id: results[0].id,
                        username: results[0].phone
                    }
                    res.json({
                        "code": 200,
                        "token": jwt.makeJWT(data),
                        "data": {
                            "id": results[0].id,
                            "username": phone
                        }
                    })
                } else {
                    res.json({
                        "code": 400,
                        "error": "账号名或密码错误，请重试"
                    })
                    return
                }
            } else {
                res.json({
                    "code": 400,
                    "error": "账号名或密码错误，请重试"
                })
                return
            }
        }
    })

})

// 获取手机验证码
router.post('/getPhoneVerifyCode', (req, res) => {
    // 接收获取到的手机号码
    const phoneNumber = req.body.phone
    const accessKeyId = 'LTAI4FfysfG5Jq7B5iWXdgH1'
    const secretAccessKey = 'IJPh6gujXG5Y131NeeEbiVTYK26vGi'

    // 初始化sms_client
    const smsClient = new SMSClient({ accessKeyId, secretAccessKey })
    // 验证手机号码
    let phoneNumberRe = /^1(3|5|6|7|8|9)\d{9}$/
    if (!phoneNumberRe.test(phoneNumber)) {
        res.json({
            "code": 400,
            "error": "手机号码格式不正确，请重新输入"
        })
        return
    }

    // 生成短信验证码
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }

    if (phoneNumber) {
        // 查询用户注册是否已经存在
        let sql = `SELECT * FROM users WHERE phone = ?`
        conn.query(sql, phoneNumber, (error, results) => {
            if (error) {
                res.json({
                    "code": 400,
                    "error": error
                })
                return
            }
            // 如果已经存在 就更新验证码为现在发送的验证码
            if (results.length != 0) {
                let sql2 = `UPDATE users SET verifyCode =? WHERE phone = ?`
                conn.query(sql2, [Num, phoneNumber], (error, result) => {
                    if (error) {
                        res.json({
                            "code": 400,
                            "error": error
                        })
                        return
                    } else {
                        // console.log(result)
                        res.json({
                            "code": 200
                        })
                    }
                })
            } else {
                // 存入数据库 注册用户
                let sql3 = `INSERT INTO users(phone,verifyCode) VALUES(?,?)`
                conn.query(sql3, [phoneNumber, Num], (error, results) => {
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
            }
        })
    }

    // 发送短信
    smsClient.sendSMS({
        PhoneNumbers: phoneNumber,
        SignName: '传智Fullstack5',
        TemplateCode: 'SMS_175572112', // SMS_17557211211
        TemplateParam: '{"code":"' + Num + '"}',
    }).then(function (res) {
        let { Code } = res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res)
        }
    }, function (err) {
        console.log(err)
    })
})

// 验证验证码是否正确
router.get('/VerifyCode', (req, res) => {
    // 用户输入的手机号
    const phone = req.query.phone
    // console.log(phone)
    // 用户输入的验证码
    const sms = req.query.sms
    let sql = 'select * from users where phone = ?'
    conn.query(sql, phone, (err, results) => {
        if (err) {
            res.json({
                ok: 0,
                error: err
            })
        } else {
            // 用接收到的验证码和数据库中的做对比
            if (sms.toString() === (results[0].verifyCode).toString()) {
                res.json({
                    ok: 1,
                    message: '验证码正确'
                })
            } else {
                res.json({
                    ok: 0,
                    error: "输入的短信验证码错误"
                })
            }
        }
    })

})

// 注册
router.post('/regist', (req, res) => {
    // 接收前端数据
    let phone = req.body.phone
    let sms = req.body.sms
    // console.log(sms)

    // 先查询手机号码是否已经存在
    let sql = `SELECT * FROM users WHERE phone = ?`
    conn.query(sql, phone, (error, results) => {
        if (error) {
            res.json({
                "code": 400,
                "error": error
            })
            return
        } else {
            // console.log(results)
            // 如果数据库中已经存在
            if (results.length !== 0) {
                // 判断该用户是否已经设置密码
                // 如果设置过了 说明是老用户   否则是新用户
                if (results[0].password === null) {
                    res.json({
                        "code": 404,
                        "error": "即将进入设置密码"
                    })
                    return
                } else {
                    // 用接收到的验证码和数据库中的做对比
                    if (sms.toString() === (results[0].verifyCode).toString()) {
                        // 生成令牌
                        let data = {
                            id: results[0].id,
                            username: results[0].phone
                        }
                        res.json({
                            "code": 200,
                            "message": "登录成功",
                            "token": jwt.makeJWT(data),
                            "data": {
                                "id": results[0].id,
                                "username": phone
                            }
                        })

                    } else {
                        res.json({
                            "code": 400,
                            "error": "短信验证码有误，请稍后重试"
                        })
                        return
                    }
                }
            }
        }
    })
})

// 设置密码
router.post('/setpassword', (req, res) => {
    let phone = parseInt(req.body.phone)
    // console.log(phone)
    let password = md5(req.body.password + md5_key)
    // console.log(password)
    // 通过接收到的手机号码  设置密码
    let sql = `update users set password = "${password}" WHERE phone = ${phone}`
    conn.query(sql, (error, results) => {
        // console.log(results);
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

// 找回密码 -- 发送短信验证码
router.post('/findPassGetphone', (req, res) => {
    // 接收前端数据
    let phone = req.body.phone
    const accessKeyId = 'LTAI4FfysfG5Jq7B5iWXdgH1'
    const secretAccessKey = 'IJPh6gujXG5Y131NeeEbiVTYK26vGi'

    // 初始化sms_client
    const smsClient = new SMSClient({ accessKeyId, secretAccessKey })

    // 生成短信验证码
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }

    // 判断数据库中是否有该用户
    let sql = `SELECT * FROM users WHERE phone = ${phone}`
    conn.query(sql, (error, results) => {
        if (error) {
            res.json({
                "code": 400,
                "error": error
            })
        } else {
            // console.log(results)
            // 如果用户存在 向用户发送短信验证码
            if (results.length !== 0) {
                let sql2 = `UPDATE users SET verifyCode =? WHERE phone = ?`
                conn.query(sql2, [Num, phone], (error, result) => {
                    if (error) {
                        res.json({
                            "code": 400,
                            "error": error
                        })
                        return
                    } else {
                        // console.log(result)
                        res.json({
                            "code": 200
                        })
                    }
                })
            } else {
                res.json({
                    "code": 400,
                    "error": "该账号不存在，请重新输入再试"
                })
            }
        }
    })

    // 发送短信
    smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: '传智Fullstack5',
        TemplateCode: 'SMS_175572112', // SMS_17557211211
        TemplateParam: '{"code":"' + Num + '"}',
    }).then(function (res) {
        let { Code } = res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res)
        }
    }, function (err) {
        console.log(err)
    })
})

// 找回密码 -- 重置密码
router.post('/resetPassword', (req, res) => {
    // 接收前端获取的手机号码 验证码
    let phone = parseInt(req.body.phone)
    let password = req.body.password
    let sms = req.body.sms

    // 通过手机号码 判断验证码是否正确
    let sql = `SELECT * FROM users WHERE phone = ${phone}`
    conn.query(sql, (error, results) => {
        if (error) {
            res.json({
                "code": 400,
                "error": error
            })
            return
        } else {
            if (sms.toString() === results[0].verifyCode) {
                // 验证密码
                let passwordRe = /^[0-9a-zA-Z_]{6,18}$/
                if (!passwordRe.test(password)) {
                    res.json({
                        "code": 401,
                        "error": "密码必须为6~18位数字、字母、下划线"
                    })
                    return
                }
                // 执行sql 更改用户密码
                let sql2 = `UPDATE users set password = "${md5(password + md5_key)}" WHERE phone = ${phone}`
                conn.query(sql2, (error, results) => {
                    if (error) {
                        res.json({
                            "code": 400,
                            "error": error
                        })
                        return
                    } else {
                        res.json({
                            "code": 200,
                            "message": "密码重置成功"
                        })
                    }
                })
            } else {
                res.json({
                    "code": 400,
                    "error": "短信验证码有误，请重试"
                })
            }
        }
    })
})

// 找回密码 -- 重新获取验证码
router.post('/findPassGetphoneAgain', (req, res) => {
    // 接收前端手机号
    let phone = req.body.phone
    const accessKeyId = 'LTAI4FfysfG5Jq7B5iWXdgH1'
    const secretAccessKey = 'IJPh6gujXG5Y131NeeEbiVTYK26vGi'

    // 初始化sms_client
    const smsClient = new SMSClient({ accessKeyId, secretAccessKey })

    // 生成短信验证码
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }

    let sql2 = `UPDATE users SET verifyCode =? WHERE phone = ?`
    conn.query(sql2, [Num, phone], (error, result) => {
        if (error) {
            res.json({
                "code": 400,
                "error": error
            })
            return
        } else {
            // console.log(result)
            res.json({
                "code": 200
            })
        }
    })

    // 发送短信
    smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: '传智Fullstack5',
        TemplateCode: 'SMS_175572112', // SMS_17557211211
        TemplateParam: '{"code":"' + Num + '"}',
    }).then(function (res) {
        let { Code } = res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res)
        }
    }, function (err) {
        console.log(err)
    })
})

// 查询用户单条信息
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    conn.query('select id,phone,mail,username,avatar from users where id = ?', [userId], (err, results) => {
        if (err) {
            res.json({
                ok: 0
            });
            return;
        }
        res.json({
            ok: 1,
            data: results[0]
        })
    })
})
// 修改手机号
router.put('/users/:id', (req, res) => {
    // 用户 id
    // 输入的手机号
    const requestData = [req.body.phone, req.params.id]
    // 验证手机号码
    let phoneNumberRe = /^1(3|5|6|7|8|9)\d{9}$/
    if (!phoneNumberRe.test(requestData[0])) {
        res.json({
            ok: 0,
            error: "输入的手机格式错误"
        })
        return
    }
    const sql = 'update users set phone=? where id = ?'
    conn.query(sql, requestData, (err, results) => {
        if (err) {
            res.json({
                ok: 0,
                error: err
            })
            return
        }
        res.json({
            ok: 1,
            message: '修改成功'
        })
    })
})

// 查询收货地址
router.get('/address', (req, res) => {
    const userId = req.query.users_id;
    const sql = 'select * from user_address where users_id=?'
    conn.query(sql, userId, (err, results) => {
        if (err) {
            res.json({
                ok: 0,
                error: err
            })
            return;
        }
        // let data = []
        results.forEach(v => {
            if (v.deliver_time === 0) {
                v.deliver_time = '收货时间不限'
            } else if (v.deliver_time === 1) {
                v.deliver_time = '周六日/节假日收货'
            } else {
                v.deliver_time = '周一至周五收货'
            }
            v.phone = v.phone.substr(0, 3) + '****' + v.phone.substr(7)
        })
        res.json({
            ok: 1,
            data: results
        })
    })
})
router.get('/address_all', (req, res) => {
    const sql = 'select * from user_address'
    conn.query(sql, (err, results) => {
        if (err) {
            res.json({
                ok: 0,
                error: err
            })
            return;
        }
        // let data = []
        results.forEach(v => {
            if (v.deliver_time === 0) {
                v.deliver_time = '收货时间不限'
            } else if (v.deliver_time === 1) {
                v.deliver_time = '周六日/节假日收货'
            } else {
                v.deliver_time = '周一至周五收货'
            }
            v.phone = v.phone.substr(0, 3) + '****' + v.phone.substr(7)
        })
        res.json({
            ok: 1,
            data: results
        })
    })
})
// 添加收货地址
router.post('/address', (req, res) => {
    const updateData = {
        users_id: req.body.users_id,
        deliver_name: req.body.deliver_name,
        phone: req.body.phone,
        deliver_time: req.body.deliver_time,
        province: req.body.province,
        city: req.body.city,
        county: req.body.county,
        street: req.body.street
    };
    const sql = 'insert into user_address set ?';
    conn.query(sql, updateData, (err, results) => {
        if (err) {
            res.json({
                ok: 0,
                error: err
            })
            return;
        }
        res.json({
            ok: 1,
            message: '添加成功'
        })
    })
})
// 修改回显
router.get('/address/:id/echo', (req,res) => {
    let id = req.params.id
    let sql = 'select * from user_address where id=?'
    conn.query(sql, id, (err, results) => {
        if (err) {
            res.json({
                ok: 0,
                error: err
            })
            return;
        }
        // results.forEach(v => {
        //     v.phone = v.phone.substr(0,3)+ '****' + v.phone.substr(7)
        // })
        res.json({
            ok: 1,
            data: results[0]
        })
    })
})
// 修改收货地址
router.put('/address', (req, res) => {
    const userInfo = req.body.address_id;
    const insertInfo = {
        deliver_name: req.body.deliver_name,
        phone: req.body.phone,
        deliver_time: req.body.deliver_time,
        province: req.body.province,
        city: req.body.city,
        county: req.body.county,
        street: req.body.street
    }
    const sql = 'update user_address set ? where id = ?'
    conn.query(sql, [insertInfo, userInfo], (err, results) => {
        if (err) {
            res.json({
                ok: 0,
                error: err
            })
            return;
        }
        res.json({
            ok: 1,
            message: '修改成功'
        })
    })
})

// 删除收货地址
router.delete('/address/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'delete from user_address where id = ?'
    conn.query(sql, [id], (err, results) => {
        if (err) {
            res.json({
                ok: 0,
                error: err
            })
            return
        }
        if (results.affectedRows) {
            res.json({
                ok: 1,
                message: '地址删除成功'
            })
        } else {
            res.json({
                ok: 0,
                message: '删除失败, 请检查地址id'
            })
        }

    })
})

// 查询全部用户
router.get('/users', (req, res) => {
    const page = req.query.page || 1;
    const per_page = req.query.per_page || 10;
    const _offset = (page - 1) * per_page
    conn.query('select * from users limit ?,?', [_offset, parseInt(per_page)], (err, results) => {
        // console.log(result)
        if (err) {
            res.json({
                ok: 0,
                error: err
            })
            return;
        }
        res.json({
            ok: 1,
            data: results
        })

    })
})

// 插入一条用户
router.post('/users', (req, res) => {
    const userInfo = {
        phone: req.body.phone,
        password: md5(req.body.password + md5_key),
        mail: req.body.mail,
        username: req.body.username || req.body.phone,
        avatar: req.body.avatar || 'http:127.0.0.1:1122/default.png',
        verifyCode: 0
    }
    const sql = 'insert into users set ?'
    conn.query(sql, userInfo, (err, results) => {
        if (err) {
            res.json({
                ok: 0,
                error: err
            })
            return
        }
        console.log(results)
        res.json({
            ok: 1,
            message: '插入成功'
        })
    })
})

// 删除指定用户
router.delete('/users/:id', (req, res) => {
    const id = req.params.id
    const sql = 'delete from users where id = ?'
    conn.query(sql, id, (err, results) => {
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
        } else {
            res.json({
                ok: 0,
                error: "删除失败，用户id不存在 或者 用户id错误"
            })
        }
    })
})

// 修改用户信息
router.patch('/users/:id', (req, res) => {
    const id = req.params.id
    // console.log(id)
    const userInfo = {
    }
    if (req.body.phone) {
        userInfo.phone = req.body.phone
    }
    if (req.body.mail) {
        userInfo.mail = req.body.mail
    }
    if (req.body.username) {
        userInfo.username = req.body.username
    }
    if (req.body.avatar) {
        userInfo.avatar = req.body.avatar
    }
    if (req.body.password) {
        userInfo.password = md5(req.body.password + md5_key)
        conn.query('select * from users where id = ?', req.body.id, (err, results) => {
            if(err) {
                res.json({
                    ok: 0,
                    error: err
                })
                return;
            }
            if(results[0].password === userInfo.password) {
               userInfo.password = req.body.cpassword
            } else {
                    res.json({
                        ok: 0,
                        error: '旧密码错误'
                    })

            }
        })
    }
    // console.log(userInfo)
    if (JSON.stringify(userInfo) === '{}') {
        res.json({
            ok: 0,
            message: "必需修改一个"
        })
        return;
    }
    userInfo.verifyCode = 0
    const sql = 'update users set ? where id = ?'
    conn.query(sql, [userInfo, id], (err, results) => {
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
                message: '修改成功'
            })
        } else {
            res.json({
                ok: 0,
                error: '用户id 不存在'
            })
        }
    })
})
// 图片上传
router.post('/upload_img', upload.single('avatar'), (req, res) => {
    let file = req.file;
    // console.log(file)
    let fileName = new Date().toLocaleDateString() + Math.floor(Math.random() * 10000000)
    fileName += '.' + file.mimetype.split('/')[1]
    fs.writeFileSync(path.join(__dirname, '../public/uploads', fileName), file.buffer);
    res.json({
        ok: 1,
        path: 'http://127.0.0.1:1122/uploads/' + fileName
    })
})

// 所有购物车
router.get('/carts', (req, res) => {
    conn.query('select * from carts', (err, result) => {
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
// 导出路由
module.exports = router