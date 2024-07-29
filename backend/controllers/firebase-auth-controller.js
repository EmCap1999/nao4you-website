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
    admin
} = require('../config/firebase');

const auth = getAuth();

class FirebaseAuthController {

    loginUser = async (req, res) => {
        const { email, password } = req.body;

        try {
            if (!email || !password) {
                return res.status(422).json({ message: "Veuillez compléter le(s) champ(s) vide(s)" });
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                return res.status(403).json({
                    message: "Veuillez vérifier votre adresse mail avant de vous connecter."
                });
            }

            const claims = { claims: { email: user.email, } }
            await admin.auth().setCustomUserClaims(user.uid, claims);

            const newToken = await user.getIdToken();
            res.cookie('access_token', newToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            });

            const decodedToken = await admin.auth().verifyIdToken(newToken);
            req.user = decodedToken;

            return res.status(200).json({ claims: req.user.claims });

        } catch (error) {
            return handleAuthenticationError(error, res);
        }
    };



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
