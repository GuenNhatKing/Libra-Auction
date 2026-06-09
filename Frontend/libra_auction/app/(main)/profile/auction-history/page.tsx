import { getErrorStatus } from "@/lib/app_error";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { fetchUserInfo } from "@/services/fetch_user_info";
import { redirect } from "next/navigation";
import { AuctionHistoryContent } from "@/components/main/profile/tabs/AuctionHistoryContent";

export default async function AuctionHistoryPage() {
  const userId = await getIdFromToken();
  if (!userId) redirect("/sign-in");

  try {
    await fetchUserInfo(userId);
  } catch (error) {
    if (getErrorStatus(error) === 401) redirect("/sign-in");
    throw error;
  }

  return <AuctionHistoryContent userId={userId} />;
}
