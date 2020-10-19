import React from "react";
import { withRouter } from "react-router-dom";
import '../../assets/common.css'
import style from '../../assets/css/details.module.scss'
import '../../assets/font_b8rncfkct5/iconfont.css'
import { Modal, Button, WingBlank, WhiteSpace, Toast, Carousel, List, Tabs } from 'antd-mobile';
import boots from '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import request from '../../untils/request'
import {getCookie} from '../../untils/cookieTools'
import '../../assets/font3/iconfont.css'

const prompt = Modal.prompt;
const tabs = [
  { title: '地址' },
  { title: '交通' },
  { title: '周边配套' },
];
class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      data:[],
      img: ['1', '2', '3'],
      imgHeight: 176,
    };
  }
  
  //功能：进入页面就立马执行，获取数据
  async getData() {
    console.log(111);
    try {
      let p = await request({
        method: "get",
        url: "/dev-baletuqweqwe/gz/houseapi/indexNew",
        params: {
          house_id: getCookie('house_id'),
          kill_crawler: getCookie('kill_crawler'),
        },
      });
      console.log(p);
      this.setState({
        data:[p]
      })
      console.log(this.state.data[0].data.result.info_test);
      // console.log('222',this.state.data[0].data.result.agency_house_photo_info)
      let arr = this.state.data[0].data.result.agency_house_photo_info
      let arr2 = []
      arr.forEach((item)=>{
        // console.log(item.src);
        arr2.push(item.src)
      })
      this.setState({
        img:arr2
      })


    } catch (err) {
      console.log(err);
    }
  }

  
  //功能：进入页面就立马执行，获取数据
  // 轮播图
  componentDidMount() {
    // console.log(222);
    this.getData()
    // setTimeout(() => {
    //   this.setState({
    //     img: ['https://cdn.baletoo.cn/Uploads/housephoto/6117/6116544/oss_5db00bf753444.jpg@!blth', 'https://cdn.baletoo.cn/Uploads/housephoto/6117/6116544/oss_5db00bf778782.jpg@!blth', 'https://cdn.baletoo.cn/Uploads/housephoto/6117/6116544/oss_5db00bf7c3876.jpg@!blth'],
    //   });
    // }, 100);
  }

  // con
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  render() {
    return (
      <React.Fragment>

        {/* box */}
        <div className={style.box}>

          {/* main */}
          <div className={style.main}>

            {/* 轮播图 */}
            <WingBlank style={{ margin: '0' }}>
              <Carousel
                autoplay={false}
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index =>
                  console.log('slide to', index)
                  // console.log(val)
                }
              >
                {this.state.img.map(val => (
                  // console.log('val',val),
                  <a
                    key={val}
                    // href="http://www.alipay.com"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                  >
                    <img
                      src={val}
                      alt=""
                      style={{ width: '100%', verticalAlign: 'top' }}
                      onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({ imgHeight: 'auto' });
                      }}
                    />
                  </a>
                ))}
              </Carousel>
            </WingBlank>
            {/* 后退按钮 */}
            <div className={style.logout}>
              <span className='iconfont icon-zuojiantou-01'></span>
            </div>

            {/* con */}
            <div className={style.con}>
              <h2>整租 - 名门大厦豪名阁</h2>
              <div className={style.con_top}>
                <span>近地铁</span>
                <span>独卫</span>
                <span>电梯房</span>
                <span>非一楼</span>
              </div>
              <h3>
                {this.state.data.length&&this.state.data[0].data.result.price}元/月
                <Button className={style.con_but} onClick={this.showModal('modal2')}>付款方式 &gt;</Button>
                <WhiteSpace />
                <Modal
                  style={{ height: '350px' }}
                  popup
                  visible={this.state.modal2}
                  onClose={this.onClose('modal2')}
                  animationType="slide-up"
                // afterClose={() => { alert('afterClose'); }}
                >
                  <h5 style={{ fontSize: '19px', color: ' #000', padding: '10px 0 20px 0', borderBottom: '1px solid #ccc' }}>费用详情</h5>
                  {/* 租金及电话咨询 */}
                  <div style={{ display: 'block', padding: '5px 15px', marginBottom: '60px' }}>
                    <h4 style={{ textAlign: 'left', color: ' #000', display: "block" }}>
                      租金
                      <span style={{ fontSize: '12px', color: '#b3b3b3' }}> 如有疑问，请电话咨询</span>
                    </h4>
                    {/* 押金及押金金额 */}
                    <p style={{ textAlign: 'left', color: '#505050', padding: "6px", background: '#f6f6f6', fontSize: '14px', margin: '0' }}>押金
                      <span style={{ float: 'right', color: '#505050' }}>
                        {this.state.data.length&&this.state.data[0].data.result.info_test.pay_info.payDetail[0].deposit}
                      </span>
                    </p>
                    {/* 压一付一及其金额 */}
                    <p style={{ textAlign: 'left', color: '#505050', padding: "6px", background: '#fafafa', fontSize: '14px', margin: '0' }}>
                      {this.state.data.length&&this.state.data[0].data.result.info_test.pay_info.payDetail[0].title}
                      <span style={{ float: 'right', color: '#505050' }}>
                        {this.state.data.length&&this.state.data[0].data.result.info_test.pay_info.payDetail[0].rent}
                      </span>
                    </p>
                    {/* 首期共支付及其金额 */}
                    <p style={{ textAlign: 'left', color: '#ee3943', padding: "6px", background: '#f6f6f6', fontSize: '14px', margin: '0', fontWeight: '700' }}>
                      {this.state.data.length&&this.state.data[0].data.result.info_test.pay_info.payDetail[0].totaltitle}
                      <span style={{ float: 'right', color: '#ee3943' }}>
                       {this.state.data.length&&this.state.data[0].data.result.info_test.pay_info.payDetail[0].totalrent}
                      </span> 
                    </p>
                  </div>
                  <List.Item style={{}}>
                    <Button style={{ background: '#ff4b63', border: '#ff4b63' }} type="primary" onClick={this.onClose('modal2')}>我知道了</Button>
                  </List.Item>
                </Modal>
              </h3>
              <div className={style.con_top2}>
                <div>
                  <p>户型</p>
                  <span>1室0厅1卫</span>
                </div>
                <div>
                  <p>面积</p>
                  <span>45M²</span>
                </div>
                <div>
                  <p>楼层</p>
                  <span>电梯24/31层</span>
                </div>
              </div>
            </div>

            {/* imgbox */}
            <div className={style.imgbox}>
              <img src='//js.baletoo.cn/static/m/images/banner_serve.png'></img>
            </div>

            {/* show */}
            <div className={style.show}>
              <h2>嘉裕礼顿阳光公寓</h2>
              <div>
                <WhiteSpace />
                <Tabs
                  tabBarActiveTextColor='red'
                  // tabBarUnderlineStyle={'red'}
                  tabs={tabs} initialPage={2} animated={false} useOnPan={false}>
                  {/* 地址 */}
                  <div style={{ display: 'block', alignItems: 'center', justifyContent: 'center', height: '260px', backgroundColor: '#fff' }}>
                    <div className={style.show_imgbox} style={{}}>
                      <img src={'https://restapi.amap.com/v3/staticmap?location=113.317842,23.120743&zoom=17&size=750*400&markers=large,,A:113.317842,23.120743&key=73a97630aa5f727e062924d1cfd691b3&scale=2'}></img>
                    </div>
                    <div className={style.show_bot}>
                      <p>{this.state.data.length&&(this.state.data[0].data.result.info_test.fname+' '+this.state.data[0].data.result.info_test.name+' '+this.state.data[0].data.result.info_test.address)}</p>
                    </div>
                  </div>
                  {/* 交通 */}
                  <div style={{ display: 'block', alignItems: 'center', justifyContent: 'center', height: '260px', backgroundColor: '#fff' }}>
                    <div className={style.show_imgbox} style={{}}>
                      <img src={'https://restapi.amap.com/v3/staticmap?location=113.317842,23.120743&zoom=17&size=750*400&markers=large,,A:113.317842,23.120743&key=73a97630aa5f727e062924d1cfd691b3&scale=2'}></img>
                    </div>
                    <div className={style.show_bot}>
                      <p>{this.state.data.length&&(this.state.data[0].data.result.info_test.bus_desc)}</p>
                    </div>
                  </div>
                  {/* 周边配套 */}
                  <div style={{ display: 'block', alignItems: 'center', justifyContent: 'center', height: '260px', backgroundColor: '#fff' }}>
                    <div className={style.show_imgbox}>
                      <img src={'https://restapi.amap.com/v3/staticmap?location=113.317842,23.120743&zoom=17&size=750*400&markers=large,,A:113.317842,23.120743&key=73a97630aa5f727e062924d1cfd691b3&scale=2'}></img>
                    </div>
                    <div className={style.show_bot}>
                      <p>饮食：{this.state.data.length&&(this.state.data[0].data.result.info_test.foods)}</p>
                      <p>购物：{this.state.data.length&&(this.state.data[0].data.result.info_test.shops)}</p>
                      <p>生活：{this.state.data.length&&(this.state.data[0].data.result.info_test.lives)}</p>
                    </div>
                  </div>
                </Tabs>
                <WhiteSpace />
              </div>
            </div>


          </div>
        </div>

        {/* kong */}
        <div className={style.kong}></div>

        {/* footers */}
        <div className={style.footer}>
          <div className={style.footer_left}>
            <span className="iconfont icon-shoucang"></span>
            <p>收藏</p>
          </div>
          <Button onClick={() => prompt('预约看房', '*请填写以下信息，巴乐兔管家会尽快联系你', [
            { text: '取消' },
            { text: '确定', onPress: value => console.log(`输入的内容:${value}`) },
          ], 'default')}
          >预约看房</Button>
          <Button>电话管家</Button>

        </div>

      </React.Fragment>
    );
  }
}

export default withRouter(Details);
