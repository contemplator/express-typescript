export interface MsgBody{
    ToUserName: string;         // app id
    FromUserName: string;       // user open id
    CreateTime: number;         // 建立時間, long millisecond
    MsgType: string;            // text, image
    Content: string;            // 內容
    MsgId: number;              // 識別碼
    Encrypt: string;            // 
    PicUrl?: string;            // image 訊息，圖片暫存區
    MediaId: string;            // image 訊息，圖片暫時 id
}