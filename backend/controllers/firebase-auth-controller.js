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

    // sign in with email and password.
    loginUser(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: "Veuillez compléter le(s) champ(s) vide(s)" });
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Check if email is verified.
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
                console.error("Erreur lors de l'authentification:", error);

                // Check if email verification was correctly sent.
                if (error.code === 'auth/email-verification-failed') {
                    res.status(500).json({
                        error: "Problème d'envoi d'email de vérification."
                    });
                } else {
                    const errorMessage = error.message || "Une erreur est survenue lors de la connexion.";
                    res.status(500).json({ message: errorMessage });
                }
            });
    }


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

                // User created, send email verification.
                return sendEmailVerification(auth.currentUser)
                    .then(() => {
                        res.status(201).json({ message: "Un email a été envoyé ! Veuillez vérifier votre compte." });
                    })
                    
                    // Handling errors related to sending the verification email
                    .catch((error) => {
                        
                        console.error("Erreur lors de l'envoi de l'email de vérification :", error);
                        res.status(500).json({ message: "Problème d'envoi de l'email de vérification." });
                    });
            })
            
            // Handling errors related to user creation
            .catch((error) => {
                console.error("Erreur lors de la création de l'utilisateur :", error);
                let errorMessage;

                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = "Cette adresse email est déjà utilisée.";
                        res.status(400).json({ message: errorMessage });
                        break;
                    case 'auth/invalid-email':
                        errorMessage = "L'adresse email fournie n'est pas valide.";
                        res.status(400).json({ message: errorMessage });
                        break;
                    case 'auth/weak-password':
                        errorMessage = "Le mot de passe est trop faible.";
                        res.status(400).json({ message: errorMessage });
                        break;
                    default:
                        errorMessage = "Une erreur est survenue lors de la création de l'utilisateur.";
                        res.status(500).json({ message: errorMessage });
                        break;
                }
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
                res.status(500).json({ message: "Erreur de serveur interne." });
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
                res.status(500).json({ message: "Erreur de serveur interne." });
            });
    }
}

module.exports = new FirebaseAuthController();
