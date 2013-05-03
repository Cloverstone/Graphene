function processItems(){
      response.wireframe = response.wireframe.replace(/\[content\]/gi, window.CONTENT_LOCATION);
      for(var i in response[subcontext]) {
        var tempdiv = response.wireframe;
        tempdiv = tempdiv.replace(/\[index\]/gi, i);
        for(var j in response[subcontext][i]){
           tempdiv = tempdiv.split('['+j+']').join(response[subcontext][i][j])
        }
        if(response.target == undefined){
           response.target = "#content";
        }
        $(response.target).append(tempdiv);
      };
}
