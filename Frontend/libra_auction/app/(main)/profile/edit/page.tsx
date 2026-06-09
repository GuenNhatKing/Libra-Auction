import { getErrorStatus } from "@/lib/app_error";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { fetchUserInfo } from "@/services/fetch_user_info";
import { redirect } from "next/navigation";
import { EditProfileContent } from "@/components/main/profile/EditProfileContent";

export default async function EditProfilePage() {
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
    <EditProfileContent
      userId={user.id}
      initialData={{
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        identityNumber: user.identityNumber,
        avatarUrl: user.avatarUrl || "/default-avatar.png",
        roleName: user.role?.name,
        hasPasswordAccount: user.hasPasswordAccount,
        username: user.username,
      }}
    />
  );
}
