drop procedure if exists bindWechatId;
delimiter #
create procedure bindWechatId (
	params JSON 
)
begin
    declare patiendId int;
    declare wechatId varchar(50);
    set patiendId = JSON_UNQUOTE(JSON_EXTRACT(params, '$.patiendId'));
    set wechatId = JSON_UNQUOTE(JSON_EXTRACT(params, '$.wechatId'));

	update patient set wechat_id = wechatId where id = patiendId;
	
end#

delimiter ;
call bindWechatId
('{"patiendId": 145, "wechatId": "A128309"}');
