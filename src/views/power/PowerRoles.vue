<template>
    <div>
        <!-- 面包屑导航区域 -->
        <header-nav>
            <span slot="Manage">角色管理</span>
            <span slot="List">角色列表</span>
        </header-nav>
        <!-- 卡片视图 -->
        <el-card>
            <!-- 添加角色按钮区 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addRoleDialogVisible">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 角色列表域 -->
            <power-roles-data v-bind:rolelist="rolelist" v-on:getRoleList="getRoleList"></power-roles-data>
        </el-card>
        <!-- 分配权限对话框 -->
        <power-roles-dialog v-on:getRoleList="getRoleList"></power-roles-dialog>
        <!-- 添加角色对话框 -->
        <power-add-role-dialog ref="mychild" v-on:getRoleList="getRoleList"></power-add-role-dialog>
        <!-- 修改角色信息对话框 -->
        <power-role-edit-dialog v-on:getRoleList="getRoleList"></power-role-edit-dialog>
    </div>
</template>

<script>
// 公共组件
import HeaderNav from "@/components/content/HeaderNav"
// 子组件
import PowerRolesData from "@/components/power/PowerRolesData"
import PowerRolesDialog from "@/components/power/PowerRolesDialog"
import PowerAddRoleDialog from "@/components/power/PowerAddRoleDialog"
import PowerRoleEditDialog from "@/components/power/PowerRoleEditDialog"
// 获取网络请求的角色数据api  commentGetApi
import commentGetApi from "@/api/commentGet.js"
export default {
    name:"PowerRoles",
    components:{
        // 公共组件注册
        HeaderNav,
        // 子组件注册
        PowerRolesData,
        PowerRolesDialog,
        PowerAddRoleDialog,
        PowerRoleEditDialog
    },
    data(){
        return {
            // 所有角色列表数据
            rolelist:[]
        }
    },
    created(){
        this.getRoleList();
    },
    methods:{
        getRoleList(){
            commentGetApi.commentGet("roles").then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("获取角色列表失败!");
                }
                this.rolelist = res.data;
                this.$message.success("获取角色列表成功!");
            },(err) => {
                console.log(err);
            })
        },
        // 控制子组件添加对话弹框的显示
        addRoleDialogVisible(){
            this.$refs.mychild.showAddRoledDialog();
        }
    }
}
</script>

<style>
    
</style>