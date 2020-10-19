import React, { lazy, Suspense } from "react";
import { withRouter } from "react-router-dom";
import request from "../../utils/request.js";
import brapart from "../../assets/css/brapart.module.scss";
import Mylist from "../../components/list";
const Mylist1 = lazy(() => import("../../components/list"));
const Goodsshow1 = lazy(() => import("../../components/goodsshow"));
const Goodslist1 = lazy(() => import("../../components/goodslist"));
// const List = lazy(() => import("./page/list/index.js"));
// import Goodsshow from "../../components/goodsshow";
// import Goodslist from "../../components/goodslist";
class Brandapartment extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: [],
      rentapart: [],
    };
  }
  componentDidMount() {
    this.getbrandapartment();
    this.getexcellentitems();
  }
  //返回首页
  toHome() {
    this.props.history.push("/home");
  }
  //获取旗舰店数据
  async getbrandapartment() {
    try {
      let p = await request({
        method: "get",
        url: "/dev-baletuqweqwe/gz/companyshopapi/index",
        params: {
          entrance: "5",
        },
      });
      console.log(p);
      p.data.result.good_shops.map((item) => {
        this.state.brand.push(item);
      });
      this.setState(
        {
          brand: this.state.brand,
        },
        () => {
          console.log(this.state.brand);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  //获取公寓数据
  async getexcellentitems() {
    try {
      let p = await request({
        method: "get",
        url: "/dev-baletuqweqwe/gz/Zhaofangapi/index",
        params: {
          param: "/c3/",
          p: "1",
          entrance: "5",
          city_id: "1",
          kill_crawler: "4935d32ad5e097144870f21d62424c89",
        },
      });
      // console.log(p.data.result.house_list);
      p.data.result.house_list.map((item, index) => {
        this.state.rentapart.push(item);
      });
      this.setState(
        {
          rentapart: this.state.rentapart,
        },
        () => {
          console.log(this.state.rentapart);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Suspense fallback={<div>loading。。。。。。</div>}>
          <Mylist1 toHome={this.toHome.bind(this)}></Mylist1>
          <Goodsshow1 brand={this.state.brand}></Goodsshow1>
          <Goodslist1 romdata={this.state.rentapart}></Goodslist1>
        </Suspense>
        {/* <div>Brandapartment</div>
        <button onClick={this.getbrandapartment.bind(this)}>
          getbrandapartment
        </button>
        <br />
        <button onClick={this.getexcellentitems.bind(this)}>
          getexcellentitems
        </button> */}
        {/* <Mylist toHome={this.toHome.bind(this)}></Mylist>
        <Goodsshow brand={this.state.brand}></Goodsshow>
        <Goodslist romdata={this.state.rentapart}></Goodslist> */}
      </React.Fragment>
    );
  }
}

export default Brandapartment;
