drop procedure if exists fetchSchedules;
delimiter #
create procedure fetchSchedules (
	in date date
)
begin
    select *
    from schedule
    where schedule.date = date;
end#

delimiter ;
call fetchSchedules
('2018-02-09');
