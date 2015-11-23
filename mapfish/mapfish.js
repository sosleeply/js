/**/
function mapfish(args){
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
mapfish.prototype.bindEvent=function(obj,events,fn){
	if(obj.addEventListener){
		obj.addEventListener(events,fn,false);
	}else{
		obj.addachEvent('on'+events,fn);
	}
}
/************************************************/
/****************selector start******************/
mapfish.prototype.getId=function(id,parent){
	if(!parent)parent=document;
	var tmpElements=[];
	tmpElements.push(parent.getElementById(id));
	return tmpElements;
}
mapfish.prototype.getClass=function(className,parent){
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
mapfish.prototype.getTag=function(tag,parent){
	if(!parent)parent=document;
	var tags=parent.getElementsByTagName(tag);
	var tmpElements=[];
	for(var i=0;i<tags.length;i++){
		tmpElements.push(tags[i]);
	}
	return tmpElements;
}
mapfish.prototype.find=function(args){
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
mapfish.prototype.getStyle=function(obj,attr){
	if(typeof window.getComputedStyle!='undefined'){/*W3C*/
		return window.getComputedStyle(obj,null)[attr];
	}else if(typeof obj.currentStyle!='undefined'){/*IE*/
		return obj.currentStyle[attr];
	}
}
mapfish.prototype.css=function(attr,value){
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
mapfish.prototype.attr=function(attr,value){
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
mapfish.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML=str;
	}
	return this;
}
mapfish.prototype.top=function(){
	var top=this.elements[0].offsetTop;
	var parent=this.elements[0].offsetParent;
	while(parent!=null){
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return top;
}
mapfish.prototype.left=function(){
	var left=this.elements[0].offsetLeft;
	var parent=this.elements[0].offsetParent;
	while(parent!=null){
		left+=parent.offsetLeft;
		parent=parent.offsetParent;
	}
	return left;
}
mapfish.prototype.width=function(size){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return parseInt(this.elements[i].offsetWidth);
		}
		this.elements[i].style.width=size+'px';
	}
	return this;
}
mapfish.prototype.height=function(size){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return parseInt(this.elements[i].offsetHeight);
		}
		this.elements[i].style.height=size+'px';
	}
	return this;
}
mapfish.prototype.innerWidth=function(){
	return this.elements[0].innerWidth;
}
mapfish.prototype.innerHeight=function(){
	return this.elements[0].innerHeight;
}
mapfish.prototype.scrollTop=function(){
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}
mapfish.prototype.offset=function(){
	return {
		top:this.elements[0].offsetTop,
		left:this.elements[0].offsetLeft,
		width:this.elements[0].offsetWidth,
		height:this.elements[0].offsetHeight
	}
}
mapfish.prototype.scrollHeight=function(){
	return document.body.scrollHeight;
}
mapfish.prototype.scrollLeft=function(){
	return  document.body.scrollLeft;
}
mapfish.prototype.length=function(){
	return this.elements.length;
}
mapfish.prototype.append=function(obj){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].appendChild(obj);
	}
	return this;
}
/*****************selector end******************/
/***********************************************/
/***********************************************/
/*****************events start******************/
mapfish.prototype.on=function(events,fn){
	for(var i=0;i<this.elements.length;i++){
		this.bindEvent(this.elements[i],events,fn);
	}
	return this;
}
mapfish.prototype.click=function(fn){
	this.on('click',fn);

	return this;
}
mapfish.prototype.mouseover=function(fn){
	this.on('mouseover',fn);

	return this;
}
mapfish.prototype.mouseout=function(fn){
	this.on('mouseout',fn);

	return this;
}
mapfish.prototype.resize=function(fn){
	this.bindEvent(window,'resize',fn);

	return this;
}
mapfish.prototype.hover=function(over,out){
	this.on('mouseover',over);
	this.on('mouseout',out);

	return this;
}
/******************events end*******************/
/***********************************************/
/***********************************************/
/*****************function start****************/
mapfish.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block'
	}
	return this;
}
mapfish.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none'
	}
	return this;
}
mapfish.prototype.eq=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
mapfish.prototype.first=function(){
	var element=this.elements[0];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
mapfish.prototype.last=function(){
	var element=this.elements[this.elements.length-1];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
mapfish.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!this.elements[i].className.match(new RegExp('(\\s+|^)'+className+'(\\s+|$)')))
			this.elements[i].className += ' ' + className;
	}
	return this;
}
mapfish.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className.match(new RegExp('(\\s+|^)'+className+'(\\s+|$)')))
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s+|^)'+className+'(\\s+|$)'),'');
	}
	return this;
}
mapfish.prototype.center=function(){
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
mapfish.prototype.remove=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].remove();
	}

	return this;
}
mapfish.prototype.serialize=function(){
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
mapfish.prototype.each=function(fn){
	for(var i=0;i<this.elements.length;i++){
		fn(this.elements[i],i);
	}
	return this;
}
/****************function end*******************/
/***********************************************/
/***********************************************/
/****************plugin end*********************/
mapfish.prototype.getInner=function(){
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
mapfish.prototype.preDef=function(e){
	var e=e||window.event;
	if(typeof e.preventDefault!='undefined'){/*W3C*/
		e.preventDefault();
	}else{/*IE*/
		e.returnValue=false;
	}
}
mapfish.prototype.animate=function(args){
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
mapfish.prototype.drag=function(){
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
mapfish.prototype.dragEx=function(){
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
mapfish.prototype.run=function(speed,interval){/*多元素同时运动待解决，元素碰撞未实现*/
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
mapfish.prototype.fall=function(speed,interval){/*自由落体，待解决*/
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
/*$(this).move({opacity:100})*/
mapfish.prototype.move=function(args, fn){
	var self = this;
	for(var i=0;i<this.elements.length;i++){
		var obj=this.elements[i];
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bBtn = true;
			for(var attr in args){
				var iCur = 0;
				if(attr == 'opacity'){
					if(Math.round(parseFloat(self.getStyle(obj,attr))*100)==0){
						iCur = Math.round(parseFloat(self.getStyle(obj,attr))*100);
					}
					else{
						iCur = Math.round(parseFloat(self.getStyle(obj,attr))*100) || 100;
					}
				}
				else{
					iCur = parseInt(self.getStyle(obj,attr)) || 0;
				}
				var iSpeed = (args[attr] - iCur)/8;
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur!=args[attr]){
					bBtn = false;
				}
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
					obj.style.opacity = (iCur + iSpeed)/100;
				}
				else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
			if(bBtn){
				clearInterval(obj.timer);
				if(fn){
					fn.call(obj);
				}
			}
		},30);
	}

	return self;
}
mapfish.prototype.rotation1=function(){
	var self=this;

	function move(obj,args){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bBtn = true;
			for(var attr in args){
				var iCur = 0;
				if(attr == 'opacity'){
					if(Math.round(parseFloat(self.getStyle(obj,attr))*100)==0){
						iCur = Math.round(parseFloat(self.getStyle(obj,attr))*100);
					}
					else{
						iCur = Math.round(parseFloat(self.getStyle(obj,attr))*100) || 100;
					}
				}
				else{
					iCur = parseInt(self.getStyle(obj,attr)) || 0;
				}
				var iSpeed = (args[attr] - iCur)/8;
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur!=args[attr]){
					bBtn = false;
				}
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
					obj.style.opacity = (iCur + iSpeed)/100;
				}
				else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
			if(bBtn){
				clearInterval(obj.timer);
				if(fn){
					fn.call(obj);
				}
			}
		},30);
	}

	var obj=this.elements[0];
	var oUl = obj.getElementsByTagName('ul')[0];
	var aLiUl = oUl.getElementsByTagName('li');
	var oOl = obj.getElementsByTagName('ol')[0];
	var aLiOl = oOl.getElementsByTagName('li');

	for(var x=0;x<aLiOl.length;x++){
		aLiOl[x].index = x;
		aLiOl[x].onmouseover=function(){
			for(var y=0;y<aLiOl.length;y++){
				aLiOl[y].className = '';
				move(aLiUl[y],{opacity:0});
			}
			this.className = 'active';
			aLiUl[this.index].style.display='block';
			move(aLiUl[this.index],{opacity:100});
		}
	}

	return self;
}
mapfish.prototype.rotation2=function(interval){
	if(!interval) interval=3000;
	var self=this;

	function move(obj,args,fn){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bBtn = true;
			for(var attr in args){
				var iCur = 0;
				iCur = parseInt(self.getStyle(obj,attr)) || 0;
				var iSpeed = (args[attr] - iCur)/8;
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur!=args[attr]){
					bBtn = false;
				}
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			if(bBtn){
				clearInterval(obj.timer);
				if(fn){
					fn.call(obj);
				}
			}
		},30);
	}
	function toRun(obj, aLiOl, aLiUl){
		if(obj.iNow==0){
			aLiUl[0].style.position='static';
			obj.style.top=0;
			obj.iNow2=0;
		}
		if(obj.iNow==aLiOl.length-1){
			obj.iNow=0;
			aLiUl[0].style.position='relative';
			aLiUl[0].style.top=aLiUl.length*aLiUl[0].offsetHeight+'px';
		}else{
			obj.iNow++;
		}
		obj.iNow2++;
		for(var i=0;i<aLiOl.length;i++){
			aLiOl[i].className='';
		}
		aLiOl[obj.iNow].className='active';
		move(obj,{top:-obj.iNow2*oHeight})
	}

	var obj=this.elements[0];
	var oUl = obj.getElementsByTagName('ul')[0];
	var aLiUl = oUl.getElementsByTagName('li');
	var oOl = obj.getElementsByTagName('ol')[0];
	var aLiOl = oOl.getElementsByTagName('li');
	var oHeight = aLiUl[0].offsetHeight;
	oUl.iNow = 0;
	oUl.iNow2 = 0;

	obj.onmouseover=function(){
		clearInterval(oUl.timer1);
	}
	obj.onmouseout=function(){
		oUl.timer1 = setInterval(function(){
			toRun(oUl,aLiOl,aLiUl);
		},interval);
	}

	for(var x=0;x<aLiOl.length;x++){
		aLiOl[x].index = x;
		aLiOl[x].onmouseover=function(){
			for(var y=0;y<aLiOl.length;y++){
				aLiOl[y].className = '';
			}
			this.className = 'active';
			oUl.iNow = this.index;
			oUl.iNow2 = this.index;
			move(oUl,{top:-this.index*oHeight});
		}
	}
	oUl.timer1 = setInterval(function(){
		toRun(oUl,aLiOl,aLiUl);
	},interval);

	return self;
}
mapfish.prototype.rotation3=function(){
	var self=this;

	var obj=this.elements[0];
	var oUl = obj.getElementsByTagName('ul')[0];
	var aLiUl = oUl.getElementsByTagName('li');
	var oOl = obj.getElementsByTagName('ol')[0];
	var aLiOl = oOl.getElementsByTagName('li');
	var oWidth = aLiUl[0].offsetWidth;
	oUl.iNow=0;

	for(var z=1;z<aLiUl.length;z++){
		aLiUl[z].style.left=oWidth+'px';
	}
	for(var x=0;x<aLiOl.length;x++){
		aLiOl[x].index = x;
		aLiOl[x].onmouseover=function(){
			for(var y=0;y<aLiOl.length;y++){
				aLiOl[y].className='';
			}
			this.className='active';
			if(oUl.iNow<this.index){
				aLiUl[this.index].style.left=oWidth+'px';
				move(aLiUl[oUl.iNow],{left:-oWidth});
			}else if(oUl.iNow>this.index){
				aLiUl[this.index].style.left=-oWidth+'px';
				move(aLiUl[oUl.iNow],{left:oWidth});
			}
			move(aLiUl[this.index],{left:0});
			oUl.iNow=this.index;
		}
	}

	function move(obj,args,fn){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bBtn = true;
			for(var attr in args){
				var iCur = 0;
				iCur = parseInt(self.getStyle(obj,attr)) || 0;
				var iSpeed = (args[attr] - iCur)/8;
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur!=args[attr]){
					bBtn = false;
				}
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			if(bBtn){
				clearInterval(obj.timer);
				if(fn){
					fn.call(obj);
				}
			}
		},30);
	}

	return self;
}
mapfish.prototype.rotation4=function(minWidth){
	var self=this;
	var obj=this.elements[0];

	var oUl = obj.getElementsByTagName('ul')[0];
	var aLiUl = oUl.getElementsByTagName('li');

	if(!minWidth) minWidth = 30;
	var oWidth = aLiUl[0].offsetWidth;
	var allMinWidth = (aLiUl.length-1)*minWidth;
	var num=Math.ceil(oWidth/aLiUl.length);

	for(var i=0;i<aLiUl.length;i++){
		aLiUl[i].style.left=num*i+'px';
	}

	for(var i=0;i<aLiUl.length;i++){
		aLiUl[i].index = i;
		aLiUl[i].onmouseover=function(){
			for(var j=0;j<aLiUl.length;j++){
				if(j<=this.index){
					move(aLiUl[j],{left:j*minWidth});
				}else{
					move(aLiUl[j],{left:(oWidth-allMinWidth)+(j-1)*minWidth});
				}
			}
		}
		aLiUl[i].onmouseout=function(){
			for(var x=0;x<aLiUl.length;x++){
				move(aLiUl[x],{left:num*x});
			}
		}
	}

	function move(obj,args,fn){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bBtn = true;
			for(var attr in args){
				var iCur = 0;
				iCur = parseInt(self.getStyle(obj,attr)) || 0;
				var iSpeed = (args[attr] - iCur)/8;
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur!=args[attr]){
					bBtn = false;
				}
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			if(bBtn){
				clearInterval(obj.timer);
				if(fn){
					fn.call(obj);
				}
			}
		},30);
	}

	return self;
}
/****************plugin end*********************/
/***********************************************/
/***********************************************/
/**********trigonometric function start*********/
mapfish.prototype.menu=function(){
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
	return new mapfish(args);
}