'use client';

import { useState, useEffect } from 'react';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await fetch('/api/faq?active=true');
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="accordion" id="accordionExample">
        <div className="text-center py-3">
          <span className="text-muted">Loading FAQs...</span>
        </div>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="accordion" id="accordionExample">
        <div className="text-center py-3">
          <span className="text-muted">No FAQs available at the moment.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="accordion" id="accordionExample">
      {faqs.map((faq, index) => {
        const headingId = `heading${index + 1}`;
        const collapseId = `collapse${index + 1}`;
        const isFirst = index === 0;

        return (
          <div className="accordion-item" key={faq._id}>
            <h5 className="accordion-header" id={headingId}>
              <button
                className={`accordion-button ${!isFirst ? 'collapsed' : ''}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${collapseId}`}
                aria-expanded={isFirst ? 'true' : 'false'}
                aria-controls={collapseId}
              >
                <span>{faq.question}</span>
              </button>
            </h5>
            <div
              id={collapseId}
              className={`accordion-collapse collapse ${isFirst ? 'show' : ''}`}
              aria-labelledby={headingId}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
