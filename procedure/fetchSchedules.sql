drop procedure if exists fetchSchedules;
delimiter #
create procedure fetchSchedules (
	params JSON 
)
begin
    declare date varchar(10) default ""; 
    set date = JSON_UNQUOTE(JSON_EXTRACT(params, '$.date'));

	select a.id, division_id, c.name as division_name, registration_fee, date, doctor_member_id, b.name as doctor_name, room, weekday, shift, remark
    from schedule a, member b, division c
    where a.date = date
    and a.doctor_member_id = b.id
    and a.division_id = c.id
    order by shift;
end#

delimiter ;
call fetchSchedules
('{"date": "2018-03-05"}');
