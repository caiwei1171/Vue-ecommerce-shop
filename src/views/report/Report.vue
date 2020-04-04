<template>
    <div>
        <!-- 面包屑导航区域 -->
        <header-nav>
            <span slot="Manage">数据统计</span>
            <span slot="List">数据报表</span>
        </header-nav>
        <!-- 卡片区域 -->
        <el-card>
            <!-- 2.为ECharts准备一个具备大小宽高的Dom -->
            <div id="main" style="width:750px;height:450px"></div>
        </el-card>
    </div>
</template>

<script>
// 1.导入echarts
import echarts from 'echarts'
import _ from 'lodash'
// 公共组件
import HeaderNav from "@/components/content/HeaderNav"

// 获取数据列表api commentGetApi
import commentGetApi from "@/api/commentGet.js"

export default {
    name:"Report",
    data(){
        return {
            options:{//需要合并的数据
                title:{
                    text:'用户来源'
                },
                tooltip:{
                    trigger:'axis',
                    axisPointer:{
                        type:'cross',
                        label:{
                            backgroundColor:'#E9EEF3'
                        }
                    }
                },
                grid:{
                    left:'3%',
                    right:'4%',
                    bottom:'3%',
                    containLabel:true
                },
                xAxis:[
                    {
                        boundaryGap:false
                    }
                ],
                yAxis:[
                    {
                        type:'value'
                    }
                ]
            }
        }
    },
    components:{
        // 公共组件注册
        HeaderNav
    },
    // 此时，页面上的元素已经完全被渲染成功
    mounted(){
        // 3.基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        commentGetApi.commentGet(`reports/type/1`).then((res) => {
            if(res.meta.status !== 200){
                return this.$message.error("获取折线图数据失败!");
            }
            this.$message.success("获取权限列表成功!");
            const result = _.merge(res.data,this.options);
            // 5.使用刚指定的配置项和数据显示图表。
            myChart.setOption(result);
        },(err) => {
            console.log(err)
        })
        // 4.准备配置项和数据
        // var option = {
        //     title:{
        //         text:'ECharts 入门示例'
        //     },
        //     tooltip:{},
        //     legend:{
        //         data:['销量']
        //     },
        //     xAxis:{
        //     data:['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        //     },
        //     yAxis:{},
        //     series:[
        //         {
        //             name:'销量',
        //             type:'bar',
        //             data:[5, 20, 36, 10, 10, 20]
        //         }
        //     ]
        // };
    }
}
</script>

<style>

</style>