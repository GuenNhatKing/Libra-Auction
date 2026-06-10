import AuctionInfoDetailsSection from "@/components/main/auction/auction_info_details_section";
import AuctionQuestionsSection from "@/components/main/auction/auction_questions_section";
import BreadCrumb from "@/components/main/auction/breadcrumb";
import { fetchPublicAuction } from "@/services/fetch_public_auction";
import { Auction } from "@/types/auction/auction";
import { getErrorStatus } from "@/lib/app_error";
import { notFound } from "next/navigation";
import AuctionInfoSection from "@/components/main/auction/auction_info_section";
import { isAuthenticated } from "@/lib/is_authenticated";
import { getCurrentUserId } from "@/lib/get_current_user_id";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { fetchUserInfo } from "@/services/fetch_user_info";

export default async function page(props: {
  params: Promise<{ category_id: string; auction_id: string }>;
}) {
  const params = await props.params;
  const id = params.auction_id;
  let auction_info: Auction;
  try {
    auction_info = await fetchPublicAuction(id);
  } catch (error) {
    if (getErrorStatus(error) === 404) notFound();
    throw error;
  }
  const breadcrumb_items = [];
  breadcrumb_items.push({
    id: auction_info.category_id,
    value: auction_info.category_name,
    href: `/auctions/${auction_info.category_id}`,
  });
  breadcrumb_items.push({
    id: auction_info.auction_id,
    value: auction_info.product_name,
    href: `/auctions/${auction_info.category_id}/${auction_info.auction_id}`,
  });
  const authenticated = await isAuthenticated();
  const userId = authenticated ? await getCurrentUserId() : null;

  let isCreator = false;
  let isAdmin = false;
  if (authenticated && userId) {
    if (auction_info.creator_id && auction_info.creator_id === userId) {
      isCreator = true;
    }
    try {
      const userInfo = await fetchUserInfo(userId);
      if (userInfo.role?.name?.toUpperCase() === "ADMIN") {
        isAdmin = true;
      }
    } catch {
      // ignore - user info fetch failed
    }
  }

  return (
    <>
      <BreadCrumb breadcrumbItems={breadcrumb_items} />
      <AuctionInfoSection autionInfos={auction_info} />
      <AuctionInfoDetailsSection autionInfos={auction_info} />
      <AuctionQuestionsSection
        auctionId={auction_info.auction_id}
        isAuthenticated={authenticated}
        currentUserId={userId}
        isCreator={isCreator}
        isAdmin={isAdmin}
      />
    </>
  );
}
