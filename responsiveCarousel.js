data = [
	["./img/1_BigImage.jpg", "./img/1_SmallImage.jpg"],
	["./img/2_BigImage.jpg", "./img/2_SmallImage.jpg"],
	["./img/3_BigImage.jpg", "./img/3_SmallImage.jpg"],
	["./img/4_BigImage.jpg", "./img/4_SmallImage.jpg"],
	["./img/5_BigImage.jpg", "./img/5_SmallImage.jpg"],
	["./img/6_BigImage.jpg", "./img/6_SmallImage.jpg"],
	["./img/7_BigImage.jpg", "./img/7_SmallImage.jpg"],
	["./img/8_BigImage.jpg", "./img/8_SmallImage.jpg"],
];


var showNumber = 0;//当前显示图片的序列数
var groupNumber = 1;//当前显示图片组
var groupSize = 6;//每一组显示图片的数量

showThumb = function (group) {//显示当前图片组
	var ul = $("#smallPhotosList");//获取页面显示图片组的ul元素
	ul.html("");//清空ul元素内容
	var start = (group - 1) * groupSize;//计算图片组的第一张图片的序列数=（图片组数-1）*显示图片的数量，如第2组的第一张图的序列数=（2-1）*6 = 6【第七张图】
	var end = group * groupSize - 1;//计算图片组的最后一张图片的序列数=图片组数*显示图片的数量-1，如第1组的最后一张图片的序列数=1*6-1=5
	for(var i = start; (i<=end && i<data.length); i++){//循环开始到结束的图片的序列数
		var $li = $("<li></li>");//声明一个参数赋予html中新建的li元素
		$li.addClass('smallPhotos');
		//添加图片
		$img = $("<img>");
		$img.attr({
			"src": data[i][1],
			"data": i
		});
		(function(i){
			$img.click(function(e){
				showNumber = i;
				showBig();
			});
		})(i)
		$li.append($img);
		
		ul.append($li);
	}
};

xscarousel = function () {
	var ol = $("#xsIndicators");
	ol.html("");
	for(var i = 0; i < data.length; i++) {
		var $li = $("<li></li>");
		$li.attr({
			"xsdata": i,
			"class": ""
		});
		
		(function(i){
			$li.click(function(e){
				showNumber = i;
				if(parseInt((i + 6) / groupSize + 1) > groupNumber) {
					groupNumber = parseInt((i + 6) / groupSize + 1);
					showThumb(groupNumber);
				}
				showBig();
			});
		})(i)
		ol.append($li);

	}
};


showBig = function(){
	$("#bigPhotoSrc").attr({
		"src": data[showNumber][0]
	});
	var li = $("#xsIndicators").children('li');
	console.log(li.length);
};
	

init = function() {
	showThumb(1);
	showBig();
	xscarousel();
	$("#bNext").click(function(){
		nextPhoto();
	});
	$("#bPrve").click(function(){
		prvePhoto();
	});
	$("#sNext").click(function(){
		nextThumb();
	});
	$("#sPrve").click(function(){
		prveThumb();
	});

};

nextThumb = function(){
	if((groupNumber * groupSize) + 1 <= data.length){
		showThumb(groupNumber + 1);
		showNumber = groupNumber * groupSize;
		groupNumber++;
	} else {
		showNumber = 0;
		groupNumber = 1;
		showThumb(groupNumber);
	}
	showBig();
};
	
prveThumb = function(){
	if(groupNumber - 1 > 0){
		showThumb(groupNumber-1);
		groupNumber--;
		showNumber = groupNumber * 6 - 1;
		
	} else {
		groupNumber = parseInt(data.length / groupSize) + 1;
		showThumb(groupNumber);
		showNumber = data.length - 1;
	}
	showBig();
};
	
nextPhoto = function(){
	if(showNumber % groupSize == (groupSize - 1)) {
		nextThumb();
	} else if(showNumber < data.length - 1){
		showNumber++;
		showBig();
	} else {
		nextThumb();
	}
};
	
prvePhoto = function(){
	if(showNumber == (groupNumber - 1) * groupSize){
		prveThumb();
	}else if(showNumber > 0){
		showNumber--;
		showBig();
	}
};


init();
