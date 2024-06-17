package com.FormMaster.DTO;

import lombok.Data;

@Data

public class AnswerResponseWithOptionValue {

    private Long id;
    
    private Long formId;

    private Long userId;

    private String queId;
    
    private String optionId;
    
    private String answer;

    private String optionsValue;
    
}