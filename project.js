//shorthand for getElementbyId
function getId(id)
{
	return document.getElementById(id);
}
//to display file description
function stat(s)
{
	var statDiv = getId("status");
	statDiv.innerHTML = "<hr>"+s + statDiv.innerHTML;
}
//to add Event Listeners
function init()
{
var dropHere = getId("dropper");
dropHere.addEventListener("dragover",FileDragHover,false);
dropHere.addEventListener("dragleave", FileDragHover, false);
dropHere.addEventListener("drop", FileDropHandler, false);
}
//drag event listener
function FileDragHover(e)
{
        //stat("Dragged: "+e+"<br>");
        e.stopPropagation();
        e.preventDefault();
        e.target.className=(e.type == "dragover" ? "hover" : "");
}
//drop event listener
function FileDropHandler(e)
{
        FileDragHover(e);
        //stat("<strong>Dropped</strong><br>");
        getId("status").style.display="block";
        var file = e.target.files || e.dataTransfer.files;
        //stat(file+"<br>");
        var ext,sz;
        var fd = new FormData();
        for(var i=0,f; f=file[i];i++)
        {
                ext = f.name.split(".").pop() ;
                if(ext=="jpeg" || ext=="png" || ext=="docx" || ext=="pdf" )
                {
                        sz=f.size;
                        if(sz>100000 && sz<500000)
                        {
                                parseFile(f);
                                fd.append('upload',f);
                                send(fd);
                        }
                        else
                        {
                                stat("<p><strong>Invalid File Size! </strong><br>Only 100KB to 500KB files.</p>");
                        }
                }
                else
                {
                        stat("<p><strong>Invalid File format! </strong><br>Only jpeg png docx pdg allowed.</p>");
                }
        }
}
//to get file info
function parseFile(ff)
{
        stat("<p><strong> File Description:</strong><br>"+ff.name+"<br>"+ff.type+"<br>"+ff.size+"B</p>");
}

function send(formD)
{
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                console.log(xmlhttp.responseText);
                
            }
        }
        xmlhttp.open('POST', 'upload.php', true);
        xmlhttp.send(formD);
}

