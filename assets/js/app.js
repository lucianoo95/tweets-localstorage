//Variables
const listTweets = document.querySelector('#lista-tweets');

//Funciones
//event listenners
const eventListeners = () => {
  const form = document.querySelector('#formulario');
  form.addEventListener('submit', addTweet);

  //borrar tweets
  listTweets.addEventListener('click', removeTweet);
  //listar tweets
  window.addEventListener('load', readyLocalStorage);

}

//Agregar tweet del formulario.
const addTweet = e => {
  e.preventDefault();
  //leer el valor del textarea
  const tweet = document.querySelector('#tweet');
  //crear boton de eliminar.
  const buttonDelete = document.createElement('a');
  buttonDelete.className = 'borrar-tweet';
  buttonDelete.textContent = 'X';

  //crear elemento con el nuevo tweet.
  const li = document.createElement('li');
  li.className = 'container';
  li.textContent = tweet.value;

  //añadir boton de elimar al tweet
  li.appendChild(buttonDelete);
  //añadir tweet a la lista
  listTweets.appendChild(li);

  addTweetToLocalStorage(tweet.value);

  //limpio el textarea
  tweet.value = "";
}

//Eliminar un tweet
const removeTweet = e => {
  e.preventDefault();

  if (e.target.className === 'borrar-tweet') {
    const tweet = e.target.parentElement;

    removeTweetFromLocalStorage(tweet.textContent);
    tweet.remove();
  }
}

//Agregar un tweet al localstorage
const addTweetToLocalStorage = (tweet) => {
  const tweets = getTweetsToLocalStorage();
  tweets.push(tweet);

  //convertir de json a string.
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Comprobar elementos en localstorage , retorna un array.
const getTweetsToLocalStorage = () => {
  let tweets;
  //reviso el valor del localstorage.
  if (localStorage.getItem('tweets') === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}

//eliminar tweet del localstorage.
const removeTweetFromLocalStorage = (tweetContent) => {
  //Eliminar "x" del tweet
  const tweet = tweetContent.slice(0, -1);
  const tweets = getTweetsToLocalStorage();
  //encountrar el indice del tweet dentro del array
  const indexOfTweet = tweets.findIndex(item => item === tweet);
  //elimar el tweet del array
  tweets.splice(indexOfTweet, 1);

  localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Mostrar datos de localstorage en la lista
const readyLocalStorage = () => {
  let tweets;
  tweets = getTweetsToLocalStorage();

  for (let tweet of tweets) {
    const buttonDelete = document.createElement('a');
    buttonDelete.className = 'borrar-tweet';
    buttonDelete.textContent = 'X';
    //crear elemento con el nuevo tweet.
    const li = document.createElement('li');
    li.className = 'container';
    li.textContent = tweet;
    //añadir boton de elimar al tweet
    li.appendChild(buttonDelete);
    //añadir tweet a la lista
    listTweets.appendChild(li);
  }
}

//event listeners
eventListeners();
