<template>
    <div>
        <!-- page-sizes:每页显示内容的条数 -->
        <!-- page-size：当前页面显示内容条数 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="parameter.parameter.pagenum"
            :page-sizes="[4, 8, 12, 16]"
            :page-size="parameter.parameter.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="parameter.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:"UserPaging",
    props:{
        parameter:{
            type:Object,
            default(){
                return {};
            }
        }
    },
    methods:{
        // 监听分页大小的改变
        handleSizeChange(newSize){
            let {parameter} = this.parameter;
            parameter.pagesize = newSize;
            this.$emit("getUserList");
        },
        // 监听页码值改变的事件
        handleCurrentChange(newPage){
            let {parameter} = this.parameter;
            parameter.pagenum = newPage;
            this.$emit("getUserList")
        }
    }
}
</script>

<style>

</style>