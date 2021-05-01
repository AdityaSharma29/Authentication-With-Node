fetch('../assets/users/data.json')
        .then( res => res.json())
        .then(data => {
            let arr = [];
            for (i = 0; i < data.length; i++) arr.push(data[i].username);
            $('#username').keyup(function (e) { 
                let val = $('#username').val();
                if(arr.indexOf(val) !== -1){ $('#warning').text('username not available'); $('.register').prop('disabled',true) }
                else { $('#warning').text(''); $('.register').prop('disabled',false) }
            });
            $('#phoneNo').keyup(function (e) { 
                let pn = $('#phoneNo').val();
                if(pn < 6000011112 || pn > 9999999999) { $('#warning').text('Invalid Mobile No.'); $('.register').prop('disabled',true) }
                else { $('#warning').text(''); $('.register').prop('disabled',false) }
            });
        });
        
function display(){
    let arg = `<tr><th>ID</th><th>Phone No</th><th>Username</th><th>Password</th></tr>`;

    fetch('../assets/users/data.json')
        .then(ele => ele.json())
        .then(data => {
            data.forEach(element => {
                arg+=`<tr><td>${element.id}</td><td>${element.phoneNumber}</td><td>${element.username}</td><td>${element.password}</td></tr>`;
                document.getElementById("root").innerHTML = arg;
            });
        })
};
