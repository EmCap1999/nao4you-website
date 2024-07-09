const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail
} = require('../config/firebase');

const auth = getAuth();

class FirebaseAuthController {

    // sign up with email and password.
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
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        res.status(201).json({ message: "Un email a été envoyé ! Veuillez vérifier votre compte." });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).json({ error: "Problème d'envoi d'email de vérification." });
                    });
            })
            .catch((error) => {
                const errorMessage = error.message || "Une erreur est survenue lors de la création du nouveau membre.";
                res.status(500).json({ error: errorMessage });
            });
    }

    // sign in with email and password.
    loginUser(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({
                email: "Veuillez entrer une adresse mail.",
                password: "Veuillez entrer un mot de passe.",
            });
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const idToken = userCredential._tokenResponse.idToken
                if (idToken) {
                    res.cookie('access_token', idToken, {
                        httpOnly: true
                    });
                    res.status(200).json({ message: "Le membre est bien connecté.", userCredential });
                } else {
                    res.status(500).json({ error: "Erreur de serveur interne." });
                }
            })
            .catch((error) => {
                console.error(error);
                const errorMessage = error.message || "Une erreur est survenur lors de la connexion.";
                res.status(500).json({ error: errorMessage });
            });
    }

    // member sign out.
    logoutUser(req, res) {
        signOut(auth)
            .then(() => {
                res.clearCookie('access_token');
                res.status(200).json({ message: "L'utilisateur a bien été déconnecté." });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Erreur de serveur interne." });
            });
    }

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
                console.error(error);
                res.status(500).json({ error: "Erreur de serveur interne." });
            });
    }

}


module.exports = new FirebaseAuthController();