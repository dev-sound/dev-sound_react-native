import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
const format = {
    moneyFormat(money){
        let formatter = new Intl.NumberFormat([], {
          style: 'currency',
          currency: 'BRL'
        })
        return formatter.format(money)
    },
    dateFormat(date){
        let formatter = new Intl.DateTimeFormat('pt-BR')
        return formatter.format(date)  
    }
}
module.exports = format