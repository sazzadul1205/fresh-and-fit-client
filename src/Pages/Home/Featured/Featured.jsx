import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SliderCard from './SliderCard';
import icon1 from '../../../assets/Icons-Home/icon-1.png';
import icon2 from '../../../assets/Icons-Home/icon-2.png';
import icon3 from '../../../assets/Icons-Home/icon-3.png';
import icon4 from '../../../assets/Icons-Home/icon-4.png';
import icon5 from '../../../assets/Icons-Home/icon-5.png';
import icon6 from '../../../assets/Icons-Home/icon-6.png';
import icon7 from '../../../assets/Icons-Home/icon-7.png';
import icon8 from '../../../assets/Icons-Home/icon-8.png';
import Title from '../../Shared/PageTitles/Title';

const Featured = () => {
    const features = [
        {
            id: 1,
            icon: icon1,
            title: 'Custom Workout Plans',
            description: 'Get personalized workout plans tailored to your fitness goals and preferences.',
        },
        {
            id: 2,
            icon: icon2,
            title: 'Nutrition Guidance',
            description: 'Access nutrition guidance, meal plans, and dietary advice for a balanced lifestyle.',
        },
        {
            id: 3,
            icon: icon3,
            title: 'Expert Trainers',
            description: 'Train with certified fitness experts through virtual sessions and personalized guidance.',
        },
        {
            id: 4,
            icon: icon4,
            title: 'Live Fitness Classes',
            description: 'Join live streaming fitness classes for real-time interaction and motivation.',
        },
        {
            id: 5,
            icon: icon5,
            title: 'Community Support',
            description: 'Connect with a community of fitness enthusiasts, share experiences, and stay motivated.',
        },
        {
            id: 6,
            icon: icon6,
            title: 'Progress Tracking',
            description: 'Track your fitness progress with interactive charts, graphs, and milestone achievements.',
        },
        {
            id: 7,
            icon: icon7,
            title: 'Fitness Challenges',
            description: 'Participate in fun and rewarding fitness challenges to push your limits and achieve goals.',
        },
        {
            id: 8,
            icon: icon8,
            title: 'Nutrition Shop',
            description: 'Explore our online shop for fitness-friendly products, supplements, and workout gear.',
        },
    ];
    const swiperParams = {
        spaceBetween: 30,
        modules: [Pagination],
        className: "mySwiper",
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    };

    return (
        <div>
            <Title
                title={"Unleash the Power of Fitness"}
                subTitle={"Discover Our Features and Transform Your Fitness Journey"}
            />
            <Swiper {...swiperParams}>
                {features.map((feature) => (
                    <SwiperSlide key={feature.id}>
                        <SliderCard
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Featured;
