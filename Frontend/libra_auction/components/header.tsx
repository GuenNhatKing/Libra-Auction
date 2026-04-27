import Logo from "@/components/logo";
import Nav from "@/components/nav";
import { isAuthenticated } from "@/lib/is_authenticated";

import { NavType } from "@/types/nav_type";
import { UserActionType } from "@/types/user_action_type";
import UserMenu from "./user_menu";
import { FetchUserInfo } from "@/services/fetch_user_info";

export default async function Header() {
  const authed = await isAuthenticated();
  const userInfo = await FetchUserInfo();

  const navItems: NavType[] = [
    { value: "Categories", href: "/categories" },
    { value: "Auctions", href: "/auctions" },
    { value: "Support", href: "/support" },
    { value: "Contact", href: "/contact" },
  ];
  const userActionItems: UserActionType[] = [
    { value: "Sign in", href: "/sign-in" },
    { value: "Sign up", href: "/sign-up" },
  ];
  const authedUserActionItems: UserActionType[] = [
    { value: "Profile", href: "/profile" },
    { value: "Seller Dashboard", href: "/seller-dashboard" },
  ];

  return (
    <div className="px-8 py-4 flex bg-white shadow-md">
      <Logo textColor="color" />
      <Nav items={navItems} />
      {!authed &&
        <ul className="flex flex-1 gap-4 items-center justify-end">
          {userActionItems.map(item => {
            return <li key={item.value}><a href={item.href}>{item.value}</a></li>
          })}
        </ul>
      }
      {authed && userInfo &&
        <UserMenu userInfo={userInfo} authedUserActionItems={authedUserActionItems}/>
      }
    </div>
  );
}
