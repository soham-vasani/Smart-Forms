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

$(function(){
    getFormData();
})


function getFormData(){

    let userId = 1;
    const formDataApi = `http://localhost:9090/getUnSubmittedForm/${userId}`;

    fetch(formDataApi)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok!");
        }
        return response.json();
    })
    .then(formData=>{
        $("#formList").empty();

        formData.forEach((eachForm)=>{
            $("#formList").append(`<option id="${eachForm.formId}">${eachForm.formId} - ${eachForm.title}</option>`);
        })        

        $("#formList").selectpicker("refresh");
    })
    .catch(error=>{
        console.log("error:- ",error);
    })
}

function fillForm(){

    let selectedFormId = $("#formList :selected").attr("id");

    if(selectedFormId != undefined){        
        previewForm(selectedFormId);
        $('#fillFormModel').show();
        $("#resetBtn").show();
        resetBtn.show
    }else{
        toastr.error("Please select the Form First.");
        $('#fillFormModel').hide();
    }

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

        
        $("#form_fill_body div").remove();

        let formDetails = `
        
        <div class="detailsbg">
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

        $("#form_fill_body").append(formDetails);
        
        for(let i=0; i<formData.queData.length; i++){


            let isAnswerRequired = formData.queData[i].isAnswerRequired == 1 ? "*":"";            

            switch(formData.queData[i].ansTypeId){

                case 1:

                let queDetails1 =`
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow" answer-type="1" answer-required="${formData.queData[i].isAnswerRequired}">
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

                $("#form_fill_body").append(queDetails1);

                break;

                case 2:

                let queDetails2_1 =`
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo" answer-type="2" answer-required="${formData.queData[i].isAnswerRequired}">
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

                $("#form_fill_body").append(queDetails2_1+queDetails2_2+queDetails2_3);
                break;
            
                case 3:

                let queDetails3_1 =`
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo"  answer-type="3" answer-required="${formData.queData[i].isAnswerRequired}">
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

                $("#form_fill_body").append(queDetails3_1+queDetails3_2+queDetails3_3);
                break;

                cas
            
                case 4:

                let queDetails4 =`
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo" answer-type="4" answer-required="${formData.queData[i].isAnswerRequired}">
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

                $("#form_fill_body").append(queDetails4);
                break;
            
                case 5:

                let queDetails5 =`
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo" answer-type="5" answer-required="${formData.queData[i].isAnswerRequired}">
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

                $("#form_fill_body").append(queDetails5);
                break;
            
                case 6:

                let queDetails6_1 =`
                
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo" answer-type="6" answer-required="${formData.queData[i].isAnswerRequired}">
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

                $("#form_fill_body").append(queDetails6_1+queDetails6_2+queDetails6_3);
                $(".selectpicker").selectpicker("refresh");
                break; 
            
                case 7:

                let queDetails7_1 =`
                
                <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo" answer-type="7" answer-required="${formData.queData[i].isAnswerRequired}">
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

                
                $("#form_fill_body").append(queDetails7_1+queDetails7_2+queDetails7_3);
                $(".selectpicker").selectpicker("refresh");
                break; 
            
                case 8:

                    let queDetails8 =`                    
                    
                    <div id="${formData.queData[i].queId}" class="card mb-2 queshadow queInfo" answer-type="8" answer-required="${formData.queData[i].isAnswerRequired}">
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
                                                <div id="${formData.queData[i].queId}" name="queDate" class="input-group date">
                                                    <input type="text" class="form-control" placeholder="dd/mm/yyyy"
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
                $("#form_fill_body").append(queDetails8);
                break;
            }

        }

        let formBtn=`
        
        <div class="card mb-0 queshadow">
            <div class="card-body">
                <div class="row pl-2 pr-2 text-center">
                    <div class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                        <a onclick="saveFilledForm(${formData.formData.formId})" class="btn btn-success btn-padding mr-2"><i
                            class="fa fa-floppy-o mr-2"></i>Submit</a>
                        <a style="display:none" class="btn btn-success btn-padding mr-2"><i
                                class="fa fa-print mr-2"></i>Print</a>
                        <a onclick="$('#fillFormModel').hide(); $('#resetBtn').hide();" class="btn btn-success btn-padding">
                                <i class="fa fa-times mr-2"></i>Cancel
                              </a>                                                            
                    </div>
                </div>
            </div>
        </div>`;

         $("#form_fill_body").append(formBtn);

        $('#allpreview_date').closest('div').datepicker({
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

function saveFilledForm(fId){

    

    let formResponse = {
        formId: fId,
        userId:1,
        answerResponse: []
    };    

    let formIsValid = true;

    $("#form_fill_body .card").each(function () {

        if (!$(this).attr("answer-type")) {
            return; // Skip processing this card
        }

        let qId = $(this).attr("id");
        let qAnsType = $(this).attr("answer-type");
        let isAnswerRequired = $(this).attr("answer-required") === "1";

        let eachQueResponse = {
            formId:fId,
            userId:1,
            queId:parseInt(qId),
            optionId:[],
            answer:null,
        }

        switch(parseInt(qAnsType)){

            case 1://no answer required                        
            break;

            case 2://single choice.
                let single_choice = $(this).find("input[type='radio']:checked").attr("id");                
                eachQueResponse.optionId = [single_choice];

                if (isAnswerRequired && (single_choice == undefined)) {
                    formIsValid = false;
                }

            break;
            
            case 3://multiple choice.

                let checkboxValues = [];                
                
                $(this).find("input[type='checkbox']:checked").each(function () {
                    checkboxValues.push($(this).attr("id"));
                });

                eachQueResponse.optionId = checkboxValues;

                if (isAnswerRequired && checkboxValues.length === 0) {
                    formIsValid = false;
                }

            break;

            case 4://single textbox.

                let single_textbox = $(this).find("input[type='text']").val();
                eachQueResponse.answer = $(this).find("input[type='text']").val();                
                
                if (isAnswerRequired && (single_textbox == '')) {
                    formIsValid = false;
                }

            break;
        
            case 5://multi textbox.
                let multi_textbox = $(this).find("textarea").val();
                eachQueResponse.answer = $(this).find("textarea").val();            
                
                if (isAnswerRequired && (multi_textbox == '')) {
                    formIsValid = false;
                }
            break;
            
            case 6://single select dropdown.
                let single_select = $(this).find("select option:selected").attr("id");
                eachQueResponse.optionId = [$(this).find("select option:selected").attr("id")];
                
                if (isAnswerRequired && (single_select == undefined)) {
                    formIsValid = false;
                }
            break;

            case 7://multi select dropdown.
                let multiSelectedOption = [];

                $(this).find("select option:selected").each(function(){
                    multiSelectedOption.push($(this).attr("id"));
                });
                
                eachQueResponse.optionId = multiSelectedOption;


                if (isAnswerRequired && multiSelectedOption.length === 0) {
                    formIsValid = false;
                }

            break;

            case 8://date 
                let date = $(this).find("input[type='text']").val();
                eachQueResponse.answer = $(this).find("input[type='text']").val();
                eachQueResponse.optionId = [];
                
                if(isAnswerRequired && (date == '')){
                    formIsValid = false;
                }
            break
        }    

        formResponse.answerResponse.push(eachQueResponse);
    });    

    if (!formIsValid) {
        toastr.error("Please Fill the required questions.");
    } else {


            formResponse.answerResponse.forEach((eachAnswerResponse) => {
                
                // Remove "O" from each optionId
                eachAnswerResponse.optionId = eachAnswerResponse.optionId.map(option => option.replace("O", ""));

                // Convert the optionId array to a string separated by commas
                eachAnswerResponse.optionId = eachAnswerResponse.optionId.join(",");

            });        

        toastr.success("form submitted");

        const fillFormApi = "http://localhost:9090/sendFormData";

        fetch(fillFormApi,{
            method:"POST",
            body:JSON.stringify(formResponse),
            headers:{
                "Content-Type": "application/json",
            }            
        })
        .then(response=>{
            if(!response.ok){
                throw new Error("network response was not ok!");
            }
            return response.text();
        })
        .then(sendFormDataResponse=>{
            
            getFormData();
            $('#fillFormModel').hide();
            $("#resetBtn").hide();
            $("#formList").val([]);
            $("#formList").selectpicker('refresh');

        })
        .catch(error=>{
            console.log("error:- ",error);
        })
    }

}

function resetBtn(){

    //radio btn.
    $("#form_fill_body .card input[type='radio']").prop("checked",false);

    //check box.
    $("#form_fill_body .card input[type='checkbox']").prop("checked",false);

    //single text/date box.
    $("#form_fill_body .card input[type='text']").val("");
    
    //multi text box.
    $("#form_fill_body .card textarea").val("");

    //single/multi select.
    $("#form_fill_body .card select").val([]);
    $("#form_fill_body .card select").selectpicker("refresh");
}

