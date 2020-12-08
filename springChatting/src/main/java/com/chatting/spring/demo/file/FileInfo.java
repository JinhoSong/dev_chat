package com.chatting.spring.demo.file;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileInfo {

    private String fileToBase64;
    private String fileName;
    private FileType fileType;
}
