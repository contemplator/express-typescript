drop procedure if exists deleteStudent;
delimiter #
create procedure deleteStudent (
	params JSON 
)
begin
  declare sid int;
  set sid = JSON_UNQUOTE(JSON_EXTRACT(params, '$.id'));

  delete from students
  where id = sid;

  select if(count(*) = 0, 1, 0) as res
  from students where id = sid;
end#

delimiter ;
call deleteStudent('{"id": 15}');
