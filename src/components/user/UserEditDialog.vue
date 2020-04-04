<template>
    <div>
        <!-- :visible.sync 控制用户对话框的显示与隐藏 -->
        <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editClosed">
            <!-- 内容主体区域 -->
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item> 
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// 通过id获取用户信息的api commentGetApi
import commentGetApi from "@/api/commentGet.js"
// 引入修改用户状态并保存的api  commentPutApi
import commentPutApi from "@/api/commentPut.js"
export default {
    name:"UserEditDialog",
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
            editDialogVisible:false,//控制修改用户对话框的显示与隐藏
            editForm:{//添加用户的表单数据
                username:"",
                email:"",
                mobile:""
            },
            editFormRules:{//添加表单的验证规则
                username:[
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                email:[//validator:指定验证规则
                    { required: true, message: '请输入邮箱号', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ],
                mobile:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 监听修改用户信息的关闭事件
        editClosed(){
            this.$refs.editFormRef.resetFields();
        },
        // 修改用户信息并提交
        editUserInfo(){
            this.$refs.editFormRef.validate((valid) => {
                if(!valid) return;
                commentPutApi.commentPut(`users/${this.editForm.id}`,{email:this.editForm.email,mobile:this.editForm.mobile}).then(res=>{
                    if(res.meta.status !== 200){
                        return this.$message.error("更新用户信息失败!");
                    }
                    // 关闭对话框
                    this.editDialogVisible = false;
                    // 获取更新后数据列表
                    this.getUserList();
                },(err) => {
                    console.log(err);
                })
            });
        },
        getUserList(){
            this.$emit('getUserList',this.addForm);
        }
    },
    mounted(){    
        Bus.$on("editDialogVisible",(e) => {
            let {isShow,id} = e
            this.editDialogVisible = isShow;
            commentGetApi.commentGet(`users/${id}`).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("查询信息失败!");
                }
               this.editForm = res.data;
            });
        });    
    }
}
</script>

<style>

</style>