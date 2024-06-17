package com.FormMaster.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data

@Entity
public class AnswerResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long formId;

    private Long userId;

    private String queId;
    
    private String optionId;
    
    private String answer;

}

