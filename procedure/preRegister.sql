drop procedure if exists preRegister;
delimiter #
create procedure preRegister (
	params JSON
)
begin
    declare patientId int;
    declare scheduleId int;
    declare waitingNum int default 0;
    declare symptoms varchar(500) charset utf8 default "";
    set patientId = JSON_UNQUOTE(JSON_EXTRACT(params, '$.patientId'));
    set scheduleId = JSON_UNQUOTE(JSON_EXTRACT(params, '$.scheduleId'));
    set symptoms = JSON_UNQUOTE(JSON_EXTRACT(params, '$.symptoms'));
    select coalesce(max(waiting_number), 0) + 1 into waitingNum from record where schedule_id = scheduleId;

    insert into record (`patient_id`, `schedule_id`, `waiting_number`, `pay_status`, `record_status`, `insurance_type`, `chief_complaint`, `current_history`, `body_feature`, `remark`, `deliver_type`, `deliver_address`, `clinic_id`)
    values (patientId, scheduleId, waitingNum, 0, 1, 0, '', '' , '', '', 0, '', 94);

    select waitingNum, b.id as patientId, b.name as patientName, c.id as scheduleId, c.date, e.name as doctorName, d.address, LAST_INSERT_ID() as recordId, symptoms, c.registration_fee as price
    from record as a, patient as b, schedule as c, clinic as d, member as e
    where a.id = LAST_INSERT_ID()
    and b.id = patientId
    and c.id = scheduleId
    and c.doctor_member_id = e.id
    and c.clinic_id = d.id;
    
end#

delimiter ;

call preRegister('{"patientId": 145,"scheduleId": 3570, "symptoms": "喉嚨"}');