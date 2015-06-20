//functions for index.html
$(function(){
	//validate and signup form
  jQuery.support.cors = true;
    $('#submit-signup').click(function(e){
    	$("#signup").validate({

        submitHandler: function()
        {
            $.ajax({
                type: "POST",
                url: "http://localhost/bgi_api/bgi/create_user",
                dataType: "json",
                data: $("#signup").serialize(),
                cache: false,
                success: function(result)
                {
                  if(result.success)
                  {
                    $("#signup-success-msg").html(result.success);
                    //console.log(result.success);
                  }
                  else
                  {
                     $("#signup-success-msg").html(result.failure);
                  }
                 
                 //console.log(result);
                }
                });
        }
      });
     e.preventDefault();
    });
    //validate and login to the app
   $('#submit-login').click(function(e){
    	$("#login-form").validate({
        submitHandler: function()
        {
          $.ajax({  
                type: "POST",
                url: "http://localhost/bgi_api/bgi/login",
                data: $("#login-form").serialize(),
                cache: false,
                dataType:"json",
                success: function(result)
                {
                 //$("#error-msg").html(result).removeClass('hide');
                if(result.userid)
                 {
                    if(result.userid==2)
                    {
                     console.log(result);
                     lStorage=$.sessionStorage;
                     var data={'username':result.username,'userId':result.userid,'sessionId':result.session_id};
                     lStorage.set('loginDetails',data);
                     //PUSH({url:"admin_content.html",transition:"slide-in"});
                     window.location.href="admin_content.html";
                   }
                   else
                   {
                     console.log(result);
                     lStorage=$.sessionStorage;
                     var data={'username':result.username,'userId':result.userid,'sessionId':result.session_id};
                     lStorage.set('loginDetails',data);
                     //PUSH({url:"main_content.html",transition:"slide-in"});
                     window.location.href="main_content.html";
                   }
                 }
                 else
                 {
                   $("#msg").html(result.failure);
                 }              
                 //alert(result.success);
                }
                });
          e.preventDefault();
                }
      });   
    });


});