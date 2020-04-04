<template>
    <div>
        <!-- page-sizes:每页显示内容的条数 -->
        <!-- page-size：当前页面显示内容条数 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="parameter.queryInfo.pagenum"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="parameter.queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="parameter.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:"GoodsPaging",
    props:{
        parameter:Object,
        default(){
            return {}
        }
    },
    methods:{
        // 监听分页大小的改变newSize
        handleSizeChange(newSize){
            let {queryInfo} = this.parameter;
            queryInfo.pagesize = newSize;
            this.$emit("getGoodsClass");
        },
        // 监听页码值改变的事件
        handleCurrentChange(newPage){
            let {queryInfo} = this.parameter;
            queryInfo.pagenum = newPage;
            this.$emit("getGoodsClass")
        }
    }
}
</script>

<style>

</style>