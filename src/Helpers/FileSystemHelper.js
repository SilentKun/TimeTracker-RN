const RNFS = require('react-native-fs');

const userFilePath = `${RNFS.DocumentDirectoryPath}/user`;

const saveUser = (user) => {
    const userString = JSON.stringify(user);
    return RNFS.writeFile(userFilePath, userString, 'utf8');
};

const readUser = () => {
    return RNFS.exists(userFilePath)
        .then((exists) => {
            if (exists) {
                return RNFS.readFile(userFilePath, 'utf8');
            }
            return null;
        })
        .then((userString) => {
            if (userString) {
                try {
                    const user = JSON.parse(userString);
                    return user;
                } catch (e) {
                    return null;
                }
            } else {
                return null;
            }
        });
};

const clearUser = () => {
    return RNFS.unlink(userFilePath);
};


export {
    saveUser,
    readUser,
    clearUser,
};
