<template>
    <div>
        <!-- 添加动态参数静态属性对话框 -->
        <el-dialog
            :title="'修改' + titleText"
            :visible.sync="editDialogVisible"
            width="50%" 
            @close="editDialogClosed">
            <!-- 对话框 -->
            <!-- :model与表单绑定 -->
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
                <el-form-item :label="titleText" prop="attr_name">
                    <el-input v-model="editForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editParameter">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// 获取网络请求的api  commentGetApi
import commentGetApi from "@/api/commentGet.js"
// 获取网络请求的api并提交数据  commentPutApi
import commentPutApi from "@/api/commentPut.js"
export default {
    name:"ParameterEditDialog",
    data(){
        return {
            titleText:"",//标题
            editDialogVisible:false,//控制对话框的显示
            editForm:{//修改表单数据对象
                attr_name:""
            },
            editFormRules:{//表单的验证规则
                attr_name:[
                    {
                        required:true,
                        message:'请输入参数名称',
                        trigger:'blur'
                    }
                ]
            },
            id:"",
            cateId:""
        }
    },
    methods:{
        // 监听对话框的关闭事件
        editDialogClosed(){
            this.$refs.editFormRef.resetFields();
        },
        // 修改数据
        editParameter(){
            this.$refs.editFormRef.validate((valid) => {
                if(!valid) return;
                commentPutApi.commentPut(`categories/${this.cateId}/attributes/${this.id}`,
                    {attr_name:this.editForm.attr_name,attr_sel:this.activeName}).then((res) => {
                    // 弹框提示
                    if(res.meta.status !== 200){
                        return this.$message.error("修改参数失败!");
                    }
                    this.$message.success("修改参数成功!");
                    Bus.$emit("updateCate")
                    this.editDialogVisible = false; 
                },(err) => {
                    console.log(err);                  
                })
            });
        }
    },
    mounted(){
       Bus.$on("editShow",(e) => {
           this.titleText = e.parameter;
           this.cateId = e.cateId;
           this.id = e.id;
           this.activeName = e.activeName;
            commentGetApi.commentGet(`categories/${e.cateId}/attributes/${e.id}`,
                {attr_sel: e.activeName}).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("获取数据失败!");
                }
                this.editForm.attr_name = res.data.attr_name;
            },(err) => {
                console.log(err);
            });
           this.editDialogVisible = true; 
        });
    }
}
</script>

<style scoped>

</style>