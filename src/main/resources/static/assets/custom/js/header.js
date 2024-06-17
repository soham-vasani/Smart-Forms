
// $(document).ready(function(){

    let getUserSessionDataApi = "/getUserSessionData";

    fetch(getUserSessionDataApi)
    .then(response=>{
        if(!response.ok){
            throw new Error("network response was not ok!");
        }
        return response.json()
    })
    .then(userSessionData=>{

        //append 1st header                    
        let mainHeader = `<div class='topbar-main'>
        <div class='container-fluid colmspadding'>
        <div class='logo'>
        <a href='javascript:void(0)' class='logo'>
        <img src='assets/images/e5logo.png' alt='' height='38' class='logo-large'>
        </a>
        </div>
        <div class='menu-extras topbar-custom'>
        <ul class='list-unstyled topbar-right-menu float-left mb-0'>
        <li class='menu-item'>
        <a class='navbar-toggle nav-link'>
        <div class='lines'>
        <span></span>
        <span></span>
        <span></span>
        </div>
        </a>
        </li>
        </ul>
        <ul class='list-unstyled topbar-right-menu float-right mb-0'>
        <li class='dropdown notification-list'>
        <a class='nav-link dropdown-toggle waves-effect nav-user' data-toggle='dropdown' href='#' role='button' aria-haspopup='false' aria-expanded='false'>
        <img src='http://localhost:9090/UImg/${userSessionData.imagePath}' alt='user' class='rounded-circle'> <span class='ml-1 pro-user-name'> ${userSessionData.role} <i class='mdi mdi-chevron-down'></i> </span>
        </a>
        <div class='dropdown-menu dropdown-menu-right profile-dropdown zoomIn animated'>
        <a href='profile' class='dropdown-item notify-item border-0'>
        <i class='fa fa-user'></i> <span>Profile</span>
        </a>
        <a href='javascript:void(0)' class='dropdown-item notify-item border-0' data-toggle='modal' data-target='.changepasswordmodal'>
        <i class='fa fa-key'></i> <span>Change Password</span>
        </a>
        <a href='logout' id='logoutLink' class='dropdown-item notify-item border-0'>
        <i class='fa fa-sign-out'></i> <span>Logout</span>
        </a>
        </div>
        </li>
        </ul>
        </div>
        <div class='clearfix'></div>
        </div>
        </div>`;

        $("#topnav").append(mainHeader);

        localStorage.setItem("uId",userSessionData.userId)
        localStorage.setItem("uRole",userSessionData.role)

        document.getElementById("logoutLink").addEventListener("click", function(event) {

            event.preventDefault();
    
            localStorage.clear();

            window.location.href = 'logout';
        });

        pageHeadersAppend();
    })
    .catch(error=>{
        console.log(error)
    });


// })