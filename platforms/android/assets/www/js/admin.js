function init()
{ 
            
 //fetch user id
    lStorage=$.sessionStorage;
    if(lStorage.isSet('loginDetails'))
    {
      var id=lStorage.get('loginDetails.userId');
      //console.log(id);
      $('#hUid').attr({'value':id})
      
    }
    else
    {
      console.log('not here');
}
  //validate and add new topic
 $('button.btn').click(function(e){  
  	$("#add-item").validate({
      submitHandler:function()
      {
            $.ajax({   
              type: "POST",
              url: "http://bgi.site40.net/bgi/add_topic",
              data: $("#add-item").serialize(),
              cache: false,
              dataType:"json",
              success: function(result)
              {  
               $("#item-success-msg").html(result);
               location.reload();         
              }
              }); 
              e.preventDefault();  
        }
    });     
  });
  //display all topics
  $.ajax({
  url: "http://bgi.site40.net/bgi/fetch_topic",
  cache:false,
  success: function(json) 
  {
  _.templateSettings.variable="rc";
    var template=_.template($("#forum").html());
    var storedItems=JSON.parse(json);
    //console.log(storedItems.adverts.length);
    $("#forum-topics").html(template(storedItems));
  }
  });
//display my topic
 $.ajax({
  url: "http://bgi.site40.net/bgi/fetch_my_topic",
  data:{user_id:id},
  cache:false,
  success: function(json) 
     {
      _.templateSettings.variable="rc";
      var template=_.template($("#mine").html());
      var storedItems=JSON.parse(json);
        //console.log(storedItems.adverts.length);
      $("#my-topics").html(template(storedItems));  
     }
});
//display admin qsns
$.ajax({
    url: "http://bgi.site40.net/bgi/fetch_admin_questions",
    cache:false,
    success: function(json) 
       {
        _.templateSettings.variable="rc";
        var template=_.template($("#qsns").html());
        var storedItems=JSON.parse(json);
          //console.log(storedItems.adverts.length);
        $("#questions").html(template(storedItems));  
       }
  });
//clicks on advert content 
$("#forum-topics").on('click','a',function(e){ 
  var listId=$(this).attr('id');
  lStorage.set('adId',listId);
  //window.location.href='ad-detail.html';
  PUSH({url:"ad-detail.html",transition:"slide-in"});
  //console.log('yes');
  e.preventDefault();
}); 
//clicks on popular content 
$("#my-topics").on('click','a',function(e){ 
  var listId=$(this).attr('id');
  lStorage.set('adId',listId);
  //window.location.href='ad-detail.html';
  PUSH({url:"ad-detail.html",transition:"slide-in"});
  //console.log('yes');
  e.preventDefault();
});
//clicks on local content 
$("#questions").on('click','a',function(e){ 
  var listId=$(this).attr('id');
  lStorage.set('adId',listId);
  //window.location.href='ad-detail.html';
  PUSH({url:"ad-detail.html",transition:"slide-in"});
  //console.log('yes');
  e.preventDefault();
});
                           
                    
}
function load_page()
{
  window.location.href='ad-detail.html';
}
 window.addEventListener('push',load_page);
 window.addEventListener('push',init);

 $(document).ready(function(){
   //fetch coordinates
          init();
          //logout
          $('.toggle').on('toggle',function(){
              $.removeAllStorages();
              window.location.href="index.html";
          });    
 });




//

