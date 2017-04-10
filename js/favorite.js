/**
 * Created by Jason on 2017/4/4 0004.
 */

;(function(window){
    // favorite songs
    var favoriteSong,
        playingBtn,
        favoriteListBtn,
        favoriteListModel,
        favoriteAnimation;

    playingBtn = document.getElementsByClassName("play-or-pause")[1];
    favoriteListBtn = document.getElementsByClassName("details")[0];
    favoriteListModel = document.getElementsByClassName("detail-container")[0];

    favoriteSong = {
        title: "",
        singer: "",
        music:null,
        index: 0,
        init:function(){
            var title,
                singer;
            title = document.getElementsByClassName("like-title")[0];
            singer = document.getElementsByClassName("like-desp")[0];
            if (favoriteList.length !== 0) {
                this.title = this.getTitle(this.index);
                this.singer = this.getSinger(this.index);
                title.innerHTML = this.getTitle(this.index);
                singer.innerHTML = this.getSinger(this.index);
                this.initAudio("likes-main",this.getResource(this.index));
                this.music = this.getMusic(); // get the audio after it's prepared
            } else {
                title.innerHTML = "暂无歌曲";
                singer.innerHTML = "";
                this.music = null;
            }
            this.initListModel("likes-player-list");
            this.resetCircleProgress("right-circle","left-circle");
        },
        getFavoriteList:function(){
            return favoriteList;
        },
        getTitle:function(index){
            return this.getFavoriteList()[index].name;
        },
        getSinger:function(index){
            return this.getFavoriteList()[index].singer;
        },
        getResource:function(index){
            return "." + this.getFavoriteList()[index].url;
        },
        getMusic:function(){
            return document.getElementById("audio-like");
        },
        initAudio:function(placeClass,url){
            var place = document.getElementsByClassName(placeClass)[0];
            var audioTemp = document.createElement("audio");
            audioTemp.id = "audio-like";
            var sourceTemp = document.createElement("source");
            sourceTemp.type = "audio/mpeg";
            sourceTemp.src = url;
            audioTemp.appendChild(sourceTemp);
            // clear previous audio element
            var preAudio = document.getElementById("audio-like");
            if (preAudio) {
                place.removeChild(preAudio);
            }
            place.appendChild(audioTemp);
        },
        initListModel:function(placeId){
            var place = document.getElementById(placeId); //normally ul
            var listNumber = document.getElementById("like-header-list").getElementsByTagName("b")[0];
            var listItemLen = favoriteList.length;
            listNumber.innerHTML = listItemLen;
            if (listItemLen === 0) {
                var emptyItem = document.createElement("li");
                emptyItem.innerHTML = "暂无收藏";
                place.appendChild(emptyItem);
            } else if (!place.hasChildNodes()) { // without child nodes <li>
                for(var i = 0; i < listItemLen; i++){
                    (function(i){
                        var listItem = document.createElement("li");
                        var span1 = document.createElement("span");
                        span1.innerHTML = favoriteList[i].name + " - " + favoriteList[i].singer;
                        if (span1.innerHTML.length >24) {
                            span1.innerHTML  = span1.innerHTML.substr(0,23) + "...";
                        }
                        if (i === favoriteSong.index) {
                            listItem.className = "list-current";
                        }
                        var span2 = document.createElement("span");
                        span2.className = "delete-from-list";
                        listItem.appendChild(span1);
                        listItem.appendChild(span2);
                        place.appendChild(listItem);
                    })(i);
                }
                this.clickListModel(); // listening the double click event
                this.enableDeleteClickedMusic(); //listening the delete event
            }
        },
        changeListModel:function(){
            var lists = document.getElementById("likes-player-list").childNodes;
            var listLen = lists.length;
            if (listLen) {
                // clear all previous style
                for (var k = 0; k < listLen; k++) {
                    lists[k].className = "";
                }
                lists[this.index].className = "list-current";
            } else {
                lists[0].className = "";
            }
        },
        clickListModel:function(){
            var lists = document.getElementById("likes-player-list").childNodes;
            var tempLen = lists.length;
            for(var i = 0; i <tempLen;i++){
                (function(curIndex){
                    lists[curIndex].addEventListener("dblclick",function(){
                        favoriteSong.index = curIndex; //change index of favoriteSong
                        favoriteSong.changeListModel();
                        favoriteSong.init();
                        if (playingBtn.className === "play-or-pause playing") {
                            favoriteSong.playMusic();
                            favoriteSong.showCircleProgress("right-circle","left-circle");
                        } else {
                            favoriteSong.pauseMusic();
                        }
                    });
                })(i);
            }
        },
        deleteSingleMusic:function(delIndex,clickedLi){
            var tempIndex = this.index;
            clickedLi.parentNode.parentNode.removeChild(clickedLi.parentNode);
            favoriteList.splice(delIndex,1);
            if (delIndex === favoriteList.length) { //trying to delete current chosen music
                if(delIndex === tempIndex) {
                    this.index = 0;
                }
            } else if (delIndex < tempIndex) {
                this.index = tempIndex - 1;
            }
            if (playingBtn.className === "play-or-pause playing") {
                this.playMusic();
                this.showCircleProgress("right-circle","left-circle");
                console.log("play this music");
            } else {
                this.pauseMusic();
                console.info("don't play the music");
            }
        },
        deleteAllMusics:function(){
            var listParent,
                lists,
                listLen;
            listParent= document.getElementById("likes-player-list");
            lists = listParent.childNodes;
            listLen = lists.length;

            if (!this.music.paused) {
                this.pauseMusic();
                this.music = null; // set the current music to null in case of playing
                playingBtn.className = "play-or-pause pausing";
            }
            favoriteList.splice(0,listLen); // delete favorite list
            for (var i = 0; i < listLen; i++) { // delete ListModel contents
                listParent.removeChild(lists[0]); //always delete the first childNode
            }
        },
        enableDeleteClickedMusic:function(){
            var lists,
                deleteLists,
                deleteAllBtn;
            lists = document.getElementById("likes-player-list");

            deleteAllBtn = document.getElementById("clear-like-list");
            deleteLists = lists.getElementsByClassName("delete-from-list");
            for(var i = 0; i < deleteLists.length; i++){
                (function(curIndex){
                    deleteLists[curIndex].addEventListener("click",function(){
                        console.log("curIndex of the for loop is "+curIndex);
                        favoriteSong.deleteSingleMusic(curIndex,this);
                        favoriteSong.init();
                        favoriteSong.changeListModel();
                    });
                })(i);
            }
            deleteAllBtn.addEventListener("click",function(){
                favoriteSong.deleteAllMusics();
                favoriteSong.init();
            });
        },
        addSingleMusic:function(newFavoriteSong){
            var listParent;
            listParent= document.getElementById("likes-player-list");
            var listItem = document.createElement("li");
            var span1 = document.createElement("span");
            span1.innerHTML = newFavoriteSong.name + " - " + newFavoriteSong.singer;
            var span2 = document.createElement("span");
            span2.className = "delete-from-list";
            listItem.appendChild(span1);
            listItem.appendChild(span2);
            listParent.appendChild(listItem);
            // add this music to favoriteList(global)
            favoriteList.push(newFavoriteSong);
            this.init();
        },
        playMusic:function(){
            if (this.music === null) {
                return;
            }
            this.music.play();
            this.continuouslyPlay();
        },
        continuouslyPlay:function(){      // listening the ended event of current music
            this.music.addEventListener("ended",function(){
                favoriteSong.next(playingBtn.className);
            });
        },
        pauseMusic:function(){
            this.music.pause();
        },
        showCircleProgress:function(rightCircleClass,leftCircleClass){
            var percentage,
                rightCircle,
                leftCircle;
            rightCircle = document.getElementsByClassName(rightCircleClass)[0];
            leftCircle = document.getElementsByClassName(leftCircleClass)[0];
            if (favoriteSong.music) {      //if supports audio element
                // listening timeupdate event of the audio
                favoriteSong.music.addEventListener("timeupdate",function(){
                    // rotate half circle of the chosen element
                    percentage = 180 * favoriteSong.music.currentTime / favoriteSong.music.duration;
                    if (percentage <= 90) {
                        rightCircle.style.transform = "rotate("+ (-135 + percentage * 2) + "deg)";         // standard
                    } else if (percentage > 90) {
                        rightCircle.style.transform = "rotate(45deg)";         // standard
                        leftCircle.style.transform = "rotate("+ (225 + (percentage-90) * 2) + "deg)";         // standard
                    } else { // when change the playing list, music.duration is NaN, special handle
                        rightCircle.style.transform = "rotate(-135deg)";
                    }
                });
            }
        },
        resetCircleProgress:function(rightCircleClass,leftCircleClass){
            var rightCircle,
                leftCircle;
            rightCircle = document.getElementsByClassName(rightCircleClass)[0];
            leftCircle = document.getElementsByClassName(leftCircleClass)[0];
            rightCircle.style.transform = leftCircle.style.transform = "rotate(-135deg)";
        },
        next:function(playingStatus){
            if (this.music === null){
                return;
            }
            this.index += 1;
            if(this.index > favoriteList.length - 1) {
                this.index = 0;
            }
            this.init(); // overriding
            this.changeListModel();
            if (playingStatus === "play-or-pause playing") {
                this.playMusic();
                this.showCircleProgress("right-circle","left-circle");
            } else {
                this.pauseMusic();
            }
        }
    };
    favoriteAnimation = {
        clickedIcon:{
            iconLeft:0,
            iconTop:0,
            iconWidth:0,
            iconHeight:0,
            iconBgSize:0
        },
        getStyle:function(elem, attr) { // get style, not only inline styles
            if(elem.currentStyle) {
                return elem.currentStyle[attr];  //IE
            } else {
                return getComputedStyle(elem,null)[attr];   //FF,Chrome,Safari
            }
        },
        getTop:function(ele){
            var offset = ele.offsetTop;
            if(ele.offsetParent !== null) {
                offset += this.getTop(ele.offsetParent);
            }
            return offset;
        },
        getLeft:function(ele){
            var offset = ele.offsetLeft;
            if(ele.offsetParent !== null) {
                offset += this.getLeft(ele.offsetParent);
            }
            return offset;
        },
        getTarget:function(){
            return document.getElementsByClassName("likes-img")[0];
        },
        getClickedIcon:function(elementClassName,index){
            var clickedItem = document.getElementsByClassName(elementClassName)[index];
            clickedItem.addEventListener("click",function(){
                favoriteAnimation.clickedIcon.iconLeft = favoriteAnimation.getLeft(clickedItem);
                favoriteAnimation.clickedIcon.iconTop = favoriteAnimation.getTop(clickedItem);
                favoriteAnimation.clickedIcon.iconWidth = favoriteAnimation.getStyle(clickedItem,"width");
                favoriteAnimation.clickedIcon.iconHeight = favoriteAnimation.getStyle(clickedItem,"height");
                favoriteAnimation.clickedIcon.iconBgSize = favoriteAnimation.getStyle(clickedItem,"backgroundSize");
                favoriteAnimation.likeIconTravel();
            });
        },
        likeIconTravel:function(){
            var spanItem = document.createElement("span");
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            // basic settings of the new created element
            spanItem.style.display = "block";
            spanItem.style.width = this.clickedIcon.iconWidth + "px";
            spanItem.style.height = this.clickedIcon.iconHeight + "px";
            spanItem.style.position = "absolute";
            spanItem.style.top = (this.clickedIcon.iconTop - scrollTop) + "px";
            spanItem.style.left = this.clickedIcon.iconLeft + "px";
            spanItem.style.borderRadius = "50%";
            spanItem.style.background = "transparent url(./img/icons/like-red.png) center center no-repeat";
            spanItem.style.backgroundSize = favoriteAnimation.clickedIcon.iconBgSize;
            // animation settings of the clicked element
            var cssRuleChanges = document.styleSheets[2].cssRules[150];
            cssRuleChanges.cssRules[0].style.top = spanItem.style.top;
            cssRuleChanges.cssRules[0].style.left = spanItem.style.left;
            cssRuleChanges.cssRules[1].style.top = (this.clickedIcon.iconTop - scrollTop) - 25 +"px"; // skip after clicking
            cssRuleChanges.cssRules[1].style.left = this.clickedIcon.iconLeft - 15 + "px";
            cssRuleChanges.cssRules[3].style.top = this.getTop(this.getTarget()) + 4 + "px"; // margin-top:4px
            cssRuleChanges.cssRules[3].style.left = this.getLeft(this.getTarget()) + "px";
            spanItem.className = "like-animation";
            document.getElementsByTagName("body")[0].appendChild(spanItem);
            setTimeout(function(){ // after animation, delete the travelling element
                document.getElementsByTagName("body")[0].removeChild(spanItem);
            },1200);
        }
    };
    favoriteAnimation.getClickedIcon("album-like",1);
    favoriteAnimation.getClickedIcon("album-like",2);
    favoriteAnimation.getClickedIcon("album-like",3);
    favoriteAnimation.getClickedIcon("like-this",1);
    favoriteSong.init();
    playingBtn.addEventListener("click",function(){
        if (this.className === "play-or-pause pausing") {
            if (favoriteSong.music === null) {
                return;
            }
            this.className = "play-or-pause playing";
            favoriteSong.playMusic();
            favoriteSong.showCircleProgress("right-circle","left-circle");
        } else {
            this.className = "play-or-pause pausing";
            favoriteSong.pauseMusic();
        }
    });
    playingBtn.parentNode.lastChild.addEventListener("click",function(){
        favoriteSong.next(playingBtn.className);
    });
    favoriteListBtn.addEventListener("click",function(){ // show or hide favorite list model
        if (favoriteListModel.className === "detail-container container-hide") {
            favoriteListModel.className = "detail-container container-show";
            // handle the click event
        } else {
            favoriteListModel.className = "detail-container container-hide";
        }
    });
})(window);