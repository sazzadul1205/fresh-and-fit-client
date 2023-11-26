import React from "react";

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const weeklyScheduleContent = [
    { day: 'Monday', activities: ['Yoga Class', 'Zumba Dance'], times: ['10:00 AM - 11:00 AM', '4:00 PM - 5:00 PM'] },
    { day: 'Tuesday', activities: ['HIIT Workout'], times: ['5:00 PM - 6:00 PM'] },
    { day: 'Wednesday', activities: ['Running Club', 'Pilates'], times: ['7:00 AM - 8:00 AM', '6:00 PM - 7:00 PM'] },
    { day: 'Thursday', activities: ['Cycling', 'Strength Training'], times: ['8:00 AM - 9:00 AM', '7:00 PM - 8:00 PM'] },
    { day: 'Friday', activities: ['Yoga Class', 'Boxing'], times: ['10:00 AM - 11:00 AM', '5:00 PM - 6:00 PM'] },
    { day: 'Saturday', activities: ['Zumba Dance', 'HIIT Workout'], times: ['4:00 PM - 5:00 PM', '6:00 PM - 7:00 PM'] },
    { day: 'Sunday', activities: ['Running Club', 'Pilates'], times: ['7:00 AM - 8:00 AM', '6:00 PM - 7:00 PM'] },
    { day: 'Monday', activities: ['Cycling', 'Strength Training'], times: ['8:00 AM - 9:00 AM', '7:00 PM - 8:00 PM'] },
    { day: 'Tuesday', activities: ['Yoga Class', 'Boxing'], times: ['10:00 AM - 11:00 AM', '5:00 PM - 6:00 PM'] },
    { day: 'Wednesday', activities: ['Zumba Dance', 'HIIT Workout'], times: ['4:00 PM - 5:00 PM', '6:00 PM - 7:00 PM'] },
    { day: 'Thursday', activities: ['Running Club', 'Pilates'], times: ['7:00 AM - 8:00 AM', '6:00 PM - 7:00 PM'] },
    { day: 'Friday', activities: ['Cycling', 'Strength Training'], times: ['8:00 AM - 9:00 AM', '7:00 PM - 8:00 PM'] },
    { day: 'Saturday', activities: ['Yoga Class', 'Boxing'], times: ['10:00 AM - 11:00 AM', '5:00 PM - 6:00 PM'] },
    { day: 'Sunday', activities: ['Zumba Dance', 'HIIT Workout'], times: ['4:00 PM - 5:00 PM', '6:00 PM - 7:00 PM'] },
    { day: 'Monday', activities: ['Running Club', 'Pilates'], times: ['7:00 AM - 8:00 AM', '6:00 PM - 7:00 PM'] },
];

const WeeklySH = () => {
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4 text-center text-red-500">Weekly Schedule</h2>

            <table className="table-auto mx-auto mb-4 w-[800px]">
                <thead>
                    <tr className="bg-red-500">
                        <th className="border p-5">Day</th>
                        <th className="border p-5">Activity</th>
                        <th className="border p-5">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {weekDays.map((day, index) => {
                        const dayData = weeklyScheduleContent.find((entry) => entry.day === day);

                        return (
                            <React.Fragment key={index}>
                                <tr className="text-center">
                                    <td rowSpan={dayData ? dayData.activities.length : 1} className="border p-2 font-semibold bg-red-500">{day}</td>
                                    {dayData ? (
                                        <>
                                            <td className="border p-2">{dayData.activities[0]}</td>
                                            <td className="border p-2">{dayData.times[0]}</td>
                                        </>
                                    ) : (
                                        <td colSpan={2} className="border p-2">No class scheduled</td>
                                    )}
                                </tr>
                                {dayData && dayData.activities.length > 1 && (
                                    dayData.activities.slice(1).map((activity, idx) => (
                                        <tr key={idx + 1} className="text-center">
                                            <td className="border p-2">{activity}</td>
                                            <td className="border p-2">{dayData.times[idx + 1]}</td>
                                        </tr>
                                    ))
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default WeeklySH;
