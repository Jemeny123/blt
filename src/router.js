import {
  HashRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import React, { lazy, Suspense } from "react";
import AuthRoute from "./permission";
const Home = lazy(() => import("./page/home/index.js"));
const Details = lazy(() => import("./page/details/index.js"));
const Searchare = lazy(() => import("./page/search/index.js"));
const List = lazy(() => import("./page/list/index.js"));
const List2 = lazy(() => import("./page/list2/index.js"));
const Brandapartment = lazy(() => import("./page/brandapartment/index.js"));
const Reg = lazy(() => import("./page/register"));
const Login = lazy(() => import("./page/login"));
const User = lazy(() => import("./page/user"));


class AllRouter extends React.Component {
  toApartment() {
    console.log(this);
  }
  render() {
    return (
      <Router>
        <Suspense fallback={<div>loading</div>}>
          <Route path="/home" exact component={Home}></Route>
          <Route path="/home/search" exact component={Searchare}></Route>
          <AuthRoute path="/details" exact component={Details}></AuthRoute>
          <Route path="/brandapartment" exact component={Brandapartment}></Route>
          <Route path="/reg" exact component={Reg}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/user" exact component={User}></Route>
          <Route path="/" exact render={() => <Redirect to="/Home" />}></Route>
          <Route path="/list" exact component={List}></Route>
          <Route path="/list2" exact component={List2}></Route>
          <Route path="/" exact component={List}></Route>
        </Suspense>
      </Router>
    );
  }
}

export default AllRouter; //withRouter
