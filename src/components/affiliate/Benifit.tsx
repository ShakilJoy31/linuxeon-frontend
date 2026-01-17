"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface BenefitsCardProps {
    title: string;
    buttonColor?: string;
    gradientFrom?: string;
    gradientTo?: string;
    data: { name: number; value: number }[];
    lineColor?: string;
}

export default function BenefitsCard({
    title = "Performance Dashboard",
    buttonColor = "bg-purple-500",
    gradientFrom = "from-cyan-400",
    gradientTo = "to-blue-600",
    data = Array.from({ length: 30 }, (_, i) => ({
        name: i,
        value: Math.floor(Math.random() * 100),
    })),
    lineColor = "#00BFFF"
}: BenefitsCardProps) {
    const [view, setView] = useState<"graph" | "table">("graph");

    return (
        <div className="w-full h-full rounded-2xl shadow-md overflow-hidden bg-white">
            {/* Header */}
            <div className={`flex items-center justify-between bg-gradient-to-r ${gradientFrom} ${gradientTo} px-6 py-2`}>
                <h2 className="text-lg font-bold text-black">{title}</h2>
                <button className={`${buttonColor} p-2 rounded-full shadow-md hover:opacity-90 transition`}>
                    <ArrowUpRight className="text-white w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="bg-white p-4 h-[calc(100%-56px)]">
                {/* Top Controls */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-800 font-medium text-xs">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 inline"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 19h16M4 12h16M4 5h16" />
                            </svg>{" "}
                            Type
                        </button>
                        <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-800 font-medium text-xs">
                            Stacking
                        </button>
                        <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-800 font-medium text-xs">
                            %
                        </button>
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => setView("graph")}
                            className={`px-3 py-1 rounded-md font-medium text-xs ${view === "graph"
                                    ? "bg-gray-800 text-white"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            Graph
                        </button>
                        <button
                            onClick={() => setView("table")}
                            className={`px-3 py-1 rounded-md font-medium text-xs ${view === "table"
                                    ? "bg-gray-800 text-white"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            Table
                        </button>
                    </div>
                </div>

                {/* Chart or Table */}
                {view === "graph" ? (
                    <div className="w-full h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <XAxis dataKey="name" hide />
                                <YAxis hide />
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: '#1E293B',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#FFFFFF'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke={lineColor}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="overflow-x-auto h-[200px]">
                        <table className="w-full border border-gray-200 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-2 py-1">Day</th>
                                    <th className="border px-2 py-1">Earnings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((d, i) => (
                                    <tr key={i}>
                                        <td className="border px-2 py-1">Day {d.name + 1}</td>
                                        <td className="border px-2 py-1">৳{d.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}