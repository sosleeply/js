
function jQuery(args){
	this.elements = [];
	switch(typeof args){
		case 'function':
			this.bindEvent(window,'load',args);
		break;
		case 'string':
			switch(args.charAt(0)){
				case '#'://id
					this.getId(args.substring(1));
				break;
				case '.'://class
					this.getClass(document,args.substring(1));
				break;
				default://tag
					this.getTag(document,args);
				break;
			}
		break;
		case 'object':
			this.elements.push(args);
		break;
	}
}
jQuery.prototype.bindEvent=function(obj,events,fn){
	if(obj.addEventListener){
		obj.addEventListener(events,fn,false);
	}else{
		obj.addachEvent('on'+events,fn);
	}
}
/************************************************/
/****************selector start******************/
jQuery.prototype.getId=function(id){
	this.elements.push(document.getElementById(id));
	return this;
}
jQuery.prototype.getClass=function(oParent,className){
	var all=oParent.getElementsByTagName('*');
	for(var i=0;i<all.length;i++){
		if(all[i].className.match(className)){
			this.elements.push(all[i]);
		}
	}
	return this;
}
jQuery.prototype.getTag=function(oParent,tag){
	var tags=oParent.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++){
		this.elements.push(tags[i]);
	}
	return this;
}
jQuery.prototype.css=function(attr,value){
	console.log(this.elements.length)
	for(var i=0;i<this.elements.length;i++){
	if(arguments.length==1){
		if(typeof window.getComputedStyle!='undefined'){//W3C
			return window.getComputedStyle(this.elements[i],null)[attr];
		}else if(typeof this.elements[i].currentStyle!='undefined'){//IE
			return this.elements[i].currentStyle[attr];
		}
	}
	this.elements[i].style[attr]=value;
	}
	return this;
}
jQuery.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML=str;
	}
	return this;
}
/*****************selector end******************/
/***********************************************/
/***********************************************/
/*****************events start******************/
jQuery.prototype.on=function(events,fn){
	for(var i=0;i<this.elements.length;i++){
		this.bindEvent(this.elements[i],events,fn);
	}
	return this;
}
jQuery.prototype.click=function(fn){
	this.on('click',fn);

	return this;
}
jQuery.prototype.mouseover=function(fn){
	this.on('mouseover',fn);

	return this;
}
jQuery.prototype.mouseout=function(fn){
	this.on('mouseout',fn);

	return this;
}
jQuery.prototype.resize=function(fn){
	this.bindEvent(window,'resize',fn);

	return this;
}
jQuery.prototype.hover=function(over,out){
	this.on('mouseover',over);
	this.on('mouseout',out);

	return this;
}
/******************events end*******************/
/***********************************************/
/***********************************************/
/*****************function start****************/
jQuery.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block'
	}
	return this;
}
jQuery.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none'
	}
	return this;
}
jQuery.prototype.eq=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
jQuery.prototype.first=function(){
	var element=this.elements[0];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
jQuery.prototype.last=function(){
	var element=this.elements[this.elements.length-1];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
jQuery.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!this.elements[i].className.match(new RegExp('(\\s+|^)'+className+'(\\s+|$)')))
			this.elements[i].className += ' ' + className;
	}
	return this;
}
jQuery.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className.match(new RegExp('(\\s+|^)'+className+'(\\s+|$)')))
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s+|^)'+className+'(\\s+|$)'),'');
	}
	return this;
}
jQuery.prototype.center=function(){
	for(var i=0;i<this.elements.length;i++){
		var obj=this.elements[i];
		var width=obj.clientWidth;
		var height=obj.clientHeight;
		var top=(this.getInner().height-height)/2;
		var left=(this.getInner().width-width)/2;
		obj.style.top=top+'px';
		obj.style.left=left+'px';
	}
	
	return this;
}
jQuery.prototype.remove=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].remove();
	}

	return this;
}
/****************function end*******************/
/***********************************************/
/***********************************************/
/****************plugin end*********************/
jQuery.prototype.getInner=function(){
	if(typeof window.innerWidth!='undefined'){
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}
jQuery.prototype.preDef=function(e){
	var e=e||window.event;
	if(typeof e.preventDefault!='undefined'){//W3C
		e.preventDefault();
	}else{//IE
		e.returnValue=false;
	}
}
jQuery.prototype.drag=function(){
	var self=this;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmousedown=function(e){
			self.preDef(e);//阻止浏览器默认行为
			var _this=this;
			var e=e||window.event;
			var disX=e.clientX-_this.offsetLeft;
			var disY=e.clientY-_this.offsetTop;
			if(typeof _this.setCapture!='undefined'){
				_this.setCapture();//全局捕获
			}
			document.onmousemove=function(e){//此处给document绑定事件，是因为鼠标如果移动太快，会脱离当前元素
				var e=e||window.event;
				var left=e.clientX-disX;	//e.clientX跟屏幕左距离
				var top=e.clientY-disY;
				if(left<0){
					left=0;
				}else if(left>self.getInner().width-_this.offsetWidth){
					left=self.getInner().width-_this.offsetWidth;
				}
				if(top<0){
					top=0;
				}else if(top>self.getInner().height-_this.offsetHeight){
					top=self.getInner().height-_this.offsetHeight;
				}
				_this.style.left=left+'px';
				_this.style.top=top+'px';
			}
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				if(typeof _this.releaseCapture!='undefined'){
					_this.releaseCapture();//释放全局捕获
				}
			}
		}
	}

	return self;
}
jQuery.prototype.dragEx=function(){
	var self=this;
	function startMove(obj,iSpeedX,iSpeedY){
		obj.timer=setInterval(function(){
			iSpeedY+=3;//重力，Y++，加速向下
			var left=obj.offsetLeft+iSpeedX;
			var top=obj.offsetTop+iSpeedY;
			if(left<0){
				left=0;
				iSpeedX=-iSpeedX;
				iSpeedX*=0.75;//速度逐步损失
			}else if(left>self.getInner().width-obj.offsetWidth){
				left=self.getInner().width-obj.offsetWidth;
				iSpeedX=-iSpeedX;
				iSpeedX*=0.75;
			}
			if(top<0){
				top=0;
				iSpeedY=-iSpeedY;
				iSpeedY*=0.75;
			}else if(top>self.getInner().height-obj.offsetHeight){
				top=self.getInner().height-obj.offsetHeight;
				iSpeedY=-iSpeedY;
				iSpeedY*=0.75;
				iSpeedX*=0.75;//iSpeedY+=3，重力。底部碰撞概率会增大，增加X损失
			}
			obj.style.left=left+'px';
			obj.style.top=top+'px';
			//console.log(obj.style.left)
		},50);
	}
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmousedown=function(e){
			self.preDef(e);//阻止浏览器默认行为
			var _this=this;
			clearInterval(_this.timer);
			var e=e||window.event;
			var disX=e.clientX-_this.offsetLeft;
			var disY=e.clientY-_this.offsetTop;
			var prevX=e.clientX;//初始点
			var prevY=e.clientY;
			var iSpeedX=0;
			var iSpeedY=0;
			if(typeof _this.setCapture!='undefined'){
				_this.setCapture();//全局捕获
			}
			document.onmousemove=function(e){//此处给document绑定事件，是因为鼠标如果移动太快，会脱离当前元素
				var e=e||window.event;
				var left=e.clientX-disX;	//e.clientX跟屏幕左距离
				var top=e.clientY-disY;
				iSpeedX=e.clientX-prevX;
				iSpeedY=e.clientY-prevY;
				prevX=e.clientX;//保存前一个点
				prevY=e.clientY;

				if(left<0){
					left=0;
				}else if(left>self.getInner().width-_this.offsetWidth){
					left=self.getInner().width-_this.offsetWidth;
				}
				if(top<0){
					top=0;
				}else if(top>self.getInner().height-_this.offsetHeight){
					top=self.getInner().height-_this.offsetHeight;
				}
				_this.style.left=left+'px';
				_this.style.top=top+'px';
			}
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				if(typeof _this.releaseCapture!='undefined'){
					_this.releaseCapture();//释放全局捕获
				}
				startMove(_this,iSpeedX,iSpeedY);
			}
		}
	}

	return self;
}
jQuery.prototype.run=function(speed,interval){//多元素同时运动待解决
	if(!speed)speed=10;
	if(!interval)interval=50;
	var self=this;
	obj=this.elements[0];
	var width=obj.offsetWidth;
	var height=obj.offsetHeight;
	var iSpeedX=speed;
	var iSpeedY=speed;
	function startMove(){
		setInterval(function(){
			var left=obj.offsetLeft+iSpeedX;
			var top=obj.offsetTop+iSpeedY;
			if(top>self.getInner().height-height){
				top=self.getInner().height-height;
				iSpeedY=-speed;
			}
			if(left>self.getInner().width-width){
				left=self.getInner().width-width;
				iSpeedX=-speed;
			}
			if(top<0){
				top=0;
				iSpeedY=speed;
			}
			if(left<0){
				left=0;
				iSpeedX=speed;
			}
			obj.style.left=left+'px';
			obj.style.top=top+'px';
		},interval);
	}
	startMove();

	return self;
}
jQuery.prototype.fall=function(speed,interval){//自由落体，待解决
	if(!speed)speed=5;
	if(!interval)interval=30;
	var self=this;
	obj=this.elements[0];
	var timer=null;
	var iSpeed=0;
	var width=obj.offsetWidth;
	var height=obj.offsetHeight;
	obj.onclick=function(){
		startMove();
	};
	function startMove(){
		timer=setInterval(function(){
			iSpeed+=speed;//Y++,向下加速
			var top=obj.offsetTop+iSpeed;
			if(top>self.getInner().height-height){
				top=self.getInner().height-height
				iSpeed=-iSpeed;
				iSpeed*=0.75;//速度损失
			}
			obj.style.top=top+'px';
		},interval);
	}

	return self;
}
/****************plugin end*********************/
/***********************************************/
/***********************************************/
/**********trigonometric function start*********/
jQuery.prototype.menu=function(){//未完成
	var self=this;
	document.onmousemove=function(e){
		var e=e||window.event;
		for(var i=0;i<self.elements.length;i++){
			var obj=self.elements[i];
			var x=obj.offsetLeft+obj.offsetWidth/2;
			var y=obj.offsetTop+obj.offsetHeight/2+obj.parentNode.offsetTop;

			var b=e.clientX-x;
			var a=e.clientY-y;
			var c=Math.sqrt(Math.pow(b,2)+Math.pow(a,2));
			var scale=1-c/300;
			if(scale<0.3){
				scale=0.3;
			}
			obj.style.width=scale*200+'px';
			obj.style.height=scale*200+'px';
		}
	}

	return self;
}

/**********trigonometric function end***********/
/***********************************************/
/***********************************************/
/****************extend start*******************/
$.trim=function(str){
	return str.replace(/^\s+|\s+$/g,'');
}
/****************extend end*********************/
/***********************************************/
function $(args){
	return new jQuery(args);
}
