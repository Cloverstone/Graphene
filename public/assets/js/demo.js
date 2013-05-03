    function updateDifference(){
      atot = parseFloat($("#total-deposit").val())+parseFloat($("#statement_balance").val());
      $("#account_total").val(atot.toFixed(2));

      abal = parseFloat($("#account_total").val())-parseFloat($("#total-withdrawal").val());
      $("#account_balance").val(abal.toFixed(2));

      diff = parseFloat($("#account_balance").val())-parseFloat($("#register_balance").val());
      $("#difference").val(diff.toFixed(2));
      if($("#difference").val() == "0.00"){
        $("#result").removeClass("error");
        $("#result").addClass("success");
      }else{
        $("#result").removeClass("success");
        $("#result").addClass("error");
      }
    }

    $(".total.editable").live("change", function() {
      if($(this).val() == ""){
        $(this).val("0.00");
        updateDifference();
      }
    });
    $(".total.editable").live("input", function() {
      updateDifference();
    });
    $(".deposit .value").live("input", function() {
      dt = 0;
      $(".deposit .value").each(function(){
        if(!isNaN(parseFloat($(this).val()))){
           dt += parseFloat($(this).val());
        }
      });
      if(!isNaN(dt)){
        $(".total-deposit").val(dt.toFixed(2));
      }else{
        $(".total-deposit").val("");
      }
      updateDifference();
    });
    $(".withdrawal .value").live("input", function() {
      wt = 0;
      $(".withdrawal .value").each(function(){
        if(!isNaN(parseFloat($(this).val()))){
           wt += parseFloat($(this).val());
        }
      });
      if(!isNaN(wt)){
        $(".total-withdrawal").val(wt.toFixed(2));
      }else{
        $(".total-withdrawal").val("");
      }
      updateDifference();
    });
