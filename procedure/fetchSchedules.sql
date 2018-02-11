drop procedure if exists fetchSchedules;
delimiter #
create procedure fetchSchedules (
	params JSON 
)
begin
    declare date varchar(10) default ""; 
    set date = JSON_UNQUOTE(JSON_EXTRACT(params, '$.date'));

	select *
    from schedule
    where schedule.date = date;
end#

delimiter ;
call fetchSchedules
('{"date": "2018-02-09"}');
