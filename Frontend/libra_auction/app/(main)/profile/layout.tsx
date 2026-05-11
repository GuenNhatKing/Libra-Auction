import { ProfileSidebar } from "@/components/main/profile/profile_sidebar";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { fetchUserInfo } from "@/services/fetch_user_info";

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user_id = await getIdFromToken();
    let user = undefined;
    if (user_id) {
        user = await fetchUserInfo(user_id);
    }
    return (
        // Tăng padding trục Y lên một chút (py-12) và thêm padding cho màn hình to (xl:px-12)
        <div className="min-h-screen bg-[--background-color] py-12 px-4 md:px-8 xl:px-12">

            {/* 
        1. THAY ĐỔI CHÍNH: Đổi max-w-7xl (1280px) thành max-w-[1440px] (hoặc max-w-screen-2xl) 
        2. Tăng khoảng cách giữa 2 cột: gap-8 -> lg:gap-10 
      */}
            <div className="max-w-360 mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10">

                {/* 
          BÊN TRÁI: Sidebar
          Thay vì dùng w-1/4 (25%), mình chuyển sang set cứng độ rộng (w-[320px]). 
          Điều này giúp Sidebar không bị "phình" ra quá to trên các màn hình ultra-wide, giữ menu luôn gọn gàng.
        */}
                <aside className="w-full lg:w-[320px] xl:w-85 shrink-0">
                    {user && <ProfileSidebar user={user} />}
                </aside>

                {/* 
          BÊN PHẢI: Nội dung động
          Dùng flex-1 để nó tự động chiếm TOÀN BỘ không gian còn lại.
          Tăng độ bo góc (rounded-3xl), tăng padding (p-8 lg:p-10) và chiều cao tối thiểu (min-h-[600px]) để khung to và thoáng hơn.
        */}
                <main className="w-full flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10 min-h-150">
                    {children}
                </main>

            </div>
        </div>
    );
}