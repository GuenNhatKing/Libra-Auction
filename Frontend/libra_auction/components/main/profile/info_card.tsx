import { UserInfo } from "@/types/user_info";

export const InfoCard = ({ user }: { user: UserInfo }) => {
  const detailItem = (label: string, value: string, isStatus: boolean = false) => (
    <div className="py-4 border-b border-gray-50 last:border-0">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className={`font-medium ${isStatus ? 'text-[--primary-color]' : 'text-[--foreground]'}`}>
        {value}
      </p>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm mt-6 border border-gray-100">
      <h3 className="text-xl font-bold mb-6 border-l-4 border-[--primary-color] pl-4">Thông tin cá nhân</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {detailItem("Số điện thoại", user.soDienThoai)}
        {detailItem("Số CCCD", user.CCCD)}
        {detailItem("Trạng thái Email", user.trangThaiEmail, true)}
        {detailItem("Trạng thái tài khoản", user.trangThaiTaiKhoan, true)}
      </div>
    </div>
  );
};