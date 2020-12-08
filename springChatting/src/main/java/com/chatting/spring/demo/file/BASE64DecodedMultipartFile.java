package com.chatting.spring.demo.file;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;

public class BASE64DecodedMultipartFile implements MultipartFile {

    private final byte[] fileByte;
    private final String header;
    private final String fileName;
    private final FileType fileType;

    public BASE64DecodedMultipartFile(byte[] fileByte,String header,String fileName,FileType fileType) {
        this.fileByte = fileByte;
        this.header=header;
        this.fileName=fileName;
        this.fileType=fileType;
    }

    @Override
    public Resource getResource() {
        return null;
    }

    @Override
    public void transferTo(Path dest) throws IOException, IllegalStateException {

    }

    @Override
    public String getName() {
        return fileName;
    }

    @Override
    public String getOriginalFilename() {
        return fileName;
    }

    @Override
    public String getContentType() {
        switch (fileType){
            case jpg:
            case png:
                return "image/jpeg";
            case pdf:
            case txt:
                return "application/octet-stream";
            default:
                return "application/octet-stream";
        }
    }
    @Override
    public boolean isEmpty() {
        return false;
    }

    @Override
    public long getSize() {
        return fileByte.length;
    }

    @Override
    public byte[] getBytes() throws IOException {
        return this.fileByte;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return new ByteArrayInputStream(fileByte);
    }

    @Override
    public void transferTo(File dest) throws IOException, IllegalStateException {

    }
}
