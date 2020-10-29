import React from 'react';
import HomeSection from './HomeSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import Footer from '../Footer/Footer';


function Home() {
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

export default Home;
