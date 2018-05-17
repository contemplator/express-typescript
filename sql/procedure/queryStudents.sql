drop procedure if exists queryStudents;
delimiter #
create procedure queryStudents (
	params JSON 
)
begin
  select id, name, birthday, gender
    from students
    where birthday >= '1995-01-01'
    order by birthday;
end#

delimiter ;
call queryStudents(null);
