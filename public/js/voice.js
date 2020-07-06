let voiceButton = document.querySelector('#voice')
let cartTitle = document.querySelector('#title-cardGl')


// Создание распознавателя
let recognizer = new webkitSpeechRecognition();

recognizer.interimResults = true;

// Какой язык будет распознаваться
recognizer.lang = 'ru-Ru';

//Ответ на речевой запрос
recognizer.onresult = function (event) {
    let result = event.results[event.resultIndex];
    if (result.isFinal) {
        let finalResult = result[0].transcript.toLowerCase()
        switch(true) {
            case finalResult.includes('about'):
                window.location.href = '/about';
                break;
            case (finalResult.includes('главную') || finalResult.includes('home') || finalResult.includes('главная') || finalResult.includes('главное')):
                window.location.href = '/';
                break;
            case (finalResult.includes('добавить') || finalResult.includes('добавь')):
                if (window.location.pathname == '/add') {
                    let submitForm = document.querySelector('#form-add'),
                        titleForm = document.querySelector('#title'),
                        priceForm = document.querySelector('#price'),
                        imgForm = document.querySelector('#img');
                    if (titleForm.value != '' && titleForm.value != ' ' && priceForm.value != '' && imgForm.value != '') {
                        submitForm.submit()
                    } else {
                        alert('Заполните все поля')
                    }
                } else {
                    window.location.href = '/add';
                }
                break;
            case (finalResult.includes('название')):
                {   
                    if(window.location.pathname == '/' || window.location.pathname == '/about' || window.location.pathname == '/courses') {
                        alert('Некорректно');
                    } else {
                        let inputTitle = document.querySelector('#title')
                        let label = document.querySelectorAll('label')
                        if (finalResult.split('').includes('*') || finalResult.includes('Блять')) {
                            alert('Error. В названии к статье нельзя использовать нецензурную лексику')
                        } else if (finalResult.split(' ')[1]) {
                            finalResult = finalResult.split(' ')
                            finalResult.splice(0, 1)
                            finalResult = finalResult.join(' ')
                            finalResult = finalResult[0].toUpperCase() + finalResult.substring(1)
                            inputTitle.value = finalResult;
                            label[0].classList.add('active')
                        } else {
                            alert('Не получилось разобрать название, повторите попытку')
                        }
                    }
                }
                break;
            case (finalResult.includes('цена') && window.location.pathname == '/add'):
                {
                    if(window.location.pathname == '/' || window.location.pathname == '/about' || window.location.pathname == '/courses') {
                        alert('Некорректно');
                    } else {
                        let inputPrice = document.querySelector('#price')
                        let label = document.querySelectorAll('label')
    
                        finalResult = finalResult.split(' ')
                        finalResult.splice(0, 1)
                        finalResult = finalResult.join('')
                        finalResult = finalResult.split('')
    
                        if (finalResult.includes('.')) {
                            finalResult.splice(finalResult.indexOf('.'), 1)
                        }
    
                        if (+finalResult.join('') > 0) {
                            inputPrice.value = +finalResult.join('');
                            label[1].classList.add('active')
                        } else {
                            alert('Error. Цена не должна быть ниже 1 и после цены не должно быть никаких слов')
                        }
                    }
                }
                break;
            case (finalResult.includes('курсы') || finalResult.includes('раздел') || finalResult.includes('контент') || finalResult.includes('курс')):
                window.location.href = '/courses';
                break;
            case (finalResult.includes('vk') || finalResult.includes('вк')):
                window.open("https://vk.com")
                break;
            case (finalResult.includes('наверх') || finalResult.includes('вверх')):
                window.scrollTo(0, 0)
                break;
            default:
                alert('Некорректно')
                break;
        }      
    }
};

voiceButton.addEventListener('click', () => {
    recognizer.start();
})