package com.FormMaster.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.DTO.FormResponse_AnswerResponse_DTO;
import com.FormMaster.Entity.FormResponse;


@Service
public class FillFormServiceImplementation implements FillFormService{

    @Autowired
    FormResponseService frs;

    @Autowired
    AnswerResponseService ars;


    @Override
    public String saveFormData(FormResponse_AnswerResponse_DTO formData) {

        System.out.println(formData);
        

        FormResponse fd = new FormResponse();

        fd.setFormId(formData.getFormId());
        fd.setUserId(formData.getUserId());

        boolean saveFormResponse = frs.saveForm(fd);

        boolean saveAnswerResponse = ars.saveAnsewer(formData.getAnswerResponse());
    
        if(saveFormResponse && saveAnswerResponse){
            return "Form Submited.";
        }else{
            return "Form not submited";
        }
    }  

}
