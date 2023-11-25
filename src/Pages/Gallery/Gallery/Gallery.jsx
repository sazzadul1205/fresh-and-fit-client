import Title from "../../Shared/PageTitles/Title";
import Loop from "../Loop/Loop";

const Gallery = () => {
    return (
        <div>
            <div className={'pt-16'}>
                <Title
                    title={"Fit & Fierce Gallery"}
                    subTitle={"Explore the Strength, Power, and Beauty of Fitness in Every Image"}></Title>
            </div>
            <div>
                <Loop></Loop>
            </div>
        </div>
    );
};

export default Gallery;