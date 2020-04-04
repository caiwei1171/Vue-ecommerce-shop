<template>
    <div>
        <!-- 面包屑导航区域 -->
        <header-nav>
            <span slot="Manage">商品管理</span>
            <span slot="List">参数列表</span>
        </header-nav>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索框区域 -->
            <goods-list-search v-bind:parameter="parameter" v-on:getGoodsList="getGoodsList"></goods-list-search>
            <!-- 表格数据区域 -->
            <goods-list v-bind:goodsList="goodsList" v-on:getGoodsList="getGoodsList"></goods-list>
            <!-- 分页区域 -->
            <goods-list-paging v-bind:parameter="{parameter,total}" v-on:getGoodsList="getGoodsList"></goods-list-paging>
        </el-card>
         <!-- 修改商品信息对话框 -->
        <goods-edit-dialog v-on:getGoodsList="getGoodsList"></goods-edit-dialog>
    </div>
</template>

<script>
// 公共组件
import HeaderNav from "@/components/content/HeaderNav"
// 子组件
import GoodsListSearch from "@/components/goods/goodsList/GoodsListSearch"
import GoodsList from "@/components/goods/goodsList/GoodsList"
import GoodsListPaging from "@/components/goods/goodsList/GoodsListPaging"
import GoodsEditDialog from "@/components/goods/goodsList/GoodsEditDialog"
// 获取商品数据列表api commentGetApi
import commentGetApi from "@/api/commentGet.js"
export default {
    name:"Goods_list",
    components:{
        // 公共组件
        HeaderNav,
        // 子组件
        GoodsListSearch,
        GoodsList,
        GoodsListPaging,
        GoodsEditDialog,
    },
    data(){
        return {
            // 传递个的参数
            parameter:{
                // 查询关键字
                query:"",
                // 当前页数
                pagenum:1,
                // 当前每页显示多少条数据
                pagesize:10
            },    
            goodsList:[],//商品数据列表
            total:0,//获取记录的条数
        }        
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        // 获取用户传递过来的数据
        getGoodsList(){
            commentGetApi.commentGet(`goods`,this.parameter).then((res) => {
                    if(res.meta.status !== 200){
                        return this.$message.error("获取商品列表失败!");
                    }else{
                        this.goodsList = res.data.goods;
                        this.total = res.data.total;
                        return this.$message.success("获取商品列表成功!");
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