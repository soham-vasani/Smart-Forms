package com.FormMaster.Configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){    

        String projectDir = System.getProperty("user.dir");

        String ImgDir = projectDir + "/src/main/resources/static/UserImages/";

        registry.addResourceHandler("/UImg/**")
        .addResourceLocations("file:"+ImgDir);
        
    }

}
