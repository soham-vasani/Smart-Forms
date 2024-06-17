package com.FormMaster.Entity;

import java.sql.Date;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDate;
@Entity
@Table(name="Questions")

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

public class Questions {

    //here we have duplicate que Id so we add autoQueId.
    @Id    
    int queId;    
    int formId;
    int activeId;
    String queLabel;
    String queName;
    String queDescription;
    int ansTypeId;
    int isAnswerRequired;    
    int validateAnswer;
    int validateTypeId;
    int createdBy;
    LocalDate createdOn;
    @Column(nullable = true)
    int modifyBy;
    @Column(nullable = true)
    LocalDate modifyOn;
}