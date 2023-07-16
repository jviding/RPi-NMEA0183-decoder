CREATE TABLE users (
  PRIMARY KEY(id),
  id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255)
);

CREATE TABLE boats (
  PRIMARY KEY(id),
  id INT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  user_id INT,
  -- Constraints --
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);

CREATE TABLE nmea_data (
  PRIMARY KEY(id),
  id INT GENERATED ALWAYS AS IDENTITY,
  timestamp BIGINT NOT NULL,
  packet_type VARCHAR(255) NOT NULL,
  packet_data VARCHAR(255) NOT NULL,
  boat_id INT,
  -- Constraints --
  CONSTRAINT fk_boat_id
    FOREIGN KEY(boat_id)
      REFERENCES boats(id)
      ON DELETE CASCADE
);

CREATE INDEX idx_nmea_data ON nmea_data (
  boat_id,
  timestamp DESC
);
