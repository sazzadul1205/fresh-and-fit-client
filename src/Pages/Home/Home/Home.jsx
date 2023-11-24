import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Featured from '../Featured/Featured';
import About from '../About/About';
import FeaturedClasses from '../FeaturedClasses/FeaturedClasses';
import Testimonials from '../Testimonials/Testimonials';
import Newsletter from '../Newsletter/Newsletter';
import Team from '../Team/Team';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Home</title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <About></About>
            <FeaturedClasses></FeaturedClasses>
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
            <Team></Team>
        </div>
    );
};

export default Home;