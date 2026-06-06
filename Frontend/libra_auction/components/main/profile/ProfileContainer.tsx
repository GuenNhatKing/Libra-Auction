"use client";

import { useState } from "react";
import { ProfileContent } from "./ProfileContent";
import { EditProfileContent } from "./EditProfileContent";
import { UserInfo } from "@/types/user_info";

interface ProfileContainerProps {
  user: UserInfo;
}

export function ProfileContainer({ user }: ProfileContainerProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--primary-color)] rounded-lg hover:bg-[var(--secondary-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition-all"
        >
          {isEditing ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Cancel Edit
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Content */}
      {isEditing ? (
        <EditProfileContent
          userId={user.id}
          initialData={{
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            identityNumber: user.identityNumber,
            avatarUrl: user.avatarUrl,
            roleName: user.role?.name,
          }}
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileContent userId={user.id} />
      )}
    </div>
  );
}