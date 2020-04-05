<template>
    <div>
        <!-- 选择商品级联分类 -->
        <el-row class="cat_opt">
            <el-col>
                <span>选择商品分类：</span>
                <!-- 选择商品分类的级联选择框 -->
                <!-- options  用来指定数据源 -->
                <!-- props 用来指定配置对象 -->
                <el-cascader 
                    v-model="selectedCateKeys" 
                    :options="catelist" 
                    :props="cateProps" 
                    @change="handleChange">
                    </el-cascader>
                </el-col>
        </el-row>
        <!-- tab页签区域 -->
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="动态参数" name="many">
                <!-- 添加动态参数的面板 -->
                <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addParameter">添加参数</el-button>
                <!-- 表格区域 -->
                <!-- data:存放数据源 -->
                <el-table :data="manyTableData" border stripe>
                    <!-- 展开行 -->
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <!-- 循环渲染tag标签 closable:使之有关闭效果 -->
                            <el-tag v-for="(item,i) in scope.row.attr_vals" 
                                :key="i" 
                                closable 
                                @close="handleClose(i,scope.row)">
                                {{item}}
                            </el-tag>
                            <!-- 输入文本框 -->
                            <el-input 
                                class="input-new-tag" 
                                v-if="scope.row.inputVisible" 
                                v-model="scope.row.inputValue" 
                                ref="saveTagInput" 
                                size="small" 
                                @keyup.enter.native="handleInputConfirm(scope.row)" 
                                @blur="handleInputConfirm(scope.row)" 
                                style="width:120px">
                            </el-input>
                            <!-- 添加按钮 -->
                            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                        </template>
                    </el-table-column>
                    <!-- 索引列 -->
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeParameter(scope.row.attr_id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only">
                <!-- 添加静态属性的面板 -->
                <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addParameter">添加属性</el-button>
                <!-- 表格区域 -->
                <!-- data:存放数据源 -->
                <el-table :data="onlyTableData" border stripe>
                    <!-- 展开行 -->
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <!-- 循环渲染tag标签 closable:使之有关闭效果 -->
                            <el-tag v-for="(item,i) in scope.row.attr_vals" 
                                :key="i" 
                                closable 
                                @close="handleClose(i,scope.row)">
                                {{item}}
                            </el-tag>
                            <!-- 输入文本框 -->
                            <el-input 
                                class="input-new-tag" 
                                v-if="scope.row.inputVisible" 
                                v-model="scope.row.inputValue" 
                                ref="saveTagInput" 
                                size="small" 
                                @keyup.enter.native="handleInputConfirm(scope.row)" 
                                @blur="handleInputConfirm(scope.row)" 
                                style="width:120px">
                            </el-input>
                            <!-- 添加按钮 -->
                            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                        </template>                        
                    </el-table-column>
                    <!-- 索引列 -->
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeParameter(scope.row.attr_id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// 引入连接兄弟组件的桥梁
import Bus from "@/components/Bus.js"
// 获取网络请求的api  commentGetApi  commentPutApi
import commentGetApi from "@/api/commentGet.js"
import commentPutApi from "@/api/commentPut.js"
// 引入删除用户信息的api  commentDeleteApi
import commentDeleteApi from "@/api/commentDelete.js"
export default {
    name:"ParameterClass",
    props:{
        catelist:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            cateProps:{//级联选择框的配置对象
                value:"cat_id",//选中的值
                label:"cat_name",//看到的内容
                children:"children"//父子节点的嵌套属性
            },
            selectedCateKeys:[],//级联选择框双向绑定的数组
            activeName:"many",
            manyTableData:[],//动态表格的数据
            onlyTableData:[]//静态表格的数据
        }
    },
    computed:{
        //是否禁止按钮
        isBtnDisabled(){
            if(this.selectedCateKeys.length !== 3){
                return true;
            }else{
                return false;
            }
        },
        cateId(){
            if(this.selectedCateKeys.length === 3){
                return this.selectedCateKeys[2];
            }
            return null;
        },
        // 动态计算标题的文本
        titleText(){
            if(this.activeName == "many"){
                return "动态参数"
            }
            return "静态属性"
        }
    },    
    methods:{
        // 级联选择框变化触发该函数
        handleChange(){
            this.getParamsData();
        },
        // 监听页面发生的变化
        handleTabClick(){
            this.getParamsData();
        },
        // 获取参数的数据列表
        getParamsData(){
            // 证明选择框是不是三级分类  注意：若selectedCateKeys数组长度为3则为三级分类
            if(this.selectedCateKeys.length !== 3){
                this.selectedCateKeys = [];
                this.manyTableData = []//清空动态表格的数据
                this.onlyTableData = []//清空静态表格的数据
                return 
            }
            // 证明是三级分类
            commentGetApi.commentGet(`categories/${this.cateId}/attributes`,{sel:this.activeName}).then((res) => {
                if(res.meta.status !== 200){
                   return this.$message.error("获取参数列表失败！");
                }
                // 在刚添加新数据之前attr_vals数据为空，所以在分割之前必须要去掉前面的空格
                res.data.forEach((item) => {
                    item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
                    // 控制文本框的显示与隐藏
                    item.inputVisible = false//按钮与文本框的显示切换
                    item.inputValue = ""//文本框输入的内容
                })
                if(this.activeName == "many"){
                    this.manyTableData = res.data;
                }else{
                    this.onlyTableData = res.data;
                }
            },(err) => {
                console.log(err);
            })
        },
        // 使添加动态参数与静态属性文本显示
        addParameter(){
            let parameter = this.titleText;
            let id = this.cateId;
            Bus.$emit("showEditRoleDialog",{parameter,id,activeName:this.activeName});
        },
        // 使修改对话框显示
        showEditDialog(id){
            let parameter = this.titleText;
            let cateId = this.cateId;
            Bus.$emit("editShow",{parameter,id,cateId,activeName:this.activeName});
        },
        // 根据id删除对应的数据
        removeParameter(id){
            // 弹框询问是否删除信息
            this.$confirm('此操作将永久删除该此数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                // 如果用户确认删除，则返回一个字符串confirm
                if(res == "confirm"){
                    commentDeleteApi.commentDelete(`categories/${this.cateId}/attributes/${id}`).then((res) => {
                        if(res.meta.status !== 200){
                            return this.$message.error("数据删除失败！");
                        }
                        this.$message.success("数据删除成功!");
                        // 获取更新后数据列表
                        this.getParamsData()
                    })
                }
            },(err) => {
                // 如果用户不删除点击取消，则返回一个字符串cancel
                if(err == "cancel"){
                    return this.$message.info("您已取消删除");
                }
            })
        },
        // 文本框失去焦点 或按下enter 都会触发
        handleInputConfirm(row){//trim()去掉两侧空格
            if(row.inputValue.trim().length === 0){
                row.inputValue = '';
                row.inputVisible = false;
                return 0;
            }
            // 如果没有return，则证明输入的内容需做后续处理
            row.attr_vals.push(row.inputValue.trim());
            row.inputValue = '';
            row.inputVisible = false;
            this.saveAttrVals(row);
        },
        // 点击文本框显示，按钮消失
        showInput(row){
            row.inputVisible = true;
            // 让文本框自动获得焦点
            // $nextTick  方法的作用：当页面上元素被重新渲染之后才会执行回调函数中的代码
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus()
            });
        },
        // 删除对应参数和选项
        handleClose(i,row){
            row.attr_vals.splice(i,1);
            this.saveAttrVals(row);
        },
        saveAttrVals(row){
            commentPutApi.commentPut(`categories/${this.cateId}/attributes/${row.attr_id}`,{
                attr_name:row.attr_name,
                attr_sel:row.attr_sel,
                attr_vals:row.attr_vals.join(' ')
            }).then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("修改参数失败！");
                }
                this.$message.success("修改参数成功!");
            },(err) => {
                console.log(err)
            })
        }
    },
    mounted(){
        // 更新表格数据
        Bus.$on("updateCate",() => {
            this.getParamsData();
        })
    }
}
</script>

<style scoped>
    .cat_opt{
        margin-top: 15px 0;
    }
    .el-cascader{
        margin-top: 5px;
        width: 200px;
    }
    .el-tag{
        margin: 10px;
    }
    .input-new-tag{
        width: 120px;
    }
</style>