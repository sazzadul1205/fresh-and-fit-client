import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Title from "../../../Pages/Shared/PageTitles/Title";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageMember = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: trainerBookings = [], isLoading: isLoadingTrainerBookings } =
        useQuery({
            queryKey: ["bookings"],
            queryFn: async () => {
                const res = await axiosPublic.get(
                    `/bookings?trainerEmail=${user.email}`
                );
                return res.data;
            },
        });

    if (isLoadingTrainerBookings) {
        return <p>Loading...</p>;
    }

    const sendInstructionsByEmail = (memberEmail) => {
        // You can customize the SweetAlert message here
        Swal.fire({
            title: "Send Instructions",
            text: `Are you sure you want to send instructions to ${memberEmail}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, send it!",
            cancelButtonText: "No, cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                // Add logic to send instructions via email
                console.log(`Sending instructions to ${memberEmail}`);
                // You can integrate with a service like SendGrid or your backend for sending emails
                Swal.fire("Instructions Sent!", "", "success");
            }
        });
    };

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Manage Members</title>
            </Helmet>
            <div>
                <Title
                    title="Manage Members"
                    subTitle="View and manage your members in a tabular format."
                />
            </div>
            <div className="overflow-x-auto mx-20">
                <table className="table text-black bg-gray-700">
                    <thead>
                        <tr className="bg-red-500 text-white text-center">
                            <th>Booker Name</th>
                            <th>Email</th>
                            <th>Selected Plan</th>
                            <th>Selected Slot</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainerBookings.map((member) => (
                            <tr key={member._id} className="text-center">
                                <td>{member.bookerName}</td>
                                <td>{member.bookerEmail}</td>
                                <td>{member.selectedPlan}</td>
                                <td>{member.selectedSlot}</td>
                                <td>{member.price}</td>
                                <td>
                                    <button
                                        className="btn"
                                        onClick={() =>
                                            sendInstructionsByEmail(member.bookerEmail)
                                        }
                                    >
                                        Send Instructions
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMember;
