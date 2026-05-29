package io.github.guennhatking.libra_auction.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import io.github.guennhatking.libra_auction.models.auction.AuctionParticipationInfo;
import io.github.guennhatking.libra_auction.viewmodels.response.AuctionRegistrationResponse;

@Mapper(componentModel = "spring")
public interface AuctionRegistrationMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "participant.id", target = "userId")
    @Mapping(source = "participant.email", target = "email")
    @Mapping(source = "auction.id", target = "auctionId")

    @Mapping(source = "registeredAt", target = "registrationTime")
    AuctionRegistrationResponse toResponse(AuctionParticipationInfo entity);

    List<AuctionRegistrationResponse> toResponseList(List<AuctionParticipationInfo> entities);
}
