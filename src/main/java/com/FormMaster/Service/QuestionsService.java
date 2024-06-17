package com.FormMaster.Service;

import java.util.List;

import com.FormMaster.Entity.Questions;

public interface QuestionsService {

    int getLastQueId();

    String deleteQueAndOpt(int questionId);

    List<Questions> findActiveQueDataByFormId(int formId);

}