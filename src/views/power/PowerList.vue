<template>
    <div>
        <!-- 面包屑导航区域 -->
        <header-nav>
            <span slot="Manage">权限管理</span>
            <span slot="List">权限列表</span>
        </header-nav>
        <!-- 卡片视图 -->
        <el-card>
            <power-list-data v-bind:powerList="powerList"></power-list-data>
        </el-card>
    </div>
</template>

<script>
// 公共组件
import HeaderNav from "@/components/content/HeaderNav"
// 子组件
import PowerListData from "@/components/power/PowerListData"
// 获取网络请求的api  commentGetApi
import commentGetApi from "@/api/commentGet.js"
export default {
    name:"PowerList",
    components:{
        // 公共组件注册
        HeaderNav,
        // 子组件注册
        PowerListData
    },
    data(){
        return {
            powerList:[],//权限列表
        }
    },
    created(){
        this.getPowerList();
    },
    methods:{
        getPowerList(){
            commentGetApi.commentGet(`rights/list`).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("获取权限列表失败!");
                }
                this.powerList = res.data;
                this.$message.success("获取权限列表成功!");
            },(err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>