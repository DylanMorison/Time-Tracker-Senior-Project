import React, { useEffect } from "react";
import HomeSection from "./HomeSection";
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from "./Data";
import Footer from "../Footer/Footer";
import { connect } from "react-redux";
import { updateUserRoom } from "../../actions/index";

function Home({ updateUserRoom }) {
	useEffect(() => {
		updateUserRoom("Home");
	}, []);

	return (
		<>
			<HomeSection {...homeObjOne} />
			<HomeSection {...homeObjThree} />
			<HomeSection {...homeObjTwo} />
			<HomeSection {...homeObjFour} />
			<Footer />
		</>
	);
}

const mapStateToProps = () => {
	return {};
};

export default connect(mapStateToProps, { updateUserRoom })(Home);
