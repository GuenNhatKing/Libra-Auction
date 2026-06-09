import { getErrorStatus } from "@/lib/app_error";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { fetchUserInfo } from "@/services/fetch_user_info";
import { redirect } from "next/navigation";
import { ChangePasswordContent } from "@/components/main/profile/tabs/ChangePasswordContent";

export default async function ChangePasswordPage() {
  const userId = await getIdFromToken();
  if (!userId) redirect("/sign-in");

  let user;
  try {
    user = await fetchUserInfo(userId);
  } catch (error) {
    if (getErrorStatus(error) === 401) redirect("/sign-in");
    throw error;
  }

  if (!user.hasPasswordAccount) redirect("/profile");

  return <ChangePasswordContent email={user.email} emailStatus={user.emailStatus} hasPasswordAccount={user.hasPasswordAccount} />;
}
