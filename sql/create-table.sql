create table if not exists students(
  id int not null auto_increment,
  name varchar(10) not null,
  birthday date default '2010-01-01',
  gender int default 0,
  primary key (id)
);