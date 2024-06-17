package com.FormMaster.Service;

import java.util.List;

import com.FormMaster.DTO.Characteristics_and_ModuleAndCharacteristicsMapping_DTO;

public interface CharacteristicsService{
    List<Characteristics_and_ModuleAndCharacteristicsMapping_DTO> getAllCharacteristics(int moduleId);
}
