import {GridLayout} from '../components/layout/GridLayout';
import {HeroTitle} from '../components/hero/HeroTitle';
import {MenuItem} from "../components/navigation/MenuSection.tsx";
import { DynamicGhostText } from "../components/text/DynamicShadowText.tsx";
import {BaseballScene} from "../components/3d/Baseball.tsx";
import Banner from "../components/common/Banner.tsx";

const MainPage = () => {
    return (
        <>
            <Banner />

            <BaseballScene/>
            <GridLayout>
                <HeroTitle/>

                <>
                    <MenuItem to="/records/2024" title="2024 Records"/>
                    <MenuItem to="/predictions/2025" title="2025 Predictions"/>
                    <MenuItem to="/stats" title="Sabermetrics"/>
                </>

                <DynamicGhostText
                    text="DIAMONDDATA"
                    className="font-syne flex justify-center items-center text-white text-4xl md:text-5xl font-extrabold tracking-wide"
                    maxDistance={25}
                    layers={[
                        {distance: 0.25, opacity: 0.4},
                        {distance: 0.5, opacity: 0.3},
                        {distance: 0.75, opacity: 0.2},
                        {distance: 1, opacity: 0.1}
                    ]}
                />

            </GridLayout>
        </>
    );
};

export default MainPage;
