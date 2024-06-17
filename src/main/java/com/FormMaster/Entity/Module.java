package com.FormMaster.Entity;

import java.sql.Date;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;  
import jakarta.persistence.Table;
import lombok.*;
import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Table(name="module")

public class Module {   

    @Id
    int moduleId;

    String moduleName;
    String moduleShortName;
    int activeId;
    @Column(nullable = true)
    int createdBy;
    @Column(nullable = true)
    LocalDate createdOn;
    @Column(nullable = true)
    int modifiedBy;
    @Column(nullable = true)
    LocalDate modifiedOn;
}
