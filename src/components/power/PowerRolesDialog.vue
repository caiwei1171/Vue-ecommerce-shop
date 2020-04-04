<template>
    <div>
        <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRighgtDialogClosed">
            <!-- 树形控件 show-checkbox:展示可选项 -->
            <!-- node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 -->
            <!-- default-expand-all	是否默认展开所有节点 -->
            <!-- default-checked-keys	默认勾选的节点的 key 的数组 -->
            <el-tree 
                :data="powerRightsList" 
                :props="treeProps" 
                show-checkbox
                node-key="id"
                :default-expand-all="true"
                :default-checked-keys="defKeys"
                ref="treeRef">
                </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotRights">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// // 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// 获取网络请求权限数据的api  commentGetApi
import commentGetApi from "@/api/commentGet.js"
// 为角色分配权限的api commentPostApi
import commentPostApi from "@/api/commentPost.js"
export default {
    name:"PowerRolesDialog",
    data(){
        return {
            setRightDialogVisible:false,
            powerRightsList:[],//所有权限列表的数据
            treeProps:{//树形控件的属性绑定对象
                label:"authName",//指定看到那个对象
                children:"children"
            },
            defKeys:[],//默认选中的节点id值数组
            roleId:""//保存选中的id(当前即将分配权限的角色id)
        }
    },
    mounted(){
        Bus.$on("showSetRightDialog",(e) => {
            this.roleId = e.id; 
            commentGetApi.commentGet(`rights/tree`).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("获取权限数据失败!");
                }
                this.powerRightsList = res.data;   
                // 递归获取三级节点的ID
                // 监听分配权限对话框的关闭时间,清空数组
                this.setRighgtDialogClosed();
                this.getLeafKeys(e,this.defKeys);
                this.setRightDialogVisible = true;     
            },(err) => {
                console.log(err);
            })
        });
    },
    methods:{
        // 通过递归的形式，获取角色下所有三级权限的id，并保存到defKeys
        getLeafKeys(node, arr) {
            // 如果当前node节点不包含children属性  则指三级节点
            if(!node.children){
                return arr.push(node.id)
            }
            node.children.forEach(item => this.getLeafKeys(item,arr))
        },
        // 监听分配权限对话框的关闭时间,清空数组
        setRighgtDialogClosed(){
            this.defKeys = [];
        },
        // 点击为角色分配权限
        allotRights(){//getCheckedKey获取所有已选中节点数组
            const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()];
            const idStr = keys.join(',');
            commentPostApi.commentPost(`roles/${this.roleId}/rights`, {rids: idStr}).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error('分配权限失败！')
                }
                this.$message.success('更改权限成功！')
                this.$emit("getRoleList")
                this.setRightDialogVisible = false;
            },(err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>