<template>
    <div>
        <!-- 添加动态参数静态属性对话框 -->
        <el-dialog
            :title="'添加' + titleText"
            :visible.sync="addDialogVisible"
            width="50%" 
            @close="addDialogClosed">
            <!-- 对话框 -->
            <!-- :model与表单绑定 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                <el-form-item :label="titleText" prop="attr_name">
                    <el-input v-model="addForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addParameter">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// 获取网络请求的api  commentPostApi
import commentPostApi from "@/api/commentPost.js"
export default {
    name:"ParameterAddDialog",
    data(){
        return {
            titleText:"",//标题
            addDialogVisible:false,//控制对话框的显示
            addForm:{//添加参数的表单数据对象
                attr_name:""
            },
            addFormRules:{//表单的验证规则
                attr_name:[
                    {
                        required:true,
                        message:'请输入参数名称',
                        trigger:'blur'
                    }
                ]
            },
            id:"",
            activeName:""
        }
    },
    methods:{
        // 监听对话框的关闭事件
        addDialogClosed(){
            this.$refs.addFormRef.resetFields();
        },
        // 添加数据
        addParameter(){
            this.$refs.addFormRef.validate((valid) => {
                if(!valid) return;
                commentPostApi.commentPost(`categories/${this.id}/attributes`,
                    {attr_name:this.addForm.attr_name,attr_sel:this.activeName}).then((res) => {
                    // 弹框提示
                    if(res.meta.status !== 201){
                        return this.$message.error("添加数据失败!");
                    }
                    this.$message.success("添加数据成功!");
                    Bus.$emit("updateCate")
                    this.addDialogVisible = false; 
                },(err) => {
                    console.log(err);                  
                })
            });
        }
    },
    mounted(){
       Bus.$on("showEditRoleDialog",(e) => {
           this.titleText = e.parameter;
           this.id = e.id;
           this.activeName = e.activeName;
           this.addDialogVisible = true; 
        });
    }
}
</script>

<style scoped>

</style>