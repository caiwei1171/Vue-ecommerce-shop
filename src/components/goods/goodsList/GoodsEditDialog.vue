<template>
    <div>
        <el-dialog title="修改分类" :visible.sync="editGoodsListDialogVisible" width="50%" @close="editGoodsListDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="editFormGoods" ref="editFormGoodsRef" :rules="editFormRules" label-width="100px">
                <el-form-item label="商品名称" prop="goods_name">
                    <el-input v-model="editFormGoods.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="goods_price">
                    <el-input v-model="editFormGoods.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="goods_number">
                    <el-input v-model="editFormGoods.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="重量" prop="goods_weight">
                    <el-input v-model="editFormGoods.goods_weight"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editGoodsListDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editGoodsList">确 定</el-button> 
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
    name:"GoodsEditDialog",
    data(){
        return {
            editGoodsListDialogVisible:false,//控制弹框的显示
            editFormGoods: {},// 修改分类表单数据
            editFormRules:{//添加表单的验证规则
                goods_name:[
                    { required: true, message: '请输入商城名称', trigger: 'blur' },
                ],
                goods_price:[
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                ],
                goods_number:[
                    { required: true, message: '请输入商品数量', trigger: 'blur' },
                ],
                goods_weight:[
                    { required: true, message: '请输入商品重量', trigger: 'blur' },
                ]
            },
            id:""//选择目标的id
        }
    },
    methods:{
        // 监听添加用户对话框
        editGoodsListDialogClosed(){
            this.$refs.editFormGoodsRef.resetFields()
        },
        // 保存修改后的信息
        editGoodsList(){
            this.$refs.editFormGoodsRef.validate((valid) => {
                if(!valid) return;
                commentPutApi.commentPut(`goods/${this.id}`,this.editFormGoods).then(res=>{
                    if(res.meta.status !== 200){
                        return this.$message.error("更新数据失败!");
                    }
                    // 关闭对话框
                    this.editGoodsListDialogVisible = false;
                    // 获取更新后数据列表
                    this.$emit("getGoodsList");
                },(err) => {
                    console.log(err);
                })
            });
        }
    },
    mounted(){
        // 通过id查询信息
        Bus.$on("editDialogVisible",(e) => {
            let {isShow,id} = e;
            this.id = id;
            commentGetApi.commentGet(`goods/${id}`).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("商品信息获取失败!");
                }
                this.editFormGoods = res.data;
                this.editGoodsListDialogVisible = isShow;
            });
        });
    }
}
</script>

<style>

</style>