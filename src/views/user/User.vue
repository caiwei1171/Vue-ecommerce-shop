<template>
    <div>
        <!-- 面包屑导航区域 -->
        <header-nav>
            <span slot="Manage">用户管理</span>
            <span slot="List">用户列表</span>
        </header-nav>
        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索框区域，以及添加按钮 -->
            <user-search v-bind:parameter="parameter" v-on:getUserList="getUserList"></user-search>
            <!-- 获取用户信息列表区域 -->
            <user-list v-bind:userList="userList" @getUserList="getUserList"></user-list>
            <!-- 分页区域 -->
            <user-paging v-bind:parameter="{parameter,total}" @getUserList="getUserList"></user-paging>
        </el-card>
        <!-- 添加用户的对话框 -->
        <user-dialog @getUserList="getUserList"></user-dialog>
        <!-- 修改用户的对话框 -->
        <user-edit-dialog @getUserList="getUserList"></user-edit-dialog>
        <!-- 分配角色的对话框 -->
        <user-distribution @getUserList="getUserList"></user-distribution>
    </div>
</template>

<script>
// 公共组件
import HeaderNav from "@/components/content/HeaderNav"
// 子组件
import UserSearch from "@/components/user/UserSearch"
import UserList from "@/components/user/UserList"
import UserPaging from "@/components/user/UserPaging"
import UserDialog from "@/components/user/UserDialog"
import UserEditDialog from "@/components/user/UserEditDialog"
import UserDistribution from "@/components/user/UserDistribution"
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
                pagesize:2
            },    
            userList:[],//用户数据列表
            total:0,//获取记录的条数
        }
    },
    components:{
        // 公共组件注册
        HeaderNav,
        // 子组件注册
        UserSearch,
        UserList,
        UserPaging,
        UserDialog,
        UserEditDialog,
        UserDistribution
    },
    created(){
        this.getUserList();
    },
    methods:{
        // 获取用户传递过来的数据
        getUserList(){
            commentGetApi.commentGet(`users`,this.parameter).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("获取用户列表失败!");
                }else{
                    this.userList = res.data.users;
                    this.total = res.data.total;
                    return this.$message.success("获取用户列表成功!");
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