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
    addUserToTable();
})

function addUserBtn(){
    clearUserData()
    $("a[name='saveUser']").attr("id",0);
    $("#activeBtnDiv").hide();
    $("#active").prop("checked",true);
}

function saveUserBtn(){

    let user_Id = $("a[name='saveUser']").attr("id");
    let active_Id = Number($("#active").is(":checked"));
    let f_Name = $("#fName").val().trim();
    let l_Name = $("#lName").val().trim();
    let email_Id = $("#emailId").val().trim();
    let contact_No = $("#contactNo").val().trim();
    let user_Gender = $("#gender :selected").val();
    let valid_From = $(".validFrom").val();
    let valid_To = $(".validTo").val();
    let user_Role = $("#role :selected").val();
    let user_Img = $("#userImg").prop('files')[0];
    let user_Img_Size;

    if(user_Img != undefined){
        user_Img_Size = $("#userImg").prop('files')[0].size;
    }    

    //valid from.
	let newValidFromDate = convertDDMMYYYYtoYYYYMMDD(valid_From);

	//valid to.
	let newValidToDate = convertDDMMYYYYtoYYYYMMDD(valid_To);

    
    if(validateUserData(user_Id,f_Name,l_Name,email_Id,contact_No,user_Gender,newValidFromDate,newValidToDate,valid_From,valid_To,user_Role,user_Img,user_Img_Size)){                    

        let userData = {
            userId:user_Id,
            activeId:active_Id,
            firstName:f_Name,
            lastName:l_Name,
            email:email_Id,
            contactNo:contact_No,
            gender:user_Gender,
            validFrom:newValidFromDate,
            validTo:newValidToDate,
            role:user_Role,
        };

        const userDataForm = new FormData();

        if(user_Img != undefined){
            userDataForm.append("userData",JSON.stringify(userData));
            userDataForm.append("userImg",user_Img);
        }
        else{
            userDataForm.append("userData",JSON.stringify(userData));
        }

        const insertAndUpdateUserapi = `/addUser`;

        fetch(insertAndUpdateUserapi, {
			method: 'POST',
			body: userDataForm
		})
		.then(response => {
			if (!response.ok) {
				throw new Error("network response was not ok!", response);
			}
			return response.text();
		})
		.then(Uploadstatus => {
            if(Uploadstatus == "User Added."){
                toastr.success(Uploadstatus);

                $("#portfolio_details").show();
                $("#portfolio_add_detail").hide();
            }
            else if(Uploadstatus == "User Exist."){
                toastr.error(Uploadstatus);
                $("#portfolio_details").hide();
                $("#portfolio_add_detail").show();
            }
            else if(Uploadstatus == "User Updated."){
                toastr.success(Uploadstatus);
                $("#portfolio_details").show();
                $("#portfolio_add_detail").hide();
            }
            addUserToTable();
		})
		.catch(error => {
				console.log("error:- ", error);
		})

    }
}

function convertDDMMYYYYtoYYYYMMDD(date) {
    // Split the date by '/'
    let parts = date.split('/');
    
    // Get the day, month, and year
    let dd = parts[0];
    let mm = parts[1];
    let yyyy = parts[2];
    
    // Return the date in yyyy-mm-dd format
    return `${yyyy}-${mm}-${dd}`;
}

function convertYYYYMMDDtoDDMMYYYY(date) {
    // Split the date by '-'
    let parts = date.split('-');
    
    // Get the year, month, and day
    let yyyy = parts[0];
    let mm = parts[1];
    let dd = parts[2];
    
    // Return the date in dd/mm/yyyy format
    return `${dd}/${mm}/${yyyy}`;
}


function validateUserData(user_Id,f_Name,l_Name,email_Id,contact_No,user_Gender,newValidFromDate,newValidToDate,valid_From,valid_To,user_Role,user_Img,user_Img_Size){

    let emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(f_Name == ''){
        toastr.error("please select the first name.");
        return false;
    }else if(l_Name == ''){
        toastr.error("please select the last name.");
        return false;
    }else if(!emailRegEx.test(email_Id)){
        toastr.error("please enter valid email.");
        return false;
    }else if(contact_No.length < 10){
        toastr.error("length of contect number must be 10 digit.");
        return false;
    }else if(user_Gender == ''){
        toastr.error("please select gender.");
        return false;
    }else if (valid_From == '' || valid_To == '') {
		toastr.error("please selct the date.");
		return false;
	}
    else if (newValidFromDate > newValidToDate) {
		toastr.error("valid-from date is must be less then valid-to date");
		return false;
	}else if(user_Role == '' || user_Role == undefined){
        toastr.error("please select user role");
		return false;
    }else if (user_Img == undefined) {

		if (user_Id != 0) {
			return true;
		} else {        
			toastr.error("please select the user image.");
			return false;
		}

	}else if (user_Img_Size > 2097152) {
        /*2097152 = 2Mb*/
        toastr.error("Maximum Image size is : 2 MB");
        return false;
    }

    return true;    
}

function addUserToTable(){

    const getUserDataApi = "/getActiveUserData";

    fetch(getUserDataApi)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok!");
        }
        return response.json();
    })
    .then(UserData=>{

        let userDataTable = $("#users_datatable").DataTable();

        userDataTable.clear().draw();

        UserData.forEach((eachUser) => {
    
            let activeStatus = eachUser.activeId == 1 ? "Yes" : "No";
            
            userDataTable.row.add([

                eachUser.userId,

                `<h2 class="table-avatar">
                    <a href="javascript:void(0)" data-toggle="popover" data-trigger="hover" data-html="true" data-placement="right" data-template="<div class=&quot;popover fade bs-popover-right&quot; role=&quot;tooltip&quot; x-placement=&quot;right&quot;><div class=&quot;arrow&quot;></div><h3 class=&quot;popover-header p-0 border_radius6&quot;></h3></div>" data-title="<img src='UImg/${eachUser.imagePath}' width='150' height='150' class='border_radius6'>" data-original-title="" title="">
                        <img src="http://localhost:9090/UImg/${eachUser.imagePath}" alt="" class="img-radius avatar">
                    </a>
                    <span>${eachUser.firstName}</span>
                </h2>`,                

                eachUser.email,
                eachUser.contactNo,
                eachUser.validFrom,
                eachUser.validTo,
                eachUser.gender,
                eachUser.role,
                activeStatus,
                `<a onclick="editUser(${eachUser.userId})" href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" data-original-title="Edit" class="text-success fa-size client_add_btn"><i class="fa fa-pencil"></i></a>

                <span class="delete-user-alert"><a onclick="deleteUser(${eachUser.userId})" href="javascript:void(0)" class="text-danger fa-size" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete"><i class="fa fa-trash"></i></a></span>`

            ]).draw();            

        });

    })
    .catch(error=>{
        console.log("error:- ",error);
    })
}

function editUser(userId){

    clearUserData();

    $("a[name='saveUser']").attr("id",userId);

    const findUserByIdApi = `/findUserById/${userId}`;

    fetch(findUserByIdApi)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok!");
        }
        return response.json();
    })
    .then(userData=>{
                   
            let validFrom = convertYYYYMMDDtoDDMMYYYY(userData.validFrom);
            let validTo = convertYYYYMMDDtoDDMMYYYY(userData.validTo);
            $("#fName").val(userData.firstName);
            $("#lName").val(userData.lastName);
            $("#emailId").val(userData.email);
            $("#contactNo").val(userData.contactNo);
            $("#gender").val(userData.gender).change();
            $(".validFrom").val(validFrom);
            $(".validTo").val(validTo);
            $("#role").val(userData.role).change();
            $("#active").prop("checked",userData.activeId);

            let imgPath = 
            $(".userimg").attr("src",`http://localhost:9090/UImg/${userData.imagePath}`);
            $(".userimg").selectpicker('refresh');

    })
    .catch(error=>{
        console.log("error ",error);
    })
}

function deleteUser(userId){

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

                    const deleteUserApi = `/deleteUser/${userId}`;

                    fetch(deleteUserApi,{
                        method:"Post"
                    })
                    .then(response=>{
                        if(!response.ok){
                            throw new Error("network response was not ok");
                        }
                        return response.text();
                    })
                    .then(deleteUserReponse=>{
                        toastr.success(deleteUserReponse);
                        addUserToTable();
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

function searchByFilter(){

    let userName = $("#userName").val();
    let userRole = $("#userRole").val();

    if(userName == '' || userRole == ''){
        toastr.error("please choose the name and role.");
    }else{

        let searchData = {"userName":userName,"userRole":userRole};

        const searchByFilterApi = "/searchByFilter"
        
        fetch(searchByFilterApi,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(searchData)
        })
        .then(response=>{
            if(!response.ok){
                throw new Error("network response was not");
            }
            return response.json();
        })
        .then(resultData=>{

            let userDataTable = $("#users_datatable").DataTable();
            userDataTable.clear().draw();

            resultData.forEach((eachUser)=>{

                let activeStatus = eachUser.activeId == 1 ? "Yes" : "No";                

                userDataTable.row.add([

                    eachUser.userId,
                    `<h2 class="table-avatar">
                        <a href="javascript:void(0)" data-toggle="popover" data-trigger="hover" data-html="true" data-placement="right" data-template="<div class=&quot;popover fade bs-popover-right&quot; role=&quot;tooltip&quot; x-placement=&quot;right&quot;><div class=&quot;arrow&quot;></div><h3 class=&quot;popover-header p-0 border_radius6&quot;></h3></div>" data-title="<img src='UImg/${eachUser.imagePath}' width='150' height='150' class='border_radius6'>" data-original-title="" title="">
                            <img src="http://localhost:9090/UImg/${eachUser.imagePath}" alt="" class="img-radius avatar">
                        </a>
                        <span>${eachUser.firstName}</span>
                    </h2>`,
                    eachUser.email,
                    eachUser.contactNo,
                    eachUser.validFrom,
                    eachUser.validTo,
                    eachUser.gender,
                    eachUser.role,
                    activeStatus,
                    `<a onclick="editUser(${eachUser.userId})" href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" data-original-title="Edit" class="text-success fa-size client_add_btn"><i class="fa fa-pencil"></i></a>

                    <span class="delete-user-alert"><a onclick="deleteUser(${eachUser.userId})" href="javascript:void(0)" class="text-danger fa-size" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete"><i class="fa fa-trash"></i></a></span>`

                ]).draw();
            })            

        })
        .catch(error=>{
            console.log("error:- ",error);
        })

    }    
}

function resetsearchByFilter(){

    $("#userName").val("");
    $("#userRole").val([]).change();
    addUserToTable();
}

function clearUserData(){

    $("#active").prop("checked",false);
    $("#fName").val("");
    $("#lName").val("");
    $("#emailId").val("");
    $("#contactNo").val("");
    $("#gender").val([]);
    $("#gender").selectpicker('refresh');
    $(".validFrom").val("");
    $(".validTo").val("");
    $("#role").val([]);
    $("#role").selectpicker('refresh');
    removeImg();
}
//oninput regex for allow only char.
function inputChar(obj) {
    obj.value = obj.value.replace(/[^a-z A-Z]/,'');
}

//oninput for contact

function validateContact(input) {

    input.value = input.value.replace(/\D/g, '');
    
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}

function displayImg(){    

    let file = $("#userImg").prop('files')[0];

    if(file){
        let poster = URL.createObjectURL(file);
        $(".userimg").attr("src",poster);
        $(".userimg").selectpicker('refresh');
    }
}

function removeImg(){
    
    $(".userimg").attr("src","assets/images/users/default_user.png");
    $(".userimg").selectpicker('refresh');
    $("#userImg").val('');
}