"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserInfo } from "@/types/user_info";
import { ProfileTab, parseProfileTab } from "@/types/profile_tab";
import { ProfileContent } from "./ProfileContent";
import { EditProfileContent } from "./EditProfileContent";
import { AuctionHistoryContent } from "./tabs/AuctionHistoryContent";
import { WalletContent } from "./tabs/WalletContent";
import { EmailVerifyContent } from "./tabs/EmailVerifyContent";
import { ChangePasswordContent } from "./tabs/ChangePasswordContent";

interface UserDashboardProps {
  user: UserInfo;
}

export function UserDashboard({ user }: UserDashboardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = parseProfileTab(searchParams.get("tab"));
  const [profileUser, setProfileUser] = useState(user);
  const [profileRefreshKey, setProfileRefreshKey] = useState(0);

  useEffect(() => {
    setProfileUser(user);
  }, [user]);

  const setActiveTab = useCallback(
    (tab: ProfileTab) => {
      const href = tab === "profile" ? "/profile" : `/profile?tab=${tab}`;
      router.push(href, { scroll: false });
    },
    [router]
  );

  const handleProfileUpdated = (updatedUser: UserInfo) => {
    setProfileUser(updatedUser);
    setProfileRefreshKey((key) => key + 1);
    setActiveTab("profile");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--secondary-color)]">
          My Account
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your profile, view auction history, and track your wallet
        </p>
      </div>

      <div className="animate-in fade-in duration-300">
        {activeTab === "profile" && (
          <ProfileContent
            userId={profileUser.id}
            initialUser={profileUser}
            refreshKey={profileRefreshKey}
          />
        )}

        {activeTab === "edit-profile" && (
          <EditProfileContent
            userId={profileUser.id}
            initialData={{
              fullName: profileUser.fullName,
              email: profileUser.email,
              phoneNumber: profileUser.phoneNumber,
              identityNumber: profileUser.identityNumber,
              avatarUrl: profileUser.avatarUrl || '/default-avatar.png',
              roleName: profileUser.role?.name,
            }}
            onSuccess={handleProfileUpdated}
            onCancel={() => setActiveTab("profile")}
          />
        )}

        {activeTab === "auction-history" && (
          <AuctionHistoryContent userId={profileUser.id} />
        )}

        {activeTab === "wallet" && <WalletContent userId={profileUser.id} />}

        {activeTab === "email-verify" && (
          <EmailVerifyContent
            email={profileUser.email}
            emailStatus={profileUser.emailStatus}
          />
        )}

        {activeTab === "change-password" && (
          <ChangePasswordContent
            email={profileUser.email}
            emailStatus={profileUser.emailStatus}
          />
        )}
      </div>
    </div>
  );
}
