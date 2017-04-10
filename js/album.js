/**
 * Created by Jason on 2017/4/9 0009.
 */

;(function(window){
    "use strict";
   var albumDetailBtn,
       albumHideBtn,
       albumDetailList,
       albumDetailLen,
       albumObject;
    albumDetailBtn = document.getElementsByClassName("album-add-to-list");
    albumHideBtn = document.getElementsByClassName("list-hide");
    albumDetailList = document.getElementsByClassName("album-list-detail");
    albumDetailLen = albumDetailBtn.length;
    // declare album object
    albumObject = {};
    albumObject.prototype = {
        init:function(){

        },
        favoriteWholeAlbum:function(){

        },
        favoriteSingleMusic:function(){

        },
        deleteSingleMusic:function(){

        }
    };

    /*
     * Check if there is a detail list on show currently
     */
    function checkShowedDetailList(){
        var result;
        for (var i = 0; i < albumDetailLen; i++) {
            (function(curIndex){
                if (albumDetailList[curIndex].className === "album-list-detail album-detail-list-show") {
                    result =  curIndex;
                }
            })(i);
        }
        return result;
    }

    /*
     * when one list panel is clicked, hide another
     */
    function hideUnfoldedList(index){
        if (index === undefined) {
            return;
        }
        albumDetailBtn[index].parentNode.className = "icon-group album-icon-group-show";
        albumDetailList[index].className = "album-list-detail album-detail-list-hide";
        setTimeout(function(){
            albumDetailBtn[index].parentNode.style.left = ""; // clear previous style
            albumDetailList[index].style.left = "260px";
        },1000);

    }

    /*
     * listening each album list panel, showing or hiding
     */
    function toggleDetailList(){
        for (var i = 0; i < albumDetailLen; i++) {
            (function(curIndex){
                albumDetailBtn[i].addEventListener("click",function(){
                    var that = this;
                    if (checkShowedDetailList() !== undefined) {
                        hideUnfoldedList(checkShowedDetailList());
                    }
                    this.parentNode.className = "icon-group album-icon-group-hide";
                    albumDetailList[curIndex].className = "album-list-detail album-detail-list-show";
                    setTimeout(function(){
                        that.parentNode.style.left = "-60px";
                        albumDetailList[curIndex].style.left = 0;
                    },1000);
                    albumHideBtn[curIndex].addEventListener("click",function(){
                        that.parentNode.className = "icon-group album-icon-group-show";
                        albumDetailList[curIndex].className = "album-list-detail album-detail-list-hide";
                        setTimeout(function(){
                            that.parentNode.style.left = ""; // clear previous style
                            albumDetailList[curIndex].style.left = "260px";
                        },1000);
                    });
                });
            })(i);
        }
    }
    // invoke functions
    toggleDetailList();
})(window);
