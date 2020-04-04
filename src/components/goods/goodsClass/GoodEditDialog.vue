<template>
    <div>
        <el-dialog title="修改分类" :visible.sync="editGoodsClassDialogVisible" width="50%" @close="editGoodsClassDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="editFormRole" ref="editFormRoleRef" :rules="editFormRules" label-width="100px">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="editFormRole.cat_name"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editGoodsClassDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editGoodsClass">确 定</el-button> 
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
    name:"GoodEditDialog",
    data(){
        return {
            editGoodsClassDialogVisible:false,//控制弹框的显示
            editFormRole: {},// 修改分类表单数据
            editFormRules:{//添加表单的验证规则
                cat_name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' }
                ]
            },
            id:""//选择目标的id
        }
    },
    methods:{
        // 监听添加用户对话框
        editGoodsClassDialogClosed(){
            this.$refs.editFormRoleRef.resetFields()
        },
        // 保存修改后的信息
        editGoodsClass(){
            this.$refs.editFormRoleRef.validate((valid) => {
                if(!valid) return;
                commentPutApi.commentPut(`categories/${this.id}`,{cat_name:this.editFormRole}).then(res=>{
                    console.log(this.editFormRole.cat_id)
                    if(res.meta.status !== 200){
                        return this.$message.error("更新信息失败!");
                    }
                    // 关闭对话框
                    this.editGoodsClassDialogVisible = false;
                    // 获取更新后数据列表
                    this.$emit("getGoodsClass");
                },(err) => {
                    console.log(err);
                })
            });
        }
    },
    mounted(){
        // 通过id查询信息
        Bus.$on("isShowEditGoodsClass",(e) => {
            this.id = e;//传参过来的id
            commentGetApi.commentGet(`categories/${e}`).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("查询信息失败!");
                }
                this.editFormRole = res.data;
                this.editGoodsClassDialogVisible = true;
            });
        });
    }
}
</script>

<style>

</style>