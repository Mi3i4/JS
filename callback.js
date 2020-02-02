// // const asyncFunc = (number, cb) => {
// //     setTimeout(() => {
// //         const res = number + 1;
// //         cb(res);
// //     }, 1500);
// // };
// //
// // // console.log(asyncFunc(5));
// // asyncFunc(5, (a) => {
// //     asyncFunc(a, (b) => {
// //         console.log(b);
// //     })
// // });
//
// const asyncFunc = (number) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if(number) {
//                 const res = number +1;
//                 resolve(res);
//             } else {
//                 reject('Error');
//             }
//         }, 1000);
//     });
// };
//
// asyncFunc(5).then((res) => {
//     return asyncFunc(res);
// }).then((res) => {
//     console.log(res);
// }).catch((errs) => {
//     console.error('err');
// });
//
// const API_URL = 'https://raw.githubusercontent.com/Mi3i4/JS/master';
//
// function makeGetRequest(url, callback) {
//     let xhr;
//     if(window.XMLHttpRequest){
//         xhr = new window.XMLHttpRequest();
//     }else {
//         xhr = new ActiveXObject('Micrisoft.XMLHTTP');
//     }
//     xhr.onreadystatechange = function () {
//         if(xhr.readyState === 4 && xhr.status === 200){
//             callback(xhr.responseText)
//         }
//     };
//     xhr.open('GET', url);
//     xhr.send();
// }
//
// console.log(makeGetRequest(`${API_URL}/goods.json`));

// const API_URL = 'https://raw.githubusercontent.com/Mi3i4/JS/master';

fetch('https://raw.githubusercontent.com/Mi3i4/JS/master/goods.json', {mode:"cors"})
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                console.log(data);
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

// fetch('https://raw.githubusercontent.com/Mi3i4/JS/master/goods.json').then(function(response) {
//     console.log(response.headers.get('Content-Type'));
//     console.log(response.headers.get('Date'));
//     console.log(response.status);
//     console.log(response.statusText);
//     console.log(response.type);
//     console.log(response.url);
// });


// async function getGoods() {
//     let response = await fetch(`https://raw.githubusercontent.com/Mi3i4/JS/master/goods.json`); // завершается с заголовками ответа
//     let result = await response.json(); // читать тело ответа в формате JSON
//     console.log(result);
// }

getGoods();
