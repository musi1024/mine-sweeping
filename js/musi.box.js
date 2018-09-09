// 测试用
var log = function() {
    console.log.apply(console, arguments)
}

// 字符串大小写处理
var lowORuperrCase =function(s, l_OR_u) {
    if (l_OR_u == l) {
        lowerCase(s)
    } else {
        upperCase(s)
    }
    var find = function(s1, s2) {
        /*
        s1 s2 都是 string 但 s2 的长度是 1
        返回 s2 在 s1 中的下标, 从 0 开始, 如果不存在则返回 -1
        */
        var index = -1
        for (var i = 0; i < s1.length; i++) {
            if(s1[i] == s2) {
                index = i
                break
            }
        }
        return index
    }
    var lowerCase = function(s) {
        // 初始化一个空字符串
        var result = ""
        for (var i = 0; i < s.length; i++) {
            // 注意, 这个 find 是你要实现的函数
            var index = find(upper, s[i])
            // 看看是否找到了
            if (index > -1) {
                result += lower[index]
            } else {
                // 没找到说明这个字符是小写字符, 直接添加
                result += s[i]
            }
        }
        return result
    }
    var upperCase = function(s) {
        // 初始化一个空字符串
        var result = ""
        for (var i = 0; i < s.length; i++) {
            // 注意, 这个 find 是你要实现的函数
            var index = find(lower, s[i])
            // 看看是否找到了
            if (index > -1) {
                result += upper[index]
            } else {
                // 没找到说明这个字符是大写字符, 直接添加
                result += s[i]
            }
        }
        return result
    }
    var lower = 'abcdefghijklmnopqrstuvwxyz'
    var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
}

// 选项卡
var choice = function(hClass) {
  var buttons = document.querySelectorAll(hClass)
  // 循环遍历每个元素, 并且绑定点击事件
  for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i]
      button.addEventListener('click', function(event){
          // 增加了一个 event 参数
          // 浏览器会给事件响应函数传递一个参数, 它代表了事件本身
          // 可以用 event.target 取出响应事件的元素
          var self = event.target
          // clearActive 目的是删除其他元素的 active class
          clearActive()
          // add 可以增加一个 class
          self.classList.add('active')
      })
  }
  //
  var clearActive = function() {
      var s = document.querySelector('.active')
      if (s != null) {
          // 使用 classList 可以访问一个元素的所有 class
          // remove 可以删除一个 class
          s.classList.remove("active")
      }
  }
}

// 随机返回 0 或 1
var random01 = function() {
    /*
    js 标准数学库有一个随机数函数
    Math.random()
    它返回 0 - 1 之间的小数

    用它实现本函数, 返回 0 或 1
    */
    // r 是一个 0 - 1 的小数
    var r = Math.random()
    // * 10, 现在是 0 - 10 的小数了
    r *= 10
    // 取整, 现在是 0 - 10 的整数了
    r = Math.floor(r)
    // 用余数来取随机 0 1
    return r % 2
}

// 查找元素
var e = function(selector) {
    return document.querySelector(selector)
}

// 查找所有元素
var eAll = function(selector) {
    return document.querySelectorAll(selector)
}

// 时间标准库
var now = function() {
    var d = new Date()
    var nm = d.getFullYear()
    var yt = d.getMonth() + 1
    var ri = d.getDate()
    var ui = d.getHours()
    var ff = d.getMinutes()
    var mc = d.getSeconds()

    return `${nm}/${yt}/${ri} ${ui}:${ff}:${mc}`
    // return nm + '/' + yt + '/' + ri + ' ' + ui + ':' + ff + ':' + mc
}

// ajax
var ajax = function(method, path, headers, data, reseponseCallback) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式
    r.setRequestHeader('Content-Type', 'application/json')
    // 注册响应函数
    r.onreadystatechange = function() {
        if(r.readyState === 4) {
            reseponseCallback(r)
        }
    }
    // 发送请求
    r.send(data)
}

// 在html最后加入element
var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

// 绑定事件
var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

// 绑定多个事件
var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

// 删除所有 class
var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

// 添加所有 class
var addClassAll = function(selector, className) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.add(className)
    }
}

// find 函数可以查找 element 的所有子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}
