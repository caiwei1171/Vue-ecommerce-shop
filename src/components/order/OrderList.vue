<template>
    <div>
        <!-- data:显示的数据 label:名称 prop:指定值 -->
        <!-- stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。 -->
        <el-table :data="orderList" border stripe>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="订单编号" prop="order_number" width="220px"></el-table-column>
            <el-table-column label="订单价格" prop="order_price"></el-table-column>
            <el-table-column label="是否付款" prop="pay_status">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
                    <el-tag type="danger" v-else>未付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否发货" prop="is_send"></el-table-column>
            <el-table-column label="下单时间" prop="create_time">
                <template slot-scope="scope">
                    {{scope.row.create_time | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope>
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showBox"></el-button>
                    <el-button type="success" icon="el-icon-location" size="mini" @click="showProgressBox"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"

export default {
    name:"OrderList",
    props:{
        orderList:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    methods:{
        // 展示修改地址的对话框
        showBox(){
            Bus.$emit("orderEditDialogVisible");       
        },
        // 展示地址
        showProgressBox(){
            Bus.$emit("show"); 
        }
    }
}
</script>

<style>

</style>