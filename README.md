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
    $(selector).parent()
    $(selector).prev()
    $(selector).prev('input')
    $(selector).prevAll()
    $(selector).prevAll('input')
    $(selector).next()
    $(selector).next('input')
    $(selector).nextAll()
    $(selector).nextAll('input')
###未实现
    $('selector :first')
    $('selector :last')

###事件
##1.
##实现
    $(selector).on('eventName',function(){})

###方法
##1.
##实现
    $(function(){})
    $(selector).css('color','red')
    $(selector).css({'width':'100','height':'100'}})
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
    $(selector).rotation1(interval)     //interval:1000=1秒，默认3秒。渐变轮播
    $(selector).rotation2(interval)     //interval:1000=1秒，默认3秒。向上滚动轮播
    $(selector).rotation3(interval)     //interval:1000=1秒，默认3秒。向左滚动轮播，覆盖方式
    $(selector).rotation4(interval)     //interval:1000=1秒，默认3秒。向左滚动轮播，左推方式
    $(selector).rotation5(minWidth)     //minWidth:非焦点时所占宽度，非轮播。默认平均占取宽度
    $(selector).round2d(r,interval)     //r:半径,默认50, 30:定时器转动间隔，默认30。
    $(selector).round3d(r,interval)     //r:半径,默认50, 30:定时器转动间隔，默认30。
    $(selector).each(fn) or $(Array).each(fn)
    $(selector).animate({left:300,top:300,speed:20,interval:30})	//left:目标位置，top:目标位置,speed:运动速度,interval:频率    
    

###CSS
    text-indent:50px;   首行缩进50px

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

###CSS3分栏布局
    column-width:100px;         每栏100px，列数自动计算
    column-count:5;             分成5栏，每栏宽度自动计算
    column-gap:10px;            栏目间隔10px
    column-rule:1px solid #ccc; 栏目分隔线

###响应式布局
    根据不同分辨率加载不同样式表(不兼容IE678)
    e.g.
    <link rel="stylesheet" type="text/css" href="t.css" media="screen and (min-width:800px)" />
    <link rel="stylesheet" type="text/css" href="t.css" media="screen and (min-width:400px) and (max-width:800px)" />
    <link rel="stylesheet" type="text/css" href="t.css" media="screen and (max-width:400px)" />

    横屏
    <link rel="stylesheet" type="text/css" href="t.css" media="screen and (orientation:portrait)" />
    竖屏
    <link rel="stylesheet" type="text/css" href="t.css" media="screen and (orientation:landscape)" />

    直接在样式表中添加
    @media screen and (min-width:400px) and (max-width:800px) {
        .box{margin:0 auto;}
    }

    400-800引入样式表
    @import url("index.css") screen and (min-width:400px) and (max-width:800px);

###弹性盒模型
    .使用弹性盒模型时，父元素必须加display:box或display:inline-box;
    box-orient定义盒模型的布局方向
        horizontal  水平
        vertical    垂直
    box-direction   元素排列顺序
        normal  正序
        reverse 反序

    e.g.
    .box{height:200px;border:1px solid #ccc;padding:10px;display:-webkit-box;display:-moz-box;}
    .box div{width:100px;height:100px;background:lightseagreen;border:1px solid #fff;}

    box-ordinal-group设置元素的具体位置
    e.g.
    .box div:nth-of-type(1){-webkit-box-ordinal-group:2;}
    .box div:nth-of-type(2){-webkit-box-ordinal-group:3;}
    .box div:nth-of-type(3){-webkit-box-ordinal-group:1;}

    box-flex定义盒子的弹性空间
    子元素的尺寸=盒子的尺寸*子元素的box-flex属性值/所有子元素的box-flex属性值的和
    .box div:nth-of-type(1){-webkit-box-flex:1;}
    .box div:nth-of-type(2){-webkit-box-flex:2;}    1+2+3=6;分成6份，1/6,   2/6,    3/6
    .box div:nth-of-type(3){-webkit-box-flex:3;}

    box-pack对盒子富裕空间管理
    start所有子元素在盒子左侧显示，富裕空间在右侧
    end所有子元素在盒子右侧显示，富裕空间在左侧
    center所有子元素居中
    justify富余空间在子元素之间平均分布
    e.g.
    .box{height:200px;border:1px solid #ccc;padding:10px;display:-webkit-box;display:-moz-box;
        -webkit-box-pack:justify;
    }

###盒模型新增属性(可叠加，方法类同text-shadow)
    box-shadow:[inset] x y blur [spread] color
    -   inset: 投影方式
        inset: 内投影
        默认外投影
    -   x, y 阴影偏移
    -   blur: 模糊半径
    -   spread: 扩展阴影半径
    e.g.
    box-shadow: 10px 10px 10px #ccc;
    box-shadow: 0 0 10px 10px #ccc;

    box-reflect 倒影
    .direction 方向   above|below|left|right;
    .距离
    .渐变(可选)
    e.g.
    -webkit-box-reflect:below;
    -webkit-box-reflect:below 10px; 距倒影10px

    linear-gradient 线性渐变
    .box{width:300px;height:300px;background:-webkit-linear-gradient(red 0,blue 100%);}
    .box{width:300px;height:300px;-webkit-box-reflect:right 10px
        -webkit-linear-gradient(right,rgba(0,0,0,1) 0,rgba(0,0,0,0) 100%);
    }

    resize (必须配合overflow:auto使用)
    both    水平垂直都可以缩放
    horizontal  仅水平缩放
    vertical    仅垂直缩放
    e.g.
    resize:both;

    box-sizing 盒模型解析模式
    .content-box    标准盒模型
     width/height=border+padding+content
    .border-box 怪异盒模型
     width/height=content

###CSS3新增UI样式
    圆角
    .box{width:100px;height:100px;border-radius:5px;background:#cc5a1f;}
    椭圆
    .box{width:100px;height:200px;border-radius:50px/100px;background:#cc5a1f;}
    怪胎
    .box{width:100px;height:200px;border-radius:20px 40px 60px 80px/10px 20px 30px 40px;background:#cc5a1f;}

###CSS3过渡
    transition
    .box{width:100px;height:100px;background:#cc5a1f;transition:1s width,2s 1s height,3s 3s background;}
    .box:hover{width:300px;height:200px;background:#0066cc;}





u
























