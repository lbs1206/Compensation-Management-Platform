print("######################MongoDB 초기화 스크립트 시작#####################");

try{
    db = db.getSiblingDB('admin');

// admin 데이터베이스에 인증
    db.auth('nexon', 'maple');

// story 데이터베이스 생성 및 전환
    db = db.getSiblingDB('story');

// story 데이터베이스에 사용자 생성
    db.createUser({
        user: 'nexon',
        pwd: 'maple',
        roles: [
            {
                role: 'readWrite',
                db: 'story'
            },
            {
                role: 'dbAdmin',
                db: 'story'
            }
        ]
    });
}catch(e){
    print("Error: " + e.message);
}


//admin 관리자 계정 삽입
//id :adminuser,password: Admin1234!
//id :operatoruser,password: Operator1234!
//id :auditoruser,password: Auditor1234!
db.createCollection('users');
db.users.insertOne({
    user_key: "MAPLE306D0B4C550C78A7",
    username: "adminuser",
    password:"$2b$10$OZQ/DEJQU5DdUKgDzC8HGOcNdtrVdDbA5SYTgeU72ItaO77ofFD6m",
    role: "ADMIN",
    created_at: new Date(),
})

db.users.insertOne({
    user_key: "MAPLE306D0B4C550C78A7",
    username: "operatoruser",
    password:"$2b$10$/S08e8CO0o4C52Iw6SBenuJgQR/RzQOKrZXp/xNVpEXQ77LgY/fuu",
    role: "OPERATOR",
    created_at: new Date(),
})

db.users.insertOne({
    user_key: "MAPLE306D0B4C550C78A7",
    username: "auditoruser",
    password:"$2b$10$xUCvc//KAXVcHTMxoQgQQ..I3U0qxFyvlRPNvq284rNw0MO1R0etm",
    role: "AUDITOR",
    created_at: new Date(),
})

//이벤트 삽입
db.createCollection('events')
db.events.insertOne({
    "condition_type": "login",
    "name": "event-003",
    "condition_value": {
        "days": 3
    },
    "created_at": new Date(),
    "description": "로그인 3일",
    "start_date": new Date("2025-01-01T00:00:00.000Z"),
    "end_date": new Date("2025-10-01T00:00:00.000Z"),
    "event_id": "0196e395-7939-71f3-b801-f7665bf4cdb2",
    "status": "Active",
    "updated_at": new Date()
})

//보상 삽입
db.createCollection('rewards');
db.rewards.insertOne({
    "created_at": new Date(),
    "event_id": "0196e395-7939-71f3-b801-f7665bf4cdb2",
    "quantity": 1000,
    "reward_id": "0196e395-961f-79d9-b4bc-8bdecf4a5e63",
    "reward_ref_id": "1",
    "reward_type": "CURRENCY"
})


//재화 삽입
db.createCollection('currencies');
db.currencies.insertOne(
    {
        currency_id: "1",
        currency_symbol: "meso",
        description: "maple default currency",
        created_at: new Date(),
    }
)

print("#############MongoDB 초기화 스크립트 완료#####################");


