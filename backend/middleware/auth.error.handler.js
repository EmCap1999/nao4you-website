const handleAuthenticationError = (error, res) => {
    console.log(error.code);
    let errorMessage;

    switch (error.code) {
        case 'auth/user-disabled':
            errorMessage = "Ce compte utilisateur a été désactivé.";
            res.status(403).json({ message: errorMessage });
            break;
        case 'auth/invalid-credential':
            errorMessage = "Adresse mail et/ou mot de passe incorrect(s).";
            res.status(403).json({ message: errorMessage });
            break;
        default:
            errorMessage = "Une erreur est survenue lors de la connexion.";
            res.status(500).json({ message: errorMessage });
            break;
    }
};

const handleUserCreationError = (error, res) => {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    console.log(error.code);
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
};

const handleEmailVerificationError = (error, res) => {
    console.log(error.code);
    let errorMessage;

    switch (error.code) {
        case 'auth/invalid-email':
            errorMessage = "L'adresse email fournie n'est pas valide.";
            res.status(400).json({ message: errorMessage });
            break;
        case 'auth/too-many-requests':
            errorMessage = "Trop de requêtes envoyées. Veuillez réessayer plus tard.";
            res.status(429).json({ message: errorMessage });
            break;
        default:
            errorMessage = "Problème d'envoi de l'email de vérification.";
            res.status(500).json({ message: errorMessage });
            break;
    }
};

const handlePasswordResetError = (error, res) => {
    console.log(error.code);
    let errorMessage;

    switch (error.code) {
        case 'auth/user-not-found':
            errorMessage = "Utilisateur non trouvé.";
            res.status(404).json({ message: errorMessage });
            break;
        case 'auth/invalid-email':
            errorMessage = "L'adresse email fournie n'est pas valide.";
            res.status(400).json({ message: errorMessage });
            break;
        case 'auth/too-many-requests':
            errorMessage = "Trop de requêtes envoyées. Veuillez réessayer plus tard.";
            res.status(429).json({ message: errorMessage });
            break;
        default:
            errorMessage = "Une erreur est survenue lors de la réinitialisation du mot de passe.";
            res.status(500).json({ message: errorMessage });
            break;
    }
};

const handleLogoutError = (error, res) => {
    console.log(error.code);
    res.status(500).json({ message: "Erreur de serveur interne." });
};

const handleTokenVerificationError = (error, res) => {
    console.log(error.code);
    let errorMessage;

    switch (error.code) {
        case 'auth/argument-error':
            errorMessage = 'Le format du token est invalide.';
            res.status(400).json({ message: errorMessage });
            break;
        case 'auth/id-token-expired':
            errorMessage = 'Le token a expiré.';
            res.status(401).json({ message: errorMessage });
            break;
        case 'auth/id-token-revoked':
            errorMessage = 'Le token a été révoqué.';
            res.status(401).json({ message: errorMessage });
            break;
        case 'auth/invalid-id-token':
            errorMessage = 'Le token fourni est invalide.';
            res.status(403).json({ message: errorMessage });
            break;
        default:
            errorMessage = 'Non-autorisé.';
            res.status(403).json({ message: errorMessage });
            break;
    }
};

module.exports = {
    handleAuthenticationError,
    handleUserCreationError,
    handleEmailVerificationError,
    handlePasswordResetError,
    handleLogoutError,
    handleTokenVerificationError
};
