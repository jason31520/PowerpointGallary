/**
 * Created by Administrator on 2017/3/17 0017.
 */
// 获取navbar
var navBar = document.getElementsByClassName("template-navbar")[0];
// 获取模态窗口
var imgModal = document.getElementById("img-modal-box");
var videoModal = document.getElementById("video-modal-box");
// 获取图片及视频模态框链接
var videoLinks = document.getElementsByClassName("icon-video");
var coverLinks = document.getElementsByClassName("icon-picture");

//获取模态框图片list
var picList = document.getElementById("pic-list");
//获取小圆点
var buttons = document.getElementById("buttons").getElementsByTagName("span");
//获取模态框视频embed
var videoEmbed = videoModal.getElementsByTagName("embed")[0];
// 获取flash对象
var flash = document.getElementById("flash");
// 获取Video加载动画
var videoLoading = document.getElementById("video-loading");


//指定对应模板页数
var picDetailsArrLen01 = 21;
var picDetailsArrLen02 = 9;
var picDetailsArrLen03 = 25;
var picDetailsArrLen04 = 33;
var picDetailsArrLen05 = 27;
var picDetailsArrLen06 = 29;
var picDetailsArrLen07 = 27;
var picDetailsArrLens = [];
picDetailsArrLens.push(picDetailsArrLen01);
picDetailsArrLens.push(picDetailsArrLen02);
picDetailsArrLens.push(picDetailsArrLen03);
picDetailsArrLens.push(picDetailsArrLen04);
picDetailsArrLens.push(picDetailsArrLen05);
picDetailsArrLens.push(picDetailsArrLen06);
picDetailsArrLens.push(picDetailsArrLen07);
picDetailsArrLens.push(picDetailsArrLen01);
picDetailsArrLens.push(picDetailsArrLen02);
picDetailsArrLens.push(picDetailsArrLen03);
picDetailsArrLens.push(picDetailsArrLen04);
picDetailsArrLens.push(picDetailsArrLen05);
picDetailsArrLens.push(picDetailsArrLen06);
picDetailsArrLens.push(picDetailsArrLen07);
picDetailsArrLens.push(picDetailsArrLen01);
picDetailsArrLens.push(picDetailsArrLen02);
picDetailsArrLens.push(picDetailsArrLen03);
picDetailsArrLens.push(picDetailsArrLen04);
picDetailsArrLens.push(picDetailsArrLen05);
picDetailsArrLens.push(picDetailsArrLen06);
picDetailsArrLens.push(picDetailsArrLen07);
picDetailsArrLens.push(picDetailsArrLen01);
picDetailsArrLens.push(picDetailsArrLen02);
picDetailsArrLens.push(picDetailsArrLen03);
picDetailsArrLens.push(picDetailsArrLen04);
picDetailsArrLens.push(picDetailsArrLen05);
picDetailsArrLens.push(picDetailsArrLen06);
picDetailsArrLens.push(picDetailsArrLen07);

//视频链接
var videoLinkAddress01 = "";
var videoLinkAddress02 = "http://cloud.video.taobao.com/play/u/1685392654/p/1/e/1/t/1/38535562.swf";
var videoLinkAddress03 = "http://cloud.video.taobao.com//play/u/1685392654/p/2/e/1/t/1/48538614.swf";
var videoLinkAddress04 = "http://cloud.video.taobao.com/play/u/1685392654/p/1/e/1/t/1/45295828.swf";
var videoLinkAddress05 = "http://cloud.video.taobao.com//play/u/1685392654/p/2/e/1/t/1/48396894.swf";
var videoLinkAddress06 = "http://cloud.video.taobao.com//play/u/1685392654/p/2/e/1/t/1/48788003.swf";
var videoLinkAddress07 = "http://cloud.video.taobao.com//play/u/1685392654/p/2/e/1/t/1/53947927.swf";
var videoLinkAddress = [];
videoLinkAddress.push(videoLinkAddress01);
videoLinkAddress.push(videoLinkAddress02);
videoLinkAddress.push(videoLinkAddress03);
videoLinkAddress.push(videoLinkAddress04);
videoLinkAddress.push(videoLinkAddress05);
videoLinkAddress.push(videoLinkAddress06);
videoLinkAddress.push(videoLinkAddress07);
videoLinkAddress.push(videoLinkAddress01);
videoLinkAddress.push(videoLinkAddress02);
videoLinkAddress.push(videoLinkAddress03);
videoLinkAddress.push(videoLinkAddress04);
videoLinkAddress.push(videoLinkAddress05);
videoLinkAddress.push(videoLinkAddress06);
videoLinkAddress.push(videoLinkAddress07);
videoLinkAddress.push(videoLinkAddress01);
videoLinkAddress.push(videoLinkAddress02);
videoLinkAddress.push(videoLinkAddress03);
videoLinkAddress.push(videoLinkAddress04);
videoLinkAddress.push(videoLinkAddress05);
videoLinkAddress.push(videoLinkAddress06);
videoLinkAddress.push(videoLinkAddress07);
videoLinkAddress.push(videoLinkAddress01);
videoLinkAddress.push(videoLinkAddress02);
videoLinkAddress.push(videoLinkAddress03);
videoLinkAddress.push(videoLinkAddress04);
videoLinkAddress.push(videoLinkAddress05);
videoLinkAddress.push(videoLinkAddress06);
videoLinkAddress.push(videoLinkAddress07);
//定时器
var timer;

/*
* 显示图片模态框
*/
function showPicModal(){
    for (var i = 0, len = coverLinks.length; i < len; i++) {
        (function(i){
            coverLinks[i].onclick = function(){
                //先删除历史图片列表
                var modalImgs;
                if (modalImgs = picList.getElementsByTagName("img")){
                    var delLen = modalImgs.length;
                    for(var j = 0; j < delLen; j++){
                        modalImgs[0].parentNode.removeChild(modalImgs[0]);
                    }
                }
                //添加新图片列表
                for (var k = 0; k < picDetailsArrLens[i]; k++){
                    (function(k){
                        var imgItem = document.createElement("img");
                        var directory = (i + 1)/10 < 1?"0" + (i + 1):i + 1; //闭包内获取模态框要显示的图片的目录
                        imgItem.src = "./img/js-template" + directory + "/js-template" + directory + "-" + (k + 1) + ".jpg";
                        imgItem.alt = (k + 1);
                        picList.appendChild(imgItem);
                    })(k);
                }
                imgModal.style.display = "block";
                //开启模态框图片轮播
                buttonInitial();
                modalPicChange();

            }
        })(i);
    }
}

/*
* 显示视频模态框
*/
function showVideoModal(){
    for (var i = 0, lens = videoLinks.length; i < lens; i++) {
        (function(i){
            videoLinks[i].onclick = function(){
                if(videoLinkAddress[i] ==""){
                    alert("没有视频！");
                    return;
                }
                videoModal.style.display = "block";
                videoEmbed.src = videoLinkAddress[i];
                var checkInterval = setInterval(function(){
                    if (checkFlashLoaded(flash)) {
                        videoLoading.style.display = "none";
                        clearInterval(checkInterval);
                        checkInterval = null;
                    }
                },50);
             }
        })(i);
    }
}

/*
 * 模态框图片轮播
 */
function modalPicChange(){
    //获取左右箭头及图片列表
    var list = document.getElementById("pic-list");
    var imgItems = list.getElementsByTagName("img");
    var imgLen = imgItems.length;
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");

    //获取轮播容器
    var container = document.getElementById("img-container");

    /*
     *  图片轮播动画
     */
    function animate(direction){
        if (direction == "pre"){
            imgItems[0].parentNode.insertBefore(imgItems[imgLen-1],imgItems[0]);
        }else if (direction == "next"){
            imgItems[imgLen-1].parentNode.appendChild(imgItems[0]);
        }
        var imgIndex = imgItems[0].alt;
        if(imgIndex == imgLen){  //进入图片模态框后直接点击prev反向初始化
            buttonReverseInitial(imgIndex);
        }
        buttonsChange(imgIndex);
    }

    /*
     * 图片自动切换
     */
    function autoPlay(){
        timer = setInterval(function(){
            next.onclick()
        },1500);
    }
    function stop(){
        clearInterval(timer);
    }
    /*
     * 圆点切换功能
     * 传入数字或数字字符串
     */
    function buttonsChange(imgIndex) {
        imgIndex = (typeof imgIndex == "number")?imgIndex:parseInt(imgIndex);
        if(imgIndex == 1){  // first picture showing
            buttonInitial();
            clearPrevClass();
            buttons[1].className = "on";
        }else if(imgIndex == imgLen){ // last picture showing
            clearPrevClass();
            buttons[3].className = "on";
        }else {
            clearPrevClass();
            buttons[2].className = "on";
        }
        if(imgIndex > 2 && imgIndex < imgLen){
            buttons[1].innerHTML = imgIndex-1;
            buttons[2].innerHTML = imgIndex;
            buttons[3].innerHTML = imgIndex+1;
        }
    }
    autoPlay();
    //点击左箭头
    prev.onclick = function() {
        animate("pre");
    };
    //点击右箭
    next.onclick = function() {
        animate("next");
    };
    //鼠标悬停清除定时器
    container.onmouseover = stop;
    container.onmouseout = autoPlay;
}

/*
 * 小圆点数值初始化
 */
function buttonInitial(){
    buttons[1].innerHTML = 1;
    buttons[2].innerHTML = 2;
    buttons[3].innerHTML = 3;
    clearPrevClass();
    buttons[1].className = "on";
}
function buttonReverseInitial(imgIndex){
    buttons[1].innerHTML = imgIndex - 2;
    buttons[2].innerHTML = imgIndex - 1;
    buttons[3].innerHTML = imgIndex;
}

/*
 * 清除之前的圆点样式
 */
function clearPrevClass(){
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].className == "on") {
            buttons[i].className = "";
        }
    }
}

/*
 * 判断flash是否加载完全
 */
function checkFlashLoaded(flash){
    return Math.ceil(flash.PercentLoaded()) == 100;
}

// 获取 <span> 元素，设置关闭模态框按钮
var closeBtn = document.getElementsByClassName("close-btn");
var closeBtn01 = closeBtn[0];
var closeBtn02 = closeBtn[1];

// 点击 <span> 元素上的 (x), 关闭模态框
closeBtn01.onclick = function() {
    if (imgModal.style.display == "block"){
        imgModal.style.display = "none";
        clearInterval(timer);
    }
};
closeBtn02.onclick = function() {
    if (videoModal.style.display == "block"){
        videoModal.style.display = "none";
    }
};
showPicModal();
showVideoModal();