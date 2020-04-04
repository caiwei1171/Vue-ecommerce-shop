<template>
    <div>
        <el-dialog title="编辑角色信息" :visible.sync="editRoleDialogVisible" width="50%" @close="editRoleDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="editFormRole" ref="editFormRoleRef" :rules="editFormRules" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="editFormRole.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="editFormRole.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSaveRole">确 定</el-button>
           </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// 通过id获取用户信息的api commentGetApi
import commentGetApi from "@/api/commentGet.js"
// 引入修改用户信息并保存的api  commentPutApi
import commentPutApi from "@/api/commentPut.js"
export default {
    name:"PowerRoleEditDialog",
    data(){
        return {
            editRoleDialogVisible:false,//控制弹框的显示
            editFormRole: {},// 添加角色表单数据
            editFormRules:{//添加表单的验证规则
                roleName:[
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                roleDesc:[
                    { required: true, message: '请输入角色描述', trigger: 'blur' },
                    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
                ]
            },
            id:""//选择目标的id
        }
    },
    methods:{
        // 监听添加用户对话框
        editRoleDialogClosed(){
            this.$refs.editFormRoleRef.resetFields()
        },
        // 保存修改后的信息
        editSaveRole(){
            this.$refs.editFormRoleRef.validate((valid) => {
                if(!valid) return;
                commentPutApi.commentPut(`roles/${this.id}`,{roleName:this.editFormRole.roleName,roleDesc:this.editFormRole.roleDesc}).then(res=>{
                    if(res.meta.status !== 200){
                        return this.$message.error("更新信息失败!");
                    }
                    // 关闭对话框
                    this.editRoleDialogVisible = false;
                    // 获取更新后数据列表
                    this.$emit("getRoleList");
                },(err) => {
                    console.log(err);
                })
            });
        }
    },
    mounted(){
        Bus.$on("showEditRoleDialog",(e) => {
            this.id = e;
            commentGetApi.commentGet(`roles/${e}`).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("查询信息失败!");
                }
                this.editFormRole = res.data;
                this.editRoleDialogVisible = true;
            });
        });
    }
}
</script>

<style>

</style>