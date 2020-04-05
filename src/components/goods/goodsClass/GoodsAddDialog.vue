<template>
    <div>
        <!-- 添加分类的对话框 -->
        <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%" @close="addCateDialogClosed">
            <!-- 添加分类 表单 -->
            <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
                <el-form-item label="分类名称：" prop="cat_name">
                    <el-input v-model="addCateForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类：">
                    <!-- options  用来指定数据源 -->
                    <!-- props 用来指定配置对象 -->
                    <!-- clearable是否清空选项 -->
                    <!-- change-on-select可以选择任意级分类  -->
                    <el-cascader 
                        expand-trigger = "hover" 
                        :options="parentCateList" 
                        v-model="selectedKeys"
                        :props="cascaderProps" 
                        @change="parentCateChanged" 
                        clearable
                        change-on-select>
                        </el-cascader>
                </el-form-item>
            </el-form> 
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// 获取网络请求的api  commentGetApi
import commentGetApi from "@/api/commentGet.js"
// 获取网络请求的api  commentGetApi
import commentPostApi from "@/api/commentPost.js"
export default {
    name:"GoodsAddDialog",
    data(){
        return {
            addCateDialogVisible:false,//控制对话框的显示与隐藏
            addCateForm:{//添加分类的表单数据对象
                cat_name:"",//将要添加的分类名称
                cat_pid:0,//父级分类 id
                cat_level:0//父级分类 等级 默认添加的是一级分类    
            },
            addCateFormRules:{//添加分类表单验证规则
                cat_name:[
                    {
                        required:true,
                        message:'请输入分类名称',
                        trigger:'blur'
                    }
                ]
            },
            parentCateList:[],//父级分类列表
            cascaderProps:{//指定级联选择器的配置对象  
                value:'cat_id',//具体选中属性
                label:'cat_name',//所看到的属性
                children:'children',//父子嵌套使用的属性
            },
            selectedKeys:[]//选中的父级分类列表 id数组
        }
    },
    mounted(){
        // 使添加分类按钮显示
        Bus.$on("isShow",(e) => {
            this.getParentCateList();
            this.addCateDialogVisible = e;
        })
    },
    methods:{
        addCate(){
            commentPostApi.commentPost("categories",this.addCateForm).then((res) => {
                if(res.meta.status !== 201){
                    return this.$message.error("添加分类数据失败！");
                }
                this.$message.success("添加分类数据成功！");
                this.$emit("getGoodsClass");
                this.addCateDialogVisible = false;
            });
        },
        // 获取父级分类的数据列表
        getParentCateList(){
            commentGetApi.commentGet("categories",{type:2}).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("获取父级分类数据失败！");
                }
                this.parentCateList = res.data;
            });
        },
        // 选择项发生变化 触发函数
        parentCateChanged(){
            // 如果 selectedKeys  length  大于0 证明选中了父级分类
            // 反之，证明没有选中
            if(this.selectedKeys.length > 0){
                // 父级分类的id
                this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1];
                // 当前分类的等级  赋值
                this.addCateForm.cat_level = this.selectedKeys.length
                return 0
            }else{
                this.addCateForm.cat_pid = 0
                this.addCateForm.cat_level = 0
            }
        },
        // 监听 对话框关闭  重置表单数据
        addCateDialogClosed(){
            this.$refs.addCateFormRef.resetFields();
            this.selectedKeys = [];
            this.addCateForm.cat_level = 0;
            this.addCateForm.cat_pid = 0;
        }
    }
}
</script>

<style scoped>
    .el-cascader{
        width:100%;
    }
</style>