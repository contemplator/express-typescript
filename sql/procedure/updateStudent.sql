drop procedure if exists updateStudent;
delimiter #
create procedure updateStudent (
	params JSON 
)
begin
  declare sid int;
  declare sname varchar(10);
  declare sbirthday date;
  declare sgender int;
  set sid = JSON_UNQUOTE(JSON_EXTRACT(params, '$.id'));
  set sname = JSON_UNQUOTE(JSON_EXTRACT(params, '$.name'));
  set sbirthday = JSON_UNQUOTE(JSON_EXTRACT(params, '$.birthday'));
  set sgender = JSON_UNQUOTE(JSON_EXTRACT(params, '$.gender'));

  update students
  set name = sname, birthday = sbirthday, gender = sgender
  where id = sid;

  select * from students where id = sid;
end#

delimiter ;
call updateStudent('{"id": 12, "name": "Ann", "birthday": "1995-01-10", "gender": 2}');
