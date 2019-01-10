var conn = require('./conn');

//获取列表
exports.getAllItem = function (data, callback) {
    conn.query(`
        SELECT ino FROM item
    `, callback)
}

exports.getAllProducer = function (data, callback) {
    conn.query(`
        SELECT pno FROM producer
    `, callback)
}


//添加订单

exports.inStore = function (data, callback) {
    conn.query(`INSERT INTO storage (sno, ino, sprice, scount, sdate ) VALUES(?,?,?,?,?)`, [data.orderId, data.itemId, data.price, data.count, data.date], callback)
}

exports.outStore = function (data, callback) {
    conn.query(`INSERT INTO sale (sano, ino, cno, saprice, sacount, sadate) VALUES(?,?,?,?,?,?)`,[data.orderId, data.itemId, data.customerId, data.price, data.count, data.date], callback)
}

//更新库存
exports.updateInStore = function (data, callback) {
    conn.query(`UPDATE item SET icount = icount + ? WHERE ino = ?`,[data.count, data.itemId], callback)
}

exports.updateOutStore = function (data, callback) {
    conn.query(`UPDATE item SET icount = icount - ? WHERE ino = ?`,[data.count, data.itemId], callback)
}

//添加商品型号
exports.updateItem = function (data, callback) {
    conn.query(`
        INSERT
        INTO item (ino, iname, series, count, description, pno)
        VALUE( ? , ? , ? , ? , ? , ? )
    `,[data.itemId, data.itemName, data.series, data.count, data.pno], callback)
}

//新增库存项目

exports.addProducer = function (data, callback) {
    conn.query(`
        INSERT
        INTO producer (pno, pname, contactNumber)
        VALUE( ? , ? , ? )
    `,[data.producerId, data.producerName, data.phone], callback)
}

exports.addItem = function (data, callback) {
    conn.query(`
        INSERT
        INTO item (ino, iname, series, count, description, pno)
        VALUE( ? , ? , ? , ? , ? , ? )
    `,[data.itemId, data.itemName, data.series, data.count, data.pno], callback)
}

exports.addCustomer = function (data, callback) {
    conn.query(`
        INSERT
        INTO producer (cno, cname, contactNumber)
        VALUE( ? , ? , ? )
    `,[data.customerId, data.customerName, data.phone], callback)
}


//查看库存情况
exports.checkAllItem = function (data, callback) {
    conn.query(`
        SELECT * FROM item
    `, callback)
}

//查看记录
exports.checkInRecord = function (data, callback) {
    conn.query(`
        SELECT * FROM storage
    `, callback)
}

exports.checkOutRecord = function (data, callback) {
    conn.query(`
        SELECT * FROM sale
    `, callback)
}

//查找客户
exports.searchCustomer = function (data, callback) {
    conn.query(`
        SELECT * FROM customer WHERE cno = ?
    `,[data.customerId] , callback)
}

/**

exports.login = function(data, callback) {
    conn.query(`
    
    `,[], callback)
}

 */
