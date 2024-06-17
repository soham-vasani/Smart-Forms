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
@Table(name="characteristics")

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter

public class Characteristics {

    @Id
    int characteristicId;

    String characteristicName;
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
