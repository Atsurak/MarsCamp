const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initPassport(passport, getUserByEmail, getUserByID){

    const authUser = async (email, pwd, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: "User not found" })
        }

        try{
            if (await bcrypt.compare(pwd, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: "Incorrect password"})
            }
        } catch (err){
            return done(err)
        }

    }

    passport.use(new localStrategy({ usernameField: 'email' }, authUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserByID(id))
    })
}

module.exports = initPassport