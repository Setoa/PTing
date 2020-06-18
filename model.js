const config = require("./config/environment").mysql;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.database, config.username, config.password, config);
//model 목록 : User, Trainer, Trainee, TrainerInfo, Timetable, BodyProfile, Contract, ContractSet

const User=sequelize.define("user",{
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usertype:{
        type: Sequelize.INTEGER,
        allowNull: false
    } //trainer=1, trainee=2
},
{
    timestamps: false,
    freezeTableName: true 
});

const Trainer = sequelize.define("trainer", {
    uid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    verify:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }//인증된 트레이너인지 아닌지. 0이면 X, 1이면 ok
},
{
    timestamps: false,
    freezeTableName: true
});

const Trainee = sequelize.define("trainee", {
    uid: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, //이 trainee가 어느 user인지. 로그인할때는 그냥 일괄 로그인 하고, 회원가입 할때는 타입도 정해주긔.
},
{
    timestamps: false,
    freezeTableName: true
});

const Contract = sequelize.define("contract", {
    trainer_id: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    trainee_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, //trainer가 직접 생성함. 근데 계약을 하는건 또 trainee가 하는거니까 만들때는 공백으로 납둠.
    pt_number: {
        type:Sequelize.INTEGER,
        allowNull: false
    }, //PT 계약 횟수
    pt_cost: {
        type:Sequelize.INTEGER,
        allowNull: false
    } // PT 가격.(합한 것)
},
{
    timestamps: false,
    freezeTableName: true
});

const ContractSet=sequelize.define("contractset", {
    cost10: {
        type:Sequelize.INTEGER,
        allowNull:false
    }, //10회당 가격. x(만원)
    cost20: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, //20회당 가격.
    cost30: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, //30회당 가격.
    trainer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    } //trainer_id. 참조키
},
{
    timestamps: false,
    freezeTableName: true
});

// Trainer Inforatmion. 데이터 어떻게 넣을지 생각하고 나서 디비에 넣자.
const TrainerInfo = sequelize.define("trainerinfo", {
    trainer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    exp: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, //경력 년수. 몇 년.
    career: {
        type: Sequelize.TEXT,
        allowNull: false
    }, //career. 자유 기재.
    cert: {
        type: Sequelize.TEXT,
        allowNull: false
    }   // certification. 자격증. parsing해서 자격증 기존에 있던 목록과 대조해서 비교하고 
        // 일치하는 string 다수 존재 시 trainer의 verify를 1로 update.
},
{
    timestamps: false,
    freezeTableName: true
}); // trainer 정보 직접 생성. 첫 생성때만 create하고 두번째 부턴 update.

// Body Profile. 데이터 어떻게 넣을지 생각하고 나서 디비에 넣자. note는 그냥 text로 하면 되는데 health 어떻게 할까...?
const BodyProfile = sequelize.define("bodyprofile", {
    trainee_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, //trainee 참조하기 위함.
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, //나이.
    height:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }, //소수점 한자리까지. cm
    weight: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }, //소수점 한자리까지. kg
    bmi: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }, //소수점 한자리까지. kg/cm =>직접 입력하는 값이 아니라 height, weight로 계산할 것.
    metabolic: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, //kcal. =>직접 입력하는게 아니라 height, weight로 계산할 것.
    note: {
        type: Sequelize.TEXT,
        allowNull: true
    }   //미션 박아주던가 진짜 조언같은거 적어주는 칸. 근데 그냥 생각해본건데
        //체크박스 해서 TODO LIST로 미션 하는거도 괜찮을거 같은데?? 
},
{
    timestamps: true, //시간별로 저장해주기 위함
    freezeTableName: true
});

const CertList=sequelize.define('certlist',{
    cert_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    cert_code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cert_first_index: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cert_last_index: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false,
    freezeTableName: true
});

// Timetable. 데이터 어떻게 넣을지 생각하고 나서 디비에 넣자. 내가 찾아볼 부분.
// const Timetable = sequelize.define("timetable", {
//     trainer_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
// },
// {
//     timestamps: false,
//     freezeTableName: true
// }); 

User.hasOne(Trainer, { foreignKey: "uid" });
Trainer.belongsTo(User, { foreignKey: "uid" });

User.hasOne(Trainee, { foreignKey: "uid" });
Trainee.belongsTo(User, { foreignKey: "uid" });

Trainer.hasMany(Contract, { foreignKey: "trainer_id"});
Contract.belongsTo(Trainer, { foreignKey: "trainer_id" });

Trainee.hasOne(Contract, { foreignKey: "trainee_id" });
Contract.belongsTo(Trainee, { foreignKey: "trainee_id" });

Trainer.hasOne(ContractSet, { foreignKey: "trainer_id"});
ContractSet.belongsTo(Trainer, { foreignKey: "trainer_id" });

// Trainer.hasOne(Timetable, { foreignKey: "trainer_id"});
// Timetable.belongsTo(Trainer, { foreignKey: "trainer_id" });

Trainee.hasOne(BodyProfile, { foreignKey: "trainee_id" });
BodyProfile.belongsTo(Trainee, { foreignKey: "trainee_id" });

Trainer.hasMany(TrainerInfo, { foreignKey: "trainer_id" });
TrainerInfo.belongsTo(Trainer, { foreignKey: "trainer_id" });

module.exports = {
    sequelize: sequelize,
    User: User,
    Trainer: Trainer,
    Trainee: Trainee,
    Contract: Contract,
    ContractSet: ContractSet,
    BodyProfile: BodyProfile,
    TrainerInfo: TrainerInfo,
    //Timetable: Timetable
};