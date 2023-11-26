import { useState } from 'react';
import Title from '../Shared/PageTitles/Title';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Payment = () => {
    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [confirmed, setConfirmed] = useState(false);

    const handleConfirm = async () => {
        console.log(bookingInfo);
        axiosPublic.post('/bookings', bookingInfo)
            .then((response) => {
                if (response.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Booking Successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/trainer');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to add item. Please try again later.',
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'An error occurred. Please try again later.',
                });
            });

        setConfirmed(true);
    };

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Payment</title>
            </Helmet>
            <div className='pt-20'>
                <Title
                    title={'Confirm Your Booking'}
                    subTitle={'Review and confirm your selected trainer, slot, and package details before proceeding with the payment'}
                ></Title>
            </div>
            <div className="container mx-auto p-5 pt-10 text-center text-black">
                <h2 className="text-3xl font-semibold mb-4 text-red-500">Payment Details</h2>
                <div className="bg-purple-400 shadow-md rounded-md p-6">
                    <p className="mb-2"><span className="font-semibold">Trainer Name:</span> {bookingInfo.trainer}</p>
                    <p className="mb-2"><span className="font-semibold">Slot:</span> {bookingInfo.selectedSlot}</p>
                    <p className="mb-2"><span className="font-semibold">Package Name:</span> {bookingInfo.selectedPlan}</p>
                    <p className="mb-2"><span className="font-semibold">Price:</span> ${bookingInfo.price}</p>
                    <p className="mb-2"><span className="font-semibold">Your Name:</span> {bookingInfo.bookerName}</p>
                    <p className="mb-4"><span className="font-semibold">Your Email:</span> {bookingInfo.bookerEmail}</p>

                    {!confirmed && (
                        <button
                            onClick={handleConfirm}
                            disabled={confirmed}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        >
                            Confirm Booking
                        </button>
                    )}
                    {confirmed && <p className="text-green-600 mt-4">Booking Confirmed!</p>}
                </div>
            </div>
        </div>
    );
};

export default Payment;
