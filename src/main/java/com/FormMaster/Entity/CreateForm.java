package com.FormMaster.Entity;

import java.sql.Date;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDate;

@Entity
@Table(name="CreateForm")

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

public class CreateForm {

    @Id
    int formId;
    int activeId;
    String title;
    String aliasName;
    int module;
    int characteristic;
    int subCharacteristic;
    int recurrence;
    int startMonth;
    int compliancePeriod;
    Date effectiveDate;
    String text;
    int createdBy;
    LocalDate createdOn;
    @Column(nullable = true)
    int modifyBy;
    @Column(nullable = true)
    LocalDate modifyOn;
}

