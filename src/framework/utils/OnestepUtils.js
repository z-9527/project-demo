import {Form} from 'antd'

/**
 * 多条件分页
 * @param temPage
 * @param pagination
 * @param searchFields
 * @returns {{}}
 */
export const handleSeerchAndPage = (temPage, pagination, searchFields) => {
    if (temPage) {
        temPage--
    } else if (pagination.page) {
        temPage = pagination.page - 1
    } else {
        temPage = 0
    }
    // 构建查询参数
    let search = {}
    Object.keys(searchFields).forEach(key => {
        search[`search.${key}`] = searchFields[key].value ? searchFields[key].value : ((searchFields[key]+'') ? (searchFields[key]+'') : '')
    })
    search.page = temPage
    search.size = 10
    return search
}
/**
 * 构造后台Map
 * @param pram
 * @returns {{}}
 */
export const searchMap = (param) => {
    let search = {}
    Object.keys(param).forEach(key => {
        search[`search.${key}`] = param[key].value ? param[key].value : (param[key] ? param[key] : '')
    })
    return search
}
/**
 * 平行tree结构取ids
 * @param node
 * @returns {Array}
 */
export const getTreeIds = (node) => {
    var ids = []
    for (var i = 0; i < node.length; i++) {
        ids.push(node[i].id.toString())
        ids = ids.concat(getTreeIds(node[i].children))
    }
    return ids
}
/**
 * {xxx：123} to {xxx:{value:123}}
 * @param obj
 * @returns {{}}
 */
export const objToValueObj = (obj) => {
    let target = {}
    Object.keys(obj).forEach(key => {
        target[`${key}`] = {value: obj[`${key}`]}
    })
    return target
}

/**
 * {xxx:{value:123}} to {xxx：123}
 * @param obj
 * @returns {{}}
 * @constructor
 */
export const ValueObjToObj = (obj) => {
    let target = {}
    Object.keys(obj).forEach(key => {
        target[`${key}`] = obj[`${key}`].value
    })
    return target
}

/**
 * 将属性转化为表单可用属性
 * @param obj
 * @returns {{}}
 */
export const objToForm = (obj) => {
    let target = {}
    Object.keys(obj).forEach(key => {
        target[`${key}`] = Form.createFormField({value: obj[`${key}`]})
    })
    return target
}

/**
 * 将回复的树转换为一个列表
 * @param arr,arr
 * @returns
 */
export function getReplyList(children, list, commented) {
    if (!Array.isArray(children)) {
        return
    }
    children.forEach(item => {
        const obj = {...item, commented: commented}
        list.push(obj)
        getReplyList(item.children, list, item.senderUserName)
    })
}

/**
 * 将对象转换为键值对拼接到url里
 */
export function query(data) {
    var queryStr = '';
    for (var [key, value] of Object.entries(data)) {
        if (value === undefined) {
            continue
        }
        queryStr += `&search.${key}=${value}`;
    }
    return queryStr ? queryStr.substring(1) : '';
}

/**
 * 查询参数对象属性添加search
 * @param obj
 * @returns {{}}
 */
export function formatParams(obj){
    let params = {}
    for(let [key,value] of Object.entries(obj)){
        if(value){
            params[`search.${key}`] = value
        }
    }
    return params
}