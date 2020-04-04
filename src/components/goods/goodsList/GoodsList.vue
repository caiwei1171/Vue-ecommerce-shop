<template>
    <div>
        <!-- data:显示的数据 label:名称 prop:指定值 -->
        <!-- stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。 -->
        <el-table :data="goodsList" border stripe>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="商品名称" prop="goods_name"></el-table-column>
            <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
            <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
            <el-table-column label="创建时间" prop="add_time" width="160px">
                <template slot-scope="scope">
                    {{scope.row.add_time | dateFormat}}
                </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="130px">
                <template slot-scope="scope">
                    <!-- 修改 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="GoodsEditDialog(scope.row.goods_id)"></el-button>
                    <!-- 删除 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.goods_id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// // 引入修改用户状态的api  commentPutApi
// import commentPutApi from "@/api/commentPut.js"
// 引入删除用户信息的api  commentDeleteApi
import commentDeleteApi from "@/api/commentDelete.js"

export default {
    name:"GoodsList",
    props:{
        goodsList:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    data(){
        return {
            isShow:true,//让弹出框显示
        }
    },
    methods:{
        // 展示编辑用户的对话框
        GoodsEditDialog(id){
            Bus.$emit("editDialogVisible",{isShow:this.isShow,id});       
        },
        // 根据Id删除用户信息
        removeUserById(id){
            // 弹框询问是否删除信息
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                // 如果用户确认删除，则返回一个字符串confirm
                if(res == "confirm"){
                    commentDeleteApi.commentDelete(`goods/${id}`).then((res) => {
                        if(res.meta.status !== 200){
                            return this.$message.error("商品删除失败！");
                        }
                        this.$message.success("商品删除成功!");
                        // 获取更新后数据列表
                        this.$emit('getGoodsList');
                    })
                }
            },(err) => {
                // 如果用户不删除点击取消，则返回一个字符串cancel
                if(err == "cancel"){
                    return this.$message.info("您已取消删除");
                }
            })
        }
    }

}
</script>

<style>

</style>