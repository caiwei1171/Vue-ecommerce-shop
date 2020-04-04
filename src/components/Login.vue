<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/img/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" class="login_form" :rules="loginFormRules">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入帐号" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" prefix-icon="iconfont icon-3702mima"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="logo">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
// 引入登录通过网络请求获取的数据
import commentPostApi from "@/api/commentPost.js"
export default {
    name:"Login",
    data(){
        return {
            // 这是登录表单的数据对象
            loginForm:{
                username:"admin",
                password:"123456"
            },
            // 这是表单的规则验证对象
            loginFormRules:{
                // 验证用户名是否合法
                username:[
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                // 验证密码是否合法
                password:[
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 获取登录网络请求数据
        logo(){
            // 提前对表单进行预验证
            this.$refs.loginFormRef.validate((valid) => {
                if(!valid) return;
                commentPostApi.commentPost(`login`,this.loginForm).then((res) => {
                    // 弹框提示
                    if(res.meta.status !== 200){
                        return this.$message.error("登录失败!");
                    }else{
                        // localStorage会长久保存信息，sessionStorage:只会在当前页面保存信息
                        // token只应在当前网站打开期间有效，所以sessionStorage更合适
                        window.sessionStorage.setItem("token",res.data.token);
                        this.$router.push("/home")   
                        return this.$message.success("登录成功!");
                    }
                },(err) => {
                    console.log(err);                  
                })
            });
        },
        // 点击重置按钮
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        }
    }
}
</script>

<style scoped>
    .login_container{
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%); 
    }
    .login_box .avatar_box{
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        padding: 10px;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%); 
        background-color: #fff;
    }
    .login_box .avatar_box img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
</style>