<template>
    <div>
        <el-dialog title="物流进度" :visible.sync="orderProgressVisible" width="50%">
            <el-timeline>
                <el-timeline-item
                    v-for="(activity, index) in progressVisible"
                    :key="index"
                    :timestamp="activity.time">
                    {{activity.context}}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// 获取用户数据列表api commentGetApi
import commentGetApi from "@/api/commentGet.js"
export default {
    name:"OrderProgress",
    data(){
        return {
            orderProgressVisible:false,//使物流进度对话框隐藏
            progressVisible:[]
        }
    },
    mounted(){
        Bus.$on("show",() => {
            commentGetApi.commentGet(`/kuaidi/804909574412544580`).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("获取物流信息失败!");
                }else{
                    this.progressVisible = res.data;
                }
            },(err) => {
                console.log(err)
            })
            this.orderProgressVisible = true;
        });
    }
}
</script>

<style scoped>
    @import '../../plugins/timeline/timeline.css';
    @import '../../plugins/timeline-item/timeline-item.css';
</style>