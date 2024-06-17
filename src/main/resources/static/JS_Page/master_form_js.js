toastr.options = {
	"closeButton": true,
	"debug": false,
	"newestOnTop": false,
	"progressBar": false,
	"positionClass": "toast-top-right",
	"preventDuplicates": false,
	"onclick": null,
	"showDuration": "3000",
	"hideDuration": "3000",
	"timeOut": "3000",
	"extendedTimeOut": "3000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
}

$(function() {

	moduleAppend();
    RecurranceAppend();
    MonthAppend();    
    addFormToTable();
    AnsTypeAppend();
    getLastQueId();    
})

let form_Id_Globle;
let queId;

let queList=[];
let optionList=[];
let queAddedFlag = false;

function addFormBtn(){

    clearQue();
    clearForm();

    $("#formDiv").show();

    $("a[name='saveBtn']").attr('id',0);

    $("#activeBtnDiv").hide();
    $("#active").prop("checked", true);

    const api="http://localhost:9090/getLastFormId";

    fetch(api)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok.");
        }
        return response.text();
    })
    .then(lastFormId=>{
        form_Id_Globle = ++lastFormId;
        $("#formId").val(form_Id_Globle);
    })
    .catch(error=>{
        console.log("error:- ",error);
    })
}

function addQueBtn(){
    clearQue()
    $("a[name='saveQueBtn']").attr('id',0);    
}

function getLastQueId(){
    
    const api="http://localhost:9090/getLastQueId";

    fetch(api)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok.");
        }
        return response.text();
    })
    .then(lastQueId=>{
        queId = lastQueId;        
    })
    .catch(error=>{
        console.log("error:- ",error);
    })
}

function saveQueBtn(){  

    let saveQueBtnId = $("a[name='saveQueBtn']").attr('id');    
    let form_Id = form_Id_Globle;    
    let que_Label = $("#queLabel").val();
    let que_Name = $("#queName").val();
    let que_Description = $("#queDescription").val();
    let ans_Type_Id = $("#ansType :selected").attr('id');
    let is_Answer_Required = Number($("#isAnswerRequired").is(":checked"));    
    let validate_Answer = Number($("#isValidateRequired").is(":checked"));
    let validate_Type_Id = $("#validationType :selected").val();

    if(questionValidate(que_Label,que_Name,ans_Type_Id,validate_Answer,validate_Type_Id)){
    
        if(isQuestionExist(saveQueBtnId,ans_Type_Id,que_Name)){

                //saveQueBtnId == 0 => insert que | saveQueBtnId == queId => update que.
                if(saveQueBtnId == 0){

                    let que_Id = ++queId;

                    queList.push(
                        {
                            queId:que_Id,
                            formId:form_Id,
                            activeId:1,
                            queLabel:que_Label,
                            queName:que_Name,
                            queDescription:que_Description,
                            ansTypeId:Number(ans_Type_Id),
                            isAnswerRequired:is_Answer_Required,
                            validateAnswer:validate_Answer,
                            validateTypeId:validate_Type_Id,
                   
                        }
                    )

                    if(ans_Type_Id == 2){
    
                        let singleChoiceData =  $("#singleChoice input[type='text']");
                    
                        for(let i=0; i<singleChoiceData.length; i++){
                            optionList.push(
                                {
                                    optionsId:-1,
                                    activeId:1,
                                    formId:form_Id_Globle,
                                    queId:que_Id,                                    
                                    optionsValue:singleChoiceData[i].value,

                                }
                            )
                        }
                    }
                    else if(ans_Type_Id == 3){
            
                        let multiChoiceData =  $("#multiChoice input[type='text']");
                    
                        for(let i=0; i<multiChoiceData.length; i++){
                            optionList.push(
                                {
                                    optionsId:-1,
                                    activeId:1,
                                    formId:form_Id_Globle,
                                    queId:que_Id, 
                                    optionsValue:multiChoiceData[i].value
                                }
                            )
                        }
                    }
                    else if(ans_Type_Id == 6){
            
                        let singleSelectData =  $("#singleSelect input[type='text']");
                
                        for(let i=0; i<singleSelectData.length; i++){
                            optionList.push(
                                {
                                    optionsId:-1,
                                    activeId:1,
                                    formId:form_Id_Globle,
                                    queId:que_Id,
                                    optionsValue:singleSelectData[i].value
                                }
                            )
                        }
                    }
                    else if(ans_Type_Id == 7){
            
                        let multiSelectData =  $("#multiSelect input[type='text']");
                
                        for(let i=0; i<multiSelectData.length; i++){

                                optionList.push(
                                    {
                                        optionsId:-1,
                                        activeId:1,
                                        formId:form_Id_Globle,
                                        queId:que_Id, 
                                        optionsValue:multiSelectData[i].value
                                    }
                                )
                        }
                                }

                    toastr.success("Question Added.");

                }else{
                    queList.forEach((eachQue)=>{
                        if(eachQue.queId == saveQueBtnId){

                            eachQue.queLabel = que_Label;
                            eachQue.queName = que_Name;
                            eachQue.queDescription = que_Description;
                            eachQue.ansTypeId = ans_Type_Id;
                            eachQue.isAnswerRequired = is_Answer_Required;
                            eachQue.validateAnswer = validate_Answer;
                            eachQue.validateTypeId = validate_Type_Id;

                        }                        
                    })
                    
                    //remove old options from option list.
                    for(let j=0; j<optionList.length; j++){
                        if(optionList[j].queId == saveQueBtnId){
                            optionList.splice(j,1);
                            j--;
                        }
                    }

                    if (ans_Type_Id == 2) {
                        let singleChoiceData = $("#singleChoice input[type='text']");
                        
                        singleChoiceData.each(function() {

                            let option_Id = $(this).attr("option_id");
                            
                            optionList.push({
                                optionsId: option_Id,
                                activeId: 1,
                                formId: form_Id_Globle,
                                queId: saveQueBtnId,
                                optionsValue: $(this).val()
                            });
                        });
                    } else if (ans_Type_Id == 3) {
                        let multiChoiceData = $("#multiChoice input[type='text']");
                        
                        multiChoiceData.each(function() {

                            let option_Id = $(this).attr("option_id");
                            
                            optionList.push({
                                optionsId: option_Id,
                                activeId: 1,
                                formId: form_Id_Globle,
                                queId: saveQueBtnId,
                                optionsValue: $(this).val()
                            });
                        });
                    } else if (ans_Type_Id == 6) {
                        let singleSelectData = $("#singleSelect input[type='text']");
                        
                        singleSelectData.each(function() {

                            let option_Id = $(this).attr("option_id");
                            
                            optionList.push({
                                optionsId: option_Id,
                                activeId: 1,
                                formId: form_Id_Globle,
                                queId: saveQueBtnId,
                                optionsValue: $(this).val()
                            });
                        });
                    } else if (ans_Type_Id == 7) {
                        let multiSelectData = $("#multiSelect input[type='text']");
                        
                        multiSelectData.each(function() {

                            let option_Id = $(this).attr("option_id");
                            
                            optionList.push({
                                optionsId: option_Id,
                                activeId: 1,
                                formId: form_Id_Globle,
                                queId: saveQueBtnId,
                                optionsValue: $(this).val()
                            });
                        });
                    }
                    toastr.success("Question Updated.");
                }

                queAddedFlag = true;
                $("#queModal").modal('hide');
                addStaticQueToTable();
                // clearQue();
        }
                   
    }
}

function isQuestionExist(saveQueBtnId,ans_Type_Id,que_Name){

    for(let i=0; i<queList.length; i++){

        if((queList[i].ansTypeId == ans_Type_Id && queList[i].queName == que_Name) && (queList[i].queId != saveQueBtnId)){
            toastr.error("Question Already Exist.");
            return false;
        }
    }

    return true;
}

function addStaticQueToTable(){

    let queTable = $("#formquestion_datatable").DataTable();

    queTable.clear().draw();

    queList.forEach((que)=>{
        
        let ansTypeId = que.ansTypeId;
        let ansType = $("#ansType").find(`option[id=${ansTypeId}]`).text();
        let isAnswerRequiredStr;

        if(que.isAnswerRequired == 0){
            isAnswerRequiredStr = "No"
        }else{
            isAnswerRequiredStr = "Yes"
        }
        
        queTable.row.add([

            que.queId,
            que.queName,
            ansType,
            isAnswerRequiredStr,
            `<span data-toggle="modal"
            data-target=".addformquestion">
                <a
                    id=${que.queId}
                    onClick="editQue(${que.queId})"
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    data-original-title="Edit"
                    class="text-success fa-size"><i
                    class="fa fa-pencil"></i>
                </a>
            </span>
            <span class="delete-user-alert">
                <a
                    id=${que.queId}
                    onClick="deleteQue(${que.queId})"
                    href="javascript:void(0)"
                    class="text-danger fa-size"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    data-original-title="Delete"><i
                    class="fa fa-trash"></i>
                </a>
            </span>`
            
        ]).draw();
    })
}

function editQue(queId){

    clearQue();

    $("a[name='saveQueBtn']").attr('id',queId);

    queList.forEach((eachQue)=>{

        if(eachQue.queId == queId){
            
            $("#queLabel").val(eachQue.queLabel);
            $("#queName").val(eachQue.queName);
            $("#queDescription").val(eachQue.queDescription);
            $("#ansType option#"+eachQue.ansTypeId).prop("selected",true);
            $("#ansType").selectpicker("refresh");
            
            $("#isAnswerRequired").prop("checked",eachQue.isAnswerRequired);  
            
            
            if(eachQue.ansTypeId == 1){
                $('.noansdisplaynone').hide();
            }
            else if(eachQue.ansTypeId == 2){

                $("#singleChoice input[type='text']").val('');
                $("#singleChoice tbody tr").remove();

                $('.singlechoicedata').hide();
                $('.multichoicedata').hide();
                $('.singleselectdata').hide();
                $('.multiselectdata').hide();
                $('.hidetextvalidation').hide();
                $('.showanswershouldbe').hide();
                $('.hidedatevalidation').hide();
                $('.noansdisplaynone').show();

                optionList.forEach((eachOption)=>{

                    if(eachOption.queId == queId){                                                
                        addSingleChoice(eachOption.optionsValue,eachOption.optionsId);
                    }

                })

            }
            else if(eachQue.ansTypeId == 3){

                $("#multiChoice input[type='text']").val('');
                $("#multiChoice tbody tr").remove();

                $('.multichoicedata').hide();
                $('.singlechoicedata').hide();
                $('.singleselectdata').hide();
                $('.multiselectdata').hide();
                $('.hidetextvalidation').hide();
                $('.showanswershouldbe').hide();
                $('.hidedatevalidation').hide();
                $('.noansdisplaynone').show();

                optionList.forEach((eachOption)=>{

                    if(eachOption.queId == queId){                                                
                        addMultiChoice(eachOption.optionsValue,eachOption.optionsId);
                    }

                })

            }
            else if(eachQue.ansTypeId == 4 || eachQue.ansTypeId == 5){

                $('.multichoicedata').hide();
                $('.singlechoicedata').hide();
                $('.singleselectdata').hide();
                $('.multiselectdata').hide();
                $('.hidetextvalidation').show();
                $('.showanswershouldbe').hide();
                $('.hidedatevalidation').hide();
                $('.noansdisplaynone').show(); 
               
                $("#isValidateRequired").prop("checked",eachQue.validateAnswer);

                if(eachQue.validateAnswer == 1){
                    $('.showanswershouldbe').show();
                    $("#validationType option#"+eachQue.validateTypeId).prop("selected",true);
                    $("#validationType").selectpicker("refresh");                    
                }                
            }
            else if(eachQue.ansTypeId == 6){

                $("#singleSelect input[type='text']").val('');
                $("#singleSelect tbody tr").remove();

                $('.singleselectdata').hide();
                $('.multichoicedata').hide();
                $('.singlechoicedata').hide();
                $('.multiselectdata').hide();
                $('.hidetextvalidation').hide();
                $('.showanswershouldbe').hide();
                $('.hidedatevalidation').hide();
                $('.noansdisplaynone').show();

                optionList.forEach((eachOption)=>{

                    if(eachOption.queId == queId){                                                
                        addSingleSelect(eachOption.optionsValue,eachOption.optionsId);
                    }

                })

            }
            else if(eachQue.ansTypeId == 7){

                $("#multiSelect input[type='text']").val('');
                $("#multiSelect tbody tr").remove();
                
                $('.multiselectdata').hide();
                $('.multichoicedata').hide();
                $('.singlechoicedata').hide();
                $('.singleselectdata').hide();
                $('.hidetextvalidation').hide();
                $('.showanswershouldbe').hide();
                $('.hidedatevalidation').hide();
                $('.noansdisplaynone').show();

                optionList.forEach((eachOption)=>{

                    if(eachOption.queId == queId){                                                
                        addMultiSelect(eachOption.optionsValue,eachOption.optionsId);
                    }

                })

            }
            else if(eachQue.ansTypeId == 8){

                $("#multiSelect input[type='text']").val('');
                $("#multiSelect tbody tr").remove();
                
                $('.multiselectdata').hide();
                $('.multichoicedata').hide();
                $('.singlechoicedata').hide();
                $('.singleselectdata').hide();
                $('.hidetextvalidation').hide();
                $('.showanswershouldbe').hide();
                $('.hidedatevalidation').show();
                $('.noansdisplaynone').show();

                optionList.forEach((eachOption)=>{

                    if(eachOption.queId == queId){                                                
                        addMultiSelect(eachOption.optionsValue);
                    }

                })

            }
        }
    })
}

function deleteQue(queId){
    
    $.confirm({
        title: 'Record will be permenantly deleted !',
        content: 'You wont be able to undo the action.',
        theme: 'material',
        // icon: 'fas fa-exclamation-triangle',
        type: 'red',
        buttons: {
            delete: {
                btnClass: 'btn-danger btn-min-width',
                action: function() {

                    //remove(update) in db.

                                //remove from list
                                for(let i=0; i<queList.length; i++){
                                    if(queList[i].queId == queId){
                                        queList.splice(i,1);
                                        break;
                                    }
                                }                                    
                                for(let j=0; j<optionList.length; j++){
                                    if(optionList[j].queId == queId){
                                        optionList.splice(j,1);
                                        j--;
                                    }
                                }

                                addStaticQueToTable();
                                $.alert('Record deleted successfully!');
            
                                if(queList.length == 0){
                                    queAddedFlag = false;
                                }            
                   
                }
            },
            cancel: {
                btnClass: 'btn-secondary btn-min-width',
                action: function() {
                }
            },

        }
    });
    
}

function clearForm(){

    queList.length = 0;
    optionList.length = 0;
    queAddedFlag = false;

    $("#titleText").val("");
    $("#aliasName").val("");

    //drop down
    $("#module").val([]);
    $("#module").selectpicker('refresh');

    $("#Characteristic").val([]);
    $("#Characteristic").selectpicker('refresh');

    $("#subCharacteristic").val([]);
    $("#subCharacteristic").selectpicker('refresh');

    $("#Recurrence").val([]);
    $("#Recurrence").selectpicker('refresh');

    $("#Month").val([]);
    $("#Month").selectpicker('refresh');

    $("#CompliancePeriod").val("");

    $(".EffectiveDate").val("");
    $("#text").val("");

    //clear que
    $("#formquestion_datatable tbody tr").remove();
}

function clearQue(){

    $("#queLabel").val("");
    $("#queName").val("");
    $("#queDescription").val("");
    $("#ansType").val([]);
    $("#ansType").selectpicker('refresh');    

    $("#isAnswerRequired").prop("checked",false);
    $("#isValidateRequired").prop("checked",false);

    $("#validationType").val([]);
    $("#validationType").selectpicker('refresh');

    $('.noansdisplaynone').hide();

    singleChoiceRemoveAndAppend();
    multiChoiceRemoveAndAppend();
    singleSelectRemoveAndAppend();
    multiSelectRemoveAndAppend();
}

function saveFormBtn(){
        
        let formId = Number(form_Id_Globle);
        let activeId = Number($("#active").is(":checked"));
        let titleText = $("#titleText").val();
        let aliasName = $("#aliasName").val();
        let module = $("#module :selected").attr('id');
        let characteristic = $("#Characteristic :selected").attr('id');
        let subCharacteristic = $("#subCharacteristic :selected").attr('id');
        let recurrence = $("#Recurrence :selected").attr('id');
        let startMonth = $("#Month :selected").attr('id');
        let compliancePeriod = $("#CompliancePeriod").val();
        let effectiveDate = $(".EffectiveDate").val();
        let text = $("#text").val();

        //converting date format dd/mm/yyyy to yyyy-mm-dd
        let effectiveDateSplit = effectiveDate.split("/");
        let dd = effectiveDateSplit[0];
        let mm = effectiveDateSplit[1];
        let yyyy = effectiveDateSplit[2];
        let newEffectiveDate = yyyy + "-" + mm + "-" + dd;

        if(formValidation(titleText,aliasName,module,characteristic,subCharacteristic,recurrence,startMonth,compliancePeriod,effectiveDate,text)){
                    
            if(queAddedFlag){

                $("#formDiv").hide();
                $("#portfolio_details").show();            
                      
                let formDetail = {

                    "formData":{
                        formId:Number(formId),
                        activeId:activeId,
                        title:titleText,
                        aliasName:aliasName,
                        module:Number(module),
                        characteristic:Number(characteristic),
                        subCharacteristic:Number(subCharacteristic),
                        recurrence:Number(recurrence),
                        startMonth:Number(startMonth),
                        compliancePeriod:Number(compliancePeriod),
                        effectiveDate:newEffectiveDate,
                        text:text,
                    },
                    "queData":queList,
                    "optionData":optionList
                }
                console.log(formDetail);

                const formSendApi = "http://localhost:9090/insertAndUpdateForm";

                fetch(formSendApi,{
                    method:'POST',                    
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(formDetail)
                })
                .then(response=>{
                    if(!response.ok){
                        throw new Error("network response was not ok!")
                    }
                    return response.text();                    
                })
                .then(formResponse=>{

                    toastr.success(formResponse);                 

                    clearForm();
                    clearQue();
                    addFormToTable();
                })
                .catch(error=>{
                    console.log("error:- ",error);
                })                        
                
            }else{
                toastr.error("Please add the questions.");
            }
        }else{
            $("#formDiv").show();
            $("#portfolio_details").hide();
        }

}

function editForm(formId){
    
    $("a[name='saveBtn']").attr('id',formId);
    $("#activeBtnDiv").show();
    $("#formDiv").show();

    queAddedFlag = true;

    const FormDataById = `http://localhost:9090/select_Form_Que_Opt_ById/${formId}`;

    fetch(FormDataById)
    .then(response=>{
        if(!response.ok){
            throw new error("network response was not ok.")
        }
        return response.json();
    })
    .then(async formData=>{

        console.log(formData);

        //filling the form value.
        $("#formId").val(formId);
        form_Id_Globle = formId;
        $("#titleText").val(formData.formData.title);
        $("#aliasName").val(formData.formData.aliasName);

        $("#module option#"+formData.formData.module).prop("selected",true);
        $("#module").selectpicker("refresh");
        
        await characteristicAppend();
        $("#Characteristic option#"+formData.formData.characteristic).prop("selected",true);
        $("#Characteristic").selectpicker("refresh");
        
        await subCharacteristicAppend();     
        $("#subCharacteristic option#"+formData.formData.subCharacteristic).prop("selected",true);
        $("#subCharacteristic").selectpicker("refresh");        

        $("#Recurrence option#"+formData.formData.recurrence).prop("selected",true);
        $("#Recurrence").selectpicker("refresh");

        $("#Month option#"+formData.formData.startMonth).prop("selected",true);
        $("#Month").selectpicker("refresh");

        $("#CompliancePeriod").val(formData.formData.compliancePeriod);

        //converting yyyy-mm-dd to dd/mm/yyyy.
        let effectiveDate = formData.formData.effectiveDate;
        let effectiveDateSplit = effectiveDate.split("-");
        let yyyy = effectiveDateSplit[0];
        let mm = effectiveDateSplit[1];
        let dd = effectiveDateSplit[2];        
        let newEffectiveDate = dd + "/" + mm + "/" + yyyy;
        $(".EffectiveDate").val(newEffectiveDate);

        $("#active").prop("checked",Boolean(formData.formData.activeId));
        
        $("#text").val(formData.formData.text);

        //filling que

        queList = formData.queData;
        optionList = formData.optionData;
        addStaticQueToTable();
    })
    .catch(error=>{
        console.log("error:- ",error);
    });        
}

function deleteForm(formId){

    $.confirm({
        title: 'Record will be permenantly deleted !',
        content: 'You wont be able to undo the action.',
        theme: 'material',
        // icon: 'fas fa-exclamation-triangle',
        type: 'red',
        buttons: {
            delete: {
                btnClass: 'btn-danger btn-min-width',
                action: function() {

                    const deleteFormApi = `http://localhost:9090/deleteFormByFormId/${formId}`;

                    fetch(deleteFormApi,{
                        method:"PUT"
                    })
                    .then(response=>{
                        if(!response.ok){
                            throw new Error("network response was not ok");
                        }
                        return response.text();
                    })
                    .then(deleteFormResponse=>{
                        toastr.success(deleteFormResponse);
                        addFormToTable();
                    })
                    .catch(error=>{
                        console.log("error:- ",error);
                    })
                }
            },
            cancel: {
                btnClass: 'btn-secondary btn-min-width',
                action: function() {
                }
            },

        }
    });

}

function addFormToTable(){

    const selectFormApi = "http://localhost:9090/selectFormField";

    fetch(selectFormApi)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok! while calling selectFormField Api")
        }
        return response.json();
    })
    .then(formDataResponse=>{        

        let formData = $("#form_datatable").DataTable();

        formData.clear().draw();

        formDataResponse.forEach((FormData)=>{

            if(FormData.activeId != 9){

                formData.row.add([
                    FormData.formId,
                    FormData.title,
                    Boolean(FormData.activeId),
                    `<td class="text-center">
                    
                        <a id=${FormData.formId} href="javascript:void(0)" data-toggle="tooltip"
                            onClick="editForm(${FormData.formId})"
                        data-placement="bottom" title="" data-original-title="Edit"
                        class="text-success fa-size client_add_btn"><i
                            class="fa fa-pencil"></i></a>

                        <span data-toggle="modal" data-target="#all_question_preview"><a id=${FormData.formId}
                            onClick="previewForm(${FormData.formId})"
                            href="javascript:void(0)" data-toggle="tooltip"
                            data-placement="bottom" title=""
                            data-original-title="Preview"
                            class="text-info fa-size"><i
                                class="fa fa-eye"></i></a></span>

                        <span class="delete-user-alert"><a href="javascript:void(0)" id=${FormData.formId}
                            onClick="deleteForm(${FormData.formId})"
                            class="text-danger fa-size" data-toggle="tooltip"
                            data-placement="bottom" data-original-title="Delete"><i
                                class="fa fa-trash"></i></a></span>
                            
                    </td>`
                ]).draw();

            }
            
        })

    }).catch(error=>{
        console.log("error: ",error);
    })
}

function previewForm(formId){

    const FormDataById = `http://localhost:9090/select_Form_Que_Opt_ById/${formId}`;

    fetch(FormDataById)
    .then(response=>{
        if(!response.ok){
            throw new error("network response was not ok.")
        }
        return response.json();
    })
    .then(formData=>{        
        
        $("#preview_body div").remove();

        let formDetails = `
        
        <div id="${formData.formData.formId}" class="detailsbg">
                <div class="row pr-2 pl-2">
                    <div class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                        <p class="mb-1 font-weight-600"><span class="font-weight-700">Form Title:</span>
                            <span>
                                ${formData.formData.title}
                            </span>
                        </p>
                            <p class="mb-0 font-weight-600"><span class="font-weight-700">Description:</span>
                                <span>
                                        ${formData.formData.text}
                                </span>
                            </p>
                    </div>
                </div>
        </div>`;

        $("#preview_body").append(formDetails);
        
        for(let i=0; i<formData.queData.length; i++){

            let isAnswerRequired = formData.queData[i].isAnswerRequired == 1 ? "*":"";

            switch(formData.queData[i].ansTypeId){

                case 1:

                let queDetails1 =`
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow">
                                <div class="card-body">
                                    <div class="row pl-2 pr-2">
                                        <div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
                                            <span class="question">Q : ${i+1}</span>
                                        </div>
        
                                        <div class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
        
                                            <div class="form-group mb-0 text-justify">
        
                                                <p class="font-weight-700 mb-1 text-justify">
                                                <span class="text-danger">
                                                ${isAnswerRequired}
                                                </span>
                                                    ${formData.queData[i].queLabel}
                                                </p>
                                                <p class="mb-1">${formData.queData[i].queDescription}</p>
                                            </div>                                    
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                $("#preview_body").append(queDetails1);

                break;

                case 2:

                let queDetails2_1 =`
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo">
                            <div class="card-body">
                                <div class="row pl-2 pr-2">
                                    <div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
                                        <span class="question">Q : ${i+1}</span>
                                    </div>
    
                                    <div class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
    
                                        <div class="form-group mb-0 text-justify">
    
                                            <p class="font-weight-700 mb-1 text-justify">
                                            <span class="text-danger">
                                            ${isAnswerRequired}
                                            </span>
                                                ${formData.queData[i].queLabel}
                                            </p>
                                            <p class="mb-1">${formData.queData[i].queDescription}</p>
                                        </div>

                                        <div class="form-group mb-0">
                                            <div class="row pl-2 pr-2">`;


                let queDetails2_2 =""; 

                formData.optionData.forEach(eachOption=>{

                    if(eachOption.queId == formData.queData[i].queId){

                        
                        queDetails2_2 = queDetails2_2 + `
                        
                        <div class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="O${eachOption.optionsId}" name="${eachOption.queId}"
                                    class="custom-control-input">
                                <label class="custom-control-label font-weight-300 m-t-5"
                                    for="O${eachOption.optionsId}">${eachOption.optionsValue}</label>
                            </div>
                        </div>            

                        `;

                    }

                })


                let queDetails2_3 = `</div>
                </div>
                </div>
                </div>
                </div>
                </div>`

                $("#preview_body").append(queDetails2_1+queDetails2_2+queDetails2_3);
                break;
            
                case 3:

                let queDetails3_1 =`
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo">
                            <div class="card-body">
                                <div class="row pl-2 pr-2">
                                    <div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
                                        <span class="question">Q : ${i+1}</span>
                                    </div>
    
                                    <div class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
    
                                        <div class="form-group mb-0 text-justify">
    
                                            <p class="font-weight-700 mb-1 text-justify">
                                            <span class="text-danger">
                                            ${isAnswerRequired}
                                            </span>
                                                ${formData.queData[i].queLabel}
                                            </p>
                                            <p class="mb-1">${formData.queData[i].queDescription}</p>
                                        </div>

                                        <div class="form-group mb-0">
                                            <div class="row pl-2 pr-2">`;                
                
                let queDetails3_2 ="";

                formData.optionData.forEach(eachOption=>{

                    if(eachOption.queId == formData.queData[i].queId){

                        
                        queDetails3_2 = queDetails3_2 +                        
                        `<div class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
                            <div class="custom-control custom-checkbox displayblock">
                                <input type="checkbox" class="custom-control-input"
                                    id="O${eachOption.optionsId}">
                                <label class="custom-control-label font-weight-300 m-t-5"
                                    for="O${eachOption.optionsId}">${eachOption.optionsValue}</label>
                            </div>
                        </div>`; 

                    }

                })

                let queDetails3_3 = `</div>
                </div>
                </div>
                </div>
                </div>
                </div>`;

                $("#preview_body").append(queDetails3_1+queDetails3_2+queDetails3_3);
                break;

                cas
            
                case 4:

                let queDetails4 =`
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo">
                            <div class="card-body">
                                <div class="row pl-2 pr-2">
                                    <div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
                                        <span class="question">Q : ${i+1}</span>
                                    </div>
    
                                    <div class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
    
                                        <div class="form-group mb-0 text-justify">
    
                                            <p class="font-weight-700 mb-1 text-justify">
                                            <span class="text-danger">
                                            ${isAnswerRequired}
                                            </span>
                                                ${formData.queData[i].queLabel}
                                            </p>
                                            <p class="mb-1">${formData.queData[i].queDescription}</p>
                                        </div>

                                        <div class="form-group mb-0">
                                            <div class="row pl-2 pr-2">          
                                                    <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                                                        <input type="text" class="form-control" placeholder="Enter Your Answer">
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                 </div>`;

                $("#preview_body").append(queDetails4);
                break;
            
                case 5:

                let queDetails5 =`
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo">
                            <div class="card-body">
                                <div class="row pl-2 pr-2">
                                    <div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
                                        <span class="question">Q : ${i+1}</span>
                                    </div>
    
                                    <div class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
    
                                        <div class="form-group mb-0 text-justify">
    
                                            <p class="font-weight-700 mb-1 text-justify">
                                            <span class="text-danger">
                                            ${isAnswerRequired}
                                            </span>
                                                ${formData.queData[i].queLabel}
                                            </p>
                                            <p class="mb-1">${formData.queData[i].queDescription}</p>
                                        </div>

                                        <div class="form-group mb-0">
                                            <div class="row pl-2 pr-2">          
                                                    <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                                                    <textarea class="form-control textareasize"
                                                    placeholder="Enter Your Answer"></textarea>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                 </div>`;

                $("#preview_body").append(queDetails5);
                break;
            
                case 6:

                let queDetails6_1 =`
                
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo">
                        <div class="card-body">
                            <div class="row pl-2 pr-2">
                                <div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
                                    <span class="question">Q : ${i+1}</span>
                                </div>

                                <div class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
                                    <div class="form-group mb-0">
                                        <p class="font-weight-700 mb-1 text-justify">
                                        <span class="text-danger">
                                            ${isAnswerRequired}
                                            </span>
                                        ${formData.queData[i].queLabel}
                                        </p>
                                        <p class="mb-1 text-justify">${formData.queData[i].queDescription}</p>
                                    </div>

                                    <div class="form-group mb-0">
                                        <div class="row pl-2 pr-2">
                                            <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                                                <select class="selectpicker" data-style="lineheight12 bg-transfer"
                                                    data-live-search="true" data-title="Select Choice">`;

                let queDetails6_2 ="";

                formData.optionData.forEach(eachOption=>{

                    if(eachOption.queId == formData.queData[i].queId){
                        
                        queDetails6_2 = queDetails6_2 +                        
                        `<option id="O${eachOption.optionsId}">${eachOption.optionsValue}</option>`; 

                    }

                })


                let queDetails6_3 =
                                                `</select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                
                $("#preview_body").append(queDetails6_1+queDetails6_2+queDetails6_3);
                $(".selectpicker").selectpicker("refresh");
                break; 
            
                case 7:

                let queDetails7_1 =`
                
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo">
                        <div class="card-body">
                            <div class="row pl-2 pr-2">
                                <div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
                                    <span class="question">Q : ${i+1}</span>
                                </div>

                                <div class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
                                    <div class="form-group mb-0">
                                        <p class="font-weight-700 mb-1 text-justify">
                                        <span class="text-danger">
                                            ${isAnswerRequired}
                                            </span>
                                        ${formData.queData[i].queLabel}
                                        </p>
                                        <p class="mb-1 text-justify">${formData.queData[i].queDescription}</p>
                                    </div>

                                    <div class="form-group mb-0">
                                        <div class="row pl-2 pr-2">
                                            <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">

                                            <select class="selectpicker" multiple data-selected-text-format="count"
                                            data-style="btn-light bg-transfer" data-actions-box="true" data-title="Select Choice">`;

                let queDetails7_2 ="";

                formData.optionData.forEach(eachOption=>{

                    if(eachOption.queId == formData.queData[i].queId){
                        
                        queDetails7_2 = queDetails7_2 +                        
                        `<option id="O${eachOption.optionsId}">${eachOption.optionsValue}</option>`; 

                    }

                })


                let queDetails7_3 =
                                                `</select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                
                $("#preview_body").append(queDetails7_1+queDetails7_2+queDetails7_3);
                $(".selectpicker").selectpicker("refresh");
                break; 
            
                case 8:

                    let queDetails8 =`                    
                    
                    
                    <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo">
                        <div class="card-body">
                            <div class="row pl-2 pr-2">
                                <div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
                                    <span class="question">Q : ${i+1}</span>
                                </div>

                                <div class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
                                    <div class="form-group mb-0">
                                        <p class="font-weight-700 mb-1 text-justify">
                                        <span class="text-danger">
                                            ${isAnswerRequired}
                                            </span>
                                        ${formData.queData[i].queLabel}</p>
                                        <p class="mb-1 text-justify">${formData.queData[i].queDescription}</p>
                                    </div>

                                    <div class="form-group mb-0">
                                        <div class="row pl-2 pr-2">
                                            <div class="col-xl-3 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                                                <div id="${formData.queData[i].queId}" class="input-group date">
                                                    <input type="text" class="form-control my_date_picker" placeholder="dd/mm/yyyy"
                                                        id="allpreview_date">
                                                    <span class="input-group-addon inputgroups">
                                                        <i class="mdi mdi-calendar"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                $("#preview_body").append(queDetails8);
                break;
            }

        }

        $('.my_date_picker').closest('div').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: "dd/mm/yyyy",
            clearBtn: true
        });

    })
    .catch(error=>{
        console.log("error:- ",error);
    });   
}

function singleChoiceRemoveAndAppend(){

    $("#singleChoice input[type='text']").val('');
    $("#singleChoice tbody tr").remove();
    $("#singleChoice tbody").append(`
                                <tr>
                                    <td class="text-center border-0" width="5%">
                                        <i class="fa fa-arrow-right"></i>
                                    </td>
                                    <td class="border-0 p-1">
                                        <div class="form-group mb-0">
                                            <input oninput="inputChar(this)" option_id = '-1' type="text" class="form-control"
                                                placeholder="Enter an answer choice in English">
                                        </div>
                                    </td>

                                    <td class="text-center border-0 p-0" width="3%">
                                        <a href="javascript:void(0)" class="singlechoiceadd">
                                            <i class="fa fa-plus-square-o font_20 m-t-5 text-default"></i>
                                        </a>
                                    </td>

                                    <td class="text-center border-0 p-0" width="3%">
                                        <a href="javascript:void(0)" class="">
                                            <i class="fa fa-minus-square-o font_20 m-t-5 text-default"></i>
                                        </a>
                                    </td>
                                </tr> 
`);

    $("#singleChoice").selectpicker("refresh");
    $(".singlechoicedata").hide();
}

function multiChoiceRemoveAndAppend(){

    $("#multiChoice input[type='text']").val('');
    $("#multiChoice tbody tr").remove();
    $("#multiChoice tbody").append(`
                                <tr>
                                <td class="text-center border-0" width="5%">
                                    <i class="fa fa-arrow-right"></i>
                                </td>
                                <td class="border-0 p-1">
                                    <div class="form-group mb-0">
                                        <input oninput="inputChar(this)" option_id = '-1' type="text" class="form-control"
                                            placeholder="Enter an answer choice in English">
                                    </div>
                                </td>
                            
                                <td class="text-center border-0 p-0" width="3%">
                                    <a href="javascript:void(0)" class="multichoiceadd">
                                        <i class="fa fa-plus-square-o font_20 m-t-5 text-default"></i>
                                    </a>
                                </td>
                                <td class="text-center border-0 p-0" width="3%">
                                    <a href="javascript:void(0)" class="">
                                        <i class="fa fa-minus-square-o font_20 m-t-5 text-default"></i>
                                    </a>
                                </td>
                            </tr>
`);

    $("#multiChoice").selectpicker("refresh");
    $(".multichoicedata").hide();
}

function singleSelectRemoveAndAppend(){

    $("#singleSelect input[type='text']").val('');
    $("#singleSelect tbody tr").remove();
    $("#singleSelect tbody").append(`
                                    <tr>
                                        <td class="text-center border-0" width="5%">
                                            <i class="fa fa-arrow-right"></i>
                                        </td>
                                        <td class="border-0 p-1">
                                            <div class="form-group mb-0">
                                                <input oninput="inputChar(this)" option_id = '-1' type="text" class="form-control"
                                                    placeholder="Enter an answer choice in English">
                                            </div>
                                        </td>
                                        
                                        <td class="text-center border-0 p-0" width="3%">
                                            <a href="javascript:void(0)" class="singleselectadd">
                                                <i class="fa fa-plus-square-o font_20 m-t-5 text-default"></i>
                                            </a>
                                        </td>
                                        <td class="text-center border-0 p-0" width="3%">
                                            <a href="javascript:void(0)" class="">
                                                <i class="fa fa-minus-square-o font_20 m-t-5 text-default"></i>
                                            </a>
                                        </td>
                                    </tr>
`);

    $("#singleSelect").selectpicker("refresh");
    $(".singleselectdata").hide();
}

function multiSelectRemoveAndAppend(){

    $("#multiSelect input[type='text']").val('');
    $("#multiSelect tbody tr").remove();
    $("#multiSelect tbody").append(`
                                    <tr>
                                        <td class="text-center border-0" width="5%">
                                            <i class="fa fa-arrow-right"></i>
                                        </td>
                                        <td class="border-0 p-1">
                                            <div class="form-group mb-0">
                                                <input oninput="inputChar(this)" option_id = '-1' type="text" class="form-control"
                                                    placeholder="Enter an answer choice in English">
                                            </div>
                                        </td>
                                        
                                        <td class="text-center border-0 p-0" width="3%">
                                            <a href="javascript:void(0)" class="multiselectadd">
                                                <i class="fa fa-plus-square-o font_20 m-t-5 text-default"></i>
                                            </a>
                                        </td>
                                        <td class="text-center border-0 p-0" width="3%">
                                            <a href="javascript:void(0)" class="">
                                                <i class="fa fa-minus-square-o font_20 m-t-5 text-default"></i>
                                            </a>
                                        </td>
                                    </tr>
`);

    $("#multiSelect").selectpicker("refresh");
    $(".multiselectdata").hide();
}

function addSingleChoice(optionsValue,optionId){

    $("#singleChoice tbody").append(`
                                <tr>
                                    <td class="text-center border-0" width="5%">
                                        <i class="fa fa-arrow-right"></i>
                                    </td>
                                    <td class="border-0 p-1">
                                        <div class="form-group mb-0">
                                            <input oninput="inputChar(this)" option_id = "${optionId}" value="${optionsValue}" type="text" class="form-control"
                                                placeholder="Enter an answer choice in English">
                                        </div>
                                    </td>

                                    <td class="text-center border-0 p-0" width="3%">
                                        <a href="javascript:void(0)" class="singlechoiceadd">
                                            <i class="fa fa-plus-square-o font_20 m-t-5 text-default"></i>
                                        </a>
                                    </td>
                                    <td class="text-center border-0 p-0" width="3%">
                                        <a href="javascript:void(0)" class="singlechoiceremove">
                                            <i class="fa fa-minus-square-o font_20 m-t-5 text-default"></i>
                                        </a>
                                    </td>
                                </tr>
    `);
    $("#singleChoice").selectpicker("refresh");
    $(".singlechoicedata").show();
}

function addMultiChoice(optionsValue,optionId){

    $("#multiChoice tbody").append(`        
    <tr>
        <td class="text-center border-0" width="5%">
            <i class="fa fa-arrow-right"></i>
        </td>
        <td class="border-0 p-1">
            <div class="form-group mb-0">
                <input oninput="inputChar(this)" option_id = "${optionId}" type="text" value="${optionsValue}" class="form-control"
                    placeholder="Enter an answer choice in English">
            </div>
        </td>

        <td class="text-center border-0 p-0" width="3%">
            <a href="javascript:void(0)" class="multichoiceadd">
                <i class="fa fa-plus-square-o font_20 m-t-5 text-default"></i>
            </a>
        </td>
        <td class="text-center border-0 p-0" width="3%">
            <a href="javascript:void(0)" class="multichoiceremove">
                <i class="fa fa-minus-square-o font_20 m-t-5 text-default"></i>
            </a>
        </td>
    </tr>
    `);
    $("#multiChoice").selectpicker("refresh");
    $(".multichoicedata").show();
}

function addSingleSelect(optionsValue,optionId){

    $("#singleSelect tbody").append(`        
    
    <tr>
        <td class="text-center border-0" width="5%">
            <i class="fa fa-arrow-right"></i>
        </td>
        <td class="border-0 p-1">
            <div class="form-group mb-0">
                <input oninput="inputChar(this)" option_id = "${optionId}" type="text" value = "${optionsValue}" class="form-control"
                    placeholder="Enter an answer choice in English">
            </div>
        </td>
        
        <td class="text-center border-0 p-0" width="3%">
            <a href="javascript:void(0)" class="singleselectadd">
                <i class="fa fa-plus-square-o font_20 m-t-5 text-default"></i>
            </a>
        </td>
        <td class="text-center border-0 p-0" width="3%">
            <a href="javascript:void(0)" class="singleselectremove">
                <i class="fa fa-minus-square-o font_20 m-t-5 text-default"></i>
            </a>
        </td>
    </tr>

    `);
    $("#singleSelect").selectpicker("refresh");
    $(".singleselectdata").show();
}

function addMultiSelect(optionsValue,optionId){
    
    $("#multiSelect tbody").append(`        
    
    <tr>
        <td class="text-center border-0" width="5%">
            <i class="fa fa-arrow-right"></i>
        </td>
        <td class="border-0 p-1">
            <div class="form-group mb-0">
                <input oninput="inputChar(this)" option_id = "${optionId}" type="text" class="form-control" value = "${optionsValue}"
                    placeholder="Enter an answer choice in English">
            </div>
        </td>
        
        <td class="text-center border-0 p-0" width="3%">
            <a href="javascript:void(0)" class="multiselectadd">
                <i class="fa fa-plus-square-o font_20 m-t-5 text-default"></i>
            </a>
        </td>
        <td class="text-center border-0 p-0" width="3%">
            <a href="javascript:void(0)" class="multiselectremove">
                <i class="fa fa-minus-square-o font_20 m-t-5 text-default"></i>
            </a>
        </td>
    </tr>
    `);
    $("#multiSelect").selectpicker("refresh");
    $(".multiselectdata").show();
}

function questionValidate(que_Label,que_Name,ans_Type_Id,validate_Answer,validate_Type_Id){

    if(que_Label.trim() == ""){
        toastr.error("Question lable is required.")
        return false;
    }else if(que_Name.trim() == ""){
        toastr.error("Question name is required.")
        return false;
    }else if(ans_Type_Id == undefined || ans_Type_Id == 0){
        toastr.error("Answer Type is required.")
        return false;
    }

    //option validate
    if(ans_Type_Id == 2){
        let singleChoiceData =  $("#singleChoice input[type='text']");
    
        for(let i=0; i<singleChoiceData.length; i++){
            if(singleChoiceData[i].value.trim() == ""){
                toastr.error("please fill the input field.");
                return false;
            }
        }
    }
    else if(ans_Type_Id == 3){

        let multiChoiceData =  $("#multiChoice input[type='text']");
    
        for(let i=0; i<multiChoiceData.length; i++){
            if(multiChoiceData[i].value.trim() == ""){
                toastr.error("please fill the input field.");
                return false;
            }
        }
    }
    else if(ans_Type_Id == 4 || ans_Type_Id == 5){

        if(validate_Answer == 1){        
            if(validate_Type_Id == undefined){                
                toastr.error("please select validation type.");
                return false
            }
        }

    }
    else if(ans_Type_Id == 6){
        let isError = false;
        let singleSelectData =  $("#singleSelect input[type='text']");
    
        for(let i=0; i<singleSelectData.length; i++){
            if(singleSelectData[i].value.trim() == ""){
                toastr.error("please fill the input field.");
                return false;
            }
        }
    }
    else if(ans_Type_Id == 7){
        let isError = false;
        let multiSelectData =  $("#multiSelect input[type='text']");
    
        for(let i=0; i<multiSelectData.length; i++){
            if(multiSelectData[i].value.trim() == ""){
                toastr.error("please fill the input field.");
                return false;
            }
        }
    }

    return true;
}

function formValidation(titleText,aliasName,module,characteristic,subCharacteristic,recurrence,startMonth,compliancePeriod,effectiveDate,text){

    if(titleText.trim() == ""){
        toastr.error("please select the Form Title");
        return false;
    }
    else if(aliasName.trim() == ""){
        toastr.error("please select the Alias Name");
        return false;
    }
    else if(module == undefined){
        toastr.error("please select the Module");
        return false;
    }
    else if(characteristic == undefined){
        toastr.error("please select the characteristic");
        return false;
    }
    else if(subCharacteristic == undefined){
        toastr.error("please select the Sub Characteristic");
        return false;
    }
    else if(recurrence == undefined){
        toastr.error("please select the Recurrence");
        return false;
    }
    else if(startMonth == undefined){
        toastr.error("please select the Start Month");
        return false;
    }
    else if(compliancePeriod == ""){
        toastr.error("please select the Compliance Period");
        return false;
    }
    else if(compliancePeriod <= 0){
        toastr.error("please select Poisive Number in Compliance Period");
        return false;
    }
    else if(effectiveDate == ""){
        toastr.error("please select the Effective Date");
        return false;
    }
    else if(text.trim() == ""){
        toastr.error("please select the Text");
        return false;
    }

    return true;
}

function moduleAppend(){

    let api = `http://localhost:9090/module`;

    fetch(api)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok!");
        }
        return response.json();
    })
    .then(moduleData=>{

        $("#module").empty();
        // $("#module").append('<option value="" selected="selected">Select</option>');
        
        for(let key in moduleData){

            let moduleId = moduleData[key].moduleId;
            let moduleName = moduleData[key].moduleName;

            let option = `<option id="${moduleId}">${moduleName}</option>`;
            $("#module").append(option);
            $("#module").selectpicker('refresh');
        }
    })
    .catch(error=>{
        console.log("error:- ",error);
    })

}

async function characteristicAppend(){

    let moduleId = $("#module :selected").attr('id');

    let api = `http://localhost:9090/characteristics/${moduleId}`;

    try{
        const response = await fetch(api);

        if(!response.ok){
            throw new Error("network response was not ok!");
        }

        const characteristicData = await response.json();

        $("#Characteristic").empty();
        
        for(let key in characteristicData){

            let characteristicId = characteristicData[key].characteristicId;
            let characteristicName = characteristicData[key].characteristicName;

            let option = `<option id="${characteristicId}">${characteristicName}</option>`;
            $("#Characteristic").append(option);
            $("#Characteristic").selectpicker('refresh');
        }

        console.log("b");

    }catch(error){
        console.log("error:- ", error);
    }

}

async function subCharacteristicAppend(){
    
    let CharacteristicId = $("#Characteristic :selected").attr('id');

    let api = `http://localhost:9090/SubCharacteristics/${CharacteristicId}`;

    try{
        const response = await fetch(api);
    
        if(!response.ok){
            throw new Error("network response was not ok!");
        }

        const subCharacteristicData = await response.json();

        $("#subCharacteristic").empty();
        
        for(let key in subCharacteristicData){

            let subCharacteristicId = subCharacteristicData[key].subCharacteristicId;
            let subCharacteristicName = subCharacteristicData[key].subCharacteristicName;

            let option = `<option id="${subCharacteristicId}">${subCharacteristicName}</option>`;
            $("#subCharacteristic").append(option);
            $("#subCharacteristic").selectpicker('refresh');
        }

    }catch(error){
        console.log("error:- ",error);
    }    
}

function RecurranceAppend(){

    let api = `http://localhost:9090/Recurrence`;

    fetch(api)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok!");
        }
        return response.json();
    })
    .then(RecurrenceData=>{

        $("#Recurrence").empty();
        // $("#Recurrence").append('<option value="" selected="selected">Select</option>');
        
        for(let key in RecurrenceData){

            let RecurrenceId = RecurrenceData[key].recurrenceId;
            let RecurrenceName = RecurrenceData[key].recurrenceName ;

            let option = `<option id="${RecurrenceId}">${RecurrenceName}</option>`;
            $("#Recurrence").append(option);
            $("#Recurrence").selectpicker('refresh');
        }
    })
    .catch(error=>{
        console.log("error:- ",error);
    })
}

function MonthAppend(){

    let api = `http://localhost:9090/Month`;

    fetch(api)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok!");
        }
        return response.json();
    })
    .then(MonthData=>{

        $("#Month").empty();
        // $("#Month").append('<option value="" selected="selected">Select</option>');
        
        for(let key in MonthData){

            let monthId = MonthData[key].monthId;
            let monthName = MonthData[key].monthName;

            let option = `<option id="${monthId}">${monthName}</option>`;
            $("#Month").append(option);
            $("#Month").selectpicker('refresh');
        }
    })
    .catch(error=>{
        console.log("error:- ",error);
    })
}

function AnsTypeAppend(){

    let api = `http://localhost:9090/AnswerType`;

    fetch(api)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok!");
        }
        return response.json();
    })
    .then(AnswerTypeData=>{

        $("#ansType").empty();
        $("#ansType").append('<option id="0" value="" selected="selected">Select</option>');
        
        for(let key in AnswerTypeData){

            let answerTypeId = AnswerTypeData[key].answerTypeId;
            let answerTypeName = AnswerTypeData[key].answerTypeName;

            let option = `<option id="${answerTypeId}" value="">${answerTypeName}</option>`;
            $("#ansType").append(option);
            $("#ansType").selectpicker('refresh');
        }
    })
    .catch(error=>{
        console.log("error:- ",error);
    })
}


//oninput regex for allow only char.
function inputChar(obj) {
    obj.value = obj.value?.replace(/[^a-z A-Z]/,'');
}

//oninput for contact

function validateContact(input) {

    input.value = input.value.replace(/\D/g, '');
    
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}