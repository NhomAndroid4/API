var users = require('../models/users');

var appRouter = function (app) {

  app.get("/", function (req, res) {
    res.status(200).send("Welcome to WebService By DucPham");
  });

    app.post("/DangNhap", function (req, res) {
        //console.log(req.body);
        var data = {
            username: req.body.username,
            password: req.body.password,
        }
        //var user = req.body.username;
        //var pass = req.body.password;
        //console.log('Tai khoan: ' + user);
        //console.log('Mat khau: ' + pass);
        //var bFound = false;
        //var key = '';
        //if (user === 'vvdung' && pass === '123456') {
        //   key = JSON.stringify({user:user});
        //    bFound = true;
        //}

        //var dateRet = { r: bFound, key: key };

        //res.status(200).send(dateRet);

		users.DangNhap(data, function(ret){
			console.log('DangNhap() => ' + ret);
			if (ret == 1)
                res.status(200).send("Dang nhap thanh cong");
            else
                res.status(200).send("Dang nhap that bai :" + ret);
		});
    });

    app.post("/DangKy", function (req, res) {
        var data = {
            uname: req.body.uname,
            pass: req.body.pass,
            email: req.body.email
        }

        users.AddUser(data, function (ret) {
            console.log('AddUser() => ' + ret);
            if (ret == 1)
                res.status(200).send("Dang ky thanh cong");
            else
                res.status(200).send("Dang ky that bai :" + ret);
        });
    });

    app.post("/getinfo", function (req, res) {
        //1.Nhan tham so tu client
        var key = req.headers['token'];
        if (!key) {
            res.status(302).send("CHUA DANG NHAP");
            return;
        }

        //console.log(req.body);
        //console.log(' TEN TAI KHOAN: ' + req.body.username);
        //2. xu ly, truy xuat du lieu.......

        //3. Gui ket qua theo cau truc JSON
        var ret = JSON.stringify("{r:'API GETINFO - NODEJS - TINK39', key2: 'value 2', key3: true}");
        res.status(200).send(ret);
    });

    app.get("/Get", function (req, res) {
      users.Get(function(ret){
        console.log('GET() => ' + ret);
      });
    });
}

module.exports = appRouter;
