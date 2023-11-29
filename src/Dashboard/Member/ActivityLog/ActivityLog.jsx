import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Title from "../../../Pages/Shared/PageTitles/Title";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Orbitals } from "react-spinners-css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ActivityLog = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState(0);

    const { data: myTrainers = [], isLoading: isLoadingMyBookings } =
        useQuery({
            queryKey: ["bookings"],
            queryFn: async () => {
                const res = await axiosSecure.get(
                    `/bookings?bookerEmail=${user.email}`
                );
                return res.data;
            },
        });

    const { data: classesJoined = [], isLoading: isLoadingClassesJoined } =
        useQuery({
            queryKey: ["classesJoined"],
            queryFn: async () => {
                const res = await axiosSecure.get(
                    `/classesJoined?email=${user.email}`
                );
                return res.data;
            },
        });

    if (isLoadingMyBookings || isLoadingClassesJoined) {
        return <div className="text-center"><Orbitals color="#FF0000" size={32} /></div>
    }

    const calculateAvailableSlots = () => {
        const slots = Array.from({ length: 12 }, (_, index) => {
            const slotNumber = index + 1;
            const time = `${index + 1}:00 - ${index + 2}:00`;

            const trainerForSlot = myTrainers.find(
                (trainer) => trainer.selectedSlot === slotNumber
            );

            return {
                slotNumber,
                time,
                trainer: trainerForSlot ? trainerForSlot.trainer : "",
            };
        });
        return slots;
    };

    const allActivities = [...myTrainers, ...classesJoined].sort((a, b) => {
        const timeA = new Date(a.Submitted);
        const timeB = new Date(b.Submitted);
        return timeB - timeA;
    });

    return (
        <div className="mb-2">
            <Helmet>
                <title>Fresh & Fit || Activity Log</title>
            </Helmet>
            <div>
                <Title
                    title="Activity Log"
                    subTitle="View your today's activity including your current trainer and training time."
                />
            </div>
            <div>
                <h1 className="text-center text-3xl font-semibold text-red-500 mb-5 mt-10">
                    All Activities:{" "}
                </h1>
                <table className="table text-black mx-auto w-[800px] bg-gray-800">
                    <thead className="bg-red-500 text-black ">
                        <tr className="text-center">
                            <th>#</th>
                            <th>Activity Name</th>
                            <th>Trainer/Class Name</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allActivities.map((activity, index) => (
                            <tr key={activity._id} className="text-xl mb-3 bg-white text-center">
                                <td>{index + 1}</td>
                                <td>{activity.trainer ? "Trainer Booking" : "Class Joined"}</td>
                                <td>{activity.trainer || activity.className}</td>
                                <td>{activity.Submitted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h1 className="text-center text-3xl font-semibold text-yellow-500 mb-5 mt-10">
                    Activity Details:{" "}
                </h1>
            <Tabs className={'mb-10'} selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
                <TabList>
                    <Tab>My Trainers</Tab>
                    <Tab>Your Routine</Tab>
                    <Tab>Joined Classes</Tab>
                </TabList>

                <TabPanel>
                    <div>
                        <h1 className="text-center text-3xl font-semibold text-green-500 mb-5">
                            My Trainers:{" "}
                        </h1>
                        <table className="table-auto mx-auto w-[800px] text-black bg-gray-800">
                            <thead>
                                <tr className="bg-green-500">
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Trainer Name</th>
                                    <th className="px-4 py-2">Trainer Email</th>
                                    <th className="px-4 py-">Plan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myTrainers.map((trainer, index) => (
                                    <tr key={trainer._id} className="text-xl mb-3 bg-white text-center">
                                        <td>{index + 1}</td>
                                        <td>{trainer.trainer}</td>
                                        <td>{trainer.trainerEmail}</td>
                                        <td className="text-red-500 font-bold">{trainer.selectedPlan}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div>
                        <h1 className="text-center text-3xl font-semibold text-yellow-500 mb-5 mt-10">
                            Your Routine:{" "}
                        </h1>
                        <table className="table text-black mx-auto w-[800px] bg-gray-800">
                            <thead className="bg-yellow-500 text-black ">
                                <tr className="text-center">
                                    <th>Slot Number</th>
                                    <th>Time</th>
                                    <th>Trainer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculateAvailableSlots().map((slot) => (
                                    <tr key={slot.slotNumber} className="bg-white text-center">
                                        <td>{slot.slotNumber}</td>
                                        <td className="font-bold">{slot.time}</td>
                                        <td className="text-xl text-red-500 font-semibold">{slot.trainer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div>
                        <h1 className="text-center text-3xl font-semibold text-purple-500 mb-5 mt-10">
                            Joined Classes:{" "}
                        </h1>
                        <table className="table text-black mx-auto w-[800px] bg-gray-800">
                            <thead className="bg-purple-500 text-black ">
                                <tr className="text-center">
                                    <th>#</th>
                                    <th>Classes Name</th>
                                    <th>Trainer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classesJoined.map((joined, index) => (
                                    <tr key={joined._id} className="text-xl mb-3 bg-white text-center">
                                        <td>{index + 1}</td>
                                        <td>{joined.className}</td>
                                        <td>{joined.trainerName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
            </Tabs>


        </div>
    );
};

export default ActivityLog;
