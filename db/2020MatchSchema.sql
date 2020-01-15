-- Add to robot DB

CREATE TABLE matches2020 (
  eventName VARCHAR(10), 
  matchno INT,
  scout VARCHAR(50),
  team INT,
  alliance VARCHAR(4),
  auto_crossline BOOLEAN,
  auto_low_goal INT,
  auto_outer_goal INT,
  auto_inner_goal INT,
  tele_low_goal INT,
  tele_outer_goal INT,
  tele_inner_goal INT,
  tele_rotation BOOLEAN,
  tele_position BOOLEAN,
  end_hang BOOLEAN,
  end_assisted_hang INT,
  end_bar BOOLEAN,
  noShow BOOLEAN,
  deadBot BOOLEAN

  PRIMARY KEY (eventName, matchno, scout, team)
)