drop procedure if exists login;
delimiter #
create procedure login (
	params JSON 
)
begin
    declare phone varchar(30);
    declare birthday date;
    set phone = JSON_UNQUOTE(JSON_EXTRACT(params, '$.phone'));
    set birthday = JSON_UNQUOTE(JSON_EXTRACT(params, '$.birthday'));

	select *
    from patient
    where patient.phone = phone 
    and patient.birthday = birthday;
end#

delimiter ;
call login
('{"phone": "0982245628", "birthday": "1993-01-03"}');
