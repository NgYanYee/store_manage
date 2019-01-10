var homepageDao = require('../proxy/homepageDao')
var accountDao = require('../proxy/accountDao')

var formatDateTime = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    // var h = date.getHours();
    // var minute = date.getMinutes();
    // minute = minute < 10 ? ('0' + minute) : minute;
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
    return y + '-' + m + '-' + d;
};

var ResData = function (state, stateInfo, data) {
    this.state = state != undefined ? state : 1;
    this.stateInfo = stateInfo ? stateInfo : '';
    this.data = data ? data : null;
}

// 登陆
exports.login = function (req, res) {
    accountDao.login(req.body, function (err, result) {
        if (!err) {
            if (result.length === 0) {
                res.send(new ResData(0, '账号或密码错误！', err));
            } else {
                var user = {
                    userId: result[0].userId,
                    userName: result[0].userName,
                }
                req.session.user = user;
                res.send(new ResData(1, '成功！', user));
            }
        } else {
            res.send(new ResData(0, '服务器异常！', err));
        }
    })
}
// 用户注册
exports.register = function (req, res) {
    accountDao.register(req.body, function (err, result) {
        if (!err) {
            if (result.length === 0) {
                res.send(new ResData(0, '失败!', err))
            } else {
                res.send(new ResData(1, '成功!', result))
            }
        } else {
            if (err.errno == 1062) {
                res.send(new ResData(0, '账号已存在！'))
            } else {
                res.send(new ResData(0, '服务器异常!', err))
            }
        }
    })
}
// 登出
exports.exit = function (req, res) {
    req.session.user = null;
    res.send(new ResData(1, '成功!'))
}

exports.info = function (req, res) {
    var account = req.session.user;
    accountDao.getUserById(account, function (err, result) {
        if (!err) {
            res.send(new ResData(1, '成功!', result[0]))
        } else {
            res.send(new ResData(0, '服务器异常!', err))
        }
    })
}

exports.beInStore = function (req, res) {
    homepageDao.inStore(req.body, function (err, result) {
        if (!err) {
            homepageDao.updateInStore(req.body, function (err, result) {
                if (!err) {
                    res.send(new ResData(1, '成功!', result))
                } else {
                    res.send(new ResData(0, '更新库存失败!', err))
                }
            })
         } else {
             res.send(new ResData(0, '入库货单添加失败!', err))
         }
    })
}

exports.beOutStore = function (req, res) {
    homepageDao.searchCustomer(req.body, function (err, result) {
        if (!err) {
            if(result.length === 0)
            res.send(new ResData(0, '请先对客户进行登记!'))
            else {
                homepageDao.outStore(req.body, function (err, result) {
                    if (!err) {
                        homepageDao.updateOutStore(req.body, function (err, result) {
                            if (!err) {
                                res.send(new ResData(1, '成功!', result))
                            } else {
                                res.send(new ResData(0, '更新库存失败!', err))
                            }
                        })
                    } else {
                        res.send(new ResData(0, '出库货单添加失败!', err))
                    }
                })
            }
        } else {
            res.send(new ResData(0, '服务器错误!', err))
        }
    })
    
}

exports.getAllItem = function (req, res) {
    homepageDao.getAllItem(req.body, function (err, result) {
       
    })
}

exports.addItem = function (req, res) {
    homepageDao.addItem(req.body, function (err, result) {
        if (!err) {
            res.send(new ResData(1, '成功!', req.body))
        } else {
            if (err.errno == 1451) {
                res.send(new ResData(0, '该货品已存在，删除失败!'))
            } else {
                res.send(new ResData(0, '服务器异常!', err))
            }
        }
    })
}

exports.addProducer = function (req, res) {
    homepageDao.addProducer(req.body, function (err, result) {
        if (!err) {
            res.send(new ResData(1, '成功!', req.body))
        } else {
            if (err.errno == 1451) {
                res.send(new ResData(0, '该供应商已存在，删除失败!'))
            } else {
                res.send(new ResData(0, '服务器异常!', err))
            }
        }
    })
}

exports.addCustomer = function (req, res) {
    homepageDao.addCustomer(req.body, function (err, result) {
        if (!err) {
            res.send(new ResData(1, '成功!', req.body))
        } else {
            if (err.errno == 1451) {
                res.send(new ResData(0, '该客户已存在，删除失败!'))
            } else {
                res.send(new ResData(0, '服务器异常!', err))
            }
        }
    })
}

exports.getItemList = function (req, res) {
    homepageDao.checkAllItem(req.body, function (err, result) {
        if (!err) {
            res.send(new ResData(1, '成功!', result))
        } else {
            res.send(new ResData(0, '服务器异常!', err))
        }
    })
}

exports.getInList = function (req, res) {
    homepageDao.checkInRecord(req.body, function (err, result) {
        if (!err) {
            res.send(new ResData(1, '成功!', result))
        } else {
            res.send(new ResData(0, '服务器异常!', err))
        }
    })
}

exports.getOutList = function (req, res) {
    homepageDao.checkOutRecord(req.body, function (err, result) {
        if (!err) {
            res.send(new ResData(1, '成功!', result))
        } else {
            res.send(new ResData(0, '服务器异常!', err))
        }
    })
}

/**

exports.register = function (req, res) {
	departmentDao.register(req.body, function (err, result) {
		if (!err) {
			
            res.send(new ResData(1, '成功!', result))
		} else {
		    res.send(new ResData(0, '失败!', err))
		}
	})
}

 */