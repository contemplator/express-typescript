drop procedure if exists addStudent;
delimiter #
create procedure addStudent (
	params JSON 
)
begin
  declare sname varchar(10);
  declare sbirthday date;
  declare sgender int;
  set sname = JSON_UNQUOTE(JSON_EXTRACT(params, '$.name'));
  set sbirthday = JSON_UNQUOTE(JSON_EXTRACT(params, '$.birthday'));
  set sgender = JSON_UNQUOTE(JSON_EXTRACT(params, '$.gender'));

  insert into students (name, birthday, gender)
  values (sname, sbirthday, sgender);

  set @lastId = last_insert_id();
  select * from students where id = @lastId;
end#

delimiter ;
call addStudent('{"name": "Ann", "birthday": "1992-01-10", "gender": 2}');
