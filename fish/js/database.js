var db = openDatabase('test', '', 'local database demo', 204800);

function save(user_name, password) {
    var score = 0;
    db.transaction(function(tx) {
        tx.executeSql('insert into usertable values(?,?,?)', [user_name, password, score], onSuccess, onError);
    });

}
//sql语句执行成功后执行的回调函数
function onSuccess(tx, rs) {
    alert("操作成功");
    window.location.href = "login.html";
}
//sql语句执行失败后执行的回调函数
function onError(tx, error) {
    alert("操作失败，失败信息：" + error.message);
}

//将所有存储在sqlLite数据库中的联系人全部取出来
function loadAll() {
    var list = document.getElementById("list");
    db.transaction(function(tx) {
        //查询所有联系人记录
        tx.executeSql('select user,score from usertable order by score DESC', [], function(tx, rs) {
            if (rs.rows.length > 0) {
                var result = "<table>";
                result += "<tr><th>序号</th><th>用户名</th><th>分数</th></tr>";
                for (var i = 0; i < rs.rows.length; i++) {
                    var row = rs.rows.item(i);
                    //拼装一个表格的行节点
                    result += "<tr><td>" + (i + 1) + "</td><td>" + row.user + "</td><td>" + row.score + "</td><td>";
                }
                list.innerHTML = result;
            } else {
                list.innerHTML = "目前数据为空，赶紧开始加入联系人吧";
            }
        });
    });
}

//删除联系人信息
function del(user) {
    db.transaction(function(tx) {
        //注意这里需要显示的将传入的参数phone转变为字符串类型
        tx.executeSql('delete from usertable where user=?', [String(user)], onSuccess, onError);
    });
}

function isExist(username, password) {
    db.transaction(function(tx) {
        tx.executeSql('select user from usertable where user= ?', [String(username)], function(tx, rs) {
            if (rs.rows.length > 0) {
                alert("用户名已被占用!");
            } else save(username, password);
        })
    });
}

function isExistCheck(username, password) {
    db.transaction(function(tx) {
        tx.executeSql('select user from usertable where user= ?', [String(username)], function(tx, rs) {
            if (rs.rows.length > 0) {
                verify(username, password);
            } else alert("用户名不存在!");
        })
    });
}

function verify(user_name, password) {
    var currentUser;
    if (!user_name)
        return;
    db.transaction(function(tx) {
        tx.executeSql('select * from usertable where user=? and password=?', [String(user_name), String(password)], function(tx, rs) {
            if (rs.rows.length > 0) {
                window.location.href = "Game.html";
            } else
                alert("密码错误！");
        })
    });
}