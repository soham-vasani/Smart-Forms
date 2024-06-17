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
@Table(name="recurrance")

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

public class Recurrence {

    @Id
    int recurrenceId;

    String recurrenceName;
    
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
