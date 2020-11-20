package com.chatting.spring.demo.service;

import com.chatting.spring.demo.member.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberService {

    public void settingMember(String sender){
        Member member = new Member();
        member.setUsername(sender);
        member.setAttend("absent");
        member.setStudentNumber("1592018");
    }
}
