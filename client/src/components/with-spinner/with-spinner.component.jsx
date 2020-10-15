import React from "react";

import Spinner from "../spinner/spinner.component";

// HOC that wraps a compnent and show a loading icon if the component is not ready
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
	return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
