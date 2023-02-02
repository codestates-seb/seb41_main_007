//package com.bzzzzz.farm.controller;
//
//import com.bzzzzz.farm.mapper.MemberMapper;
//import com.bzzzzz.farm.model.dto.member.MemberDto;
//import com.bzzzzz.farm.model.entity.Member;
//import com.bzzzzz.farm.service.MemberService;
//import com.google.gson.Gson;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import java.text.SimpleDateFormat;
//import java.util.List;
//
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.doNothing;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@AutoConfigureRestDocs
//@WebMvcTest(MemberController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@WithMockUser(roles = {"USER", "ADMIN"})
//public class MemberControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private MemberService memberService;
//
//    @MockBean
//    private MemberMapper mapper;
//
//    @Test
//    @DisplayName("회원정보 수정")
//    void patchMember() throws Exception{
//        //given
//        MemberDto.Patch request = MemberDto.Patch.builder()
//                .memberId(Mockito.anyLong())
//                .name("김병수")
//                .birth("19980518")
//                .gender("male")
//                .email("qudtn7383@gmail.com")
//                .phoneNumber("01000000000")
//                .build();
//        String content = gson.toJson(request);
//        Member member = mapper.memberPatchToMember(request);
//        MemberDto.Response response = mapper.memberToMemberResponse(member);
//        given(memberService.updateMember(Mockito.any(MemberDto.Patch.class))).willReturn(response);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                patch("/members")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .with(csrf())
//                        .content(content)
//        );
//
//        //then
//        actions
//                .andExpect(status().isOk())
//                .andDo(document(
//                        "patchMember",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
//                                        fieldWithPath("birth").type(JsonFieldType.STRING).description("생년월일"),
//                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
//                                        fieldWithPath("gender").type(JsonFieldType.STRING).description("성별"),
//                                        fieldWithPath("phoneNumber").type(JsonFieldType.STRING).description("전화번호")
//                                )
//                        )
//                ));
//
//    }
//
//    @Test
//    @DisplayName("회원정보 조회")
//    void getMember() throws Exception{
//        //given
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
//        Member member = Member.builder()
//                .memberId(Mockito.anyLong())
//                .name("김병수")
//                .birth(formatter.parse("19980518"))
//                .email("qudtn7383@gmail.com")
//                .gender("male")
//                .phoneNumber("01000000000")
//                .build();
//        MemberDto.Response response = mapper.memberToMemberResponse(member);
//        given(memberService.findMember(Mockito.anyLong())).willReturn(response);
//        String content = gson.toJson(member);
//
//        ResultActions actions = mockMvc.perform(
//                get("/members")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .with(csrf())
//                        .content(content));
//
//        actions.andExpect(status().isOk())
//                .andDo(document(
//                        "getMember",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
//                                        fieldWithPath("birth").type(JsonFieldType.STRING).description("생년월일"),
//                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
//                                        fieldWithPath("gender").type(JsonFieldType.STRING).description("성별"),
//                                        fieldWithPath("phoneNumber").type(JsonFieldType.STRING).description("전화번호")
//                                )
//                        )))
//                .andReturn();
//    }
//
//    @Test
//    @DisplayName("전체 회원정보 조회(관리자 전용)")
//    void getMembers() throws Exception{
//        // given
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
//        Member member1 = Member.builder()
//                .memberId(1L)
//                .name("김병수")
//                .birth(formatter.parse("19980518"))
//                .email("qudtn7383@gmail.com")
//                .gender("male")
//                .phoneNumber("01000000000")
//                .build();
//
//        Member member2 = Member.builder()
//                .memberId(2L)
//                .name("김병수")
//                .birth(formatter.parse("19980518"))
//                .email("qudtn7383@gmail.com")
//                .gender("male")
//                .phoneNumber("01000000001")
//                .build();
//        List<MemberDto.Response> responses = mapper.membersToMemberResponses(List.of(member1, member2));
//
//        given(memberService.findMembers()).willReturn(responses);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(
//                        get("/members/all")
//                                .accept(MediaType.APPLICATION_JSON));
//
//
//        //then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data").isArray())
////                .andExpect(jsonPath("$.[0].memberId").value(member1.getMemberId()))
////                .andExpect(jsonPath("$.[0].name").value(member1.getName()))
////                .andExpect(jsonPath("$.[0].birth").value(member1.getBirth()))
////                .andExpect(jsonPath("$.[0].email").value(member1.getEmail()))
////                .andExpect(jsonPath("$.[0].gender").value(member1.getGender()))
////                .andExpect(jsonPath("$.[0].phoneNumber").value(member1.getPhoneNumber()))
////                .andExpect(jsonPath("$.[1].memberId").value(member2.getMemberId()))
////                .andExpect(jsonPath("$.[1].name").value(member2.getName()))
////                .andExpect(jsonPath("$.[1].birth").value(member2.getBirth()))
////                .andExpect(jsonPath("$.[1].email").value(member2.getEmail()))
////                .andExpect(jsonPath("$.[1].gender").value(member2.getGender()))
////                .andExpect(jsonPath("$.[1].phoneNumber").value(member2.getPhoneNumber()))
//                .andDo(document(
//                        "getMembers",
//                        preprocessResponse(prettyPrint()),
//                        responseFields(List.of(
//                                fieldWithPath("[].memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                fieldWithPath("[].name").type(JsonFieldType.STRING).description("이름"),
//                                fieldWithPath("[].birth").type(JsonFieldType.STRING).description("생년월일"),
//                                fieldWithPath("[].email").type(JsonFieldType.STRING).description("이메일"),
//                                fieldWithPath("[].gender").type(JsonFieldType.STRING).description("성별"),
//                                fieldWithPath("[].phoneNumber").type(JsonFieldType.STRING).description("전화번호")
//                        ))))
//                .andReturn();
//    }
//
//    @Test
//    @DisplayName("회원탈퇴")
//    void deleteMember() throws Exception{
//        // given
//        doNothing().when(memberService).deleteMember(Mockito.anyLong());
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                delete("/members")
//                        .with(csrf())
//        );
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andDo(document(
//                        "deleteMember"
//                ));
//    }
//}
