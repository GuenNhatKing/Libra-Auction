package io.github.guennhatking.libra_auction.models;

public interface ChienLuocDatGia {
    boolean kiemTraHopLe(long giaHienTai, long giaMoi);
}

class DauGiaKin implements ChienLuocDatGia {
    @Override
    public boolean kiemTraHopLe(long giaHienTai, long giaMoi) {
        // Kín: giá mới phải lớn hơn giá hiện tại
        return giaMoi > giaHienTai;
    }
}

class DauGiaLen implements ChienLuocDatGia {
    @Override
    public boolean kiemTraHopLe(long giaHienTai, long giaMoi) {
        // Lên: giá mới phải lớn hơn hoặc bằng giá hiện tại
        return giaMoi >= giaHienTai;
    }
}

class DauGiaXuong implements ChienLuocDatGia {
    @Override
    public boolean kiemTraHopLe(long giaHienTai, long giaMoi) {
        // Xuống: giá mới phải nhỏ hơn giá hiện tại
        return giaMoi < giaHienTai;
    }
}

class DauGiaNguoc implements ChienLuocDatGia {
    @Override
    public boolean kiemTraHopLe(long giaHienTai, long giaMoi) {
        // Ngược: giá mới phải nhỏ hơn giá hiện tại
        return giaMoi < giaHienTai;
    }
}
