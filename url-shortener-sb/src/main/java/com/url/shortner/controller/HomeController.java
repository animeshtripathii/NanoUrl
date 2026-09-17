package com.url.shortner.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "message", "NanoURL Backend Service is Running!",
            "version", "2.4.1"
        ));
    }
}
