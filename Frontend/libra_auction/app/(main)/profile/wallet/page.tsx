import { getErrorStatus } from "@/lib/app_error";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { fetchUserInfo } from "@/services/fetch_user_info";
import { redirect } from "next/navigation";
import { WalletContent } from "@/components/main/profile/tabs/WalletContent";

export default async function WalletPage() {
  const userId = await getIdFromToken();
  if (!userId) redirect("/sign-in");

  try {
    await fetchUserInfo(userId);
  } catch (error) {
    if (getErrorStatus(error) === 401) redirect("/sign-in");
    throw error;
  }

  return <WalletContent userId={userId} />;
}
