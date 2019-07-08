let kits = {}

//封装随机取得整数
kits.randomInt = function(n,m) {
    return Math.floor(Math.random()*(m-n+1)+n);
};


//封装取的时间
kits.formatDate = function() {
    let date = new Date();
    let y = date.getFullYear();
    let M = date.getMonth()+1;
    let d = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    M = M < 0 ? '0' + M : M;
    d = d < 0 ? '0' + d : d;
    h = h < 0 ? '0' + h : h;
    m = m < 0 ? '0' + m : m;
    s = s < 0 ? '0' + s : s;
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;

};


//封装的是一个可以生成唯一id的方法
kits.primaryKey = function() {
    // 我们通过时间戳+大范围的随机整数生成id
    let now = Date.now(); //得到的是从1970年到现在为止的总的毫秒数
    //为了防止在1毫秒之内生成的id有多个，再次加上一个大范围的随机数
    let r = kits.radomInt(100000,999999);
    return now + '' + r;

}

