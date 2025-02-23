

import heroBackgroundImage from "../../assets/images/hero-background.jpg"
import "./hero.scss"

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Welcome to Our Website</h1>
        <p className="hero__subtitle">Discover amazing experiences and opportunities</p>
        <button className="hero__cta">Get Started</button>
      </div>
      <div className="hero__image-container">
        <img src={heroBackgroundImage || "/placeholder.svg"} alt="Hero background" className="hero__image" />
      </div>
    </section>
  )
}

export default Hero
