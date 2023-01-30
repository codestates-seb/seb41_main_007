package com.bzzzzz.farm.controller;


import com.bzzzzz.farm.model.dto.MultiResponseDto;
import com.bzzzzz.farm.model.dto.storage.StorageResponseDto;
import com.bzzzzz.farm.service.StorageService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Log4j2
public class StorageController {

    @Autowired
    private StorageService storageService;


    @PostMapping("/file/upload")
    public ResponseEntity uploadFile(@RequestParam("file") List<MultipartFile> files) {
        StorageResponseDto imageUrls = storageService.uploadFile(files);
        return ResponseEntity.ok(imageUrls);
    }


}
