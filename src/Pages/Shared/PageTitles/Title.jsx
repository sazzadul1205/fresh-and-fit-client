

const Title = ({title, subTitle}) => {
    return (
        <div className="text-center py-10">
            <h1 className="text-5xl font-bold text-red-500">{title}</h1>
            <p className="text-xl">{subTitle}</p>
        </div>
    );
};

export default Title;