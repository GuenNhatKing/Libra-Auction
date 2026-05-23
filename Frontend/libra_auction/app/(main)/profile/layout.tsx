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
                // Increase vertical padding slightly and add extra padding on large screens
        <div className="min-h-screen bg-[--background-color] py-12 px-4 md:px-8 xl:px-12">

                        {/* 
                1. Main change: swap max-w-7xl (1280px) to max-w-[1440px] (or max-w-screen-2xl)
                2. Increase the gap between the two columns: gap-8 -> lg:gap-10 
            */}
            <div className="max-w-360 mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10">

                                {/* 
                    LEFT: Sidebar
                    Instead of using w-1/4 (25%), this fixes the width at w-[320px].
                    That keeps the sidebar from growing too wide on ultra-wide screens and preserves a compact menu.
                */}
                <aside className="w-full lg:w-[320px] xl:w-85 shrink-0">
                    {user && <ProfileSidebar user={user} />}
                </aside>

                                {/* 
                    RIGHT: Dynamic content
                    Use flex-1 so it automatically fills the remaining space.
                    Increase the rounding, padding, and minimum height to make the panel larger and airier.
                */}
                <main className="w-full flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10 min-h-150">
                    {children}
                </main>

            </div>
        </div>
    );
}