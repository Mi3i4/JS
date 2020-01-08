// const asyncFunc = (number, cb) => {
//     setTimeout(() => {
//         const res = number + 1;
//         cb(res);
//     }, 1500);
// };
//
// // console.log(asyncFunc(5));
// asyncFunc(5, (a) => {
//     asyncFunc(a, (b) => {
//         console.log(b);
//     })
// });

const asyncFunc = (number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(number) {
                const res = number +1;
                resolve(res);
            } else {
                reject('Error');
            }
        }, 1000);
    });
};

asyncFunc(5).then((res) => {
    return asyncFunc(res);
}).then((res) => {
    console.log(res);
}).catch((errs) => {
    console.error('err');
});

function makeGetRequest(url, callback) {
    let xhr;
    if(window.XMLHttpRequest){
        xhr = window.XMLHttpRequest();
    }else {
        xhr = ActiveXObject('Micrisoft.XMLHTTP');
    }
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.responseText);
        }
    };
    xhr.open('GET', '');
}
