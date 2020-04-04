<template>
    <div>
        <!-- 面包屑导航区域 -->
        <header-nav>
            <span slot="Manage">商品管理</span>
            <span slot="List">商品分类</span>
        </header-nav>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 按钮区域 -->
            <goods-button></goods-button>
            <!-- 表格区域 -->
            <!-- data 数据源 -->
            <goods-table v-bind:catelist="catelist" @getGoodsClass="getGoodsClass"></goods-table>
            <!-- 分页区域 -->
            <goods-paging v-bind:parameter="{queryInfo,total}" @getGoodsClass="getGoodsClass"></goods-paging>
        </el-card>
        <!-- 添加商品分类的对话框 -->
        <goods-add-dialog @getGoodsClass="getGoodsClass"></goods-add-dialog>
        <!-- 修改分类对话框 -->
        <good-edit-dialog @getGoodsClass="getGoodsClass"></good-edit-dialog>
    </div>
</template>

<script>
// 公共组件
import HeaderNav from "@/components/content/HeaderNav"
// 子组件
import GoodsTable from "@/components/goods/goodsClass/GoodsTable"
import GoodsPaging from "@/components/goods/goodsClass/GoodsPaging"
import GoodsAddDialog from "@/components/goods/goodsClass/GoodsAddDialog"
import GoodsButton from "@/components/goods/goodsClass/GoodsButton"
import GoodEditDialog from "@/components/goods/goodsClass/GoodEditDialog"
// 获取网络请求的api  commentGetApi
import commentGetApi from "@/api/commentGet.js"
export default {
    name:"Goods_class",
    data(){
        return {
            catelist:[],//商品分类的数据列表,默认为空
            total:0,//总的记录条数
            queryInfo:{//查询条件
                type:3,//显示分3层列表
                pagenum:1,//当前页码值 
                pagesize:5//每页显示多少条数据
            }
        }
    },
    components:{
        // 公共组件注册
        HeaderNav,
        // 子组件注册
        GoodsTable,
        GoodsPaging,
        GoodsAddDialog,
        GoodsButton,
        GoodEditDialog
    },
    created(){
        this.getGoodsClass();
    },
    methods:{
        // 获取商品分类列表
        getGoodsClass(){
            commentGetApi.commentGet("categories",this.queryInfo).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("获取商品分类失败！");
                }
                // 把数据列表赋值给 catelist,总记录条数赋值给 total
                this.catelist = res.data.result;
                this.total = res.data.total;
                this.$message.success("获取商品分类成功！");
            },(err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style>

</style>