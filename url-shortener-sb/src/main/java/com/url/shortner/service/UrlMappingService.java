package com.url.shortner.service;

import com.url.shortner.dtos.ClickEventDTO;
import com.url.shortner.dtos.UrlMappingDTO;
import com.url.shortner.models.ClickEvent;
import com.url.shortner.models.UrlMapping;
import com.url.shortner.models.User;
import com.url.shortner.repository.ClickEventRepository;
import com.url.shortner.repository.UrlMappingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UrlMappingService {

    private UrlMappingRepository urlMappingRepository;
    private ClickEventRepository clickEventRepository;
    public UrlMappingDTO createShortUrl(String originalUrl, User user) {

        String shortUrl = generateShortUrl();

        UrlMapping urlMapping = new UrlMapping();

        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());

        UrlMapping savedUrlMapping =
                urlMappingRepository.save(urlMapping);

        return convertToDto(savedUrlMapping);
    }

    private UrlMappingDTO convertToDto(UrlMapping urlMapping) {

        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();

        urlMappingDTO.setId(urlMapping.getId());
        urlMappingDTO.setOrignalUrl(urlMapping.getOriginalUrl());
        urlMappingDTO.setShortURl(urlMapping.getShortUrl());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setCreatedDate(urlMapping.getCreatedDate());

        if (urlMapping.getUser() != null) {
            urlMappingDTO.setUsername(
                    urlMapping.getUser().getUsername()
            );
        }

        return urlMappingDTO;
    }

    private String generateShortUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        Random random = new Random();
        String shortUrl;
        // Regenerate until unique
        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 8; i++) {
                sb.append(characters.charAt(random.nextInt(characters.length())));
            }
            shortUrl = sb.toString();
        } while (urlMappingRepository.findByShortUrl(shortUrl) != null);
        return shortUrl;
    }

    public List<UrlMappingDTO> getUrlsByUser(User user) {
       return urlMappingRepository.findByUser(user).stream()
               .map(this::convertToDto)
               .toList();
    }

    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping, start, end).stream()
                    .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()))
                    .entrySet().stream()
                    .map(entry -> {
                        ClickEventDTO clickEventDTO = new ClickEventDTO();
                        clickEventDTO.setClickDate(entry.getKey());
                        clickEventDTO.setCount(entry.getValue());
                        return clickEventDTO;
                    })
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    public UrlMapping getOriginalUrlAndLogClick(String shortUrl) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            urlMappingRepository.save(urlMapping);

            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);
            clickEventRepository.save(clickEvent);
        }
        return urlMapping;
    }
}