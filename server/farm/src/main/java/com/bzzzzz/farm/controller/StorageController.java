package com.bzzzzz.farm.controller;


import com.bzzzzz.farm.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class StorageController {

    @Autowired
    private StorageService storageService;

    //500문제남
    @PostMapping("/file/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") List<MultipartFile> files) {


        return new ResponseEntity<>(storageService.uploadFile(files), HttpStatus.OK);
    }


}
