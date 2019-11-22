$(function() {
  function buildHTML(message) {
    var imagehtml = message.image.url == null ?  "" : `<img class= "lower-message__image" src=${message.image.url} >` ;
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                    ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                    ${message.content}
                    </p>
                  </div>
                  ${imagehtml}
                </div> `
     return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action')
    
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $(".submit-btn").prop( "disabled", false );
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $("form")[0].reset();
      $('.hidden').val('');
    })
    .fail(function(data){
      alert('メッセージを入力して下さい');
    })
  })
  
  var reloadMessages = function() {

    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    
      last_message_id = $('.message:last').data("message-id");
  
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id},
      })

      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
        var insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
    });
   };
  }
  setInterval(reloadMessages, 5000);
});