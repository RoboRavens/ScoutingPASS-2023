var config_data = `
{
	"title": "Birds-Eye Scouting - 2024",
	"page_title": "Crescendo",
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
			"defaultValue": "2023mitr2",
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
			"code": "as",
			"type": "clickable_image",
			"filename": "2024/field_image.png",
			"clickRestriction": "one",
			"shape": "circle 5  purple  true"
		}
	],
	"auton": [
		{
			"name": "Auto Scoring",
			"code": "asg",
			"type": "clickable_image",
			"filename": "2024/field_image.png",
			"dimensions": "9 5",
			"clickRestriction": "onePerBox",
			"toggleClick": "true",
			"showFlip": "false",
			"showUndo": "false",
			"shape": "circle 10 black lime true"
		},
		{
		"name": "Scores",
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
			"code": "am",
			"type": "bool"
		}
	],
	"teleop": [{
			"name": "Cycle Timer",
			"code": "tct",
			"type": "cycle"
		},
		{
			"name": "Shooting Spot",
			"code": "ss",
			"type": "field_image",
			"filename": "2024/field_image.png",
			"cycleTimer": "tct"
		},
		{
			"name": "AmpMissNormal",
			"code": "amn",
			"type": "button"
		},
		{
			"name": "# of Climbers",
			"code": "ac",
			"type": "counter"
		}
		
	],
	"postmatch":[
		{
			"name": "Played Defense?",
			"code": "pd",
			"type": "bool"
		},
		{
			"name": "Was Defended?",
			"code": "df",
			"type": "bool"
		},
		
		{
			"name": "Ground Pickup",
			"code": "gp",
			"type": "bool"
		},
		{
			"name": "Amp Capability",
			"code": "ac",
			"type": "bool"
		},
		{
			"name": "Source Pickup",
			"code": "sp",
			"type": "bool"
		},
		{
			"name": "Died",
			"code": "die",
			"type": "bool"
		},
		{
			"name": "Trap?",
			"code": "tr",
			"type": "bool"
		},
		{
			"name": "Tipped",
			"code": "tip",
			"type": "bool"
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
			"name": "Comments",
			"code": "co",
			"type": "text",
			"size": 15,
			"maxSize": 457
		}
	]
}`;
