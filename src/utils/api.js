import req from './http';                 //连接接口文件
export const GETTREEDATA = function (e) {
    return req('post', '/251280/123', { qwe: e })    //post方法以及传参    qwe是字段   e是参数
}
export const three = function (e) {
    return req('get', '/')  //get方法以及传参      qwe是字段   e是参数
}