// 查询信息  商品分类  查询父级分类 查询商品分类 获取级联菜单第三个参数Id 查询动态参数或静态属性 商品列表数据
import request from '@/utils/request'
const commentGetApi = {
    commentGet:function(url,r = {}){
        return request({
            url:url,
            method:"get",
            params:r
        })
    }
}
export default commentGetApi;