const argv = process.argv;
const fs = require("fs");
let Client = require('ssh2-sftp-client');
let sftp = new Client();
const current_time = Date.now()

function readConfig(path, cb) {
    fs.readFile(path, "utf8", (error, jsonString) => {
        if (error) {
            return cb && cb(error);
        }
        try {
            let config = JSON.parse(jsonString)[0];
            return cb && cb(null, config)
        } catch (error) {
            return cb && cb(error)
        }
    })
}

readConfig(argv[2], (error, config) => {
    if (error) {
        console.log(error);
        return
    }
    sftp.connect({
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.password
    }).then(() => {
        return sftp.list(config.path);
    }).then(data => {
        const files = JSON.stringify(
            data.filter(( file ) => {
                return (file.modifyTime >= config.last_check && file.modifyTime < current_time)
                //return (file.modifyTime >= 1717576200000 && file.modifyTime < current_time)             // for dev purpose only
            })
        )

        fs.writeFile(argv[3], files, (error) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log("Successfully output " + argv[3])
        })

        config.last_check = current_time 
        const new_config = JSON.stringify([config])

        fs.writeFile(argv[2], new_config, (error) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log("Successfully output " + argv[2])
        })

    }).then(() => {
        sftp.end();
    }).catch(err => {
        console.log(err);
    });
})


