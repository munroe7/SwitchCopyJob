// Is invoked each time a new job arrives in one of the input folders for the flow element.
// The newly arrived job is passed as the second parameter.
function jobArrived( s : Switch, job : Job )
{
	//this is the path to the BCC Watch Folder.
	var destinationPath = s.getPropertyValue('DestinationPath');
	var debug = s.getPropertyValue('Debug');
	
	//this is the path of the input file
	var inputPath = job.getPath();

	
	//command to copy files from source to destination
	var moveFileCommand = 'cp ' + "\"" + inputPath + "\"" + " \"" + destinationPath+'/'+job.getName()+ "\"";
	
	
	//debug variables
	if(debug == 'Yes'){
		s.log(2, 'destinationPath: '+destinationPath);
		s.log(2, 'inputPath: '+inputPath);
		s.log(2, 'moveFileCommand: '+moveFileCommand);
	}

	//execute move file command
	Process.execute(moveFileCommand);
	
	//log any execute errors
	var cpError = Process.stderr;
	var cpResponse = Process.stdout;
	
	if(cpError){
		s.log(3, 'cpError: '+cpError);
	}
	
	
	//debug variables
	if(debug == 'Yes'){
		s.log(2, 'cpResponse: '+cpResponse);
	}

		
}
