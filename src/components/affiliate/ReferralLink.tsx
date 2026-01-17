// components/ReferralLink.tsx
"use client";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import Button from "../reusable-components/Button";
import { Toaster, toast } from "react-hot-toast";

const ReferralLink = () => {
  const [isCopied, setIsCopied] = useState(false);
  const referralLink = "https://techelementItLimited.website";

  const cardData = [
    {
      id: 1,
      icon: <FaLock className="text-blue-900 dark:text-blue-300" />,
      title: "Commotion Pending Maturation",
      amount: "0.00"
    },
    {
      id: 2,
      icon: <FaLock className="text-blue-900 dark:text-blue-300" />,
      title: "Available Commotion Balance",
      amount: "1000.00"
    },
    {
      id: 3,
      icon: <FaLock className="text-blue-900 dark:text-blue-300" />,
      title: "Total Amount Withdrawn",
      amount: "0.00"
    }
  ];

  const buttons = [
    {
      id: 1,
      label: "SIGN UP",
      icon: "⬇",
      color: "text-gray-500"
    },
    {
      id: 2,
      label: "LOGIN",
      icon: "⬆",
      color: "text-green-500"
    },
    {
      id: 3,
      label: "TAGS",
      icon: "ⓘ",
      color: "text-gray-500"
    },
    {
      id: 4,
      label: "CLICKS",
      icon: "⬆",
      color: "text-green-500"
    },
    {
      id: 5,
      label: "EARNINGS",
      icon: "⬆",
      color: "text-green-500"
    },
    {
      id: 6,
      label: "THIS WEEK",
      icon: "𝑊",
      color: "text-gray-500"
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setIsCopied(true);
        toast.success('Link copied to clipboard!', {
          position: 'top-center',
          duration: 2000,
          style: {
            background: '#3b82f6',
            color: '#fff',
          }
        });
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        toast.error('Failed to copy link', {
          position: 'top-center',
          duration: 2000,
          style: {
            background: '#ef4444',
            color: '#fff',
          }
        });
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-[#F0F1F5] dark:bg-black relative">
      {/* Toast Notification */}
      <Toaster />
      
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Get The <span className="text-blue-600">Referral Link</span>
      </h2>

      {/* Referral Link Box */}
      <div className="flex items-center justify-between bg-gray-700 text-white rounded-xl px-6 py-4 w-full max-w-2xl mb-8">
        <p className="truncate">
          {referralLink}
        </p>
        <button 
          onClick={copyToClipboard}
          className="p-1 rounded-md hover:bg-gray-600 transition-colors"
          aria-label="Copy referral link"
        >
          <FiCopy className={`text-xl cursor-pointer ${isCopied ? 'text-green-400' : 'text-white'}`} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {buttons.map((button) => (
          <Button
            key={button.id}
            
            className={`flex items-center gap-1 px-4 py-2 border rounded-full ${button.color} bg-gray-100 dark:bg-gray-700 hover:cursor-pointer text-sm`}
          >
            {button.icon} {button.label}
          </Button>
        ))}
      </div>

      {/* Balance Section */}
      <div className="w-full max-w-2xl space-y-4">
        {cardData.map((card) => (
          <div key={card.id} className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-xl shadow px-3 md:px-4 lg:px-5 py-2 md:py-3 ">
            <div className="flex items-center gap-2">
              {card.icon}
              <span className="font-medium">{card.title}</span>
            </div>
            <span className="border rounded-full px-2 py-1 text-sm">
              {card.amount}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReferralLink;