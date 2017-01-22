document.getElementById('getval').addEventListener('change', intoImageBytes, true);

function intoImageBytes(){
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    var bytes = null
    reader.onloadend = function(){
        document.getElementById('clock').style.backgroundImage = "url(" + reader.result + ")";
        bytes = reader.result
        bytes = bytes.substring(23,bytes.count)
        document.getElementById('byteText').value = bytes
    }
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}