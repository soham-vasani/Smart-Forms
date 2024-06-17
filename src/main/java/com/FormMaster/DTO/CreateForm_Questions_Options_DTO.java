package com.FormMaster.DTO;

import java.util.List;

import org.springframework.stereotype.Component;

import com.FormMaster.Entity.CreateForm;
import com.FormMaster.Entity.Options;
import com.FormMaster.Entity.Questions;

// CreateForm_Questions_Options_DTO

@Component
public class CreateForm_Questions_Options_DTO {

    private CreateForm formData;
    private List<Questions> queData;
    private List<Options> optionData;

    // Getters and Setters
    public CreateForm getFormData() {
        return formData;
    }

    public void setFormData(CreateForm formData) {
        this.formData = formData;
    }

    public List<Questions> getQueData() {
        return queData;
    }

    public void setQueData(List<Questions> queData) {
        this.queData = queData;
    }

    public List<Options> getOptionData() {
        return optionData;
    }

    public void setOptionData(List<Options> optionData) {
        this.optionData = optionData;
    } 
}
