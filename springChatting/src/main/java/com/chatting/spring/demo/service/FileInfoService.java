package com.chatting.spring.demo.service;


import com.chatting.spring.demo.file.BASE64DecodedMultipartFile;
import com.chatting.spring.demo.file.FileInfo;
import com.chatting.spring.demo.file.FileType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.Base64.Decoder;


@Service
public class FileInfoService {

    public MultipartFile setMultipartFile(FileInfo fileInfo){
        byte[] fileByte;
        String[] clean = fileInfo.getFileToBase64().split(",");

        try {
            Decoder decoder = Base64.getMimeDecoder();
            fileByte = decoder.decode(clean[1]);
            for (int i = 0; i < fileByte.length; ++i) {
                if (fileByte[i] < 0) {
                    fileByte[i] += 256;
                }
            }
            return new BASE64DecodedMultipartFile(fileByte, clean[0],fileInfo.getFileName(), (FileType) fileInfo.getFileType());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

}
