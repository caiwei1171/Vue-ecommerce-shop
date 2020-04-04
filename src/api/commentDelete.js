// 删除信息  删除分类  删除动态参数静态属性  删除商品
import request from '@/utils/request'
const commentDeleteApi = {
    commentDelete:function(url){
        return request({
            url:url,
            method:"delete"
        });
    }
}
export default commentDeleteApi;