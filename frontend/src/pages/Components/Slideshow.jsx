import '../style/slideshow.css'

const Slideshow = (props) => {
    const { slides } = props;

    return (
        <>
            <div className="slideshow">
                {slides.map((slide, index) => (
                <div className="slide" style={{ '--i': index }} key={index}>
                    <h2>{slide.name}<span>{slide.role}</span></h2>
                    <img src={slide.imageUrl} alt="" />
                </div>
                ))}
            </div>
        </>
    );
}

export default Slideshow;