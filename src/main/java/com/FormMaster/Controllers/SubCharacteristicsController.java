package com.FormMaster.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.FormMaster.Entity.SubCharacteristics;
import com.FormMaster.Service.SubCharacteristicsService;

@Controller

public class SubCharacteristicsController {

    @Autowired
    SubCharacteristicsService scs;

    @GetMapping("/SubCharacteristics/{cId}")
    @ResponseBody List<SubCharacteristics> getSubCharacteristics(@PathVariable("cId") int charId){
        return scs.getSubCharacteristics(charId);
    }

}
