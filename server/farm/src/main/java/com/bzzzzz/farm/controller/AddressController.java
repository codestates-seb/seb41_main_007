package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.model.dto.member.AddressDto;
import com.bzzzzz.farm.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/addresses")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    //주소 등록
    @PostMapping
    public ResponseEntity postAddress(@Valid @RequestBody AddressDto.Post request,
                                      @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(addressService.createAddress(request,Long.valueOf(userDetails.getUsername())));
    }

    //주소 수정
    @PatchMapping("/{address-id}")
    public ResponseEntity patchMember(@Valid @RequestBody AddressDto.Patch request, @Positive @PathVariable("address-id") long addresId) {
        return ResponseEntity.ok(addressService.updateAddress(request,addresId));
    }

    //특정 주소 데이터 가져오기
    @GetMapping("/{address-id}")
    public ResponseEntity getAddress(@Positive @PathVariable("address-id") long addressId){
        return ResponseEntity.ok(addressService.findAddress(addressId));
    }

    //모든 주소 목록 반환
    @GetMapping
    public ResponseEntity getAddresses(){
        return ResponseEntity.ok(addressService.findAddresses());
    }

    //주소 삭제
    @DeleteMapping("/{address-id}")
    public ResponseEntity deleteAddress(@Positive @PathVariable("address-id") long addressId){
        addressService.deleteAddress(addressId);

        return ResponseEntity.ok().build();
    }
}
