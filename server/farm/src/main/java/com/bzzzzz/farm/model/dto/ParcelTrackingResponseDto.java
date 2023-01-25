package com.bzzzzz.farm.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ParcelTrackingResponseDto {
    private String step;
    private String dateTime;
    private String status;
    private String branch;
}