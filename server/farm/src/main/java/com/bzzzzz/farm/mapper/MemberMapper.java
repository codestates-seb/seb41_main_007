package com.bzzzzz.farm.mapper;

import com.bzzzzz.farm.model.dto.member.MemberDto;
import com.bzzzzz.farm.model.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
    Member memberPatchToMember(MemberDto.Patch requestBody);
    default MemberDto.Response memberToMemberResponse(Member member){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        MemberDto.Response response = new MemberDto.Response();
        response.setMemberId(member.getMemberId());
        response.setName(member.getName());
        response.setEmail(member.getEmail());
        Optional.ofNullable(member.getPhoneNumber())
                .ifPresent(phoneNumber -> response.setPhoneNumber(phoneNumber));
        Optional.ofNullable(member.getGender())
                .ifPresent(gender -> response.setGender(gender));
        Optional.ofNullable(member.getBirth())
                        .ifPresent(birth -> response.setBirth(formatter.format(birth)));
        return response;
    }
}
