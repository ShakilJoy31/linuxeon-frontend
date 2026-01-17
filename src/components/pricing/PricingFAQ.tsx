"use client";
import AnimatedText from "../reusable-components/AnimatedText";
import ServiceFAQComponent from "../service/ServiceFAQCard";

interface FAQItem {
    number: string;
    question: string;
    answer?: string;
}

const faqs: FAQItem[] = [
    {
        number: "(001)",
        question: "Can I buy credits instead?",
        answer:
            "The duration depends on the complexity of the project, but most UI/UX design projects take between 4 to 8 weeks.",
    },
    {
        number: "(002)",
        question: "How do I switch to a different plan?",
        answer:
            "Yes. We create interactive prototypes so you can visualize how your product will look and work before development starts.",
    },
    {
        number: "(003)",
        question: "What payment methods do you offer?",
        answer:
            "We follow Agile best practices including sprints, daily stand-ups, and continuous feedback to keep the project on track.",
    },
    {
        number: "(004)",
        question: "What happens if I hit my contact or sending limit?",
        answer:
            "Absolutely. We specialize in website and app redesigns that improve both the visual appeal and functionality.",
    },
    {
        number: "(005)",
        question: "Do you have pricing for high-volume email senders?",
        answer:
            "We offer a post-delivery support period to handle minor adjustments and ensure your satisfaction.",
    },
];


export default function PricingFAQ() {
    return (
        <section className="bg-white dark:bg-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8">
                {/* Section title - moves to top on mobile */}
                <div className="lg:w-1/5">
                    <p className="text-gray-500 dark:text-gray-300 pt-5 text-sm">FAQ</p>
                </div>

                {/* FAQ list */}
                <div className="lg:w-4/5">
                 <AnimatedText className="text-4xl sm:text-5xl md:text-[60px] lg:text-[70px] font-semibold leading-tight mb-6 sm:mb-10"
                            text="Some Questions answer regarding Pricing"
                            loop={false}
                            
                        />
                    {/* <h2 className="text-4xl sm:text-5xl md:text-[60px] lg:text-[70px] font-semibold leading-tight mb-6 sm:mb-10">
                        
                    </h2> */}

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <ServiceFAQComponent key={index} faq={faq} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}