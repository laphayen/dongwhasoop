package com.fairytale.FairyTale.global.util.voice;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.mock.web.MockMultipartFile;

import java.util.Base64;

public class MultipartFileUtils {
    public static MultipartFile convertBase64ToMultipart(String base64Data, String format, String fileName) {
        try {
            byte[] decoded = Base64.getDecoder().decode(base64Data);
            return new MockMultipartFile(fileName, fileName + "." + format, "audio/" + format, decoded);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Base64 디코딩 실패", e);
        }
    }
}