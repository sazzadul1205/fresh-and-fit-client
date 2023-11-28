import Title from "../../../Pages/Shared/PageTitles/Title";
import avatar1 from "../../../assets/defaultTrainer/trainer-1.avif"
import avatar2 from "../../../assets/defaultTrainer/trainer-2.avif"
import avatar3 from "../../../assets/defaultTrainer/trainer-3.avif"


const AboutUsPage = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'John Doe',
            position: 'Fitness Trainer',
            bio: 'Certified fitness trainer with 10 years of experience. Specializes in strength training and weight management.',
            image: avatar1,
        },
        {
            id: 2,
            name: 'Jane Smith',
            position: 'Yoga Instructor',
            bio: 'Experienced yoga instructor passionate about promoting physical and mental well-being through yoga practice.',
            image: avatar2,
        },
        {
            id: 3,
            name: 'Alex Johnson',
            position: 'Nutritionist',
            bio: 'Registered nutritionist dedicated to helping clients achieve their health goals through personalized dietary plans.',
            image: avatar3,
        },
    ];
    return (
        <div>
            <Title title={"About Us"} />
            <div className="mx-10">
                <section className="bg-gray-800 text-white py-20">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-4">Who We Are</h2>
                        <p className="text-lg">
                            Welcome to Fresh & Fit Co, where fitness is king! We are a team of dedicated individuals passionate about revolutionizing the fitness industry. Our mission is to establish fitness as an integral part of everyone's lifestyle. At Fresh & Fit Co, we believe that a healthy and fit life leads to a happier and more fulfilling existence.
                        </p>
                    </div>
                </section>
                <section className="py-16">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Our Story</h2>
                        <p className="text-lg">
                            Fresh & Fit Co began its journey in 2023 with the vision to democratize fitness and make it accessible to all. Founded by Sazzadul Islam, our company embarked on a mission to redefine the fitness landscape. The early days were filled with challenges, but our commitment to learning and growth remained unwavering.
                        </p>
                        <p className="text-lg">
                            One of our key achievements is the dedication to learning web development in just six months. This struggle reflects our core value: "Fitness is King, Learning is Key." We believe that just as physical fitness is essential, continuous learning is paramount for personal and professional development.
                        </p>
                        <p className="text-lg">
                            As we reflect on our journey, we stand proud as a team that not only embraces fitness but also values the continuous pursuit of knowledge. Today, Fresh & Fit Co is a symbol of commitment, passion, and the belief that everyone can achieve their fitness goals.
                        </p>
                    </div>
                </section>

                {/* Team Section */}
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {teamMembers.map((member) => (
                                <div key={member.id} className="bg-white p-6 rounded-lg shadow-lg">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                    <p className="text-gray-600 mb-2">{member.position}</p>
                                    <p className="text-gray-800">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Our Values</h2>
                        <ul className="list-disc list-inside">
                            <li>
                                <span className="font-bold">Fitness is King:</span> At Fresh & Fit Co, we believe in the power of fitness to transform lives. It`s not just a part of what we do; it`s at the core of our identity.
                            </li>
                            <li>
                                <span className="font-bold">Continuous Learning:</span> We embrace the journey of learning and growth. In just six months, we mastered web development, a testament to our commitment to ongoing education.
                            </li>
                            <li>
                                <span className="font-bold">Inclusivity:</span> Our vision is to make fitness accessible to everyone. We celebrate diversity and strive to create an inclusive community where all individuals feel welcome.
                            </li>
                            <li>
                                <span className="font-bold">Passion for Health:</span> We are driven by a passion for health and wellness. Our commitment extends beyond just physical fitness to promoting holistic well-being.
                            </li>
                            <li>
                                <span className="font-bold">Empowerment:</span> We empower individuals to take control of their fitness journey. Through education and support, we inspire confidence and self-efficacy.
                            </li>
                            <li>
                                <span className="font-bold">Community Connection:</span> Building a sense of community is vital to us. We foster connections among our members, creating a supportive network that extends beyond the gym.
                            </li>
                        </ul>
                    </div>
                </section>
                {/* Contact Section */}
                <section className="bg-gray-800 text-white py-20">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
                        <p className="text-lg mb-8">
                            Have questions or want to learn more? Contact us at{' '}
                            <a href="mailto:psazzadul@gmail.com" className="underline">
                                psazzadul@gmail.com
                            </a>{' '}
                            or call us at{' '}
                            <a href="tel:+8801917335945" className="underline">
                                +8801917335945
                            </a>
                            .
                        </p>
                        {/* You can add a contact form or other relevant contact information here */}
                    </div>
                </section>


            </div>
        </div>
    );
};

export default AboutUsPage;
