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
db.createCollection('users');
db.users.insertOne({
    user_key: "MAPLE306D0B4C550C78A7",
    username: "adminuser",
    password:"$2b$10$OZQ/DEJQU5DdUKgDzC8HGOcNdtrVdDbA5SYTgeU72ItaO77ofFD6m",
    role: "ADMIN",
    created_at: new Date(),
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


