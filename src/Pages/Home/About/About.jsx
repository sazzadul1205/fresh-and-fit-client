import Title from "../../Shared/PageTitles/Title";
import icon from "../../../assets/about-icon.avif"

const About = () => {
    return (
        <div>
            <section className="py-16">
                <div className="container mx-auto">
                    <Title title="About Our Fitness Journey" />
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 mt-8">
                        <div className="md:w-1/2">
                            <img
                                src={icon}
                                alt="About Our Fitness Journey"
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-xl leading-relaxed mb-6">
                                At FitnessHub, we are passionate about helping you achieve your
                                fitness goals and lead a healthier lifestyle. Our journey began
                                with a simple belief – that everyone deserves access to quality
                                fitness resources and expert guidance.
                            </p>
                            <p className="text-xl leading-relaxed mb-6">
                                Our team of certified fitness experts is dedicated to providing you with
                                personalized workout plans tailored to your unique fitness goals and
                                preferences. We understand that each fitness journey is different, and we
                                are here to guide you every step of the way.
                            </p>
                            <p className="text-xl leading-relaxed">
                                Join us on this fitness adventure, where we provide personalized
                                workout plans, expert trainers, live fitness classes, and a
                                supportive community to help you stay motivated and achieve your
                                fitness milestones.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;