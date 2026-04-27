'use client';

import Image from "next/image";
import { UserInfoType } from "@/types/user_info_type";
import { useState } from "react";
import { UserActionType } from "@/types/user_action_type";

export default function UserMenu({ userInfo, authedUserActionItems }: { userInfo: UserInfoType; authedUserActionItems: UserActionType[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <div className="h-full flex items-center">
                <Image
                    src={userInfo?.avatarUrl || "/default-avatar.png"}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer shadow-sm w-10 h-10"
                    onClick={() => setIsOpen(!isOpen)}
                />
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-2xl rounded-xl py-1 z-50">
                    {authedUserActionItems.map(item => (
                        <a
                            key={item.value}
                            href={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-50 transition"
                        >
                            {item.value}
                        </a>
                    ))}

                    <div className="border-t border-gray-100 my-1"></div>

                    <a href="/api/sign-out" className="block px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition">
                        Sign out
                    </a>
                </div>
            )}
        </div>
    );
}