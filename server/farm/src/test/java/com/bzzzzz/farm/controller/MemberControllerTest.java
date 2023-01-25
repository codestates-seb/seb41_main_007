package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.MemberMapper;
import com.bzzzzz.farm.model.dto.member.MemberDto;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.service.MemberService;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureRestDocs
@WebMvcTest(MemberControllerTest.class)
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(roles = {"USER", "ADMIN"})
public class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;

    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberMapper mapper;

    @Test
    @DisplayName("회원정보 수정")
    void patchMember() throws Exception{

        //given
        long memberId = 1L;
        MemberDto.Patch request = MemberDto.Patch.builder()
                .memberId(memberId)
                .name("김병수")
                .age(26)
                .address("대구 북구")
                .email("qudtn7383@gmail.com")
                .gender("male")
                .phone("010-0000-0000")
                .build();
        String content = gson.toJson(request);
        Member member = new Member();
        member.setMemberId(memberId);

        given(mapper.memberPatchToMember(Mockito.any(MemberDto.Patch.class))).willReturn(new Member());
        given(memberService.updateMember(Mockito.any(Member.class))).willReturn(member);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/members/{member-id}", memberId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        //then
        actions
                .andExpect(status().isOk());
//                .andDo(document(
//                        "patchMember",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
//                                        fieldWithPath("age").type(JsonFieldType.NUMBER).description("나이"),
//                                        fieldWithPath("address").type(JsonFieldType.STRING).description("주소"),
//                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
//                                        fieldWithPath("gender").type(JsonFieldType.STRING).description("성별"),
//                                        fieldWithPath("phone").type(JsonFieldType.STRING).description("전화번호")
//                                )
//                        ),
//                        responseFields(fieldWithPath("data").description("제품 식별자"))
//                ))

    }

    @Test
    @DisplayName("회원정보 조회")
    void getMember() throws Exception{

        long memberId = 1L;
        Member member = Member.builder()
                .memberId(1L)
                .name("김병수")
                .age(26)
                .address("대구 북구")
                .email("qudtn7383@gmail.com")
                .gender("male")
                .phone("010-0000-0000")
                .build();

        given(memberService.findMember(Mockito.anyLong())).willReturn(member);
        String content = gson.toJson(member);


        ResultActions actions = mockMvc.perform(
                get("/members/{member-id}", memberId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content));

        actions.andExpect(status().isOk())
                .andReturn();
    }

    @Test
    @DisplayName("전체 회원정보 조회(관리자 전용)")
    void getMembers() throws Exception{
        // given
        List<Member> members = new ArrayList<>();
        Member member1 = Member.builder()
                .memberId(1L)
                .name("김병수")
                .age(26)
                .address("대구 북구")
                .email("qudtn7383@gmail.com")
                .gender("male")
                .phone("010-0000-0000")
                .build();

        Member member2 = Member.builder()
                .memberId(2L)
                .name("김병수")
                .age(26)
                .address("대구 북구")
                .email("qudtn7383@gmail.com")
                .gender("male")
                .phone("010-0000-0001")
                .build();

        given(memberService.findMembers()).willReturn(members);

        String content = gson.toJson(members);

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/members")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content));

        //then
        actions
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    @DisplayName("회원탈퇴")
    void deleteMember() throws Exception{

    }
}
