package com.FormMaster.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.DTO.CreateForm_Questions_Options_DTO;
import com.FormMaster.Entity.CreateForm;
import com.FormMaster.Entity.Options;
import com.FormMaster.Entity.Questions;
import com.FormMaster.Repository.CreateFormRepo;
import com.FormMaster.Repository.OptionsRepo;
import com.FormMaster.Repository.QuestionsRepo;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDate;

@Service
public class CreateFormServiceImplementation implements CreateFormService{

    @Autowired
    CreateFormRepo cfr;

    @Autowired
    QuestionsRepo qr;

    @Autowired
    OptionsRepo or;
    
    @Autowired
    CreateForm_Questions_Options_DTO fillForm;    

    @Override
    public int getLastFormId() {
        return (int) cfr.count();
    }

    @Override
    public String insertAndUpdateForm(CreateForm formData, List<Questions> queData, List<Options> optData,HttpSession session) {
        
        CreateForm existingFormData = cfr.findById(formData.getFormId()).orElse(null);

        if (existingFormData != null) {

            //set modified by and on.
            formData.setModifyBy((int)session.getAttribute("uId"));
            formData.setModifyOn(LocalDate.now());            

            cfr.save(formData);
            // qr.saveAll(queData);

            qr.deleteQueByFormId(formData.getFormId());
            qr.saveAll(queData);

            // //deactive all existing option.
            or.deActiveExistingOption(formData.getFormId());
            or.saveAll(optData);

            return "Form Updated.";
        } else {

            //set created by and on.
            formData.setCreatedBy((int)session.getAttribute("uId"));
            formData.setCreatedOn(LocalDate.now());

            cfr.save(formData);
            qr.saveAll(queData);
            or.saveAll(optData);
            return "Form Saved.";
        }
    }



    @Override
    public List<CreateForm> selectFormField() {
        return cfr.findActiveFormData();
    }

    @Override
    public CreateForm_Questions_Options_DTO select_Form_Que_Opt_ById(int formId) {        

        fillForm.setFormData(cfr.findById(formId).orElse(null));
        fillForm.setQueData(qr.findActiveQue(formId));
        fillForm.setOptionData(or.findActiveOpt(formId));

        return fillForm;
    }

    @Override
    public String deleteFormByFormId(int formId) {
        
        cfr.deleteFormByFormId(formId);
        qr.deleteQueByFormId(formId);
        or.deleteOptByFormId(formId);

        return "Form Deleted.";
    }

    @Override
    public List<Object> getSubmittedForm(Long userId,HttpSession session) {

        String userRole = (String) session.getAttribute("uRole");                

        if(userRole.equalsIgnoreCase("Admin")){            

            return cfr.getAllSubmittedForm();

        }else if(userRole.equalsIgnoreCase("User")){

            return cfr.getSubmittedFormByUserId(userId);

        }
        
        return null; 
    }

    @Override
    public List<CreateForm> getUnSubmittedForm(Long userId) {
        return cfr.getUnSubmittedForm(userId);
    }  

    public CreateForm findActiveFormDataByFormId(int formId){
        return cfr.findActiveFormDataByFormId(formId);
    }

}
