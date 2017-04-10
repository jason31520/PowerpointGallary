/**
 * Created by Jason on 2017/3/29 0029.
 */

;(function(window){
    "use strict";
    // variable declare
    var musicSources,
        pauseButtons,
        playButtons,
        playProgress,
        playList,
        playListDelIcon,
        playerPlayOrPauseBtn,
        favoritePlayOrPauseBtn,
        pauseLen,
        playLen,
        musics,
        musicLen,
        listLen,
        favoriteBar,
        favoriteList, // list of favorite songs
        favoriteSong, // current selected favorite song
        favoriteBarLockSetting;

    /*
     * show playing progress
     */
    function showPlayProgress(audio,progressBar){
        progressBar.parentNode.setAttribute("style","width:250px");
        if (!isNaN(audio.duration)) {
            var progressValue = audio.currentTime / audio.duration * 250;
            progressBar.style.width = parseInt(progressValue) + "px";
        }
    }

    /*
     * Test if browser support FileReader object
     * return true if supports
     */
    function isFileReaderSupported(){
        return typeof FileReader !== "undefined";
    }

    /*
     * Player decoration,using canvas
     */
    function readyPlayerDecoration(){
        var playerDecoration = document.getElementById("player-decoration");
        var cxt = playerDecoration.getContext("2d");
        cxt.beginPath();
        cxt.arc(100,100,80,0,360);
        cxt.moveTo(175,100);
        cxt.arc(100,100,75,0,360);
        cxt.moveTo(170,100);
        cxt.arc(100,100,70,0,360);
        cxt.stroke();
        cxt.closePath();
    }

    /*
     * music upload
     */
    function musicUpload(file){
        var fileUpload,
            uploadLen;
        // test FileReader supports
        if (!isFileReaderSupported()) {
            alert("您的浏览器不支持FileReader对象");
        }
        fileUpload = document.getElementById("file-upload");
        uploadLen = file.length;
        for (var i = 0; i < uploadLen; i++) {
            var tempFile = file[i];
            var reader = new FileReader();
            reader.readAsBinaryString(tempFile);
            reader.onload = function(e){
                
            };
        }
    }

    musicSources = document.getElementsByTagName("audio");
    pauseButtons = document.getElementsByClassName("pause");
    playButtons = document.getElementsByClassName("play");
    playProgress = document.getElementsByClassName("play-progress");
    musics = document.getElementsByClassName("music");
    playList = document.getElementById("song-player-list").getElementsByTagName("li");
    playListDelIcon = document.getElementsByClassName("delete-from-list");
    playerPlayOrPauseBtn = document.getElementsByClassName("play-or-pause")[0];
    favoritePlayOrPauseBtn = document.getElementsByClassName("play-or-pause")[1];
    favoriteBarLockSetting = document.getElementsByClassName("lock-setting")[0];
    favoriteBar = document.getElementById("likes");
    pauseLen = pauseButtons.length;
    playLen = playButtons.length;
    musicLen = musics.length;
    listLen = playList.length;

    for(var i = 0; i < pauseLen; i++){
        // play the clicked music
        (function(curIndex){
            pauseButtons[curIndex].onclick = function(){
                var curAudio = musicSources[curIndex];
                curAudio.play();
                this.style.display = "none";
                playButtons[curIndex].style.display = "block";

                // show playing progress
                curAudio.addEventListener("timeupdate",function(){
                    showPlayProgress(curAudio,playProgress[curIndex]);
                },false);
            };
        })(i);
    }
    for(var j = 0; j < playLen; j++){
        // pause the clicked music
        (function(curIndex){
            playButtons[curIndex].onclick = function(){
                musicSources[curIndex].pause();
                this.style.display = "none";
                pauseButtons[curIndex].style.display = "block";
            };
        })(j);
    }
    for(var k = 0; k < listLen; k++){
        // change selected song style
        (function(curIndex){
            playList[curIndex].ondblclick = function(){
                // clear all classes first of all
                for(var n = 0; n <listLen; n ++){
                    playList[n].className = "";
                }
                this.className = "list-current";
            };
        })(k);
    }
    readyPlayerDecoration();
    favoriteBarLockSetting.onclick =function(){
        // favorite bar lock settings
        if (this.className === "lock-setting unlocked") {
            // fixed the favorite bar
            this.className = "lock-setting locked";
            favoriteBar.className = "like-bar-fixed-setting fixed";
        } else {
            this.className = "lock-setting unlocked";
            favoriteBar.className = "like-bar-fixed-setting unfixed";
        }
    };
    window.onload = function(){
        for(var i = 0; i < musicLen; i++){
            (function(index){
                var newClassName = (index + 1) % 3 === 0 ? "col-xs-12 music music-right " + "load-rotate" : "col-xs-12 music " + "load-rotate";
                setTimeout(function(){
                    musics[index].className = newClassName;
                },400);
            })(i);

        }
    };
})(window);