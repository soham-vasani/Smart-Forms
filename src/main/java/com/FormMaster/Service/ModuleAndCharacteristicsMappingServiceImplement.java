package com.FormMaster.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.Entity.ModuleAndCharacteristicsMapping;
import com.FormMaster.Repository.ModuleAndCharacteristicsMappingRepo;

@Service
public class ModuleAndCharacteristicsMappingServiceImplement implements ModuleAndCharacteristicsMappingService{

    @Autowired
    ModuleAndCharacteristicsMappingRepo mcmr;
    @Override
    public List<ModuleAndCharacteristicsMapping> getModuleAndCharacteristics() {
        return mcmr.findAll();
    }

}
