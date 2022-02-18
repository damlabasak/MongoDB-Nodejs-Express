const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    }
})
//kullanıcının gördiği şifre ile db'deki şifre karşılaştırılıyor
//modelle ilgili işlemler yapılan methodlara 'statics' ekliyoruz
userSchema.statics.login = async function(username,password) {
    const user = await this.findOne({username})
    if (user) {
        const auth = await bcrypt.compare(password,user.password)
        if (auth) {
            return user
        } else {
            throw Error ('Hatalı Şifre')
        }
    } else {
        throw Error('Kullanıcı Bulunamadı')
    }
}

//parola database kaydolmadan önce hashlenir (db'de açıkça görünmemesi için)
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

const User = new mongoose.model('user',userSchema)

module.exports = User