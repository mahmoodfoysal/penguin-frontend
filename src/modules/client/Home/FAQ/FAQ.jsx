import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days. For customized items, please allow an additional 2-3 weeks for manufacturing before shipping.",
    },
    {
      question: "Do you offer international delivery?",
      answer:
        "Yes. We offer international delivery to select countries. Countries: Bangladesh, USA, Canada, China",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund, minus return shipping costs.",
    },
    {
      question: "Does the furniture come assembled?",
      answer:
        "Most of our smaller items come fully assembled. Larger items like beds and wardrobes require partial assembly. We offer a 'White Glove Delivery' service where our team will assemble it for you.",
    },
    {
      question: "Can I cancel or change my order?",
      answer:
        "You can modify or cancel your order within 2 hour of placing it. After that, the order is processed for shipping and cannot be changed.",
    },
  ];

  return (
    <section className="py-20 bg-base-200" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-base-content">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-base-content/60 font-light">
            Got questions? We've got answers. If you can't find what you're
            looking for, feel free to contact our support team.
          </p>
        </div>

        <div className="join join-vertical w-full bg-base-100 rounded-2xl shadow-sm">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow join-item border border-base-300"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-xl font-bold text-base-content py-5">
                {faq.question}
              </div>
              <div className="collapse-content text-base-content/70">
                <p className="pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
