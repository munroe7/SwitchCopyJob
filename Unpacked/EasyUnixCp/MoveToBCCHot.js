/*
                                   
,---.|                        |    
`---.|---.,---.. . .,-.-..   .|--- 
    ||   |,---|| | || | ||   ||    
`---'`   '`---^`-'-'` ' '`---'`---'
C o m m u n i c a t i o n s G r o u p

Author:	Shawmut Communications Group, Samnuel Munroe, Dominick G. Peluso
Date:		September 11, 2015

Copyright © 2014

Script to move files to a specified directory. For use in instances
where moving a file from Switch to another workflow by regular means
doesn't work due to Switch locking the file for a moment.

-----------------------------------------------------------------------

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

*/

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
