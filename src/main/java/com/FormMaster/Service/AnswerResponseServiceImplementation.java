package com.FormMaster.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.Entity.AnswerResponse;
import com.FormMaster.Repository.AnswerResponseRepo;

@Service

public class AnswerResponseServiceImplementation implements AnswerResponseService{

    @Autowired
    AnswerResponseRepo arr;

    @Override
    public boolean saveAnsewer(List<AnswerResponse> answerResponse) {

        try {
        
            arr.saveAll(answerResponse);
            return true;

        } catch (Exception e) {
            throw e;
        }
                
    }    

    @Override
    public List<AnswerResponse> findAnsDataByFormIdAndUserId(int formId, long userId) {
        return arr.findAnsDataByFormIdAndUserId(formId,userId);
    }

}

