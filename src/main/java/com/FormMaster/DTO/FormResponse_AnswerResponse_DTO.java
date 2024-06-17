package com.FormMaster.DTO;

import java.sql.Date;
import java.util.List;

import com.FormMaster.Entity.AnswerResponse;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class FormResponse_AnswerResponse_DTO {

       private Long formId;
       private Long userId;
       private Date submitOn;
       List<AnswerResponse> answerResponse;              
       
}