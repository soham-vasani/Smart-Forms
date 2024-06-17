package com.FormMaster.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="Options")

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

public class Options {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int optionsId;
    int activeId;
    int formId;
    int queId;
    String optionsValue;
    
}
