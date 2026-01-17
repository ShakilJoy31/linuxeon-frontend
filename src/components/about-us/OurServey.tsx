import { FC } from "react";
import serveyBankgroundImage from '@/assets/About-Us/servey-background.png'
import Heading from "../reusable-components/Heading";
import AnimatedText from "../reusable-components/AnimatedText";

const stats = [
    { value: "2020", label: "Journey Started" },
    { value: "89+", label: "Active Clients" },
    { value: "20+", label: "Team Members" },
    { value: "4 Years", label: "Years of Experience" },
];

const OurServey: FC = () => {
    return (
        <section className="bg-[#0A0914] text-white py-16 px-6 relative overflow-hidden">
            <div style={{
                backgroundImage: `url(${serveyBankgroundImage.src})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }} className="max-w-[1280px] mx-auto h-full ">


                <div className="md:flex justify-between items-center ">
                    <p className="text-lg font-medium text-gray-300 text-center">Approach</p>
                    <Heading><AnimatedText
                        text='We deliver creative ideas to a crowded world'
                        loop={false}
                        className="text-2xl sm:text-3xl md:text-[44px] font-bold leading-snug text-center "
                    /> </Heading>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-16">
                    {stats.map((item, i) => (
                        <div
                            key={i}
                            className="bg-[#1C1B29] rounded-2xl p-6 flex flex-col items-center justify-center text-center"
                        >
                            <p className="text-2xl md:text-3xl font-bold">{item.value}</p>
                            <span className="text-gray-400 text-sm md:text-base mt-2">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default OurServey;
