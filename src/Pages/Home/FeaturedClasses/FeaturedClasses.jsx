import Title from "../../Shared/PageTitles/Title";

const FeaturedClasses = () => {
    // Dummy data for illustration
    const featuredClasses = [
        { id: 1, title: 'High-Intensity Interval Training', members: 120 },
        { id: 2, title: 'Yoga for Beginners', members: 95 },
        { id: 3, title: 'Cardio Kickboxing', members: 80 },
        { id: 4, title: 'Strength Training Essentials', members: 110 },
        { id: 5, title: 'Mindful Meditation', members: 60 },
        { id: 6, title: 'Dance Fitness Fusion', members: 75 },
    ];

    return (
        <>
            <Title title="Our Featured Classes" />
            <section className="py-16">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-8">✨ Featured Classes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredClasses.map((classItem) => (
                            <div key={classItem.id} className="bg-white p-4 rounded-md shadow-md">
                                <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
                                <p className="text-gray-600 mb-4">
                                    Members: {classItem.members}
                                </p>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                                    Join Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeaturedClasses;
