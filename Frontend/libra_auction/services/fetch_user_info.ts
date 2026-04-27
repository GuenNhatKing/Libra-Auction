import { getIdFromToken } from "@/lib/get_id_from_token";
import { UserInfoType } from "@/types/user_info_type";
import { cookies } from "next/headers";

export async function FetchUserInfo(): Promise<UserInfoType | null> {
    const userId = await getIdFromToken();
    const cookieStore = await cookies();

    const token = cookieStore.get("jwtToken")?.value;

    if (!userId) return null;

    try {
        const url = `${process.env.BACKEND_SERVER_URL}/api/users/${userId}`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        const userInfo: UserInfoType = {
            id: data.id,
            name: data.hoVaTen,
            email: data.email,
            avatarUrl: data.anhDaiDien || "/default-avatar.png",
            phone_number: data.soDienThoai,
            cccd: data.CCCD,
        };
        return userInfo;
    } catch (error) {
        console.error("FetchUserInfo Error:", error);
        return null;
    }
}