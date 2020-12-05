package com.chatting.spring.demo.s3;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.chatting.spring.demo.file.FileInfo;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Service
@NoArgsConstructor
public class S3Service {

    private AmazonS3 s3Client;

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    @PostConstruct
    public void setS3Client(){
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey,this.secretKey);

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(this.region)
                .build();
    }

    public FileInfo upload(MultipartFile file) throws IOException{

        FileInfo fileInfo = new FileInfo();

        String fileName = file.getOriginalFilename();

        s3Client.putObject(new PutObjectRequest(bucket,fileName, file.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));


        String fileUrl = s3Client.getUrl(bucket,fileName).toString();

        fileInfo.setFileName(fileName);
        //fileInfo.setFilePath(fileUrl);
        //System.out.println("파일 url은 " + fileUrl);
        return fileInfo;
    }

}
