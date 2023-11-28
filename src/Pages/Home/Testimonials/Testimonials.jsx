import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import DefaultAvatar from "../../../assets/DefaultAvatar.jpeg";
import Title from '../../Shared/PageTitles/Title';
import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Orbitals } from 'react-spinners-css';

const Testimonials = () => {
    const axiosPublic = useAxiosPublic();

    const { data: testimonials = [], isLoading: isLoadingTestimonials } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/testimonials`);
            return res.data;
        },
    });

    if (isLoadingTestimonials) {
        return <div className="text-center"><Orbitals color="#FF0000" size={32}/></div>
    }

    return (
        <div>
            <Title title='Testimonials' />
            <Swiper
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                        <div className="p-6 py-20 bg-[#7752FE]">
                            <div className="avatar flex gap-5">
                                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mb-2">
                                    <img src={DefaultAvatar} alt={`Avatar of ${testimonial.name}`} />
                                </div>
                                <p className="text-gray-800 font-semibold text-3xl mt-5">{testimonial.name}</p>
                            </div>
                            <p className="text-white mb-6 ml-4 mt-10">{testimonial.quote}</p>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={testimonial.rating}
                                readOnly
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonials;
