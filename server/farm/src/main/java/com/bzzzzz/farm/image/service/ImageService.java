package com.bzzzzz.farm.image.service;

import com.bzzzzz.farm.image.dto.ImageResponseDto;
import com.bzzzzz.farm.image.entity.Image;
import com.bzzzzz.farm.image.repository.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ImageService {
    private final ImageRepository imageRepository;



    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }


    //s3 버킷 링크 불러오기
    //@Value 쓰는 걸로 바꾸기
    private String bucketUrl = "https://bzzzzz-farm.s3.ap-northeast-2.amazonaws.com/";

    //사진 추가 결과 리턴 메서드
    public List<ImageResponseDto> addFile(List<MultipartFile> multipartFiles){



        return imageResponseDtoList;;
    }


    //실질적인 사진 저장
    private ImageResponseDto saveFile(MultipartFile multipartFile) throws IOException {
        String absolutePath = new File("").getAbsolutePath() +File.separator + "temp";
        String fileName = "";

        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
        String currentTime = format.format(new Date());

        String contentType = multipartFile.getContentType();

        if(!ObjectUtils.isEmpty(contentType)){
            if(contentType.contains("image/jpeg") ||contentType.contains("image/png") || contentType.contains("image/gif")){
                fileName = currentTime + ".jpg";

        }


    }
}
