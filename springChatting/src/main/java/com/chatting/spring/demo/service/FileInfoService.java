package com.chatting.spring.demo.service;


import com.chatting.spring.demo.file.FileInfo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

@Service
public class FileInfoService {

    public MultipartFile setMultipartFile(FileInfo fileInfo){
        BufferedImage file = null;
        OutputStream stream;
        byte[] imageByte;
        String clean[] = fileInfo.getFileToBase64().split(",");
        try {
            Decoder decoder = Base64.getMimeDecoder();
            imageByte = decoder.decode(clean[1]);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);

            file = ImageIO.read(bis);
            String decodedString = new String(imageByte, StandardCharsets.UTF_8);

            System.out.println(decodedString);
            bis.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

}
