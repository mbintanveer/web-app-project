const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app= express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000,()=>{
    console.log('server running......');
});

const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hms',
    port:'3306'
})

db.connect(err=>{
    if(err) {console.log('err');}
    console.log('Connected');
})



//countDoctors
app.get('/doctorscount',(req,result)=>{
    let sql = 'SELECT count(*) as DocCounter FROM `doctors`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//countPatients
app.get('/patientscount',(req,result)=>{
    let sql = 'SELECT count(*) as PatientCounter FROM `patient`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//countAppointments
app.get('/appointmentscount',(req,result)=>{
    let sql = 'SELECT count(*) as AppointmentsCounter FROM `appointments`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});
//countDepartment
app.get('/departmentcount',(req,result)=>{
    let sql = 'SELECT count(*) as DepCounter FROM `department`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//countDiagnose
app.get('/diagnosecount',(req,result)=>{
    let sql = 'SELECT count(*) as DiagnoseCounter FROM `diagnose`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//countdisease
app.get('/diseasecount',(req,result)=>{
    let sql = 'SELECT count(*) as DiseaseCounter FROM `disease`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//countmedicines
app.get('/medicinecount',(req,result)=>{
    let sql = 'SELECT count(*) as MedicineCounter FROM `medicines`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//countspecializations
app.get('/specializationcount',(req,result)=>{
    let sql = 'SELECT count(*) as SpecializationCounter FROM `specialization`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

app.get('/doctor_account',(req,result)=>{
    let sql = 'SELECT * FROM `doctor_account`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});
//single data 
app.get('/doctor_account/:DocId',(req,result)=>{
    let gid=req.params.DocId;
    let sql = `SELECT * FROM doctor_account where DocId=${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});
//create
app.post('/doctor_account',(req,result)=>{


        console.log(req.body,'createdata');
    let DocId = req.body.DocId;
    let password= req.body.password;
    
    
    let sql = `insert into doctor_account(DocId, password) Values('${DocId}','${password}')`;
    let query = db.query(sql,(err,res)=>{
      if (err){throw err;}
       
       
        result.send({message : 'Data Inserted',data:res});
        
    });
   
});
//update
app.put('/doctor_account/:DocId',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.DocId;
    let DocId = req.body.DocId;
    let password= req.body.password;
    
    let sql= `update doctor_account set DocId='${DocId}',password='${password}' where DocId=${gid}`;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})
//delete
app.delete('/doctor_account/:DocId',(req,result)=>{
    let gid=req.params.DocId;

    let sql= ` delete from doctor_account where DocId = ${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})

/////

app.get('/patient_account',(req,result)=>{
    let sql = 'SELECT * FROM `patient_account`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});
//get1Patient
app.get('/patient_account/:PID',(req,result)=>{
    let gid=req.params.PID;
    let sql = `SELECT * FROM patient_account where PID=${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});

//insertpatient
app.post('/patient_account',(req,result)=>{


    console.log(req.body,'createdata');
let PID = req.body.PID;
let password= req.body.password;



let sql = `insert into patient_account(PID,password) Values('${PID}','${password}')`;
let query = db.query(sql,(err,res)=>{
  if (err){throw err;}
   
   
    result.send({message : 'Data Inserted',data:res});
    
});

});
//updatePatient
app.put('/patient_account/:PID',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.PID;
    let PID = req.body.PID;
let password= req.body.password;

    let sql= `update patient_account set PID='${PID}',password='${password}' where PID=${gid}`;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})
//deletePatient
app.delete('/patient_account/:PID',(req,result)=>{
    let gid=req.params.PID;

    let sql= ` delete from patient_account where PID = ${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})


//////
app.get('/doctors',(req,result)=>{
    let sql = 'SELECT * FROM `doctors`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});
//single data 
app.get('/doctors/:DocId',(req,result)=>{
    let gid=req.params.DocId;
    let sql = `SELECT * FROM doctors where DocId=${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});
//create
app.post('/doctors',(req,result)=>{


        console.log(req.body,'createdata');
    let DocId = req.body.DocId;
    let DocName= req.body.DocName;
    let Address= req.body.Address;
    let PhNo= req.body.PhNo;
    let Age= req.body.Age;
    let Gender= req.body.Gender;
    let DepId= req.body.DepId;
    
    let sql = `insert into doctors(DocId, DocName,Address, PhNo, Age, Gender, DepId) Values('${DocId}','${DocName}', '${Address}','${PhNo}','${Age}','${Gender}','${DepId}')`;
    let query = db.query(sql,(err,res)=>{
      if (err){throw err;}
       
       
        result.send({message : 'Data Inserted',data:res});
        
    });
   
});
//update
app.put('/doctors/:DocId',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.DocId;
    let DocId = req.body.DocId;
    let DocName= req.body.DocName;
    let Address= req.body.Address;
    let PhNo= req.body.PhNo;
    let Age= req.body.Age;
    let Gender= req.body.Gender;
    let DepId= req.body.DepId;
    let sql= `update doctors set DocId='${DocId}',DocName='${DocName}',Address='${Address}',PhNo='${PhNo}',Age='${Age}',Gender='${Gender}',DepId='${DepId}' where DocId=${gid}`;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})
//delete
app.delete('/doctors/:DocId',(req,result)=>{
    let gid=req.params.DocId;

    let sql= ` delete from doctors where DocId = ${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})

//getpatients
app.get('/patient',(req,result)=>{
    let sql = 'SELECT * FROM `patient`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});
//get1Patient
app.get('/patient/:PID',(req,result)=>{
    let gid=req.params.PID;
    let sql = `SELECT * FROM patient where PID=${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});

//insertpatient
app.post('/patient',(req,result)=>{


    console.log(req.body,'createdata');
let PID = req.body.PID;
let PName= req.body.PName;
let Address= req.body.Address;
let PhNo= req.body.PhNo;
let Age= req.body.Age;
let Gender= req.body.Gender;


let sql = `insert into patient(PID, PName, Age, Gender,Address, PhNo) Values('${PID}','${PName}', '${Age}','${Gender}','${Address}','${PhNo}')`;
let query = db.query(sql,(err,res)=>{
  if (err){throw err;}
   
   
    result.send({message : 'Data Inserted',data:res});
    
});

});
//updatePatient
app.put('/patient/:PID',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.PID;
    let PID = req.body.PID;
let PName= req.body.PName;
let Address= req.body.Address;
let PhNo= req.body.PhNo;
let Age= req.body.Age;
let Gender= req.body.Gender;
    let sql= `update patient set PID='${PID}',PName='${PName}',Address='${Address}',PhNo='${PhNo}',Age='${Age}',Gender='${Gender}' where PID=${gid}`;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})
//deletePatient
app.delete('/patient/:PID',(req,result)=>{
    let gid=req.params.PID;

    let sql= ` delete from patient where PID = ${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})

//insertAppointment
app.post('/appointments',(req,result)=>{


    console.log(req.body,'createdata');

let AppointTime= req.body.AppointTime;
let PID= req.body.PID;
let DocId= req.body.DocId;


let sql = `insert into Appointments( AppointTime, PID, DocId) Values('${AppointTime}', '${PID}','${DocId}')`;
let query = db.query(sql,(err,res)=>{
  if (err){throw err;}
   
   
    result.send({message : 'Data Inserted',data:res});
    
});

});

//deleteAppointment
app.delete('/appointments/:AppointmentId',(req,result)=>{
    let gid=req.params.AppointmentId;

    let sql= ` delete from appointments where AppointmentId = ${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})

//getAppointments
app.get('/appointments',(req,result)=>{
    let sql = 'SELECT * FROM `appointments`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//updateAppointment
app.put('/appointments/:AppointmentId',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.AppointmentId;
    let AppointmentId = req.body.AppointmentId;
let AppointTime= req.body.AppointTime;
let PID= req.body.PID;
let DocId= req.body.DocId;
    let sql= `update appointments set PID='${PID}',AppointmentId='${AppointmentId}',AppointTime='${AppointTime}',DocId='${DocId}' where AppointmentId=${gid}`;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})

//get1Appointment
app.get('/appoinments/:AppointmentId',(req,result)=>{
    let gid=req.params.AppointmentId;
    let sql = `SELECT * FROM patient where AppointmentId=${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});


//insertDepartment
app.post('/department',(req,result)=>{


    console.log(req.body,'createdata');
let DepId = req.body.DepId;
let Dname= req.body.Dname;
let Location= req.body.Location;


let sql = `insert into department(DepId, Dname, Location) Values('${DepId}','${Dname}', '${Location}')`;
let query = db.query(sql,(err,res)=>{
  if (err){throw err;}
   
   
    result.send({message : 'Data Inserted',data:res});
    
});

});

//deleteDepartment
app.delete('/department/:DepId',(req,result)=>{
    let gid=req.params.DepId;

    let sql= ` delete from department where DepId = ${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})

//getDepartment
app.get('/department',(req,result)=>{
    let sql = 'SELECT * FROM `department`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//updateDepartment
app.put('/department/:DepId',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.DepId;
    let DepId = req.body.DepId;
let Dname= req.body.Dname;
let Location= req.body.Location;
    let sql= `update department set DepId='${DepId}',Dname='${Dname}',Location='${Location}' where DepId=${gid}`;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})

//get1department
app.get('/department/:DepId',(req,result)=>{
    let gid=req.params.DepId;
    let sql = `SELECT * FROM department where DepId=${gid}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});

//insertDaignose
app.post('/diagnose',(req,result)=>{


    console.log(req.body,'createdata');
let AppointmentId = req.body.AppointmentId;
let Did= req.body.Did;


let sql = `insert into diagnose(AppointmentId, Did) Values('${AppointmentId}','${Did}')`;
let query = db.query(sql,(err,res)=>{
  if (err){throw err;}
   
   
    result.send({message : 'Data Inserted',data:res});
    
});

});

//deleteDaignose
app.delete('/diagnose/:Did/:AppointmentId',(req,result)=>{
    let gid=req.params.Did;
    let gid1=req.params.AppointmentId;

    let sql= ` delete from diagnose where Did = ${gid} and AppointmentId=${gid1} `;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})

//getDiagnose
app.get('/diagnose',(req,result)=>{
    let sql = 'SELECT * FROM `diagnose`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//updateDiagnose
app.put('/diagnose/:Did/:AppointmentId',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.Did;
    let gid1=req.params.AppointmentId;
    let AppointmentId = req.body.AppointmentId;
let Did= req.body.Did;
    let sql= `update diagnose set Did='${Did}',AppointmentId='${AppointmentId}' where Did=${gid} and AppointmentId=${gid1}`;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})

//get1diagnose
app.get('/diagnose/:Did/:AppointmentId',(req,result)=>{
    let gid=req.params.Did;
    let gid1=req.params.AppointmentId;
    let sql = `SELECT * FROM diagnose where Did=${gid} and AppointmentId=${gid1}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});


//insertDisease
app.post('/disease',(req,result)=>{


    console.log(req.body,'createdata');
let Dname = req.body.Dname;
let Did= req.body.Did;


let sql = `insert into disease( Did, Dname) Values('${Did}','${Dname}')`;
let query = db.query(sql,(err,res)=>{
  if (err){throw err;}
   
   
    result.send({message : 'Data Inserted',data:res});
    
});

});

//deleteDisease
app.delete('/disease/:Did',(req,result)=>{
    let gid=req.params.Did;
    let sql= ` delete from disease where Did = ${gid} `;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})

//getdisease
app.get('/disease',(req,result)=>{
    let sql = 'SELECT * FROM `disease`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//updatedisease
app.put('/disease/:Did',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.Did;
    
    let Dname = req.body.Dname;
let Did= req.body.Did;
    let sql= `update disease set Did='${Did}',Dname='${Dname}' where Did=${gid} `;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})

//get1disease
app.get('/disease/:Did',(req,result)=>{
    let gid=req.params.Did;
    let sql = `SELECT * FROM disease where Did=${gid} `;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});

//insertD_specialization
app.post('/d_specialization',(req,result)=>{


    console.log(req.body,'createdata');
let SpecId = req.body.SpecId;
let DocId= req.body.DocId;


let sql = `insert into d_specialization( DocId, SpecId) Values('${DocId}','${SpecId}')`;
let query = db.query(sql,(err,res)=>{
  if (err){throw err;}
   
   
    result.send({message : 'Data Inserted',data:res});
    
});

});

//deleted_specialization
app.delete('/d_specialization/:DocId/:SpecId',(req,result)=>{
    let gid=req.params.DocId;
    let gid1=req.params.SpecId;

    let sql= ` delete from d_specialization where Did = ${gid} and SpecId=${gid1} `;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})

//getd_specialization
app.get('/d_specialization',(req,result)=>{
    let sql = 'SELECT * FROM `d_specialization`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//updated_specialization
app.put('/d_specialization/:DocId/:SpecId',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.DocId;
    let gid1=req.params.SpecId;
    let SpecId = req.body.SpecId;
    let DocId= req.body.DocId;
    let sql= `update d_specialization set DocId='${DocId}',SpecId='${SpecId}' where DocId=${gid} and SpecId=${gid1}`;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})

//get1d_specialization
app.get('/d_specialization/:DocId/:SpecId',(req,result)=>{
    let gid=req.params.DocId;
    let gid1=req.params.SpecId;
    let sql = `SELECT * FROM d_specialization where DocId=${gid} and SpecId=${gid1}`;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});


//insertMedicines
app.post('/medicines',(req,result)=>{


    console.log(req.body,'createdata');
let MID = req.body.MID;
let MedName= req.body.MedName;


let sql = `insert into medicines( MID, MedName) Values('${MID}','${MedName}')`;
let query = db.query(sql,(err,res)=>{
  if (err){throw err;}
   
   
    result.send({message : 'Data Inserted',data:res});
    
});

});

//deleteMedicine
app.delete('/medicines/:MID',(req,result)=>{
    let gid=req.params.MID;
    let sql= ` delete from medicines where MID = ${gid} `;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})

//getMedicines
app.get('/medicines',(req,result)=>{
    let sql = 'SELECT * FROM `medicines`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//updatemedicines
app.put('/medicines/:MID',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.MID;
    
    let MedName = req.body.MedName;
let MID= req.body.MID;
    let sql= `update medicines set MID='${MID}',MedName='${MedName}' where MID=${gid} `;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})

//get1medicines
app.get('/medicines/:MID',(req,result)=>{
    let gid=req.params.MID;
    let sql = `SELECT * FROM medicines where MID=${gid} `;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});


//insertPrescription
app.post('/prescription',(req,result)=>{


    console.log(req.body,'createdata');
let PresId = req.body.PresId;
let Did= req.body.Did;
let AppointmentId = req.body.AppointmentId;
let MID= req.body.MID;


let sql = `insert into prescription( PresID, Did, AppointmentId, MID) Values('${PresId}','${Did}','${AppointmentId}','${MID}')`;
let query = db.query(sql,(err,res)=>{
  if (err){throw err;}
   
   
    result.send({message : 'Data Inserted',data:res});
    
});

});

//deletePrescription
app.delete('/prescription/:PresId',(req,result)=>{
    let gid=req.params.PresId;
    let sql= ` delete from prescription where PresId = ${gid} `;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})

//getPrescription
app.get('/prescription',(req,result)=>{
    let sql = 'SELECT * FROM `prescription`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//updatePrescription
app.put('/prescription/:PresId',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.PresId;
    
    let PresId = req.body.PresId;
    let Did= req.body.Did;
    let AppointmentId = req.body.AppointmentId;
    let MID= req.body.MID;
    let sql= `update prescription set MID='${MID}',AppointmentId='${AppointmentId}',Did=${Did},PresId=${PresId} where PresId=${gid} `;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})

//get1Prescription
app.get('/prescription/:PresId',(req,result)=>{
    let gid=req.params.PresId;
    let sql = `SELECT * FROM prescription where PresId=${gid} `;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});

//insertSpecialization
app.post('/specialization',(req,result)=>{


    console.log(req.body,'createdata');
let SpecId = req.body.SpecId;
let SpecDesc= req.body.SpecDesc;


let sql = `insert into specialization( SpecID, SpecDesc) Values('${SpecId}','${SpecDesc}')`;
let query = db.query(sql,(err,res)=>{
  if (err){throw err;}
   
   
    result.send({message : 'Data Inserted',data:res});
    
});

});

//deleteSpecialization
app.delete('/specialization/:SpecId',(req,result)=>{
    let gid=req.params.SpecId;
    let sql= ` delete from specialization where SpecId = ${gid} `;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
                  
                  
         result.send({message : 'Data deleted',data:res});
                   
     });
})

//getSpecializations
app.get('/specialization',(req,result)=>{
    let sql = 'SELECT * FROM `specialization`';
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        result.send({message : 'Data Fetched', data:res});
    });
   
});

//updatespecialization
app.put('/specialization/:SpecId',(req,result)=>{
    console.log(req.body,'updatedata');
    let gid=req.params.SpecId;
    
    let SpecId = req.body.SpecId;
    let SpecDesc= req.body.SpecDesc;
    let sql= `update specialization set SpecId='${SpecId}',SpecDesc='${SpecDesc}' where SpecId=${gid} `;
     let query = db.query(sql,(err,res)=>{
       if (err){throw err;}
                 
                 
        result.send({message : 'Data updated',data:res});
                  
    });
})

//get1Specialization
app.get('/specialization/:SpecId',(req,result)=>{
    let gid=req.params.SpecId;
    let sql = `SELECT * FROM specialization where SpecId=${gid} `;
    let query = db.query(sql,(err,res)=>{
        if (err){throw err;}
        console.log(res);
        if(res.length>0){
        result.send({message : 'Data Fetched', data:res});
        }else {
            result.send({message : 'result not found'});
        }
    });
   
});