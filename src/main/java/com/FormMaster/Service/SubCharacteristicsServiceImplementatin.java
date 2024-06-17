package com.FormMaster.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.Entity.SubCharacteristics;
import com.FormMaster.Repository.SubCharacteristicsRepo;

@Service

public class SubCharacteristicsServiceImplementatin implements SubCharacteristicsService{

    @Autowired
    SubCharacteristicsRepo scr;

    @Override
    public List<SubCharacteristics> getSubCharacteristics(int charId) {
        return scr.findByCharacteristicId(charId);
    }
}
