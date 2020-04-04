import Vue from 'vue'
// 引入element-ui及相应css并使用
import 'element-ui/lib/theme-chalk/index.css';
import {
    Button,Form,FormItem,Input,Header,Container,Aside,Main,Menu,Submenu,MenuItemGroup,MenuItem,
    Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Dialog,
    MessageBox,Tag,Tree,Select,Option,Cascader,Alert,Tabs,TabPane,Steps,Step,Checkbox,CheckboxGroup,
    Upload
  } from "element-ui"
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Header)
  Vue.use(Container)
  Vue.use(Aside)
  Vue.use(Main)
  Vue.use(Menu)
  Vue.use(Submenu)
  Vue.use(MenuItemGroup)
  Vue.use(MenuItem)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  Vue.use(Card)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Switch)
  Vue.use(Tooltip)
  Vue.use(Pagination)
  Vue.use(Dialog)
  Vue.use(Tag)
  Vue.use(Tree)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Cascader)
  Vue.use(Alert)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Steps)
  Vue.use(Step)
  Vue.use(Checkbox)
  Vue.use(CheckboxGroup)
  Vue.use(Upload)

import Timeline from './timeline/index.js'
import TimelineItem from './timeline-item/index.js'
Vue.use(Timeline)
Vue.use(TimelineItem)
  
  // 导入弹框提示
  import {Message} from "element-ui"
  Vue.prototype.$message = Message;//message是自定义属性
  Vue.prototype.$confirm = MessageBox.confirm;//MessageBox：他不用Vue.use()使用，直接挂载到vue原型上