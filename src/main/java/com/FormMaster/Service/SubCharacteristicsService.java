package com.FormMaster.Service;

import java.util.List;

import com.FormMaster.Entity.SubCharacteristics;

public interface SubCharacteristicsService {
    
    List<SubCharacteristics> getSubCharacteristics(int charId);
}
