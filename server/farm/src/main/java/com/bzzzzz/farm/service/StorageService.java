package com.bzzzzz.farm.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.bzzzzz.farm.model.dto.storage.StorageResponseDto;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Log4j2
@Service
public class StorageService {

    @Value("${application.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;


    public StorageResponseDto uploadFile(List<MultipartFile> files) {
        List<String> fileUrls = new ArrayList<>();;

        for(MultipartFile file : files){
            File fileObj = convertMultiPartFileToFile(file);
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
            fileUrls.add(s3Client.getUrl(bucketName, fileName).toString());
            fileObj.delete();
        }
        String imageUrls = String.join(",", fileUrls);
        return new StorageResponseDto(imageUrls);
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (Exception e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }

}
