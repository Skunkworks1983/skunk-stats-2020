CREATE TABLE RobotProfiles2020 (
  -- Team Number
  team INT,
  -- What type of drivetrain
  drivetrainType VARCHAR(50),
    -- What type of motors on the drivetrain
  drivetrainMotors VARCHAR(50),
  -- cellStorageType VARCHAR(50),
  -- Where can they collect from
  -- cellCollection VARCHAR(100),
  -- Maximum cells carried
  cellMaxStorage INT,
  -- Can shoot in the lower goal
  lowerGoal BOOLEAN,
  -- Can shoot in the outer goal
  outerGoal BOOLEAN,
  -- Can shoot in the inner goal
  innerGoal BOOLEAN,
  -- Robot weight
  robotWeight NUMERIC,
  -- Robot height
  robotHeight NUMERIC,
  -- Can go under the trench
  trench BOOLEAN,
  -- Can hang
  hang BOOLEAN,
  -- Can do wheel position
  wheelPosition BOOLEAN,
  -- Can do wheel rotation
  wheelRotation BOOLEAN,
  -- Can bring up another robot with themselves
  buddyHang BOOLEAN,
  -- Misc
  notes VARCHAR(1000),

  PRIMARY KEY (team)
)