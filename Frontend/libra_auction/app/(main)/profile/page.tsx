import { getErrorStatus } from "@/lib/app_error";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { fetchUserInfo } from "@/services/fetch_user_info";
import { redirect } from "next/navigation";
import { ProfileContent } from "@/components/main/profile/ProfileContent";

export default async function ProfilePage() {
  const userId = await getIdFromToken();
  if (!userId) redirect("/sign-in");

  let user;
  try {
    user = await fetchUserInfo(userId);
  } catch (error) {
    if (getErrorStatus(error) === 401) redirect("/sign-in");
    throw error;
  }

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
      <ProfileContent userId={user.id} initialUser={user} />
    </div>
  );
}
