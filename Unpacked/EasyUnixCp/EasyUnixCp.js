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
	// Capture some variables
	var destinationPath = s.getPropertyValue( 'DestinationPath' );
	var debug = s.getPropertyValue( 'Debug' );
	
	var logLevel = 2;
	
	// Build copy command
	var inputPath = job.getPath();
	var outputPath = destinationPath + '/' +job.getName();
	var moveFileCommand = 'cp ' + '"' + inputPath + '"' +  ' "' + outputPath + '"';
	
	// Debug
	if(debug == 'Yes'){
		s.log( logLevel, 'destinationPath: ' + destinationPath );
		s.log( logLevel, 'inputPath: ' + inputPath );
		s.log( logLevel, 'moveFileCommand: ' + moveFileCommand );
	}

	// Execute command
	Process.execute( moveFileCommand );
	
	// Gather output
	var cpError = Process.stderr;
	var cpResponse = Process.stdout;
	
	// Debug some more
	if( debug == 'Yes' ){
		s.log( 2, 'cpResponse: ' + cpResponse );
	}
	
	// Error checking and completion
	if( cpError ){
		s.log( 3, 'cpError: ' + cpError );
	} else {
		// Delete the existing job
		job.sendToNull( job.getPath() );
	}
			
}
