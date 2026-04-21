import react from 'react' 
import Hero from '../Components/home/Hero'
import Banner from '../Components/home/Banner'
import Features from '../Components/home/Features'
import Testimonial from '../Components/home/Testimonial'
import CallToAction from '../Components/home/CallToAction'
import Footer from '../Components/home/Footer'

const Home = () => {
    return (
        <div>
            <Banner/>
            <Hero/>
            <Features/>
            <Testimonial/>
            <CallToAction/>
            <Footer/>
        </div>
    )
}

export default Home