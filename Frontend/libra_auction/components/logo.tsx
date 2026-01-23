import logo_img from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
export default function Logo({textColor}: {textColor: "color" | "white"}) {
  const colorVariants = {
    "color": "text-(--primary-color)",
    "white": "text-white"
  };
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <Image src={logo_img} alt="" className="h-8 w-8" />
        <div className={`[--my-text-size:1.25rem] font-bold text-(length:--my-text-size) ${colorVariants[textColor]}`}>
          Libra Auction
        </div>
      </div>
    </Link>
  );
}
