package com.FormMaster.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.FormMaster.DTO.Characteristics_and_ModuleAndCharacteristicsMapping_DTO;
import com.FormMaster.Entity.Characteristics;

@Repository
public interface CharacteristicsRepo extends JpaRepository<Characteristics,Integer>{


    @Query("SELECT new com.FormMaster.DTO.Characteristics_and_ModuleAndCharacteristicsMapping_DTO(c.characteristicId, c.characteristicName) " +
       "FROM Characteristics c " +
       "JOIN ModuleAndCharacteristicsMapping mc ON c.characteristicId = mc.characteristicId " +
       "WHERE mc.moduleId = :moduleId")

    List<Characteristics_and_ModuleAndCharacteristicsMapping_DTO> findCharacteristicsByModuleId(@Param("moduleId") int moduleId);


}
