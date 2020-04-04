<template>
    <div>
        <!-- data:显示的数据 label:名称 prop:指定值 -->
        <!-- stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。 -->
        <el-table :data="powerList" border stripe>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="权限名称" prop="authName"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <el-table-column label="权限等级" prop="level">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.level === '0'">一级权限</el-tag>
                    <el-tag type="success" v-else-if="scope.row.level === '1'">二级权限</el-tag>
                    <el-tag type="warning" v-else>三级权限</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:"PowerListData",
    props:{
        powerList:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>

</style>