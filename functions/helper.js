module.exports = {

    format_date: function(){
        const d = new Date()
        let month = d.getMonth() +1
        return d.getFullYear() + "_" + month + "_" + d.getDate() + "_" + d.getMinutes() + "_" + d.getSeconds()
      }
}