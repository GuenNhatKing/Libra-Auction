package io.github.guennhatking.libra_auction.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class ThamGiaDauGiaId implements Serializable {

    private String phienDauGiaId;
    private String nguoiThamGiaId;
}
