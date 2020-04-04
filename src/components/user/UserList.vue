<template>
    <div>
        <!-- data:显示的数据 label:名称 prop:指定值 -->
        <!-- stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。 -->
        <el-table :data="userList" border stripe>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="姓名" prop="username"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="电话" prop="mobile"></el-table-column>
            <el-table-column label="角色" prop="role_name"></el-table-column>
            <!-- 用户状态的操作 -->
            <el-table-column label="状态">
                <!-- slot-scope="scope"作用域插槽 scope.row:可以拿到本行的所有数据 -->
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                    <!-- 修改 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="UserEditDialog(scope.row.id)"></el-button>
                    <!-- 删除 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                    <!-- 分配角色 effect：显示颜色 content：显示的内容 placement：显示的位置 -->
                    <!-- enterable	鼠标是否可进入到 tooltip 中，默认ture(不会隐藏) false(会隐藏) -->
                    <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// 引入修改用户状态的api  commentPutApi
import commentPutApi from "@/api/commentPut.js"
// 引入删除用户信息的api  commentDeleteApi
import commentDeleteApi from "@/api/commentDelete.js"

export default {
    name:"UserList",
    props:{
        userList:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    data(){
        return {
            isShow:true,//让弹出框显示
        }
    },
    methods:{
        // 监听用户状态的改变
        userStateChanged(userInfo){
            commentPutApi.commentPut(`users/${userInfo.id}/state/${userInfo.mg_state}`).then((res) => {
                if(res.meta.status !== 200){
                    userInfo.mg_state = !userInfo.mg_state; 
                    return this.$message.error("更新用户状态失败!");
                }
                this.$message.success("更新用户状态成功!");
            },(err) => {
                console.log(err);
            })
        },
        // 展示编辑用户的对话框
        UserEditDialog(id){
            Bus.$emit("editDialogVisible",{isShow:this.isShow,id});       
        },
        // 根据Id删除用户信息
        removeUserById(id){
            // 弹框询问是否删除信息
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                // 如果用户确认删除，则返回一个字符串confirm
                if(res == "confirm"){
                    commentDeleteApi.commentDelete(`users/${id}`).then((res) => {
                        if(res.meta.status !== 200){
                            return this.$message.error("用户删除失败！");
                        }
                        this.$message.success("用户删除成功!");
                        // 获取更新后数据列表
                        this.getUserList();
                    })
                }
            },(err) => {
                // 如果用户不删除点击取消，则返回一个字符串cancel
                if(err == "cancel"){
                    return this.$message.info("您已取消删除");
                }
            })
        },
        getUserList(){
            this.$emit('getUserList');
        },
        // 使分配角色的对话框显示
        setRole(info){
            Bus.$emit("setRoleShow",info);
        }
    },

}
</script>

<style>

</style>