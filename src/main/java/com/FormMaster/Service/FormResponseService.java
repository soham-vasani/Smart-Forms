package com.FormMaster.Service;

import java.time.LocalDate;

import com.FormMaster.Entity.FormResponse;

public interface FormResponseService {

    boolean saveForm(FormResponse fd);

    LocalDate getFormSubmitDataByFormIdAndUserId(int formId, long userId);


    
}
