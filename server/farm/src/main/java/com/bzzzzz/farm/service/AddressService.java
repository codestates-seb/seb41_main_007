package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.mapper.MemberMapper;
import com.bzzzzz.farm.model.dto.member.AddressDto;
import com.bzzzzz.farm.model.entity.Address;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;
    private final MemberMapper mapper;

    public AddressDto.Response createAddress(AddressDto.Post request, long memberId){
        Address address = mapper.addressPostToAddress(request);
        Member member = new Member();
        member.setMemberId(memberId);
        address.setMember(member);
        addressRepository.save(address);

        return mapper.addressToAddressResponse(address);

    }

    public AddressDto.Response updateAddress(AddressDto.Patch request,long addressId)  {
        request.setAddressId(addressId);
        Address address = mapper.addressPatchToAddress(request);

        Address findAddress = findVerifiedAddress(request.getAddressId());
        Optional.ofNullable(address.getAddressName())
                .ifPresent(addressName -> findAddress.setAddressName(addressName));
        Optional.ofNullable(address.getName())
                .ifPresent(name -> findAddress.setName(name));
        Optional.ofNullable(address.getDetailAddress())
                .ifPresent(detailAddress -> findAddress.setDetailAddress(detailAddress));
        Optional.ofNullable(address.getPhoneNumber())
                .ifPresent(phoneNumber -> findAddress.setPhoneNumber(phoneNumber));

        addressRepository.save(findAddress);

        return mapper.addressToAddressResponse(findAddress);

    }

    @Transactional(readOnly = true)
    public AddressDto.Response findAddress(long addressId) {
        return mapper.addressToAddressResponse(findVerifiedAddress(addressId));
    }

    public List<AddressDto.Response> findAddresses(){
        return mapper.addressToAddressResponses(addressRepository.findAll());
    }

    public void deleteAddress(long addressId) {
        Address findAddress = findVerifiedAddress(addressId);

        addressRepository.delete(findAddress);
    }
    @Transactional(readOnly = true)
    public Address findVerifiedAddress(long addressId) {
        Optional<Address> optionalAddress =
                addressRepository.findById(addressId);
        Address address=
                optionalAddress.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND));
        return address;
    }
}
