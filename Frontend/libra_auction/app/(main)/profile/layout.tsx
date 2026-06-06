import { ProfileSidebar } from "@/components/main/profile/profile_sidebar";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { fetchUserInfo } from "@/services/fetch_user_info";
import { Suspense } from "react";

function SidebarFallback() {
  return <div className="h-96 bg-white rounded-3xl animate-pulse" />;
}

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
    <div className="min-h-screen bg-[--background-color] py-12 px-4 md:px-8 xl:px-12">
      <div className="max-w-360 mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10">
        <aside className="w-full lg:w-[320px] xl:w-85 shrink-0">
          <Suspense fallback={<SidebarFallback />}>
            {user && <ProfileSidebar user={user} />}
          </Suspense>
        </aside>

        <main className="w-full flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10 min-h-150">
          {children}
        </main>
      </div>
    </div>
  );
}
