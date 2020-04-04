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
                    @clear="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="addDialogVisible">添加用户</el-button> 
            </el-col>
        </el-row> 
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
export default {
    name:"UserSearch",
    props:{
        parameter:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            isShow:true
        }
    },
    methods:{
        getUserList(){
            this.$emit('getUserList');
        },
        addDialogVisible(){
            Bus.$emit("addDialogVisible",this.isShow);
        }
    }
}
</script>

<style>

</style>