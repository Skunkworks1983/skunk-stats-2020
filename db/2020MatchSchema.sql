-- Add to robot DB

CREATE TABLE matches2020 (
  -- Name of event
  eventName VARCHAR(10),
  -- Match number 
  matchno INT,
  -- Scout name
  scout VARCHAR(50),
  -- Team number
  team INT,
  -- Alliance 
  alliance VARCHAR(4),
  -- Station
  station INT,
  -- Did they cross the line in auto?
  auto_crossline BOOLEAN,
  -- total shots in auto
  auto_total INT,
  -- Balls scored in the low goal in auto
  auto_low_goal INT,
  -- Balls scored in the outer goal in auto
  auto_outer_goal INT,
  -- Balls scored in the inner goal in auto
  auto_inner_goal INT,
  -- total shots in tele
  tele_total INT,
  -- Balls scoured in the low goal in tele
  tele_low_goal INT,
  -- Balls scored in the outer goal in tele
  tele_outer_goal INT,
  -- Balls scored in the inner goal in tele
  tele_inner_goal INT,
  -- Did they perform a rotation?
  tele_rotation BOOLEAN,
  -- Did they perform a position?
  tele_position BOOLEAN,
  -- Did they park at the end?
  end_park BOOLEAN,
  -- Did they hang at the end?
  end_hang BOOLEAN,
  -- Did they bring up a robot with them?
  end_buddy_hang INT,
  -- Did they show up?
  noShow BOOLEAN,
  -- Did they die at any point?
  deadBot BOOLEAN,
  -- Did a ball get stuck in their bot?
  stuckBall BOOLEAN,

  PRIMARY KEY (eventName, matchno, scout, team)
)