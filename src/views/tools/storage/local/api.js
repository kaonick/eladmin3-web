// api.js

// 如下为mock请求，实际开发中需要替换为你的真实后端请求方法
import {requestForMock} from "@/api/service";
// import {mock} from "@/api/service";
// 请求真实后端
// import { request } from "../../../api/service";

const request = requestForMock;
// const request = mock;

const apiPrefix ="/MyFirstCrud";// 'http://localhost:5000/api';//

export function GetList(query) {
    return request({
        url: apiPrefix + "/page",
        method: "get",
        data: query,
    });
}

export function AddObj(obj) {
    return request({
        url: apiPrefix + "/add",
        method: "post",
        data: obj,
    });
}

export function UpdateObj(obj) {
    return request({
        url: apiPrefix + "/update",
        method: "post",
        data: obj,
    });
}

export function DelObj(id) {
    return request({
        url: apiPrefix + "/delete",
        method: "post",
        params: {id},
    });
}

export function GetObj(id) {
    return request({
        url: apiPrefix + "/info",
        method: "get",
        params: {id},
    });
}