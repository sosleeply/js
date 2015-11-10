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
..未实现
$('selector :first')
$('selector :last')
$('selector').prev()
$(selector).prev('input')
$(selector).prevAll()
$(selector).next()
$(selector).next('input')
$(selector).nextAll()

###事件
1.
..实现
$(selector).on('eventName',function(){})

###方法
1.
..实现
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
$(selector).center()    //相对body屏蔽居中，依赖position:fixed
$(selector).remove()
$(selector).serialize() //表单序列化，返回json对象
$(selector).drag()      //依赖position:absolute或position:fixed
$(selector).dragEx()    //依赖position:absolute或position:fixed

###400行之后，属插件类，等分离
