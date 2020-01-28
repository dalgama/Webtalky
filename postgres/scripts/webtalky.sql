create schema webtalky;
set search_path = "webtalky";
alter role postgres set search_path to "webtalky";

create table Users(
    userid INTEGER,
    email VARCHAR(20) CHECK (email NOT NULL),
    password VARCHAR(20) CHECK (password >= 8 AND password <= 20),
    topicid INTEGER,
    intro VARCHAR(100)
    PRIMARY KEY (CustId)
    FOREIGN KEY (TopicId)
);

create table Topic(
    topicid INTEGER,
    name VARCHAR(20),
    description VARCHAR(50)
    PRIMARY KEY (topicid)
);

create table Conversation(
    messageid INTEGER,
    user1_id VARCHAR(20),
    user2_id VARCHAR(50),
    message VARCHAR(200),
    topicid INTEGER
    PRIMARY KEY (messageid)
    FOREIGN KEY (topicid)
    FOREIGN KEY (user1_id)
    FOREIGN KEY (user2_id)
);

--clients
INSERT INTO Users(userid,email,password,topicid,intro) 
	values (1,'dalga082@uottawa.ca','admin','WWW',"I'm an admin"),
		   (2,'osurz015@uottawa.ca','admin','WWW',"I'm an admin");
    