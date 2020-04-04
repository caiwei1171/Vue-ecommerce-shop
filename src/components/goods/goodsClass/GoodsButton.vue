<template>
    <div>
        <!-- 按钮区域 -->
        <el-row>
            <el-col>
                <el-button type="primary" @click="isShow">商品分类</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
export default {
    name:"GoodsButton",
    methods:{
        isShow(){
            Bus.$emit("isShow",true)
        }
    }
}
</script>

<style>

</style>