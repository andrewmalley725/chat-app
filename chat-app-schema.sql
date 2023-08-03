use chat_app;

drop table person;
drop table room;
drop table message;
drop table user_rooms;

create table person(
	userid int primary key auto_increment,
    username varchar(20),
    firstname varchar(20),
    lastname varchar(20),
    password varchar(64),
    email varchar (100)
);

create table room(
	roomid int primary key auto_increment,
    room_name varchar(20)
);

create table user_rooms(
	userroomid int primary key auto_increment,
	userid int references person,
    roomid int references room
);

create table message(
	messageid int primary key auto_increment,
    userid int references person,
    roomid int references room,
    content varchar(200),
    datesent datetime
);

create index userRoom on user_rooms(userid);
create index roomUser on user_rooms(roomid);
create index userMessage on message(userid);
create index roomMessage on message(roomid);

create view userRooms as
select userroomid, p.userid, 
r.roomid, username, room_name 
from user_rooms as ur
inner join person p on p.userid = ur.userid
inner join room r on r.roomid = ur.roomid


