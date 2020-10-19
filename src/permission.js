//路由守卫
import React from 'react'
import { Route, Redirect } from "react-router-dom";
import {getCookie} from './untils/cookieTools';
import request from '../src/untils/request'

function AuthRout({component:Compenent,...rest}){
    return(
        <Route
            {...rest}
            render={(props)=>{
                let token = getCookie('token')
                console.log(token);
                let next = ''
                if (token) {
                    //获取token进行校验 ajax
                    next=<Compenent {...props}></Compenent>//先通过再判断进行拦截，否则异步原因页面可能会空白
                    request({
                      method: "get",
                      url: "/dev-usepswreact/user/verify",
                      params:{
                        token:token
                      },
                    }).then((p)=>{
                      console.log(p);
                      if (!p.data.flag) {
                        props.history.push('./login')
                      }
                    })
                }else{
                    next = (
                        <Redirect
                            to={{
                                pathname:'/login',
                                state:{from:props.location}
                            }}
                        ></Redirect>
                    )
                }
                return next
            }}
        ></Route>
    )
}
export default AuthRout