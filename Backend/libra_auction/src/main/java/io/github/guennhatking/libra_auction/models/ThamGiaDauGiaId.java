package io.github.guennhatking.libra_auction.models;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
@Embeddable
@Getter
@Setter
public class ThamGiaDauGiaId implements Serializable {
    private String phienDauGiaId;
    private String nguoiThamGiaId;
}