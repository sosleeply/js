/**/
function goldfish(args){
	this.elements = [];
	var self=this;
	switch(typeof args){
		case 'function':
			self.bindEvent(window,'load',args);
		break;
		case 'string':
			if(args.split(/\s+/g) && args.split(/\s+/g).length>1){
				/*css*/
				var _elements=args.split(/\s+/);
				var _subElements=[];
				var _node=[];/*存放父节点*/
				for(var i=0;i<_elements.length;i++){
					if(typeof _elements[i]==='string'&&_elements[i].replace(/\s+/)!=''){
						if(_node.length===0)_node.push(document);
						switch(_elements[i].charAt(0)){
							case '#':/*id*/
								_subElements=[];/*清空临时节点*/
								_subElements=(self.getId(_elements[i].substring(1),document));
								_node=_subElements;
								break;
							case '.':/*class*/
								_subElements=[];
								for(var j=0;j<_node.length;j++){
									var tmpElements=self.getClass(_elements[i].substring(1),_node[j]);
									for(var x=0;x<tmpElements.length;x++){
										_subElements.push(tmpElements[x]);
									}
								}
								_node=_subElements;
								break;
							default:/*tag*/
								_subElements=[];
								for(var j=0;j<_node.length;j++){
									var tmpElements=self.getTag(_elements[i],_node[j]);
									for(var x=0;x<tmpElements.length;x++){
										_subElements.push(tmpElements[x]);
									}
								}
								_node=_subElements;
								break;
						}
					}
				}
				self.elements=_subElements;
			}else{
				/*find*/
				switch(args.charAt(0)){
					case '#':/*id*/
						self.elements=self.getId(args.substring(1));
						break;
					case '.':/*class*/
						self.elements=self.getClass(args.substring(1));
						break;
					default:/*tag*/
						self.elements=self.getTag(args);
						break;
				}
			}
			break;
		case 'object':
			self.elements.push(args);
			break;
	}
	return self;
}
goldfish.prototype.bindEvent=function(obj,events,fn){
	if(obj.addEventListener){
		obj.addEventListener(events,fn,false);
	}else{
		obj.addachEvent('on'+events,fn);
	}
}
/************************************************/
/****************selector start******************/
goldfish.prototype.getId=function(id,parent){
	if(!parent)parent=document;
	var tmpElements=[];
	tmpElements.push(parent.getElementById(id));
	return tmpElements;
}
goldfish.prototype.getClass=function(className,parent){
	if(!parent)parent=document;
	var all=parent.getElementsByTagName('*');
	var tmpElements=[];
	for(var i=0;i<all.length;i++){
		if(all[i].className.match(className)){
			tmpElements.push(all[i]);
		}
	}
	return tmpElements;
}
goldfish.prototype.getTag=function(tag,parent){
	if(!parent)parent=document;
	var tags=parent.getElementsByTagName(tag);
	var tmpElements=[];
	for(var i=0;i<tags.length;i++){
		tmpElements.push(tags[i]);
	}
	return tmpElements;
}
goldfish.prototype.find=function(args){
	var self=this;
	var subElement = [];
	for(var i=0;i<self.elements.length;i++){
		switch(args.charAt(0)){
			case '#':
				self.getId(args.substring(1));
				break;
			case '.':
				var tmpElements=self.getClass(args.substring(1),self.elements[i]);
				for(var j=0;j<tmpElements.length;j++){
					subElement.push(tmpElements[j]);
				}
				break;
			default:
				var tmpElements=self.getTag(args,self.elements[i]);
				for(var j=0;j<tmpElements.length;j++){
					subElement.push(tmpElements[j]);
				}
				break;
		}
	}
	self.elements=subElement;

	return self;
}
/*internal function*/
goldfish.prototype.getStyle=function(obj,attr){
	if(typeof window.getComputedStyle!='undefined'){/*W3C*/
		return window.getComputedStyle(obj,null)[attr];
	}else if(typeof obj.currentStyle!='undefined'){/*IE*/
		return obj.currentStyle[attr];
	}
}
goldfish.prototype.css=function(attr,value){
	if(typeof attr=='string'){
		for(var i=0;i<this.elements.length;i++){
			if(arguments.length==1){
				return this.getStyle(this.elements[i],attr);
			}
			this.elements[i].style[attr]=value;
		}
	}else if(typeof attr=='object'){
		for(var i=0;i<this.elements.length;i++){
			for(var key in attr){
				var value=attr[key];
				this.elements[i].style[key]=value;
			}
		}
	}
	
	return this;
}
goldfish.prototype.attr=function(attr,value){
	if(typeof attr=='string'){
		for(var i=0;i<this.elements.length;i++){
			if(arguments.length==1){
				return this.elements[i].getAttribute(attr);
			}
			this.elements[i].setAttribute(attr,value);
		}
	}else if(typeof attr=='object'){
		for(var i=0;i<this.elements.length;i++){
			for(var key in attr){
				var value=attr[key];
				this.elements[i].setAttribute(key,value);
			}
		}
	}
	
	return this;
}
goldfish.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML=str;
	}
	return this;
}
goldfish.prototype.top=function(){
	var top=this.elements[0].offsetTop;
	var parent=this.elements[0].offsetParent;
	while(parent!=null){
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return top;
}
goldfish.prototype.left=function(){
	var left=this.elements[0].offsetLeft;
	var parent=this.elements[0].offsetParent;
	while(parent!=null){
		left+=parent.offsetLeft;
		parent=parent.offsetParent;
	}
	return left;
}
goldfish.prototype.width=function(size){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return parseInt(this.elements[i].offsetWidth);
		}
		this.css('width',size);
	}
	return this;
}
goldfish.prototype.height=function(size){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return parseInt(this.elements[i].offsetHeight);
		}
		this.css('height',size);
	}
	return this;
}
goldfish.prototype.innerWidth=function(){
	return this.elements[0].innerWidth;
}
goldfish.prototype.innerHeight=function(){
	return this.elements[0].innerHeight;
}
goldfish.prototype.scrollTop=function(){
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}
goldfish.prototype.offset=function(){
	return {
		top:this.elements[0].offsetTop,
		left:this.elements[0].offsetLeft,
		width:this.elements[0].offsetWidth,
		height:this.elements[0].offsetHeight
	}
}
goldfish.prototype.scrollHeight=function(){
	return document.body.scrollHeight;
}
goldfish.prototype.scrollLeft=function(){
	return  document.body.scrollLeft;
}
goldfish.prototype.length=function(){
	return this.elements.length;
}
goldfish.prototype.append=function(obj){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].appendChild(obj);
	}
	return this;
}
/*****************selector end******************/
/***********************************************/
/***********************************************/
/*****************events start******************/
goldfish.prototype.on=function(events,fn){
	for(var i=0;i<this.elements.length;i++){
		this.bindEvent(this.elements[i],events,fn);
	}
	return this;
}
goldfish.prototype.click=function(fn){
	this.on('click',fn);

	return this;
}
goldfish.prototype.mouseover=function(fn){
	this.on('mouseover',fn);

	return this;
}
goldfish.prototype.mouseout=function(fn){
	this.on('mouseout',fn);

	return this;
}
goldfish.prototype.resize=function(fn){
	this.bindEvent(window,'resize',fn);

	return this;
}
goldfish.prototype.hover=function(over,out){
	this.on('mouseover',over);
	this.on('mouseout',out);

	return this;
}
/******************events end*******************/
/***********************************************/
/***********************************************/
/*****************function start****************/
goldfish.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block'
	}
	return this;
}
goldfish.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none'
	}
	return this;
}
goldfish.prototype.eq=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
goldfish.prototype.first=function(){
	var element=this.elements[0];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
goldfish.prototype.last=function(){
	var element=this.elements[this.elements.length-1];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
goldfish.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!this.elements[i].className.match(new RegExp('(\\s+|^)'+className+'(\\s+|$)')))
			this.elements[i].className += ' ' + className;
	}
	return this;
}
goldfish.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className.match(new RegExp('(\\s+|^)'+className+'(\\s+|$)')))
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s+|^)'+className+'(\\s+|$)'),'');
	}
	return this;
}
goldfish.prototype.center=function(){
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
goldfish.prototype.remove=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].remove();
	}

	return this;
}
goldfish.prototype.serialize=function(){
	var form=this.elements[0];
	var parts={};
	for(var i=0;i<form.elements.length;i++){
		var field=form.elements[i];
		switch(field.type){
			case undefined:
			case 'submit':
			case 'reset':
			case 'file':
			case 'button':
				break;
			case 'radio':
			case 'checkbox':
				if(typeof parts[field.name]!='undefined'){
					var optValue=parts[field.name];
					parts[field.name]=(optValue+','+field.value);
				}else{
					parts[field.name]=field.value;
				}
				if(!field.selected)break;
			case 'select-one':
			case 'select-multiple':
				for(var j=0;j<field.options.length;j++){
					var option=field.options[j];
					if(option.selected){
						var optValue='';
						if(option.hasAttribute){
							optValue=(option.hasAttribute('value')?option.value:option.text);
						}else{
							optValue=(option.attributes('value').specified?option.value:option.text);
						}
						parts[field.name]=optValue;
					}
				}
				break;
			default:
				parts[field.name]=field.value;
		}
	}
	return parts;
}
goldfish.prototype.each=function(fn){
	for(var i=0;i<this.elements.length;i++){
		fn(this.elements[i],i);
	}
	return this;
}
/****************function end*******************/
/***********************************************/
/***********************************************/
/****************plugin end*********************/
goldfish.prototype.getInner=function(){
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
goldfish.prototype.preDef=function(e){
	var e=e||window.event;
	if(typeof e.preventDefault!='undefined'){/*W3C*/
		e.preventDefault();
	}else{/*IE*/
		e.returnValue=false;
	}
}
goldfish.prototype.animate=function(args){
	var self=this;
	var speed=args['speed'];
	var interval=args['interval'];
	if(typeof speed=='undefined')speed=50;
	if(typeof interval=='undefined')interval=30;
	for(var i=0;i<this.elements.length;i++){
		var obj=this.elements[i];
		var targetX=args['left'];
		var targetY=args['top'];
		if(targetX<obj.offsetLeft){
			obj.speedX=-speed;
		}else{
			obj.speedX=speed;
		}
		if(targetY<obj.offsetTop){
			obj.speedY=-speed;
		}else{
			obj.speedY=speed;
		}
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			if(typeof args['left']!='undefined'){
				if(obj.speedX>0){
					if(obj.offsetLeft>=targetX){
						obj.style.left=targetX+'px';
						obj.speedX=0;
					}
				}else{
					if(obj.offsetLeft<=targetX){
						obj.style.left=targetX+'px';
						obj.speedX=0;
					}
				}
				obj.style.left=obj.offsetLeft+obj.speedX+'px';
			}else{
				obj.speedX=0;
			}
			if(typeof args['top']!='undefined'){
				if(obj.speedY>0){
					if(obj.offsetTop>=targetY){
						obj.style.top=targetY+'px';
						obj.speedY=0;
					}
				}else{
					if(obj.offsetTop<=targetY){
						obj.style.top=targetY+'px';
						obj.speedY=0;
					}
				}
				obj.style.top=obj.offsetTop+obj.speedY+'px';
			}else{
				obj.speedY=0;
			}
			if(obj.speedX===0&&obj.speedY===0){
				clearInterval(obj.timer);
			}
		},interval);
	}

	return self;
}
goldfish.prototype.drag=function(){
	var self=this;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmousedown=function(e){
			self.preDef(e);
			var _this=this;
			var e=e||window.event;
			var disX=e.clientX-_this.offsetLeft;
			var disY=e.clientY-_this.offsetTop;
			if(typeof _this.setCapture!='undefined'){
				_this.setCapture();
			}
			document.onmousemove=function(e){
				var e=e||window.event;
				var left=e.clientX-disX;	
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
					_this.releaseCapture();
				}
			}
		}
	}

	return self;
}
goldfish.prototype.dragEx=function(){
	var self=this;
	function startMove(obj,iSpeedX,iSpeedY){
		obj.timer=setInterval(function(){
			iSpeedY+=3;
			var left=obj.offsetLeft+iSpeedX;
			var top=obj.offsetTop+iSpeedY;
			if(left<0){
				left=0;
				iSpeedX=-iSpeedX;
				iSpeedX*=0.75;
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
				iSpeedX*=0.75;
			}
			obj.style.left=left+'px';
			obj.style.top=top+'px';
		},50);
	}
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmousedown=function(e){
			self.preDef(e);
			var _this=this;
			clearInterval(_this.timer);
			var e=e||window.event;
			var disX=e.clientX-_this.offsetLeft;
			var disY=e.clientY-_this.offsetTop;
			var prevX=e.clientX;
			var prevY=e.clientY;
			var iSpeedX=0;
			var iSpeedY=0;
			if(typeof _this.setCapture!='undefined'){
				_this.setCapture();
			}
			document.onmousemove=function(e){
				var e=e||window.event;
				var left=e.clientX-disX;
				var top=e.clientY-disY;
				iSpeedX=e.clientX-prevX;
				iSpeedY=e.clientY-prevY;
				prevX=e.clientX;
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
					_this.releaseCapture();
				}
				startMove(_this,iSpeedX,iSpeedY);
			}
		}
	}

	return self;
}
goldfish.prototype.run=function(speed,interval){/*多元素同时运动待解决，元素碰撞未实现*/
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
goldfish.prototype.fall=function(speed,interval){/*自由落体，待解决*/
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
			iSpeed+=speed;
			var top=obj.offsetTop+iSpeed;
			if(top>self.getInner().height-height){
				top=self.getInner().height-height
				iSpeed=-iSpeed;
				iSpeed*=0.75;
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
goldfish.prototype.menu=function(){
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
$.browser=function(){
	var ua=navigator.userAgent.toLowerCase();
	return ua;
}
$.each=function(arr,fn){
	for(var i=0;i<arr.length;i++){
		fn(arr[i],i);
	}
}
/****************extend end*********************/
/***********************************************/
function $(args){
	return new goldfish(args);
}
