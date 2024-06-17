package com.FormMaster.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.FormMaster.DTO.Characteristics_and_ModuleAndCharacteristicsMapping_DTO;
import com.FormMaster.Service.CharacteristicsService;

@Controller
public class CharacteristicsController {

    @Autowired
    CharacteristicsService cs;

    @GetMapping("/characteristics/{moduleId}")
    @ResponseBody List<Characteristics_and_ModuleAndCharacteristicsMapping_DTO> getAllCharacteristics(@PathVariable("moduleId") int moduleId){
        return cs.getAllCharacteristics(moduleId);
    }
}
