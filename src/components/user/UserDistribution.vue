<template>
    <div>
        <el-dialog 
            title="分配角色" 
            :visible.sync="setRoleDialogVisible" 
            width="50%" 
            @close="setRoleDialogClosed">
            <div>
                <p>当前的用户：{{userInfo.username}}</p>
                <p>当前的角色：{{userInfo.role_name}}</p>
                <p>分配新角色：
                    <el-select v-model="selectedRoleId">
                        <el-option 
                            v-for="item in rolesList" 
                            :key="item.id" 
                            :label="item.roleName"
                            :value="item.id">
                            </el-option>
                    </el-select>            
                </p>
            </div>
            <span slot="footer" class="dialog-footer">   
                <el-button @click="setRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁 
import Bus from "@/components/Bus.js"
// 获取所有的角色列表
import commentGetApi from "@/api/commentGet.js"
// 已选择修改用户状态并保存的api  commentPutApi
import commentPutApi from "@/api/commentPut.js"
export default {
    name:"UserDistribution",
    data(){
        return {
            setRoleDialogVisible:false,//控制分配角色对话框的显示与隐藏
            userInfo:{},//需要被分配角色的用户信息
            rolesList:[],//所有角色的数据列表
            selectedRoleId:"",//已选中的角色id值
        }
    },
    methods:{
        // 点击按钮分配角色
        saveRoleInfo(){
            if(!this.selectedRoleId){
                return this.$message.error("请选择要分配的角色！");
            }
            commentPutApi.commentPut(`users/${this.userInfo.id}/role`,{rid:this.selectedRoleId}).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("设置角色失败！");
                }
                this.$message.success("设置角色成功");
                this.updateRole();
                this.setRoleDialogVisible = false;
            },(err) => {
                console.log(err);
            });
        },
        // 更新角色列表
        updateRole(){
            this.$emit("getUserList")
        },
        // 监听分配角色对话框的关闭事件
        setRoleDialogClosed(){
            this.selectedRoleId = '';
            this.userInfo = {};
        }
    },
    mounted(){
        Bus.$on("setRoleShow",(e) => {
            this.userInfo = e;
            // 展示对话框之前获取所有的角色列表
            commentGetApi.commentGet(`roles`).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("获取角色列表失败！");
                }
                this.rolesList = res.data;
            },(err) => {
                console.log(err);
            });
            this.setRoleDialogVisible = true;
        });
    }
}
</script>

<style>

</style>