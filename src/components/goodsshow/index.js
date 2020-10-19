import React from "react";
import ReactDOM from "react-dom";
import request from "../../utils/request.js";
import brapart from "../../assets/css/brapart.module.scss";
function Goodsshow(props) {
  return (
    <React.Fragment>
      {props.brand.length != 0 &&
        props.brand.map((item, index) => {
          return (
            <div className={brapart.unitStore} key={index}>
              <div className={brapart.unitStore_title}>
                <div className={brapart.store_logo}>
                  <img src={item.logo_url} className={brapart.logo_img} />
                </div>
                <div className={brapart.store_mes}>
                  <h2 className={brapart.store_name}>{item.shop_name}</h2>
                  <p className={brapart.store_traffic}>{item.address}</p>
                </div>
                <div className={brapart.store_link}>进店</div>
              </div>
              <ul className={brapart.unitList}>
                {item.house_list.map((ite, ind) => {
                  return (
                    <li className={brapart.unitList_li} key={ind}>
                      <div className={brapart.unitList_img}>
                        <img
                          src={ite.house_main_image}
                          className={brapart.unitList_imgdeta}
                        />
                      </div>
                      <h2 className={brapart.unitList_type}>
                        {ite.house_attr_val}
                      </h2>
                      <h3 className={brapart.unitList_price}>
                        ￥{ite.month_rent}
                      </h3>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </React.Fragment>
  );
}
export default Goodsshow;

// {this.state.brand.length &&
//     this.state.brand.map((item, index) => {
//       return (
//         <div className={brapart.unitStore} key={index}>
//           <div className={brapart.unitStore_title}>
//             <div className={brapart.store_logo}>
//               <img src={item.logo_url} className={brapart.logo_img} />
//             </div>
//             <div className={brapart.store_mes}>
//               <h2 className={brapart.store_name}>{item.shop_name}</h2>
//               <p className={brapart.store_traffic}>{item.address}</p>
//             </div>
//             <div className={brapart.store_link}>进店</div>
//           </div>
//           <ul className={brapart.unitList}>
//             {item.house_list.map((ite, ind) => {
//               return (
//                 <li className={brapart.unitList_li} key={ind}>
//                   <div className={brapart.unitList_img}>
//                     <img
//                       src={ite.house_main_image}
//                       className={brapart.unitList_imgdeta}
//                     />
//                   </div>
//                   <h2 className={brapart.unitList_type}>
//                     {ite.house_attr_val}
//                   </h2>
//                   <h3 className={brapart.unitList_price}>
//                     ￥{ite.month_rent}
//                   </h3>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       );
//     })}
