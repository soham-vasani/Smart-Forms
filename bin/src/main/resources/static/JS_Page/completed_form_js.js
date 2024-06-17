$(function(){
    completedForm();
})

function completedForm(){
    
    let userId = 1;
    
    const completedFormApi = `http://localhost:9090/getSubmittedForm/${userId}`;

    fetch(completedFormApi)
    .then(Response=>{
        if(!Response.ok){
            throw new Error("network response was not ok.");
        }

        return Response.json();
    })
    .then(submitedFormData=>{
        console.log(submitedFormData);
    })
    .catch(error=>{
        console.log("error:- ",error);
    })
}