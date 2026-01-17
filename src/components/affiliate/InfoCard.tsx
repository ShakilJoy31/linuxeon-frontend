"use client";

import { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function InfoCard({ icon, title, description, className }: InfoCardProps) {
  return (
    <div
      className={`rounded-[24px] p-6 text-center flex flex-col items-center justify-center space-y-4 shadow-lg ${className}`}
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-opacity-20">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-lg">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}
