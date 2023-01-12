package com.bzzzzz.farm.image.dto;

import lombok.Getter;
import org.springframework.validation.annotation.Validated;

@Validated
@Getter

public class ImageResponseDto {

    private Long imageId;
    private Long reviewId;
    private Long reviewAnswerId;
    private String fileName;
    private String s3Url;
    private String s3FilePath;


}
