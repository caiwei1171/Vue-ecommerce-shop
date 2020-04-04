<template>
    <div>
        <!-- data:表格各行的数据 columns：显示列数 type：指定是否有模版 :selection-type:是否为多选框 -->
        <!-- :expand-type是否展开行 show-index：是否显示数字索引 index-text：设置数字索引名称 show-row-hover：是否高亮显示 -->
        <tree-table 
            class="treeTable"
            :data="catelist"
            :columns="columns"
            :selection-type='false'
            :expand-type='false'
            show-index 
            index-text="#"
            border
            :show-row-hover='false'>
            <!-- 是否有效 -->
            <template slot="isOk" slot-scope="scope">
                <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:lightgreen"></i>
                <i class="el-icon-error" v-else style="color:red"></i>
            </template>
            <!-- 排序 -->
            <template slot="sort" slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
                <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                <el-tag type="warning" size="mini" v-else>三级</el-tag>
            </template>
            <!-- 操作 -->
            <template slot="opt" slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="isShow(scope.row.cat_id)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeGoodsClassById(scope.row.cat_id)">删除</el-button>
            </template>
        </tree-table>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// 引入删除分类信息的api  commentDeleteApi
import commentDeleteApi from "@/api/commentDelete.js"
export default {
    name:"GoodsTable",
    props:{
        catelist:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    data(){
        return {
            // 为table指定列的定义
            columns:[
                {
                    label:"分类名称",
                    prop:"cat_name"//指定对应的属性名称
                },
                {
                    label:"是否有效",
                    type:"template",//type表示当前列为模板列
                    template:"isOk"//template指定模版名称
                },
                {
                    label:"排序",
                    type:"template",//type表示当前列为模板列
                    template:"sort"//template指定模版名称
                },
                {
                    label:"操作",
                    type:"template",//type表示当前列为模板列
                    template:"opt"//template指定模版名称
                }
            ]
        }
    },
    methods:{
        isShow(id){
            Bus.$emit("isShowEditGoodsClass",id);
        },
        removeGoodsClassById(id){
            // 弹框询问是否删除信息
            this.$confirm('此操作将永久删除该此分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                // 如果用户确认删除，则返回一个字符串confirm
                if(res == "confirm"){
                    commentDeleteApi.commentDelete(`categories/${id}`).then((res) => {
                        if(res.meta.status !== 200){
                            return this.$message.error("分类删除失败！");
                        }
                        this.$message.success("分类删除成功!");
                        // 获取更新后数据列表
                        this.$emit("getGoodsClass");
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

<style scoped>
    .treeTable{
        margin-top: 15px;
    }
</style>