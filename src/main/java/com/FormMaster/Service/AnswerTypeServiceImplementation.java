package com.FormMaster.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.Entity.AnswerType;
import com.FormMaster.Repository.AnswerTypeRepo;

@Service

public class AnswerTypeServiceImplementation implements AnswerTypeService{

    @Autowired 
    AnswerTypeRepo atr;
    
    @Override
    public List<AnswerType> getAnswerType() {
        return atr.findAll();
    }

}
