// 修改信息的保存 修改分类名称的保存  静态属性与动态参数的保存 将下拉扩展菜单添加的数据保存至数据库
import request from '@/utils/request'
const commentPutApi = {
    commentPut:function(url,r = {}){
        return request({
            url:url,
            method:"put",
            data:r
        });
    }
}
export default commentPutApi;