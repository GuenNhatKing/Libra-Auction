import Logo from "./logo";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="p-8 pt-12 bg-(--secondary-color) text-white">
      <div className="flex mb-4">
        <div className="flex flex-1 flex-col gap-2">
          <Logo textColor="white" />
          <p className="w-120">
            A trusted online auction platform connecting buyers and sellers
            through secure, transparent, and real-time bidding.
          </p>
          <p>support@libraauction.com</p>
        </div>
        <div className="flex gap-24 mx-8">
          <div className="flex flex-col">
            <p className="font-semibold text-lg">Support</p>
            <Link href="#">Help Center</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-lg">Quick Links</p>
            <Link href="#">Browse Auctions</Link>
            <Link href="#">Sell Your Item</Link>
            <Link href="#">How to Bid</Link>
            <Link href="#">Payment Methods</Link>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-lg">Categories</p>
            <Link href="#">Vehicle Auction</Link>
            <Link href="#">Collectibles Auction</Link>
            <Link href="#">Real Estate Auction</Link>
            <Link href="#">Fine Art Auction</Link>
          </div>
        </div>
      </div>
      <div className="pt-4 border-t">
        <p>© 2026 LibraAuction. All rights reserved.</p>
      </div>
    </div>
  );
}
