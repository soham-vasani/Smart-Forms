package com.FormMaster.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import com.FormMaster.Entity.ModuleAndCharacteristicsMapping;
import com.FormMaster.Service.ModuleAndCharacteristicsMappingService;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class ModuleAndCharacteristicsMappingController {

    @Autowired
    ModuleAndCharacteristicsMappingService mcms;

    @GetMapping("/ModuleAndCharacteristicsMapping")
    List<ModuleAndCharacteristicsMapping> getModuleAndCharacteristics(){
        return mcms.getModuleAndCharacteristics();
    }
}
