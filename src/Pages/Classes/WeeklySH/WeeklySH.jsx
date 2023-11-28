import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
    { day: 'Tuesday', activities: ['Running Club', 'Strength Training'], times: ['7:00 AM - 8:00 AM', '6:00 PM - 7:00 PM'] },
    { day: 'Wednesday', activities: ['Yoga Class', 'Boxing'], times: ['10:00 AM - 11:00 AM', '5:00 PM - 6:00 PM'] },
    { day: 'Thursday', activities: ['Zumba Dance', 'HIIT Workout'], times: ['4:00 PM - 5:00 PM', '6:00 PM - 7:00 PM'] },
    { day: 'Friday', activities: ['Running Club', 'Pilates'], times: ['7:00 AM - 8:00 AM', '6:00 PM - 7:00 PM'] },
    { day: 'Saturday', activities: ['Cycling', 'Strength Training'], times: ['8:00 AM - 9:00 AM', '7:00 PM - 8:00 PM'] },
    { day: 'Sunday', activities: ['Yoga Class', 'Boxing'], times: ['10:00 AM - 11:00 AM', '5:00 PM - 6:00 PM'] },
    { day: 'Monday', activities: ['Zumba Dance', 'HIIT Workout'], times: ['4:00 PM - 5:00 PM', '6:00 PM - 7:00 PM'] },
    { day: 'Tuesday', activities: ['Running Club', 'Pilates'], times: ['7:00 AM - 8:00 AM', '6:00 PM - 7:00 PM'] },
    { day: 'Wednesday', activities: ['Cycling', 'Strength Training'], times: ['8:00 AM - 9:00 AM', '7:00 PM - 8:00 PM'] },
    { day: 'Thursday', activities: ['Yoga Class', 'Boxing'], times: ['10:00 AM - 11:00 AM', '5:00 PM - 6:00 PM'] },
];

const WeeklySH = () => {
    return (
        <div className='text-white'> 
            <h2 className="text-3xl font-semibold mb-4 text-center text-red-500">Weekly Schedule</h2>

            <Tabs>
                <TabList className="flex justify-around gap-2 bg-red-500 mb-4 w-[800px] mx-auto">
                    {weekDays.map((day, index) => (
                        <Tab key={index} className="cursor-pointer text-blue-200 p-2  font-bold text-xl hover:text-2xl" >
                            {day}
                        </Tab>
                    ))}
                </TabList>

                {weekDays.map((day, index) => {
                    const dayData = weeklyScheduleContent.find((entry) => entry.day === day);

                    return (
                        <TabPanel key={index}>
                            <table className="table-auto mx-auto mb-4 w-[800px]">
                                <thead>
                                    <tr className="bg-red-500">
                                        <th className="border p-5">Day</th>
                                        <th className="border p-5">Activity</th>
                                        <th className="border p-5">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dayData ? (
                                        dayData.activities.map((activity, idx) => (
                                            <tr key={idx} className="text-center">
                                                <td className="border p-2 font-semibold bg-red-500" rowSpan={dayData.activities}>
                                                    {day}
                                                </td>
                                                <td className="border p-2">{activity}</td>
                                                <td className="border p-2">{dayData.times[idx]}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="text-center">
                                            <td colSpan={3} className="border p-2">No class scheduled</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </TabPanel>
                    );
                })}
            </Tabs>
        </div>
    );
};

export default WeeklySH;
