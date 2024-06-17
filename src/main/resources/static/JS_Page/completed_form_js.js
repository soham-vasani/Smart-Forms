$(function(){
    completedForm();
})

function completedForm(){
    
    let userId = Number(localStorage.getItem("uId"));
    
    const completedFormApi = `http://localhost:9090/getSubmittedForm/${userId}`;

    fetch(completedFormApi)
    .then(Response=>{
        if(!Response.ok){
            throw new Error("network response was not ok.");
        }

        return Response.json();
    })
    .then(submitedFormData=>{        

        let CompletedFormDataTable = $("#form_datatable").DataTable();

        CompletedFormDataTable.clear().draw();

        submitedFormData.forEach((formData)=>{

            CompletedFormDataTable.row.add([
                formData[0],
                formData[2],
                formData[3],
                formData[4],
                ` <span data-toggle="modal" data-target="#all_question_preview">
                    <a onclick="previewCompletedForm(${formData[3]},${formData[1]})" href="javascript:void(0)" data-toggle="tooltip"
                        data-placement="bottom" title=""
                        data-original-title="Preview"
                        class="text-info fa-size">
                        <i class="fa fa-eye"></i>
                    </a>
                </span>`
            ]).draw();
        })

    })
    .catch(error=>{
        console.log("error:- ",error);
    })
}

function previewCompletedForm(formId,userId) {

    // let userId = Number(localStorage.getItem("uId"));

    const FormDataById = `http://localhost:9090/getCompletedFormByFormId?fId=${formId}&uId=${userId}`;

    fetch(FormDataById)
        .then(response => {
            if (!response.ok) {
                throw new Error("response was not ok!");
            }
            return response.json();
        })
        .then(formResponse => {

            console.log(formResponse);

            $("#completeFormBody div").remove();

            let completeDate = `
                <div class="card mb-2 queshadow">
                    <div class="card-body">
                        <div class="row pr-3 pl-3">
                            <div class="col-xl-4 col-lg-4 col-sm-4 colmspadding">
                                <p class="compact mb-1"><span class="font-weight-700">Completed Date</span>
                                    <span class="displayblock font-medium-2">${formResponse.submitOn}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`;

            $("#completeFormBody").append(completeDate);

            let formDetail = `
                <div class="detailsbg">
                    <div class="row pr-2 pl-2">
                        <div class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                            <p class="mb-1 font-weight-600"><span class="font-weight-700">Form Title:</span>
                                <span>${formResponse.formData.title}</span></p>
                            <p class="mb-0 font-weight-600"><span class="font-weight-700">Description:</span>
                                <span>${formResponse.formData.text}</span>
                            </p>
                        </div>
                    </div>
                </div>`;

            $("#completeFormBody").append(formDetail);

            formResponse.queData.forEach((question, index) => {

                let isQueRequired = question.isAnswerRequired == 1 ? "*" : "";

                let answerData = formResponse.answer.find(ans => ans.queId == question.queId);

                
                let answerContent = '';

                if (answerData != null) {

                    //if answer>answer != null
                    if (answerData.answer != null) {

                        answerContent = answerData.answer;

                    } else if (answerData.optionId != null) {

                        console.log(answerData.optionId);

                        let optionIds = answerData.optionId.split(',');

                        let optionValues = optionIds.map(optId => {

                            let option = formResponse.options.find(opt => opt.optionsId == parseInt(optId));

                            return option ? option.optionsValue : '';

                        }).join(', ');
                        
                        answerContent = optionValues;
                    }
                }

                let queData = `
                    <div class="card mb-2 queshadow">
                        <div class="card-body">
                            <div class="row pl-2 pr-2">
                                <div class="col-xl-1 col-lg-1 col-sm-2 colmspadding">
                                    <span class="question">Q : ${index + 1}</span>
                                </div>
                                <div class="col-xl-11 col-lg-11 col-sm-10 colmspadding">
                                    <div class="form-group mb-0 text-justify">
                                        <p class="font-weight-700 mb-1 text-justify">
                                            <span class="text-danger">${isQueRequired}</span>${question.queName}
                                        </p>
                                        <p class="mb-1">${question.queDescription}</p>
                                    </div>
                                    <div class="form-group mb-0">
                                        <div class="row pl-2 pr-2">
                                            <div class="col-xl-12 col-lg-12 col-sm-12 colmspadding">
                                                <p class="font-weight-700 mb-1 text-justify">Answer</p>
                                                <p class="mb-1 text-justify">${answerContent}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                $("#completeFormBody").append(queData);
            });

        })
        .catch(error => {
            console.log("Error:", error);
        });
}
