import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Featured from '../Featured/Featured';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Home</title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
        </div>
    );
};

export default Home;