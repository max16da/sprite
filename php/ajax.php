<?php

if(isset($_FILES["file"]["type"]))
{
	$validextensions = array("jpeg", "jpg", "png");
	$temporary = explode(".", $_FILES["file"]["name"]);
	$file_extension = end($temporary);
	if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")
	) && in_array($file_extension, $validextensions)) { //&& ($_FILES["file"]["size"] < 1000000)//Approx. 100kb files can be uploaded.
		if ($_FILES["file"]["error"] > 0)
		{
		echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
		}
		else
		{
			if (file_exists("upload/" . $_FILES["file"]["name"])) {
				echo $_FILES["file"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
			}
			else
			{
				$sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
				$targetPath = "../upload/".$_FILES['file']['name'];
				move_uploaded_file($sourcePath,$targetPath) ;
				echo "<span id='success'>Sprite uploadé réussi...!!</span><br/>";
				echo $_FILES['file']['name'];
			}
		}
	}
else
{
	echo "<span id='invalid'>***Type du sprite invalide***<span>";
}
}
?>
