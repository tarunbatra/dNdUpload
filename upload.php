<?php
if(isset($_FILES['upload']))
{
        if ($_FILES["upload"]["error"] > 0)
        {
                echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
        }
        else
        {
                $ext = pathinfo($_FILES["upload"]["name"], PATHINFO_EXTENSION);
                $file_name=$_FILES["upload"]["name"];
                $file_upload_date=date("Y/m/d");
                $file_type=$_FILES["upload"]["type"];
                $file_size= ($_FILES["upload"]["size"] / 1024);
                $savepath="upload/".$ext."/";
                move_uploaded_file($_FILES["upload"]["tmp_name"],$savepath.$file_name);
        }
}
?>
