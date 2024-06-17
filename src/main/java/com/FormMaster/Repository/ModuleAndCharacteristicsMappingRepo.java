package com.FormMaster.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FormMaster.Entity.ModuleAndCharacteristicsMapping;
@Repository
public interface ModuleAndCharacteristicsMappingRepo extends JpaRepository<ModuleAndCharacteristicsMapping,Integer>{

}
