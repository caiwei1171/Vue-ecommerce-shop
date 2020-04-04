// 添加角色 登录 添加分类数据 添加动态参数静态属性
import request from '@/utils/request'
const commentPostApi = {
    commentPost:function(url,r = {}){
        return request({
            url:url,
            method:"post",
            data:r
        });
    }
}
export default commentPostApi;