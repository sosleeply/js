define(function(require,exports){
	var aArr=document.getElementByTagName('a');
	var divArr=document.getElementByTagName('div');

	require('show.js').show(aArr,divArr);
	require('hide.js').hide(aArr,divArr);
})
