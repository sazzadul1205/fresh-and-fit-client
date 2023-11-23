
const SliderCard = ({icon, title, description}) => {
    return (
        <div>
            <div className="card lg:w-96 bg-[#7752FE] shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={icon} alt='Custom Workout Plans' className="h-20 w-20 mx-auto" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-white sm:text-lg ">{title}</h2>
                    <p className="text-sm text-black">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default SliderCard;