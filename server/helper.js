module.exports = {

    settupName: function (name) {
        return name.replace("ä", "ae").replace("ü", "ue").replace("ö", "oe").replace("ß", "ss")
    },

    format_date: function () {
        const d = new Date()
        let month = d.getMonth() + 1
        return d.getFullYear() + "_" + month + "_" + d.getDate() + "_" + d.getMinutes() + "_" + d.getSeconds()
    }
}