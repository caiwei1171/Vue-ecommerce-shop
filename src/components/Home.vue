<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="@/assets/img/Header.jpg" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 主体区域 -->
        <el-container>
            <!-- 侧边栏区域 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!-- 实现菜单栏的折叠 -->
                <div class="toggole-button" @click="toggle">|||</div>
                <!-- 侧边栏菜单区域 
                    unique-opened始终只能打开一个菜单 
                    collapse实现菜单的折叠默认false不折叠 
                    collapse-transition是否开启折叠效果动画默认true开启 
                    default-active 当前激活菜单的 index
                -->
                <!-- router属性：然侧边栏变为路由的形式 -->
                <el-menu 
                    background-color="#333744" 
                    text-color="#fff" 
                    active-text-color="#409fff" 
                    unique-opened 
                    :collapse="isCollapse" 
                    :collapse-transition="false"
                    router
                    :default-active="sonPath"
                    >
                    <!-- 一级菜单区域 -->
                    <el-submenu :index="item.id + ''" v-for="(item) in leftNav" :key="item.id">
                        <!-- 一级菜单的模版区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item 
                            :index="'/' + item.path" 
                            v-for="(item) in item.children" 
                            :key="item.id"
                            @click="saveMenuPath('/' + item.path)">
                            <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-menu"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>
                        </el-menu-item>
                    </el-submenu>    
                </el-menu>
            </el-aside>
            <!-- 右侧内容区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 获取左侧菜单栏网络请求数据
import commentGetApi from "@/api/commentGet.js"
export default {
    name:"Home",
    data(){
        return {
            // 左侧菜单导航
            leftNav:[],
            // 左侧菜单图标
            iconObj:{
                // key：数据id value:图标地址
                125: 'iconfont icon-user',
                103: 'iconfont icon-tijikongjian',
                101: 'iconfont icon-shangpin',
                102: 'iconfont icon-danju',
                145: 'iconfont icon-baobiao'
            },
            // 是否折叠
            isCollapse:false,
            // 子路由链接地址
            sonPath:""
        }
    },
    created(){
        this.getLeftNav();
        this.sonPath = window.sessionStorage.getItem("sonPath");
    },
    methods:{
        // 调用节口数据
        getLeftNav(){
            commentGetApi.commentGet(`menus`).then((res) => {
                this.leftNav = res.data;
            })
        },
        // 退出
        logout(){
            window.sessionStorage.clear();          
            this.$router.push("/login");
            return this.$message.success("退出成功!");
        },
        // 点击按钮实现菜单折叠
        toggle(){
            this.isCollapse = !this.isCollapse;
        },
        // 保存子路由的链接状态
        saveMenuPath(path){
            window.sessionStorage.setItem("sonPath",path);
            this.sonPath = path;
        }
    }
}
</script>

<style scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0px;
        align-items: center;
        color: #fff;
        font-size: 20px;
    }
    .el-header > div{
        display: flex;
        align-items: center;
    }
    .el-header > div > img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
    .el-header > div > span{
        margin-left: 15px;
    }
    .el-aside{
        background-color: #333744;
    }
    .el-main{
        background-color: #eaedf1;
    }
    .el-menu{
        border-right: 0;
    }
    .iconfont{
        margin-left: 10px;
    }
    .toggole-button{
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
    .iconfont{
        margin-right: 10px; 
    }
</style>