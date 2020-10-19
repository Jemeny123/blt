//二次封装axios 安装axios
import axios from 'axios'

/*
  头信息：token和数据类型
    * headers:{'Authorization' : 'sdadasfugsajgajaf6576a5af5af6asf'}
    * headers: {'Authorization' : 'sdadasfugsajgajaf6576a5af5af6asf', "Content-Type": "multipart/form-data" }
        * "multipart/form-data"  传文件/图片
        * application/json 对应POSTMAN的raw：{"input1":"xxx","input2":"ooo","remember":false} 对象
        * application/x-www-form-urlencoded : 'input1=xxx&input2=ooo&remember=false' 字符串键值对方式传给后端：node里面需要中间件处理  body-parser
    * 注意：很多工作的小伙伴，错误1：没有设置token;错误2：后端要的是x-www-form-urlencoded的数据。你传json对象过去。
    * 技术名称：
      * 重构：重新开发项目。旧项目可能是前后端分类的(拿旧项目的html/css，加上vue)；项目是混合开发的(html里面嵌入很多后端语言,可以爬页面，再写逻辑。最坏的打算：自己截图重新写页面)
      * 迭代：进公司的时候，项目做好了，补充一些功能。
      * 做好功能，提测  联调 需求评审会
      * UI:蓝湖
      * 后端：API接口
      * 产品：提需求
*/

let request = axios.create({
    baseURL:'/',//基础路径
    timeout:3000,//请求超时时间：3s；如果3s后都没有响应，我就断开请求
  
})
export default request