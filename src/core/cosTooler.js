var config = {
    Bucket: 'resoure-1251324668',
    Region: 'ap-guangzhou',
};


var cos = new window.COS({
    getAuthorization: function (options, callback) {
            console.log("getAuthorization");
            var url = 'https://wlwol.cn/resource/getkeys'; // 如果是 npm run sts.js 起的 nodejs server，使用这个
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function (e) {
                try {
                    var data = JSON.parse(e.target.responseText);
                    var credentials = data.credentials;
                } catch (e) {
                    console.log(e, "error");
                }
                if (!data || !credentials) return console.error('credentials invalid');
                callback({
                    TmpSecretId: credentials.tmpSecretId,
                    TmpSecretKey: credentials.tmpSecretKey,
                    XCosSecurityToken: credentials.sessionToken,
                    StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                    ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
                });
            };
            xhr.send();
        }
    });

function getObjectUrl() {
    var url = cos.getObjectUrl({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        // Key: '1mb.zip',
        Key: 'linux.txt',
        Expires: 60,
        Sign: true,
    }, function (err, data) {
        console.log(err || data && data.Url);
    });
    console.log(url);
}

function putObject(file, filename, progress) {
    return new Promise(resolve => {
        cos.putObject({
            Bucket: config.Bucket, // Bucket 格式：test-1250000000
            Region: config.Region,
            Key: filename, /* 必须 */
            Body: file,
            onTaskReady: function (tid) {
                console.log('onTaskReady', tid);
            },
            onTaskStart: function (info) {
                console.log('onTaskStart', info);
            },
            onProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
                progress(progressData);
            },
        }, function (err, data) {
            console.log(err || data);
            resolve();
        });
    })
    
}

export default {
    getObjectUrl,
    putObject
}