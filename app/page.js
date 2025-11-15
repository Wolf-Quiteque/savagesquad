'use client';

export default function Home() {
  return (
    <div className="site-wrapper">
      <div className="first_nav_hero_about">
        {/* ======== 1.1. header section ======== */}
        <header>
          <nav className="container navbar navbar-expand-lg ">
            <div className="container-fluid">
              {/* site logo */}
              <a className="nav-logo p-0" href="#'index.html"><img src="assets/images/savage squad logos_1 gold.png" alt="Savage Squade Logo" /></a>
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
                    <a className="nav-link" href="#about.html">About us</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#feature.html">Feature</a>
                  </li>
                  <li className="dropdown">
                    <a className="nav-link " href="#">Pages <i className="fa-sharp fa-solid fa-sort-down"></i></a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#pricing.html">Pricing</a></li>
                      <li><a className="dropdown-item" href="contact.html">Contact</a></li>
                      <li><a className="dropdown-item" href="team.html">Team</a></li>
                      <li><a className="dropdown-item" href="testimonials.html">Testimonials</a></li>
                      <li><a className="dropdown-item" href="blogs.html">Blogs</a></li>
                      <li><a className="dropdown-item" href="faq.html">FAQ</a></li>
                      <li><a className="dropdown-item" href="404.html">404</a></li>
                      <li><a className="dropdown-item" href="coming.html">Coming Soon</a></li>
                    </ul>
                  </li>
                  <li className="nav-item">
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
                <figure className="navbar-brand"><a href="#index.html"><img src="assets/images/savage squad logos_1 gold.png" alt="Savage Squade Logo" className="nav-logo" /></a></figure>
                <div className="closebtn" onClick={() => closeNav()}><i className="fa-solid fa-square-xmark side-bar-close-btn"></i></div>
              </div>
              <ul>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="index.html">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="about.html">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="feature.html">Feature</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="pricing.html">Pricing</a>
                </li>
                <li className="nav-item">
                  <div className="d-flex align-items-center justify-content-between pt-3" id="slid-btn">
                    <button className="a-slid">Pages</button>
                    <i className="fa-solid fa-caret-down pe-4"></i>
                  </div>
                  <ul id="slid-drop" className="myst">
                    <li><a href="#contact.html">Contact</a></li>
                    <li><a href="#team.html">Team</a></li>
                    <li><a href="#testimonials.html">Testimonials</a></li>
                    <li><a href="#blogs.html">Blogs</a></li>
                    <li><a href="#faq.html">FAQ</a></li>
                    <li><a href="#404.html">404</a></li>
                    <li><a href="#coming.html">Coming Soon</a></li>
                  </ul>
                </li>
              </ul>
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
              <a className="p-0 " href="index.html"><img src="assets/images/savage squad logos_1 gold.png" alt="Savage Squade Logo" /></a>
              <button className="close_right_sidebar fa-solid fa-xmark" onClick={() => close_right_sade()}> </button>
            </div>
            <p className="mt-4 pb-3">Savage Squade is surety bond certified to provide professional credit services.
              We help clients achieve their financial goals through expert credit analysis and personalized solutions.
            </p>
            <a href="https://portal.savagesquad.com/portal-signUp/signup.jsp?id=QUdmcDBvQzhXNTk4Yy92TXluRG5KUT09" className="btn-hover1">Discover More</a>
            <hr />
            <h5 className="mt-4 mb-4">Connected details:</h5>
            <ul className="d-flex flex-column gap-3">
              <li>
                <a href="#"> <i className="fa-solid fa-phone"></i></a>
                <a href="#"><span className="__cf_email__" data-cfemail="9de4f2e8eff3fcf0f8ddf8f0fcf4f1b3fef2f0">[email&#160;protected]</span></a>
              </li>
              <li>
                <a href="#"><i className="fa-solid fa-envelope"></i></a>
                <a href="#">+123-456-7890</a>
              </li>
              <li>
                <a href="#"><i className="fa-solid fa-clock"></i></a>
                <a href="#">Office Hours: 8AM - 11PM Sunday -
                  Weekend Day</a>
              </li>
            </ul>
            <span className="d-flex gap-4 mt-4">
              <a href="#" className="p-0"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="p-0"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="p-0"><i className="fa-brands fa-twitter"></i></a>
            </span>
          </section>
        </header>
        {/* ======== End of 1.1. header section ========  */}
        {/* ======== 1.2. hero section ======== */}
        <section className="hero">
          <div className="container">
            <div className="row text-md-start text-sm-center text-center gap-md-0 gap-sm-4 gap-5">
              <div data-aos="fade-up" className="col-md-6 d-flex align-items-md-start align-items-ms-center align-items-center justify-content-center flex-column">
                <h1>EMPOWER YOUR CREDIT JOURNEY</h1>
                <p>Savage Squade provides surety bond certified credit services. Schedule your free consultation
                  today and discover how we can help you achieve your financial goals through expert credit analysis
                  and personalized solutions.</p>
                <a className="btn-hover1" href="https://portal.savagesquad.com/Portal/meeting.jsp?id=7ff2e042-ac2f-41f4-bae3-24fdb1f43d65">Schedule Free Consultation</a>
              </div>
              <div data-aos="fade-down" className="col-md-6 position-relative d-flex flex-column justify-content-center align-items-center mt-md-0 mt-sm-5 mt-4">
                <img src="assets/images/index/hero.png" alt="hero_img1" className="moving" />
                <img src="assets/images/index/hero_watch.png" alt="hero_img2" />
                <img src="assets/images/icon/hero_star.png" alt="hero_icon" />
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
                  <h3>About Savage Squade</h3>
                  <p className="p-f-s">We are a surety bond certified company specializing in professional credit services.
                    Our mission is to educate clients on credit health, provide accurate credit analysis, and guide them
                    toward achieving their financial goals through a simple and transparent process.</p>
                  <div className="d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-center">
                    <a className="btn-hover1" href="about.html">Learn More</a>
                    <div className="abut-video">
                      <a className="video-play-button" href="#">
                        <span className="fa-solid fa-play"></span>
                      </a>

                    </div>
                    <div className="p-f-s w-v">Watch Video</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-center mt-md-0 mt-sm-3 mt-3">
                <div className="ab_card2 d-flex flex-column justify-content-between" data-aos="flip-right">
                  <div>
                    <div className="row gap-md-0 gap-sm-3 gap-3">
                      <div className="col-md-5 col-sm-12 col-12 ">
                        <div className="d-flex justify-content-md-start justify-content-sm-center justify-content-center">
                          <h3 className="count">38</h3>
                          <h3>M+</h3>
                        </div>
                        <p className="p-f-s">Clients have trusted Savage Squade with their credit journey!</p>
                      </div>
                      <div className="col-2 p-0 d-flex justify-content-center align-items-center">
                        <hr />
                      </div>
                      <div className="col-md-5 col-sm-12 col-12 p-0">
                        <h3>100%</h3>
                        <p className="p-f-s">Surety Bond Certified for your protection and peace of mind
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mb-3 mt-4 gap-4 justify-content-md-start justify-content-ms-center justify-content-center">
                    <div className="position-relative">
                      <img src="assets/images/index/about_card_img1.svg" alt="about_img1" />
                      <img src="assets/images/index/about_card_img2.svg" alt="about_img2" />
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
          <h2>PROFESSIONAL CREDIT SERVICES YOU CAN TRUST</h2>
          <p className="mt-0">As a surety bond certified provider, Savage Squade offers comprehensive credit services
            designed to help you understand and improve your credit health. Our easy process starts with a free consultation,
            followed by accurate credit analysis using your credit monitoring details.</p>
          <div className="finanes-card row gap-md-0 gap-sm-4 gap-4">
            <div className="col-lg-4 col-md-4 d-flex justify-content-center pe-lg-3 pe-md-0 pe-sm-3 pe-3">
              <div className="fin-card" data-aos="flip-up">
                <figure><img src="assets/images/icon/graphe.png" alt="praph" /></figure>
                <h4>Credit Analysis</h4>
                <p className="p-f-s">Comprehensive credit report review and accurate analysis to identify opportunities for improvement.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 d-flex justify-content-center pe-lg-3 pe-md-0 pe-sm-3 pe-3">
              <div className="fin-card" data-aos="flip-up">
                <figure> <img src="assets/images/icon/doller.png" alt="doller" /></figure>
                <h4>Free Consultation</h4>
                <p className="p-f-s">Schedule your free consultation and learn how we can help you achieve your credit goals.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 d-flex justify-content-center">
              <div className="fin-card" data-aos="flip-up">
                <figure><img src="assets/images/icon/arow.png" alt="arow" /></figure>
                <h4>Expert Guidance</h4>
                <p className="p-f-s">Personalized education and support throughout your entire credit journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.4. finance section ========  */}
      {/* ======== 1.5. ispsum section ========  */}
      <div className="ispsum-logo">
        <div className="container">
          <hr />
          <div className="logo_ispsum_slider">
            <a href="#">
              <figure><img src="assets/images/icon/ipsum-1.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="assets/images/icon/ipsum-2.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="assets/images/icon/ispum-3.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="assets/images/icon/ipsum-4.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="assets/images/icon/ipsum-1.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="assets/images/icon/ipsum-2.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="assets/images/icon/ispum-3.png" alt="img" /></figure>
            </a>
            <a href="#">
              <figure><img src="assets/images/icon/ipsum-4.png" alt="img" /></figure>
            </a>
          </div>
          <hr />
        </div>
      </div>
      {/* ======== End of 1.5. ispsum section ========  */}
      {/* ======== 1.6. gateway section ========  */}
      <section className="gateway">
        <div className="container">
          <div className="row gap-lg-0 gap-md-0 gap-sm-4 gap-4">
            <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center" data-aos="fade-up">
              <div className=" gateway-bg-img mt-5 ">
                <figure><img src="assets/images/index/gateway-1.png" alt="gate_img1" className="moving" /></figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-6  text-md-start text-sm-center text-center" data-aos="fade-down">
              <h2>SIMPLE 3-STEP PROCESS</h2>
              <p className="pt-lg-4 pt-md-3 pt-sm-2 pt-2 pb-2">Getting started with Savage Squade is easy.
                Our straightforward process ensures you receive the best credit services with complete transparency
                and professional guidance every step of the way.</p>
              <div className="gate mt-md-3 mt-sm-0 mt-4   d-flex flex-md-row flex-sm-column flex-column align-items-center">
                <figure className="d-flex align-items-center"><img src="assets/images/icon/gate-icon1.png" alt="gate-img1" /></figure>
                <div className="ms-lg-3 ms-md-3 ms-sm-0 ms-0">
                  <h5 className="pb-2">Schedule Free Consultation</h5>
                  <p className="p-f-s">Book your free consultation to discuss your credit goals and learn about our
                    surety bond certified services.</p>
                </div>
              </div>
              <div className="gate d-flex mt-4  flex-md-row flex-sm-column flex-column align-items-center">
                <figure className="d-flex align-items-center"><img src="assets/images/icon/gate-icon2.png" alt="gate-img2" /></figure>
                <div className="ms-lg-3 ms-md-3 ms-sm-0 ms-0">
                  <h5 className="pb-2">Provide Credit Monitoring Access</h5>
                  <p className="p-f-s">Securely share your credit monitoring login details so we can conduct an
                    accurate and comprehensive credit analysis.</p>
                </div>
              </div>
              <div className="gate d-flex mt-4  flex-md-row flex-sm-column flex-column align-items-center">
                <figure className="d-flex align-items-center"><img src="assets/images/icon/gate-icon3.png" alt="gate-img3" /></figure>
                <div className="ms-lg-3 ms-md-3 ms-sm-0 ms-0">
                  <h5 className="pb-2">Receive Your Credit Analysis</h5>
                  <p className="p-f-s">Get a detailed credit analysis with clear expectations and personalized
                    recommendations for your credit journey.</p>
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
                Savage Squade is proud to be surety bond certified, providing you with professional credit services
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
                      <span><i className="fa-brands fa-youtube"></i></span>
                      <div>
                        <h6>Youtube Premium</h6>
                        <p>9 June 2023</p>
                      </div>
                    </div>
                    <div className="d-flex text-pink">
                      <p>-$</p>
                      <p className="count">3.00</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex">
                      <span><i className="fa-brands fa-facebook"></i></span>
                      <div>
                        <h6>Facebook Ads</h6>
                        <p>5 June 2023</p>
                      </div>
                    </div>
                    <div className="d-flex text-green">
                      <p>+$</p>
                      <p className="count">21.00</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex">
                      <span><i className="fa-brands fa-pinterest-p"></i></span>
                      <div>
                        <h6>Pinterest</h6>
                        <p>2 June 2023</p>
                      </div>
                    </div>
                    <div className="d-flex text-pink">
                      <p>-$</p>
                      <p className="count">14.00</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex">
                      <span><i className="fa-brands fa-twitter"></i></span>
                      <div>
                        <h6>Twitter</h6>
                        <p>1 June 2023</p>
                      </div>

                    </div>
                    <div className="d-flex text-green">
                      <p>+$</p>
                      <p className="count">51.00</p>
                    </div>
                  </div>
                </div>
                <figure><img src="assets/images/index/lady-mobile.png" alt="sevice_img2" /></figure>
                <figure><img src="assets/images/icon/whitStar.png" alt="sevice_img3" /></figure>
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
            <figure><img src="assets/images/index/vesa-back.png" alt="visa-img" /></figure>
          </div>
          <div className="visa-contant" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <h3 className="text-md-start text-sm-center text-center">Access Your Account
                  Anywhere
                </h3>
                <p className="text-md-start text-sm-center text-center p-f-s">Savage Squade offers multiple ways
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
                  <figure><img src="assets/images/icon/vis-1.png" alt="vica-icon1" /> </figure>
                  <figure><img src="assets/images/icon/ves-2.png" alt="vica-icon2" /></figure>
                  <figure><img src="assets/images/icon/ves-3.png" alt="vica-icon3" /></figure>
                  <figure><img src="assets/images/icon/ves-4.png" alt="vica-icon4" /></figure>
                  <figure><img src="assets/images/icon/ves-5.png" alt="vica-icon5" /></figure>
                </div>
                <div className="d-flex pt-2 justify-content-md-start justify-content-center justify-content-center">
                  <h2 className="count">3</h2>
                  <h2></h2>
                  <h6 className="d-flex align-items-center ps-2 ">Access Platforms</h6>
                </div>
                <p className="pt-2 pb-3 text-md-start text-sm-center text-center p-f-s">Web portal, iOS app, and Android app -
                  choose the platform that works best for you.</p>
                <div className="visa-card position-relative mt-3">
                  <img src="assets/images/index/Card.png" alt="visa-card" />
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
                <figure><img src="assets/images/index/pricinge.png" alt="pric-img1" className="moving" /></figure>
                <figure><img src="assets/images/icon/hero_star.png" alt="pric-img2" /></figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-md-0 mt-sm-5 mt-5" data-aos="fade-down">
              <h2 className=" text-md-start text-sm-center text-center">FLEXIBLE SERVICE OPTIONS</h2>
              <p className="text-md-start text-sm-center text-center p-md-0 p-sm-2 p-2">Start with a free consultation to
                understand your credit situation. Our transparent pricing and surety bond certification ensure you receive
                professional service with complete peace of mind.</p>
              <div className="pric-list">
                <h6>Free Consultation</h6>
                <div className="d-flex">
                  <div className="mt-3 me-3"><i className="fa-solid fa-check"></i></div>

                  <div className="d-flex justify-content-between gap-1">
                    <p className="p-f-s">Schedule your free consultation to discuss your credit goals and receive
                      professional guidance.</p>
                    <div className="d-flex pric-sup">
                      <h2>$</h2>
                      <h2>0</h2>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pric-list second">
                <h6>Credit Analysis</h6>
                <div className="d-flex justify-content-between">
                  <div className="mt-3 me-3"><i className="fa-solid fa-check"></i></div>
                  <div className="d-flex justify-content-between">
                    <p className="p-f-s">Comprehensive credit report review with accurate analysis and personalized
                      recommendations.</p>
                    <div className="d-flex pric-sup ">
                      <h2></h2>
                      <h2>Custom</h2>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-md-start text-sm-center text-center pt-lg-4 pt-md-2 pt-sm-0 pt-1">
                <a className="btn-hover1" href="https://portal.savagesquad.com/Portal/meeting.jsp?id=7ff2e042-ac2f-41f4-bae3-24fdb1f43d65">Book Consultation</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.9. pricing section ========  */}
      {/* ======== 1.10. profaessional section ========  */}
      <section className="profaessional">
        <div className="container">
          <h2 className="text-center">Trusted By Our Clients</h2>
          <p className="text-center pt-3 pb-5 mb-2">See what our clients say about their experience with Savage Squade.
            We take pride in helping people achieve their credit goals through professional, surety bond certified services
            and personalized support.</p>
          <div className="prof-size" data-aos="zoom-in-up">
            <div className="prof-slider ">
              <div className="prof-slide position-relative">
                <div>
                  <div className="d-flex  align-items-center justify-content-center">
                    <img src="assets/images/slider/profational2.png" alt="img" className="prof-img-2" />
                  </div>
                  <div>
                    <img src="assets/images/slider/Comma.png" alt="img" className="prof-img-1" />
                  </div>
                  <p className="text-center p-f-s">Savage Squade helped me understand my credit report and provided
                    clear guidance on improving my credit. Their professional service and transparent process made
                    all the difference in my financial journey!</p>
                  <div className="prof-star pt-2 pb-2 text-center">
                    <span className="stars text-lg-start">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                  <h5 className="text-center">Johnny Stone</h5>
                  <p className="text-center pt-2 pb-5 p-f-s">Happy Client</p>
                </div>
              </div>
              <div className="prof-slide position-relative">
                <div>
                  <div className="d-flex  align-items-center justify-content-center">
                    <img src="assets/images/slider/profactional3.png" alt="img" className="prof-img-2" />
                  </div>
                  <div>
                    <img src="assets/images/slider/Comma.png" alt="img" className="prof-img-1" />
                  </div>
                  <p className="text-center p-f-s">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Enim
                    qui
                    porro perferendis voluptatibus minima, eius illo animi nihil sed natus! Deleniti
                    officia
                    dolores culpa alias quasi repellat corrupti doloremque aliquam!</p>
                  <div className="prof-star pt-2 pb-2 text-center">
                    <span className="stars text-lg-start">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                  <h5 className="text-center">Stephen Stewart</h5>
                  <p className="text-center pt-2 pb-5 p-f-s">Entrepreneur</p>
                </div>
              </div>
              <div className="prof-slide position-relative">
                <div>
                  <div className="d-flex  align-items-center justify-content-center">
                    <img src="assets/images/slider/profacitional.png" alt="img" className="prof-img-2" />
                  </div>
                  <div>
                    <img src="assets/images/slider/Comma.png" alt="img" className="prof-img-1" />
                  </div>
                  <p className="text-center p-f-s">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Enim
                    qui
                    porro perferendis voluptatibus minima, eius illo animi nihil sed natus! Deleniti
                    officia
                    dolores culpa alias quasi repellat corrupti doloremque aliquam!</p>
                  <div className="prof-star pt-2 pb-2 text-center">
                    <span className="stars text-lg-start">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                  <h5 className="text-center">Tom Hiddellon</h5>
                  <p className="text-center pt-2 pb-5 p-f-s">Entrepreneur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.10. profaessional section ========  */}
      {/* ======== 1.11. question section ========  */}
      <section className="question">
        <div className="container">
          <div className="row">
            <div className="question-text col-lg-6 col-md-6 tab-center" data-aos="fade-up">
              <h2 className="text-lg-start text-md-start text-sm-center text-center">FREQUENTLY ASKED
                QUESTIONS
              </h2>
              <p className="text-lg-start text-md-start text-sm-center text-center mt-md-3 mt-3">Have questions about our
                credit services? We&apos;re here to help! Browse our most common questions below or schedule a free
                consultation to speak directly with our team about your specific situation.</p>
              <div className="text-lg-start text-md-start text-sm-center text-center ">
                <a className="btn-hover1" href="faq.html">More FAQs</a>
              </div>
            </div>
            <div className="question-collapes col-lg-6 col-md-6 mt-md-0 mt-sm-3 mt-3" data-aos="zoom-in">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h5 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      What services does Savage Squade provide?
                    </button>
                  </h5>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p> Savage Squade is a surety bond certified provider of professional credit services. We help clients
                        through free consultations, accurate credit analysis, and personalized education to achieve their
                        financial goals. We review your credit reports and provide clear recommendations.</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h5 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      How do I get started with Savage Squade?
                    </button>
                  </h5>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p> Simply schedule your free consultation using our online booking system. During the consultation,
                        we&apos;ll discuss your credit goals. Then, you&apos;ll provide your credit monitoring login details so we can
                        conduct an accurate credit analysis and provide personalized recommendations.</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h5 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Is my information secure with Savage Squade?
                    </button>
                  </h5>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p> Absolutely! We are surety bond certified, which provides an additional layer of protection
                        and accountability. Your credit monitoring login details and personal information are handled with
                        the highest security standards and used solely for conducting your credit analysis.</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h5 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      Can I access my account from my phone?
                    </button>
                  </h5>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p>Yes! Savage Squade offers mobile apps for both iOS and Android devices. You can also access
                        our client portal from any web browser. This gives you 24/7 access to your account, credit analysis,
                        and direct communication with our team.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.11. question section ========  */}
      {/* ======== 1.12. news-cards section ========  */}
      <section className="news-cards">
        <div className="container">
          <h2 className="text-center">CREDIT EDUCATION & RESOURCES</h2>
          <p className="text-center news-p">Stay informed with our latest articles about credit health, financial tips,
            and industry updates to help you on your credit journey.</p>
          <div className="row d-flex gap-md-0 gap-sm-5 gap-4">
            <div className="col-lg-4 col-md-4 d-flex" data-aos="flip-right">
              <div className="card news-card-back">
                <img src="assets/images/index/news-1.png" alt="card-img" />
                <div className="card-body">
                  <a href="#">
                    <h5>Understanding Your Credit Report: A Complete Guide</h5>
                  </a>
                  <p className="card-text p-f-s">Learn how to read and understand your credit report, and discover what
                    factors impact your credit score.</p>
                </div>
                <hr className="dotted-line" />
                <div className="card-viewer d-flex justify-content-between ">
                  <div>
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>2023/06/12</span>
                  </div>
                  <div>
                    <i className="fa-regular fa-message"></i>
                    <span>0</span>
                  </div>
                </div>
                <div className="news-link">
                  <a className="btn-hover1" href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 d-flex" data-aos="flip-right">
              <div className="card news-card-back">
                <img src="assets/images/index/news-2.png" alt="image" />
                <div className="card-body">
                  <a href="#">
                    <h5>Why Surety Bond Certification Matters for Credit Services</h5>
                  </a>
                  <p className="card-text p-f-s">Discover the importance of working with a surety bond certified credit
                    service provider and how it protects you.</p>
                </div>
                <hr className="dotted-line" />
                <div className="card-viewer d-flex justify-content-between ">
                  <div>
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>2023/06/12</span>
                  </div>
                  <div>
                    <i className="fa-regular fa-message"></i>
                    <span>0</span>
                  </div>
                </div>
                <div className="card-color">
                  <a className="btn-hover1" href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 d-flex" data-aos="flip-right">
              <div className="card news-card-back">
                <img src="assets/images/index/news-3.png" alt="image" />
                <div className="card-body">
                  <a href="#">
                    <h5>Setting Realistic Credit Goals: A Roadmap to Success</h5>
                  </a>
                  <p className="card-text p-f-s">Learn how to set achievable credit goals and create a personalized plan
                    for your financial future.</p>
                </div>
                <hr className="dotted-line" />
                <div className="card-viewer d-flex justify-content-between ">
                  <div>

                    <i className="fa-solid fa-calendar-days"></i>
                    <span>2023/06/12</span>
                  </div>
                  <div>
                    <i className="fa-regular fa-message"></i>
                    <span>0</span>
                  </div>
                </div>
                <div>
                  <a className="btn-hover1" href="#">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.12. news-cards section ========  */}
      {/* ======== 1.13. footer section ========  */}
      <footer className="position-relative">
        <div className="container">
          <h4 className="text-center">SUBSCRIBE TO CREDIT TIPS & UPDATES</h4>
          <p className="text-center pt-2 pb-3">Get the latest credit education and updates from Savage Squade</p>
          <form className="d-flex align-items-center justify-content-center" id="footer-sub2">
            {/* form Subscribe massage */}
            <div id="Succes-box2"></div>
            <div className="d-flex footer-search">
              <input type="email" name="search" placeholder="Enter your Email" required />
              <button type="submit" className="btn-hover1">Subscribe</button>
            </div>
          </form>
          <div className="footer-logo text-center pb-lg-4 pb-md-3 pb-sm-2 pb-4">
            {/* footer logo  */}
            <a href="#index.html">
              <figure><img src="assets/images/savage squad logos_1 gold.png" alt="Savage Squade Logo" /></figure>
            </a>
          </div>
          <ul className="d-flex align-items-center justify-content-center">
            <li>
              <a href="#">Feature</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Faq</a>
            </li>
          </ul>
          <hr />
          <div className="row footer-nav-icon">
            {/* footer social icon  */}
            <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-md-start justify-content-sm-center justify-content-center">
              <div className="social-icon d-flex gap-2 justify-content-md-start justify-content-sm-center justify-content-center">
                <a href="#"> <i className="fa-brands fa-facebook-f foot-facebook"></i></a>
                <a href="#"> <i className="fa-brands fa-twitter"></i></a>
                <a href="#"> <i className="fa-brands fa-instagram"></i></a>
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
            <div className="col-lg-3 col-md-3">
              <div className="footer_ispsum_slider">
                <figure><a href="#"><img src="assets/images/icon/logoipsum-228.png" alt="qr-code" /></a>
                </figure>
                <figure><a href="#"><img src="assets/images/icon/logoipsum-233.png" alt="qr-code" /></a>
                </figure>
                <figure><a href="#"><img src="assets/images/icon/logoipsum-229.png" alt="qr-code" /></a>
                </figure>
                <figure><a href="#"><img src="assets/images/icon/logoipsum-228.png" alt="qr-code" /></a>
                </figure>
                <figure><a href="#"><img src="assets/images/icon/logoipsum-233.png" alt="qr-code" /></a>
                </figure>
                <figure><a href="#"><img src="assets/images/icon/logoipsum-229.png" alt="qr-code" /></a>
                </figure>
              </div>
            </div>
          </div>
          <hr />
          <div className="Copyright d-flex justify-content-between flex-wrap dir">
            <p>Copyright © 2025 Savage Squade. All Rights Reserved. Surety Bond Certified.</p>
            <p>Professional Credit Services</p>
          </div>
        </div>
      </footer>
      {/* ======== End of 1.13. footer section ========  */}
    </div>
  );
}
