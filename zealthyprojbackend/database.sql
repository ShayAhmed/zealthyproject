CREATE DATABASE tickets_app;
USE tickets_app;

CREATE TABLE tickets (
  id serial not null primary key,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  desrciption VARCHAR(255) NOT NULL,
  ticket_status VARCHAR(255) NOT NULL,
  admin_comment VARCHAR(255),
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO tickets (username, email, desrciption, ticket_status, admin_comment)
VALUES 
('Jim', 'jim@jim.com', 'ticket about stuff', 'New', ''),
('John', 'js@amy.com', 'ticket about stuff related to me', 'In Progress', ''),
('Amy', 'amy@amy.com', 'ticket about stuff related to me', 'Resolved', '');