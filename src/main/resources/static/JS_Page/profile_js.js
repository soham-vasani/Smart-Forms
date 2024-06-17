$(function(){
    userDetail();
})

function userDetail(){


    let userId = localStorage.getItem("uId");
    const userDateApi = `/findUserById/${userId}`;

    fetch(userDateApi)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok!");
        }

        return response.json();

    })
    .then(userDataResponse=>{

        $("#userProfie").attr("src",`http://localhost:9090/UImg/${userDataResponse.imagePath}`);
        $("#userName").text(userDataResponse.firstName," ",userDataResponse.lastName);
        $("#userRole1").text(userDataResponse.role);
        $("#userEmail1").text(userDataResponse.email);
        $("#userContact1").text(userDataResponse.contactNo);

        $("#userEmail2").text(userDataResponse.email);
        $("#userContact2").text(userDataResponse.contactNo);
        $("#userGender").text(userDataResponse.gender);
        $("#validTo").text(userDataResponse.validTo);
        $("#validFrom").text(userDataResponse.validFrom);
        $("#userRole2").text(userDataResponse.role);
    })
    .catch(error=>{
        console.log("error:- ",error);
    })
}

function imageUpdate(){

}