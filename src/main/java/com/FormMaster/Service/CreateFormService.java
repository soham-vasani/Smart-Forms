package com.FormMaster.Service;

import java.util.List;

import com.FormMaster.DTO.CreateForm_Questions_Options_DTO;
import com.FormMaster.Entity.CreateForm;
import com.FormMaster.Entity.Options;
import com.FormMaster.Entity.Questions;

import jakarta.servlet.http.HttpSession;

public interface CreateFormService {

    int getLastFormId();

    String insertAndUpdateForm(CreateForm FormData,List<Questions> QueData,List<Options> OptData,HttpSession session);

    List<CreateForm> selectFormField();

    CreateForm_Questions_Options_DTO select_Form_Que_Opt_ById(int formId);

    String deleteFormByFormId(int formId);

    List<CreateForm> getUnSubmittedForm(Long userId);  

    List<Object> getSubmittedForm(Long userId,HttpSession session);      

    public CreateForm findActiveFormDataByFormId(int formId);

}
