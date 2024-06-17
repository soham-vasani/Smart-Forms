package com.FormMaster.Service;

import java.util.List;

import com.FormMaster.Entity.Options;

public interface OptionsService {

    void removeOptions(int optionId);

    List<Options> findOptionByFormId(int formId);

}
