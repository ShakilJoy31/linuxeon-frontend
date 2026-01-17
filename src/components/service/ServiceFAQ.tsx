
import AnimatedText from "../reusable-components/AnimatedText";
import Heading from "../reusable-components/Heading";
import ServiceFAQComponent from "./ServiceFAQCard";

interface FAQItem {
    number: string;
    question: string;
    answer?: string;
}

const faqs: FAQItem[] = [
    {
        number: "(001)",
        question: "How long does a UI/UX design project take?",
        answer:
            "The duration depends on the complexity of the project, but most UI/UX design projects take between 4 to 8 weeks.",
    },
    {
        number: "(002)",
        question: "Will I get a prototype before final delivery?",
        answer:
            "Yes. We create interactive prototypes so you can visualize how your product will look and work before development starts.",
    },
    {
        number: "(003)",
        question: "How to manage Agile project teams?",
        answer:
            "We follow Agile best practices including sprints, daily stand-ups, and continuous feedback to keep the project on track.",
    },
    {
        number: "(004)",
        question: "Can you redesign my existing website or app?",
        answer:
            "Absolutely. We specialize in website and app redesigns that improve both the visual appeal and functionality.",
    },
    {
        number: "(005)",
        question: "What if I need changes after the final design?",
        answer:
            "We offer a post-delivery support period to handle minor adjustments and ensure your satisfaction.",
    },
];

export default function ServiceFAQ() {

    return (
        <section className="bg-white dark:bg-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8">
                {/* Section title - moves to top on mobile */}
                <div className="lg:w-1/5">
                    <p className="text-gray-700 dark:text-gray-300 mb-4 lg:mb-2 text-sm pt-5">FAQ</p>
                </div>

                {/* FAQ list */}
                <div className="lg:w-4/5">
                    <Heading className="text-4xl sm:text-5xl md:text-[60px] lg:text-[70px] font-semibold leading-tight mb-6 sm:mb-10">
                        <AnimatedText
                            text='Learn some common answers about newly projects'
                            loop={false}
                            speed={0.02}
                        />
                    </Heading>

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
