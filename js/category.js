window.onload = function () {
    leftCategory();
}
//左侧列表处理
function leftCategory() {
    //拿到相应的标签
    var parentDom = document.getElementsByClassName('category_main_left')[0];
    var childDom = parentDom.getElementsByClassName('category_main_left_con')[0];

    //求出父标签和子标签的高度
    var parentH = parentDom.offsetHeight;
    var childH = childDom.offsetHeight;

    //确定合理滚动区间
    var maxY = 0;//最大滚动区间
    var minY = -(childH-parentH);//最小滚动区间
    //确定合理的缓冲区间
    var buffer = 150;

    //设置过渡 清除过渡  改变位置
    var addTransition = function () {
        childDom.style.transition = 'all .2s ease';
        childDom.style.webkitTransition = 'all .2s ease';
    }

    var removeTransition = function () {
        childDom.style.transition = 'none';
        childDom.style.webkitTransition = 'none';
    }

    var changeTranslateY = function (y) {
        childDom.style.transform = 'translateY('+ y +'px)';
        childDom.style.webkitTransform = 'translateY('+ y +'px)';
    }
    //滑动起来
    var startY = 0,endY = 0,moveY = 0;
    var currentY = 0;//时刻记录当前的y值
    //开始触摸
    childDom.addEventListener("touchstart",function (e) {
        startY = e.touches[0].clientY;
    });
    //触摸移动
    childDom.addEventListener("touchmove",function (e) {
        //不断获取触摸的结束位置
        endY =  e.touches[0].clientY;
        //计算移动距离
        moveY = startY - endY;

        //移动起来
        // 确定合理的滚动区间
        if((currentY-moveY)<(maxY + buffer) && (currentY-moveY) > (minY-buffer)){
            removeTransition();
            changeTranslateY(currentY - moveY);
        }
    });
    //结束触摸
    childDom.addEventListener('touchend', function (e) {
        // 结合缓冲判断是否在合理滚动区间
        // 向下滚动
        if((currentY-moveY) > maxY){
            currentY = maxY;
            // 添加过渡,改变位置
            addTransition();
            changeTranslateY(currentY);
        }else if((currentY-moveY) < minY){
            currentY = minY;
            // 添加过渡,改变位置
            addTransition();
            changeTranslateY(currentY);
        }else { // 正常情况
            currentY = currentY - moveY;
        }
        // 清零
        startY = 0;
        endY = 0;
        moveY = 0;
    });
    //监听tab事件
    var liList = childDom.getElementsByTagName('li');
    mjd.tap(childDom, function (e) {
        // 7.1 让所有的li标签的className清除
        for(var i=0; i<liList.length; i++){
            liList[i].className = '';
            // 去除对应的索引
            liList[i].index = i;
        }

        // 7.2 让当前的被选中
        var li = e.target.parentNode;
        li.className = 'current';

        // 7.3 求出滚动的距离
        var distanceY = - (li.index * 50);

        // 7.4 让childDom在合理的区域滚动
        if(distanceY > minY){
            addTransition();
            changeTranslateY(distanceY);
            currentY = distanceY;
        }else {
            changeTranslateY(minY);
            currentY = minY;
        }

        // 7.5 模拟数据的加载
        var rightDom = document.getElementsByClassName('category_main_right')[0];
        rightDom.style.transition = 'all .3s ease';
        rightDom.style.webkitTransition = 'all .3s ease';
        rightDom.style.opacity = 0;
        setTimeout(function () {
            rightDom.style.opacity = 1;
        }, 300);
    });
}