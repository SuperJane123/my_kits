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

};


//封装一个可以获取本地数据的方法
kits.loadData = function(key){
    let json = localStorage.getItem(key);
    let arr = [];
    if(json){
        arr = JSON.parse(json);
        if(!(arr instanceof Array)){
            console.warn('读取出来的数组不是一个数组');
        }
    }
    return arr;
};


// 封装一个储存本地数据的方法
kits.saveData = function(key,arr){
    let json = JSON.stringify(arr);
    localStorage.setItem(key,json);
};



// 封装一个求最大值的方法
ktis.getMax = function () {
    let max = arguments[0]; //先用一个数据把最大值储存起来，用于下面的比较
    for (let i = 1; i < arguments.length; i++) {
      if (max < arguments[i]) {
        max = arguments[i];
      } else {
        max = max;
      }
      //或者 ：max = max < arguments[i] ? arguments[i] : max;
    }
    //修改函数的返回值
    return max;
  };




//   封装一个求最小值的方法
ktis.getMin = function () {
    let min = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
      if (min > arguments[i]) {
        min = arguments[i];
      } else {
        min = min;
      }
    }
    return min;
  };



  //从url地址栏里面获取后面的参数 eg ： id=10086&name=goudan&pwd=123
kits.getUrlParams = function () {
    let arr = location.search.substring(1).split('&');
    let params = {};
    arr.forEach(e => {
      let temp = e.split('=');
      let key = temp[0];
      let val = temp[1];
      params[key] = val;
    })
    return params;
  };




  //收集表单数据的方法
kits.serialize = function(formSelector) {
    let form = document.querySelector(formSelector);
    let eles = form.querySelectorAll('[name]');
    //创建一个空数组
    let arr = [];
    //由于单选框的值只能有一个,因此要判断
    //遍历eles
    eles.forEach(e => {
      if (e.type === 'radio' && e.checked) {
        let key = e.name;
        let val = e.value;
        arr.push(key + '=' + val);
      }
      if (e.type !== 'radio') {
        let key = e.name;
        let val = e.value;
        arr.push(key + '=' + val);
      }
    });
    //利用数组的jion方法
    return arr.join('&')
  };


  
//封装验证数据的方法
//用一个对象把需要验证的规则放进去,变成对象的方法
let strategies = {
    //验证非空
    isNonEmpty: function (val, msg) {
      if (val.trim().length === 0) {
        return msg;
      }
    },
    //验证长度
    minLength: function (val, len, msg) {
      if (val.trim().length < len) {
        return msg;
      }
    },
    //验证手机号码的方法
    isMobile: function (val, msg) {
      if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
        return msg;
      }
    }
  }
  
  //状态模式的思想 ：使用状态代替if-else
  function Validator() {
    //有一个数组,用来储存所有验证的函数
    this.validateFuns = [];
  }
  
  //给构造函数的原型添加一个方法,让其可以添加一个新的函数进去
  Validator.prototype.add = function (dom, arr) {
    //遍历数组,往this.validateFuns添加新的验证方法
    for (let i = 0; i < arr.length; i++) {
      let fn = function () {
        let rule = arr[i];
        let params = rule.fnName.split(':'); //eg[minLength,8]
        let fnName = params.shift();
        params.unshift(dom.value); //eg[dom.vlaue,8]
        params.push(rule.errMsg); // eg[dom.value,8,rule.errMsg];
        return strategies[fnName].apply(dom, params);
      }
      this.validateFuns.push(fn);
    }
  }
  
  //需要一个可以把数组里面的每个函数都执行的方法
  Validator.prototype.start = function () {
    //遍历数组
    for (let i = 0; i < this.validateFuns.length; i++) {
      let msg = this.validateFuns[i]();
      if (msg) {
        return msg;
      }
    }
  };
  





