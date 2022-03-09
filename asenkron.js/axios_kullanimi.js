
const getBtn = document.getElementById('get');
const postBtn = document.getElementById('post');
const putPatchBtn = document.getElementById('put-patch');
const deleteBtn = document.getElementById('delete');
const ayniAndaIstekBtn = document.getElementById('ayni-anda-istek');
const headersBtn = document.getElementById('headers');
const hataBtn = document.getElementById('hata');

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', postData);
putPatchBtn.addEventListener('click', putPatchData);
deleteBtn.addEventListener('click', deleteItem);
ayniAndaIstekBtn.addEventListener('click', ayniAndaIstekData);
headersBtn.addEventListener('click', customHeader);
hataBtn.addEventListener('click', hataIslemleri);

function getData() {
/*    axios({
        method: 'GET',
        url : 'https://jsonplaceholder.typicode.com/users',
        params: {
            _limit:2
        }
    }).then(response => sonucuEkranaYazdir(response))
      .catch(hata => console.log(hata))
      .then(() => console.log('Get isteği tamamlandı'));
*/
/*
    axios
         .get('https://jsonplaceholder.typicode.com/users', {
             params: {
                 _limit : 1,
             }
         })
         .then(response => sonucuEkranaYazdir(response))
         .catch(hata => console.log(hata))
         .then(() => console.log('Get isteği tamamlandı'));  
*/
    axios
         .get('https://jsonplaceholder.typicode.com/users?_limit=1') //params methodu bu şeklide de kısaltılabilir
         .then(response => sonucuEkranaYazdir(response))
         .catch(hata => console.log(hata))
         .then(() => console.log('Get isteği tamamlandı'));
}

function postData() {
 /*   axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'Yeni Başlık',
        body: 'Burası body kısmı',
        userId: 55
    }).then(response => sonucuEkranaYazdir(response))
      .catch(hata => console.log(hata));
*/

      axios.post('https://jsonplaceholder.typicode.com/users', {
        name: 'Enes',
        username: 'DEMIR',
        email: 'aaa@asasd.com'
    }).then(response => sonucuEkranaYazdir(response))
      .catch(hata => console.log(hata));
    
}

function putPatchData() { //Veri kaynağını güncellemek için kullanılır --put: Bütün veri kaynağını değiştirir 
    /*
    axios.put('https://jsonplaceholder.typicode.com/users/1', {
        name: 'Enes',
        username: 'DEMIR',
        email: 'aaa@asasd.com'
    }).then(response => sonucuEkranaYazdir(response))
      .catch(hata => console.log(hata));
    */

      axios.patch('https://jsonplaceholder.typicode.com/users/1', {
        name: 'Enes',
        username: 'DEMIR',
        email: 'aaa@asasd.com'
    }).then(response => sonucuEkranaYazdir(response))
      .catch(hata => console.log(hata));
    
}

function deleteItem() {
    axios.delete('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => sonucuEkranaYazdir(response))
    .catch(hata => console.log(hata))
}

function ayniAndaIstekData() {
    /*
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/users'),
        axios.get('https://jsonplaceholder.typicode.com/posts'),
    ]).then(response => {
        console.log(response[0].data);
        console.log(response[1].data);
        sonucuEkranaYazdir(response[0]);
    })
    */

    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/users?_limit=1'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=1'),
    ]).then(axios.spread((kullanicilar, postlar) => {
        console.log(kullanicilar.data);
        console.log(kullanicilar.data);
        sonucuEkranaYazdir(kullanicilar);
    }))
}

axios.interceptors.request.use(config => {

    console.log(`${config.url} adresine ${config.method} isteği yapıldı ve timeout
    olarak ${config.timeout} ayarlandı`);

    return config;
});

axios.interceptors.response.use(response => {

    /*if (response.status === 200) {
        response.status = 999;
    }*/
    return response;
}, error => {

        return Promise.reject(error);
}) 


axios.defaults.headers.common['X-Auth-Token'] = 'apitokendegeri';
axios.defaults.headers.common['MyToken'] = 'myToken';

const axiosNesnesi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {'X-Requested-With': 'XMLHttpRequest', 'token' : 'asdasdasas'},
})


function customHeader() {

    axiosNesnesi.get('/users').then(response => console.log(response));
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'sizintokendegeriniz'
        }
    }

    axios.post('https://jsonplaceholder.typicode.com/users', {
        name: 'Enes',
        username: 'DEMIR',
        email: 'aaa@asasd.com'
    }, config).then(response => sonucuEkranaYazdir(response))
      .catch(hata => console.log(hata));
    
}

function hataIslemleri() {
    axios
         .get('https://jsonplaceholder.typicode.com/userssss?_limit=1')
         .then(response => sonucuEkranaYazdir(response))
         .catch(hata => hatayiYazdir(hata))
         .then(() => console.log('Get isteği tamamlandı'));
}

function hatayiYazdir(hata) {
    
    document.querySelector('.sonuc').innerHTML = `<div class="notification is-info">
    <div class="columns is-mobile is-vcentered">
        <div class="column"><h1 class="subtitle"> Sonuc</h1> </div>
        <div class="column"><h1 class="title"> 
        <pre>${JSON.stringify(hata.response, null, 2)}</pre>
        </h1> </div>
    </div>
    </div>`;
}

function sonucuEkranaYazdir(response) {
    document.querySelector('.sonuc').innerHTML = `
    <div class= "notification is-info">
    <div class= "columns is-mobile is-vcentered">
        <div class="column"><h1 class="subtitle"> Sonuc</h1> </div>
        <div class="column"><h1 class="title"> ${response.status}</h1> </div>
    </div>
    </div>


    <div class= "section">
        <article class= "message is-success">
            <div class= "message-header">
            <p>Header</p>
            </div>
            <div class= "message-body has-background-white has-text-dark">
            <pre>${JSON.stringify(response.headers, null, 4)}</pre>
            </div>
        </article>
    </div>
    
    
    <div class= "section">
        <article class= "message is-warning">
            <div class= "message-header">
            <p>Data</p>
            </div>
            <div class= "message-body has-background-white has-text-dark">
            <pre>${JSON.stringify(response.data, null, 2)}</pre>
            </div>
        </article>
    </div>


    <div class= "section">
        <article class= "message is-primary">
            <div class= "message-header">
                <p>Config</p>

            </div>
            <div class= "message-body has-background-white has-text-dark">
            <pre>${JSON.stringify(response.config, null, 2)}</pre>
            </div>
        </article>
    </div>
    `
}

