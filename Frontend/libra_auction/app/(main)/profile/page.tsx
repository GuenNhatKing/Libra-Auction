import { InfoCard } from "@/components/main/profile/info_card";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { fetchUserInfo } from "@/services/fetch_user_info";
import { UserInfo } from "@/types/user_info";

export default async function ProfilePage() {
    const user_id = await getIdFromToken();
    let user = undefined;
    if (user_id) {
        user = await fetchUserInfo(user_id);
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="border-b border-gray-100 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-[var(--secondary-color)]">My Profile</h1>
                <p className="text-gray-500 text-sm mt-1">Manage security settings and personal profile information</p>
            </div>

            {/* Existing InfoCard component */}
            {user && <InfoCard user={user} />}

        </div>
    );
}