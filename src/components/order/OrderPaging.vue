<template>
    <div>
        <!-- page-sizes:每页显示内容的条数 -->
        <!-- page-size：当前页面显示内容条数 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="parameter.pagenum"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="parameter.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="parameter.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:"OrderPaging",
    props:{
        parameter:Object,
        default(){
            return {}
        }
    },
    methods:{
        // 监听分页大小的改变newSize
        handleSizeChange(newSize){
            let {parameter} = this.parameter;
            parameter.pagesize = newSize;
            this.$emit("getOrderList");
        },
        // 监听页码值改变的事件
        handleCurrentChange(newPage){
            let {parameter} = this.parameter;
            parameter.pagenum = newPage;
            this.$emit("getOrderList")
        }
    }
}
</script>

<style>

</style>