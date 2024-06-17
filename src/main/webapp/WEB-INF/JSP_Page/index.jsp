<!DOCTYPE html>
<html lang="en">

<head>
    <title>Log In</title>
    <meta charset='utf-8'/>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='Cache-Control' content='no-cache, no-store, must-revalidate'/>
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta http-equiv='Pragma' content='no-cache'>
    
    <link rel="shortcut icon" href="assets/images/favicon.png">
    <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/style.css" rel="stylesheet" type="text/css" />
    <script src="assets/custom/plugins/theme/mytheme.js"></script>
    <link href="assets/custom/plugins/theme/mytheme.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- <link href="assets/plugins/bootstrap-select/css/bootstrap-select.min.css" rel="stylesheet" type="text/css" /> -->
    <link rel="stylesheet" type="text/css" href="assets/login/login.css">
    
    <script>
        function login(){
            $("#loginForm").submit();
        }
    </script>

</head>
<body>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <div class="fadeIn first">  
                <img src="assets/images/e5logo.png" id="icon" alt="User Icon" />
            </div>
            <form id="loginForm" name="loginForm" class="loginforms" action="/login" method="post">
                
                <input type="text" id="username" class="fadeIn second" name="username" placeholder="Your Username">
                <input type="password" id="password" class="fadeIn third" name="password" placeholder="Password" style="margin-left: 6%;">
                
                <i class="fa fa-eye field-icon"></i>
                
                
                <div style="display: none;" class="checkbox checkbox-custom pull-left chkbox">
                    <input id="remember" type="checkbox">
                    <label for="remember">
                        Remember me
                    </label>
                </div>

                <div style="display: none;" class="text-right">
                <a href="forgotpassword.html" class="text-dark forpw">Forgot your password ?</a>
                </div>
                
                <div id="msg" class="errormsg mt-0">
                    <span class="errors">Incorrect Login details!</span>
                </div>                    
                
                <a class="submit-form-button fadeIn fourth" href="javascript:login();">Login</a>
                
                
            </form>            
        </div>
    </div>

<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/popper.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<!-- <script src="assets/plugins/bootstrap-select/js/bootstrap-select.js"></script> -->
<script src="assets/custom/plugins/showpassword/hideShowPassword.min.js"></script>
<script src="assets/login/main.js"></script>
<script>   
    // $('#login').focus();
    // $(document).keypress(function(e){
    //   if(e.which == 13) {
    //         login();
    //     }
    // });
    
    $('#password + .fa').on('click', function() {
        $(this).toggleClass('fa-eye-slash').toggleClass('fa-eye'); // toggle our classes for the eye icon
        $('#password').togglePassword(); // activate the hideShowPassword plugin
    });

</script>
</body>
</html>                             