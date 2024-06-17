// function pageHeadersAppend(){

//     let getUserSessionDataApi = "/getUserSessionData";

//     fetch(getUserSessionDataApi)
//     .then(response=>{
//         if(!response.ok){
//             throw new Error("network response was not ok!");
//         }
//         return response.json()
//     })
//     .then(userSessionData=>{

//         let user_Role = userSessionData.role;

//         let adminHeader = `<div class='navbar-custom'>
//         <div class='container-fluid colmspadding'>
//         <div id='navigation'>
//         <ul class='navigation-menu'>
//         <li class='has-submenu' id='master_form'>
//         <a href='master_form'><i class='fa fa-plus-circle' aria-hidden='true'></i>Create Form</a>
//         </li>
//         <li class='has-submenu' id='fill_forms'>
//         <a href='fill_forms'><i class='fa fa-file-text-o' aria-hidden='true'></i>Fill Form</a>
//         </li>
//         <li class='has-submenu' id='completed_forms'>
//         <a href='completed_forms'><i class='fa fa-check-circle' aria-hidden='true'></i>Completed Form</a>
//         </li>
//         <li class='has-submenu float-menu' id='adminpanel' style='float: none'>
//         <a href='#'><i class='fa fa-tasks' aria-hidden='true'></i>Masters</a>
//         <ul class='submenu'>
//         <li><a href='master_users' class='subpaddings'>Users</a></li>
//         </ul>
//         </li>
//         </ul>
//         </div>
//         </div>
//         </div>`;
    
//         let userHeader = `<div class='navbar-custom'>
//         <div class='container-fluid colmspadding'>
//         <div id='navigation'>
//         <ul class='navigation-menu'>
//         <li class='has-submenu' id='fill_forms'>
//         <a href='fill_forms'><i class='fa fa-file-text-o' aria-hidden='true'></i>Fill Form</a>
//         </li>
//         <li class='has-submenu' id='completed_forms'>
//         <a href='completed_forms'><i class='fa fa-check-circle' aria-hidden='true'></i>Completed Form</a>
//         </li>
//         </ul>
//         </li>
//         </ul>
//         </div>
//         </div>
//         </div>`;

//         if(user_Role == "Admin"){
//             $("#topnav").append(adminHeader);
//         }else if(user_Role == "User"){
//             $("#topnav").append(userHeader);
//         }
//     })
//     .catch(error=>{
//         console.log(error);
//     })

// }

// $(function(){
    function pageHeadersAppend(){

        let user_Role = localStorage.getItem("uRole");

        let adminHeader = `<div class='navbar-custom'>
        <div class='container-fluid colmspadding'>
        <div id='navigation'>
        <ul class='navigation-menu'>
        <li class='has-submenu' id='master_form'>
        <a href='master_form'><i class='fa fa-plus-circle' aria-hidden='true'></i>Create Form</a>
        </li>
        <li class='has-submenu' id='fill_forms'>
        <a href='fill_forms'><i class='fa fa-file-text-o' aria-hidden='true'></i>Fill Form</a>
        </li>
        <li class='has-submenu' id='completed_forms'>
        <a href='completed_forms'><i class='fa fa-check-circle' aria-hidden='true'></i>Completed Form</a>
        </li>
        <li class='has-submenu float-menu' id='adminpanel' style='float: none'>
        <a href='#'><i class='fa fa-tasks' aria-hidden='true'></i>Masters</a>
        <ul class='submenu'>
        <li><a href='master_users' class='subpaddings'>Users</a></li>
        </ul>
        </li>
        </ul>
        </div>
        </div>
        </div>`;
    
        let userHeader = `<div class='navbar-custom'>
        <div class='container-fluid colmspadding'>
        <div id='navigation'>
        <ul class='navigation-menu'>
        <li class='has-submenu' id='fill_forms'>
        <a href='fill_forms'><i class='fa fa-file-text-o' aria-hidden='true'></i>Fill Form</a>
        </li>
        <li class='has-submenu' id='completed_forms'>
        <a href='completed_forms'><i class='fa fa-check-circle' aria-hidden='true'></i>Completed Form</a>
        </li>
        </ul>
        </li>
        </ul>
        </div>
        </div>
        </div>`;

        if(user_Role == "Admin"){
            $("#topnav").append(adminHeader);
        }else if(user_Role == "User"){
            $("#topnav").append(userHeader);
        }

}

// })
