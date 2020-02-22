create table users (
    id serial primary key not null,
    username varchar(20),
    password varchar(20),
    profile_pic text
)

create table posts (
    id serial primary key not null,
    title varchar(45),
    img text,
    content text,
    author_id integer references users(id)
)