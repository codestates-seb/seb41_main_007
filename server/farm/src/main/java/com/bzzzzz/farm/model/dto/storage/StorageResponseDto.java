package com.bzzzzz.farm.model.dto.storage;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Validated
@Getter
@Setter
@NoArgsConstructor
public class StorageResponseDto {
    private String imageUrls;

    public StorageResponseDto(String imageUrls) {
        this.imageUrls = imageUrls;
    }
}
