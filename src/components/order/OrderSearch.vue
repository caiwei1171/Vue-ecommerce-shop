<template>
    <div>
        <!-- gutter 属性来指定每一栏之间的间隔，默认间隔为 0 -->
        <!-- :span指定每一列占多宽 -->
        <!-- 使用栅格，它初始是没行24个格子 -->
        <!-- clearable:可清空 -->
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input 
                    placeholder="请输入内容" 
                    class="input-with-select" 
                    v-model="parameter.query" 
                    clearable 
                    @clear="getOrderList">
                    <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
                </el-input>
            </el-col>
        </el-row> 
    </div>
</template>

<script>

export default {
    name:"OrderSearch",
    props:{
        parameter:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        getOrderList(){
            this.$emit('getOrderList');
        }
    }
}
</script>

<style>

</style>