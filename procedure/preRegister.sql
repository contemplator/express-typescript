drop procedure if exists preRegister;
delimiter #
create procedure preRegister (
	params JSON
)
begin
    declare patientId int;
    declare scheduleId int;
    declare waitingNum int default 0;
    set patientId = JSON_UNQUOTE(JSON_EXTRACT(params, '$.patientId'));
    set scheduleId = JSON_UNQUOTE(JSON_EXTRACT(params, '$.scheduleId'));
    select coalesce(max(waiting_number), 0) + 1 into waitingNum from record where schedule_id = scheduleId;

    insert into record (`patient_id`, `schedule_id`, `waiting_number`, `pay_status`, `record_status`, `insurance_type`, `chief_complaint`, `history`, `body_feature`, `pattern`, `remark`, `deliver_type`, `deliver_address`, `clinic_id`)
    values (patientId, scheduleId, waitingNum, 0, 1, 0, '', '', '' , '', '', 0, '', 94);
end#

delimiter ;

call preRegister('{"patientId": 145,"scheduleId": 4784}');