<template>
    <div>
        <!-- 面包屑导航区域 -->
        <header-nav>
            <span slot="Manage">订单管理</span>
            <span slot="List">订单列表</span>
        </header-nav>
        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索框区域 -->
            <order-search v-bind:parameter="parameter" v-on:getOrderList="getOrderList"></order-search>
            <!-- 获取订单信息列表区域 -->
            <order-list v-bind:orderList="orderList" @getOrderList="getOrderList"></order-list>
            <!-- 分页区域 -->
            <order-paging v-bind:parameter="{parameter,total}" @getOrderList="getOrderList"></order-paging>
        </el-card>
        <!-- 修改地址的对话框 -->
        <order-edit-dialog v-bind:cityData="cityData"></order-edit-dialog>
        <!-- 展示订单进度的对话框 @getOrderList="getOrderList"-->
        <order-progress></order-progress>
    </div>
</template>

<script>
// 引入城市数据
import cityData from "./citydata.js"
// 公共组件
import HeaderNav from "@/components/content/HeaderNav"
// 子组件
import OrderSearch from "@/components/order/OrderSearch"
import OrderList from "@/components/order/OrderList"
import OrderPaging from "@/components/order/OrderPaging"
import OrderEditDialog from "@/components/order/OrderEditDialog"
import OrderProgress from "@/components/order/OrderProgress"
// 获取用户数据列表api commentGetApi
import commentGetApi from "@/api/commentGet.js"

export default {
    name:"User",
    data(){
        return {
            // 传递个用户的参数
            parameter:{
                query:"",
                // 当前页数
                pagenum:1,
                // 当前每页显示多少条数据
                pagesize:10
            },    
            orderList:[],//订单数据列表
            total:0,//获取记录的条数
            cityData:cityData//城市数据
        }
    },
    components:{
        // 公共组件注册
        HeaderNav,
        // 子组件注册
        OrderSearch,
        OrderList,
        OrderPaging,
        OrderEditDialog,
        OrderProgress
    },
    created(){
        this.getOrderList();
    },
    methods:{
        // 获取订单的数据
        getOrderList(){
            commentGetApi.commentGet(`orders`,this.parameter).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("获取订单列表失败!");
                }else{
                    this.orderList = res.data.goods;
                    this.total = res.data.total;
                    return this.$message.success("获取订单列表成功!");
                }
            },(err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>