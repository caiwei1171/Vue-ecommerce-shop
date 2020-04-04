<template>
    <div>
        <!-- 添加角色 -->
        <el-dialog title="添加角色信息" :visible.sync="addRoleDialogVisible" width="50%" @close="addRoleDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addFormRole" ref="addFormRoleRef" :rules="addFormRules" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addFormRole.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addFormRole.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole">确 定</el-button>
           </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入添加角色的api commentPostApi
import commentPostApi from "@/api/commentPost.js"
export default {
    name:"PowerAddRoleDialog",
    data(){
        return {
            addRoleDialogVisible:false,//控制弹框的显示
            addFormRole: {},// 添加角色表单数据
            addFormRules:{//添加表单的验证规则
                roleName:[
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                roleDesc:[
                    { required: true, message: '请输入角色描述', trigger: 'blur' },
                    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 显示对话框
        showAddRoledDialog(){
            this.addRoleDialogVisible = true;
        },
        addRole(){
            commentPostApi.commentPost(`roles`,this.addFormRole).then((res) => {
                if(res.meta.status !== 201){
                    this.$message.error('添加角色信息失败')
                }else{
                    this.$message.success('添加角色信息成功');
                    this.$emit("getRoleList");
                    this.addRoleDialogVisible = false;//隐藏添加角色对话框
                }
            },(err) => {
                console.log(err);
            });
        },
        // 监听添加用户对话框
        addRoleDialogClosed(){
            this.$refs.addFormRoleRef.resetFields()
        }
    }
}
</script>

<style>

</style>