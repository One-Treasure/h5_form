import req from './http';                 //连接接口文件
export const POSTTREEDATA = function (e) {
    return req('post', '/list/signup', e)    //post方法以及传参    qwe是字段   e是参数
}
export const three = function (e) {
    return req('get', '/')  //get方法以及传参      qwe是字段   e是参数
}