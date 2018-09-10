window.onload = function () {
    //checkBox();
    deleteProduct();
}

//删除商品
function deleteProduct() {
    // 获取需要的元素
    var panel = document.getElementsByClassName('panel')[0];
    var panelContent = panel.getElementsByClassName('panel_content')[0];
    var trashes = document.getElementsByClassName('shop_deal_right');
    // 监听点击
    var up;//垃圾篓的盖子
    for (var i = 0; i < trashes.length; i++) {
        (function (index) {
            mjd.tap(trashes[i],function (e) {
                //实现垃圾篓翻盖
                //取到盖子
                up = trashes[index].firstElementChild;
                //给盖子加过渡动画
                up.style.transition = "all .2s ease";
                up.style.webkitTransition = "all .2s ease";
                //实现动画
                up.style.transformOrigin = '0 5px';
                up.style.webkitTransformOrigin = '0 5px';
                up.style.transform = 'rotate(-45deg)';
                up.style.webkitTransform = 'rotate(-45deg)';

                // 弹出面板
                panel.style.display = 'block';
                panelContent.className = 'panel_content jump'
            })
        })(i);
    }

    //取消删除
    /*var cancel = panelContent.getElementsByClassName('cancel')[0];
    mjd.tap(cancel,function () {
        panel.style.display = 'none';
        up.style.transform = 'none';
        up.style.webkitTransform = 'none';
    });*/
}

//复选框处理
function checkBox() {
    var checkBoxs = document.getElementsByClassName('cart_check_box');
    for (var i = 0; i < checkBoxs.length; i++) {
        mjd.tap(checkBoxs[i],function (e) {
             if(e.target.hasAttribute("checked")){
                 e.target.removeAttribute('checked');
             }else{
                 e.target.setAttribute('checked', '');
             }
        });
    }
}

