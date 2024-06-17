package com.FormMaster.Service;

import java.util.List;

import com.FormMaster.Entity.AnswerResponse;

public interface AnswerResponseService {

    boolean saveAnsewer(List<AnswerResponse> answerResponse);

    List<AnswerResponse> findAnsDataByFormIdAndUserId(int formId,long userId);

}
