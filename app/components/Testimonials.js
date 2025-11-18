'use client';

import { useState, useEffect } from 'react';
import CMSContent from './CMSContent';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    // Initialize slider after testimonials load
    if (!loading && typeof window !== 'undefined' && window.jQuery && window.jQuery.fn.slick) {
      const $ = window.jQuery;
      const profSlider = $('.prof-slider');

      // Destroy existing slider if present
      if (profSlider.hasClass('slick-initialized')) {
        profSlider.slick('unslick');
      }

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (profSlider.length) {
          profSlider.slick({
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 700,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button class="prev-arrow"><i class="fa-solid fa-arrow-left"></i></button>',
            nextArrow: '<button class="next-arrow"><i class="fa-solid fa-arrow-right"></i></button>',
            responsive: [{
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }]
          });
        }
      }, 100);
    }
  }, [loading, testimonials]);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials?active=true');
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    }
    setLoading(false);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star${i < count ? '' : ' text-muted opacity-50'}`}
      ></i>
    ));
  };

  if (loading) {
    return (
      <section className="profaessional">
        <div className="container">
          <CMSContent
            sectionId="testimonials_title"
            type="html"
            as="div"
            className="text-center"
            fallback="Trusted By Our Clients"
          />
          <div className="text-center py-5">
            <p className="text-muted">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  // If no testimonials, show static default ones
  if (testimonials.length === 0) {
    return (
      <section className="profaessional">
        <div className="container">
          <CMSContent
            sectionId="testimonials_title"
            type="html"
            as="div"
            className="text-center"
            fallback="Trusted By Our Clients"
          />
          <CMSContent
            sectionId="testimonials_description"
            type="html"
            as="div"
            className="text-center pt-3 pb-5 mb-2"
            fallback="See what our clients say about their experience with Savage sqaud. We take pride in helping people achieve their credit goals through professional, surety bond certified services and personalized support."
          />
          <div className="prof-size" data-aos="zoom-in-up">
            <div className="prof-slider">
              <div className="prof-slide position-relative">
                <div>
                  <div className="d-flex align-items-center justify-content-center">
                    <CMSContent
                      sectionId="testimonial1_image"
                      type="image"
                      fallback="/assets/images/slider/profational2.png"
                      alt="img"
                      className="prof-img-2"
                    />
                  </div>
                  <div>
                    <img src="/assets/images/slider/Comma.png" alt="img" className="prof-img-1" />
                  </div>
                  <CMSContent
                    sectionId="testimonial1_text"
                    type="html"
                    as="div"
                    className="text-center p-f-s"
                    fallback="Savage sqaud helped me understand my credit report and provided clear guidance on improving my credit. Their professional service and transparent process made all the difference in my financial journey!"
                  />
                  <div className="prof-star pt-2 pb-2 text-center">
                    <span className="stars text-lg-start">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                  <CMSContent
                    sectionId="testimonial1_name"
                    type="html"
                    as="div"
                    className="text-center"
                    fallback="Johnny Stone"
                  />
                  <CMSContent
                    sectionId="testimonial1_role"
                    type="html"
                    as="div"
                    className="text-center pt-2 pb-5 p-f-s"
                    fallback="Happy Client"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="profaessional">
      <div className="container">
        <CMSContent
          sectionId="testimonials_title"
          type="html"
          as="div"
          className="text-center"
          fallback="Trusted By Our Clients"
        />
        <CMSContent
          sectionId="testimonials_description"
          type="html"
          as="div"
          className="text-center pt-3 pb-5 mb-2"
          fallback="See what our clients say about their experience with Savage sqaud. We take pride in helping people achieve their credit goals through professional, surety bond certified services and personalized support."
        />
        <div className="prof-size" data-aos="zoom-in-up">
          <div className="prof-slider">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="prof-slide position-relative">
                <div>
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      src={testimonial.profile_image}
                      alt={testimonial.name}
                      className="prof-img-2"
                    />
                  </div>
                  <div>
                    <img src="/assets/images/slider/Comma.png" alt="img" className="prof-img-1" />
                  </div>
                  <p className="text-center p-f-s">{testimonial.text}</p>
                  <div className="prof-star pt-2 pb-2 text-center">
                    <span className="stars text-lg-start">
                      {renderStars(testimonial.stars)}
                    </span>
                  </div>
                  <h5 className="text-center">{testimonial.name}</h5>
                  <p className="text-center pt-2 pb-5 p-f-s">{testimonial.occupation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
