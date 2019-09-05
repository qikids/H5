// 获取元素
var getEle = function(selector){
	return document.querySelector(selector);
}
var getAllEle = function(selector){
	return document.querySelectorAll(selector);
}

// 获取元素样式
var getCls = function(element){
	return element.getAttribute('class');
}

// 为元素添加样式
var addCls = function(element, cls){
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) === -1) {
	return element.setAttribute('class', baseCls + ' ' + cls);
	}
}
// 为元素删除样式
var delCls = function(element, cls){
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) > -1) {
	return element.setAttribute('class', baseCls.split(cls).join(" ").replace((/\s+/g)," "));
	}
}

var screenAnimateElements = {
	'.header':['.header'],
	'.screen-1' : [
		'.screen-1__heading',
		'.screen-1__subheading',
	],
	'.screen-2' : [
		'.screen-2__heading',
		'.screen-2__tip',
		'.screen-2__subheading',
		'.screen-2__sc2-1',
		'.screen-2__sc2-2',
	],
	'.screen-3' : [
		'.screen-3__sc3',
		'.screen-3__heading',
		'.screen-3__tip',
		'.screen-3__subheading',
		'.screen-3__subject',
	],
	'.screen-4' : [
		'.screen-4__heading',
		'.screen-4__tip',
		'.screen-4__subheading',
		'.screen-4__type__item_i_1',
		'.screen-4__type__item_i_2',
		'.screen-4__type__item_i_3',
		'.screen-4__type__item_i_4',
	],
	'.screen-5' : [
		'.screen-5__sc5-1',
		'.screen-5__heading',
		'.screen-5__tip',
		'.screen-5__subheading',
	],
}
// 设置屏内元素为初始状态
// var setScreenAnimateInit = function(screencls){
// 	var screen = document.querySelector(screencls);
// 	var animateElements = screenAnimateElements[screencls];  // 设置动画元素

// 	for(var i = 0; i < animateElements.length; i++){
// 		var element = document.querySelector(animateElements[i]);
// 		var baseCls = element.getAttribute('class'); 

// 		element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');	
// 	}
// }
// 设置播放屏内元素的动画
var playScreenAnimateDone = function(screencls){
	var screen = document.querySelector(screencls);
	var animateElements = screenAnimateElements[screencls];  // 设置动画元素

	for(var i = 0; i < animateElements.length; i++){
		var element = document.querySelector(animateElements[i]);
		var baseCls = element.getAttribute('class'); 

		element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));	
	}
}

// window.onload = function(){
// 	for(var k in screenAnimateElements){
// 		if (k === '.screen-1') {
// 			continue;
// 		}
// 		setScreenAnimateInit(k);
// 	}
// }	
// 滚动到哪 , 哪就播放动画
var navItems = getAllEle('.header__nav-item');
var outLineItems = getAllEle('.outline__item');
var tip = getEle('.header__nav__tip');
var switchItem = function(idx){
	for(var i = 0; i < navItems.length; i++){
		delCls(navItems[i], 'header__nav-item_status_active');
		tip.style.left = 0 + 'px';
	}
	addCls(navItems[idx], 'header__nav-item_status_active');
	tip.style.left = idx * 99 + 'px';

 	for(var i = 0; i < outLineItems.length; i++){
 		delCls(outLineItems[i], 'outline__item_status_active');
 	}
 	addCls(outLineItems[idx], 'outline__item_status_active');
}

window.onscroll = function(){
	var top = document.documentElement.scrollTop;
	// 滚动条和大纲的出现
	if (top > 60) {
		addCls(getEle('.header'), 'header_status_back');
		addCls(getEle('.outline'), 'outline_status_in');
	}else{
		delCls(getEle('.header'), 'header_status_back');
		delCls(getEle('.outline'), 'outline_status_in');
		switchItem(0);
	}
	if (top > 1) {
		playScreenAnimateDone('.screen-1');
	}if (top > 1 * 640 - 100) {
		playScreenAnimateDone('.screen-2');
		switchItem(1);
	}if (top > 2 * 640 - 100) {
		playScreenAnimateDone('.screen-3');
		switchItem(2);
	}if (top > 3 * 640 - 100) {
		playScreenAnimateDone('.screen-4');
		switchItem(3);
	}if (top > 4 * 640 - 100) {
		playScreenAnimateDone('.screen-5');
		switchItem(4);
	}
}
// 导航条和大纲定位
var setNavJump = function(i, lib){
	lib[i].onclick = function(){
		document.documentElement.scrollTop = i * 640;
	}
}
for(var i = 0; i < navItems.length; i++){
	setNavJump(i, navItems);
}
for(var i = 0; i < outLineItems.length; i++){
	setNavJump(i, outLineItems);
}
// 滑动门特效
var setTip = function(idx, lib){
	lib[idx].onmouseover = function(){
		tip.style.left = idx * 99 + 'px';
	}
	var currentIdx = 0;
	lib[idx].onmouseout = function(){
		for(var i = 0; i < lib.length; i++){
			if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
				currentIdx = i;
				break;
			}
		}
		tip.style.left = currentIdx * 99 + 'px';
	}
}
for(var i = 0; i < navItems.length; i++){
	setTip(i, navItems);
}
var screenKnowButton = getEle('.screen-know__button');
screenKnowButton.onclick = function(){
		document.documentElement.scrollTop = 0 + 'px';
}

setTimeout(function(){
	playScreenAnimateDone('.screen-1');
	playScreenAnimateDone('.header');
},300)