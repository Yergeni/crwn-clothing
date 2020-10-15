import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// import HomePage from './pages/homepage/homepage.component';
// import ShopPage from "./pages/shop/shop.component";
// import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import "./App.css";

// LAZY LOADING WITH SUSPENCE
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUpPage = lazy(() => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));


const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);

	return (
		<div>
			<Header />
			<Switch>
        {/* ERROR BOUNDARY CLASS COMPONENT TO WRAP THE ENTIRE APP TO CATCH ERRORS */}
        <ErrorBoundary>
          {/* SUSPENSE FOR LAZY LOADING IMPROVING PERFORMANCE */}
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            {/* THIS WAS EXCLUDED FOR ALLOW USER TO PAY WITHOUT LOGIN OR REGISTER  */}
            {/* <Route exact path='/checkout' 
              render={() =>
                !currentUser ? <Redirect to='/signin' /> : <CheckoutPage />
              }
            /> */}
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
			</Switch>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
