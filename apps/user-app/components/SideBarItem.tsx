"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SideBarItemProps {
    href: string;
    title: string;
    icon: React.ReactNode;
}

const SELECTED_COLOR = "text-[#6a51a6]";
const UNSELECTED_COLOR = "text-slate-500";

export const SideBarItem = ({ href, title, icon }: SideBarItemProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const isSelected = pathname === href;

    const handleClick = () => {
        router.push(href);
    };

    const textColor = isSelected ? SELECTED_COLOR : UNSELECTED_COLOR;

    return (
        <div 
            className={`flex ${textColor} cursor-pointer p-2 pl-8`}
            onClick={handleClick}
        >
            <div className="pr-2">
                {icon}
            </div>
            <div className={`font-bold ${textColor}`}>
                {title}
            </div>
        </div>
    );
};