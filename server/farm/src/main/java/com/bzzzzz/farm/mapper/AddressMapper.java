package com.bzzzzz.farm.mapper;

import com.bzzzzz.farm.model.dto.member.AddressDto;
import com.bzzzzz.farm.model.entity.Address;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

public interface AddressMapper {
    List<AddressDto.Response> addressToAddressResponses(List<Address> addresses);
    default Address addressPostToAddress(AddressDto.Post request){
        if (request == null) return null;

        return Address.builder()
                .addressName(request.getAddressName())
                .name(request.getName())
                .phoneNumber(request.getPhoneNumber())
                .detailAddress(request.getDetailAddress())
                .build();
    }
    default Address addressPatchToAddress(AddressDto.Patch request){
        if (request == null) return null;

        return Address.builder()
                .addressId(request.getAddressId())
                .addressName(request.getAddressName())
                .name(request.getName())
                .phoneNumber(request.getPhoneNumber())
                .detailAddress(request.getDetailAddress())
                .build();
    }
    default AddressDto.Response addressToAddressResponse(Address address){
        return AddressDto.Response.builder()
                .addressId(address.getAddressId())
                .addressName(address.getAddressName())
                .name(address.getName())
                .phoneNumber(address.getPhoneNumber())
                .detailAddress(address.getDetailAddress())
                .build();

    }
}
