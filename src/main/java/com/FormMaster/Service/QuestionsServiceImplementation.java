package com.FormMaster.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.Entity.Questions;
import com.FormMaster.Repository.OptionsRepo;
import com.FormMaster.Repository.QuestionsRepo;

@Service

public class QuestionsServiceImplementation implements QuestionsService{

    @Autowired
    QuestionsRepo qr;

    @Autowired
    OptionsRepo or;

    @Override
    public int getLastQueId() {
        return (int) qr.count();
    }

    @Override
    public String deleteQueAndOpt(int questionId) {

        qr.deleteQue(questionId);
        or.deleteOptByQueId(questionId);

        return "question and option deleted where question id is "+questionId;
    }

    @Override
    public List<Questions> findActiveQueDataByFormId(int formId) {
       return qr.findActiveQue(formId);
    }

}
