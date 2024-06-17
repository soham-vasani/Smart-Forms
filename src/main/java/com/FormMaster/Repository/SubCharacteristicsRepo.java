package com.FormMaster.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FormMaster.Entity.SubCharacteristics;

@Repository
public interface SubCharacteristicsRepo extends JpaRepository<SubCharacteristics,Integer>{

    List<SubCharacteristics> findByCharacteristicId(int charId);

}
