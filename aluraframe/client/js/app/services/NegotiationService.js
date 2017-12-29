class NegotiationService {

    // cb as callback function
    getWeeklyNegotiations(cb) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    console.log('Getting negotiations from server');
                    cb(null, JSON.parse(xhr.responseText)
                        .map(obj => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor)));
                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações da semana!');
                }
            }
        }
        xhr.send();
    }

}