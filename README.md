##选择器
##1.
###实现
    $('#id')
    $('.class')
    $('div')            //tag
    $('.main .left h1') //多级选择器
    $(selector).eq(0)
    $(selector).first()
    $(selector).last()
    $(selector).find('a')
###未实现
    $('selector :first')
    $('selector :last')
    $('selector').prev()
    $(selector).prev('input')
    $(selector).prevAll()
    $(selector).next()
    $(selector).next('input')
    $(selector).nextAll()

###事件
##1.
##实现
    $(selector).on('eventName',function(){})

###方法
##1.
##实现
    $(function(){})
    $(selector).css('color','red')
    $(selector).css({'width':'100px','height':'100px'}})
    $(selector).css('color')    //获取
    $(selector).attr('src','http://xxx.yyy.cn/img.jpg')
    $(selector).attr({'name':'userName',...})
    $(selector).attr()  //获取
    $(selector).show()
    $(selector).hide()
    $(selector).append()
    $(selector).addClass('active')
    $(selector).removeClass('active')
    $(selector).center()    //相对body屏幕居中，依赖position:fixed
    $(selector).remove()
    $(selector).serialize() //表单序列化，返回json对象
    $(selector).drag()      //依赖position:absolute或position:fixed
    $(selector).dragEx()    //依赖position:absolute或position:fixed

###400行之后，属插件类，待分离

###兼容性
    transition，兼容IE10及以上

###CSS3选择器
    E[attr]只使用属性名，但没确定任何属性值。
    E[attr='value']指定属性名，并指定属性值
    E[attr~='value']指定属性名，并具有属性值，此属性值是一个词列表，空格隔开。其中包含了一个value词，而且等号前面的~不能不写
    E[attr^='value']指定属性名，并且有属性值，属性值以value开头
    E[attr$='value']指定属性名，并且有属性值，属性值以value结束
    E[attr*='value‘]指定属性名，并且有属性值，属性值中包含了value
    E[attr|='value']指定属性名，并且属性值是value或者以value-开头的值

    E:nth-child 父级下第x个子节点
    E:nth-child(num)
    E:nth-child(odd)奇数行
    E:nth-child(even)偶数行
    E:nth-child(2n)   2*n; n从0计数  n=0;n=1;n=2...
    E:nth-child(2n-1)
    p:nth-child(2)找到父级下的第2个子节点，并且这个节点必须是p标签

    E:nth-last-child(1)同nth-child，唯一区别是顺序从后往前

    p:nth-of-type(2)找p标签父级下的第二个p标签
    p:nth-last-of-type(2)从后往前走，找p标签父级下的第二个p标签

    p:first-child 等同于p:nth-child(1)
    p:last-child 等同于p:nth-last-child(1)
    p:first-of-type 等同于p:nth-of-type(1)
    p:last-of-type 等同于p:nth-last-of-type(1)

###CSS3新增颜色模式
    rgba
    .r  Red     (取值0-255)
    .g  Green   (取值0-255)
    .b  Blue    (取值0-255)
    .a  Alpha   (取值0-1)(仅背景透明)
    e.g.
    .box{width:100px;height:100px;background:rgba(0,0,0,0.2);}
    .box{color:rgba(0,0,0,0.6);}
    .box{border:1px solid rgba(255,0,0,0.3);}

###CSS3文字阴影
    .text-shadow:x y blur color,...
    .参数
    -x      横向偏移
    -y      纵向偏移
    -blur   模糊距离
    -color  阴影颜色
    e.g.
    text-shadow:-1px -9px 6px #F00;
    text-shadow:-1px -9px 6px #F00,-1px -9px 6px yellow;(阴影叠加)
    .文本阴影如果加很多层，会很卡

    文字描边
    -webkit-text-stroke:3px red;(仅webkit内核浏览器支持)

    Direction   定义文字排列方式（全兼容）
    Rtl从右向左排列
    Ltr从左向右排列
    direction:rtl; (right to left)



