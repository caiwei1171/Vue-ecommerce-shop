<template>
    <div>
        <el-table-column type="expand">
            <template slot-scope="scope">
                <!-- 渲染 各项 顶部底部的水平线样式 -->
                <el-row 
                    :class="['bdbottom',i1 === 0 ? 'bdtop' : '','vcenter']" 
                    v-for="(item1,i1) in scope.row.children" 
                    :key="item1.id">
                    <!-- 渲染一级权限 :span="5"表示占5列 -->
                    <el-col :span="5">
                        <el-tag 
                            closable 
                            @close="removeRightById(scope.row,item1.id)">
                            {{item1.authName}}
                        </el-tag>
                        <i class="el-icon-caret-right"></i>
                    </el-col>
                    <!-- 渲染二级三级权限 -->
                    <el-col :span="19">
                        <!-- 通过for循环 嵌套 渲染二级权限 -->
                        <el-row 
                            :class="[i2 === 0 ? '' : 'bdtop','vcenter']" 
                            v-for="(item2,i2) in item1.children" 
                            :key="item2.id">
                            <!-- 栅格系统 -->
                            <el-col :span="6">
                                <el-tag 
                                    type="success" 
                                    closable 
                                    @close="removeRightById(scope.row,item2.id)">
                                    {{item2.authName}}
                                </el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 三级权限 closable:为标签添加删除的样式 -->
                            <el-col :span="18">
                                <el-tag 
                                    :class="[i3 === 0 ? '' : 'bdtop']" 
                                    type="warning" v-for="(item3,i3) in item2.children" 
                                    :key="item3.id" 
                                    closable 
                                    @close="removeRightById(scope.row,item3.id)">
                                    {{item3.authName}}
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </template>
        </el-table-column>
    </div>
</template>

<script>
// 引入删除用户信息的api  commentDeleteApi
import commentDeleteApi from "@/api/commentDelete.js"
export default {
    name:"PowerRolesExpand",
    methods:{
        removeRightById(role,powerId){
            // 弹框询问是否删除信息
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                // 如果用户确认删除，则返回一个字符串confirm
                if(res == "confirm"){
                    // 接收两个参数：角色的id与权限的id
                    commentDeleteApi.commentDelete(`roles/${role.id}/rights/${powerId}`).then((res) => {
                        if(res.meta.status !== 200){
                            return this.$message.error("用户删除失败！");
                        }
                        this.$message.success("用户删除成功!");
                        // 获取更新后数据列表
                        role.children = res.data;
                    })
                }
            },(err) => {
                // 如果用户不删除点击取消，则返回一个字符串cancel
                if(err == "cancel"){
                    return this.$message.info("您已取消删除");
                }
            })
        }
    }
}
</script>

<style scoped>
    .el-tag{
        margin: 7px;
    }
    .bdtop{
        border-top: 1px solid #eee;
    }
    .bdbottom{
        border-bottom: 1px solid #eee;
    }
    .vcenter{
        display: flex;
        align-items: center;
    }
</style>