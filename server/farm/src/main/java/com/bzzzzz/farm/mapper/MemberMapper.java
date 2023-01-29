package com.bzzzzz.farm.mapper;

import com.bzzzzz.farm.model.dto.member.AddressDto;
import com.bzzzzz.farm.model.dto.member.MemberDto;
import com.bzzzzz.farm.model.entity.Address;
import com.bzzzzz.farm.model.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);
    List<MemberDto.Response> membersToMemberResponses(List<Member> members);

    default Member memberPatchToMember(MemberDto.Patch requestBody) throws ParseException {
        if (requestBody == null) return null;

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");

        return Member.builder()
                .memberId(requestBody.getMemberId())
                .name(requestBody.getName())
                .birth(formatter.parse(requestBody.getBirth()))
                .gender(requestBody.getGender())
                .phoneNumber(requestBody.getPhoneNumber())
                .build();

    }
    default MemberDto.Response memberToMemberResponse(Member member){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy년 MM월 dd일");

        return MemberDto.Response.builder()
                .memberId(member.getMemberId())
                .name(member.getName())
                .birth(formatter.format(member.getBirth()))
                .email(member.getEmail())
                .gender(member.getGender())
                .phoneNumber(member.getPhoneNumber())
                .addresses(member.getAddresses().stream()
                        .map(addresses -> addressToAddressResponse(addresses))
                        .collect(Collectors.toList()))
                .build();
    }
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
