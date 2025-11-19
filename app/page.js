'use client';

import CMSContent from '@/app/components/CMSContent';
import Testimonials from '@/app/components/Testimonials';

export default function Home() {
  return (
    <div className="site-wrapper">
      <div className="first_nav_hero_about">
        {/* ======== 1.1. header section ======== */}
        <header>
          <nav className="container navbar navbar-expand-lg ">
            <div className="container-fluid">
              {/* site logo */}
              <a className="nav-logo p-0" href="#'index.html">
                <CMSContent
                  sectionId="header_logo"
                  type="image"
                  fallback="/assets/images/logo2.png"
                  alt="Savage sqaud Logo"
                  style={{height:"80px",width:"auto"}}
                />
              </a>
              {/* navigation button  */}
              <button className="navbar-toggle" onClick={() => openNav()} type="button" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa-solid fa-bars"></i>
              </button>
              {/* navigation bar manu  */}
              <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav d-flex justify-content-center align-items-center gap-lg-2 gap-md-2 gap-sm-2 gap-2 mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" href="index.html">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#about">About us</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#faq">FAQ</a>
                  </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#contact">Contact</a>
                  </li>

                     <li className="nav-item">
                    <a className="nav-link" href="https://portal.savagesquad.com" target="_blank" rel="noopener noreferrer" >Sign In</a>
                  </li>
                
                  <li className="nav-item" style={{display:"none"}}>
                    <a id="search-bar-bt" className="nav-link" href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
                  </li>
                  <li className="nav-item header_btn ">
                    <a className="nav-link nav-hrf btn-hover1" href="https://portal.savagesquad.com/portal-signUp/signup.jsp?id=QUdmcDBvQzhXNTk4Yy92TXluRG5KUT09">Sign Up</a>
                  </li>
                  <li className="nav-item" onClick={() => open_right_side()}>
                    <a className="nav-link" href="#"><i className="fa-sharp fa-solid fa-bars"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/*============ navigation left slidebar================*/}
          <aside>
            <div id="mySidenav" className="sidenav">
              <div className="side-nav-logo d-flex justify-content-between align-items-center ps-4 pe-3">
                <figure className="navbar-brand">
                  <a href="#index.html">
                    <CMSContent
                      sectionId="sidebar_logo"
                      type="image"
                      fallback="/assets/images/savage squad logos_1 gold.png"
                      alt="Savage sqaud Logo"
                      className="nav-logo"
                    />
                  </a>
                </figure>
                <div className="closebtn" onClick={() => closeNav()}><i className="fa-solid fa-square-xmark side-bar-close-btn"></i></div>
              </div>
              <ul>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="index.html">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#faq">FAQ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact">Contact</a>
                </li>
                    <li className="nav-item">
                  <a className="nav-link" href="https://portal.savagesquad.com" target="_blank" rel="noopener noreferrer">Sign In</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://portal.savagesquad.com/portal-signUp/signup.jsp?id=QUdmcDBvQzhXNTk4Yy92TXluRG5KUT09" target="_blank" rel="noopener noreferrer">Sign Up</a>
                </li>
                <li className="nav-item" style={{display:'none'}}>
                  <div className="d-flex align-items-center justify-content-between pt-3" id="slid-btn">
                    <button className="a-slid">Pages</button>
                    <i className="fa-solid fa-caret-down pe-4"></i>
                  </div>
                  
                </li>
              </ul>

                  <hr />
              <h5 className="mt-4 mb-3" style={{ color: "white", fontWeight: "600", paddingLeft: "15px" }}>Download Our Mobile App</h5>
              <p className="p-f-s" style={{ color: "white", fontWeight: "500", paddingLeft: "15px" }}>Access your account on the go with our iOS and Android apps. Download now for 24/7 access to your credit analysis and personalized recommendations.</p>
              <div className="row" >
                <div className="col-5" style={{ paddingR: "2px" }}>
                  <a href="https://play.google.com/store/apps/details?id=app.mobilecro" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/index/playstore.png" alt="Google Play Store" style={{ height: "50px", width: "auto", display: "block" }} />
                  </a>
                </div>
                <div className="col-4 " style={{ padding: "2px" }}>
                  <a href="https://apps.apple.com/us/app/mobile-cro/id6478385367" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/index/appstore.png" alt="Apple App Store" style={{ height: "50px", width: "auto", display: "block" }} />
                  </a>
                </div>
              </div>
            


            </div>
          </aside>
          {/*================== navigation drop search bar================*/}
          <div className="search" id="search-bar">
            <form className="d-flex nav-search">
              <input type="text" name="search" placeholder="Enter your text" />
              <button className="btn-hover1" type="submit">Search</button>
            </form>
            <button id="remove-btn">
              <i className="fa-solid fa-square-xmark "></i>
            </button>
          </div>
          {/*=================navigation Right slidebar==================*/}
          <section className="right-sidbar" id="right_side">
            <div className="d-flex justify-content-between align-items-center">
              {/* site logo */}
              <a className="p-0 " href="index.html">
                <CMSContent
                  sectionId="sidebar_logo"
                  type="image"
                  fallback="/assets/images/savage squad logos_1 gold.png"
                  alt="Savage sqaud Logo"
                />
              </a>
              <button className="close_right_sidebar fa-solid fa-xmark" onClick={() => close_right_sade()}> </button>
            </div>
            <p className="mt-4 pb-3">Savage sqaud is surety bond certified to provide professional credit services.
              We help clients achieve their financial goals through expert credit analysis and personalized solutions.
            </p>
            <a href="https://portal.savagesquad.com/portal-signUp/signup.jsp?id=QUdmcDBvQzhXNTk4Yy92TXluRG5KUT09" className="btn-hover1">Discover More</a>
            <hr />
            <h5 className="mt-4 mb-4">Connected details:</h5>
            <ul className="d-flex flex-column gap-3">
              <li>
                <a href="tel:+1-866-753-4963"> <i className="fa-solid fa-phone"></i></a>
                <a href="tel:+1-866-753-4963"><span>+1-866-753-4963</span></a>
              </li>
              <li>
                <a href="mailto:Credit@savagesquad.com"><i className="fa-solid fa-envelope"></i></a>
                <a href="mailto:Credit@savagesquad.com">Credit@savagesquad.com</a>
              </li>
              <li>
                <a href="#"><i className="fa-solid fa-map-pin"></i></a>
                <a href="#">1980 Post Oak Suite 100 Houston, TX 77056</a>
              </li>
            </ul>
            <span className="d-flex gap-4 mt-4">
              <a href="https://www.facebook.com/people/Savage-Credit-Repair/61558166635772/" target="_blank" rel="noopener noreferrer" className="p-0"><i className="fa-brands fa-facebook"></i></a>
              <a href="https://www.instagram.com/savagecreditservices/?hl=en" target="_blank" rel="noopener noreferrer" className="p-0"><i className="fa-brands fa-instagram"></i></a>
            </span>
          </section>
        </header>
        {/* ======== End of 1.1. header section ========  */}
        {/* ======== 1.2. hero section ======== */}
        <section className="hero">
          <div className="container">
            <div className="row text-md-start text-sm-center text-center gap-md-0 gap-sm-4 gap-5">
              <div data-aos="fade-up" className="col-md-6 d-flex align-items-md-start align-items-ms-center align-items-center justify-content-center flex-column">
                <CMSContent
                  sectionId="hero_title"
                  type="html"
                  as="h1"
                  fallback="EMPOWER YOUR CREDIT JOURNEY"
                />
                <CMSContent
                  sectionId="hero_description"
                  type="html"
                  as="p"
                  fallback="Savage sqaud provides surety bond certified credit services. Schedule your free consultation today and discover how we can help you achieve your financial goals through expert credit analysis and personalized solutions."
                />
                <a className="btn-hover1" target="_blank" href="https://portal.savagesquad.com/portal-signUp/signup.jsp?id=QUdmcDBvQzhXNTk4Yy92TXluRG5KUT09">Schedule Free Consultation</a>
              </div>
              <div data-aos="fade-down" className="col-md-6 position-relative d-flex flex-column justify-content-center align-items-center mt-md-0 mt-sm-5 mt-4">
                <div style={{ position: 'relative', width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CMSContent
                    sectionId="hero_image_main"
                    type="image"
                    fallback="/assets/images/index/hero23.png"
                    alt="hero_img1"
                    className="moving"
                  />
                  <CMSContent
                    sectionId="hero_image_watch"
                    type="image"
                    fallback="/assets/images/index/hero_watch.png"
                    alt="hero_img2"
                  />
                  <CMSContent
                    sectionId="hero_icon_star"
                    type="image"
                    fallback="/assets/images/icon/hero_star.png"
                    alt="hero_icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======== End of 1.2. hero section ========  */}
        {/* ======== 1.3. about section ========  */}
        <section className="about">
          <div className="container">
            <div className="row text-md-start text-sm-center text-center">
              <div className="col-md-6 d-flex justify-content-between">
                <div className="ab_card1" data-aos="flip-left">
                  <CMSContent
                    sectionId="about_title"
                    type="html"
                    as="h3"
                    fallback="About Savage sqaud"
                  />
                  <CMSContent
                    sectionId="about_description"
                    type="html"
                    as="p"
                    className="p-f-s"
                    fallback="We are a surety bond certified company specializing in professional credit services. Our mission is to educate clients on credit health, provide accurate credit analysis, and guide them toward achieving their financial goals through a simple and transparent process."
                  />
                  <div className="d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-center">
                    <a className="btn-hover1" target="_blank" href="https://portal.savagesquad.com/portal-signUp/signup.jsp?id=QUdmcDBvQzhXNTk4Yy92TXluRG5KUT09">Learn More</a>
                    <div className="abut-video">


                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-center mt-md-0 mt-sm-3 mt-3">
                <div className="ab_card2 d-flex flex-column justify-content-between" data-aos="flip-right">
                  <div>
                    <div className="row gap-md-0 gap-sm-3 gap-3">
                      <div className="col-md-5 col-sm-12 col-12 ">
                        <div className="d-flex justify-content-md-start justify-content-sm-center justify-content-center">
                          <CMSContent
                            sectionId="about_clients_count"
                            type="html"
                            as="h3"
                            className="count"
                            fallback="38"
                          />
                          <h3>K+</h3>
                        </div>
                        <CMSContent
                          sectionId="about_clients_text"
                          type="html"
                          as="div"
                          className="p-f-s"
                          fallback="Clients have trusted Savage sqaud with their credit journey!"
                        />
                      </div>
                      <div className="col-2 p-0 d-flex justify-content-center align-items-center">
                        <hr />
                      </div>
                      <div className="col-md-5 col-sm-12 col-12 p-0">
                        <CMSContent
                          sectionId="about_bonded_percentage"
                          type="html"
                          as="h3"
                          fallback="100%"
                        />
                        <CMSContent
                          sectionId="about_bonded_text"
                          type="html"
                          as="div"
                          className="p-f-s"
                          fallback="Surety Bond Certified for your protection and peace of mind"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mb-3 mt-4 gap-4 justify-content-md-start justify-content-ms-center justify-content-center">
                    <div className="position-relative">
                      <CMSContent
                        sectionId="about_card_image1"
                        type="image"
                        fallback="/assets/images/index/about_card_img1.svg"
                        alt="about_img1"
                      />
                      <CMSContent
                        sectionId="about_card_image2"
                        type="image"
                        fallback="/assets/images/index/about_card_img2.svg"
                        alt="about_img2"
                      />
                    </div>
                    <div className="ps-2">
                      <span>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <p>Clients love our credit services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* ======== End of 1.3. about section ========  */}
      {/* ======== 1.4. finance section ========  */}
      <section className="finance">
        <div className="container text-center">
          <CMSContent
            sectionId="finance_title"
            type="text"
            as="h2"
            fallback="PROFESSIONAL CREDIT SERVICES YOU CAN TRUST"
          />
          <CMSContent
            sectionId="finance_description"
            type="html"
            as="p"
            className="mt-0"
            fallback="As a surety bond certified provider, Savage sqaud offers comprehensive credit services designed to help you understand and improve your credit health. Our easy process starts with a free consultation, followed by accurate credit analysis using your credit monitoring details."
          />
          <div className="finanes-card row gap-md-0 gap-sm-4 gap-4">
            <div className="col-lg-4 col-md-4 d-flex justify-content-center pe-lg-3 pe-md-0 pe-sm-3 pe-3">
              <div className="fin-card" data-aos="flip-up">
                <figure>
                  <CMSContent
                    sectionId="service_icon_graph"
                    type="image"
                    fallback="/assets/images/icon/graphe.png"
                    alt="graph"
                  />
                </figure>
                <CMSContent
                  sectionId="service_credit_analysis_title"
                  type="html"
                  as="h4"
                  fallback="Credit Analysis"
                />
                <CMSContent
                  sectionId="service_credit_analysis_desc"
                  type="html"
                  as="p"
                  className="p-f-s"
                  fallback="Comprehensive credit report review and accurate analysis to identify opportunities for improvement."
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 d-flex justify-content-center pe-lg-3 pe-md-0 pe-sm-3 pe-3">
              <div className="fin-card" data-aos="flip-up">
                <figure>
                  <CMSContent
                    sectionId="service_icon_dollar"
                    type="image"
                    fallback="/assets/images/icon/doller.png"
                    alt="dollar"
                  />
                </figure>
                <CMSContent
                  sectionId="service_consultation_title"
                  type="html"
                  as="h4"
                  fallback="Free Consultation"
                />
                <CMSContent
                  sectionId="service_consultation_desc"
                  type="html"
                  as="p"
                  className="p-f-s"
                  fallback="Schedule your free consultation and learn how we can help you achieve your credit goals."
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 d-flex justify-content-center">
              <div className="fin-card" data-aos="flip-up">
                <figure>
                  <CMSContent
                    sectionId="service_icon_arrow"
                    type="image"
                    fallback="/assets/images/icon/arow.png"
                    alt="arrow"
                  />
                </figure>
                <CMSContent
                  sectionId="service_guidance_title"
                  type="html"
                  as="h4"
                  fallback="Expert Guidance"
                />
                <CMSContent
                  sectionId="service_guidance_desc"
                  type="html"
                  as="p"
                  className="p-f-s"
                  fallback="Personalized education and support throughout your entire credit journey."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.4. finance section ========  */}
        {/* ======== 1.5. ispsum section ======== 
      <div className="ispsum-logo">
        <div className="container">
          <div className="logo_ispsum_slider">
            <a href="#">
              <figure><img src="/assets/images/icon/ipsum-1.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="/assets/images/icon/ipsum-2.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="/assets/images/icon/ispum-3.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="/assets/images/icon/ipsum-4.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="/assets/images/icon/ipsum-1.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="/assets/images/icon/ipsum-2.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="/assets/images/icon/ispum-3.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="/assets/images/icon/ipsum-4.png" alt="img" /></figure>
            </a>
          </div>
          <hr />
        </div>
      </div>
 */}          <hr />

      {/* ======== End of 1.5. ispsum section ========  */}
      {/* ======== 1.6. gateway section ========  */}
      <section className="gateway">
        <div className="container">
          <div className="row gap-lg-0 gap-md-0 gap-sm-4 gap-4">
            <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center" data-aos="fade-up">
              <div className=" gateway-bg-img mt-5 ">
                <figure>
                  <CMSContent
                    sectionId="process_image_main"
                    type="image"
                    fallback="/assets/images/index/gateway-2.png"
                    alt="gate_img1"
                    className="moving"
                  />
                </figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-6  text-md-start text-sm-center text-center" data-aos="fade-down">
              <CMSContent
                sectionId="process_title"
                type="html"
                as="h2"
                fallback="SIMPLE 3-STEP PROCESS"
              />
              <CMSContent
                sectionId="process_description"
                type="html"
                as="p"
                className="pt-lg-4 pt-md-3 pt-sm-2 pt-2 pb-2"
                fallback="Getting started with Savage sqaud is easy. Our straightforward process ensures you receive the best credit services with complete transparency and professional guidance every step of the way."
              />
              <div className="gate mt-md-3 mt-sm-0 mt-4   d-flex flex-md-row flex-sm-column flex-column align-items-center">
                <figure className="d-flex align-items-center">
                  <CMSContent
                    sectionId="process_icon_1"
                    type="image"
                    fallback="/assets/images/icon/gate-icon1.png"
                    alt="gate-img1"
                  />
                </figure>
                <div className="ms-lg-3 ms-md-3 ms-sm-0 ms-0">
                  <CMSContent
                    sectionId="process_step1_title"
                    type="html"
                    as="h5"
                    className="pb-2"
                    fallback="Schedule Free Consultation"
                  />
                  <CMSContent
                    sectionId="process_step1_desc"
                    type="html"
                    as="p"
                    className="p-f-s"
                    fallback="Book your free consultation to discuss your credit goals and learn about our surety bond certified services."
                  />
                </div>
              </div>
              <div className="gate d-flex mt-4  flex-md-row flex-sm-column flex-column align-items-center">
                <figure className="d-flex align-items-center">
                  <CMSContent
                    sectionId="process_icon_2"
                    type="image"
                    fallback="/assets/images/icon/gate-icon2.png"
                    alt="gate-img2"
                  />
                </figure>
                <div className="ms-lg-3 ms-md-3 ms-sm-0 ms-0">
                  <CMSContent
                    sectionId="process_step2_title"
                    type="html"
                    as="h5"
                    className="pb-2"
                    fallback="Provide Credit Monitoring Access"
                  />
                  <CMSContent
                    sectionId="process_step2_desc"
                    type="html"
                    as="p"
                    className="p-f-s"
                    fallback="Securely share your credit monitoring login details so we can conduct an accurate and comprehensive credit analysis."
                  />
                </div>
              </div>
              <div className="gate d-flex mt-4  flex-md-row flex-sm-column flex-column align-items-center">
                <figure className="d-flex align-items-center">
                  <CMSContent
                    sectionId="process_icon_3"
                    type="image"
                    fallback="/assets/images/icon/gate-icon3.png"
                    alt="gate-img3"
                  />
                </figure>
                <div className="ms-lg-3 ms-md-3 ms-sm-0 ms-0">
                  <CMSContent
                    sectionId="process_step3_title"
                    type="html"
                    as="h5"
                    className="pb-2"
                    fallback="Receive Your Credit Analysis"
                  />
                  <CMSContent
                    sectionId="process_step3_desc"
                    type="html"
                    as="p"
                    className="p-f-s"
                    fallback="Get a detailed credit analysis with clear expectations and personalized recommendations for your credit journey."
                  />
                </div>
              </div>
              <div className="gate-link text-lg-start text-md-start text-sm-center text-center">
                <a className="btn-hover1" href="https://portal.savagesquad.com/portal-signUp/signup.jsp?id=QUdmcDBvQzhXNTk4Yy92TXluRG5KUT09">Get Started</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.6. gateway section ========  */}
      {/* ======== 1.7. services section ========  */}
      <section className="services">
        <div className="container">
          <div className="row gap-md-0 gap-sm-4 gap-4">
            <div className="col-lg-6 col-md-6" data-aos="fade-down">
              <h2 className="text-lg-start text-md-start text-sm-center text-center">SURETY BOND CERTIFIED
                CREDIT SERVICES</h2>
              <p className="text-lg-start text-md-start text-sm-center text-center mt-lg-4 mt-md-2 mt-sm-2 mt-2 pb-4 ">
                Savage sqaud is proud to be surety bond certified, providing you with professional credit services
                you can trust. Access our client portal and mobile apps for convenient credit monitoring and support
                anytime, anywhere.</p>
              <div className=" d-flex  justify-content-center gap-lg-4 gap-md-3 gap-sm-2 gap-2">
                <div className="offers">
                  <h5 className="mb-2">24/7 Client Portal Access</h5>
                  <p className="p-f-s">Access your account anytime through our secure client portal and mobile apps.</p>
                </div>
                <div className="offers">
                  <h5 className=" mb-2">Transparent Process</h5>
                  <p className="p-f-s">Clear expectations and honest communication throughout your credit journey.</p>
                </div>
              </div>
              <div className="serives-btn justify-content-md-start justify-content-ms-center justify-content-center d-flex">
                <a className="btn-hover1" href="https://portal.savagesquad.com">Client Portal</a>
                <div className="d-flex align-items-center">
                  <a className="ps-4" href="https://portal.savagesquad.com/portal-signUp/signup.jsp?id=QUdmcDBvQzhXNTk4Yy92TXluRG5KUT09">Sign Up Now </a>
                  <i className="fa-solid fa-greater-than ps-md-3 ps-sm-1 ps-0"></i>
                </div>

              </div>
            </div>
            <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center sevices_img" data-aos="fade-up">
              <div className="position-relative">
                <div className="social-rating">
                  <div className="d-flex">
                    <div className="d-flex">
                      <span><i className="fa-solid fa-house"></i></span>
                      <div>
                        <h6>Rent Payment</h6>
                        <p>1 June 2023</p>
                      </div>
                    </div>
                    <div className="d-flex text-pink">
                      <p>-$</p>
                      <p className="count">1200.00</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex">
                      <span><i className="fa-solid fa-bolt"></i></span>
                      <div>
                        <h6>Electric Bill</h6>
                        <p>5 June 2023</p>
                      </div>
                    </div>
                    <div className="d-flex text-pink">
                      <p>-$</p>
                      <p className="count">85.00</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex">
                      <span><i className="fa-solid fa-cart-shopping"></i></span>
                      <div>
                        <h6>Groceries</h6>
                        <p>10 June 2023</p>
                      </div>
                    </div>
                    <div className="d-flex text-pink">
                      <p>-$</p>
                      <p className="count">156.00</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex">
                      <span><i className="fa-solid fa-car"></i></span>
                      <div>
                        <h6>Car Insurance</h6>
                        <p>15 June 2023</p>
                      </div>

                    </div>
                    <div className="d-flex text-pink">
                      <p>-$</p>
                      <p className="count">142.00</p>
                    </div>
                  </div>
                </div>
                <figure><img src="/assets/images/index/lady-mobile.png" alt="sevice_img2" /></figure>
                <figure><img src="/assets/images/icon/whitStar.png" alt="sevice_img3" /></figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.7. services section ========  */}
      {/* ======== 1.8. visa section ========  */}
      <section className="visa">
        <div className="container">
          <div className="visa-bg" data-aos="zoom-in">
            <figure><img src="/assets/images/index/vesa-back.png" alt="visa-img" /></figure>
          </div>
          <div className="visa-contant" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <h3 className="text-md-start text-sm-center text-center">Access Your Account
                  Anywhere
                </h3>
                <p className="text-md-start text-sm-center text-center p-f-s">Savage sqaud offers multiple ways
                  to stay connected with your credit journey. Access our secure client portal from any device
                  or download our mobile apps for iOS and Android.</p>
                <p className="text-md-start text-sm-center text-center p-f-s">Manage your account, view your
                  credit analysis, and communicate with our team - all at your fingertips.</p>
                <div className="visa-btn text-sm-center text-md-start text-center">
                  <a className="btn-hover1" href="https://portal.savagesquad.com">Access Portal Now</a>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="visa-logo pt-2 pb-3">
                  <figure><img src="/assets/images/icon/vis-1.png" alt="vica-icon1" /> </figure>
                  <figure><img src="/assets/images/icon/ves-2.png" alt="vica-icon2" /></figure>
                  <figure><img src="/assets/images/icon/ves-3.png" alt="vica-icon3" /></figure>
                  <figure><img src="/assets/images/icon/ves-4.png" alt="vica-icon4" /></figure>
                  <figure><img src="/assets/images/icon/ves-5.png" alt="vica-icon5" /></figure>
                </div>
                <div className="d-flex pt-2 justify-content-md-start justify-content-center justify-content-center">
                  <h2 className="count">3</h2>
                  <h2></h2>
                  <h6 className="d-flex align-items-center ps-2 ">Access Platforms</h6>
                </div>
                <p className="pt-2 pb-3 text-md-start text-sm-center text-center p-f-s">Web portal, iOS app, and Android app -
                  choose the platform that works best for you.</p>
                <div className="row">
                  <div className="col-md-6 d-flex justify-content-md-start justify-content-center">
                    <a href="https://play.google.com/store/apps/details?id=app.mobilecro" target="_blank" rel="noopener noreferrer">
                      <img src="/assets/images/index/playstore.png" alt="Google Play Store" style={{ height: "90px", width: "auto", display: "block" }} />
                    </a>
                  </div>
                  <div className="col-md-6 d-flex justify-content-md-start justify-content-center">
                    <a href="https://apps.apple.com/us/app/mobile-cro/id6478385367" target="_blank" rel="noopener noreferrer">
                      <img src="/assets/images/index/appstore.png" alt="Apple App Store" style={{ height: "90px", width: "auto", display: "block" }} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.8. visa section ========  */}
      {/* ========  1.9. pricing section ========  */}
      <section className="pricing pricing-b-g">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center pricing-bg" data-aos="fade-up">
              <div>
                <figure>
                  <CMSContent
                    sectionId="pricing_image_main"
                    type="image"
                    fallback="/assets/images/index/pricinge.png"
                    alt="pric-img1"
                    className="moving"
                  />
                </figure>
                <figure>
                  <CMSContent
                    sectionId="pricing_icon_star"
                    type="image"
                    fallback="/assets/images/icon/hero_star.png"
                    alt="pric-img2"
                  />
                </figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-md-0 mt-sm-5 mt-5" data-aos="fade-down">
              <CMSContent
                sectionId="pricing_title"
                type="html"
                as="h2"
                className="text-md-start text-sm-center text-center"
                fallback="FLEXIBLE SERVICE OPTIONS"
              />
              <CMSContent
                sectionId="pricing_description"
                type="html"
                as="p"
                className="text-md-start text-sm-center text-center p-md-0 p-sm-2 p-2"
                fallback="Start with a free consultation to understand your credit situation. Our transparent pricing and surety bond certification ensure you receive professional service with complete peace of mind."
              />
              <div className="pric-list" >
                <CMSContent
                  sectionId="pricing_item1_title"
                  type="html"
                  as="h6"
                  fallback="Free Consultation"
                />
                <div className="d-flex">
                  <div className="mt-3 me-3"><i className="fa-solid fa-check"></i></div>

                  <div className="d-flex justify-content-between gap-1">
                    <CMSContent
                      sectionId="pricing_item1_desc"
                      type="html"
                      as="p"
                      className="p-f-s"
                      fallback="Schedule your free consultation to discuss your credit goals and receive professional guidance."
                    />
                    <div className="d-flex pric-sup">
                      <h2>$</h2>
                      <h2>0</h2>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pric-list second">
                <CMSContent
                  sectionId="pricing_item2_title"
                  type="html"
                  as="h6"
                  fallback="Credit Analysis"
                />
                <div className="d-flex justify-content-between">
                  <div className="mt-3 me-3"><i className="fa-solid fa-check"></i></div>
                  <div className="d-flex justify-content-between">
                    <CMSContent
                      sectionId="pricing_item2_desc"
                      type="html"
                      as="p"
                      className="p-f-s"
                      fallback="Comprehensive credit report review with accurate analysis and personalized recommendations."
                    />
                    <div className="d-flex pric-sup ">
                      <h2></h2>
                      <h2>Custom</h2>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-md-start text-sm-center text-center pt-lg-4 pt-md-2 pt-sm-0 pt-1">
                <a className="btn-hover1" href="https://portal.savagesquad.com/portal-signUp/signup.jsp?id=QUdmcDBvQzhXNTk4Yy92TXluRG5KUT09">Book Consultation</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.9. pricing section ========  */}
      {/* ======== 1.10. profaessional section ========  */}
      <Testimonials />
      {/* ======== End of 1.10. profaessional section ========  */}
      {/* ======== 1.11. question section ========  */}
      <section className="question">
        <div className="container">
          <div className="row">
            <div className="question-text col-lg-6 col-md-6 tab-center" data-aos="fade-up">
              <CMSContent
                sectionId="faq_title"
                type="html"
                as="h2"
                className="text-lg-start text-md-start text-sm-center text-center"
                fallback="FREQUENTLY ASKED QUESTIONS"
              />
              <CMSContent
                sectionId="faq_description"
                type="html"
                as="p"
                className="text-lg-start text-md-start text-sm-center text-center mt-md-3 mt-3"
                fallback="Have questions about our credit services? We're here to help! Browse our most common questions below or schedule a free consultation to speak directly with our team about your specific situation."
              />
              <div className="text-lg-start text-md-start text-sm-center text-center ">
                <a className="btn-hover1" href="faq.html">More FAQs</a>
              </div>
            </div>
            <div className="question-collapes col-lg-6 col-md-6 mt-md-0 mt-sm-3 mt-3" data-aos="zoom-in">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h5 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <CMSContent
                        sectionId="faq_q1"
                        type="text"
                        as="span"
                        fallback="What services does Savage sqaud provide?"
                      />
                    </button>
                  </h5>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <CMSContent
                        sectionId="faq_a1"
                        type="html"
                        as="p"
                        fallback="Savage sqaud is a surety bond certified provider of professional credit services. We help clients through free consultations, accurate credit analysis, and personalized education to achieve their financial goals. We review your credit reports and provide clear recommendations."
                      />
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h5 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <CMSContent
                        sectionId="faq_q2"
                        type="text"
                        as="span"
                        fallback="How do I get started with Savage sqaud?"
                      />
                    </button>
                  </h5>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <CMSContent
                        sectionId="faq_a2"
                        type="html"
                        as="p"
                        fallback="Simply schedule your free consultation using our online booking system. During the consultation, we'll discuss your credit goals. Then, you'll provide your credit monitoring login details so we can conduct an accurate credit analysis and provide personalized recommendations."
                      />
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h5 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      <CMSContent
                        sectionId="faq_q3"
                        type="text"
                        as="span"
                        fallback="Is my information secure with Savage sqaud?"
                      />
                    </button>
                  </h5>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <CMSContent
                        sectionId="faq_a3"
                        type="html"
                        as="p"
                        fallback="Absolutely! We are surety bond certified, which provides an additional layer of protection and accountability. Your credit monitoring login details and personal information are handled with the highest security standards and used solely for conducting your credit analysis."
                      />
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h5 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      <CMSContent
                        sectionId="faq_q4"
                        type="text"
                        as="span"
                        fallback="Can I access my account from my phone?"
                      />
                    </button>
                  </h5>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <CMSContent
                        sectionId="faq_a4"
                        type="html"
                        as="p"
                        fallback="Yes! Savage sqaud offers mobile apps for both iOS and Android devices. You can also access our client portal from any web browser. This gives you 24/7 access to your account, credit analysis, and direct communication with our team."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.11. question section ========  */}
      <hr />
      {/* ======== 1.12. contact section ========  */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-hero">
            <CMSContent
              sectionId="contact_title"
              type="html"
              as="h2"
              className="text-center"
              fallback="CONTACT"
            />
            <CMSContent
              sectionId="contact_description"
              type="html"
              as="p"
              className="text-center"
              fallback="Get in touch with Savage sqaud for professional credit services. We're here to answer your questions and help you achieve your financial goals."
            />
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.4764417894684!2d-95.46347492346365!3d29.74043297532047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c0673c2d3f1d%3A0x5b8e46a5fc4c8fd!2s1980%20Post%20Oak%20Blvd%20%23100%2C%20Houston%2C%20TX%2077056%2C%20USA!5e0!3m2!1sen!2s!4v1731847200000!5m2!1sen!2s"
            width="600"
            height="450"
            style={{border: 0}}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <section className="d-flex justify-content-center">
          <div className="help position-relative">
            <div className="container">
              <div className="row d-flex gap-lg-5 gap-md-3 gap-sm-4 gap-3 justify-content-center">
                <div className="col-lg-5 col-md-5 help-crd1 aos-init aos-animate" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
                  <h4>HOW CAN WE HELP?</h4>
                  <p>Whether you have questions about our credit services, need to schedule a consultation, or want to learn more about how we can help you achieve your financial goals, our team is ready to assist you.</p>
                  <div className="d-flex gap-4 align-items-center">
                    <i className="fa-solid fa-house"></i>
                    <CMSContent
                      sectionId="contact_address"
                      type="text"
                      as="span"
                      fallback="1980 Post Oak Suite 100 Houston, TX 77056"
                    />
                  </div>
                  <div className="d-flex gap-4 align-items-center">
                    <i className="fa-solid fa-phone"></i>
                    <CMSContent
                      sectionId="contact_phone"
                      type="text"
                      as="span"
                      fallback="+1-866-753-4963"
                    />
                  </div>
                  <div className="d-flex gap-4 align-items-center">
                    <i className="fa-solid fa-envelope"></i>
                    <CMSContent
                      sectionId="contact_email"
                      type="text"
                      as="span"
                      fallback="Credit@savagesquad.com"
                    />
                  </div>
                  <h5>OPERATING HOURS</h5>
                  <div className="d-flex gap-4 align-items-center">
                    <i className="fa-solid fa-clock"></i>
                    <span>Monday To Friday <br /> 8:00am to 8:00pm AEDT</span>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 contact-email aos-init aos-animate" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
                  <h4>EMAIL US</h4>
                  <form action="https://html-templates.evonicmedia.com/paypath/action_page.php" id="footer-sub">
                    <div className="row justify-content-center gap-3">
                      <input type="text" name="name" id="name" className="col-md-5 col-sm-12 col-12" placeholder="Your Name" required />
                      <input type="email" name="email" id="email" className="col-md-5 col-sm-12 col-12" placeholder="Email Address" required />
                      <input type="number" name="number" id="number" className="col-md-5 col-sm-12 col-12" placeholder="Phone Number" required />
                      <input type="text" name="subject" id="subject" className="col-md-5 col-sm-12 col-12" placeholder="Subject" required />
                      <textarea className="col-md-11 col-12" name="massage" id="massage" cols="30" rows="10" placeholder="Write here message"></textarea>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <button className="e-btn btn-hover1" type="submit">Submit</button>
                    </div>
                  </form>
                </div>
                <div id="Succes-box"></div>
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* ======== End of 1.12. contact section ========  */}
      {/* ======== 1.13. footer section ========  */}
      <footer className="position-relative">
        <div className="container">
          <div className="footer-logo text-center pb-lg-4 pb-md-3 pb-sm-2 pb-4">
            {/* footer logo  */}
            <a href="#index.html">
              <figure>
                <CMSContent
                  sectionId="footer_logo"
                  type="image"
                  fallback="/assets/images/logo2.png"
                  alt="Savage sqaud Logo"
                  style={{height:"100px",width:"auto"}}
                />
              </figure>
            </a>
          </div>
          <ul className="d-flex align-items-center justify-content-center">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="#about">About us</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="https://portal.savagesquad.com" target="_blank" rel="noopener noreferrer">Sign In</a>
            </li>
            <li>
              <a href="https://portal.savagesquad.com/portal-signUp/signup.jsp?id=QUdmcDBvQzhXNTk4Yy92TXluRG5KUT09" target="_blank" rel="noopener noreferrer">Sign Up</a>
            </li>
          </ul>
          <hr />
          <div className="row footer-nav-icon">
            {/* footer social icon  */}
            <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-md-start justify-content-sm-center justify-content-center">
              <div className="social-icon d-flex gap-2 justify-content-md-start justify-content-sm-center justify-content-center">
                <a href="https://www.facebook.com/people/Savage-Credit-Repair/61558166635772/" target="_blank" rel="noopener noreferrer"> <i className="fa-brands fa-facebook-f foot-facebook"></i></a>
                <a href="https://www.instagram.com/savagecreditservices/?hl=en" target="_blank" rel="noopener noreferrer"> <i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
            {/* footer terms privacy  */}
            <div className="col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
              <div className=" d-flex gap-3 p-2">
                <a href="#">Terms & Condition</a>
                <a href="#">Privacy Policy</a>
              </div>
            </div>
            {/* footer logo slider  */}
         
          </div>
          <hr />
          <div className="Copyright d-flex justify-content-between flex-wrap dir">
            <CMSContent
              sectionId="footer_copyright"
              type="html"
              as="p"
              fallback="Copyright © 2025 Savage sqaud. All Rights Reserved. Surety Bond Certified."
            />
            <CMSContent
              sectionId="footer_tagline"
              type="html"
              as="p"
              fallback="Professional Credit Services"
            />
          </div>
        </div>
      </footer>
      {/* ======== End of 1.13. footer section ========  */}
    </div>
  );
}
