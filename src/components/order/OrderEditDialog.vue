<template>
    <div>
        <!-- :visible.sync 控制用户对话框的显示与隐藏 -->
        <el-dialog title="修改地址" :visible.sync="editAddressVisible" width="50%" @close="editClosed">
            <!-- 内容主体区域 -->
            <el-form :model="editAddressForm" :rules="editAddressFormRules" ref="editAddressFormRef" label-width="100px">
                <el-form-item label="省市区/县" prop="address1">
                    <el-cascader :options="cityData" v-model="editAddressForm.address1"></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="address2">
                    <el-input v-model="editAddressForm.address2"></el-input>
                </el-form-item> 
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editAddressVisible = false">取 消</el-button>
                <el-button type="primary" @click="editAddressVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
export default {
    name:"OrderEditDialog",
    props:{
        cityData:{
            type:Array,
            default(){
                []
            }
        }
    },
    data(){
        return {
            editAddressVisible:false,//控制修改地址对话框的显示与隐藏
            editAddressForm:{//添加地址的表单数据
                address1:[],
                address2:""
            },
            editAddressFormRules:{//添加表单的验证规则
                address1:[
                    { required: true, message: '请选择省市区/县', trigger: 'blur' }
                ],
                address2:[
                    { required: true, message: '请填写详细地址', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 监听修改用户信息的关闭事件
        editClosed(){
            this.$refs.editAddressFormRef.resetFields();
        }
    },
    mounted(){    
        Bus.$on("orderEditDialogVisible",() => {
            this.editAddressVisible = true;
        });    
    }
}
</script>

<style>
    .el-cascader{
        width: 100%;
    }
</style>