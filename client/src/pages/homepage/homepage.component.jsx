import React from "react";

import Directory from "../../components/directory/directory.component";

import { HomePageContainer } from "./homepage.styles";

const HomePage = () => {
  // To test error boundary
	// throw Error;
	return (
		<HomePageContainer>
			<Directory />
		</HomePageContainer>
	);
};

export default HomePage;
