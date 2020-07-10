const weatherForm = document.querySelector('form')
const input  = weatherForm.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetch('/weather?address=' + input.value).then(
  response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.innerHTML = '<img class="weather-icon" src="' + data.forecast.icon + '" alt="weather icon"> ' + data.forecast.desc
        messageTwo.innerHTML += '<div>' + data.forecast.temperature + '</div>'
        messageTwo.innerHTML += '<div>' + data.forecast.wind + '</div>'
        messageTwo.innerHTML += '<div>' + data.forecast.humidity + '</div>'
      }
    })
  }
)
})
