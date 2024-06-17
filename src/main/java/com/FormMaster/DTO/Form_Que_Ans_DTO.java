package com.FormMaster.DTO;

import java.time.LocalDate;
import java.util.List;

import com.FormMaster.Entity.AnswerResponse;
import com.FormMaster.Entity.CreateForm;
import com.FormMaster.Entity.Options;
import com.FormMaster.Entity.Questions;
import lombok.Data;

@Data

public class Form_Que_Ans_DTO {

    private CreateForm formData;
    private List<Questions> queData;
    private List<AnswerResponse> answer;
    private List<Options> options;
    private LocalDate submitOn;   
}