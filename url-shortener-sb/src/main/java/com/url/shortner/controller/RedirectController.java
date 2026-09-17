package com.url.shortner.controller;

import com.url.shortner.models.UrlMapping;
import com.url.shortner.service.UrlMappingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@AllArgsConstructor
public class RedirectController {

    private UrlMappingService urlMappingService;

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl) {
        UrlMapping urlMapping = urlMappingService.getOriginalUrlAndLogClick(shortUrl);
        if (urlMapping != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create(urlMapping.getOriginalUrl()));
            return new ResponseEntity<>(headers, HttpStatus.FOUND);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
