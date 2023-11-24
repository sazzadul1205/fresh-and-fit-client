import Title from '../../Shared/PageTitles/Title';
import avatar1 from "../../../assets/defaultTrainer/trainer-1.avif"
import avatar2 from "../../../assets/defaultTrainer/trainer-2.avif"
import avatar3 from "../../../assets/defaultTrainer/trainer-3.avif"

const Team = () => {
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
            <Title
                title="Meet Our Team"
                subTitle="Passionate professionals dedicated to your fitness journey"
            />
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
    );
};

export default Team;
