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
