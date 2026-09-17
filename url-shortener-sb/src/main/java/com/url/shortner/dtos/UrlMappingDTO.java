package com.url.shortner.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UrlMappingDTO {
    private Long id;
    private String orignalUrl;
    private String shortURl;
    private int clickCount;
    private LocalDateTime createdDate;
    private String username;

}
