export type ProfileTab = "profile" | "edit-profile" | "auction-history" | "wallet";

export const PROFILE_TABS: ProfileTab[] = [
  "profile",
  "edit-profile",
  "auction-history",
  "wallet",
];

export function parseProfileTab(value: string | null | undefined): ProfileTab {
  if (value && PROFILE_TABS.includes(value as ProfileTab)) {
    return value as ProfileTab;
  }
  return "profile";
}

export const PROFILE_TAB_LABELS: Record<ProfileTab, string> = {
  profile: "Profile",
  "edit-profile": "Edit profile",
  "auction-history": "Auction history",
  wallet: "Wallet & transactions",
};
