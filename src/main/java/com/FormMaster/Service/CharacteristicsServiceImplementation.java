package com.FormMaster.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.DTO.Characteristics_and_ModuleAndCharacteristicsMapping_DTO;
import com.FormMaster.Repository.CharacteristicsRepo;

@Service
public class CharacteristicsServiceImplementation implements CharacteristicsService{

    @Autowired
    CharacteristicsRepo cr;

    @Override
    public List<Characteristics_and_ModuleAndCharacteristicsMapping_DTO> getAllCharacteristics(int moduleId) {

        List<Characteristics_and_ModuleAndCharacteristicsMapping_DTO> allCharacteristics = cr.findCharacteristicsByModuleId(moduleId);
        return allCharacteristics;
    }

}
