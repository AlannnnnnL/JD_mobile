window.onload = function () {
    changeHeadBgcolor();
    changeBanner();
    secondKill();
};

window.onresize = function () {
    setTimeout(function () {
        window.location.reload();
    },200)
}

//动态设置顶部背景颜色
function changeHeadBgcolor() {
    //获取顶部区域和焦点图
    var headerBox = document.getElementsByClassName('jd_header_box')[0];
    var banner = document.getElementsByClassName('jd_banner')[0];
    //求出焦点图区域高度
    var bannerH = banner.offsetHeight;
    //滚动事件
    window.onscroll = function () {
        //获取滚动距离
        var scrollTop = scroll().top;
        //判断
        var opt = 0;//透明度
        if(scrollTop <= bannerH){
            opt = scrollTop / bannerH * 0.85;
        }else{
            opt = 0.85;
        }
        headerBox.style.background = "rgba(201, 21, 35, "+ opt +")";
    }
}

//秒杀倒计时处理
function secondKill() {
    //获取秒杀标签
    var sencondTime = document.getElementsByClassName('kill_time')[0];
    var spans = sencondTime.getElementsByTagName('span');

    var timer = null, time = 8*60*60;//倒计时时间的秒数
    timer = setInterval(function () {
        time--;//一秒一秒减
        if(timer < 0){
            clearInterval(timer);
        }
        //格式化时间
        var h = Math.floor(time/(60*60));
        var m = Math.floor(time%(60*60) / 60);
        var s = time%60;//time%(60*60) % 60 => time%60
        //设置内容
        spans[0].innerHTML = h>=10 ? Math.floor(h/10): 0;
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = m>=10 ? Math.floor(m/10): 0;
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = s>=10 ? Math.floor(s/10): 0;
        spans[7].innerHTML = s%10;
    },1000);
}

/*首页轮播图*/
function changeBanner() {
    //获取需要的标签
    var banner = document.getElementsByClassName('jd_banner')[0];
    var bannerW = banner.offsetWidth;
    var imageBox = banner.getElementsByTagName('ul')[0]; // 图片的盒子
    var indicatorBox = banner.getElementsByTagName('ol')[0]; // 指示器的盒子
    var allPoints = indicatorBox.getElementsByTagName('li'); // 所有的圆点

    //设置过渡效果
    function addTransition() {
        imageBox.style.transition = "all .2s ease";
        imageBox.style.webkitTransition = 'all .2s ease'; // 兼容手机端老webkit浏览器内核
    }

    //删除过渡效果
    function removeTransition() {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none'; // 兼容手机端老webkit浏览器内核
    }

    //位置改变
    function changeTranslateX(x) {
        imageBox.style.transform = 'translateX(' + x + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + x + 'px)';
    }

    //让盒子动起来
    var index = 1;//全局索引,默认从第二张图开始，因为第一个位置用了一个占位图片
    var timer = null;
    timer = setInterval(scrollImg,1000);
    function scrollImg() {
        index++;
        //设置过渡效果
        addTransition();
        //改变位置
        changeTranslateX(-index * bannerW);
    }

    //当图片过渡结束后,临界值
    /*imageBox.addEventListener("transitionEnd",function () {
        if (index >= 9) {
            index = 1;
        }else if(index <=0 ){//手动滑图会出现这种情况
            index = 8;
        }
        //清除过渡
        removeTransition();
        changeTranslateX(-index * bannerW);
        //改变指示器
        changePoints();
    });
    imageBox.addEventListener("webkitTransitionEnd",function () {
       if (index >= 9) {
            index = 1;
        }else if(index <=0 ){//手动滑图会出现这种情况
            index = 8;
        }
        //清除过渡
        removeTransition();
        changeTranslateX(-index * bannerW);
        //改变指示器
        changePoints();
    });*/
    //封装上面注释的代码(当图片过渡结束后,临界值)：
    mjd.transitionEnd(imageBox, function () {
        if (index >= 9) {
            index = 1;
        }else if(index <=0 ){//手动滑图会出现这种情况
            index = 8;
        }
        //清除过渡
        removeTransition();
        changeTranslateX(-index * bannerW);
        //改变指示器
        changePoints();
    });
    //让点跟着动
    var changePoints = function () {
        //排他
        for (var i = 0; i < allPoints.length; i++) {
            allPoints[i].className = "";
        }
        //处理点对应图片
        var pointIndex = index;
        if(pointIndex >= 9){
            pointIndex = 1
        }else if(pointIndex <= 0){//手动将首图向右滑，点应该跳转到最后一个点
            pointIndex = 8;
        }
        allPoints[pointIndex-1].className = "current";
    }
    //监听手势滑动
    var startX = 0; // 起始触摸水平位置
    var endX = 0;  // 结束触摸水平位置
    var distanceX = 0; // 手指滑动的距离
    //手指碰屏幕时触发
    imageBox.addEventListener("touchstart",function (e) {
        //清除定时器
        clearInterval(timer);
        //获取起始位置
        startX = e.touches[0].clientX;
    });
    //手指在屏幕中滑动时，连续触发
    imageBox.addEventListener("touchmove",function (e) {
        //清除事件默认行为
        e.preventDefault();
        //获取结束位置
        endX = e.touches[0].clientX;
        //获取滑动距离
        distanceX = endX - startX;
        //清除过渡效果,改变位置
        removeTransition();
        changeTranslateX(-index*bannerW + distanceX);
    });
    //手指离开屏幕时，触发
    imageBox.addEventListener("touchend",function () {
        //判断滑动的距离是否超出了1/3  && 必须处于滑动状态
        if(Math.abs(distanceX) > 1/3*bannerW  && endX!=0){
            // 判断
            if (distanceX > 0) {
                index--;
            } else if (distanceX < 0) {
                index++;
            }
        }
        // 添加过渡效果
        addTransition();
        // 改变位置
        changeTranslateX(-index*bannerW);
        // 重新开启定时器
        timer = setInterval(scrollImg, 1000);
        // 清除记录值(滑动结束,下次滑动应该是新的值)
        startX = 0;
        endX = 0;
        distanceX = 0;
    });
}