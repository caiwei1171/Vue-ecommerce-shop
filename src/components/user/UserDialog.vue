<template>
    <div>
        <!-- :visible.sync 控制用户对话框的显示与隐藏 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// 引入添加用户的api  commentPostApi
import commentPostApi from "@/api/commentPost.js"
export default {
    name:"UserDialog",
    data(){
        // 验证邮箱的规则
        var checkEmail = (rule, value, cb) => {
            // 验证邮箱的正则表达式
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if (regEmail.test(value)) {
                // 合法的邮箱
                return cb();
            }
            cb(new Error('请输入合法的邮箱'))
        }
        // 验证手机号的规则
        var checkMobile = (rule, value, cb) => {
            // 验证手机号的正则表达式
            const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if (regMobile.test(value)) {
                return cb();
        }
            cb(new Error('请输入合法的手机号'));
        }
        return {
            addDialogVisible:false,//控制用户对话框的显示与隐藏
            addForm:{//添加用户的表单数据
                username:"admin",
                password:"123456",
                email:"1171899274@qq.com",
                mobile:"13428558555"
            },
            addFormRules:{//添加表单的验证规则
                username:[
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                email:[//validator:指定验证规则
                    { required: true, message: '请输入邮箱号', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ],
                mobile:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ]
            },
        }
    },
    methods:{
        // 监听添加用户对话框
        addDialogClosed(){
            this.$refs.addFormRef.resetFields();
        },
        // 点击按钮添加用户
        addUser(){
            this.$refs.addFormRef.validate((valid) => {
                if(!valid) return;
                // 发起网络请求
                commentPostApi.commentPost(`users`,this.addForm).then((res) => {
                    if(res.meta.status !== 201){
                        this.$message.error('添加用户信息失败');
                    }
                    this.$message.success('添加用户信息成功');
                    // 隐藏添加用户的对话框
                    this.addDialogVisible = false;
                    // 重新获取用户列表
                    this.getUserList();
                },(err) => {
                    console.log(err)
                })
            });
        },
        getUserList(){
            this.$emit('getUserList',this.addForm);
        }
    },
    mounted(){
        Bus.$on("addDialogVisible",(e) => {
            this.addDialogVisible = e;
        });
    }
}
</script>

<style>

</style>