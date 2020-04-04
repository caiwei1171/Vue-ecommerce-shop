<template>
    <div>
        <!-- gutter 属性来指定每一栏之间的间隔，默认间隔为 0 -->
        <!-- :span指定每一列占多宽 -->
        <!-- 使用栅格，它初始是没行24个格子 -->
        <!-- clearable:可清空 -->
        <el-row :gutter="20">
            <el-col :span="7">
                <el-input 
                    placeholder="请输入内容" 
                    class="input-with-select" 
                    v-model="parameter.query" 
                    clearable 
                    @clear="queryKeywords">
                    <el-button slot="append" icon="el-icon-search" @click="queryKeywords"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="goAddPage">添加商品</el-button> 
            </el-col>
        </el-row> 
    </div>
</template>

<script>

export default {
    name:"GoodsListSearch",
    props:{
        parameter:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        queryKeywords(){
            this.$emit('getGoodsList');
        },
        goAddPage(){
            this.$router.push("/goods/add")
        }
    }
}   
</script>

<style>

</style>