var express=require('express');
var mqtt=require('mqtt');
var mongoclient=require('mongodb').MongoClient;
var firebase=require('firebase');
var datetime=require('date-time');
var bodyparser=require('body-parser');
var nodemailer=require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ENTER EMAIL ID',
    pass: 'ENTER PASSWORD'
  }
});



var A_="";
var B_="";
var C_="";

var stateA="";
var stateB="";
var stateC="";

var config = {
    ..........
  "AVAILABLE IN FIREBASE CONSOLE"
  };
  firebase.initializeApp(config);



var clientA = mqtt.connect('mqtts://io.adafruit.com',{
  port:8883,
  username: 'ENTER USERNAME',
  password: 'ENTER AIO KEY'
});



var clientB = mqtt.connect('mqtts://io.adafruit.com',{
  port:8883,
  username: 'ENTER USERNAME',
  password: 'ENTER AIO KEY'
});



var clientC = mqtt.connect('mqtts://io.adafruit.com',{
  port:8883,
  username: 'ENTER USERNAME',
  password: 'ENTER AIO KEY'
});



var url='ENTER MONGODB URL';
var app=express();



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use(express.static('views'));



clientA.on('connect',function()
{
  clientA.subscribe('amogh7798/feeds/LIGHT A');
})
clientA.on('error',function(error)
{
  console.log('MQTT Client errored');
  console.log(error);
})
clientA.on('message',function(topic,message)
{
  console.log(message.toString())
  mongoclient.connect(url,function(err,db)
{
  var shdev=db.db("sh-dev");
  var dev=shdev.collection('dev');
  dev.findOne({email:"smart"},function(err,result)
{
  if(result.emailcheck=='true')
  {
    var mailOptions = {
      from: 'ENTER FROM ADDRESS',
      to: 'ENTER TO ADDRESS',
      subject: 'SECURITY ALERT',
      text: 'LIGHT ALPHA WAS TURNED '+ message.toString() + ' at ' + datetime()
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
})
})

  mongoclient.connect(url,function(err,db)
  {
    if (err) throw err;
    var shdev=db.db('sh-dev');
    var dev=shdev.collection('dev');
    dev.update({DEVICE:"LIGHT A"},{$set:{STATUS:message.toString()}},function(error)
  {
    if (error) throw error;
    db.close();
  });
  });
  if(message=='ON')
  {
  mongoclient.connect(url,function(err,db)
  {
  if(err) throw err;
  var shdev=db.db('sh-dev');
  var dev=shdev.collection('dev');
  dev.update({DEVICE:'LIGHT A'},{$set:{ON_TIME:datetime()}},function(Error)
  {
  if (Error) throw Error;
  db.close();
  });
  })
 }
 else if(message=='OFF')
 {
 mongoclient.connect(url,function(err,db)
 {
 if(err) throw err;
 var shdev=db.db('sh-dev');
 var dev=shdev.collection('dev');
 dev.update({DEVICE:'LIGHT A'},{$set:{OFF_TIME:datetime()}},function(Error)
 {
 if (Error) throw Error;
 db.close();
 });
 })
}
})

clientB.on('connect',function()
{
  clientB.subscribe('amogh7798/feeds/LIGHT B');
})
clientB.on('error',function(error)
{
  console.log('MQTT Client errored');
  console.log(error);
})
clientB.on('message',function(topic,messageB)
{
  mongoclient.connect(url,function(err,db)
{
  var shdev=db.db("sh-dev");
  var dev=shdev.collection('dev');
  dev.findOne({email:"smart"},function(err,result)
{
  if(result.emailcheck=='true')
  {
    var mailOptions = {
      from: 'nocolice@gmail.com',
      to: 'amogh7798@gmail.com',
      subject: 'SECURITY ALERT',
      text: 'LIGHT BETA WAS TURNED '+ messageB.toString() + ' at ' + datetime()
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
})
})
  mongoclient.connect(url,function(err,db)
  {
    if (err) throw err;
    var shdev=db.db('sh-dev');
    var dev=shdev.collection('dev');
    dev.update({DEVICE:"LIGHT B"},{$set:{STATUS:messageB.toString()}},function(error)
  {
    if (error) throw error;
    db.close();
  });
  });
  if(messageB=='ON')
  {
  mongoclient.connect(url,function(err,db)
  {
  if(err) throw err;
  var shdev=db.db('sh-dev');
  var dev=shdev.collection('dev');
  dev.update({DEVICE:'LIGHT B'},{$set:{ON_TIME:datetime()}},function(Error)
  {
  if (Error) throw Error;
  db.close();
  });
  })
 }
 else if(messageB=='OFF')
 {
 mongoclient.connect(url,function(err,db)
 {
 if(err) throw err;
 var shdev=db.db('sh-dev');
 var dev=shdev.collection('dev');
 dev.update({DEVICE:'LIGHT B'},{$set:{OFF_TIME:datetime()}},function(Error)
 {
 if (Error) throw Error;
 db.close();
 });
 })
}
})

clientC.on('connect',function()
{
  clientC.subscribe('amogh7798/feeds/LIGHT C');
})
clientC.on('error',function(error)
{
  console.log('MQTT Client errored');
  console.log(error);
})
clientC.on('message',function(topic,messageC)
{
  console.log(messageC.toString())
  mongoclient.connect(url,function(err,db)
  {
  var shdev=db.db("sh-dev");
  var dev=shdev.collection('dev');
  dev.findOne({email:"smart"},function(err,result)
  {
  if(result.emailcheck=='true')
  {
    var mailOptions = {
      from: 'nocolice@gmail.com',
      to: 'amogh7798@gmail.com',
      subject: 'SECURITY ALERT',
      text: 'LIGHT DELTA WAS TURNED '+ messageC.toString() + ' at ' + datetime()
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  })
  })
  mongoclient.connect(url,function(err,db)
  {
    if (err) throw err;
    var shdev=db.db('sh-dev');
    var dev=shdev.collection('dev');
    dev.update({DEVICE:"LIGHT C"},{$set:{STATUS:messageC.toString()}},function(error)
  {
    if (error) throw error;
    db.close();
  });
  });
  if(messageC=='ON')
  {
  mongoclient.connect(url,function(err,db)
  {
  if(err) throw err;
  var shdev=db.db('sh-dev');
  var dev=shdev.collection('dev');
  dev.update({DEVICE:'LIGHT C'},{$set:{ON_TIME:datetime()}},function(Error)
  {
  if (Error) throw Error;
  db.close();
  });
  })
 }
 else if(messageC=='OFF')
 {
 mongoclient.connect(url,function(err,db)
 {
 if(err) throw err;
 var shdev=db.db('sh-dev');
 var dev=shdev.collection('dev');
 dev.update({DEVICE:'LIGHT C'},{$set:{OFF_TIME:datetime()}},function(Error)
 {
 if (Error) throw Error;
 db.close();
 });
 })
}
})

app.get('/',function(req,res)
{
  res.render("login.ejs",{message:0});
})


app.post('/login/check',function(req,res)
{
  var email=req.body.email;
  var password=req.body.password;
  firebase.auth().signInWithEmailAndPassword(email,password).then(function()
  {
    res.redirect('/home');
  })
 .catch(function(error)
 {
  var errorMessage=error.message;
  res.render('login.ejs',{message:errorMessage});
 });
});
app.get('/app',function(req,res)
{
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  mongoclient.connect(url,function(err,db)
  {
    if (err) throw err;
    var shdev=db.db('sh-dev');
    var dev=shdev.collection('dev');
    dev.findOne({DEVICE:'LIGHT A'},function(error1,result){
    if (error1) throw error1;
    console.log(result);
    var resultA=result.STATUS;
    dev.findOne({DEVICE:'LIGHT B'},function(error2,result2){
    if (error2) throw error2;
    console.log(result2);
    var resultB=result2.STATUS;
    dev.findOne({DEVICE:'LIGHT C'},function(error3,result3){
    if (error3) throw error3;
    console.log(result3);
    var resultC=result3.STATUS;
    dev.findOne({email:'smart'},function(err,result){
    var resultD=result.emailcheck;
    res.render('dev.ejs',{message1:resultA,message2:resultB,message3:resultC,message4:resultD});
    db.close();
  })
  });
  });
});
});
} else {
  // No user is signed in.
  res.redirect('/');
}
});
})


app.get('/home',function(req,res)
{
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    res.render('home.ejs',{});
  } else {
    // No user is signed in.
    res.redirect('/');
  }
});
})


app.get('/ondev',function(req,res)
{
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  var onstatusA='0';
  var onstatusB='0';
  var onstatusC='0';
  mongoclient.connect(url,function(err,db)
{
  if (err) throw err;
  var shdev=db.db('sh-dev');
  var dev=shdev.collection('dev');
  dev.findOne({DEVICE:"LIGHT A"},function(err,result1)
{
  if (err) throw err;
  if(result1.STATUS=='ON')
  {
    onstatusA='1';
  }
  var A_=result1.ON_TIME;
  dev.findOne({DEVICE:"LIGHT B"},function(err,result2)
{
  if (err) throw err;
  if(result2.STATUS=='ON')
  {
    onstatusB='1';
  }
  var B_=result2.ON_TIME;
  dev.findOne({DEVICE:"LIGHT C"},function(err,result3)
{
  if(err) throw err;
  if(result3.STATUS=='ON')
  {
    onstatusC='1';
  }
  var C_=result3.ON_TIME;
  switch (onstatusA + "|"+ onstatusB +"|"+onstatusC)
  {
    case "0|0|0":res.render("ondev.ejs",{A:0,B:0,C:0});break;
    case "0|0|1":res.render("ondev.ejs",{A:0,B:0,C:C_});break;
    case "0|1|0":res.render("ondev.ejs",{A:0,B:B_,C:0});break;
    case "0|1|1":res.render("ondev.ejs",{A:0,B:B_,C:C_});break;
    case "1|0|0":res.render("ondev.ejs",{A:A_,B:0,C:0});break;
    case "1|0|1":res.render("ondev.ejs",{A:A_,B:0,C:C_});break;
    case "1|1|0":res.render("ondev.ejs",{A:A_,B:B_,C:0});break;
    case "1|1|1":res.render("ondev.ejs",{A:A_,B:B_,C:C_});break;
  }
})
})
})
})
} else {
  // No user is signed in.
  res.redirect('/');
}
});
})


app.get('/offdev',function(req,res)
{
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  var offstatusA='0';
  var offstatusB='0';
  var offstatusC='0';
  mongoclient.connect(url,function(err,db)
{
  if (err) throw err;
  var shdev=db.db('sh-dev');
  var dev=shdev.collection('dev');
  dev.findOne({DEVICE:"LIGHT A"},function(err,result1)
{
  if (err) throw err;
  if(result1.STATUS=='OFF')
  {
    offstatusA='1';
  }
  var A_=result1.OFF_TIME;
  dev.findOne({DEVICE:"LIGHT B"},function(err,result2)
{
  if (err) throw err;
  if(result2.STATUS=='OFF')
  {
    offstatusB='1';
  }
  var B_=result2.OFF_TIME;
  dev.findOne({DEVICE:"LIGHT C"},function(err,result3)
{
  if(err) throw err;
  if(result3.STATUS=='OFF')
  {
    offstatusC='1';
  }
  var C_=result3.OFF_TIME;
  switch (offstatusA + "|"+ offstatusB +"|"+offstatusC)
  {
    case "0|0|0":res.render("offdev.ejs",{A:0,B:0,C:0});break;
    case "0|0|1":res.render("offdev.ejs",{A:0,B:0,C:C_});break;
    case "0|1|0":res.render("offdev.ejs",{A:0,B:B_,C:0});break;
    case "0|1|1":res.render("offdev.ejs",{A:0,B:B_,C:C_});break;
    case "1|0|0":res.render("offdev.ejs",{A:A_,B:0,C:0});break;
    case "1|0|1":res.render("offdev.ejs",{A:A_,B:0,C:C_});break;
    case "1|1|0":res.render("offdev.ejs",{A:A_,B:B_,C:0});break;
    case "1|1|1":res.render("offdev.ejs",{A:A_,B:B_,C:C_});break;
  }
})
})
})
})
} else {
  // No user is signed in.
  res.redirect('/');
}
});
})

app.get('/switchA',function(req,res)
{
  mongoclient.connect(url,function(err,db)
{
  var shdev=db.db('sh-dev');
  var dev=shdev.collection('dev');
  dev.findOne({DEVICE:'LIGHT A'},function(err,result)
{
  if (err) throw err;
  if(result.STATUS=='ON')
  {
    dev.update({DEVICE:'LIGHT A'},{$set:{STATUS:'OFF'}},function(err)
  {
    if (err) throw err;
    clientA.publish('amogh7798/feeds/LIGHT A','OFF');
    db.close;
  })
  }
  else if(result.STATUS=='OFF')
  {
    dev.update({DEVICE:'LIGHT A'},{$set:{STATUS:'ON'}},function(err)
  {
    if (err) throw err;
    clientA.publish('amogh7798/feeds/LIGHT A','ON');
    db.close;
  })
  }
})
})
res.redirect('/app');
})

app.get('/switchB',function(req,res)
{
  mongoclient.connect(url,function(err,db)
{
  var shdev=db.db('sh-dev');
  var dev=shdev.collection('dev');
  dev.findOne({DEVICE:'LIGHT B'},function(err,result)
{
  if (err) throw err;
  if(result.STATUS=='ON')
  {
    dev.update({DEVICE:'LIGHT B'},{$set:{STATUS:'OFF'}},function(err)
  {
    if (err) throw err;
    clientB.publish('amogh7798/feeds/LIGHT B','OFF');
    db.close;
  })
  }
  else if(result.STATUS=='OFF')
  {
    dev.update({DEVICE:'LIGHT B'},{$set:{STATUS:'ON'}},function(err)
  {
    if (err) throw err;
    clientB.publish('amogh7798/feeds/LIGHT B','ON');
    db.close;
  })
  }
})
})
res.redirect('/app');
})

app.get('/switchC',function(req,res)
{
  mongoclient.connect(url,function(err,db)
{
  var shdev=db.db('sh-dev');
  var dev=shdev.collection('dev');
  dev.findOne({DEVICE:'LIGHT C'},function(err,result)
{
  if (err) throw err;
  if(result.STATUS=='ON')
  {
    dev.update({DEVICE:'LIGHT C'},{$set:{STATUS:'OFF'}},function(err)
  {
    if (err) throw err;
    clientC.publish('amogh7798/feeds/LIGHT C','OFF');    db.close;
  })
  }
  else if(result.STATUS=='OFF')
  {
    dev.update({DEVICE:'LIGHT C'},{$set:{STATUS:'ON'}},function(err)
  {
    if (err) throw err;
    clientC.publish('amogh7798/feeds/LIGHT C','ON');
    db.close;
  })
  }
})
})
res.redirect('/app');
})

app.get('/emailcheck',function(req,res)
{
  mongoclient.connect(url,function(err,db)
{
  if (err) throw err;
  var shdev=db.db("sh-dev");
  var dev=shdev.collection("dev");
  dev.update({email:"smart"},{$set:{emailcheck:"true"}},function(err)
{
  if (err) throw err;
  db.close();
})
})
res.redirect('../app');
})

app.get('/emailuncheck',function(req,res)
{
  mongoclient.connect(url,function(err,db)
{
  if (err) throw err;
  var shdev=db.db("sh-dev");
  var dev=shdev.collection("dev");
  dev.update({email:"smart"},{$set:{emailcheck:"false"}},function(err)
{
  if (err) throw err;
  db.close();
})
})
res.redirect("../app");
})

app.get('/signout',function(req,res)
{
  firebase.auth().signOut().then(function() {
    res.redirect('/');
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
})
app.listen(8080);
