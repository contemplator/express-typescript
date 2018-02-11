drop procedure if exists preRegister;
delimiter #
create procedure preRegister (
	patient_id int,
    schedule_id int
)
begin
    insert into record (`patient_id`, `schedule_id`, `waiting_number`, `pay_status`, `record_status`, `insurance_type`, `chief_complaint`, `history`, `body_feature`, `pattern`, `remark`, `deliver_type`, `deliver_address`, `clinic_id`)
    values (patient_id, schedule_id, 0, 2, 0, 0, '', '', '' , '', '', 0, '', 94);
end#

delimiter ;

call preRegister(126, 4941);