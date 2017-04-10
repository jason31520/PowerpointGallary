/**
 * Created by Jason on 2017/3/28.
 */
;(function(window){
    "use strict";
    var doc = document.body || document.documentElement;
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    // 获取返回顶部按钮
    var toTop = document.getElementById("scroll-top");

    /*
     * 页面滚动
     */
    function scrolling(){
        return scrollTop;
    }

    /*
     * 单击按钮，返回页面顶部
     */
    toTop.onclick = function(){
        this.topTimer = setInterval(function(){
            doc.scrollTop -=Math.ceil(scrolling()*0.1);
            if (doc.scrollTop <= 0) {
                clearInterval(toTop.topTimer);
            }
        },20);
    };
    window.onscroll = function(){
        var sp = doc.scrollTop;
        // Window向下滚动100px后显示置顶按钮
        if(sp > 100) {
            toTop.className = null;
        } else {
            toTop.className = "scroll-top-hide";
        }
    };
})(window);