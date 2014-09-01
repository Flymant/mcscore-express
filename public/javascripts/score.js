$(document).ready(function() {
  var _target = "<%= data[0]._id %>";

  function concludeData() {
    var res = [];
    $("#table-members tbody tr").each(function() {
      var member = {};
      member._id = $(this.cells[0]).attr("data-name");
      member.score = parseFloat(this.cells[1].firstChild.value);
      res.push(member);
    });

    for(m in res){
      console.log(res[m].score);
      if(isNaN(res[m].score) || res[m].score > 10) {
          $(".form .info").text("Input Invalid!");
          return;
      }
    }
    return res;
  }

  function doScore() {
    if(getCookie("if-already-give-scores") == "yes") {
      $(".form .info").text("You have already give your score!");
      return;
    }
    var res = concludeData();
    if(res == null) {
      $(".form .info").text("Pleae input your score!");
      return;
    }
    $.ajax({
      url: "doscore",
      type: "post",
      dataType: "json",
      data: {
        scores: res
      },
      beforeSend: function() {
        layer.load(0);
      },
      success: function(res) {
        if(res.success) {
          $(".form .info").text("submit success!");
          setCookie("if-already-give-scores", "yes", 3);
         }
        else {
          $(".form .info").text("error occurs!");
        }
      },
      error: function() {
        alert("Error occurs, please try again later.");
      },
      complete: function() {
        layer.closeAll();
      }
    });
  }

  function bindEvent() {
    $("#submit").click(function(evt) {
      doScore();
    });
  }

  function init() {
    bindEvent();
  }

  init();
})
