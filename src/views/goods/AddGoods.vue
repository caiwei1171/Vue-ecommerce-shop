<template>
    <div>
        <!-- 面包屑导航区域 -->
        <header-nav>
            <span slot="Manage">商品管理</span>
            <span slot="List">添加商品</span>
        </header-nav>
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 提示区域 :closable="false"隐藏删除按钮 -->
            <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
            <!-- 步骤条区域 -->
            <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <!-- tab标签栏区域 :tab-position：指定标签栏在哪一侧 label-position="top"文本在上输入框在下 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top"> 
                <!-- :before-leave切换标签前的钩子函数，若返回false或者返回promise切边reject接收，则会阻止切换 -->
                <!-- tab-click:数据改变触发该事件 -->
                <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave" @tab-click="tabClicked">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addForm.goods_price" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                            <el-cascader v-model="addForm.goods_cat" :options="catelist" :props="cateProps" @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">
                        <!-- 商品参数 -->
                        <!-- 渲染表单的item项 -->
                        <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                            <!-- 复选框组 -->
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">
                        <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">
                        <!-- action  表示图片要上传到的后台API地址 -->
                        <!-- on-preview:指定预览的事件 on-remove:点击图片后面的X触发该事件 list-type:指定图片呈现的样式 headers：绑定请求消息头 on-success:图片上传成功的钩子函数 -->
                        <el-upload :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :headers="headersObj" :on-success="handleSuccess">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">
                        <!-- 富文本编辑器组件 -->
                        <quill-editor v-model="addForm.goods_introduce"></quill-editor>
                        <!-- 添加商品的按钮 -->
                        <el-button type="primary" class="btnAdd" @click="add">添加商品</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
        <!-- 图片预览区域 -->
        <el-dialog title="图片预览" :visible.sync="previewDialogVisible" width="50%">
            <img :src="previewPath" alt="" class="previewImg">
        </el-dialog>
    </div>
</template>

<script>
// 导入lodash
import _ from 'lodash'
// 公共组件
import HeaderNav from "@/components/content/HeaderNav"
// 获取商品数据列表api commentGetApi
import commentGetApi from "@/api/commentGet.js"
// 添加商品数据api commentPostApi
import commentPostApi from "@/api/commentPost.js"
export default {
    name:"AddGoods",
    data(){
        return {
            activeIndex:'0',//所到的步骤
            addForm:{//添加商品的数据对象
                goods_name:'',
                goods_price:0,
                goods_weight:0,
                goods_number:0,   
                goods_cat: [],//商品所处分类数组
                pics:[],//图片数组
                goods_introduce:'',//商品的详情描述
                attrs:[]
            },
            addFormRules:{//商品参数 规则
                goods_name:{
                    required:true,
                    message:'请输入商品名称',
                    trigger:'blur'
                },
                goods_price:{
                    required:true,
                    message:'请输入商品价格',
                    trigger:'blur'
                },
                goods_weight:{
                    required:true,
                    message:'请输入商品重量',
                    trigger:'blur'
                },
                goods_number:{
                    required:true,
                    message:'请输入商品数量',
                    trigger:'blur'
                },
                goods_cat:{
                    required:true,
                    message:'请选择商品分类',
                    trigger:'blur'
                }
            },
            catelist:[],//商品分类数据
            cateProps:{
                label:'cat_name',
                value:'cat_id',
                children:'children',
                expandTrigger:'hover'
            },
            manyTableData:[],//动态参数列表数据
            onlyTableData:[],//静态属性列表数据
            uploadUrl:"http://127.0.0.1:8888/api/private/v1/upload",//图片上传地址
            headersObj:{//图片上传组件的headers请求头对象
                Authorization:sessionStorage.getItem("token")
            },
            previewPath:"",
            previewDialogVisible:false,//使图片预览显示
        }
    },
    components:{
        // 公共组件
        HeaderNav
    },
    created(){
        this.getCateList();
    },
    methods:{
        getCateList(){
            commentGetApi.commentGet("categories").then((res) => {
                if(res.meta.status !== 200){
                    return this.$message.error("获取商品分类数据失败!");
                }else{
                    this.catelist = res.data;
                    return this.$message.success("获取商品分类数据成功!");
                }
            },(err) => {
                console.log(err);
            });
        },
        // 级联选择器变化触发该函数
        handleChange(){   
            if(this.addForm.goods_cat.length !== 3){
                this.addForm.goods_cat = [];
            }
        },
        // 判断是否阻止标签业切换
        beforeTabLeave(activeName,oldActiveName){//第一个参数：即将进入的标签页，第二个参数：即将进入的标签页
            if(oldActiveName === '0' && this.addForm.goods_cat.length !== 3){
                this.$message.error('请先选择商品分类');
                return false;
            }
        },
        // 根据商品名称来判断当前处于哪个面板
        tabClicked(){
            if(this.activeIndex === '1'){//证明访问的是动态参数面板
                commentGetApi.commentGet(`categories/${this.cateId}/attributes/`,{sel:"many"}).then((res) => {
                    if(res.meta.status !== 200){
                        return this.$message.error("获取动态参数列表失败!");
                    }else{
                        res.data.forEach(item => {
                            item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
                        })
                        this.manyTableData = res.data;
                    }
                },(err) => {
                    console.log(err);
                });
            }else if(this.activeIndex === '2'){//证明访问的是静态属性面板
                commentGetApi.commentGet(`categories/${this.cateId}/attributes/`,{sel:"only"}).then((res) => {
                    if(res.meta.status !== 200){
                        return this.$message.error("获取静态属性列表失败!");
                    }else{
                        this.onlyTableData = res.data;
                    }
                },(err) => {
                    console.log(err);
                });
            }
        },
        // 处理图片预览效果
        handlePreview(file){
            this.previewPath = file.response.data.url;
            this.previewDialogVisible = true;
        },
        // 处理移除图片的操作
        handleRemove(file){
            // 1.获取将要删除的图片临时路径
            const filePath = file.response.data.temp_path;
            // 2.从pic数组中，找到这个图片对应的索引值
            const i = this.addForm.pics.findIndex(x => x.pic === filePath);
            // 3.调用数组中的splice方法。把图片信息对象，从pics数组中移除
            this.addForm.pics.splice(i,1);
        },
        // 监听图片上传成功事件
        handleSuccess(response){//handleSuccess:服务器返回的对象
            // 1.拼接得到一个图片信息对象
            const picInfo = {pic:response.data.tmp_path};
            // 2.将图片信息放到pics数组中
            this.addForm.pics.push(picInfo);
        },
        add(){
            this.$refs.addFormRef.validate((valid) => {
                if(!valid){
                    return this.$message.error('请填写必要的表单项！');
                }
                //  执行添加的业务逻辑
                // lodash包  cloneDeep(obj)深拷贝
                const form = _.cloneDeep(this.addForm);
                form.goods_cat = form.goods_cat.join(',');
                // 处理动态参数
                this.manyTableData.forEach(item => {
                    const newInfo = {
                        attr_id: item.attr_id,
                        attr_value: item.attr_vals.join(' ')
                    }
                    this.addForm.attrs.push(newInfo)
                })
                // 处理静态属性
                this.onlyTableData.forEach(item => {
                    const newInfo = { 
                        attr_id: item.attr_id, 
                        attr_value: item.attr_vals 
                    }
                    this.addForm.attrs.push(newInfo)
                })
                form.attrs = this.addForm.attrs;
                // 发起请求，添加商品  且商品名称，必须唯一
                commentPostApi.commentPost(`goods`,form).then((res) => {
                    console.log(res)
                    if(res.meta.status !== 201){
                        return this.$message.error("添加商品失败!");
                    }else{
                        this.$message.success("添加商品成功!");
                        this.$router.push('/goods');
                    }
                },(err) => {
                    console.log(err);
                });
            });
        }
    },
    computed:{
        // 获取三级商品分类ID
        cateId(){
            if(this.addForm.goods_cat.length === 3){
                return this.addForm.goods_cat[2];
            }
            return null;
        }
    }
}
</script>

<style>
    .el-step__title{
        font-size: 12px;
    }
    .el-checkbox{
        margin: 0 5px 0 0 !important;
    }
    .previewImg{
        width: 100%;
    }
    .btnAdd {
        margin-top: 10px;
    }
</style>