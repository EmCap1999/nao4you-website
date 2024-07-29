const {
    handleUserCreationError,
    handleEmailVerificationError,
    handleAuthenticationError,
    handlePasswordResetError,
    handleLogoutError
} = require("../middleware/auth.error.handler");

const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
} = require('../config/firebase');

const auth = getAuth();

class FirebaseAuthController {

    // sign in
    loginUser(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: "Veuillez compléter le(s) champ(s) vide(s)" });
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                if (!user.emailVerified) {
                    return res.status(403).json({
                        message: "Veuillez vérifier votre adresse mail avant de vous connecter."
                    });
                }

                const idToken = userCredential._tokenResponse.idToken;

                if (idToken != null) {
                    res.cookie('access_token', idToken, {
                        httpOnly: true
                    });
                    res.status(200).json({ message: "Le membre est bien connecté.", userCredential });
                } else {
                    res.status(500).json({ message: "Erreur de serveur interne." });
                }
            })
            .catch((error) => {
                handleAuthenticationError(error, res);
            });
    }


    // sign up
    registerUser(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({
                email: "Veuillez entrer une adresse mail.",
                password: "Veuillez entrer un mot de passe.",
            });
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return sendEmailVerification(auth.currentUser)
                    .then(() => {
                        res.status(201).json({ message: "Un email a été envoyé ! Veuillez vérifier votre compte." });
                    })
                    .catch((error) => {
                        handleEmailVerificationError(error, res);
                    });
            })
            .catch((error) => {
                handleUserCreationError(error, res);
            });
    }

    // sign out
    logoutUser(req, res) {
        signOut(auth)
            .then(() => {
                res.clearCookie('access_token');
                res.status(200).json({ message: "L'utilisateur a bien été déconnecté." });
            })
            .catch((error) => {
                handleLogoutError(error, res);
            });
    }

    // reset password
    resetPassword(req, res) {
        const { email } = req.body;
        if (!email) {
            return res.status(422).json({
                email: "Veuillez entrer une adresse mail valide."
            });
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                res.status(200).json({ message: "Un email a bien été envoyé ! Vous pouvez changer de mot de passe." });
            })
            .catch((error) => {
                handlePasswordResetError(error, res);
            });
    }
}

module.exports = new FirebaseAuthController();
