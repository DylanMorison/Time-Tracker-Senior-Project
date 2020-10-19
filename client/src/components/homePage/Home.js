import React from 'react';
import HomeSection from './HomeSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';

function Home() {
	return (
		<>
			<HomeSection {...homeObjOne} />
			<HomeSection {...homeObjThree} />
			<HomeSection {...homeObjTwo} />
			<HomeSection {...homeObjFour} />
		</>
	);
}

export default Home;
