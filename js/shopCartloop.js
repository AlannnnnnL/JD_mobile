"use strict";//严格模式
new Vue({
    el: "#app",
    data: {
        // 购物车中的数据
        shopListArr: [],
        // 是否全选
        isSelectedAll: false,
        // 所有商品的总价格
        totalPrice: 0,
        // 是否隐藏删除面板
        isHideDelPanel: true,
        // 当前要删除的一个商品
        currentDelShop: {}
    },
    // 组件已经加载完毕, 请求网络数据, 业务处理
    mounted(){
        // 请求本地的数据
        this.getLocalData();
    },
    // 过滤
    filters: {
        // 格式化金钱
        moneyFormat(money){
            return '¥' + money.toFixed(2);
        }
    },
    methods: {
        //请求本地数据
        getLocalData(){
            this.$http.get("data/cart.json").then(response=>{
                const res = response.body;
                if(res){
                    this.shopListArr = res.allShops.shopList;
                }
            },response => {
                alert('请求数据失败!');
            });
        },
        //单个商品加减数量
        singerShopPrice(shop,flag){
            if(flag){
                //加
                shop.shopNumber += 1;
            }else{
                //减
                if(shop.shopNumber <= 1){
                    shop.shopNumber = 1;
                }else{
                    shop.shopNumber -= 1;
                }
            }
        },
        //选中所有商品
        selectedAll(flag){
            // 总控制
            this.isSelectedAll = !flag;
            //遍历所有商品数据
            this.shopListArr.forEach((value,index)=>{
                if(typeof value.checked === "undefined"){
                    this.$set(value,"checked",!flag);
                } else{
                    value.checked = !flag;
                }
            });
            //计算商品总价格
            this.getAllShopPrice();
        },
        getAllShopPrice(){
            let totalPrice = 0;
            //遍历所有商品
            this.shopListArr.forEach((value,index)=>{
                if(value.checked){
                    totalPrice += value.shopPrice * value.shopNumber;
                }
            });
            this.totalPrice = totalPrice;
        },
        //单个商品选中和取消
        singerShopSelected(shop){
            //判断有没有选中
            if(typeof shop.checked === "undefined"){
                this.$set(shop,"checked",true);
            }else{
                shop.checked = !shop.checked;
            }
            // 计算总价
            this.getAllShopPrice();

            // 判断是否全选
            this.hasSelectedAll();
        },
        hasSelectedAll(){
            let flag = true;
            this.shopListArr.forEach((value,index)=>{
                if(!value.checked){
                    flag = false;
                }
            });
            this.isSelectedAll = flag;
        },
        //点击垃圾篓
        clickTrash(shop){
            this.isHideDelPanel = false;
            this.currentDelShop = shop;
        },
        //确认删除
        delShop(){
            this.isHideDelPanel = true;
            const index = this.shopListArr.indexOf(this.currentDelShop);
            this.shopListArr.splice(index,1);
            this.getAllShopPrice();
        }
    }
});