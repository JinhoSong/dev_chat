package com.chatting.spring.demo.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private int studentId;
    private String name;
    private String password;
    private String role;
    private boolean Authentication;
}
