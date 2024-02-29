var config_data = `
{
	"title": "Raven Scouting - 2024",
	"page_title": "",
	"checkboxAs": "10",
	"prematch": [{
			"name": "Scouter Initals",
			"code": "s",
			"type": "scouter",
			"size": 5,
			"maxSize": 5,
			"required": "true"
		},
		{
			"name": "Event",
			"code": "e",
			"type": "event",
			"defaultValue": "2024mibel",
			"required": "true",
			"disabled": "true"
		},
		{
			"name": "Match Level",
			"code": "l",
			"type": "level",
			"choices": {
				"qm": "Quals<br>",
				"de": "Double Elimination<br>",
				"f": "Finals"
			},
			"defaultValue": "qm",
			"required": "true"
		},
		{
			"name": "Match #",
			"code": "m",
			"type": "match",
			"min": 1,
			"max": 100,
			"required": "true"
		},
		{
			"name": "Robot",
			"code": "r",
			"type": "robot",
			"choices": {
				"r1": "Red-1",
				"b1": "Blue-1<br>",
				"r2": "Red-2",
				"b2": "Blue-2<br>",
				"r3": "Red-3",
				"b3": "Blue-3"
			},
			"required": "true"
		},
		{
			"name": "Team #",
			"code": "t",
			"type": "team",
			"min": 1,
			"max": 99999
		},
				{
			"name": "Preload",
			"code": "pr",
			"type": "radio",
			"choices": {
				"y": "Yes",
				"n": "No"
				
			},
			"defaultValue": "x"
		},
		{
			"name": "Auto Start Position",
			"code": "asl",
			"type": "clickable_image",
			"filename": "2024/field_image.png",
			"clickRestriction": "one",
			"shape": "circle 5 white white white white white true"
		}
	],
	"auton": [

	{ 	"name": "Auto Cycle Timer",
	     "code": "act",
		  "type": "cycle"
	},
		{
			"name": "Auto Scoring",
			"code": "asg",
			"type": "clickable_image",
			"filename": "2024/field_image.png",
			"dimensions": "9 5",
			"clickRestriction": "onePerBox",
			"toggleClick": "true",
			"shape": "circle 10 #FFFD98 #D81E5B true",
			"cycleTimer": "act"
		},
		{
		"name": "Shots",
		"code": "as",
		"type": "counter"
		},
  		{
		"name": "Misses",
		"code": "am",
		"type": "counter"
		},

		{
			"name": "Mobility?",
			"code": "amo",
			"type": "bool"
		}
	],
	"teleop": [{
			"name": "Cycle Timer",
			"code": "tct",
			"type": "cycle"
		},
		{
			"name": "Shooting Location:",
			"code": "ss",
			"type": "field_image",
			"filename": "2024/field_image.png",
			"cycleTimer": "tct",
			"shape": "circle 5 #FFFD98 #D81E5B true"
			
			
		},
		{
			"name": "AmpMissNormal",
			"code": "amn",
			"type": "button"
		}
		
	],
	"postmatch":[
		{
			"name": "# of Climbers",
			"code": "ac",
			"type": "counter"
		},
		{
			"name": "Final Status",
			"code": "fs",
			"type": "radio",
			"choices": {
				"p": "Parked<br>",
				"c": "Climbed<br>",
				"f": "Attempted but failed<br>",
				"x": "Not attempted"
			},
			"defaultValue": "x"
		},
		{
			"name": "Trap",
			"code": "tr",
			"type": "radio",
			"choices": {
				"s": "Success<br>",
				"f": "Attempted but failed<br>",
				"x": "Not attempted"
			},
			"defaultValue": "x"
		},
		{
			"name": "Driver Rank (1=best)",
			"code": "dr",
			"type": "radio",
			"choices": {
				"1": "1<br>",
				"2": "2<br>",
				"3": "3"
			}
			
		},
		
		{
			"name": "Played Defense?",
			"code": "pd",
			"type": "bool"
		},
		{
			"name": "Died/Tipped",
			"code": "die",
			"type": "bool"
		},
 		{
			"name": "Flag for review:",
			"code": "f",
			"type": "bool"
		},
		{
			"name": "Comments",
			"code": "co",
			"type": "text",
			"size": 15,
			"maxSize": 457
		}
	]
}`;
