package com.bzzzzz.farm.config;

import com.bzzzzz.farm.model.dto.ParcelTrackingResponseDto;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class ParcelTrackingConfig {
    private String cjUrl = "https://www.doortodoor.co.kr/parcel/%20/%20doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=";
    private String cjCssQuery = "#tabContents > ul > li.first.focus > div > div:nth-child(2) > div > table > tbody > tr";

    public List<ParcelTrackingResponseDto> traceAParcel(Long trackingId) {
        List<ParcelTrackingResponseDto> result = new ArrayList<>();
        try {
            Document doc = Jsoup.connect(cjUrl + trackingId).get();
            Elements elements = doc.select(cjCssQuery);

            for (int i = 1; i < elements.size(); i++) {
                result.add(new ParcelTrackingResponseDto(
                        elements.get(i).select("> td:nth-child(1)").text(),
                        elements.get(i).select("> td:nth-child(2)").text(),
                        elements.get(i).select("> td:nth-child(3)").text(),
                        elements.get(i).select("> td:nth-child(4)").text()
                ));
            }


        } catch (IOException e) {

        }

        return result;
    }
}
