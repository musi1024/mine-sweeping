var game = function() {
    // 开始游戏
    var mineOver = 0
    var mineCount = 0
    var startGame = true
    var begin = e('#begin')
    var again = e('#again')
    var noAgain = e('#noAgain')
    var main = e('.main')
    var landmine = e('.landmine')
    var landmine_none = e('.landmine-none')
    var landMineCount = e("#landMineCount")
    var lands = eAll('.land')
    var alertBOX = e('.alertBOX')
    bindEvent(begin, 'click', function() {
        console.log('点击开始')
        if (startGame) {
            landmine.style.display = 'block'
            startGame = false
        } else {
            var lands = eAll('.land')
            log('again', value)
            for (var i = 0; i < lands.length; i++) {
                landmine.removeChild(lands[i])
            }
            stopCount()
        }
        landmine_none.style.display = 'none'
        var value = parseInt(legend())
        setMineOver(value)
        setTable(value)
        init(value)
        timeCount()
    })
    bindEvent(again, 'click', function() {
        console.log('again')
        alertBOX.style.display = 'none'
        var lands = eAll('.land')
        for (var i = 0; i < lands.length; i++) {
            landmine.removeChild(lands[i])
        }
        stopCount()
        var value = parseInt(legend())
        setMineOver(value)
        setTable(value)
        init(value)
        timeCount()
    })
    bindEvent(noAgain, 'click', function() {
        console.log('noAgain')
        alertBOX.style.display = 'none'
        stopCount()
        landmine_none.style.display = 'block'
    })
    main.oncontextmenu = function() {
    　　 return false
    }
    landmine.onmousedown = function(e) {
        var event = e.target
        if (e.which == 1) {
            leftClick(event)
        } else if (e.which == 3) {
            rightClick(event)
        }
    }

    // 游戏操作
    // 左键
    var leftClick = function(event) {
        var isLei = eAll('.isLei')
        var flag = eAll('.flag')
        if (event && event.classList.contains('flag')) {
            return
        }
        if (event && event.classList.contains('isLei')) {
            for (var i = 0; i < isLei.length; i++) {
                isLei[i].classList.add('show')
            }
            for (var i = 0; i < flag.length; i++) {
                if (!flag[i].classList.contains('isLei')) {
                    flag[i].classList.remove('flag')
                    flag[i].classList.add('wrong')
                }
            }

            var alertBOX = e('.alertBOX')
            var message = e('.message')
            var time = e('.time')
            message.innerHTML = 'GAME OVER!'
            time.innerHTML = `本次用时${timeSet - 1}秒`
            alertBOX.style.display = 'block'
            stopCount()
        } else {
            var n = 0
            var posArr = event && event.getAttribute('id').split('-')
            var posX = posArr && parseInt(posArr[2])
            var posY = posArr && parseInt(posArr[3])
            event && event.classList.add('num')
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var id = '#id-land-' + i + '-' + j
                    var around = e(id)
                    if (around && around.classList.contains('isLei')) {
                        n += 1
                    }
                }
            }
            if (n == 0) {
                for (var i = posX - 1; i <= posX + 1; i++) {
                    for (var j = posY - 1; j <= posY + 1; j++) {
                        var zero_id = '#id-land-' + i + '-' + j
                        var aroundZero = e(zero_id)
                        if (aroundZero && aroundZero.length != 0) {
                            if (!aroundZero.classList.contains('check')) {
                                aroundZero.classList.add('check')
                                leftClick(aroundZero)
                            }
                        }
                    }
                }
            } else {
                event && (event.innerHTML = n)
            }
        }
    }
    // 右键
    var rightClick = function(event) {
        if (event.classList.contains('num')) {
            return
        }
        event.classList.toggle('flag')
        if (event.classList.contains('flag')) {
            mineOver --
        } else if (!event.classList.contains('flag')) {
            mineOver ++
        }
        if (event.classList.contains('isLei') && event.classList.contains('flag')) {
            mineCount --
        } else if (event.classList.contains('isLei') && !event.classList.contains('flag')) {
            mineCount ++
        }
        landMineCount.innerHTML = mineOver
        if (mineCount == 0) {

            var alertBOX = e('.alertBOX')
            var message = e('.message')
            var time = e('.time')
            message.innerHTML = 'YOU WIN!'
            time.innerHTML = `本次用时${timeSet - 1}秒`
            alertBOX.style.display = 'block'
            stopCount()
        }
    }

    // 难度选择
    var legend = function() {
        var radios = document.getElementsByName('level')
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value
            }
        }
    }

    // 初始化
    var init = function(value) {
        var landmine = e('.landmine')
        landMineCount.innerHTML = mineOver
        log('init', value)
        if (value == 20) {
            for (var i = 0; i < 16; i++) {
                for (var j = 0; j < 25; j++) {
                    var landDemo = "<div class='land' id=id-land-" + i + "-" + j + "></div>"
                    appendHtml(landmine, landDemo)
                }
            }
        } else {
          for (var i = 0; i < value; i++) {
              for (var j = 0; j < value; j++) {
                  var landDemo = "<div class='land' id=id-land-" + i + "-" + j + "></div>"
                  appendHtml(landmine, landDemo)
              }
          }
        }
        setLandMine(value)
    }

    // 随机设置雷
    var setLandMine = function(value) {
        var landNum = 10
        if (value == 20) {
            landNum = 90
        } else if (value == 15) {
            landNum = 40
        }
        log('setland', landNum)
        var lands = eAll('.land')
        while (landNum) {
            var landIndex = Math.floor(Math.random() * value * value)
            if (lands[landIndex].classList.contains('isLei') === false) {
                lands[landIndex].classList.add('isLei')
                landNum -= 1
            }
        }
    }

    // 设置桌面尺寸
    var setTable = function(value) {
            if (value == 10) {
                landmine.style.width = '400px'
                main.style.width = '600px'
                landmine.style.height = '400px'
                main.style.height = '400px'
            } else if (value == 15) {
                landmine.style.width = '600px'
                landmine.style.height = '600px'
                main.style.width = '800px'
                main.style.height = '600px'
            } else if(value == 20){
                landmine.style.width = '1000px'
                landmine.style.height = '640px'
                main.style.width = '1200px'
                main.style.height = '630px'
            }
        }

    // 设置剩余地雷数目显示
    var setMineOver = function(value) {
            if (value == 10) {
                mineOver = 10
                mineCount = 10
            } else if (value == 15) {
                mineOver = 40
                mineCount = 40
            } else if (value == 20) {
                mineOver = 90
                mineCount = 90
            }
        }

}

// 计时器
var timeSet = 0
var timeCount = function () {
    e('#costTime').innerHTML = timeSet
    timeSet += 1
    t = setTimeout("timeCount()", 1000)

}
var stopCount = function() {
    timeSet = 0
    // setTimeout("e('#costTime').innerHTML = 0", 0)
    clearTimeout(t)
}




// 主函数
var __main = function() {
    game()
}

__main()
