create schema webtalky;
set search_path = "webtalky";
alter role postgres set search_path to "webtalky";

create table Users(
    UserId INTEGER,
    Name VARCHAR(20),
    Password VARCHAR(20),
    PRIMARY KEY (CustId)
);

create table Notes(
    UserId INTEGER,
    PRIMARY KEY (UserId)
);

--clients
insert into Users(UserId,FirstName,LastName,Email,Password) values (1,'Don','Algama','dalga082@uottawa.ca','admin');
insert into Users(UserId,FirstName,LastName,Email,Password) values (2,'Olga','Surzhok','osurz015@uottawa.ca','admin');

alter table Users add constraint password_range CHECK(
    Rating >= 8 AND
    Rating <= 20
);
    