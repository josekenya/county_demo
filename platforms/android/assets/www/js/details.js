$(function(){
//load session variable
      var eid=$.sessionStorage;
      var listId=eid.get('adId');
      $.ajax({url: "http://localhost/bgi_api/fetch_topic_detail",data:{id:listId},
        success: function(json) 
           {
             _.templateSettings.variable="rc";
                var template=_.template($("#topic-detail").html());
                var storedItems=JSON.parse(json);
                $('body').find("#details").html(template(storedItems));
                if(storedItems.topic_detail[0].recipient=="public")
                {
                  $("#add-item").addClass('hide');
                  $("#responses").addClass('hide');
                }      
           }
    }); 
  //show responses
  var store=$.sessionStorage;
  var advtId=store.get('adId');
  $.ajax({url:'http://localhost/bgi_api/bgi/fetch_topic_response',data:{id:advtId},
        success: function(result){
         //$('body').find('#responses').append(result);
         _.templateSettings.variable="rc";
        var template=_.template($("#response-temp").html());
        var storedItems=JSON.parse(result);
          //console.log(storedItems.adverts.length);
        $("#responses").html(template(storedItems));
        }
    });
  //add comment
  $('body').on('click','#submit-comment',function(e){
    //retrive ad id
      var lStorage=$.sessionStorage;
      var adId=lStorage.get('adId');
      var id=lStorage.get('loginDetails.userId');
      var comment=$('body').find('#comment').val();
      var username=lStorage.get('loginDetails.username');
      $('body').find('#responses').fadeIn(1000).append('<li class="table-view-cell"><h6>'+username+'</h6> <p>'+comment+'</p></li>');
      $('body').find('p.comment').hide();
      $('body').find('#comment').val("");
      $.ajax({type:'POST',url:'http://localhost/bgi_api/bgi/respond_topic',data:{comments:comment,tid:adId,uid:id}});
      e.preventDefault();

  });
  //click back
    $("body").on('click','#back',function(e){
     var lStorage=$.sessionStorage;
     var uid=lStorage.get('loginDetails.userId');
     if(uid==2)
     {
      PUSH({url:"admin_content.html",transition:"slide-in"});
      window.location.href='admin_content.html';
    }else{
      PUSH({url:"main_content.html",transition:"slide-in"});
      window.location.href='main_content.html';
    }
      //console.log('yes');
      e.preventDefault();
    }); 
 });


  