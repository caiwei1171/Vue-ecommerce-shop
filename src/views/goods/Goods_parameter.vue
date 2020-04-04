<template>
    <div>
        <!-- 面包屑导航区域 -->
        <header-nav>
            <span slot="Manage">商品管理</span>
            <span slot="List">参数列表</span>
        </header-nav>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 头部警告区域 -->
            <!-- closable属性决定是否可关闭，接受boolean，默认为true。show-icon渲染出图标 -->
            <el-alert title="注意：只允许为第三级分类设置相关参数!" type="warning" :closable="false" show-icon></el-alert>
            <!-- 商品分类区 -->
            <parameter-class v-bind:catelist="catelist"></parameter-class>
        </el-card>
        <!-- 添加动态参数静态属性对话框 -->
        <parameter-add-dialog></parameter-add-dialog>
        <!-- 修改参数的对话框 -->
        <parameter-edit-dialog></parameter-edit-dialog>
    </div>
</template>

<script>
// 公共组件
import HeaderNav from "@/components/content/HeaderNav"
// 子组件
import ParameterClass from "@/components/goods/goodsParameter/ParameterClass"
import ParameterAddDialog from "@/components/goods/goodsParameter/ParameterAddDialog"
import ParameterEditDialog from "@/components/goods/goodsParameter/ParameterEditDialog"
// 获取网络请求的api  commentGetApi
import commentGetApi from "@/api/commentGet.js"
export default {
    name:"Goods_parameter",
    components:{
        // 公共组件注册
        HeaderNav,
        // 子组件注册
        ParameterClass,
        ParameterAddDialog,
        ParameterEditDialog
    },
    data(){
        return {
            catelist:[]//保存所有的商品分类列表
        }
    },
    created(){
        // 获取所有商品列表
        this.getCateList();
    },
    methods:{
        getCateList(){
            commentGetApi.commentGet(`categories`).then((res) => {
               if(res.meta.status !== 200){
                   return this.$message.error("获取商品分类失败！");
               }
               this.catelist = res.data;
           },(err) => {
               console.log(err);
           });
        }
    }
}
</script>

<style scoped>

</style>