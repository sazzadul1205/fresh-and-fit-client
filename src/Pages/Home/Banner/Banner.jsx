import { motion } from "framer-motion";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import banner1 from '../../../assets/Banner/banner-1.jpeg';
import banner2 from '../../../assets/Banner/banner-2.jpeg';
import banner3 from '../../../assets/Banner/banner-3.jpg';
import banner4 from '../../../assets/Banner/banner-4.jpg';
import banner5 from '../../../assets/Banner/banner-5.jpeg';

const Banner = () => {
    const banners = [banner1, banner2, banner3, banner4, banner5];

    return (
        <div>
            <Carousel>
                {banners.map((banner, index) => (
                    <div key={index} className="relative">
                        <img src={banner} alt={`Banner ${index + 1}`} />
                        <div className="md:absolute lg:bottom-72 md:bottom-40 lg:left-40 md:left-3 text-center text-white bg-black lg:p-10 md:p-2 opacity-80">
                            <h1 className="text-xl lg:text-3xl font-bold mb-2">Transform Your Fitness Journey</h1>
                            <p className="text-md lg:text-lg mb-4">Unlock a healthier, stronger you with our expert-led fitness classes and personalized training sessions.</p>
                            <motion.button
                                className="bg-red-500 btn"
                                whileHover={{ scale: 1.2}}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >Explore Classes</motion.button>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
