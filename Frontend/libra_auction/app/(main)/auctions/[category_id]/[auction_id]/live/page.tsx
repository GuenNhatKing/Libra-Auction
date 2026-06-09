import { getErrorStatus } from "@/lib/app_error";
import BreadCrumb from "@/components/main/auction/breadcrumb";
import { fetchPublicAuction } from "@/services/fetch_public_auction";
import { fetchLiveNotifications } from "@/services/fetch_live_notifications";
import { checkRegistration } from "@/services/register_auction";
import { isDepositPaid } from "@/services/create_deposit";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { notFound } from "next/navigation";
import LiveAuctionView from "@/components/main/auction/live_auction_view";

export default async function LivePage(props: {
  params: Promise<{ category_id: string; auction_id: string }>;
}) {
  const params = await props.params;
  const auctionId = params.auction_id;
  
  // 1. Fetch thông tin chi tiết phiên đấu giá
  let auction;
  try {
    auction = await fetchPublicAuction(auctionId);
  } catch (error) {
    if (getErrorStatus(error) === 404) notFound();
    throw error;
  }

  // 2. Fetch danh sách thông báo quá khứ lưu trong Database (Sửa lỗi trống log khi F5)
  const liveNotifications = await fetchLiveNotifications(auctionId).catch(() => []);

  const backendServerUrl = process.env.PUBLIC_BACKEND_SERVER_URL || process.env.BACKEND_SERVER_URL || '';

  // 3. Kiểm tra thông tin định danh và quyền hạn của người dùng hiện tại
  let isRegistered = false;
  let isCreator = false;
  let depositPaid = false;
  let currentUserId: string | null = null;

  try {
    const userId = await getIdFromToken();
    currentUserId = userId;
    if (userId) {
      if (auction.creator_id && auction.creator_id === userId) {
        isCreator = true;
      }
      const registration = await checkRegistration(userId, auctionId);
      isRegistered = !!registration;

      if (isRegistered && !isCreator) {
        depositPaid = await isDepositPaid(auctionId);
      }
    }
  } catch {
    // Không đăng nhập hoặc xảy ra lỗi token thì bỏ qua
  }

  // 4. Cấu trúc thanh điều hướng Breadcrumb
  const breadcrumb_items = [
    {
      id: auction.category_id,
      value: auction.category_name,
      href: `/auctions/${auction.category_id}`,
    },
    {
      id: auction.auction_id,
      value: auction.product_name,
      href: `/auctions/${auction.category_id}/${auction.auction_id}`,
    },
    {
      id: `${auction.auction_id}-live`,
      value: "Live",
      href: `/auctions/${auction.category_id}/${auction.auction_id}/live`,
    },
  ];

  return (
    <>
      <BreadCrumb breadcrumbItems={breadcrumb_items} />
      <LiveAuctionView
        auction={auction}
        backendServerUrl={backendServerUrl}
        role="user"
        isRegistered={isRegistered}
        isCreator={isCreator}
        depositPaid={depositPaid}
        currentUserId={currentUserId}
        initialNotifications={liveNotifications}
      />
    </>
  );
}